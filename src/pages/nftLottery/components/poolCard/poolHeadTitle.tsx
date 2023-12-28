import { Box, Stack, styled, Typography } from '@mui/material'
import { RandomPoolStatus, RandomSelectionNFTResultProps } from 'api/pool/type'
import { ReactComponent as GreenCircleSvg } from 'assets/imgs/nftLottery/poolHead/green-circle.svg'
import { useMemo } from 'react'
const Container = styled(Box)`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`
const PoolTitleStyle = styled(Typography)`
  text-align: center;
  font-variant-numeric: lining-nums proportional-nums;

  /* AI/D/H2 */
  font-family: Cormorant SC;
  font-size: 100px;
  font-style: normal;
  font-weight: 500;
  line-height: 90%; /* 90px */
  text-transform: uppercase;
  &.live {
    color: #3d3a32;
  }
  &.wait {
    color: #696969;
  }
  &.close {
    color: #f00;
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 50px;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 28px;
  }
`

const UpcomingTitle = () => <PoolTitleStyle className="live">Join The Pool</PoolTitleStyle>
const NotInvolvedTitle = () => <PoolTitleStyle className="await">LOTTERY COMPLETED</PoolTitleStyle>
const LiveTitle = () => (
  <div style={{ height: 90 }}>
    <PoolTitleStyle className="live">Join The Pool</PoolTitleStyle>
    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={10} mt={20}>
      <GreenCircleSvg />
      <PoolTitleStyle sx={{ fontWeight: 700, fontSize: { sm: 16, xs: 18 }, color: '#76BA1E' }}>LIVE NOW</PoolTitleStyle>
    </Stack>
  </div>
)

const WaitTitle = () => (
  <PoolTitleStyle className="await" mb={-64}>
    Waiting for the <br /> lottery draw...
  </PoolTitleStyle>
)

const WinnerTitle = () => <PoolTitleStyle className="close">You are a Winner</PoolTitleStyle>

const NotWinnerTitle = () => <PoolTitleStyle className="close">Sorry! You are not selected as a winner</PoolTitleStyle>

export const PoolHeadTitle = ({
  allStatus,
  isZoom,
  allNotInvolved
}: {
  allStatus: RandomSelectionNFTResultProps
  isZoom?: boolean
  allNotInvolved?: boolean
}) => {
  const { poolStatus, isUserJoined, isUserWinner, isWinnerSeedDone } = allStatus

  const curTitle = useMemo(() => {
    if (poolStatus === RandomPoolStatus.Upcoming || isZoom) {
      return <UpcomingTitle />
    }
    if (poolStatus === RandomPoolStatus.Live) {
      return <LiveTitle />
    }
    if (poolStatus === RandomPoolStatus.Waiting && (isUserJoined || allNotInvolved)) {
      return <WaitTitle />
    }
    if (poolStatus === RandomPoolStatus.Waiting && !isUserJoined) {
      return <NotInvolvedTitle />
    }
    if (isWinnerSeedDone || poolStatus === RandomPoolStatus.Closed) {
      if (isUserWinner) {
        return <WinnerTitle />
      }
      if (!isUserWinner) {
        return <NotWinnerTitle />
      }
    }

    return <></>
  }, [allNotInvolved, isUserJoined, isUserWinner, isWinnerSeedDone, isZoom, poolStatus])
  return <Container>{curTitle}</Container>
}
