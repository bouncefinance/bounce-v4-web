import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { getUserPermitSign, getUserWhitelistProof } from 'api/user'
import { useActiveWeb3React } from 'hooks'
import { useEnglishAuctionErc20Contract } from 'hooks/useContract'
import { useCallback, useMemo } from 'react'
import { CurrencyAmount } from 'constants/token'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import getTokenType from 'utils/getTokenType'
import BigNumber from 'bignumber.js'

export function useErc20EnglishCreatorClaim(poolId: number | string, name: string, contract?: string) {
  const { account } = useActiveWeb3React()

  const englishAuctionErc20Contract = useEnglishAuctionErc20Contract(contract)
  const addTransaction = useTransactionAdder()
  const funcName = 'creatorClaim'

  const submitted = useUserHasSubmittedRecords(account || undefined, funcName + '_erc20_english', poolId)

  const run = useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!englishAuctionErc20Contract) {
      return Promise.reject('no contract')
    }

    const args = [poolId]

    const estimatedGas = await englishAuctionErc20Contract.estimateGas[funcName](...args).catch((error: Error) => {
      console.debug('Failed to claim for creator', error)
      throw error
    })
    return englishAuctionErc20Contract[funcName](...args, {
      gasLimit: calculateGasMargin(estimatedGas)
    }).then((response: TransactionResponse) => {
      addTransaction(response, {
        summary: `Creator claim assets for ${name}`,
        userSubmitted: {
          account,
          action: funcName + '_erc20_english',
          key: poolId
        }
      })
      return {
        hash: response.hash,
        transactionReceipt: response.wait(1)
      }
    })
  }, [account, addTransaction, englishAuctionErc20Contract, name, poolId])

  return { submitted, run }
}

