import {
  EnglishAuctionNFTPoolProp,
  FixedSwapNFTPoolProp,
  FixedSwapPoolProp,
  DutchAuctionPoolProp,
  Erc20EnglishAuctionPoolProp
} from 'api/pool/type'
import { ChainId } from 'constants/chain'

export interface Token {
  chainId: ChainId | number | undefined
  address: string
  decimals: number
  symbol?: string
  logoURI?: string
  name?: string
  dangerous?: boolean
}

export type PoolInfoProp =
  | FixedSwapPoolProp
  | FixedSwapNFTPoolProp
  | EnglishAuctionNFTPoolProp
  | DutchAuctionPoolProp
  | Erc20EnglishAuctionPoolProp
