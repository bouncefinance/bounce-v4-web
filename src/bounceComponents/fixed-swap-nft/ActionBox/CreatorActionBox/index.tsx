import { Box, Typography } from '@mui/material'

import UpcomingPoolCreatorAlert from '../../Alerts/UpcomingPoolCreatorAlert'
import LivePoolCreatorAlert from '../../Alerts/LivePoolCreatorAlert'
import SuspiciousTips from '../SuspiciousStatisTip'
import FundInfoList from './FundInfoList'
import ButtonBlock from './ButtonBlock'
import { FixedSwapNFTPoolProp, PoolStatus } from 'api/pool/type'
import useNftGoApi from 'bounceHooks/auction/useNftInfoByNftGo'
import SuccessfullyClaimedAlert from 'bounceComponents/fixed-swap/Alerts/SuccessfullyClaimedAlert'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'

const CreatorActionBox = ({ poolInfo }: { poolInfo: FixedSwapNFTPoolProp }): JSX.Element => {
  const nftGoInfo = useNftGoApi(poolInfo.contract, poolInfo.tokenId)

  return (
    <Box sx={{ flex: 1, pt: 28 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2">My Pool</Typography>
        <PoolStatusBox
          showCreatorClaim={!poolInfo.creatorClaimed}
          status={poolInfo.status}
          claimAt={poolInfo.claimAt}
          openTime={poolInfo.openAt}
          closeTime={poolInfo.closeAt}
        />
      </Box>

      <FundInfoList poolInfo={poolInfo} />

      {poolInfo.contract && <ButtonBlock poolInfo={poolInfo} />}

      {poolInfo.status === PoolStatus.Upcoming && <UpcomingPoolCreatorAlert />}
      {poolInfo.status === PoolStatus.Live && <LivePoolCreatorAlert />}
      {(poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled) &&
        poolInfo.creatorClaimed && <SuccessfullyClaimedAlert />}
      {!!nftGoInfo?.data?.suspicious && <SuspiciousTips />}
    </Box>
  )
}

export default CreatorActionBox
