import { Box, LinearProgress, Stack, Typography, styled } from '@mui/material'
import { ReactComponent as DefaultAvatar } from 'assets/imgs/nftLottery/default-ava.svg'
const Title1 = styled(Typography)`
  color: #474543;
  /* D/H4 */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.4px;
`
const Title2 = styled(Typography)`
  color: #76ba1e;
  leading-trim: both;
  text-edge: cap;
  font-variant-numeric: lining-nums proportional-nums;

  /* D/H3 */
  font-family: Inter;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 36.4px */
  letter-spacing: -0.56px;
  text-transform: capitalize;
`
const AvatarStyle = styled(Box)`
  position: absolute;
  width: 54px;
  height: 54px;
  border-radius: 54px;
  border: 2.25px solid #fff;
  &.offset {
    left: -10px;
  }
`
const AvatarList = () => {
  const len = [1, 1, 1, 1, 1]
  return (
    <Stack sx={{ position: 'relative' }} flexDirection={'row'}>
      {len.map(i => (
        <AvatarStyle key={i} className={i > 0 ? 'offset' : ''}>
          <DefaultAvatar />
        </AvatarStyle>
      ))}
    </Stack>
  )
}

const PoolProgress = () => {
  const player = 2000
  return (
    <Stack gap={20}>
      <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Title1>Participant</Title1>
        <Stack flexDirection={'row'} alignItems={'center'} gap={11}>
          <AvatarList />
          <Stack flexDirection={'row'} alignItems={'center'}>
            <Title2>{player}</Title2>
            <Title1>/ 20,000</Title1>
          </Stack>
        </Stack>
      </Stack>
      <LinearProgress variant="determinate" value={player} />
    </Stack>
  )
}

export default PoolProgress
