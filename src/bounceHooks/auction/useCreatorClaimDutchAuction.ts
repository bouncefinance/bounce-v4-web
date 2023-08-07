import { useCallback } from 'react'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { useActiveWeb3React } from 'hooks'
import { useDutchAuctionContract } from 'hooks/useContract'

export function useCreatorClaim(
  poolId: number | string,
  name: string,
  currentBounceContractAddress: string | undefined
) {
  const { account } = useActiveWeb3React()
  const dutchAuctionContract = useDutchAuctionContract(currentBounceContractAddress)
  const addTransaction = useTransactionAdder()
  const funcName = 'creatorClaim'

  const submitted = useUserHasSubmittedRecords(account || undefined, funcName, poolId)

  const run = useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!dutchAuctionContract) {
      return Promise.reject('no contract')
    }

    const args = [poolId]

    const estimatedGas = await dutchAuctionContract.estimateGas[funcName](...args).catch((error: Error) => {
      console.debug('Failed to claim for creator', error)
      throw error
    })
    return dutchAuctionContract[funcName](...args, {
      gasLimit: calculateGasMargin(estimatedGas)
    }).then((response: TransactionResponse) => {
      addTransaction(response, {
        summary: `Creator claim assets for ${name}`,
        userSubmitted: {
          account,
          action: funcName,
          key: poolId
        }
      })
      return {
        hash: response.hash,
        transactionReceipt: response.wait(1)
      }
    })
  }, [account, addTransaction, dutchAuctionContract, name, poolId])

  return { submitted, run }
}
