import { Currency } from './token'
import JSBI from 'jsbi'
import { ChainId } from './chain'
import { ConnectionType } from 'connection/types'

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const BAST_TOKEN: { [chainId in ChainId]?: Currency } = {
  [ChainId.MAINNET]: new Currency(ChainId.MAINNET, '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', 18, 'USDT', 'USDT')
}

export const TX_FEE_DENOMINATOR = `${Number(1e18)}`

export const autoConnectInjectedEveryone = false

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const SELECTABLE_ENABLE_WALLETS: ConnectionType[] = [
  ConnectionType.INJECTED,
  ConnectionType.WALLET_CONNECT_V2,
  ConnectionType.UNISWAP_WALLET_V2,
  ConnectionType.OKX_WALLET,
  ConnectionType.GNOSIS_SAFE,
  ConnectionType.BINANCE_WALLET,
  ConnectionType.COINBASE_WALLET
]

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
  [ChainId.BASE]: '0x73282A63F0e3D7e9604575420F777361ecA3C86A',
  [ChainId.BASE_TESTNET]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.GNOSIS]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
  [ChainId.POLYGON]: '0x5b5E07c8c05489CD0D2227AfA816478cD039c624',
  [ChainId.FANTOM]: '0x41939809dB201c8531D082f95Fc5BEc187Fe2803',
  [ChainId.FANTOM_TESTNET]: '0x73282A63F0e3D7e9604575420F777361ecA3C86A',
  [ChainId.ZETA_CHAIN_TESTNET]: '0x73282A63F0e3D7e9604575420F777361ecA3C86A',
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
  [ChainId.LINEA]: '0x94aCe08a344efa23Ac118AA94A66A8D699E8a1A1',
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
  [ChainId.BASE]: '0xB0a2bf3da942E780ACBa86D14Efe0774D7096ec8',
  [ChainId.BASE_TESTNET]: '0x194C02845d77ffCB8580D474Ca99013073C1eAb1',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.ZETA_CHAIN_TESTNET]: '',
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
  [ChainId.LINEA]: '0xFCEc495B3FbB41fC8034E4d2Fd85289F549922b1',
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
  [ChainId.BASE]: '',
  [ChainId.BASE_TESTNET]: '',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '0xAd161CDAFD56450BC8624F74163A47aF58BC2C82',
  [ChainId.FANTOM]: '0x87d811661BB10Af6D236b5458Eeb2f4614723FB8',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.ZETA_CHAIN_TESTNET]: '',
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
  [ChainId.LINEA]: '',
  [ChainId.LINEA_GORLI]: ''
}

export const ENGLISH_AUCTION_ERC20_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x0B0A73Dae5c6b5c3B5C2BAC0d9FFef65E07d3fD8',
  [ChainId.GÖRLI]: '',
  [ChainId.OPTIMISM]: '0x41939809dB201c8531D082f95Fc5BEc187Fe2803',
  [ChainId.CRONOS]: '',
  [ChainId.BSC]: '0x27BeA5bDe5F03B62b51C81BA857D4a7E7176D89E',
  [ChainId.OKEX]: '',
  [ChainId.BSCTEST]: '',
  [ChainId.KLAYTN]: '',
  [ChainId.BASE]: '0x853C97d50604f4C5097D736b2C8B5A5aF15b3C02',
  [ChainId.BASE_TESTNET]: '0x01E36E11721b259fb3afa13A238c56Bfd6F2Ef67',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '0x738de648E84b5d990DAA7e6598546f7a4eAC1BB4',
  [ChainId.OMNI_TESTNET]: '',
  [ChainId.FANTOM]: '0xD4D0c9fCd48FBD22452cB6528bE4541249139c0B',
  [ChainId.ROLLUX]: '',
  [ChainId.ZKSYNC_ERA]: '0x4e512aeDBaf09A5929C62e25d8aB931b2C4E7b50',
  [ChainId.ZKSYNC_ERA_TESTNET]: '',
  [ChainId.POLYGON_ZK_EVM]: '',
  [ChainId.POLYGON_ZK_EVM_TESTNET]: '',
  [ChainId.MOONBEAM]: '',
  [ChainId.MOONRIVER]: '',
  [ChainId.DOGECHAIN]: '',
  [ChainId.KAVA]: '',
  [ChainId.FUSION]: '',
  [ChainId.ARBITRUM]: '0xE8e4017952935F550dad7e6D42362715A17C0846',
  [ChainId.CELO]: '',
  [ChainId.AVALANCHE]: '',
  [ChainId.SEPOLIA]: '0x50047539704792618D752D54cbB6A4D2c07cCc8B',
  [ChainId.AUROEA]: '',
  [ChainId.HARMONY]: '',
  [ChainId.SCROLL_ALPHA]: '',
  [ChainId.PALM]: '',
  [ChainId.LINEA_GORLI]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.ZETA_CHAIN_TESTNET]: '',
  [ChainId.LINEA]: ''
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
  [ChainId.BASE]: '',
  [ChainId.BASE_TESTNET]: '',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '0xE11ADD6956077174C008F842b82135b50E377128',
  [ChainId.OMNI_TESTNET]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.ZETA_CHAIN_TESTNET]: '',
  [ChainId.ROLLUX]: '0x01E36E11721b259fb3afa13A238c56Bfd6F2Ef67',
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
  [ChainId.LINEA]: '0x41939809dB201c8531D082f95Fc5BEc187Fe2803',
  [ChainId.LINEA_GORLI]: ''
}

