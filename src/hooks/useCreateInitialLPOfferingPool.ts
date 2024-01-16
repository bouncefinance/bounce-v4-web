import { getPoolBurningCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import { GetPoolCreationSignatureParams, GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { NULL_BYTES } from '../constants'
import { useActiveWeb3React } from 'hooks'
import { useCallback } from 'react'
import { useAuctionERC20Currency, useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { CurrencyAmount } from 'constants/token'
import { TransactionResponse, TransactionReceipt, Log } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { IReleaseType, ParticipantStatus } from 'bounceComponents/create-auction-pool/types'
import { useRandomSelectionLPContract } from 'hooks/useContract'

import { Contract } from 'ethers'

export interface Params {
  whitelist: string[]
  poolSize: string
  startTime: number
  endTime: number
  delayUnlockingTime: number
  poolName: string
  tokenFromAddress: string
  tokenToAddress: string
  tokenFormDecimal: string | number
  tokenToDecimal: string | number
  totalShare: number | undefined
  maxPlayer: number | undefined
  releaseType: IReleaseType
  releaseData: {
    startAt: number | string
    endAtOrRatio: number | string
  }[]
}

export function useCreateInitialLPOfferingPool() {
  const { account, chainId } = useActiveWeb3React()
  const contract = useRandomSelectionLPContract(undefined, chainId)

  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  const { currencyFrom, currencyTo } = useAuctionERC20Currency()
  const addTransaction = useTransactionAdder()
  const values = useValuesState()

  return useCallback(async (): Promise<{
    hash: string
    sysId: number
    transactionReceipt: Promise<TransactionReceipt>
    getPoolId: (logs: Log[]) => string | undefined
  }> => {
    const params: Params = {
      whitelist: values.participantStatus === ParticipantStatus.Whitelist ? values.whitelist : [],
      poolSize: values.poolSize,
      startTime: values.startTime?.unix() || 0,
      endTime: values.endTime?.unix() || 0,
      delayUnlockingTime: values.endTime?.unix() || 0,
      poolName: values.poolName.slice(0, 50),
      tokenFromAddress: values.tokenFrom.address,
      tokenFormDecimal: values.tokenFrom.decimals,
      tokenToAddress: values.tokenTo.address,
      tokenToDecimal: values.tokenTo.decimals,
      totalShare: values.winnerNumber,
      maxPlayer: values.maxParticipantAllowed,
      releaseType: IReleaseType.Cliff,
      releaseData: [
        {
          startAt: values.startTime?.unix() || 0,
          endAtOrRatio: 0
        }
      ]
    }

    if (!currencyFrom || !currencyTo) {
      return Promise.reject('currencyFrom or currencyTo error')
    }
    const amountTotal1 = CurrencyAmount.fromAmount(currencyTo, params.poolSize)

    if (!amountTotal1) {
      return Promise.reject('amountTotal1 error')
    }
    if (!chainConfigInBackend?.id) {
      return Promise.reject(new Error('This chain is not supported for the time being'))
    }
    if (!account) {
      return Promise.reject('no account')
    }
    if (!contract) {
      return Promise.reject('no contract')
    }

    let merkleroot = ''

    if (params.whitelist.length > 0) {
      const whitelistParams: GetWhitelistMerkleTreeRootParams = {
        addresses: params.whitelist,
        category: PoolType.FixedSwap,
        chainId: chainConfigInBackend.id
      }
      const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      merkleroot = data.merkleroot
    }

    const signatureParams: GetPoolCreationSignatureParams = {
      amountMin1: '',
      amountTotal0: '0',
      category: PoolType.RANDOM_SELECTION_LP,
      chainId: chainConfigInBackend.id,
      claimAt: params.delayUnlockingTime,
      closeAt: params.endTime,
      creator: account,
      maxAmount1PerWallet: amountTotal1.raw.toString() || '0',
      merkleroot: merkleroot,
      name: params.poolName,
      openAt: params.startTime,
      token0: params.tokenFromAddress,
      token1: params.tokenToAddress,
      releaseType: params.releaseType,
      releaseData: params.releaseData,
      maxPlayer: params.maxPlayer,
      totalShare: params.totalShare
    }

    const {
      data: { id, expiredTime, signature }
    } = await getPoolBurningCreationSignature(signatureParams)

    const contractCallParams = {
      name: signatureParams.name,
      token0: signatureParams.token0,
      token1: signatureParams.token1,
      amount1PerWallet: signatureParams.maxAmount1PerWallet,
      openAt: signatureParams.openAt,
      closeAt: signatureParams.closeAt,
      claimAt: signatureParams.claimAt,
      maxPlayer: signatureParams.maxPlayer,
      nShare: signatureParams.totalShare,
      whitelistRoot: merkleroot || NULL_BYTES
    }

    const args = [id, contractCallParams, false, expiredTime, signature]
    console.log('🚀 ~ file: useCreateInitialLPOfferingPool.ts:230 ~ returnuseCallback ~ args:', args)

    return contract.createV2(...args).then((response: TransactionResponse) => {
      console.log('response', response)

      addTransaction(response, {
        summary: 'Create Initial LP Offering auction',
        userSubmitted: {
          account,
          action: 'createInitialLPOfferingPool'
        }
      })
      return {
        hash: response.hash,
        transactionReceipt: response.wait(1),
        sysId: id,
        getPoolId: (logs: Log[]) => getEventLog(contract, logs, 'Created', 'index')
      }
    })
  }, [account, addTransaction, chainConfigInBackend?.id, currencyFrom, currencyTo, contract, values])
}

export function getEventLog(contract: Contract, logs: Log[], eventName: string, name: string): string | undefined {
  for (const log of logs) {
    if (log.address !== contract.address) {
      continue
    }
    const data = contract.interface.parseLog(log)
    if (eventName !== data.name) {
      continue
    }
    if (data.args?.[name]) {
      return data.args[name].toString()
    }
  }
  return undefined
}
