import { FixedSwapPoolProp } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useRandomSelectionERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'

const useRegretBid = (poolInfo: FixedSwapPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'random_selection_reverse', poolInfo.poolId)

  // const isNotInWhitelist = useIsNotInWhitelist()

  const randomSelectionERC20Contract = useRandomSelectionERC20Contract(poolInfo.contract)

  const run = useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!randomSelectionERC20Contract) {
      return Promise.reject('no contract')
    }
    const args = [poolInfo.poolId]
    const estimatedGas = await randomSelectionERC20Contract.estimateGas.reverse(...args).catch((error: Error) => {
      console.debug('Failed to regret', error)
      throw error
    })
    return randomSelectionERC20Contract
      .reverse(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Regret & reverse ${poolInfo.token1.symbol}`,
          userSubmitted: {
            account,
            action: `random_selection_reverse`,
            key: poolInfo.poolId
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1)
        }
      })
  }, [account, randomSelectionERC20Contract, poolInfo.poolId, poolInfo.token1.symbol, addTransaction])

  return { run, submitted }
}

export default useRegretBid
