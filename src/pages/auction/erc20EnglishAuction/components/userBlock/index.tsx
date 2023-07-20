import { Box } from '@mui/material'
import UserPoolStatusBox from './poolStatus'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import OneTime from './oneTime'
import Instant from './instant'
import Linear from './linear'
import Fragment from './fragment'
import { useMemo } from 'react'

const UserBlock = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isUserClaimed = useMemo(() => {
    return poolInfo.status === PoolStatus.Closed && !poolInfo.participant?.currencyCurClaimableAmount?.greaterThan('0')
  }, [poolInfo.participant.currencyCurClaimableAmount, poolInfo.status])
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
      {poolInfo.releaseType === IReleaseType.Instant && <Instant />}
      {poolInfo.releaseType === IReleaseType.Cliff && <OneTime />}
      {poolInfo.releaseType === IReleaseType.Linear && <Linear />}
      {poolInfo.releaseType === IReleaseType.Fragment && <Fragment poolInfo={poolInfo} />}
    </Box>
  )
}
export default UserBlock
