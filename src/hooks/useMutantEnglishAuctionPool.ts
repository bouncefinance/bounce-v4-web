import { getPoolCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import {
  GetPoolCreationSignatureParams,
  GetWhitelistMerkleTreeRootParams,
  MutantEnglishAuctionNFTPoolProp,
  PoolType
} from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { NULL_BYTES } from '../constants'
import { useActiveWeb3React } from 'hooks'
import { useCallback } from 'react'
import { useAuctionERC20Currency, useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { CurrencyAmount } from 'constants/token'
import { calculateGasMargin } from 'utils'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { IReleaseType, ParticipantStatus } from 'bounceComponents/create-auction-pool/types'
import { getEventLog } from './useCreateFixedSwapPool'
import { useERC721MultiOwner } from 'hooks/useNFTTokenBalance'
import { Currency } from 'constants/token/currency'
import { useMemo } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'
import { useBackedPoolInfo } from 'bounceHooks/auction/usePoolInfo'
import JSBI from 'jsbi'
import { getUserPermitSign, getUserWhitelistProof } from 'api/user'
import { useMutantEnglishAuctionNftContract } from 'hooks/useContract'
import { useUserHasSubmittedRecords } from 'state/transactions/hooks'
import getTokenType from 'utils/getTokenType'
import { useIsUserInAllWhitelist } from 'bounceHooks/auction/useIsUserInWhitelist'
import BigNumber from 'bignumber.js'

interface Params {
  amountTotal0: number
  whitelist: string[]
  startTime: number
  endTime: number
  poolName: string
  tokenFromAddress: string
  tokenToAddress: string
  tokenIds: string[]
  priceFloor: string
  amountMinIncr1: string
  delayUnlockingTime: number
  releaseType: IReleaseType
  releaseData: {
    startAt: number | string
    endAtOrRatio: number | string
  }[]
}

export function useCreateMutantEnglishAuctionPool() {
  const { account, chainId } = useActiveWeb3React()
  const mutantEnglishContract = useMutantEnglishAuctionNftContract()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  const { currencyTo } = useAuctionERC20Currency()
  const addTransaction = useTransactionAdder()
  const values = useValuesState()

  const { ownerIds } = useERC721MultiOwner(
    values.nft721TokenFrom?.[0].contractAddr,
    account || undefined,
    values.nft721TokenFrom.map(item => item.tokenId || '')
  )

  return useCallback(async (): Promise<{
    hash: string
    transactionResult: Promise<{ sysId: number }>
  }> => {
    const endTime = (Number(values?.closeHour) || 0) * 3600 + (Number(values?.closeMinute) || 0) * 60
    const claimDelay = values.shouldDelayUnlocking
      ? (Number(values?.delayUnlockingHour) || 0) * 3600 + (Number(values?.delayUnlockingMinute) || 0) * 60
      : 0

    const params: Params = {
      amountTotal0: values.nft721TokenFrom.length,
      priceFloor: values.priceFloor || '',
      amountMinIncr1: values.amountMinIncr1 || '',
      whitelist: values.participantStatus === ParticipantStatus.Whitelist ? values.whitelist : [],
      startTime: values.startTime?.unix() || 0,
      endTime: endTime,
      poolName: values.poolName.slice(0, 50),
      tokenFromAddress: values.nft721TokenFrom[0].contractAddr || '',
      tokenIds: values.nft721TokenFrom.map(i => i.tokenId?.toString() || ''),
      tokenToAddress: values.tokenTo.address,
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
      releaseType: IReleaseType.Cliff,
      releaseData: [
        {
          startAt: values.shouldDelayUnlocking ? values.delayUnlockingTime?.unix() || 0 : values.endTime?.unix() || 0,
          endAtOrRatio: 0
        }
      ]
    }

    if (!currencyTo) {
      return Promise.reject('currencyTo error')
    }

    const amountTotal1 = CurrencyAmount.fromAmount(currencyTo, params.priceFloor)
    const amountEach = params.amountMinIncr1 ? BigNumber(BigNumber(params.amountMinIncr1).div(100)).times(1e18) : 0
    const creatorRatioAmount = values.creatorRatio ? BigNumber(BigNumber(values.creatorRatio).div(100)).times(1e18) : 0
    const prevBidderRatioAmount = values.prevBidderRatio
      ? BigNumber(BigNumber(values.prevBidderRatio).div(100)).times(1e18)
      : 0
    const lastBidderRatioAmount = values.lastBidderRatio
      ? BigNumber(BigNumber(values.lastBidderRatio).div(100)).times(1e18)
      : 0

    if (ownerIds.length !== values.nft721TokenFrom.length) {
      return Promise.reject('NFT owner error')
    }
    if (!amountTotal1 || !amountEach) {
      return Promise.reject('amountTotal1 or amountEach error')
    }
    if (!chainConfigInBackend?.id) {
      return Promise.reject(new Error('This chain is not supported for the time being'))
    }
    if (!account) {
      return Promise.reject('no account')
    }
    if (!mutantEnglishContract) {
      return Promise.reject('no contract')
    }

    let merkleroot = ''

    if (params.whitelist.length > 0) {
      const whitelistParams: GetWhitelistMerkleTreeRootParams = {
        addresses: params.whitelist,
        category: PoolType.MUTANT_ENGLISH_AUCTION_NFT,
        chainId: chainConfigInBackend.id
      }
      const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      merkleroot = data.merkleroot
    }

    const signatureParams: GetPoolCreationSignatureParams = {
      amountMin1: amountTotal1.raw.toString(),
      amountTotal0: params.amountTotal0.toString(),
      amountTotal1: amountTotal1.raw.toString(),
      category: PoolType.MUTANT_ENGLISH_AUCTION_NFT,
      chainId: chainConfigInBackend.id,
      claimAt: params.delayUnlockingTime,
      closeAt: params.endTime,
      creator: account,
      is721: true,
      maxAmount1PerWallet: '0',
      merkleroot: merkleroot,
      name: params.poolName,
      openAt: params.startTime,
      token0: params.tokenFromAddress,
      token1: params.tokenToAddress,
      tokenId: '',
      tokenIds: params.tokenIds,
      amountMinIncr1: amountEach.toString()
    }

    const {
      data: { id, expiredTime, signature }
    } = await getPoolCreationSignature(signatureParams)
    const distributeRatio = {
      prevBidderRatio: prevBidderRatioAmount.toString(),
      lastBidderRatio: lastBidderRatioAmount.toString()
    }

    const distributes = [
      {
        target: account,
        ratio: creatorRatioAmount.toString()
      }
    ]

    const contractCallParams = {
      name: signatureParams.name,
      token0: signatureParams.token0,
      token1: signatureParams.token1,
      tokenIds: signatureParams.tokenIds,
      amountTotal0: signatureParams.amountTotal0,
      amountMin1: signatureParams.amountMin1,
      amountMinIncrRatio1: signatureParams.amountMinIncr1,
      openAt: signatureParams.openAt,
      closeIncrInterval: params.endTime,
      claimDelay: claimDelay,
      isERC721: signatureParams.is721,
      whitelistRoot: merkleroot || NULL_BYTES
    }

    const args = [id, contractCallParams, distributeRatio, distributes, false, expiredTime, signature]
    console.log('args', args)

    const estimatedGas = await mutantEnglishContract.estimateGas.createV2(...args).catch((error: Error) => {
      console.debug('Failed to create english auction', error)
      throw error
    })
    return mutantEnglishContract
      .createV2(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Create mutant english auction',
          userSubmitted: {
            account,
            action: 'createMutantEnglishAuction'
          }
        })
        return {
          hash: response.hash,
          transactionResult: response.wait(1).then(curReceipt => {
            const poolId = getEventLog(mutantEnglishContract, curReceipt.logs, 'Created', 'index')
            if (!poolId) {
              Promise.reject('The transaction seems to have failed')
            }
            return { sysId: id }
          })
        }
      })
  }, [account, addTransaction, chainConfigInBackend?.id, currencyTo, mutantEnglishContract, ownerIds.length, values])
}

