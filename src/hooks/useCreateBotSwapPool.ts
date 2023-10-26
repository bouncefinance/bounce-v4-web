import { getBotPoolCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import { GetPoolCreationSignatureParams, PoolType, GetWhitelistMerkleTreeRootParams } from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { useActiveWeb3React } from 'hooks'
import { useBotFixedSwapERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useAuctionERC20Currency, useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { Currency, CurrencyAmount } from 'constants/token'
import { BigNumber } from 'bignumber.js'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt, Log } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { NULL_BYTES } from '../constants'

import {
  AllocationStatus,
  AuctionPool,
  IReleaseData,
  IReleaseType,
  ParticipantStatus
} from 'bounceComponents/create-auction-pool/types'
import { Contract } from 'ethers'

export interface Params {
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
    const _ca = CurrencyAmount.fromAmount(
      Currency.getNativeCurrency(),
      new BigNumber(item.ratio || 0).dividedBy(100).toString()
    )
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

export function useCreateBotSwapPool() {
  const { account, chainId } = useActiveWeb3React()
  const fixedSwapBotERC20Contract = useBotFixedSwapERC20Contract()
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
    console.log('params', params)

    if (!currencyFrom || !currencyTo) {
      return Promise.reject('currencyFrom or currencyTo error')
    }

    const amountTotal0 = CurrencyAmount.fromAmount(currencyFrom, params.poolSize)
    const amountTotal1 = CurrencyAmount.fromAmount(currencyTo, params.poolSize)
    // console.log(
    //   'currencyFrom',
    //   currencyFrom,
    //   currencyTo,
    //   params.poolSize,
    //   params.tokenFormDecimal,
    //   new BigNumber(params.poolSize).toString(),
    //   params.swapRatio,
    //   new BigNumber(params.poolSize).times(params.swapRatio).toFixed()
    // )

    if (!amountTotal0 || !amountTotal1) {
      return Promise.reject('amountTotal0 or amountTotal1 error')
    }
    if (!chainConfigInBackend?.id) {
      return Promise.reject(new Error('This chain is not supported for the time being'))
    }
    if (!account) {
      return Promise.reject('no account')
    }

    if (!fixedSwapBotERC20Contract) {
      return Promise.reject('no contract')
    }

    const resultAmountTotal1 = CurrencyAmount.fromAmount(
      amountTotal1.currency,
      new BigNumber(params.poolSize).times(params.swapRatio).toFixed()
    )

    // console.log(
    //   'new BigNumber(amountTotal1.toExact()).times(params.swapRatio).toString()',
    //   resultAmountTotal1?.toSignificant(),
    //   amountTotal1.currency,
    //   new BigNumber(params.poolSize).times(params.swapRatio).toFixed()
    // )

    // console.log('resultAmountTotal1', amountTotal1.currency, resultAmountTotal1?.toExact(), resultAmountTotal1)

    let merkleroot = ''
    console.log('1')

    if (params.whitelist.length > 0) {
      const whitelistParams: GetWhitelistMerkleTreeRootParams = {
        addresses: params.whitelist,
        category: PoolType.FixedSwap,
        chainId: chainConfigInBackend.id
      }
      const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      merkleroot = data.merkleroot
    }
    console.log('2')

    const signatureParams: GetPoolCreationSignatureParams = {
      amountTotal0: amountTotal0.raw.toString(),
      amountTotal1: resultAmountTotal1?.raw.toString(),
      category: PoolType.FixedSwap,
      chainId: chainConfigInBackend.id,
      openAt: params.startTime,
      claimAt: 0,
      closeAt: params.endTime,
      creator: account,
      maxAmount1PerWallet: CurrencyAmount.fromAmount(currencyTo, params.allocationPerWallet)?.raw.toString() || '0',
      merkleroot: merkleroot,
      name: params.poolName,
      token0: params.tokenFromAddress,
      token1: params.tokenToAddress
    }
    const {
      data: { id, expiredTime, signature }
    } = await getBotPoolCreationSignature(signatureParams)
    const contractCallParams = {
      name: signatureParams.name,
      token0: signatureParams.token0,
      token1: signatureParams.token1,
      amountTotal0: signatureParams.amountTotal0,
      amountTotal1: signatureParams.amountTotal1,
      openAt: signatureParams.openAt,
      closeAt: signatureParams.closeAt,
      claimAt: 0,
      whitelistRoot: merkleroot || NULL_BYTES,
      maxAmount1PerWallet: signatureParams.maxAmount1PerWallet
    }

    const args = [
      id,
      contractCallParams,
      IReleaseType.Instant,
      [],
      false,
      !!values.enableReverse,
      expiredTime,
      signature
    ]
    console.log('🚀 ~ file: useCreateFixedSwapPool.ts:230 ~ returnuseCallback ~ args:', args)

    const estimatedGas = await fixedSwapBotERC20Contract.estimateGas.createV2(...args).catch((error: Error) => {
      console.log('estimatedGas', error)
      console.debug('Failed to create fixedSwap', error)
      throw error
    })
    console.log('estimatedGas', estimatedGas)

    return fixedSwapBotERC20Contract
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
          sysId: id,
          getPoolId: (logs: Log[]) => getEventLog(fixedSwapBotERC20Contract, logs, 'Created', 'index')
        }
      })
  }, [account, addTransaction, chainConfigInBackend?.id, currencyFrom, currencyTo, fixedSwapBotERC20Contract, values])
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
