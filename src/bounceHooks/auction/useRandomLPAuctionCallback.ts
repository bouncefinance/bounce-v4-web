import { RandomSelectionLPProps } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useCallback } from 'react'
import { CurrencyAmount } from 'constants/token'
import { calculateGasMargin } from 'utils'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { getUserRandomFailedProof, getUserRandomIsWinterProof, getUserWhitelistProof } from 'api/user'
import { useRandomSelectionLPContract, useRandomSelectionNFTBurningContract } from 'hooks/useContract'
import { useUserHasSubmittedRecords } from 'state/transactions/hooks'
import getTokenType from 'utils/getTokenType'
import { useTransactionModalWrapper } from 'hooks/useTransactionModalWrapper'
import { formatUnits } from 'ethers/lib/utils'

export function useRandomNFTCreatorClaim(poolId: number | string, name: string, contract?: string) {
  const { account } = useActiveWeb3React()
  const randomContract = useRandomSelectionNFTBurningContract(contract)
  const addTransaction = useTransactionAdder()
  const funcName = 'creatorClaim'

  const submitted = useUserHasSubmittedRecords(account || undefined, funcName + '_random_nft', poolId)

  const run = useCallback(async () => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!randomContract) {
      return Promise.reject('no contract')
    }

    const args = [poolId]

    const estimatedGas = await randomContract.estimateGas[funcName](...args).catch((error: Error) => {
      console.debug('Failed to claim for creator', error)
      throw error
    })
    return randomContract[funcName](...args, {
      gasLimit: calculateGasMargin(estimatedGas)
    }).then((response: TransactionResponse) => {
      addTransaction(response, {
        summary: `Creator claim assets for ${name}`,
        userSubmitted: {
          account,
          action: funcName + '_random_nft',
          key: poolId
        }
      })
      return response
    })
  }, [account, addTransaction, randomContract, name, poolId])

  const runWithModal = useTransactionModalWrapper(run, {
    successTipsText: 'You have successfully claimed.'
  })

  return { submitted, run, runWithModal }
}

export function useRandomLPUserClaim(poolInfo: RandomSelectionLPProps, isWinner: boolean, contract?: string) {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'random_nft_user_claim', poolInfo.poolId)

  const randomContract = useRandomSelectionLPContract(contract)

  const run = useCallback(async () => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!randomContract) {
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
          category: poolInfo.category,
          chainId: poolInfo.chainId,
          poolId: poolInfo.poolId,
          tokenType: 1
        })
        args = [poolInfo.poolId, JSON.parse(userRandomIsWinterProof.data.proof)]
      }
    } else {
      const userRandomFailedProof = await getUserRandomFailedProof({
        address: account,
        category: poolInfo.category,
        chainId: poolInfo.chainId,
        poolId: poolInfo.poolId,
        tokenType: 1
      })
      args = [poolInfo.poolId, userRandomFailedProof.data.expiredTime, userRandomFailedProof.data.signature]
    }

    const func = isWinner ? 'winnerClaim' : 'otherClaim'

    const estimatedGas = await randomContract.estimateGas[func](...args).catch((error: Error) => {
      console.debug('Failed to claim', error)
      throw error
    })
    return randomContract[func](...args, {
      gasLimit: calculateGasMargin(estimatedGas)
    }).then((response: TransactionResponse) => {
      addTransaction(response, {
        summary: `Claim Random Token`,
        userSubmitted: {
          account,
          action: `random_selection_user_claim`,
          key: poolInfo.poolId
        }
      })
      return response
    })
  }, [
    account,
    randomContract,
    poolInfo.totalShare,
    poolInfo.curPlayer,
    poolInfo.poolId,
    poolInfo.category,
    poolInfo.chainId,
    isWinner,
    addTransaction
  ])

  const runWithModal = useTransactionModalWrapper(run, {
    successTipsText: 'You have successfully claimed.'
  })

  return { run, submitted, runWithModal }
}

export function useRandomLPBetCallback(poolInfo: RandomSelectionLPProps) {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const submitted = useUserHasSubmittedRecords(account || undefined, 'random_LP_bet', poolInfo.poolId)
  const randomContract = useRandomSelectionLPContract(poolInfo.contract)
  const isToken1Native = false

  const run = useCallback(
    async (bidAmount: CurrencyAmount) => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!randomContract) {
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
      const estimatedGas = await randomContract.estimateGas
        .bet(...args, { value: isToken1Native ? bidAmount.raw.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to swap', error)
          throw error
        })
      return randomContract
        .bet(...args, {
          gasLimit: calculateGasMargin(estimatedGas),
          value: isToken1Native ? bidAmount.raw.toString() : undefined
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `You have successfully purchased a ticket with ${bidAmount.toSignificant()} ${
              bidAmount.currency?.symbol
            }.`,
            userSubmitted: {
              account,
              action: `random_LP_bet`,
              key: poolInfo.poolId
            }
          })
          return response
        })
    },
    [
      account,
      randomContract,
      poolInfo.enableWhiteList,
      poolInfo.poolId,
      poolInfo.category,
      poolInfo.chainId,
      isToken1Native,
      addTransaction
    ]
  )
  const runWithModal = useTransactionModalWrapper(run, {
    successTipsText: `You have successfully purchased a ticket with ${formatUnits(
      poolInfo.maxAmount1PerWallet,
      poolInfo.token1.decimals
    )} ${poolInfo.token1.symbol}.`
  })

  return { run, submitted, runWithModal }
}
