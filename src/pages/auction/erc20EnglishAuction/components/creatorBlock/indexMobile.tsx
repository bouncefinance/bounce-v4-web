import { Box } from '@mui/material'
import LeftBox from './left'
import RightBox from './right'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import CreatorPoolStatusBox from './poolStatus'
import { useIsMDDown } from 'themes/useTheme'
const CreatorBlock = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  return (
    <Box
      sx={{
        width: '100%',
        background: '#121212',
        borderRadius: '24px',
        padding: isMd ? '60px 16px' : '30px'
      }}
      mb={'40px'}
    >
      <CreatorPoolStatusBox poolInfo={poolInfo} status={poolInfo.status} hiddenStatus={poolInfo.participant.claimed} />
      <Box
        sx={{
          width: '100%'
        }}
      >
        <LeftBox />
      </Box>
      <Box
        sx={{
          width: '100%',
          marginTop: '40px'
        }}
      >
        <RightBox />
      </Box>
    </Box>
  )
}
export default CreatorBlock
