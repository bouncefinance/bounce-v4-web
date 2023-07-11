import { AbstractConnector } from '@web3-react/abstract-connector'
import { Currency } from './token'
import { OKXWalletConnector, injected, walletconnect, walletlink } from '../connectors'
import JSBI from 'jsbi'
import { ChainId } from './chain'

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const BAST_TOKEN: { [chainId in ChainId]?: Currency } = {
  [ChainId.MAINNET]: new Currency(ChainId.MAINNET, '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', 18, 'USDT', 'USDT')
}

export const autoConnectInjectedEveryone = false

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
  disabled?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  // OKEX: {
  //   connector: injected,
  //   name: 'OKX',
  //   iconName: 'okxIcon.png',
  //   description: 'Easy-to-use browser extension.',
  //   href: null,
  //   color: '#E8831D',
  //   mobile: true,
  //   mobileOnly: true
  // },
  OKEX: {
    connector: OKXWalletConnector,
    name: 'OKX Wallet',
    iconName: 'okxIcon.png',
    description: 'Easy-to-use browser extension.',
    href: '',
    color: '#E8831D',
    mobile: true
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  BINANCE: {
    connector: undefined,
    name: 'Binance Wallet',
    iconName: 'BinanceWalletIcon.svg',
    description: '',
    href: null,
    disabled: true,
    color: '#315CF5'
  },
  TRUST_WALLET: {
    connector: undefined,
    name: 'Trust wallet',
    iconName: 'trustWalletIcon.svg',
    description: '',
    href: null,
    disabled: true,
    color: '#315CF5'
  },
  MATH_WALLET: {
    connector: undefined,
    name: 'Math wallet',
    iconName: 'mathWalletIcon.svg',
    description: '',
    href: null,
    disabled: true,
    color: '#315CF5'
  }
  // COINBASE_LINK: {
  //   name: 'Open in Coinbase Wallet',
  //   iconName: 'coinbaseWalletIcon.svg',
  //   description: 'Open in Coinbase Wallet app.',
  //   href: 'https://go.cb-w.com/mtUDhEZPy1',
  //   color: '#315CF5',
  //   mobile: true,
  //   mobileOnly: true
  // },
  // FORTMATIC: {
  //   connector: fortmatic,
  //   name: 'Fortmatic',
  //   iconName: 'fortmaticIcon.png',
  //   description: 'Login using Fortmatic hosted wallet',
  //   href: null,
  //   color: '#6748FF',
  //   mobile: true
  // },
  // Portis: {
  //   connector: portis,
  //   name: 'Portis',
  //   iconName: 'portisIcon.png',
  //   description: 'Login using Portis hosted wallet',
  //   href: null,
  //   color: '#4A6C9B',
  //   mobile: true
  // }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C'
]

export const IS_TEST_ENV = !!Number(process.env.REACT_APP_IS_TEST_ENV)

export const NULL_BYTES = '0x0000000000000000000000000000000000000000000000000000000000000000'

export const FIXED_SWAP_ERC20_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x9e2C12D9240BF267fbeBD510d47Ac3AbD4D9d9ee',
  [ChainId.GÖRLI]: process.env.REACT_APP_GOERLI_FIXED_SWAP_ERC20_ADDRESS || '',
  [ChainId.OPTIMISM]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.CRONOS]: '',
  [ChainId.BSC]: process.env.REACT_APP_BSC_FIXED_SWAP_ERC20_ADDRESS || '',
  [ChainId.OKEX]: '0x167544766d084a048d109ad0e1d95b19198c5af1',
  [ChainId.BSCTEST]: '',
  [ChainId.OMNI_TESTNET]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.ROLLUX]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.KLAYTN]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.GNOSIS]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.POLYGON]: '0x5b5E07c8c05489CD0D2227AfA816478cD039c624',
  [ChainId.FANTOM]: '0x41939809dB201c8531D082f95Fc5BEc187Fe2803',
  // [ChainId.ZKSYNC_ERA]: '0x88313626Fb4EA033af12308feCd8afB1eBA853cE',
  // [ChainId.ZKSYNC_ERA]: '0xbE5661cA6B60335c2c24536339A2C02f354B2E21',
  [ChainId.ZKSYNC_ERA]: '0x9B8B850d00c24bC2684530388F8A02C1Cf9d023b',
  [ChainId.ZKSYNC_ERA_TESTNET]: '0x46c2C5a22b2a21a54495Ad32EbFC4598889A1836',
  [ChainId.POLYGON_ZK_EVM]: '0x646a7A29D97BACC3E1756dc3f8090B959046f280',
  [ChainId.POLYGON_ZK_EVM_TESTNET]: '0x194C02845d77ffCB8580D474Ca99013073C1eAb1',
  [ChainId.MOONBEAM]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.MOONRIVER]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.DOGECHAIN]: '0x4B105D426aE2dD0F5bBAF58e4f4aD7464A55a376',
  [ChainId.KAVA]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.FUSION]: '',
  [ChainId.ARBITRUM]: process.env.REACT_APP_ARBITRUM_FIXED_SWAP_ERC20_ADDRESS || '',
  [ChainId.CELO]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.AVALANCHE]: '0x853C97d50604f4C5097D736b2C8B5A5aF15b3C02',
  [ChainId.SEPOLIA]: '0x73282A63F0e3D7e9604575420F777361ecA3C86A',
  [ChainId.AUROEA]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.HARMONY]: '',
  [ChainId.SCROLL_ALPHA]: '0x73282A63F0e3D7e9604575420F777361ecA3C86A',
  [ChainId.PALM]: '',
  [ChainId.LINEA_GORLI]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1'
}

