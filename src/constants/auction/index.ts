import { AuctionType } from 'bounceComponents/create-auction-pool/types'
import { Token } from 'bounceComponents/fixed-swap/type'
import { ChainId } from 'constants/chain'

export const AUCTION_TYPES: string[] = Object.values(AuctionType)

export const isSupportedAuctionType = (auctionType: string | undefined | null): boolean => {
  return !!auctionType && AUCTION_TYPES.includes(auctionType)
}

export const GOERLI_TOKEN_LIST: Token[] = [
  {
    chainId: ChainId.GÖRLI,
    name: 'Wrapped Ether',
    address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    symbol: 'WETH',
    decimals: 18,
    // logoURI:
    //   'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc778417E063141139Fce010982780140Aa0cD5Ab/logo.png',
    logoURI: ''
  },
  {
    chainId: ChainId.GÖRLI,
    address: '0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49',
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    // logoURI: 'https://ethereum-optimism.github.io/data/USDT/logo.png',
    logoURI: ''
  },
  {
    chainId: ChainId.GÖRLI,
    address: '0x0A6318AB6B0C414679c0eB6a97035f4a3ef98606',
    name: 'Bounce Token',
    symbol: 'AUCTION',
    decimals: 18,
    logoURI: ''
  },
  {
    chainId: ChainId.GÖRLI,
    address: '0x53C0475aa628D9C8C5724A2eb8B5Fd81c32a9267',
    name: 'tty',
    symbol: 'TTY',
    decimals: 18,
    logoURI: ''
  }
]

export const TOKEN_LIST_API: Record<ChainId, string | null> = {
  [ChainId.MAINNET]: 'https://tokens.coingecko.com/uniswap/all.json',
  [ChainId.GÖRLI]: null,
  [ChainId.OPTIMISM]: null,
  [ChainId.CRONOS]: null,
  [ChainId.BSC]: 'https://tokens.pancakeswap.finance/cmc.json',
  [ChainId.OKEX]: null,
  [ChainId.BSCTEST]: null,
  [ChainId.KLAYTN]: null,
  [ChainId.GNOSIS]: null,
  [ChainId.POLYGON]: null,
  [ChainId.FANTOM]: null,
  [ChainId.ZKSYNC_ERA]: null,
  [ChainId.ZKSYNC_ERA_TESTNET]: null,
  [ChainId.POLYGON_ZK_EVM]: null,
  [ChainId.POLYGON_ZK_EVM_TESTNET]: null,
  [ChainId.MOONBEAM]: null,
  [ChainId.MOONRIVER]: null,
  [ChainId.DOGECHAIN]: null,
  [ChainId.KAVA]: null,
  [ChainId.FUSION]: null,
  [ChainId.ARBITRUM]: null,
  [ChainId.CELO]: null,
  [ChainId.AVALANCHE]: null,
  [ChainId.SEPOLIA]: null,
  [ChainId.AUROEA]: null,
  [ChainId.HARMONY]: null,
  [ChainId.PALM]: null
}
