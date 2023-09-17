import {
  useToolboxERC20TimelockFactory,
  useToolboxERC20TimelockLineFactory,
  useToolboxERC721TimelockFactory,
  useWithDrawVestingContract
} from './useContract'
import { useActiveWeb3React } from './index'
import { ChainId } from '../constants/chain'
import { useCallback, useMemo } from 'react'
import { calculateGasMargin } from '../utils'
import { useTokenAllowance } from '../data/Allowances'
import { useTransactionAdder, useHasPendingApproval } from '../state/transactions/hooks'
import { CurrencyAmount } from 'constants/token'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useTokenContract } from './useContract'
import { MaxUint256 } from '@ethersproject/constants'
import { useRequest } from 'ahooks'
import { getExchangeList } from 'api/toolbox'
import { useWithDrawContract } from './useContract'
import { useSingleCallResult } from 'state/multicall/hooks'

// normal
export function useTokenTimelock(chain: ChainId) {
  const { account, chainId } = useActiveWeb3React()
  const erc20TimelockContract = useToolboxERC20TimelockFactory(chain || chainId)
  const addTransaction = useTransactionAdder()
  return useCallback(
    async (
      title: string,
      tokenAddress: string,
      accountAddress: string,
      amount: CurrencyAmount | undefined,
      releaseTime: string
    ): Promise<{ transactionReceipt: Promise<TransactionReceipt>; hash: string }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!erc20TimelockContract) {
        return Promise.reject('no contract')
      }
      if (!(amount instanceof CurrencyAmount)) {
        return Promise.reject('no amount')
      }
      const args = [title, tokenAddress, accountAddress, amount?.raw.toString(), releaseTime]
      const isToken1Native = amount?.currency.isNative
      const estimatedGas = await erc20TimelockContract.estimateGas
        .deployERC20Timelock(...args, { value: isToken1Native ? amount?.raw?.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to mint token', error)
          throw error
        })
      return erc20TimelockContract
        .deployERC20Timelock(...args, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: 'Lock token',
            userSubmitted: {
              account,
              action: 'deployERC20Timelock'
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [account, addTransaction, erc20TimelockContract]
  )
}
// stage
export function useTokenTimeStagelock(chain: ChainId) {
  const { account, chainId } = useActiveWeb3React()
  const erc20TimelockContract = useToolboxERC20TimelockFactory(chain || chainId)
  const addTransaction = useTransactionAdder()
  return useCallback(
    async (
      title: string,
      tokenAddress: string,
      accountAddress: string,
      amount: CurrencyAmount | undefined,
      releaseTime: string[][]
    ): Promise<{ transactionReceipt: Promise<TransactionReceipt>; hash: string }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!erc20TimelockContract) {
        return Promise.reject('no contract')
      }
      if (!(amount instanceof CurrencyAmount)) {
        return Promise.reject('no amount')
      }
      const args = [title, tokenAddress, accountAddress, amount?.raw.toString(), releaseTime]
      const isToken1Native = amount?.currency.isNative
      const estimatedGas = await erc20TimelockContract.estimateGas
        .deployERC20MultiTimelock(...args, { value: isToken1Native ? amount?.raw?.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to mint token', error)
          throw error
        })
      return erc20TimelockContract
        .deployERC20MultiTimelock(...args, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: 'Lock token',
            userSubmitted: {
              account,
              action: 'deployERC20MultiTimelock'
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [account, addTransaction, erc20TimelockContract]
  )
}
// linear
export function useTokenTimeLinearlock(chain: ChainId) {
  const { account, chainId } = useActiveWeb3React()
  const erc20TimelockContract = useToolboxERC20TimelockLineFactory(chain || chainId)
  const addTransaction = useTransactionAdder()
  return useCallback(
    async (
      title: string,
      tokenAddress: string,
      accountAddress: string,
      startAt: string,
      duration: string,
      amount: CurrencyAmount | undefined
    ): Promise<{ transactionReceipt: Promise<TransactionReceipt>; hash: string }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!erc20TimelockContract) {
        return Promise.reject('no contract')
      }
      if (!(amount instanceof CurrencyAmount)) {
        return Promise.reject('no amount')
      }
      const args = [title, tokenAddress, accountAddress, startAt, duration, amount?.raw.toString()]
      const isToken1Native = amount?.currency.isNative
      const estimatedGas = await erc20TimelockContract.estimateGas
        .deployERC20Vesting(...args, { value: isToken1Native ? amount?.raw?.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to mint token', error)
          throw error
        })
      return erc20TimelockContract
        .deployERC20Vesting(...args, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: 'Lock token',
            userSubmitted: {
              account,
              action: 'deployERC20MultiTimelock'
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [account, addTransaction, erc20TimelockContract]
  )
}
//  LP v2 normal: ToolboxERC20TimelockFactory.deployUniswapV2Timelock
export function useDeployUniswapV2Timelock(chain: ChainId) {
  const { account, chainId } = useActiveWeb3React()
  const erc20TimelockContract = useToolboxERC20TimelockFactory(chain || chainId)
  const addTransaction = useTransactionAdder()
  return useCallback(
    async (
      uniswapAddress: string,
      title: string,
      tokenAddress: string,
      accountAddress: string,
      amount: CurrencyAmount | undefined,
      releaseTime: string
    ): Promise<{ transactionReceipt: Promise<TransactionReceipt>; hash: string }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!erc20TimelockContract) {
        return Promise.reject('no contract')
      }
      const args = [uniswapAddress, title, tokenAddress, accountAddress, amount?.raw.toString(), releaseTime]
      const isToken1Native = amount?.currency.isNative
      const estimatedGas = await erc20TimelockContract.estimateGas
        .deployUniswapV2Timelock(...args, { value: isToken1Native ? amount?.raw?.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to mint token', error)
          throw error
        })
      return erc20TimelockContract
        .deployUniswapV2Timelock(...args, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: 'Lock token',
            userSubmitted: {
              account,
              action: 'deployERC20V2MultiTimelock'
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [account, addTransaction, erc20TimelockContract]
  )
}
//  LP v3 normal: ToolboxERC721TimelockFactory.deployUniswapV3Timelock
export function useDeployUniswapV3Timelock(chain: ChainId) {
  const { account, chainId } = useActiveWeb3React()
  const erc721TimelockContract = useToolboxERC721TimelockFactory(chain || chainId)
  const addTransaction = useTransactionAdder()
  return useCallback(
    async (
      uniswapAddress: string,
      title: string,
      tokenAddress: string,
      id: string,
      accountAddress: string,
      releaseTime: string
    ): Promise<{ transactionReceipt: Promise<TransactionReceipt>; hash: string }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!erc721TimelockContract) {
        return Promise.reject('no contract')
      }
      const args = [uniswapAddress, title, tokenAddress, id, accountAddress, releaseTime]
      const estimatedGas = await erc721TimelockContract.estimateGas
        .deployUniswapV3Timelock(...args)
        .catch((error: Error) => {
          console.debug('Failed to mint token', error)
          throw error
        })
      return erc721TimelockContract
        .deployUniswapV3Timelock(...args, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: 'Lock token',
            userSubmitted: {
              account,
              action: 'deployERC721MultiTimelock'
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [account, addTransaction, erc721TimelockContract]
  )
}
export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED
}
// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount,
  spender?: string,
  useExact?: boolean
): [ApprovalState, () => Promise<{ transactionReceipt: Promise<TransactionReceipt> }>] {
  const { account } = useActiveWeb3React()
  const token = amountToApprove instanceof CurrencyAmount ? amountToApprove.currency : undefined
  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(token?.address, spender)
  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, pendingApproval, spender])

  const tokenContract = useTokenContract(!token?.isNative ? token?.address : undefined)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<{ transactionReceipt: Promise<TransactionReceipt> }> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return Promise.reject('approve was called unnecessarily')
    }
    if (!token) {
      console.error('no token')
      return Promise.reject('no token')
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return Promise.reject('tokenContract is null')
    }

    if (!amountToApprove) {
      console.error('missing amount to approve')
      return Promise.reject('missing amount to approve')
    }

    if (!spender) {
      console.error('no spender')
      return Promise.reject('no spender')
    }
    const estimatedGas = useExact
      ? await tokenContract.estimateGas.approve(spender, amountToApprove.raw.toString())
      : await tokenContract.estimateGas.approve(spender, MaxUint256)

    return tokenContract
      .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve ' + amountToApprove.currency.symbol,
          approval: { tokenAddress: token.address, spender: spender }
        })
        return { transactionReceipt: response.wait(1) }
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [approvalState, token, tokenContract, amountToApprove, spender, useExact, addTransaction])

  return [approvalState, approve]
}
export function useGetExchangeList(chainId: number, chainType: number) {
  return useRequest(
    async () => {
      const response = await getExchangeList({
        chainId,
        chainType,
        limit: 999,
        offset: 0
      })
      return response?.data?.list
    },
    {
      refreshDeps: [chainId],
      debounceWait: 100
    }
  )
}
export function useWithDrawByTokenLock(contractAddress: string, queryChainId?: number) {
  const { account } = useActiveWeb3React()
  const withdrawContract = useWithDrawContract(contractAddress, queryChainId)
  const addTransaction = useTransactionAdder()
  return useCallback(async (): Promise<{ transactionReceipt: Promise<TransactionReceipt> }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!withdrawContract) {
      return Promise.reject('no contract')
    }
    const estimatedGas = await withdrawContract.estimateGas.release().catch((error: Error) => {
      console.debug('Failed to withdraw token', error)
      throw error
    })
    return withdrawContract
      .release({
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'withdraw token',
          userSubmitted: {
            account,
            action: 'deployERC20TimelockWithdraw'
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1)
        }
      })
  }, [account, addTransaction, withdrawContract])
}
// token lock ToolboxERC20Timelock.releasable() // normal stage
export const useReleasableERC20 = (contractAddress: string, queryChainId?: number): string => {
  const erc20TimelockContract = useWithDrawContract(contractAddress, queryChainId)
  const releasable = useSingleCallResult(erc20TimelockContract, 'releasableAmount').result
  const released = useSingleCallResult(erc20TimelockContract, 'releasedAmount').result
  console.log('releasable>>>', releasable, released)
  return useMemo(() => {
    return (
      (releasable?.[0] &&
        released?.[0] &&
        releasable?.[0].comparedTo(released?.[0]) === 1 &&
        releasable.minus(released).toString()) ||
      '0'
    )
  }, [releasable, released])
}
// useWithDrawVestingContract
export const useReleasableVestingERC20 = (contractAddress: string, queryChainId?: number): string => {
  const erc20TimelockContract = useWithDrawVestingContract(contractAddress, queryChainId)
  const res = useSingleCallResult(erc20TimelockContract, 'releasable').result
  return res?.[0]?.toString()
}
