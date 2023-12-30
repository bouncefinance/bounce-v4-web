import { Box } from '@mui/material'
import BeforeOpenLottery from './beforeOpenLottery'
import AfterOpenLottery from './afterOpenLottery'
import useBreakpoint from 'hooks/useBreakpoint'
import BgImg from 'assets/imgs/nftLottery/banner/globalBg.png'
import { RandomSelectionNFTProps } from 'api/pool/type'
import { useGetRandomSelectionNFTPoolStatus } from 'bounceHooks/auction/useRandomSelectionNFTPoolInfo'
// import NftReward from 'pages/nftLottery/components/NftReward/NftReward'
import AuctionWinnerList from 'pages/nftLottery/components/winnerList/winnerList'
const PoolDetail = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  const allStatus = useGetRandomSelectionNFTPoolStatus(poolInfo)
  const { isWinnerSeedDone } = allStatus
  const isMd = useBreakpoint('md')

  return (
    <Box
      sx={{
        background: `url(${BgImg}) repeat`,
        padding: isMd ? '48px 0' : '120px 0'
      }}
    >
      {isWinnerSeedDone && allStatus.isUserJoined ? (
        <AfterOpenLottery allStatus={allStatus} poolInfo={poolInfo} />
      ) : (
        <BeforeOpenLottery poolInfo={poolInfo} allStatus={allStatus} />
      )}
      {allStatus.isWinnerSeedDone && (
        <>
          {/* <NftReward /> */}
          <AuctionWinnerList poolInfo={poolInfo} />
        </>
      )}
    </Box>
  )
}
export default PoolDetail
