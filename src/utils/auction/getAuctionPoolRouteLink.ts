import { PoolType } from 'api/pool/type'
import { defaultPoolVersionRoute } from '../../constants'
import { routes } from 'constants/routes'
import store from 'state'
import { getLabelById } from 'utils'

export default function getAuctionPoolLink(
  sysId: number | string | undefined,
  category: PoolType,
  backedChainId: number,
  poolId: string | number
) {
  const chainInfoOpt = store.getState().configOptions.optionDatas.chainInfoOpt || []
  if (defaultPoolVersionRoute === 1 || !sysId) {
    const route =
      category === PoolType.Lottery
        ? routes.auction.randomSelection
        : category === PoolType.fixedSwapNft
        ? routes.auction.fixedSwapNft
        : category === PoolType.ENGLISH_AUCTION_NFT
        ? routes.auction.englishAuction
        : category === PoolType.DUTCH_AUCTION
        ? routes.auction.dutchAuction
        : category === PoolType.ENGLISH_AUCTION
        ? routes.auction.erc20EnglishAuction
        : routes.auction.fixedPrice
    return route
      .replace(':chainShortName', getLabelById(backedChainId, 'shortName', chainInfoOpt))
      .replace(':poolId', poolId + '')
  }
  const route =
    category === PoolType.Lottery
      ? routes.auction.v2.randomSelection
      : category === PoolType.fixedSwapNft
      ? routes.auction.v2.fixedSwapNft
      : category === PoolType.ENGLISH_AUCTION_NFT
      ? routes.auction.v2.englishAuction
      : category === PoolType.DUTCH_AUCTION
      ? routes.auction.v2.dutchAuction
      : category === PoolType.ENGLISH_AUCTION
      ? routes.auction.v2.erc20EnglishAuction
      : routes.auction.v2.fixedPrice
  return route.replace(':sysId', sysId.toString())
}
