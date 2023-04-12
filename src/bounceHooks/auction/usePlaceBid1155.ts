import { FixedSwapNFTPoolProp, PoolType } from 'api/pool/type'
import { getUserWhitelistProof } from 'api/user'
import { useActiveWeb3React } from 'hooks'
import { useFixedSwapNftContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { CurrencyAmount } from 'constants/token'
import JSBI from 'jsbi'

const usePlaceBid1155 = (poolInfo: FixedSwapNFTPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'fixed_price_swap_1155', poolInfo.poolId)

  // const isNotInWhitelist = useIsNotInWhitelist()

  const isToken1Native = poolInfo.currencySwappedTotal1.currency.isNative
  const fixedSwapNFTContract = useFixedSwapNftContract()

  const run = useCallback(
    async (
      bid0Amount: string
    ): Promise<{
      hash: string
      transactionReceipt: Promise<TransactionReceipt>
    }> => {
      if (!Number(bid0Amount)) {
        return Promise.reject('bid0Amount empty')
      }
      if (!account) {
        return Promise.reject('no account')
      }
      if (!fixedSwapNFTContract) {
        return Promise.reject('no contract')
      }
      let proofArr: string[] = []

      if (poolInfo.enableWhiteList) {
        const {
          data: { proof: rawProofStr }
        } = await getUserWhitelistProof({
          address: account,
          category: PoolType.fixedSwapNft,
          chainId: poolInfo.chainId,
          poolId: String(poolInfo.poolId)
        })

        const rawProofJson = JSON.parse(rawProofStr)

        if (Array.isArray(rawProofJson)) {
          proofArr = rawProofJson.map(rawProof => `0x${rawProof}`)
        }
      }

      const currencyBid1Amount = CurrencyAmount.fromRawAmount(
        poolInfo.currencyAmountTotal1.currency,
        JSBI.multiply(
          JSBI.BigInt(bid0Amount),
          JSBI.divide(JSBI.BigInt(poolInfo.amountTotal1), JSBI.BigInt(poolInfo.amountTotal0))
        )
      )

      const args = [poolInfo.poolId, bid0Amount, proofArr]

      const estimatedGas = await fixedSwapNFTContract.estimateGas
        .swap(...args, { value: isToken1Native ? currencyBid1Amount.raw.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to swap', error)
          throw error
        })
      return fixedSwapNFTContract
        .swap(...args, {
          gasLimit: calculateGasMargin(estimatedGas),
          value: isToken1Native ? currencyBid1Amount.raw.toString() : undefined
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Use ${currencyBid1Amount?.toSignificant()} ${poolInfo.token1.symbol} swap to ${
              poolInfo.token0.symbol
            }`,
            userSubmitted: {
              account,
              action: `fixed_price_swap_1155`,
              key: poolInfo.poolId
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [
      account,
      addTransaction,
      fixedSwapNFTContract,
      isToken1Native,
      poolInfo.amountTotal0,
      poolInfo.amountTotal1,
      poolInfo.chainId,
      poolInfo.currencyAmountTotal1.currency,
      poolInfo.enableWhiteList,
      poolInfo.poolId,
      poolInfo.token0.symbol,
      poolInfo.token1.symbol
    ]
  )

  return { run, submitted }
}

export default usePlaceBid1155
