import { useMinterContract } from './useContract'
import { useActiveWeb3React } from './index'
import { ChainId } from '../constants/chain'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCallback } from 'react'
import { calculateGasMargin } from '../utils'
import { TransactionResponse } from '@ethersproject/providers'

export function useTokenMinter(chain: ChainId) {
  const { account, chainId } = useActiveWeb3React()
  const minterContract = useMinterContract(chain || chainId)
  const addTransaction = useTransactionAdder()
  return useCallback(
    async (name: string, symbol: string, decimals: string, initial_supply: string): Promise<any> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!minterContract) {
        return Promise.reject('no contract')
      }
      const args = [name, symbol, decimals, initial_supply]
      console.log('Minter', args)
      const estimatedGas = await minterContract.estimateGas.deployERC20(...args).catch((error: Error) => {
        console.debug('Failed to mint token', error)
        throw error
      })
      return minterContract
        .deployERC20(...args, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          console.log('Minter', 'enter')
          addTransaction(response, {
            summary: 'Minter token',
            userSubmitted: {
              account,
              action: 'deployERC20'
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [account, addTransaction, minterContract]
  )
}
