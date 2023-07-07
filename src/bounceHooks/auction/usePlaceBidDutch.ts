import { DutchAuctionPoolProp } from 'api/pool/type'
import { getUserPermitSign, getUserWhitelistProof } from 'api/user'
import { useActiveWeb3React } from 'hooks'
import { useDutchAuctionContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { CurrencyAmount } from 'constants/token'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import getTokenType from 'utils/getTokenType'

const useDutchPlaceBid = (poolInfo: DutchAuctionPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const submitted = useUserHasSubmittedRecords(account || undefined, 'dutch_auction_swap', poolInfo.poolId)
  // const isNotInWhitelist = useIsNotInWhitelist()
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
  const isToken1Native = poolInfo.token1.address === ZERO_ADDRESS
  const dutchERC20Contract = useDutchAuctionContract(poolInfo.contract)
  const run = useCallback(
    async (
      amount0: CurrencyAmount,
      amount1: CurrencyAmount
    ): Promise<{
      hash: string
      transactionReceipt: Promise<TransactionReceipt>
    }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!dutchERC20Contract) {
        return Promise.reject('no contract')
      }
      let proofArr: string[] = []
      let whiteParamsResult: any[] = []
      if (poolInfo.enableWhiteList) {
        if (poolInfo.whitelistData?.isPermit) {
          const { data } = await getUserPermitSign({
            address: account,
            category: poolInfo.category,
            chainId: poolInfo.chainId,
            poolId: String(poolInfo.poolId),
            tokenType: getTokenType(poolInfo.category)
          })
          whiteParamsResult = [data.expiredTime, data.signature]
        } else {
          const { data } = await getUserWhitelistProof({
            address: account,
            category: poolInfo.category,
            chainId: poolInfo.chainId,
            poolId: String(poolInfo.poolId),
            tokenType: getTokenType(poolInfo.category)
          })
          const { proof } = data
          const rawProofJson = JSON.parse(proof)
          if (Array.isArray(rawProofJson)) {
            proofArr = rawProofJson.map(rawProof => `0x${rawProof}`)
          }
          whiteParamsResult = [proofArr]
        }
      }
      const args = [poolInfo.poolId, amount0.raw.toString(), ...whiteParamsResult]
      console.log('args , whiteParamsResult>>>', args, whiteParamsResult)
      const gasBidFunc =
        poolInfo.enableWhiteList && poolInfo.whitelistData?.isPermit
          ? dutchERC20Contract.estimateGas.bid
          : dutchERC20Contract.estimateGas.bidPermit
      const estimatedGas = await gasBidFunc(...args, {
        value: isToken1Native ? amount1.raw.toString() : undefined
      }).catch((error: Error) => {
        console.debug('Failed to swap', error)
        throw error
      })
      const bidFunc =
        poolInfo.enableWhiteList && poolInfo.whitelistData?.isPermit
          ? dutchERC20Contract.bid
          : dutchERC20Contract.bidPermit
      return bidFunc(...args, {
        gasLimit: calculateGasMargin(estimatedGas),
        value: isToken1Native ? amount1.raw.toString() : undefined
      }).then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Use ${amount1.toSignificant()} ${poolInfo.token1.symbol} bid to ${poolInfo.token0.symbol}`,
          userSubmitted: {
            account,
            action: `dutch_auction_swap`,
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
      dutchERC20Contract,
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

export default useDutchPlaceBid
