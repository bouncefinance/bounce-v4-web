import { FixedSwapPoolProp, PoolType } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useRandomSelectionERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { getUserRandomFailedProof, getUserRandomIsWinterProof } from 'api/user'

const useUserClaim = (poolInfo: FixedSwapPoolProp, isWinner: boolean) => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'random_selection_user_claim', poolInfo.poolId)

  const randomSelectionERC20Contract = useRandomSelectionERC20Contract(poolInfo.contract)

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

    if (!poolInfo.totalShare || !poolInfo.curPlayer) {
      return Promise.reject('error')
    }

    let args: any[] = [poolInfo.poolId, []]

    if (isWinner) {
      if (Number(poolInfo.curPlayer) > Number(poolInfo.totalShare)) {
        const userRandomIsWinterProof = await getUserRandomIsWinterProof({
          address: account,
          category: PoolType.Lottery,
          chainId: poolInfo.chainId,
          poolId: poolInfo.poolId,
          tokenType: 1
        })
        args = [poolInfo.poolId, JSON.parse(userRandomIsWinterProof.data.proof)]
      }
    } else {
      const userRandomFailedProof = await getUserRandomFailedProof({
        address: account,
        category: PoolType.Lottery,
        chainId: poolInfo.chainId,
        poolId: poolInfo.poolId,
        tokenType: 1
      })
      args = [poolInfo.poolId, userRandomFailedProof.data.expiredTime, userRandomFailedProof.data.signature]
    }

    const func = isWinner ? 'winnerClaim' : 'otherClaim'

    const estimatedGas = await randomSelectionERC20Contract.estimateGas[func](...args).catch((error: Error) => {
      console.debug('Failed to claim', error)
      throw error
    })
    return randomSelectionERC20Contract[func](...args, {
      gasLimit: calculateGasMargin(estimatedGas)
    }).then((response: TransactionResponse) => {
      addTransaction(response, {
        summary: `Claim token ${isWinner ? poolInfo.token0.symbol : poolInfo.token1.symbol}`,
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
  }, [
    account,
    randomSelectionERC20Contract,
    poolInfo.totalShare,
    poolInfo.curPlayer,
    poolInfo.poolId,
    poolInfo.chainId,
    poolInfo.token1.symbol,
    isWinner,
    addTransaction
  ])

  return { run, submitted }
}

export default useUserClaim
