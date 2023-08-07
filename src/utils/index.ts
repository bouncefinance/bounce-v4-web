import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { CurrencyAmount, Percent } from '../constants/token/fractions'
import JSBI from 'jsbi'
import { ChainId, SUPPORTED_NETWORKS } from '../constants/chain'
import { FormType } from 'api/profile/type'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

const explorers = {
  etherscan: (link: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
    switch (type) {
      case 'transaction':
        return `${link}/tx/${data}`
      default:
        return `${link}/${type}/${data}`
    }
  },

  blockscout: (link: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
    switch (type) {
      case 'transaction':
        return `${link}/tx/${data}`
      case 'token':
        return `${link}/tokens/${data}`
      default:
        return `${link}/${type}/${data}`
    }
  },

  harmony: (link: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
    switch (type) {
      case 'transaction':
        return `${link}/tx/${data}`
      case 'token':
        return `${link}/address/${data}`
      default:
        return `${link}/${type}/${data}`
    }
  },

  okex: (link: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
    switch (type) {
      case 'transaction':
        return `${link}/tx/${data}`
      case 'token':
        return `${link}/tokenAddr/${data}`
      default:
        return `${link}/${type}/${data}`
    }
  },
  moonriver: (link: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
    switch (type) {
      case 'transaction':
        return `${link}/tx/${data}`
      case 'token':
        return `${link}/tokens/${data}`
      default:
        return `${link}/${type}/${data}`
    }
  },
  fuse: (link: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
    switch (type) {
      case 'transaction':
        return `${link}/tx/${data}`
      case 'token':
        return `${link}/tokens/${data}`
      default:
        return `${link}/${type}/${data}`
    }
  },
  telos: (link: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
    switch (type) {
      case 'transaction':
        return `${link}/transaction/${data}`
      case 'token':
        return `${link}/address/${data}`
      case 'address':
        return `${link}/address/${data}`
      default:
        return `${link}/${type}/${data}`
    }
  },
  moonbeam: (link: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
    switch (type) {
      case 'transaction':
        return `${link}/tx/${data}`
      case 'token':
        return `${link}/tokens/${data}`
      default:
        return `${link}/${type}/${data}`
    }
  }
}

interface ChainObject {
  [chainId: number]: {
    builder: (chainName: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => string
  }
}

// Configure special
const chains: ChainObject = {
  [ChainId.GNOSIS]: {
    builder: explorers.blockscout
  },
  [ChainId.AVALANCHE]: {
    builder: explorers.blockscout
  },
  [ChainId.HARMONY]: {
    builder: explorers.harmony
  },
  [ChainId.OKEX]: {
    builder: explorers.okex
  },
  [ChainId.MOONRIVER]: {
    builder: explorers.moonriver
  },
  // [ChainId.FUSE]: {
  //   builder: explorers.fuse
  // },
  // [ChainId.TELOS]: {
  //   builder: explorers.telos
  // },
  [ChainId.MOONBEAM]: {
    builder: explorers.moonbeam
  },
  [ChainId.KAVA]: {
    builder: explorers.blockscout
  }
}

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {
  const builder = chains[chainId]?.builder || explorers.etherscan
  return builder(SUPPORTED_NETWORKS[chainId]?.blockExplorerUrls?.[0].replace(/\/$/, '') || '', data, type)
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    return ''
    // throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function shortenHash(hash: string, suffixLength = 6): string {
  if (typeof hash !== 'string' || hash.length <= 4 + suffixLength) {
    return hash // Return original hash if it's not a string or shorter than prefix + suffix length
  }

  const prefix = hash.slice(0, 4)
  const suffix = hash.slice(-suffixLength)
  return `${prefix}...${suffix}`
}

// add 10%
export function calculateGasMargin(value: BigNumber, add = 10): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(add * 100))).div(BigNumber.from(10000))
}
export function calculateGasPriceMargin(value: string): string {
  return JSBI.add(JSBI.BigInt(value), JSBI.divide(JSBI.BigInt(value), JSBI.BigInt(10))).toString()
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000))
}

export function calculateSlippageAmount(value: CurrencyAmount, slippage: number): [JSBI, JSBI] {
  if (slippage < 0 || slippage > 10000) {
    throw Error(`Unexpected slippage value: ${slippage}`)
  }
  return [
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000))
  ]
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isURL(url: string) {
  const strRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
  const re = new RegExp(strRegex)
  return re.test(url)
}

export function isEmail(value: any): boolean {
  return /^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{1,10}(,[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{1,10})*$/.test(
    value
  )
}

export function isSocialUrl(name: 'discord' | 'twitter' | 'github' | 'opensea' | 'youtube' | 'url', url: string) {
  switch (name) {
    case 'discord':
      return new RegExp(/^https:\/\/(www\.)?discord\.(com|gg)\//).test(url)
    case 'twitter':
      return new RegExp(/^https:\/\/(www\.)?twitter\.com\//).test(url)
    case 'github':
      return new RegExp(/^https:\/\/(www\.)?github\.com\//).test(url)
    case 'opensea':
      return new RegExp(/^https:\/\/(www\.)?opensea\.io\//).test(url)
    case 'youtube':
      return new RegExp(/^https:\/\/(www\.)?youtube\.com\//).test(url)
    default:
      return isURL(url)
  }
}

export function getCurrentTimeStamp(date?: Date | string | number) {
  return Number(((date ? new Date(date) : new Date()).getTime() / 1000).toFixed())
}

export const getLabelById = (id: number | string, key: string, list: any[]) => {
  if (!id || !key || !list?.length) return ''
  const item = list.find(v => Number(v.id) === Number(id))
  return item ? item[key] : ''
}

export const formCheckValid = (label: string, type: FormType, text?: string | '') => {
  if (type === FormType.Custom) {
    return text
  }
  if (type === FormType.Input) {
    return `Please enter your ${label.toLocaleLowerCase()}`
  }
  if (type === FormType.Select) {
    return `Please select your ${label.toLocaleLowerCase()}`
  }
  return text
}

export const getPrimaryRoleLabel = (id: number | string, list: any[]) => {
  if (!id || !list?.length) return ''
  const temp: any[] = []
  list.map(v => {
    temp.push(...v?.child)
  })
  if (!temp.length) return ''
  return getLabelById(id, 'level2Name', temp)
}

export const getfilesize = (size: number): string => {
  if (!size) return '0KB'
  const num = 1024 //byte
  if (size < num) return size + 'B'
  if (size < Math.pow(num, 2)) return (size / num).toFixed(0) + 'KB' //kb
  if (size < Math.pow(num, 3)) return (size / Math.pow(num, 2)).toFixed(0) + 'MB' //M
  if (size < Math.pow(num, 4)) return (size / Math.pow(num, 3)).toFixed(0) + 'GB' //G
  if (size < Math.pow(num, 5)) return (size / Math.pow(num, 4)).toFixed(0) + 'TB' //T
  return size + 'B'
}

export const formatNumberWithCommas = (number: number | string) => {
  const strNum = String(number)
  const parts = strNum.split('.')
  const intPart = parts[0]
  const decimalsPart = parts[1] || ''
  const commas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decimalsPart.length > 0 ? `${commas}.${decimalsPart}` : commas
}
