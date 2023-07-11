import { Box } from '@mui/material'
import LeftBox from '../../creatorBlock/left'
import RightBox from '../right'
import { DutchAuctionPoolProp } from 'api/pool/type'

const UserBlock = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '30px'
      }}
      gap={'30px'}
    >
      <Box
        sx={{
          flex: 400
        }}
      >
        <LeftBox poolInfo={poolInfo} />
      </Box>
      <Box
        sx={{
          flex: 474
        }}
      >
        <RightBox poolInfo={poolInfo} />
      </Box>
    </Box>
  )
}
export default UserBlock
