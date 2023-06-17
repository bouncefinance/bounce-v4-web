import { EnglishAuctionNFTPoolProp } from 'api/pool/type'
import { getUserWhitelistProof } from 'api/user'
import { useActiveWeb3React } from 'hooks'
import { useEnglishAuctionNftContract } from 'hooks/useContract'
import { useCallback, useMemo } from 'react'
import { Currency, CurrencyAmount } from 'constants/token'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import getTokenType from 'utils/getTokenType'
import { useSingleCallResult } from 'state/multicall/hooks'

export function useEnglishAuctionPlaceBidCallback(poolInfo: EnglishAuctionNFTPoolProp) {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'english_bid', poolInfo.poolId)

  const isToken1Native = poolInfo.currencyAmountMin1?.currency.isNative
  const englishAuctionNftContract = useEnglishAuctionNftContract(poolInfo.contract)

  const gasFeeRes = useSingleCallResult(englishAuctionNftContract, 'gasFee', [poolInfo.poolId])

  const bidPrevGasFee = useMemo(() => {
    const fee = gasFeeRes?.result?.[0].toString()
    if (!fee || !poolInfo.currencyAmountMin1) return undefined
    if (poolInfo.currencyAmountMin1.currency.isNative) {
      return CurrencyAmount.fromRawAmount(poolInfo.currencyAmountMin1.currency, fee)
    }
    return CurrencyAmount.fromRawAmount(Currency.getNativeCurrency(poolInfo.ethChainId), fee)
  }, [gasFeeRes?.result, poolInfo.currencyAmountMin1, poolInfo.ethChainId])

  const bidCallback = useCallback(
    async (
      bidAmount: CurrencyAmount
    ): Promise<{
      hash: string
      transactionReceipt: Promise<TransactionReceipt>
    }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!englishAuctionNftContract) {
        return Promise.reject('no contract')
      }
      if (!bidPrevGasFee) {
        return Promise.reject('Pls waiting gas calc fee')
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

      const args = [poolInfo.poolId, bidAmount.raw.toString(), proofArr]

      const value = isToken1Native ? bidAmount.add(bidPrevGasFee).raw.toString() : bidPrevGasFee.raw.toString()

      const estimatedGas = await englishAuctionNftContract.estimateGas.bid(...args, { value }).catch((error: Error) => {
        console.debug('Failed to bid', error)
        throw error
      })
      return englishAuctionNftContract
        .bid(...args, {
          gasLimit: calculateGasMargin(estimatedGas, 20),
          value
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Bid amount ${bidAmount.toSignificant()} ${poolInfo.token1.symbol}`,
            userSubmitted: {
              account,
              action: `english_bid`,
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
      bidPrevGasFee,
      englishAuctionNftContract,
      isToken1Native,
      poolInfo.category,
      poolInfo.chainId,
      poolInfo.enableWhiteList,
      poolInfo.poolId,
      poolInfo.token1.symbol
    ]
  )

  return { bidCallback, submitted, bidPrevGasFee }
}
