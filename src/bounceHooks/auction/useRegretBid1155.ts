import { FixedSwapNFTPoolProp } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useFixedSwapNftContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'

const useRegretBid1155 = (poolInfo: FixedSwapNFTPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'fixed_price_reverse_1155', poolInfo.poolId)

  // const isNotInWhitelist = useIsNotInWhitelist()

  const fixedSwapNftContract = useFixedSwapNftContract(poolInfo.contract)

  const run = useCallback(
    async (
      token0AmountToRegret: string
    ): Promise<{
      hash: string
      transactionReceipt: Promise<TransactionReceipt>
    }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!fixedSwapNftContract) {
        return Promise.reject('no contract')
      }

      const args = [poolInfo.poolId, token0AmountToRegret]

      const estimatedGas = await fixedSwapNftContract.estimateGas.reverse(...args).catch((error: Error) => {
        console.debug('Failed to regret', error)
        throw error
      })
      return fixedSwapNftContract
        .reverse(...args, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Regret & reverse ${poolInfo.currencyAmountTotal1.currency.symbol}`,
            userSubmitted: {
              account,
              action: `fixed_price_reverse_1155`,
              key: poolInfo.poolId
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [account, addTransaction, fixedSwapNftContract, poolInfo.currencyAmountTotal1.currency.symbol, poolInfo.poolId]
  )

  return { run, submitted }
}

export default useRegretBid1155
