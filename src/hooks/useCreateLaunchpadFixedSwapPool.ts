import { getPoolCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import { GetPoolCreationSignatureParams, GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { NULL_BYTES } from '../constants'
import { useActiveWeb3React } from 'hooks'
import { useFixedSwapERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { Currency, CurrencyAmount } from 'constants/token'
import { BigNumber } from 'bignumber.js'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt, Log } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'

import { Params, getEventLog } from './useCreateFixedSwapPool'
import { IPoolInfoParams } from 'pages/launchpad/create-launchpad/type'
const NO_LIMIT_ALLOCATION = '0'

function getFragmentRawArr(releaseData: { startAt: number; endAtOrRatio: number }[]) {
  if (!releaseData.length) return []
  const arr = releaseData.map(item => {
    const _ca = CurrencyAmount.fromAmount(
      Currency.getNativeCurrency(),
      new BigNumber(item.endAtOrRatio || 0).dividedBy(100).toString()
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
export function makeValuesReleaseData(values: IPoolInfoParams) {
  const fragmentRawArr =
    IReleaseType.Fragment === values.releaseType ? getFragmentRawArr(values.releaseData as any) : []
  return values.releaseType === IReleaseType.Cliff
    ? [
        {
          startAt: values.releaseData[0].startAt || 0,
          endAtOrRatio: 0
        }
      ]
    : values.releaseType === IReleaseType.Linear
    ? values.releaseData.map(item => ({
        startAt: item.startAt || 0,
        endAtOrRatio: item.endAtOrRatio || 0
      }))
    : values.releaseType === IReleaseType.Fragment
    ? values.releaseData.map((item, idx) => {
        console.log('fragmentRawArr[idx].raw.toString()')
        console.log(fragmentRawArr[idx])
        return {
          startAt: item.startAt || 0,
          endAtOrRatio: Number(fragmentRawArr[idx].raw.toString())
        }
      })
    : values.releaseData.map(item => ({
        startAt: item.startAt || 0,
        endAtOrRatio: item.endAtOrRatio || 0
      }))
}
export function useCreateLaunchpadFixedSwapPool({
  currencyFrom,
  currencyTo,
  poolInfo
}: {
  currencyFrom: Currency
  currencyTo: Currency
  poolInfo: IPoolInfoParams
}) {
  const { account, chainId } = useActiveWeb3React()
  const fixedSwapERC20Contract = useFixedSwapERC20Contract()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  // const { currencyFrom, currencyTo } = useAuctionERC20Currency()
  const addTransaction = useTransactionAdder()
  // const values = useValuesState()

  return useCallback(async (): Promise<{
    hash: string
    sysId: number
    transactionReceipt: Promise<TransactionReceipt>
    getPoolId: (logs: Log[]) => string | undefined
  }> => {
    const params: Params = {
      whitelist: poolInfo.whitelistEnabled ? poolInfo.whitelistAddresses || [] : [],
      poolSize: poolInfo.totalAmount0 || '',
      swapRatio: poolInfo.ratio,
      allocationPerWallet:
        Number(poolInfo.maxAmount1PerWallet) > 0
          ? new BigNumber(poolInfo.maxAmount1PerWallet || '').toString()
          : NO_LIMIT_ALLOCATION,
      startTime: poolInfo.openAt || 0,
      endTime: poolInfo.closeAt || 0,
      delayUnlockingTime:
        IReleaseType.Linear === poolInfo.releaseType || IReleaseType.Fragment === poolInfo.releaseType
          ? poolInfo.releaseData?.[0].startAt || 0
          : IReleaseType.Instant === poolInfo.releaseType
          ? 0
          : IReleaseType.Cliff === poolInfo.releaseType
          ? poolInfo.releaseData?.[0].startAt || 0
          : poolInfo.closeAt || 0,
      poolName: poolInfo.name ? poolInfo.name.slice(0, 50) : '',
      tokenFromAddress: poolInfo.token0 || '',
      tokenFormDecimal: poolInfo.token0Decimals || '',
      tokenToAddress: currencyTo.address,
      tokenToDecimal: currencyTo.decimals,
      releaseType: poolInfo.releaseType,
      releaseData: makeValuesReleaseData(poolInfo)
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
      amountTotal1: new BigNumber(amountTotal1.raw.toString()).times(params.swapRatio).toFixed(0, BigNumber.ROUND_DOWN),
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
      data: { id, expiredTime, signature }
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
    console.log('contractCallParams', contractCallParams)

    const args = [
      id,
      contractCallParams,
      params.releaseType,
      params.releaseData.map(item => ({ ...item, endAtOrRatio: item.endAtOrRatio.toString() })),
      false,
      !!poolInfo.reverseEnabled,
      expiredTime,
      signature
    ]
    console.log('🚀 ~ file: useCreateFixedSwapPool.ts:230 ~ returnuseCallback ~ args:', args)

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
          sysId: id,
          getPoolId: (logs: Log[]) => getEventLog(fixedSwapERC20Contract, logs, 'Created', 'index')
        }
      })
  }, [account, addTransaction, chainConfigInBackend, currencyFrom, currencyTo, fixedSwapERC20Contract, poolInfo])
}
