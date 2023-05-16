import { getPoolCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import { GetPoolCreationSignatureParams, GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { NULL_BYTES } from '../constants'
import { useActiveWeb3React } from 'hooks'
import { useFixedSwapERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useAuctionERC20Currency, useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { CurrencyAmount } from 'constants/token'
import { BigNumber } from 'bignumber.js'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt, Log } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import {
  AllocationStatus,
  IReleaseData,
  IReleaseType,
  ParticipantStatus
} from 'bounceComponents/create-auction-pool/types'
import { Contract } from 'ethers'

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
  releaseType: IReleaseType
  releaseData: {
    startAt: number | string
    endAtOrRatio: number | string
  }[]
}
const NO_LIMIT_ALLOCATION = '0'

const getMinStartTime = (releaseData: IReleaseData[]) => {
  return releaseData.map(item => item.startAt?.unix() || 0).reduce((a, b) => Math.min(a, b), 0)
}

export function useCreateFixedSwapPool() {
  const { account, chainId } = useActiveWeb3React()
  const fixedSwapERC20Contract = useFixedSwapERC20Contract()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  const { currencyFrom, currencyTo } = useAuctionERC20Currency()
  const addTransaction = useTransactionAdder()
  const values = useValuesState()

  return useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
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
          ? getMinStartTime(values.releaseDataArr)
          : values.shouldDelayUnlocking
          ? values.delayUnlockingTime?.unix() || 0
          : values.endTime?.unix() || 0,
      poolName: values.poolName.slice(0, 50),
      tokenFromAddress: values.tokenFrom.address,
      tokenFormDecimal: values.tokenFrom.decimals,
      tokenToAddress: values.tokenTo.address,
      tokenToDecimal: values.tokenTo.decimals,
      releaseType: values.releaseType === 1000 ? IReleaseType.Cliff : values.releaseType,
      releaseData:
        values.releaseType === 1000
          ? [
              {
                startAt: values.endTime?.unix() || 0,
                endAtOrRatio: 0
              }
            ]
          : values.releaseType === IReleaseType.Cliff
          ? [
              {
                startAt: values.shouldDelayUnlocking
                  ? values.delayUnlockingTime?.unix() || 0
                  : values.endTime?.unix() || 0,
                endAtOrRatio: 0
              }
            ]
          : values.releaseType === IReleaseType.Linear
          ? values.releaseDataArr.map(item => ({
              startAt: item.startAt?.unix() || 0,
              endAtOrRatio: item.endAt?.unix() || 0
            }))
          : values.releaseDataArr.map(item => ({
              startAt: item.startAt?.unix() || 0,
              endAtOrRatio: item.ratio || 0
            }))
    }

    if (!currencyFrom || !currencyTo) {
      return Promise.reject('currencyFrom or currencyTo error')
    }
    const amountTotal0 = CurrencyAmount.fromAmount(currencyFrom, params.poolSize)
    const amountTotal1 = CurrencyAmount.fromAmount(currencyTo, params.poolSize)

    if (!amountTotal0 || !amountTotal1) {
      return Promise.reject('amountTotal0 or amountTotal1 error')
    }
    if (!chainConfigInBackend?.id) {
      return Promise.reject(new Error('This chain is not supported for the time being'))
    }
    if (!account) {
      return Promise.reject('no account')
    }
    if (!fixedSwapERC20Contract) {
      return Promise.reject('no contract')
    }

    let merkleroot = ''

    if (params.whitelist.length > 0) {
      const whitelistParams: GetWhitelistMerkleTreeRootParams = {
        addresses: params.whitelist,
        category: PoolType.FixedSwap,
        chainId: chainConfigInBackend.id
      }
      const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      merkleroot = data.merkleroot
    }

    const signatureParams: GetPoolCreationSignatureParams = {
      amountTotal0: amountTotal0.raw.toString(),
      amountTotal1: new BigNumber(amountTotal1.raw.toString())
        .times(params.swapRatio)
        // Prevent exponential notation
        .toFixed(0, BigNumber.ROUND_DOWN),
      category: PoolType.FixedSwap,
      chainId: chainConfigInBackend.id,
      claimAt: params.delayUnlockingTime,
      closeAt: params.endTime,
      creator: account,
      maxAmount1PerWallet: CurrencyAmount.fromAmount(currencyTo, params.allocationPerWallet)?.raw.toString() || '0',
      merkleroot: merkleroot,
      name: params.poolName,
      openAt: params.startTime,
      token0: params.tokenFromAddress,
      token1: params.tokenToAddress,
      releaseType: params.releaseType,
      releaseData: params.releaseData
    }

    const {
      data: { expiredTime, signature }
    } = await getPoolCreationSignature(signatureParams)

    const contractCallParams = {
      name: signatureParams.name,
      token0: signatureParams.token0,
      token1: signatureParams.token1,
      amountTotal0: signatureParams.amountTotal0,
      amountTotal1: signatureParams.amountTotal1,
      openAt: signatureParams.openAt,
      claimAt: signatureParams.claimAt,
      closeAt: signatureParams.closeAt,
      maxAmount1PerWallet: signatureParams.maxAmount1PerWallet,
      whitelistRoot: merkleroot || NULL_BYTES
    }

    const args = [contractCallParams, params.releaseType, params.releaseData, false, expiredTime, signature]

    const estimatedGas = await fixedSwapERC20Contract.estimateGas.createV2(...args).catch((error: Error) => {
      console.debug('Failed to create fixedSwap', error)
      throw error
    })
    return fixedSwapERC20Contract
      .createV2(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Create fixedSwap auction',
          userSubmitted: {
            account,
            action: 'createERC20FixedSwapAuction'
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1),
          getPoolId: (logs: Log[]) => getEventLog(fixedSwapERC20Contract, logs, 'Created', 'index')
        }
      })
  }, [account, addTransaction, chainConfigInBackend?.id, currencyFrom, currencyTo, fixedSwapERC20Contract, values])
}

export function getEventLog(contract: Contract, logs: Log[], eventName: string, name: string): string | undefined {
  for (const log of logs) {
    if (log.address !== contract.address) {
      continue
    }
    const data = contract.interface.parseLog(log)
    if (eventName !== data.name) {
      continue
    }
    if (data.args?.[name]) {
      return data.args[name].toString()
    }
  }
  return undefined
}
