import { DutchAuctionPoolProp } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useDutchAuctionContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'

const useUserClaim = (poolInfo: DutchAuctionPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'dutch_auction_user_claim', poolInfo.poolId)

  const dutchAuctionContract = useDutchAuctionContract(poolInfo.contract)

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

    const args = [poolInfo.poolId]

    const estimatedGas = await dutchAuctionContract.estimateGas.userClaim(...args).catch((error: Error) => {
      console.debug('Failed to claim', error)
      throw error
    })
    return dutchAuctionContract
      .userClaim(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Claim token ${poolInfo?.currencyAmountTotal0?.currency?.symbol}`,
          userSubmitted: {
            account,
            action: `dutch_auction_user_claim`,
            key: poolInfo.poolId
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1)
        }
      })
  }, [account, addTransaction, dutchAuctionContract, poolInfo?.currencyAmountTotal0?.currency?.symbol, poolInfo.poolId])

  return { run, submitted }
}

export default useUserClaim
