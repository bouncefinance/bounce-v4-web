import { FixedSwapNFTPoolProp } from 'api/pool/type'
import { getUserPermitSign, getUserWhitelistProof } from 'api/user'
import { useActiveWeb3React } from 'hooks'
import { useFixedSwapNftContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { CurrencyAmount } from 'constants/token'
import JSBI from 'jsbi'
import getTokenType from 'utils/getTokenType'

const usePlaceBid1155 = (poolInfo: FixedSwapNFTPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'fixed_price_swap_1155', poolInfo.poolId)

  // const isNotInWhitelist = useIsNotInWhitelist()

  const isToken1Native = poolInfo.currencySwappedTotal1.currency.isNative
  const fixedSwapNFTContract = useFixedSwapNftContract(poolInfo.contract)

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
      let _data: any
      let whiteListType
      let _args: any
      if (poolInfo.enableWhiteList) {
        try {
          const { data } = await getUserWhitelistProof({
            address: account,
            category: poolInfo.category,
            chainId: poolInfo.chainId,
            poolId: String(poolInfo.poolId),
            tokenType: getTokenType(poolInfo.category)
          })
          _data = data
          whiteListType = true
          const rawProofJson = JSON.parse(_data.rawProofStr)

          if (Array.isArray(rawProofJson)) {
            proofArr = rawProofJson.map(rawProof => `0x${rawProof}`)
          }
          _args = [poolInfo.poolId, bid0Amount, proofArr]
        } catch (error) {
          const { data } = await getUserPermitSign({
            address: account,
            category: poolInfo.category,
            chainId: poolInfo.chainId,
            poolId: String(poolInfo.poolId),
            tokenType: getTokenType(poolInfo.category)
          })
          _data = data
          whiteListType = false
          _args = [poolInfo.poolId, bid0Amount, data.expiredTime, data.signature]
        }
      }

      const currencyBid1Amount = CurrencyAmount.fromRawAmount(
        poolInfo.currencyAmountTotal1.currency,
        JSBI.multiply(
          JSBI.BigInt(bid0Amount),
          JSBI.divide(JSBI.BigInt(poolInfo.amountTotal1), JSBI.BigInt(poolInfo.amountTotal0))
        )
      )

      const args = _args
      if (whiteListType) {
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
      } else {
        const estimatedGas = await fixedSwapNFTContract.estimateGas
          .swapPermit(...args, { value: isToken1Native ? currencyBid1Amount.raw.toString() : undefined })
          .catch((error: Error) => {
            console.debug('Failed to swap', error)
            throw error
          })
        return fixedSwapNFTContract
          .swapPermit(...args, {
            gasLimit: calculateGasMargin(estimatedGas),
            value: isToken1Native ? currencyBid1Amount.raw.toString() : undefined
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Use ${currencyBid1Amount.toSignificant()} ${poolInfo.token1.symbol} swap to ${
                poolInfo.token0.symbol
              }`,
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
      }
    },
    [
      account,
      addTransaction,
      fixedSwapNFTContract,
      isToken1Native,
      poolInfo.amountTotal0,
      poolInfo.amountTotal1,
      poolInfo.category,
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
