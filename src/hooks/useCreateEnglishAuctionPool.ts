import { getPoolCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import { GetPoolCreationSignatureParams, GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { NULL_BYTES } from '../constants'
import { useActiveWeb3React } from 'hooks'
import { useCallback } from 'react'
import { useAuctionERC20Currency, useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { CurrencyAmount } from 'constants/token'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt, Log } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { IReleaseType, ParticipantStatus } from 'bounceComponents/create-auction-pool/types'
import { useEnglishAuctionNftContract } from './useContract'
import { getEventLog } from './useCreateFixedSwapPool'
import { useERC721MultiOwner } from 'hooks/useNFTTokenBalance'

interface Params {
  amountTotal0: number
  whitelist: string[]
  startTime: number
  endTime: number
  poolName: string
  tokenFromAddress: string
  tokenToAddress: string
  tokenIds: string[]
  priceFloor: string
  amountMinIncr1: string
  releaseType: IReleaseType
  releaseData: {
    startAt: number | string
    endAtOrRatio: number | string
  }[]
}

export function useCreateEnglishAuctionPool() {
  const { account, chainId } = useActiveWeb3React()
  const englishAuctionNftContract = useEnglishAuctionNftContract()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  const { currencyTo } = useAuctionERC20Currency()
  const addTransaction = useTransactionAdder()
  const values = useValuesState()

  const { ownerIds } = useERC721MultiOwner(
    values.nft721TokenFrom?.[0].contractAddr,
    account || undefined,
    values.nft721TokenFrom.map(item => item.tokenId || '')
  )

  return useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
    sysId: number
    getPoolId: (logs: Log[]) => string | undefined
  }> => {
    const params: Params = {
      amountTotal0: values.nft721TokenFrom.length,
      priceFloor: values.priceFloor || '',
      amountMinIncr1: values.amountMinIncr1 || '',
      whitelist: values.participantStatus === ParticipantStatus.Whitelist ? values.whitelist : [],
      startTime: values.startTime?.unix() || 0,
      endTime: values.endTime?.unix() || 0,
      poolName: values.poolName.slice(0, 50),
      tokenFromAddress: values.nft721TokenFrom[0].contractAddr || '',
      tokenIds: values.nft721TokenFrom.map(i => i.tokenId?.toString() || ''),
      tokenToAddress: values.tokenTo.address,
      releaseType: IReleaseType.Cliff,
      releaseData: [
        {
          startAt: values.shouldDelayUnlocking ? values.delayUnlockingTime?.unix() || 0 : values.endTime?.unix() || 0,
          endAtOrRatio: 0
        }
      ]
    }

    if (!currencyTo) {
      return Promise.reject('currencyTo error')
    }
    const amountTotal1 = CurrencyAmount.fromAmount(currencyTo, params.priceFloor)
    const amountEach = CurrencyAmount.fromAmount(currencyTo, params.amountMinIncr1)

    if (ownerIds.length !== values.nft721TokenFrom.length) {
      return Promise.reject('NFT owner error')
    }

    if (!amountTotal1 || !amountEach) {
      return Promise.reject('amountTotal1 or amountEach error')
    }
    if (!chainConfigInBackend?.id) {
      return Promise.reject(new Error('This chain is not supported for the time being'))
    }
    if (!account) {
      return Promise.reject('no account')
    }
    if (!englishAuctionNftContract) {
      return Promise.reject('no contract')
    }

    let merkleroot = ''

    if (params.whitelist.length > 0) {
      const whitelistParams: GetWhitelistMerkleTreeRootParams = {
        addresses: params.whitelist,
        category: PoolType.ENGLISH_AUCTION_NFT,
        chainId: chainConfigInBackend.id
      }
      const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      merkleroot = data.merkleroot
    }

    const signatureParams: GetPoolCreationSignatureParams = {
      amountMin1: amountTotal1.raw.toString(),
      amountTotal0: params.amountTotal0.toString(),
      amountTotal1: amountTotal1.raw.toString(),
      category: PoolType.ENGLISH_AUCTION_NFT,
      chainId: chainConfigInBackend.id,
      claimAt: params.endTime,
      closeAt: params.endTime,
      creator: account,
      is721: true,
      maxAmount1PerWallet: '0',
      merkleroot: merkleroot,
      name: params.poolName,
      openAt: params.startTime,
      token0: params.tokenFromAddress,
      token1: params.tokenToAddress,
      tokenId: '',
      tokenIds: params.tokenIds,
      amountMinIncr1: amountEach.raw.toString()
    }

    const {
      data: { id, expiredTime, signature }
    } = await getPoolCreationSignature(signatureParams)

    const contractCallParams = {
      name: signatureParams.name,
      token0: signatureParams.token0,
      token1: signatureParams.token1,
      tokenIds: signatureParams.tokenIds,
      amountTotal0: signatureParams.amountTotal0,
      amountMin1: signatureParams.amountMin1,
      amountMinIncr1: signatureParams.amountMinIncr1,
      openAt: signatureParams.openAt,
      closeAt: signatureParams.closeAt,
      claimAt: signatureParams.claimAt,
      isERC721: signatureParams.is721,
      whitelistRoot: merkleroot || NULL_BYTES
    }

    const args = [id, contractCallParams, params.releaseType, params.releaseData, false, expiredTime, signature]

    const estimatedGas = await englishAuctionNftContract.estimateGas.createV2(...args).catch((error: Error) => {
      console.debug('Failed to create english auction', error)
      throw error
    })
    return englishAuctionNftContract
      .createV2(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Create english auction for NFT',
          userSubmitted: {
            account,
            action: 'createEnglishAuction'
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1),
          sysId: id,
          getPoolId: (logs: Log[]) => getEventLog(englishAuctionNftContract, logs, 'Created', 'index')
        }
      })
  }, [
    account,
    addTransaction,
    chainConfigInBackend?.id,
    currencyTo,
    englishAuctionNftContract,
    ownerIds.length,
    values.amountMinIncr1,
    values.delayUnlockingTime,
    values.endTime,
    values.nft721TokenFrom,
    values.participantStatus,
    values.poolName,
    values.priceFloor,
    values.shouldDelayUnlocking,
    values.startTime,
    values.tokenTo.address,
    values.whitelist
  ])
}
