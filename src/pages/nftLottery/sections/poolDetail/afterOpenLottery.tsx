import WinnerResultCard from '../../components/winnerResultCard'
import { RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
interface IProps {
  allStatus: RandomSelectionNFTResultProps
  poolInfo: RandomSelectionNFTProps
}

const AfterOpenLottery = ({ allStatus, poolInfo }: IProps) => {
  return <WinnerResultCard allStatus={allStatus} poolInfo={poolInfo} />
}
export default AfterOpenLottery
