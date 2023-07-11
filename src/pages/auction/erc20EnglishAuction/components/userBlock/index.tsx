import { Box } from '@mui/material'
import UserPoolStatusBox from './poolStatus'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import OneTime from './oneTime'
import Linear from './linear'
import Fragment from './fragment'

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
      {poolInfo.releaseType === IReleaseType.Cliff && <OneTime />}
      {poolInfo.releaseType === IReleaseType.Linear && <Linear />}
      {poolInfo.releaseType === IReleaseType.Fragment && <Fragment poolInfo={poolInfo} />}
    </Box>
  )
}
export default UserBlock
