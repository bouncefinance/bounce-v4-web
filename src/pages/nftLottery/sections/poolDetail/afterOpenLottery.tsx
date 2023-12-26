import WinnerResultCard from '../../components/winnerResultCard'
import NftReward from '../../components/NftReward/NftReward'
import AuctionWinnerList from 'pages/nftLottery/components/winnerList/winnerList'
import { RandomSelectionNFTProps } from 'api/pool/type'
const AfterOpenLottery = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  return (
    <div>
      <WinnerResultCard poolInfo={poolInfo} />
      <NftReward />
      <AuctionWinnerList />
    </div>
  )
}
export default AfterOpenLottery
