import { getPoolCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import { GetPoolCreationSignatureParams, GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { NULL_BYTES } from '../constants'
import { useActiveWeb3React } from 'hooks'
import { useRandomSelectionERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useAuctionERC20Currency, useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { CurrencyAmount } from 'constants/token'
import { BigNumber } from 'bignumber.js'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt, Log } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { ParticipantStatus } from 'bounceComponents/create-auction-pool/types'
import { Contract } from 'ethers'
import { useSingleCallResult } from '../state/multicall/hooks'
interface Params {
  whitelist: string[]
  swapRatio: string
  startTime: number
  endTime: number
  delayUnlockingTime: number
  poolName: string
  tokenFromAddress: string
  tokenToAddress: string
  tokenFormDecimal: string | number
  tokenToDecimal: string | number
  totalShare: string | number
  ticketPrice: string | number
  maxPlayer: number
}

export function useCreateRandomSelectionPool() {
  const { account, chainId } = useActiveWeb3React()
  const randomSelectionERC20Contract = useRandomSelectionERC20Contract()
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
      swapRatio: values.swapRatio,
      startTime: values.startTime?.unix() || 0,
      endTime: values.endTime?.unix() || 0,
      delayUnlockingTime: values.shouldDelayUnlocking
        ? values.delayUnlockingTime?.unix() || 0
        : values.endTime?.unix() || 0,
      poolName: values.poolName.slice(0, 50),
      tokenFromAddress: values.tokenFrom.address,
      tokenFormDecimal: values.tokenFrom.decimals,
      tokenToAddress: values.tokenTo.address,
      tokenToDecimal: values.tokenTo.decimals,
      totalShare: Number(values.winnerNumber) || 0,
      ticketPrice: values.ticketPrice || 0,
      maxPlayer: Number(values.maxParticipantAllowed) || 0
    }

    if (!currencyFrom || !currencyTo) {
      return Promise.reject('currencyFrom or currencyTo error')
    }
    const amountTotal0 = CurrencyAmount.fromAmount(
      currencyFrom,
      new BigNumber(params.swapRatio).times(params.totalShare).toString()
    )
    const amountMin1 = CurrencyAmount.fromAmount(currencyTo, params.ticketPrice)
    if (!amountTotal0) {
      return Promise.reject('amountTotal0 error')
    }
    if (!amountMin1) {
      return Promise.reject('amountMin1 error')
    }
    if (!chainConfigInBackend?.id) {
      return Promise.reject(new Error('This chain is not supported for the time being'))
    }
    if (!account) {
      return Promise.reject('no account')
    }
    if (!randomSelectionERC20Contract) {
      return Promise.reject('no contract')
    }

    let merkleroot = ''

    if (params.whitelist.length > 0) {
      const whitelistParams: GetWhitelistMerkleTreeRootParams = {
        addresses: params.whitelist,
        category: PoolType.Lottery,
        chainId: chainConfigInBackend.id
      }
      const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      merkleroot = data.merkleroot
    }

    const signatureParams: GetPoolCreationSignatureParams = {
      amountMin1: amountMin1.raw.toString(),
      amountTotal0: amountTotal0.raw.toString(),
      category: PoolType.Lottery,
      chainId: chainConfigInBackend.id,
      claimAt: params.delayUnlockingTime,
      closeAt: params.endTime,
      creator: account,
      maxAmount1PerWallet: amountMin1.raw.toString(),
      merkleroot: merkleroot,
      maxPlayer: Number(params.maxPlayer),
      name: params.poolName,
      openAt: params.startTime,
      token0: params.tokenFromAddress,
      token1: params.tokenToAddress,
      totalShare: params.totalShare
    }

    const {
      data: { id, expiredTime, signature }
    } = await getPoolCreationSignature(signatureParams)

    const contractCallParams = {
      name: signatureParams.name,
      token0: signatureParams.token0,
      token1: signatureParams.token1,
      amountTotal0: signatureParams.amountTotal0,
      amount1PerWallet: signatureParams.maxAmount1PerWallet,
      openAt: signatureParams.openAt,
      claimAt: signatureParams.claimAt,
      closeAt: signatureParams.closeAt,
      maxPlayer: Number(params.maxPlayer),
      nShare: signatureParams.totalShare,
      whitelistRoot: merkleroot || NULL_BYTES
    }
    const args = [contractCallParams, expiredTime, signature]
    console.log('args>>>', args)
    const estimatedGas = await randomSelectionERC20Contract.estimateGas.create(...args).catch((error: Error) => {
      console.debug('Failed to create Random Selection', error)
      throw error
    })
    console.log('estimatedGas>>>', estimatedGas)
    return randomSelectionERC20Contract
      .create(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
        // gasLimit: 3500000
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Create Random Selection auction',
          userSubmitted: {
            account,
            action: 'createERC20RandomSelectionAuction'
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1),
          sysId: id,
          getPoolId: (logs: Log[]) => getEventLog(randomSelectionERC20Contract, logs, 'Created', 'index')
        }
      })
  }, [
    account,
    addTransaction,
    chainConfigInBackend?.id,
    currencyFrom,
    currencyTo,
    randomSelectionERC20Contract,
    values.delayUnlockingTime,
    values.endTime,
    values.maxParticipantAllowed,
    values.participantStatus,
    values.poolName,
    values.shouldDelayUnlocking,
    values.startTime,
    values.swapRatio,
    values.ticketPrice,
    values.tokenFrom.address,
    values.tokenFrom.decimals,
    values.tokenTo.address,
    values.tokenTo.decimals,
    values.whitelist,
    values.winnerNumber
  ])
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
export function useIsWinnerForRandomSelectionPool(
  poolId: string | number,
  address: string | undefined
): { isWinner: boolean } {
  const randomSelectionERC20Contract = useRandomSelectionERC20Contract()
  const args = [Number(poolId), address]
  const { result } = useSingleCallResult(randomSelectionERC20Contract, 'isWinner', args)
  const isWinner = Array.isArray(result) && result[0]
  return {
    isWinner: !!isWinner
  }
}
export function useIsJoinedRandomSelectionPool(poolId: string | number, address: string | undefined) {
  const randomSelectionERC20Contract = useRandomSelectionERC20Contract()
  const args = [address, Number(poolId)]
  const { result } = useSingleCallResult(randomSelectionERC20Contract, 'betNo', args)
  // betNo more that 0 means joined
  return !!result ? !!(Number(result?.toString && result?.toString()) > 0) : false
}
// winnerSeed more than 0 means winners list is ready
export function useIsWinnerSeedDone(poolId: number | string) {
  const randomSelectionERC20Contract = useRandomSelectionERC20Contract()
  const args = [Number(poolId)]
  const res = useSingleCallResult(randomSelectionERC20Contract, 'winnerSeed', args)
  const { result } = res
  console.log('winnerSeed === 0 means winners list not ready result>>>', res, result && result?.toString())
  // load winners list if isWinnerSeedDone is more that 0
  return !!result ? !!(Number(result?.toString && result?.toString()) > 0) : false
}
