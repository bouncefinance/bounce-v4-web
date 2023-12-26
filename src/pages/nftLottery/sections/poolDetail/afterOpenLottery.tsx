import WinnerResultCard from '../../components/winnerResultCard'
import NftReward from '../../components/NftReward/NftReward'
import AuctionWinnerList from 'pages/nftLottery/components/winnerList/winnerList'
import { RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
interface IProps {
  allStatus: RandomSelectionNFTResultProps
  poolInfo: RandomSelectionNFTProps
}

const AfterOpenLottery = ({ allStatus, poolInfo }: IProps) => {
  return (
    <div>
      <WinnerResultCard allStatus={allStatus} poolInfo={poolInfo} />
      <NftReward />
      <AuctionWinnerList />
    </div>
  )
}
export default AfterOpenLottery
