import { FixedSwapPoolProp } from 'api/pool/type'
import { getUserWhitelistProof } from 'api/user'
import { useActiveWeb3React } from 'hooks'
import { useRandomSelectionERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { CurrencyAmount } from 'constants/token'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import getTokenType from 'utils/getTokenType'

const useRandomSelectionPlaceBid = (poolInfo: FixedSwapPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'random_selection_swap', poolInfo.poolId)

  // const isNotInWhitelist = useIsNotInWhitelist()
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

  const isToken1Native = poolInfo.token1.address === ZERO_ADDRESS
  const randomSelectionERC20Contract = useRandomSelectionERC20Contract(poolInfo.contract)

  const run = useCallback(
    async (
      bidAmount: CurrencyAmount
    ): Promise<{
      hash: string
      transactionReceipt: Promise<TransactionReceipt>
    }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!randomSelectionERC20Contract) {
        return Promise.reject('no contract')
      }
      let proofArr: string[] = []

      if (poolInfo.enableWhiteList) {
        const {
          data: { proof: rawProofStr }
        } = await getUserWhitelistProof({
          address: account,
          category: poolInfo.category,
          chainId: poolInfo.chainId,
          poolId: String(poolInfo.poolId),
          tokenType: getTokenType(poolInfo.category)
        })

        const rawProofJson = JSON.parse(rawProofStr)

        if (Array.isArray(rawProofJson)) {
          proofArr = rawProofJson.map(rawProof => `0x${rawProof}`)
        }
      }

      const args = [poolInfo.poolId, proofArr]
      console.log('bidAmount.raw.toString()>>>', bidAmount.raw.toString())
      const estimatedGas = await randomSelectionERC20Contract.estimateGas
        .bet(...args, { value: isToken1Native ? bidAmount.raw.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to swap', error)
          throw error
        })
      return randomSelectionERC20Contract
        .bet(...args, {
          gasLimit: calculateGasMargin(estimatedGas),
          value: isToken1Native ? bidAmount.raw.toString() : undefined
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Use ${bidAmount.toSignificant()} ${poolInfo.token1.symbol} bid to ${poolInfo.token0.symbol}`,
            userSubmitted: {
              account,
              action: `fixed_price_swap`,
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
      randomSelectionERC20Contract,
      poolInfo.enableWhiteList,
      poolInfo.poolId,
      poolInfo.category,
      poolInfo.chainId,
      poolInfo.token1.symbol,
      poolInfo.token0.symbol,
      isToken1Native,
      addTransaction
    ]
  )

  return { run, submitted }
}

export default useRandomSelectionPlaceBid
