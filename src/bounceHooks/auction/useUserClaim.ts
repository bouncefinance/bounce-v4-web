import { FixedSwapPoolProp } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useFixedSwapERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'

const useUserClaim = (poolInfo: FixedSwapPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'fixed_price_user_claim', poolInfo.poolId)

  const fixedSwapERC20Contract = useFixedSwapERC20Contract(poolInfo.currentBounceContractAddress)

  const run = useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!fixedSwapERC20Contract) {
      return Promise.reject('no contract')
    }

    const args = [poolInfo.poolId]

    const estimatedGas = await fixedSwapERC20Contract.estimateGas.userClaim(...args).catch((error: Error) => {
      console.debug('Failed to claim', error)
      throw error
    })
    return fixedSwapERC20Contract
      .userClaim(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Claim token ${poolInfo.currencySurplusTotal0.currency.symbol}`,
          userSubmitted: {
            account,
            action: `fixed_price_user_claim`,
            key: poolInfo.poolId
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1)
        }
      })
  }, [account, addTransaction, fixedSwapERC20Contract, poolInfo.currencySurplusTotal0.currency.symbol, poolInfo.poolId])

  return { run, submitted }
}

export default useUserClaim
