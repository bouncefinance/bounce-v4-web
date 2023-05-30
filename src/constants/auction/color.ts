import { PoolStatus } from 'api/pool/type'

export const AuctionProgressPrimaryColor: Record<PoolStatus, string> = {
  [PoolStatus.Upcoming]: '#171717',
  [PoolStatus.Live]: '#2DAB50',
  [PoolStatus.Closed]: '#2663FF',
  [PoolStatus.Finish]: '#2663FF',
  [PoolStatus.Cancelled]: '#2663FF'
}
