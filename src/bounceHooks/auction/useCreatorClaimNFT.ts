import { useCallback } from 'react'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useTransactionAdder, useUserHasSubmittedRecords } from 'state/transactions/hooks'
import { useActiveWeb3React } from 'hooks'
import { useEnglishAuctionNftContract, useFixedSwapNftContract } from 'hooks/useContract'

export function useCreatorClaimNFT(poolId: number | string, name: string, contract?: string) {
  const { account } = useActiveWeb3React()
  const fixedSwapNftContract = useFixedSwapNftContract(contract)
  const addTransaction = useTransactionAdder()
  const funcName = 'creatorClaim'

  const submitted = useUserHasSubmittedRecords(account || undefined, funcName, poolId + '_NFT')

  const run = useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!fixedSwapNftContract) {
      return Promise.reject('no contract')
    }

    const args = [poolId]

    const estimatedGas = await fixedSwapNftContract.estimateGas[funcName](...args).catch((error: Error) => {
      console.debug('Failed to claim for creator', error)
      throw error
    })
    return fixedSwapNftContract[funcName](...args, {
      gasLimit: calculateGasMargin(estimatedGas)
    }).then((response: TransactionResponse) => {
      addTransaction(response, {
        summary: `Creator claim assets for ${name}`,
        userSubmitted: {
          account,
          action: funcName,
          key: poolId + '_NFT'
        }
      })
      return {
        hash: response.hash,
        transactionReceipt: response.wait(1)
      }
    })
  }, [account, addTransaction, fixedSwapNftContract, name, poolId])

  return { submitted, run }
}

export function useCreatorClaimEnglishAuctionNFT(poolId: number | string, name: string, contract?: string) {
  const { account } = useActiveWeb3React()
  const englishAuctionNftContract = useEnglishAuctionNftContract(contract)
  const addTransaction = useTransactionAdder()
  const funcName = 'creatorClaim'

  const submitted = useUserHasSubmittedRecords(account || undefined, funcName, poolId + '_EnglishAuction_NFT')
  const run = useCallback(async (): Promise<{
    hash: string
    transactionReceipt: Promise<TransactionReceipt>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!englishAuctionNftContract) {
      return Promise.reject('no contract')
    }

    const args = [poolId]

    const estimatedGas = await englishAuctionNftContract.estimateGas[funcName](...args).catch((error: Error) => {
      console.debug('Failed to claim for creator', error)
      throw error
    })
    return englishAuctionNftContract[funcName](...args, {
      gasLimit: calculateGasMargin(estimatedGas)
    }).then((response: TransactionResponse) => {
      addTransaction(response, {
        summary: `Creator claim assets for ${name}`,
        userSubmitted: {
          account,
          action: funcName,
          key: poolId + '_EnglishAuction_NFT'
        }
      })
      return {
        hash: response.hash,
        transactionReceipt: response.wait(1)
      }
    })
  }, [account, addTransaction, englishAuctionNftContract, name, poolId])

  return { submitted, run }
}
