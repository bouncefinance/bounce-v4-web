import { Box } from '@mui/material'
import UserPoolStatusBox from './poolStatus'
import LeftBox from '../creatorBlock/left'
import RightBox from './right'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'

const UserBlock = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  return (
    <Box
      sx={{
        width: '100%',
        background: '#121212',
        borderRadius: '24px',
        padding: '30px'
      }}
      mb={'40px'}
    >
      <UserPoolStatusBox
        status={poolInfo.status}
        currentTotal0={poolInfo.currencyAmountTotal0}
        hiddenStatus={poolInfo.participant.claimed}
        poolInfo={poolInfo}
      />
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
          <LeftBox />
        </Box>
        <Box
          sx={{
            flex: 474
          }}
        >
          <RightBox />
        </Box>
      </Box>
    </Box>
  )
}
export default UserBlock
