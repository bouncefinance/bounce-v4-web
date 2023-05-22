import { FixedSwapPoolProp } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useFixedSwapERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { CurrencyAmount } from 'constants/token'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'

const useRegretBid = (poolInfo: FixedSwapPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'fixed_price_reverse', poolInfo.poolId)

  // const isNotInWhitelist = useIsNotInWhitelist()

  const fixedSwapERC20Contract = useFixedSwapERC20Contract(poolInfo.currentBounceContractAddress)

  const run = useCallback(
    async (
      token0AmountToRegret: CurrencyAmount
    ): Promise<{
      hash: string
      transactionReceipt: Promise<TransactionReceipt>
    }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!fixedSwapERC20Contract) {
        return Promise.reject('no contract')
      }

      const args = [poolInfo.poolId, token0AmountToRegret.raw.toString()]

      const estimatedGas = await fixedSwapERC20Contract.estimateGas.reverse(...args).catch((error: Error) => {
        console.debug('Failed to regret', error)
        throw error
      })
      return fixedSwapERC20Contract
        .reverse(...args, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Regret & reverse ${poolInfo.currencyAmountTotal1.currency.symbol}`,
            userSubmitted: {
              account,
              action: `fixed_price_reverse`,
              key: poolInfo.poolId
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [account, addTransaction, fixedSwapERC20Contract, poolInfo.currencyAmountTotal1.currency.symbol, poolInfo.poolId]
  )

  return { run, submitted }
}

export default useRegretBid