export function useErc20EnglishUserClaim(poolInfo: Erc20EnglishAuctionPoolProp) {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'erc20_english_user_claim', poolInfo.poolId)

  const englishAuctionErc20Contract = useEnglishAuctionErc20Contract(poolInfo.contract)

  const run = useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!englishAuctionErc20Contract) {
      return Promise.reject('no contract')
    }

    const args = [poolInfo.poolId]

    const estimatedGas = await englishAuctionErc20Contract.estimateGas.userClaim(...args).catch((error: Error) => {
      console.debug('Failed to claim', error)
      throw error
    })
    return englishAuctionErc20Contract
      .userClaim(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Claim token ${poolInfo.token1.symbol}`,
          userSubmitted: {
            account,
            action: `erc20_english_user_claim`,
            key: poolInfo.poolId
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1)
        }
      })
  }, [account, englishAuctionErc20Contract, poolInfo.poolId, poolInfo.token1.symbol, addTransaction])

  return { run, submitted }
}

export function useErc20EnglishSwap(poolInfo: Erc20EnglishAuctionPoolProp) {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const submitted = useUserHasSubmittedRecords(account || undefined, 'erc20_english_swap', poolInfo.poolId)
  const isToken1Native = poolInfo.currencyAmountStartPrice?.currency.isNative
  const englishAuctionErc20Contract = useEnglishAuctionErc20Contract(poolInfo.contract)

  const swapCallback = useCallback(
    async (
      swapAmount1: CurrencyAmount
    ): Promise<{
      hash: string
      transactionReceipt: Promise<TransactionReceipt>
    }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!englishAuctionErc20Contract) {
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

      const args = [poolInfo.poolId, swapAmount1.raw.toString(), proofArr]

      const estimatedGas = await englishAuctionErc20Contract.estimateGas
        .swap(...args, { value: isToken1Native ? swapAmount1.raw.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to swap', error)
          throw error
        })
      return englishAuctionErc20Contract
        .swap(...args, {
          gasLimit: calculateGasMargin(estimatedGas),
          value: isToken1Native ? swapAmount1.raw.toString() : undefined
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Use ${swapAmount1.toSignificant()} ${poolInfo.token1.symbol} swap to ${poolInfo.token0.symbol}`,
            userSubmitted: {
              account,
              action: `erc20_english_swap`,
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
      englishAuctionErc20Contract,
      isToken1Native,
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
      swapAmount1: CurrencyAmount
    ): Promise<{
      hash: string
      transactionReceipt: Promise<TransactionReceipt>
    }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!englishAuctionErc20Contract) {
        return Promise.reject('no contract')
      }
      if (!poolInfo.enableWhiteList) {
        return Promise.reject('no enable whiteList')
      }
      const { data } = await getUserPermitSign({
        address: account,
        category: poolInfo.category,
        chainId: poolInfo.chainId,
        poolId: String(poolInfo.poolId),
        tokenType: getTokenType(poolInfo.category)
      })

      const args = [poolInfo.poolId, swapAmount1.raw.toString(), data.expiredTime, data.signature]

      const estimatedGas = await englishAuctionErc20Contract.estimateGas
        .swapPermit(...args, { value: isToken1Native ? swapAmount1.raw.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to swap', error)
          throw error
        })
      return englishAuctionErc20Contract
        .swapPermit(...args, {
          gasLimit: calculateGasMargin(estimatedGas),
          value: isToken1Native ? swapAmount1.raw.toString() : undefined
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Use ${swapAmount1.toSignificant()} ${poolInfo.token1.symbol} swap to ${poolInfo.token0.symbol}`,
            userSubmitted: {
              account,
              action: `erc20_english_swap`,
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
      englishAuctionErc20Contract,
      isToken1Native,
      poolInfo.category,
      poolInfo.chainId,
      poolInfo.enableWhiteList,
      poolInfo.poolId,
      poolInfo.token0.symbol,
      poolInfo.token1.symbol
    ]
  )

  return { swapCallback, swapPermitCallback, submitted }
}

export function useMaxSwapAmount1Limit(poolInfo: Erc20EnglishAuctionPoolProp) {
  return useMemo(() => {
    if (!poolInfo.currencyMaxAmount1PerWallet) return
    const hasBidLimit = poolInfo?.currencyMaxAmount1PerWallet.greaterThan('0')
    return hasBidLimit
      ? poolInfo.participant.currencySwappedAmount1
        ? poolInfo.currencyMaxAmount1PerWallet.subtract(poolInfo.participant.currencySwappedAmount1)
        : poolInfo.currencyMaxAmount1PerWallet
      : poolInfo.currencySwappedAmount0 &&
          poolInfo.currencyCurrentPrice &&
          poolInfo.currencyAmountTotal0 &&
          poolInfo.currencyAmountEndPrice &&
          CurrencyAmount.fromAmount(
            poolInfo.currencyAmountEndPrice?.currency,
            new BigNumber(poolInfo.currencyAmountTotal0.subtract(poolInfo.currencySwappedAmount0).toExact())
              .times(new BigNumber(poolInfo.currencyCurrentPrice.toExact()))
              .toString()
          )
  }, [
    poolInfo.currencyAmountEndPrice,
    poolInfo.currencyAmountTotal0,
    poolInfo.currencyCurrentPrice,
    poolInfo.currencyMaxAmount1PerWallet,
    poolInfo.currencySwappedAmount0,
    poolInfo.participant.currencySwappedAmount1
  ])
}

export const useIsLimitExceeded = (bidAmount: string, poolInfo: Erc20EnglishAuctionPoolProp) => {
  const token1Allocation = useMaxSwapAmount1Limit(poolInfo)

  const currencyBidAmount =
    poolInfo.currencyAmountStartPrice &&
    CurrencyAmount.fromAmount(poolInfo.currencyAmountStartPrice.currency, bidAmount)

  return useMemo(
    () => token1Allocation && currencyBidAmount?.greaterThan(token1Allocation),
    [currencyBidAmount, token1Allocation]
  )
}
