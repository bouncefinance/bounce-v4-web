import { useActiveWeb3React } from './index'
import { useDisperseContract } from './useContract'
import { useCallback } from 'react'
import { ChainId } from '../constants/chain'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils'

export function useDisperseEther(chain: ChainId) {
  const { account, chainId } = useActiveWeb3React()
  const disperseContract = useDisperseContract(chain || chainId)
  const addTransaction = useTransactionAdder()
  return useCallback(
    async (currency: string, recipients: string[], values: string[]): Promise<any> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!disperseContract) {
        return Promise.reject('no contract')
      }
      console.log('disperse-eth-value', values[0])
      console.log('disperse-recipients', recipients)
      console.log('disperse-values', values)
      const args = [recipients, values]
      const estimatedGas = await disperseContract.estimateGas
        .disperseEther(...args, { value: currency })
        .catch((error: Error) => {
          console.debug('Failed to disperse ether', error)
          throw error
        })
      return disperseContract
        .disperseEther(...args, {
          gasLimit: calculateGasMargin(estimatedGas),
          value: currency
        })
        .then((response: TransactionResponse) => {
          console.log('disperse', 'enter')
          addTransaction(response, {
            summary: 'Disperse Ether',
            userSubmitted: {
              account,
              action: 'disperseEther'
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [account, addTransaction, disperseContract]
  )
}

export function useDisperseToken() {
  const { library, account, chainId } = useActiveWeb3React()
  const disperseContract = useDisperseContract(chainId || ChainId.SEPOLIA)
  const addTransaction = useTransactionAdder()
  const signer = library ? disperseContract?.connect(library.getSigner()) : undefined
  console.log(signer)
  return useCallback(
    async (token: string, recipients: string[], values: string[]): Promise<any> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!disperseContract) {
        return Promise.reject('no contract')
      }
      const args = [token, recipients, values]
      // const estimatedGas = await disperseContract.estimateGas.disperseEther(...args).catch((error: Error) => {
      //   console.debug('Failed to disperse ether', error)
      //   throw error
      // })
      return disperseContract
        .disperseToken(
          ...args /* {
          gasLimit: calculateGasMargin(estimatedGas)
        }*/
        )
        .then((response: TransactionResponse) => {
          console.log('disperse', 'enter')
          addTransaction(response, {
            summary: 'Disperse Ether',
            userSubmitted: {
              account,
              action: 'disperseEther'
            }
          })
          return {
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
    },
    [account, addTransaction, disperseContract]
  )
}
