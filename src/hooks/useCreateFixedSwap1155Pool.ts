import { getPoolCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import { GetPoolCreationSignatureParams, GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { NULL_BYTES } from '../constants'
import { useActiveWeb3React } from 'hooks'
import { useCallback } from 'react'
import { useAuctionERC20Currency, useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { CurrencyAmount } from 'constants/token'
import { BigNumber } from 'bignumber.js'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt, Log } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { AllocationStatus, IReleaseType, ParticipantStatus } from 'bounceComponents/create-auction-pool/types'
import { useFixedSwapNftContract } from './useContract'
import { getEventLog, makeValuesReleaseData } from './useCreateFixedSwapPool'

const NO_LIMIT_ALLOCATION = '0'
interface Params {
  whitelist: string[]
  poolSize: string
  swapRatio: string
  allocationPerWallet: string
  startTime: number
  endTime: number
  delayUnlockingTime: number
  poolName: string
  tokenFromAddress: string
  tokenToAddress: string
  tokenFormDecimal: string | number
  tokenToDecimal: string | number
  tokenId: string
  releaseType: IReleaseType
  releaseData: {
    startAt: number | string
    endAtOrRatio: number | string
  }[]
}

export function useCreateFixedSwap1155Pool() {
  const { account, chainId } = useActiveWeb3React()
  const fixedSwapNftContract = useFixedSwapNftContract()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  const { currencyTo } = useAuctionERC20Currency()
  const addTransaction = useTransactionAdder()
  const values = useValuesState()

  return useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
    sysId: number
    getPoolId: (logs: Log[]) => string | undefined
  }> => {
    const params: Params = {
      whitelist: values.participantStatus === ParticipantStatus.Whitelist ? values.whitelist : [],
      poolSize: values.poolSize,
      swapRatio: values.swapRatio,
      allocationPerWallet:
        values.allocationStatus === AllocationStatus.Limited
          ? new BigNumber(values.allocationPerWallet).toString()
          : NO_LIMIT_ALLOCATION,
      startTime: values.startTime?.unix() || 0,
      endTime: values.endTime?.unix() || 0,
      delayUnlockingTime:
        IReleaseType.Linear === values.releaseType || IReleaseType.Fragment === values.releaseType
          ? values.releaseDataArr?.[0].startAt?.unix() || 0
          : IReleaseType.Instant === values.releaseType
          ? 0
          : values.shouldDelayUnlocking
          ? values.delayUnlockingTime?.unix() || 0
          : values.endTime?.unix() || 0,
      poolName: values.poolName.slice(0, 50),
      tokenFromAddress: values.nftTokenFrom.contractAddr || '',
      tokenFormDecimal: 0,
      tokenId: values.nftTokenFrom.tokenId || '0',
      tokenToAddress: values.tokenTo.address,
      tokenToDecimal: values.tokenTo.decimals,
      releaseType: values.releaseType === 1000 ? IReleaseType.Cliff : values.releaseType,
      releaseData: makeValuesReleaseData(values)
    }

    if (!currencyTo) {
      return Promise.reject('currencyTo error')
    }
    const amountTotal1 = CurrencyAmount.fromAmount(currencyTo, params.poolSize)

    if (!amountTotal1) {
      return Promise.reject('amountTotal1 error')
    }
    if (!chainConfigInBackend?.id) {
      return Promise.reject(new Error('This chain is not supported for the time being'))
    }
    if (!account) {
      return Promise.reject('no account')
    }
    if (!fixedSwapNftContract) {
      return Promise.reject('no contract')
    }

    let merkleroot = ''

    if (params.whitelist.length > 0) {
      const whitelistParams: GetWhitelistMerkleTreeRootParams = {
        addresses: params.whitelist,
        category: PoolType.fixedSwapNft,
        chainId: chainConfigInBackend.id
      }
      const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      merkleroot = data.merkleroot
    }

    const signatureParams: GetPoolCreationSignatureParams = {
      amountTotal0: params.poolSize,
      amountTotal1: new BigNumber(amountTotal1.raw.toString())
        .times(params.swapRatio)
        // Prevent exponential notation
        .toFixed(0, BigNumber.ROUND_DOWN),
      category: PoolType.fixedSwapNft,
      chainId: chainConfigInBackend.id,
      claimAt: params.delayUnlockingTime,
      closeAt: params.endTime,
      creator: account,
      maxAmount1PerWallet: params.allocationPerWallet.toString(),
      merkleroot: merkleroot,
      name: params.poolName,
      openAt: params.startTime,
      token0: params.tokenFromAddress,
      token1: params.tokenToAddress,
      tokenIds: [params.tokenId],
      releaseType: params.releaseType,
      releaseData: params.releaseData
    }

    const {
      data: { id, expiredTime, signature }
    } = await getPoolCreationSignature(signatureParams)

    const contractCallParams = {
      name: signatureParams.name,
      token0: signatureParams.token0,
      token1: signatureParams.token1,
      tokenId: signatureParams.tokenId,
      amountTotal0: signatureParams.amountTotal0,
      amountTotal1: signatureParams.amountTotal1,
      openAt: signatureParams.openAt,
      closeAt: signatureParams.closeAt,
      claimAt: signatureParams.claimAt,
      isERC721: false,
      maxAmount1PerWallet: signatureParams.maxAmount1PerWallet,
      whitelistRoot: merkleroot || NULL_BYTES
    }

    const args = [
      id,
      contractCallParams,
      params.releaseType,
      params.releaseData.map(item => ({ ...item, endAtOrRatio: item.endAtOrRatio.toString() })),
      false,
      !!values.enableReverse,
      expiredTime,
      signature
    ]

    const estimatedGas = await fixedSwapNftContract.estimateGas.create(...args).catch((error: Error) => {
      console.debug('Failed to create fixedSwap 1155', error)
      throw error
    })
    return fixedSwapNftContract
      .create(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Create fixed swap auction for ERC1155',
          userSubmitted: {
            account,
            action: 'createERC1155FixedSwapAuction'
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1),
          sysId: id,
          getPoolId: (logs: Log[]) => getEventLog(fixedSwapNftContract, logs, 'Created', 'index')
        }
      })
  }, [account, addTransaction, chainConfigInBackend?.id, currencyTo, fixedSwapNftContract, values])
}
