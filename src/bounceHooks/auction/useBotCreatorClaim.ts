import { useCallback } from 'react'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { useActiveWeb3React } from 'hooks'
import { useBotFixedSwapERC20Contract } from 'hooks/useContract'

export function useBotCreatorClaim(
  poolId: number | string,
  name: string,
  currentBounceContractAddress: string | undefined
) {
  const { account } = useActiveWeb3React()
  const fixedBotSwapERC20Contract = useBotFixedSwapERC20Contract(currentBounceContractAddress)
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
    if (!fixedBotSwapERC20Contract) {
      return Promise.reject('no contract')
    }

    const args = [poolId]

    const estimatedGas = await fixedBotSwapERC20Contract.estimateGas[funcName](...args).catch((error: Error) => {
      console.debug('Failed to claim for creator', error)
      throw error
    })
    return fixedBotSwapERC20Contract[funcName](...args, {
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
  }, [account, addTransaction, fixedBotSwapERC20Contract, name, poolId])

  return { submitted, run }
}
