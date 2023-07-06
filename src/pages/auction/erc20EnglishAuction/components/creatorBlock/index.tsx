import { Box } from '@mui/material'
import CreatorPoolStatusBox from '../../../dutchAuction/components/creatorBlock/poolStatus'
import LeftBox from './left'
import RightBox from './right'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'

const CreatorBlock = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
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
      <CreatorPoolStatusBox
        status={poolInfo.status}
        currentTotal0={poolInfo.currentTotal0}
        hiddenStatus={poolInfo.participant.claimed}
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
export default CreatorBlock
