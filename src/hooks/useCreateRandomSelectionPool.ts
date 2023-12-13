import { getPoolCreationSignature, getWhitelistMerkleTreeRoot, getWinnersList } from 'api/pool'
import { GetPoolCreationSignatureParams, GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { NULL_BYTES } from '../constants'
import { useActiveWeb3React } from 'hooks'
import { useRandomSelectionERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useAuctionERC20Currency, useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { CurrencyAmount } from 'constants/token'
import { BigNumber } from 'bignumber.js'
import { calculateGasMargin } from 'utils'
import { TransactionResponse, TransactionReceipt, Log } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { IReleaseType, ParticipantStatus } from 'bounceComponents/create-auction-pool/types'
import { Contract } from 'ethers'
import { useSingleCallResult } from '../state/multicall/hooks'
import { makeValuesReleaseData } from './useCreateFixedSwapPool'
import { ChainId } from 'constants/chain'
import { useRequest } from 'ahooks'
import { getUserRandomIsWinterProof } from 'api/user'
import { useGetBackedChainIdByChain } from '../bounceHooks/auction/useGetBackedChainIdByChain'

interface Params {
  whitelist: string[]
  swapRatio: string
  startTime: number
  endTime: number
  delayUnlockingTime: number
  poolName: string
  tokenFromAddress: string
  tokenToAddress: string
  tokenFormDecimal: string | number
  tokenToDecimal: string | number
  totalShare: string | number
  ticketPrice: string | number
  maxPlayer: number
  releaseType: IReleaseType
  releaseData: {
    startAt: number | string
    endAtOrRatio: number | string
  }[]
}

export function useCreateRandomSelectionPool() {
  const { account, chainId } = useActiveWeb3React()
  const randomSelectionERC20Contract = useRandomSelectionERC20Contract()
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
      swapRatio: values.swapRatio,
      startTime: values.startTime?.unix() || 0,
      endTime: values.endTime?.unix() || 0,
      delayUnlockingTime:
        IReleaseType.Linear === values.releaseType || IReleaseType.Fragment === values.releaseType
          ? values.releaseDataArr?.[0].startAt?.unix() || 0
          : IReleaseType.Instant === values.releaseType
          ? 0
          : values.shouldDelayUnlocking || IReleaseType.Cliff === values.releaseType
          ? values.shouldDelayUnlocking
            ? values.delayUnlockingTime?.unix() || 0
            : values.endTime?.unix() || 0
          : values.endTime?.unix() || 0,
      poolName: values.poolName.slice(0, 50),
      tokenFromAddress: values.tokenFrom.address,
      tokenFormDecimal: values.tokenFrom.decimals,
      tokenToAddress: values.tokenTo.address,
      tokenToDecimal: values.tokenTo.decimals,
      totalShare: Number(values.winnerNumber) || 0,
      ticketPrice: values.ticketPrice || 0,
      maxPlayer: Number(values.maxParticipantAllowed) || 0,
      releaseType: values.releaseType === 1000 ? IReleaseType.Cliff : values.releaseType,
      releaseData: makeValuesReleaseData(values)
    }

    if (!currencyFrom || !currencyTo) {
      return Promise.reject('currencyFrom or currencyTo error')
    }
    const amountTotal0 = CurrencyAmount.fromAmount(
      currencyFrom,
      new BigNumber(params.swapRatio).times(params.totalShare).toString()
    )
    const amountMin1 = CurrencyAmount.fromAmount(currencyTo, params.ticketPrice)
    if (!amountTotal0) {
      return Promise.reject('amountTotal0 error')
    }
    if (!amountMin1) {
      return Promise.reject('amountMin1 error')
    }
    if (!chainConfigInBackend?.id) {
      return Promise.reject(new Error('This chain is not supported for the time being'))
    }
    if (!account) {
      return Promise.reject('no account')
    }
    if (!randomSelectionERC20Contract) {
      return Promise.reject('no contract')
    }

    let merkleroot = ''

    if (params.whitelist.length > 0) {
      const whitelistParams: GetWhitelistMerkleTreeRootParams = {
        addresses: params.whitelist,
        category: PoolType.Lottery,
        chainId: chainConfigInBackend.id
      }
      const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      merkleroot = data.merkleroot
    }

    const signatureParams: GetPoolCreationSignatureParams = {
      amountMin1: amountMin1.raw.toString(),
      amountTotal0: amountTotal0.raw.toString(),
      category: PoolType.Lottery,
      chainId: chainConfigInBackend.id,
      claimAt: params.delayUnlockingTime,
      closeAt: params.endTime,
      creator: account,
      maxAmount1PerWallet: amountMin1.raw.toString(),
      merkleroot: merkleroot,
      maxPlayer: Number(params.maxPlayer),
      name: params.poolName,
      openAt: params.startTime,
      token0: params.tokenFromAddress,
      token1: params.tokenToAddress,
      totalShare: params.totalShare,
      releaseType: params.releaseType,
      releaseData: params.releaseData
    }

    const {
      data: { id, expiredTime, signature }
    } = await getPoolCreationSignature(signatureParams)

    const contractCallParams = {
      name: signatureParams.name,
      token0: signatureParams.token0,
      token1: signatureParams.token1,
      amountTotal0: signatureParams.amountTotal0,
      amount1PerWallet: signatureParams.maxAmount1PerWallet,
      openAt: signatureParams.openAt,
      claimAt: signatureParams.claimAt,
      closeAt: signatureParams.closeAt,
      maxPlayer: Number(params.maxPlayer),
      nShare: signatureParams.totalShare,
      whitelistRoot: merkleroot || NULL_BYTES
    }
    const args = [
      id,
      contractCallParams,
      params.releaseType,
      params.releaseData.map(item => ({ ...item, endAtOrRatio: item.endAtOrRatio.toString() })),
      false,
      expiredTime,
      signature
    ]

    const estimatedGas = await randomSelectionERC20Contract.estimateGas.createV2(...args).catch((error: Error) => {
      console.debug('Failed to create Random Selection', error)
      throw error
    })

    return randomSelectionERC20Contract
      .createV2(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
        // gasLimit: 3500000
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Create Random Selection auction',
          userSubmitted: {
            account,
            action: 'createERC20RandomSelectionAuction'
          }
        })
        return {
          hash: response.hash,
          transactionReceipt: response.wait(1),
          sysId: id,
          getPoolId: (logs: Log[]) => getEventLog(randomSelectionERC20Contract, logs, 'Created', 'index')
        }
      })
  }, [
    account,
    addTransaction,
    chainConfigInBackend?.id,
    currencyFrom,
    currencyTo,
    randomSelectionERC20Contract,
    values
  ])
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
export function useIsWinnerForRandomSelectionPool(
  poolId: string | number,
  address: string | undefined,
  contract: string,
  isWinnerSeedDone: boolean,
  chainId?: ChainId
): { isWinner: boolean } {
  const randomSelectionERC20Contract = useRandomSelectionERC20Contract(contract, chainId)

  const backedChainId = useGetBackedChainIdByChain(chainId)
  const { data: proof } = useRequest(
    async () => {
      if (!address || !poolId || !backedChainId || !isWinnerSeedDone) return ''
      try {
        const resp = await getUserRandomIsWinterProof({
          address,
          category: PoolType.Lottery,
          chainId: backedChainId,
          poolId: poolId.toString()
        })
        return JSON.parse(resp.data.proof)
      } catch (error) {
        return ''
      }
    },
    {
      refreshDeps: [backedChainId, address, poolId, isWinnerSeedDone]
    }
  )

  const args = [Number(poolId), address, proof]
  const { result } = useSingleCallResult(proof ? randomSelectionERC20Contract : null, 'isWinner', args)
  const isWinner = result?.[0]
  return {
    isWinner: !!isWinner
  }
}
export function useIsJoinedRandomSelectionPool(
  poolId: string | number,
  address: string | undefined,
  contract: string,
  chainId?: ChainId
) {
  const randomSelectionERC20Contract = useRandomSelectionERC20Contract(contract, chainId)
  const args = [address, Number(poolId)]
  const { result } = useSingleCallResult(randomSelectionERC20Contract, 'betNo', args)
  // betNo more that 0 means joined
  return !!result ? !!(Number(result?.toString && result?.toString()) > 0) : false
}
// winnerSeed more than 0 means winners list is ready
export function useIsWinnerSeedDone(poolId: number | string, contract: string, chainId?: ChainId) {
  // const randomSelectionERC20Contract = useRandomSelectionERC20Contract(contract, chainId)
  // const args = [Number(poolId)]
  // const res = useSingleCallResult(randomSelectionERC20Contract, 'winnerMerkleRoot', args)
  // console.log('🚀 ~ file: useCreateRandomSelectionPool.ts:272 ~ useIsWinnerSeedDone ~ res:', res)

  // return useMemo(() => {
  //   const { result } = res
  //   // load winners list if isWinnerSeedDone is more that 0
  //   const ret = result?.[0].toString()
  //   return ret && ret !== ZERO_ADDRESS
  // }, [res])

  const backedChainId = useGetBackedChainIdByChain(chainId)

  const { data } = useRequest(
    async () => {
      if (!backedChainId || !contract) return
      const resp = await getWinnersList({
        offset: 0,
        limit: 10,
        poolId: poolId.toString(),
        chainId: backedChainId
      })
      return resp.data.total
    },
    {
      refreshDeps: [backedChainId, contract],
      retryInterval: 20000
    }
  )

  return !!data
}
