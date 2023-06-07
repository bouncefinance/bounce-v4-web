import { FixedSwapNFTPoolProp } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useFixedSwapNftContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'

const useUserClaim1155 = (poolInfo: FixedSwapNFTPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'fixed_price_user_claim_1155', poolInfo.poolId)

  const fixedSwapNftContract = useFixedSwapNftContract(poolInfo.contract)

  const run = useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!fixedSwapNftContract) {
      return Promise.reject('no contract')
    }

    const args = [poolInfo.poolId]

    const estimatedGas = await fixedSwapNftContract.estimateGas.userClaim(...args).catch((error: Error) => {
      console.debug('Failed to claim', error)
      throw error
    })
    return fixedSwapNftContract
      .userClaim(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Claim token ${poolInfo.token0.symbol}`,
          userSubmitted: {
            account,
            action: `fixed_price_user_claim_1155`,
            key: poolInfo.poolId
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1)
        }
      })
  }, [account, addTransaction, fixedSwapNftContract, poolInfo.poolId, poolInfo.token0.symbol])

  return { run, submitted }
}

export default useUserClaim1155