export const FIXED_SWAP_NFT_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.OPTIMISM]: '',
  [ChainId.CRONOS]: '',
  [ChainId.BSC]: process.env.REACT_APP_BSC_FIXED_SWAP_NFT_ADDRESS || '',
  [ChainId.OKEX]: '',
  [ChainId.BSCTEST]: '',
  [ChainId.KLAYTN]: '',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '',
  [ChainId.FANTOM]: '',
  [ChainId.OMNI_TESTNET]: '',
  [ChainId.ROLLUX]: '0xB0a2bf3da942E780ACBa86D14Efe0774D7096ec8',
  // [ChainId.ZKSYNC_ERA]: '0xf71114d8cd7Dcd89Ff689f2c3A8dd5AF3fbc75eD',
  [ChainId.ZKSYNC_ERA]: '0x51552f0b8E57A1b2C749845d9aFb906FA4f5317A',
  [ChainId.ZKSYNC_ERA_TESTNET]: '',
  [ChainId.POLYGON_ZK_EVM]: '',
  [ChainId.POLYGON_ZK_EVM_TESTNET]: '',
  [ChainId.MOONBEAM]: '',
  [ChainId.MOONRIVER]: '',
  [ChainId.DOGECHAIN]: '',
  [ChainId.KAVA]: '',
  [ChainId.FUSION]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.CELO]: '',
  [ChainId.AVALANCHE]: '',
  [ChainId.SEPOLIA]: '0xcF328e2218b507746507c3D162749bb964D4BE5A',
  [ChainId.AUROEA]: '',
  [ChainId.HARMONY]: '',
  [ChainId.SCROLL_ALPHA]: '',
  [ChainId.PALM]: '',
  [ChainId.LINEA_GORLI]: ''
}
// REACT_APP_RANDOM_SELECTION_ADDRESS
export const RANDOM_SELECTION_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xc9C747CCe579959e53Ba4cb5615d8783d4753450',
  [ChainId.GÖRLI]: '',
  [ChainId.OPTIMISM]: '',
  [ChainId.CRONOS]: '',
  [ChainId.BSC]: '0x6B142c939e686f24E8De46f9D5669EFEEa2250D7',
  [ChainId.OKEX]: '',
  [ChainId.BSCTEST]: '',
  [ChainId.KLAYTN]: '',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '0xAd161CDAFD56450BC8624F74163A47aF58BC2C82',
  [ChainId.FANTOM]: '0x87d811661BB10Af6D236b5458Eeb2f4614723FB8',
  [ChainId.OMNI_TESTNET]: '',
  [ChainId.ROLLUX]: '',
  [ChainId.ZKSYNC_ERA]: '',
  [ChainId.ZKSYNC_ERA_TESTNET]: '',
  [ChainId.POLYGON_ZK_EVM]: '',
  [ChainId.POLYGON_ZK_EVM_TESTNET]: '',
  [ChainId.MOONBEAM]: '',
  [ChainId.MOONRIVER]: '',
  [ChainId.DOGECHAIN]: '',
  [ChainId.KAVA]: '',
  [ChainId.FUSION]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.CELO]: '',
  [ChainId.AVALANCHE]: '0x92f742a243904818e9167725eC3B7b992f8eeB2E',
  [ChainId.SEPOLIA]: process.env.REACT_APP_RANDOM_SELECTION_ADDRESS || '',
  [ChainId.AUROEA]: '',
  [ChainId.HARMONY]: '',
  [ChainId.SCROLL_ALPHA]: '',
  [ChainId.PALM]: '',
  [ChainId.LINEA_GORLI]: ''
}

export const ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x7cC82b4e6A4585A3c2228301Bd3e78CA52650174',
  [ChainId.GÖRLI]: '',
  [ChainId.OPTIMISM]: '',
  [ChainId.CRONOS]: '',
  [ChainId.BSC]: '0xC52DD0614449d82A497Fd6476D67df4D1B897009',
  [ChainId.OKEX]: '',
  [ChainId.BSCTEST]: '',
  [ChainId.KLAYTN]: '',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '0xE11ADD6956077174C008F842b82135b50E377128',
  [ChainId.OMNI_TESTNET]: '',
  [ChainId.FANTOM]: '',
  [ChainId.ROLLUX]: '',
  [ChainId.ZKSYNC_ERA]: '',
  [ChainId.ZKSYNC_ERA_TESTNET]: '',
  [ChainId.POLYGON_ZK_EVM]: '',
  [ChainId.POLYGON_ZK_EVM_TESTNET]: '',
  [ChainId.MOONBEAM]: '',
  [ChainId.MOONRIVER]: '',
  [ChainId.DOGECHAIN]: '',
  [ChainId.KAVA]: '',
  [ChainId.FUSION]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.CELO]: '',
  [ChainId.AVALANCHE]: '',
  [ChainId.SEPOLIA]: '0xB0a2bf3da942E780ACBa86D14Efe0774D7096ec8',
  [ChainId.AUROEA]: '',
  [ChainId.HARMONY]: '',
  [ChainId.SCROLL_ALPHA]: '',
  [ChainId.PALM]: '',
  [ChainId.LINEA_GORLI]: ''
}

export const defaultPoolVersionRoute: 1 | 2 = 2
