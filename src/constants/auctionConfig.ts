import { AuctionType, TokenType } from '../bounceComponents/create-auction-pool/types'
import { ChainId } from './chain'

export const AuctionConfig: {
  [chainId in ChainId]: {
    [tokenType in TokenType]?: AuctionType[]
  }
} = {
  [ChainId.MAINNET]: {
    [TokenType.ERC20]: [
      AuctionType.FIXED_PRICE,
      AuctionType.RANDOM_SELECTION,
      AuctionType.DUTCH_AUCTION,
      AuctionType.ENGLISH_AUCTION
    ],
    [TokenType.ERC721]: [AuctionType.ENGLISH_AUCTION, AuctionType.MUTANT_ENGLISH]
    // [TokenType.ERC1155]: []
  },
  [ChainId.GÖRLI]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.OPTIMISM]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE, AuctionType.DUTCH_AUCTION, AuctionType.ENGLISH_AUCTION]
  },
  [ChainId.CRONOS]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.LINEA_GORLI]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.LINEA]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE, AuctionType.DUTCH_AUCTION],
    [TokenType.ERC721]: [AuctionType.ENGLISH_AUCTION],
    [TokenType.ERC1155]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.BSC]: {
    [TokenType.ERC20]: [
      AuctionType.FIXED_PRICE,
      AuctionType.RANDOM_SELECTION,
      AuctionType.DUTCH_AUCTION,
      AuctionType.ENGLISH_AUCTION
    ],
    [TokenType.ERC721]: [AuctionType.ENGLISH_AUCTION],
    [TokenType.ERC1155]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.OKEX]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.BSCTEST]: {},
  [ChainId.OMNI_TESTNET]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.ROLLUX]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE],
    [TokenType.ERC1155]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.GNOSIS]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.POLYGON]: {
    [TokenType.ERC20]: [
      AuctionType.FIXED_PRICE,
      AuctionType.RANDOM_SELECTION,
      AuctionType.DUTCH_AUCTION,
      AuctionType.ENGLISH_AUCTION
    ],
    [TokenType.ERC721]: [AuctionType.ENGLISH_AUCTION]
  },
  [ChainId.FANTOM]: {
    [TokenType.ERC20]: [
      AuctionType.FIXED_PRICE,
      AuctionType.RANDOM_SELECTION,
      AuctionType.DUTCH_AUCTION,
      AuctionType.ENGLISH_AUCTION
    ]
  },
  [ChainId.FANTOM_TESTNET]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE, AuctionType.DUTCH_AUCTION]
  },
  [ChainId.ZETA_CHAIN_TESTNET]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.ZKSYNC_ERA_TESTNET]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.ZKSYNC_ERA]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE, AuctionType.ENGLISH_AUCTION],
    [TokenType.ERC1155]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.POLYGON_ZK_EVM]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.POLYGON_ZK_EVM_TESTNET]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.MOONBEAM]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.MOONRIVER]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.DOGECHAIN]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.KAVA]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.KLAYTN]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.BASE]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE, AuctionType.ENGLISH_AUCTION, AuctionType.DUTCH_AUCTION],
    [TokenType.ERC1155]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.BASE_TESTNET]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE, AuctionType.ENGLISH_AUCTION, AuctionType.DUTCH_AUCTION],
    [TokenType.ERC1155]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.FUSION]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.ARBITRUM]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE, AuctionType.DUTCH_AUCTION, AuctionType.ENGLISH_AUCTION]
  },
  [ChainId.CELO]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.AVALANCHE]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE, AuctionType.RANDOM_SELECTION]
  },
  [ChainId.SEPOLIA]: {
    [TokenType.ERC20]: [
      AuctionType.FIXED_PRICE,
      AuctionType.ENGLISH_AUCTION,
      AuctionType.RANDOM_SELECTION,
      AuctionType.DUTCH_AUCTION
    ],
    [TokenType.ERC721]: [AuctionType.ENGLISH_AUCTION, AuctionType.MUTANT_ENGLISH],
    [TokenType.ERC1155]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.AUROEA]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.HARMONY]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.PALM]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  },
  [ChainId.SCROLL_ALPHA]: {
    [TokenType.ERC20]: [AuctionType.FIXED_PRICE]
  }
}
