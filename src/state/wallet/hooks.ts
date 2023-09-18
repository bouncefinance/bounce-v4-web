import { useMemo } from 'react'
import ERC20_INTERFACE from '../../constants/abis/erc20'
import { useActiveWeb3React } from '../../hooks'
import { useBytes32TokenContract, useMulticallContract, useTokenContract } from '../../hooks/useContract'
import { isAddress } from '../../utils'
import {
  useSingleContractMultipleData,
  useMultipleContractSingleData,
  NEVER_RELOAD,
  useSingleCallResult
} from '../multicall/hooks'
import { CurrencyAmount } from '../../constants/token/fractions'
import JSBI from 'jsbi'
import { Currency } from '../../constants/token'
import { ChainId } from 'constants/chain'
import { arrayify, parseBytes32String } from 'ethers/lib/utils'
import isZero from 'utils/isZero'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { addConnectedWallet } from './reducer'
import { Wallet } from './reducer'

export function useETHBalances(
  uncheckedAddresses?: (string | undefined)[],
  chainId?: ChainId
): { [address: string]: CurrencyAmount | undefined } {
  const multicallContract = useMulticallContract(chainId)

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses]
  )

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map(address => [address]),
    undefined,
    chainId
  )

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0]
        if (value)
          memo[address] = CurrencyAmount.fromRawAmount(
            Currency.getNativeCurrency(chainId),
            JSBI.BigInt(value.toString())
          )
        return memo
      }, {}),
    [addresses, chainId, results]
  )
}

export function useETHBalance(uncheckedAddress?: string | undefined, chainId?: ChainId): CurrencyAmount | undefined {
  const ETHBalances = useETHBalances([uncheckedAddress], chainId)

  return useMemo(() => (uncheckedAddress ? ETHBalances[uncheckedAddress] : undefined), [ETHBalances, uncheckedAddress])
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Currency | undefined)[],
  chainId?: ChainId
): [{ [tokenAddress: string]: CurrencyAmount | undefined }, boolean] {
  const validatedTokens: Currency[] = useMemo(
    () => tokens?.filter((t?: Currency): t is Currency => isAddress(t?.address) !== false && !t?.isNative) ?? [],
    [tokens]
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [validatedTokens])

  const balances = useMultipleContractSingleData(
    validatedTokenAddresses,
    ERC20_INTERFACE,
    'balanceOf',
    [address],
    undefined,
    chainId
  )

  const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [balances])

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: CurrencyAmount | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0]
              const amount = value ? JSBI.BigInt(value.toString()) : undefined
              if (amount) {
                memo[token.address] = new CurrencyAmount(token, amount)
              }
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances]
    ),
    anyLoading
  ]
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[],
  chainId?: ChainId
): (CurrencyAmount | undefined)[] {
  const tokens = useMemo(
    () => currencies?.map(currency => (currency && !currency?.isNative ? currency : undefined)) ?? [],
    [currencies]
  )
  const eths = useMemo(() => currencies?.find(currency => currency && currency.isNative), [currencies])

  const tokenBalances = useTokenBalancesWithLoadingIndicator(account, tokens, chainId)[0]
  const ethBalance = useETHBalance(eths ? account : undefined, chainId)
  return useMemo(
    () =>
      currencies?.map(currency => {
        if (!account || !currency) return undefined
        if (currency.isNative) return ethBalance
        else return tokenBalances[currency.address]
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances]
  )
}

export function useCurrencyBalance(
  account?: string,
  currency?: Currency,
  chainId?: ChainId
): CurrencyAmount | undefined {
  return useCurrencyBalances(account, [currency], chainId)[0]
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue
}

export function useToken(tokenAddress: string, chainId?: ChainId): Currency | undefined | null {
  const { chainId: linkChainId } = useActiveWeb3React()
  const curChainId = chainId || linkChainId

  const address = useMemo(() => {
    return isZero(tokenAddress) ? '' : isAddress(tokenAddress)
  }, [tokenAddress])

  const tokenContract = useTokenContract(address ? address : undefined, false, curChainId)
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false, curChainId)

  const tokenName = useSingleCallResult(tokenContract, 'name', undefined, NEVER_RELOAD, curChainId)
  const tokenNameBytes32 = useSingleCallResult(tokenContractBytes32, 'name', undefined, NEVER_RELOAD, curChainId)
  const symbol = useSingleCallResult(tokenContract, 'symbol', undefined, NEVER_RELOAD, curChainId)
  const symbolBytes32 = useSingleCallResult(tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD, curChainId)
  const decimals = useSingleCallResult(tokenContract, 'decimals', undefined, NEVER_RELOAD, curChainId)

  return useMemo(() => {
    if (!curChainId || !address) return undefined
    if (address && isZero(address)) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return new Currency(
        curChainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
      )
    }
    return undefined
  }, [
    address,
    curChainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result
  ])
}

export function useTokens(
  tokenAddress: (string | undefined)[],
  chainId?: ChainId
): undefined | (Currency | undefined)[] {
  const { chainId: linkChainId } = useActiveWeb3React()
  const curChainId = chainId || linkChainId

  const tokenNames = useMultipleContractSingleData(
    tokenAddress,
    ERC20_INTERFACE,
    'name',
    undefined,
    NEVER_RELOAD,
    curChainId
  )
  const symbols = useMultipleContractSingleData(
    tokenAddress,
    ERC20_INTERFACE,
    'symbol',
    undefined,
    NEVER_RELOAD,
    curChainId
  )
  const decimalss = useMultipleContractSingleData(
    tokenAddress,
    ERC20_INTERFACE,
    'decimals',
    undefined,
    NEVER_RELOAD,
    curChainId
  )

  return useMemo(() => {
    if (!tokenAddress.length || !curChainId) return undefined
    if (!tokenNames.length || !symbols.length || !decimalss.length) return undefined
    if (tokenNames[0].loading || symbols[0].loading || decimalss[0].loading) return undefined
    return tokenAddress.map((address, index) => {
      const symbol = symbols[index].result
      const tokenName = tokenNames[index].result
      const decimal = decimalss[index].result
      if (!symbol || !tokenName || !decimal || !address) return undefined

      return new Currency(curChainId, address, decimal[0], symbol[0], tokenName[0])
    })
  }, [curChainId, decimalss, symbols, tokenAddress, tokenNames])
}

export function useConnectedWallets(): [Wallet[], (wallet: Wallet) => void] {
  const dispatch = useAppDispatch()
  const connectedWallets = useAppSelector(state => state.wallets.connectedWallets)
  const addWallet = useCallback(
    (wallet: Wallet) => {
      dispatch(addConnectedWallet(wallet))
    },
    [dispatch]
  )
  return [connectedWallets, addWallet]
}
