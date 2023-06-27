import { getPoolCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import { GetPoolCreationSignatureParams, GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { NULL_BYTES } from '../constants'
import { useActiveWeb3React } from 'hooks'
import { useDutchAuctionContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useAuctionERC20Currency, useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { Currency, CurrencyAmount } from 'constants/token'
import { BigNumber } from 'bignumber.js'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt, Log } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import {
  AllocationStatus,
  AuctionPool,
  IReleaseData,
  IReleaseType,
  ParticipantStatus
} from 'bounceComponents/create-auction-pool/types'
import { Contract } from 'ethers'

interface Params {
  whitelist: string[]
  poolSize: string
  swapRatio: string
  startPrice: string
  reservePrice: string
  times: string
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

export function sortReleaseData(releaseData: IReleaseData[]): IReleaseData[] {
  return releaseData.sort((a, b) => {
    if (a.startAt === null || b.startAt === null) {
      if (a.startAt === null && b.startAt === null) {
        return 0
      } else if (a.startAt === null) {
        return 1
      } else {
        return -1
      }
    }

    return a.startAt.diff(b.startAt)
  })
}

export function getFragmentRawArr(releaseData: IReleaseData[]) {
  if (!releaseData.length) return []
  const arr = releaseData.map(item => {
    const _ca = CurrencyAmount.fromAmount(Currency.getNativeCurrency(), Number(item.ratio) / 100)
    if (!_ca) throw new Error('releaseData error')
    return _ca
  })
  const all = CurrencyAmount.fromAmount(Currency.getNativeCurrency(), '1') as CurrencyAmount

  const arrEnd = arr.slice(0, -1).reduce((a, b) => {
    return a.subtract(b)
  }, all)

  arr[arr.length - 1] = arrEnd
  return arr
}

export function makeValuesReleaseData(values: AuctionPool) {
  const fragmentRawArr = IReleaseType.Fragment === values.releaseType ? getFragmentRawArr(values.releaseDataArr) : []

  return values.releaseType === 1000
    ? [
        {
          startAt: values.endTime?.unix() || 0,
          endAtOrRatio: 0
        }
      ]
    : values.releaseType === IReleaseType.Cliff
    ? [
        {
          startAt: values.shouldDelayUnlocking ? values.delayUnlockingTime?.unix() || 0 : values.endTime?.unix() || 0,
          endAtOrRatio: 0
        }
      ]
    : values.releaseType === IReleaseType.Linear
    ? values.releaseDataArr.map(item => ({
        startAt: item.startAt?.unix() || 0,
        endAtOrRatio: item.endAt?.unix() || 0
      }))
    : values.releaseType === IReleaseType.Fragment
    ? values.releaseDataArr.map((item, idx) => ({
        startAt: item.startAt?.unix() || 0,
        endAtOrRatio: Number(fragmentRawArr[idx].raw.toString())
      }))
    : values.releaseDataArr.map(item => ({
        startAt: item.startAt?.unix() || 0,
        endAtOrRatio: item.ratio || 0
      }))
}

export function useCreateDutchAuctionPool() {
  const { account, chainId } = useActiveWeb3React()
  const dutchAuctionContract = useDutchAuctionContract()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  const { currencyFrom, currencyTo } = useAuctionERC20Currency()
  const addTransaction = useTransactionAdder()
  const values = useValuesState()

  return useCallback(async (): Promise<{
    hash: string
    sysId: number
    transactionReceipt: Promise<TransactionReceipt>
    getPoolId: (logs: Log[]) => string | undefined
  }> => {
    const params: Params = {
      whitelist: values.participantStatus === ParticipantStatus.Whitelist ? values.whitelist : [],
      poolSize: values.poolSize,
      swapRatio: values.swapRatio,
      startPrice: values.startPrice || '',
      reservePrice: values?.reservePrice || '',
      times: values?.segmentAmount || '',
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
          : values.shouldDelayUnlocking || IReleaseType.Cliff === values.releaseType
          ? values.shouldDelayUnlocking
            ? values.delayUnlockingTime?.unix() || 0
            : values.endTime?.unix() || 0
          : values.endTime?.unix() || 0,
      poolName: values.poolName.slice(0, 50),
      tokenFromAddress: values.tokenFrom.address,
      tokenFormDecimal: values.tokenFrom.decimals,
      tokenToAddress: values.tokenTo.address,
      tokenToDecimal: values.tokenTo.decimals,
      releaseType: values.releaseType === 1000 ? IReleaseType.Cliff : values.releaseType,
      releaseData: makeValuesReleaseData(values)
    }

    if (!currencyFrom || !currencyTo) {
      return Promise.reject('currencyFrom or currencyTo error')
    }
    const amountTotal0 = CurrencyAmount.fromAmount(currencyFrom, params.poolSize)
    // const amountTotal1 = CurrencyAmount.fromAmount(currencyTo, params.poolSize)
    const amountMax = CurrencyAmount.fromAmount(currencyFrom, params.startPrice)
    const amountMin = CurrencyAmount.fromAmount(currencyFrom, params.reservePrice)

    if (!amountTotal0) {
      return Promise.reject('amountTotal0 error')
    }
    if (!chainConfigInBackend?.id) {
      return Promise.reject(new Error('This chain is not supported for the time being'))
    }
    if (!account) {
      return Promise.reject('no account')
    }
    if (!dutchAuctionContract) {
      return Promise.reject('no contract')
    }

    let merkleroot = ''

    if (params.whitelist.length > 0) {
      const whitelistParams: GetWhitelistMerkleTreeRootParams = {
        addresses: params.whitelist,
        category: PoolType.Duch,
        chainId: chainConfigInBackend.id
      }
      const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      merkleroot = data.merkleroot
    }

    const signatureParams: GetPoolCreationSignatureParams = {
      amountTotal0: amountTotal0.raw.toString(),
      // amountTotal1: new BigNumber(amountTotal1.raw.toString()).times(params.swapRatio).toFixed(0, BigNumber.ROUND_DOWN),
      category: PoolType.Duch,
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
      releaseData: params.releaseData,
      amountMax1: amountMax?.raw.toString(),
      amountMin1: amountMin?.raw.toString(),
      times: Number(params.times)
    }

    const {
      data: { id, expiredTime, signature }
    } = await getPoolCreationSignature(signatureParams)

    const contractCallParams = {
      name: signatureParams.name,
      token0: signatureParams.token0,
      token1: signatureParams.token1,
      amountTotal0: signatureParams.amountTotal0,
      // amountTotal1: signatureParams.amountTotal1,
      amountMax1: signatureParams.amountMax1,
      amountMin1: signatureParams.amountMin1,
      times: signatureParams.times,
      openAt: signatureParams.openAt,
      claimAt: signatureParams.claimAt,
      closeAt: signatureParams.closeAt,
      // maxAmount1PerWallet: signatureParams.maxAmount1PerWallet,
      whitelistRoot: merkleroot || NULL_BYTES
    }

    const args = [
      id,
      contractCallParams,
      params.releaseType,
      params.releaseData.map(item => ({ ...item, endAtOrRatio: item.endAtOrRatio.toString() })),
      false,
      expiredTime,
      signature
    ]

    const estimatedGas = await dutchAuctionContract.estimateGas.createV2(...args).catch((error: Error) => {
      console.debug('Failed to create dutchAuction', error)
      throw error
    })
    return dutchAuctionContract
      .createV2(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Create dutch auction',
          userSubmitted: {
            account,
            action: 'createDutchAuction'
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1),
          sysId: id,
          getPoolId: (logs: Log[]) => getEventLog(dutchAuctionContract, logs, 'Created', 'index')
        }
      })
  }, [account, addTransaction, chainConfigInBackend?.id, currencyFrom, currencyTo, dutchAuctionContract, values])
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
