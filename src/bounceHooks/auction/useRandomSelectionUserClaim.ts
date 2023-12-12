import { FixedSwapPoolProp, PoolType } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useRandomSelectionERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useRequest } from 'ahooks'
import { getUserRandomIsWinterProof } from 'api/user'

const useUserClaim = (poolInfo: FixedSwapPoolProp) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'random_selection_user_claim', poolInfo.poolId)

  const randomSelectionERC20Contract = useRandomSelectionERC20Contract(poolInfo.contract)

  const { data: proof } = useRequest(
    async () => {
      if (!account || !poolInfo.poolId || !poolInfo.chainId) return ''
      try {
        const resp = await getUserRandomIsWinterProof({
          address: account,
          category: PoolType.Lottery,
          chainId: poolInfo.chainId,
          poolId: poolInfo.poolId
        })
        return JSON.parse(resp.data.proof)
      } catch (error) {
        return ''
      }
    },
    {
      refreshDeps: [account, poolInfo.poolId, poolInfo.chainId]
    }
  )

  const run = useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!randomSelectionERC20Contract) {
      return Promise.reject('no contract')
    }

    const args = [poolInfo.poolId, proof || []]

    const estimatedGas = await randomSelectionERC20Contract.estimateGas.userClaim(...args).catch((error: Error) => {
      console.debug('Failed to claim', error)
      throw error
    })
    return randomSelectionERC20Contract
      .userClaim(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Claim token ${poolInfo.token1.symbol}`,
          userSubmitted: {
            account,
            action: `random_selection_user_claim`,
            key: poolInfo.poolId
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1)
        }
      })
  }, [account, randomSelectionERC20Contract, poolInfo.poolId, poolInfo.token1.symbol, proof, addTransaction])

  return { run, submitted }
}

export default useUserClaim
