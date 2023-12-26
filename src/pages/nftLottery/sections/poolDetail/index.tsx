import { Box } from '@mui/material'
import BeforeOpenLottery from './beforeOpenLottery'
import AfterOpenLottery from './afterOpenLottery'
import useBreakpoint from 'hooks/useBreakpoint'
import BgImg from 'assets/imgs/nftLottery/banner/globalBg.png'
import { RandomSelectionNFTProps } from 'api/pool/type'
import { useGetRandomSelectionNFTPoolStatus } from 'bounceHooks/auction/useRandomSelectionNFTPoolInfo'
const PoolDetail = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  const { isWinnerSeedDone } = useGetRandomSelectionNFTPoolStatus(poolInfo)
  const isMd = useBreakpoint('md')
  return (
    <Box
      sx={{
        background: `url(${BgImg}) repeat`,
        padding: isMd ? '48px 0' : '20px 0'
      }}
    >
      {isWinnerSeedDone ? <AfterOpenLottery /> : <BeforeOpenLottery poolInfo={poolInfo} />}
    </Box>
  )
}
export default PoolDetail
