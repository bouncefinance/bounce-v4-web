import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useCallback, useMemo } from 'react'
import { useTokenAllowance } from '../data/Allowances'
import { useTransactionAdder, useHasPendingApproval } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils'
import { useTokenContract } from './useContract'
import { useActiveWeb3React } from './index'
import { CurrencyAmount } from '../constants/token/fractions'

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
  console.log('currentAllowance>>>', token, currentAllowance?.toExact())

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