function useMutantEnglishAccountBids(backedChainId?: number, poolId?: string) {
  const { account } = useActiveWeb3React()
  const { data } = usePoolHistory(
    account && backedChainId ? backedChainId : 0,
    poolId || '',
    PoolType.MUTANT_ENGLISH_AUCTION_NFT,
    account || undefined,
    ['Bid']
  )
  const rawAmount = useMemo(() => (account ? data?.list?.[0]?.token1Amount : undefined), [account, data?.list])

  return rawAmount
}

export function useMutantEnglishAuctionPool(backedId?: number) {
  const { account } = useActiveWeb3React()
  const { data: poolInfo, run: getPoolInfo, loading } = useBackedPoolInfo(PoolType.MUTANT_ENGLISH_AUCTION_NFT, backedId)

  const mutantEnglishContract = useMutantEnglishAuctionNftContract(poolInfo?.contract || '', poolInfo?.ethChainId)
  const accountBidRawAmount = useMutantEnglishAccountBids(poolInfo?.chainId, poolInfo?.poolId)

  const whitelistData = useIsUserInAllWhitelist(
    poolInfo?.chainId,
    poolInfo?.poolId,
    poolInfo?.enableWhiteList || false,
    poolInfo?.category
  )

  const poolsRes = useSingleCallResult(
    mutantEnglishContract,
    'pools',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const poolsData = useMemo(
    () => ({
      amountTotal0: poolsRes?.amountTotal0.toString(),
      amountMin1: poolsRes?.amountMin1.toString(),
      closeAt: poolsRes?.closeAt ? Number(poolsRes?.closeAt) : undefined,
      closeIncrInterval: poolsRes?.closeIncrInterval ? Number(poolsRes?.closeIncrInterval) : undefined,
      claimDelay: poolsRes?.claimDelay ? Number(poolsRes?.claimDelay) : undefined,
      claimAt:
        poolsRes?.claimDelay && poolsRes?.closeAt ? Number(poolsRes.closeAt) + Number(poolsRes.claimDelay) : undefined,
      amountMinIncrRatio1: poolsRes?.amountMinIncrRatio1.toString()
    }),
    [poolsRes]
  )

  console.log('poolsData', poolsData)

  const creatorClaimedRes = useSingleCallResult(
    mutantEnglishContract,
    'creatorClaimed',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const creatorClaimed = useMemo(() => creatorClaimedRes?.[0], [creatorClaimedRes])

  const currentBidderRes = useSingleCallResult(
    mutantEnglishContract,
    'currentBidder',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const currentBidder = useMemo(() => currentBidderRes?.[0].toString(), [currentBidderRes])

  const currentBidderAmount1Res = useSingleCallResult(
    mutantEnglishContract,
    'currentBidderAmount1',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const currentBidderAmount1 = useMemo(() => currentBidderAmount1Res?.[0].toString(), [currentBidderAmount1Res])

  const currentBidderAmountRes = useSingleCallResult(
    mutantEnglishContract,
    'currentBidderAmount',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const currentBidderAmount = useMemo(() => currentBidderAmountRes?.[0].toString(), [currentBidderAmountRes])

  const extraAmount1Res = useSingleCallResult(
    mutantEnglishContract,
    'extraAmount1',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const extraAmount1 = useMemo(() => extraAmount1Res?.[0].toString(), [extraAmount1Res])

  const distributeRatiosRes = useSingleCallResult(
    mutantEnglishContract,
    'distributeRatios',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const distributeRatios = useMemo(() => {
    if (!distributeRatiosRes?.prevBidderRatio || !distributeRatiosRes?.lastBidderRatio) return undefined
    const one = CurrencyAmount.ether(Number(`1e18`).toString())
    return {
      prevBidderRatio: CurrencyAmount.ether(distributeRatiosRes.prevBidderRatio),
      lastBidderRatio: CurrencyAmount.ether(distributeRatiosRes.lastBidderRatio),
      creatorRatio: one
        .subtract(CurrencyAmount.ether(distributeRatiosRes.prevBidderRatio))
        .subtract(CurrencyAmount.ether(distributeRatiosRes.lastBidderRatio))
    }
  }, [distributeRatiosRes?.lastBidderRatio, distributeRatiosRes?.prevBidderRatio])

  const gasFeeRes = useSingleCallResult(
    mutantEnglishContract,
    'gasFee',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const gasFee = useMemo(() => gasFeeRes?.[0].toString(), [gasFeeRes])

  const myClaimedRes = useSingleCallResult(
    mutantEnglishContract,
    'myClaimed',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myClaimed = useMemo(() => myClaimedRes?.[0], [myClaimedRes])

  const data = useMemo(() => {
    if (!poolInfo || !poolInfo?.ethChainId) return undefined
    const _t1 = poolInfo?.token1
    const t1 = new Currency(poolInfo?.ethChainId, _t1.address, _t1.decimals, _t1.symbol, _t1.name, _t1.smallUrl)

    const _pools = {
      amountTotal0: poolsData.amountTotal0 || poolInfo.amountTotal0,
      closeAt: poolsData.closeAt || 0,
      closeIncrInterval: poolsData.closeIncrInterval,
      claimDelay: poolsData.claimDelay,
      claimAt: poolsData.claimAt || 0,
      currencyAmountMin1: poolsData.amountMin1 ? CurrencyAmount.fromRawAmount(t1, poolsData.amountMin1) : undefined,
      amountMinIncrRatio1: poolsData.amountMinIncrRatio1
        ? CurrencyAmount.ether(poolsData.amountMinIncrRatio1)
        : undefined
    }

    const _extraAmount1 = extraAmount1 ? CurrencyAmount.fromRawAmount(t1, extraAmount1) : undefined

    const calcDistributeRewards = (ratio: CurrencyAmount | undefined) => {
      if (!extraAmount1 || !ratio) return undefined
      return CurrencyAmount.fromRawAmount(
        t1,
        JSBI.divide(
          JSBI.multiply(JSBI.BigInt(extraAmount1), JSBI.BigInt(ratio.raw.toString())),
          JSBI.BigInt(Number(`1e18`).toString())
        )
      )
    }

    const distributeRewards = {
      prevBidderRewards: calcDistributeRewards(distributeRatios?.prevBidderRatio),
      lastBidderRewards: calcDistributeRewards(distributeRatios?.lastBidderRatio),
      creatorRewards: calcDistributeRewards(distributeRatios?.prevBidderRatio)
    }

    const result: MutantEnglishAuctionNFTPoolProp = {
      ...poolInfo,
      ..._pools,
      distributeRatios: {
        prevBidderRatio: distributeRatios?.prevBidderRatio,
        lastBidderRatio: distributeRatios?.lastBidderRatio,
        creatorRatio: distributeRatios?.creatorRatio
      },
      distributeRewards,
      whitelistData,
      participant: {
        ...poolInfo.participant,
        claimed: myClaimed,
        accountBidAmount: accountBidRawAmount ? CurrencyAmount.fromRawAmount(t1, accountBidRawAmount) : undefined
      },
      extraAmount1: _extraAmount1,
      creatorClaimed: creatorClaimed || poolInfo.creatorClaimed,
      currentBidder: currentBidder,
      currentBidderAmount1: currentBidderAmount1 ? CurrencyAmount.fromRawAmount(t1, currentBidderAmount1) : undefined,
      currentBidderAmount: currentBidderAmount ? CurrencyAmount.fromRawAmount(t1, currentBidderAmount) : undefined,
      gasFee: gasFee
        ? CurrencyAmount.fromRawAmount(Currency.getNativeCurrency(poolInfo.ethChainId), gasFee)
        : undefined,
      isWinner: !!account && currentBidder?.toLowerCase() === account.toLowerCase(),
      isUserJoinedPool: false
    }

    return result
  }, [
    poolInfo,
    poolsData.amountTotal0,
    poolsData.closeAt,
    poolsData.closeIncrInterval,
    poolsData.claimDelay,
    poolsData.claimAt,
    poolsData.amountMin1,
    poolsData.amountMinIncrRatio1,
    extraAmount1,
    distributeRatios?.prevBidderRatio,
    distributeRatios?.lastBidderRatio,
    distributeRatios?.creatorRatio,
    whitelistData,
    myClaimed,
    accountBidRawAmount,
    creatorClaimed,
    currentBidder,
    currentBidderAmount1,
    currentBidderAmount,
    gasFee,
    account
  ])

  return useMemo(
    () => ({
      loading,
      run: getPoolInfo,
      data
    }),
    [data, getPoolInfo, loading]
  )
}

export function useMutantEnglishCreatorClaim(poolId: number | string, name: string, contract?: string) {
  const { account } = useActiveWeb3React()

  const mutantEnglishContract = useMutantEnglishAuctionNftContract(contract)
  const addTransaction = useTransactionAdder()
  const funcName = 'creatorClaim'

  const submitted = useUserHasSubmittedRecords(account || undefined, funcName + '_mutant_english_nft', poolId)

  const run = useCallback(async (): Promise<{
    hash: string
    transactionResult: Promise<string>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!mutantEnglishContract) {
      return Promise.reject('no contract')
    }

    const args = [poolId]

    const estimatedGas = await mutantEnglishContract.estimateGas[funcName](...args).catch((error: Error) => {
      console.debug('Failed to claim for creator', error)
      throw error
    })
    return mutantEnglishContract[funcName](...args, {
      gasLimit: calculateGasMargin(estimatedGas)
    }).then((response: TransactionResponse) => {
      addTransaction(response, {
        summary: `Creator claim assets for ${name}`,
        userSubmitted: {
          account,
          action: funcName + '_mutant_english_nft',
          key: poolId
        }
      })
      return {
        hash: response.hash,
        transactionResult: response.wait(1).then(receipt => {
          const index = getEventLog(mutantEnglishContract, receipt.logs, 'CreatorClaimed', 'index')
          if (!index) {
            Promise.reject('The transaction seems to have failed')
          }
          return index
        })
      }
    })
  }, [account, addTransaction, mutantEnglishContract, name, poolId])

  return { submitted, run }
}

export function useMutantEnglishBidderClaim(poolInfo: MutantEnglishAuctionNFTPoolProp) {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'mutant_english_bidder_claim', poolInfo.poolId)

  const mutantEnglishContract = useMutantEnglishAuctionNftContract(poolInfo.contract)

  const run = useCallback(async (): Promise<{
    hash: string
    transactionResult: Promise<string>
  }> => {
    if (!account) {
      return Promise.reject('no account')
    }
    if (!mutantEnglishContract) {
      return Promise.reject('no contract')
    }

    const args = [poolInfo.poolId]

    const estimatedGas = await mutantEnglishContract.estimateGas.bidderClaim(...args).catch((error: Error) => {
      console.debug('Failed to claim', error)
      throw error
    })
    return mutantEnglishContract
      .bidderClaim(...args, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Claim token ${poolInfo.token1.symbol}`,
          userSubmitted: {
            account,
            action: `mutant_english_bidder_claim`,
            key: poolInfo.poolId
          }
        })
        return {
          hash: response.hash,
          transactionResult: response.wait(1).then(receipt => {
            const index = getEventLog(mutantEnglishContract, receipt.logs, 'BidderClaimed', 'index')
            if (!index) {
              Promise.reject('The transaction seems to have failed')
            }
            return index
          })
        }
      })
  }, [account, mutantEnglishContract, poolInfo.poolId, poolInfo.token1.symbol, addTransaction])

  return { run, submitted }
}

export function useMutantEnglishBidCallback(poolInfo: MutantEnglishAuctionNFTPoolProp) {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const submitted = useUserHasSubmittedRecords(account || undefined, 'mutant_english_bid', poolInfo.poolId)

  const isToken1Native = poolInfo.currencyAmountMin1?.currency.isNative
  const mutantEnglishContract = useMutantEnglishAuctionNftContract(poolInfo.contract)

  const gasFeeRes = useSingleCallResult(mutantEnglishContract, 'gasFee', [poolInfo.poolId])

  const bidPrevGasFee = useMemo(() => {
    const fee = gasFeeRes?.result?.[0].toString()
    if (!fee || !poolInfo.currencyAmountMin1) return undefined
    if (poolInfo.currencyAmountMin1.currency.isNative) {
      return CurrencyAmount.fromRawAmount(poolInfo.currencyAmountMin1.currency, fee)
    }
    return CurrencyAmount.fromRawAmount(Currency.getNativeCurrency(poolInfo.ethChainId), fee)
  }, [gasFeeRes?.result, poolInfo.currencyAmountMin1, poolInfo.ethChainId])

  const _bidCallback = useCallback(
    async (
      bidAmount: CurrencyAmount
    ): Promise<{
      hash: string
      transactionResult: Promise<string>
    }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!mutantEnglishContract) {
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

      const estimatedGas = await mutantEnglishContract.estimateGas.bid(...args, { value }).catch((error: Error) => {
        console.debug('Failed to bid', error)
        throw error
      })
      return mutantEnglishContract
        .bid(...args, {
          gasLimit: calculateGasMargin(estimatedGas, 20),
          value
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Bid amount ${bidAmount.toSignificant()} ${poolInfo.token1.symbol}`,
            userSubmitted: {
              account,
              action: `mutant_english_bid`,
              key: poolInfo.poolId
            }
          })
          return {
            hash: response.hash,
            transactionResult: response.wait(1).then(receipt => {
              const index = getEventLog(mutantEnglishContract, receipt.logs, 'Bid', 'index')
              if (!index) {
                Promise.reject('The transaction seems to have failed')
              }
              return index
            })
          }
        })
    },
    [
      account,
      addTransaction,
      bidPrevGasFee,
      mutantEnglishContract,
      isToken1Native,
      poolInfo.category,
      poolInfo.chainId,
      poolInfo.enableWhiteList,
      poolInfo.poolId,
      poolInfo.token1.symbol
    ]
  )

  const _bidPermitCallback = useCallback(
    async (
      bidAmount1: CurrencyAmount
    ): Promise<{
      hash: string
      transactionResult: Promise<string>
    }> => {
      if (!account) {
        return Promise.reject('no account')
      }
      if (!mutantEnglishContract) {
        return Promise.reject('no contract')
      }
      if (!poolInfo.enableWhiteList) {
        return Promise.reject('no enable whiteList')
      }
      const { data } = await getUserPermitSign({
        address: account,
        category: poolInfo.category,
        chainId: poolInfo.chainId,
        poolId: String(poolInfo.poolId),
        tokenType: getTokenType(poolInfo.category)
      })

      const args = [poolInfo.poolId, bidAmount1.raw.toString(), data.expiredTime, data.signature]

      const estimatedGas = await mutantEnglishContract.estimateGas
        .bidPermit(...args, { value: isToken1Native ? bidAmount1.raw.toString() : undefined })
        .catch((error: Error) => {
          console.debug('Failed to bid', error)
          throw error
        })
      return mutantEnglishContract
        .bidPermit(...args, {
          gasLimit: calculateGasMargin(estimatedGas),
          value: isToken1Native ? bidAmount1.raw.toString() : undefined
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Bid amount ${bidAmount1.toSignificant()} ${poolInfo.token1.symbol}`,
            userSubmitted: {
              account,
              action: `mutant_english_bid`,
              key: poolInfo.poolId
            }
          })
          return {
            hash: response.hash,
            transactionResult: response.wait(1).then(receipt => {
              const index = getEventLog(mutantEnglishContract, receipt.logs, 'Bid', 'index')
              if (!index) {
                Promise.reject('The transaction seems to have failed')
              }
              return index
            })
          }
        })
    },
    [
      account,
      addTransaction,
      mutantEnglishContract,
      isToken1Native,
      poolInfo.category,
      poolInfo.chainId,
      poolInfo.enableWhiteList,
      poolInfo.poolId,
      poolInfo.token1.symbol
    ]
  )

  const bidCallback = useCallback(
    (bidAmount: CurrencyAmount) =>
      poolInfo.enableWhiteList && poolInfo.whitelistData.isPermit
        ? _bidPermitCallback(bidAmount)
        : _bidCallback(bidAmount),
    [_bidCallback, _bidPermitCallback, poolInfo.enableWhiteList, poolInfo.whitelistData.isPermit]
  )

  return { bidCallback, submitted, bidPrevGasFee }
}
