import { useToolboxERC20TimelockFactory } from './useContract'
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

export function useTokenTimelock(chain: ChainId) {
  const { account, chainId } = useActiveWeb3React()
  const erc20TimelockContract = useToolboxERC20TimelockFactory(chain || chainId)
  const addTransaction = useTransactionAdder()
  return useCallback(
    async (
      title: string,
      tokenAddress: string,
      accountAddress: string,
      amount: number | string,
      releaseTime: string
    ): Promise<any> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!erc20TimelockContract) {
        return Promise.reject('no contract')
      }
      console.log('erc20TimelockContract>>', erc20TimelockContract)
      const args = [title, tokenAddress, accountAddress, amount, releaseTime]
      console.log('Lock args>>>', args)
      const estimatedGas = await erc20TimelockContract.estimateGas
        .deployERC20Timelock(...args, { value: amount })
        .catch((error: Error) => {
          console.debug('Failed to mint token', error)
          throw error
        })
      console.log('estimatedGas>>', estimatedGas)
      return erc20TimelockContract
        .deployERC20Timelock(...args, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          console.log('Lock', 'enter')
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