export const MUTANT_ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES: Record<ChainId, string> = {
  [ChainId.MAINNET]: '0x8adA332eA4A16C08C033B1F17682A8C0D8BB275D',
  [ChainId.GÖRLI]: '',
  [ChainId.OPTIMISM]: '',
  [ChainId.CRONOS]: '',
  [ChainId.BSC]: '',
  [ChainId.OKEX]: '',
  [ChainId.BSCTEST]: '',
  [ChainId.KLAYTN]: '',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '',
  [ChainId.OMNI_TESTNET]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.ZETA_CHAIN_TESTNET]: '',
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
  [ChainId.SEPOLIA]: '0xe06A754AFaAFFFC44F650420e496bbe1F765D71B',
  [ChainId.AUROEA]: '',
  [ChainId.HARMONY]: '',
  [ChainId.BASE]: '',
  [ChainId.BASE_TESTNET]: '',
  [ChainId.SCROLL_ALPHA]: '',
  [ChainId.PALM]: '',
  [ChainId.LINEA]: '',
  [ChainId.LINEA_GORLI]: ''
}

export const DUTCH_AUCTION_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xDDC380852a409592630Aa832C45D031051140B11',
  [ChainId.GÖRLI]: '',
  [ChainId.OPTIMISM]: '0xFCEc495B3FbB41fC8034E4d2Fd85289F549922b1',
  [ChainId.CRONOS]: '',
  [ChainId.BSC]: '0xEC29EEba5E5e356443261a80697Ee6afBc67eAb2',
  [ChainId.OKEX]: '',
  [ChainId.BSCTEST]: '',
  [ChainId.KLAYTN]: '',
  [ChainId.BASE]: '0x01E36E11721b259fb3afa13A238c56Bfd6F2Ef67',
  [ChainId.BASE_TESTNET]: '0x853C97d50604f4C5097D736b2C8B5A5aF15b3C02',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '0x42bC810b573239736D04ba2a2cEb69B186ae762C',
  [ChainId.FANTOM]: '0x4B105D426aE2dD0F5bBAF58e4f4aD7464A55a376',
  [ChainId.FANTOM_TESTNET]: '0xB0a2bf3da942E780ACBa86D14Efe0774D7096ec8',
  [ChainId.ZETA_CHAIN_TESTNET]: '',
  [ChainId.ZKSYNC_ERA]: '',
  [ChainId.ZKSYNC_ERA_TESTNET]: '',
  [ChainId.POLYGON_ZK_EVM]: '',
  [ChainId.POLYGON_ZK_EVM_TESTNET]: '',
  [ChainId.MOONBEAM]: '',
  [ChainId.MOONRIVER]: '',
  [ChainId.DOGECHAIN]: '',
  [ChainId.KAVA]: '',
  [ChainId.FUSION]: '',
  [ChainId.ARBITRUM]: '0x167544766d084a048d109ad0e1d95b19198c5af1',
  [ChainId.CELO]: '',
  [ChainId.AVALANCHE]: '',
  [ChainId.SEPOLIA]: '0x69bFf5E9F1230F4B93cA1C7db31Ff63B9318aAf8',
  [ChainId.AUROEA]: '',
  [ChainId.HARMONY]: '',
  [ChainId.SCROLL_ALPHA]: '',
  [ChainId.PALM]: '',
  [ChainId.LINEA_GORLI]: '',
  [ChainId.LINEA]: '0x194C02845d77ffCB8580D474Ca99013073C1eAb1',
  [ChainId.OMNI_TESTNET]: '',
  [ChainId.ROLLUX]: ''
}

