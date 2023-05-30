import { PoolType } from 'api/pool/type'
import { routes } from 'constants/routes'
import store from 'state'
import { getLabelById } from 'utils'

export default function getAuctionPoolLink(category: PoolType, backedChainId: number, poolId: string | number) {
  const chainInfoOpt = store.getState().configOptions.optionDatas.chainInfoOpt || []

  const route =
    category === PoolType.Lottery
      ? routes.auction.randomSelection
      : category === PoolType.fixedSwapNft
      ? routes.auction.fixedSwapNft
      : category === PoolType.ENGLISH_AUCTION_NFT
      ? routes.auction.englishAuction
      : routes.auction.fixedPrice
  return route
    .replace(':chainShortName', getLabelById(backedChainId, 'shortName', chainInfoOpt))
    .replace(':poolId', poolId + '')
}
