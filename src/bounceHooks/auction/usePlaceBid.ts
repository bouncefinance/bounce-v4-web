import { FixedSwapPoolProp, PoolType } from 'api/pool/type'
import { getUserPermitSign, getUserWhitelistProof } from 'api/user'
import { useActiveWeb3React } from 'hooks'
import { useFixedSwapERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { CurrencyAmount } from 'constants/token'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import getTokenType from 'utils/getTokenType'

export default function usePlaceBid(poolInfo: FixedSwapPoolProp) {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'fixed_price_swap', poolInfo.poolId)
  const isToken1Native = poolInfo.currencySwappedTotal1.currency.isNative
  const fixedSwapERC20Contract = useFixedSwapERC20Contract(poolInfo.currentBounceContractAddress)
  const method = poolInfo.isPlayableAuction ? 'swapPlayable' : 'swap'
  const swapCallback = useCallback(
    async (
      bidAmount: CurrencyAmount
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
      let proofArr: string[] = []
      let playableAmount = ''
      if (poolInfo.enableWhiteList) {
        const {
          data: { proof: rawProofStr, amount }
        } = await getUserWhitelistProof({
          address: account,
          category: poolInfo.category,
          chainId: poolInfo.chainId,
          poolId: String(poolInfo.poolId),
          tokenType: getTokenType(poolInfo.category)
        })
        playableAmount = amount ?? ''
        const rawProofJson = JSON.parse(rawProofStr)

        if (Array.isArray(rawProofJson)) {
          proofArr = rawProofJson.map(rawProof => `0x${rawProof}`)
        }
      }

      let args = [poolInfo.poolId, bidAmount.raw.toString(), proofArr]
      if (method === 'swapPlayable' && playableAmount) {
        args = [poolInfo.poolId, bidAmount.raw.toString(), playableAmount, proofArr]
      }
      console.log('args', args, method)

      const estimatedGas = await fixedSwapERC20Contract.estimateGas[method](...args, {
        value: isToken1Native ? bidAmount.raw.toString() : undefined
      }).catch((error: Error) => {
        console.debug('Failed to swap', error)
        throw error
      })
      return fixedSwapERC20Contract[method](...args, {
        gasLimit: calculateGasMargin(estimatedGas),
        value: isToken1Native ? bidAmount.raw.toString() : undefined
      }).then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Use ${bidAmount.toSignificant()} ${poolInfo.token1.symbol} swap to ${poolInfo.token0.symbol}`,
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
      addTransaction,
      fixedSwapERC20Contract,
      isToken1Native,
      method,
      poolInfo.category,
      poolInfo.chainId,
      poolInfo.enableWhiteList,
      poolInfo.poolId,
      poolInfo.token0.symbol,
      poolInfo.token1.symbol
    ]
  )

  const swapPermitCallback = useCallback(
    async (
      bidAmount: CurrencyAmount
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
      if (!poolInfo.enableWhiteList) {
        return Promise.reject('no enable whiteList')
      }
      const { data } = await getUserPermitSign({
        address: account,
        category: PoolType.FixedSwap,
        chainId: poolInfo.chainId,
        poolId: String(poolInfo.poolId),
        tokenType: 1
      })

      const args = [poolInfo.poolId, bidAmount.raw.toString(), data.expiredTime, data.signature]

      const estimatedGas = await fixedSwapERC20Contract.estimateGas
        .swapPermit(...args, { value: isToken1Native ? bidAmount.raw.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to swap', error)
          throw error
        })
      return fixedSwapERC20Contract
        .swapPermit(...args, {
          gasLimit: calculateGasMargin(estimatedGas),
          value: isToken1Native ? bidAmount.raw.toString() : undefined
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Use ${bidAmount.toSignificant()} ${poolInfo.token1.symbol} swap to ${poolInfo.token0.symbol}`,
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
      addTransaction,
      fixedSwapERC20Contract,
      isToken1Native,
      poolInfo.chainId,
      poolInfo.enableWhiteList,
      poolInfo.poolId,
      poolInfo.token0.symbol,
      poolInfo.token1.symbol
    ]
  )

  return { swapCallback, swapPermitCallback, submitted }
}