export const defaultPoolVersionRoute: 1 | 2 = 2

export const DISPERSE_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.GÖRLI]: '',
  [ChainId.OPTIMISM]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.CRONOS]: '',
  [ChainId.BSC]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.OKEX]: '',
  [ChainId.BSCTEST]: '',
  [ChainId.KLAYTN]: '',
  [ChainId.BASE]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.BASE_TESTNET]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.FANTOM]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.FANTOM_TESTNET]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.ZETA_CHAIN_TESTNET]: '',
  [ChainId.ZKSYNC_ERA]: '',
  [ChainId.ZKSYNC_ERA_TESTNET]: '',
  [ChainId.POLYGON_ZK_EVM]: '',
  [ChainId.POLYGON_ZK_EVM_TESTNET]: '',
  [ChainId.MOONBEAM]: '',
  [ChainId.MOONRIVER]: '',
  [ChainId.DOGECHAIN]: '',
  [ChainId.KAVA]: '',
  [ChainId.FUSION]: '',
  [ChainId.ARBITRUM]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.CELO]: '',
  [ChainId.AVALANCHE]: '',
  [ChainId.SEPOLIA]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.AUROEA]: '',
  [ChainId.HARMONY]: '',
  [ChainId.SCROLL_ALPHA]: '',
  [ChainId.PALM]: '',
  [ChainId.LINEA_GORLI]: '',
  [ChainId.LINEA]: '0x4A22bf1D03Fc72b15C59AD38E7e538037144e4A9',
  [ChainId.OMNI_TESTNET]: '',
  [ChainId.ROLLUX]: ''
}

export const MINTER_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.GÖRLI]: '',
  [ChainId.OPTIMISM]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.CRONOS]: '',
  [ChainId.BSC]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.OKEX]: '',
  [ChainId.BSCTEST]: '',
  [ChainId.KLAYTN]: '',
  [ChainId.BASE]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.BASE_TESTNET]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.FANTOM]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.FANTOM_TESTNET]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.ZETA_CHAIN_TESTNET]: '',
  [ChainId.ZKSYNC_ERA]: '',
  [ChainId.ZKSYNC_ERA_TESTNET]: '',
  [ChainId.POLYGON_ZK_EVM]: '',
  [ChainId.POLYGON_ZK_EVM_TESTNET]: '',
  [ChainId.MOONBEAM]: '',
  [ChainId.MOONRIVER]: '',
  [ChainId.DOGECHAIN]: '',
  [ChainId.KAVA]: '',
  [ChainId.FUSION]: '',
  [ChainId.ARBITRUM]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.CELO]: '',
  [ChainId.AVALANCHE]: '',
  [ChainId.SEPOLIA]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.AUROEA]: '',
  [ChainId.HARMONY]: '',
  [ChainId.SCROLL_ALPHA]: '',
  [ChainId.PALM]: '',
  [ChainId.LINEA_GORLI]: '',
  [ChainId.LINEA]: '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
  [ChainId.OMNI_TESTNET]: '',
  [ChainId.ROLLUX]: ''
}
export const TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.OPTIMISM]: '',
  [ChainId.CRONOS]: '',
  [ChainId.BSC]: '',
  [ChainId.OKEX]: '',
  [ChainId.BSCTEST]: '',
  [ChainId.KLAYTN]: '',
  [ChainId.GNOSIS]: '',
  [ChainId.POLYGON]: '',
  [ChainId.OMNI_TESTNET]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.ZETA_CHAIN_TESTNET]: '',
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
  [ChainId.SEPOLIA]: '0x6b2F9CDEbAdDa7778cD01a7519CAb375729512eF',
  [ChainId.AUROEA]: '',
  [ChainId.HARMONY]: '',
  [ChainId.BASE]: '',
  [ChainId.BASE_TESTNET]: '',
  [ChainId.SCROLL_ALPHA]: '',
  [ChainId.PALM]: '',
  [ChainId.LINEA]: '',
  [ChainId.LINEA_GORLI]: ''
}
