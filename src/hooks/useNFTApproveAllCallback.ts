import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useCallback, useMemo } from 'react'
import { useHasPendingApproval, useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils'
import { Contract } from '@ethersproject/contracts'
import { useSingleCallResult } from '../state/multicall/hooks'
import { ApprovalState } from './useApproveCallback'
import { useActiveWeb3React } from '.'
import { useERC721Contract } from './useContract'
import useModal from './useModal'

export function useGetApproved(contract: Contract | undefined, spender: string | undefined) {
  const { account } = useActiveWeb3React()
  const res = useSingleCallResult(account ? contract : null, 'isApprovedForAll', [account || '', spender])
  return useMemo(() => {
    if (res.loading || !res.result) return undefined
    return res.result?.[0]
  }, [res.loading, res.result])
}

export function useNFTApproveAllCallback(
  contractAddress: string | undefined,
  spender: string | undefined
): [ApprovalState, () => Promise<{ transactionReceipt: Promise<TransactionReceipt> }>] {
  // const { account } = useActiveWeb3React()
  const { hideModal } = useModal()
  const contract = useERC721Contract(contractAddress)
  const isApproved = useGetApproved(contract ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(contract?.address, spender)
  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    // if (!spender) return ApprovalState.UNKNOWN
    // we might not have enough data to know whether or not we need to approve
    if (isApproved) return ApprovalState.APPROVED
    if (pendingApproval) return ApprovalState.PENDING
    if (isApproved === undefined) return ApprovalState.UNKNOWN
    return ApprovalState.NOT_APPROVED
  }, [isApproved, pendingApproval])

  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<{ transactionReceipt: Promise<TransactionReceipt> }> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return Promise.reject('approve was called unnecessarily')
    }

    if (!contract) {
      console.error('Contract is null')
      return Promise.reject('tokenContract is null')
    }

    if (!spender) {
      console.error('no spender')
      return Promise.reject('no spender')
    }

    const estimatedGas = await contract.estimateGas.setApprovalForAll(spender, true).catch((error: Error) => {
      console.debug('Failed to approve nft', error)
      throw error
    })

    return contract
      .setApprovalForAll(spender, true, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        hideModal()
        addTransaction(response, {
          summary: 'Approve NFT',
          approval: { tokenAddress: contract.address, spender }
        })
        return { transactionReceipt: response.wait(1) }
      })
      .catch((error: Error) => {
        hideModal()
        console.debug('Failed to approve nft', error)
        throw error
      })
  }, [approvalState, contract, spender, hideModal, addTransaction])

  return [approvalState, approve]
}
