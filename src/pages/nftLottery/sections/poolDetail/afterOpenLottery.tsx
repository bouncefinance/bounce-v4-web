import WinnerResultCard from '../../components/winnerResultCard'
import NftReward from '../../components/NftReward/NftReward'
import AuctionWinnerList from 'pages/nftLottery/components/winnerList/winnerList'
const AfterOpenLottery = () => {
  return (
    <div>
      <WinnerResultCard />
      <NftReward />
      <AuctionWinnerList />
    </div>
  )
}
export default AfterOpenLottery
