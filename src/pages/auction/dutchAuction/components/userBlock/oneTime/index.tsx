import { Box } from '@mui/material'
import LeftBox from '../../creatorBlock/left'
import RightBox from '../right'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { useIsMDDown } from 'themes/useTheme'
const UserBlock = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: isMd ? 'column nowrap' : 'row nowrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '30px'
      }}
      gap={'30px'}
    >
      <Box
        sx={{
          width: isMd ? '100%' : 'unset',
          flex: isMd ? 'unset' : 400
        }}
      >
        <LeftBox poolInfo={poolInfo} />
      </Box>
      <Box
        sx={{
          width: isMd ? '100%' : 'unset',
          flex: isMd ? 'unset' : 474
        }}
      >
        <RightBox poolInfo={poolInfo} />
      </Box>
    </Box>
  )
}
export default UserBlock
