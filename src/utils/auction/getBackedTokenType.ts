import { PoolType } from 'api/pool/type'
import { BackedTokenType } from 'pages/account/MyTokenOrNFT'

export default function getBackedTokenType(category: PoolType) {
  if ([PoolType.ENGLISH_AUCTION_NFT, PoolType.fixedSwapNft, PoolType.MUTANT_ENGLISH_AUCTION_NFT].includes(category)) {
    return BackedTokenType.NFT
  }
  return BackedTokenType.TOKEN
}
