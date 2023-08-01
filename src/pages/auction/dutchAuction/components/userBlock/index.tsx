import { Box } from '@mui/material'
import UserPoolStatusBox from './poolStatus'
import { DutchAuctionPoolProp, PoolStatus } from 'api/pool/type'
import OneTime from './oneTime/index'
import Linear from './linear/index'
import Fragment from './fragment/index'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { useMemo } from 'react'
import { useIsMDDown } from 'themes/useTheme'
const UserBlock = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  const isUserClaimed = useMemo(() => {
    return (
      poolInfo.status === PoolStatus.Closed && Number(poolInfo.participant.currencyCurClaimableAmount?.toExact()) <= 0
    )
  }, [poolInfo.participant.currencyCurClaimableAmount, poolInfo.status])
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
      <UserPoolStatusBox status={poolInfo.status} hiddenStatus={isUserClaimed} poolInfo={poolInfo} />
      {poolInfo.releaseType === IReleaseType.Cliff && <OneTime poolInfo={poolInfo} />}
      {poolInfo.releaseType === IReleaseType.Linear && <Linear poolInfo={poolInfo} />}
      {poolInfo.releaseType === IReleaseType.Fragment && <Fragment poolInfo={poolInfo} />}
    </Box>
  )
}
export default UserBlock
