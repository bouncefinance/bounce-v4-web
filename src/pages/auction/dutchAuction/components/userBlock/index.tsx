import { Box } from '@mui/material'
import UserPoolStatusBox from './poolStatus'
import { DutchAuctionPoolProp } from 'api/pool/type'
import OneTime from './oneTime/index'
import Linear from './linear/index'
import Fragment from './fragment/index'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { useMemo } from 'react'
const UserBlock = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const isUserClaimed = useMemo(() => {
    return Number(poolInfo.participant.currencyCurClaimableAmount?.toExact()) <= 0
  }, [poolInfo.participant.currencyCurClaimableAmount])
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
      <UserPoolStatusBox status={poolInfo.status} hiddenStatus={isUserClaimed} poolInfo={poolInfo} />
      {poolInfo.releaseType === IReleaseType.Cliff && <OneTime poolInfo={poolInfo} />}
      {poolInfo.releaseType === IReleaseType.Linear && <Linear poolInfo={poolInfo} />}
      {poolInfo.releaseType === IReleaseType.Fragment && <Fragment poolInfo={poolInfo} />}
    </Box>
  )
}
export default UserBlock
