import { Avatar, AvatarGroup, LinearProgress, Stack, Typography, styled } from '@mui/material'
import DefaultAvatar from 'assets/imgs/nftLottery/default-ava.svg'
import useBreakpoint from 'hooks/useBreakpoint'
import { useMemo } from 'react'
const Title1 = styled(Typography)`
  color: #474543;
  /* D/H4 */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.4px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 16px;
  }
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
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 20px;
  }
`
const AvatarStyle = styled(Avatar)`
  width: 54px;
  height: 54px;
  border-radius: 54px;
  border: 2.25px solid #fff;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 30px;
    height: 30px;
  }
`
const AvatarList = () => {
  const isSm = useBreakpoint('sm')
  const len = useMemo(() => {
    if (isSm) {
      return [1, 1, 1]
    }
    return [1, 1, 1, 1, 1]
  }, [isSm])

  return (
    <Stack sx={{ position: 'relative' }} flexDirection={'row'}>
      <AvatarGroup>
        {len.map((i, d) => (
          <AvatarStyle key={i + d} alt="DefaultAvatar" src={DefaultAvatar} />
        ))}
      </AvatarGroup>
    </Stack>
  )
}

const PoolProgress = () => {
  const isSm = useBreakpoint('sm')
  return (
    <Stack gap={isSm ? 16 : 20}>
      <Stack
        flexDirection={isSm ? 'column' : 'row'}
        justifyContent={'space-between'}
        alignItems={isSm ? 'start' : 'center'}
        gap={isSm ? 8 : 0}
      >
        <Title1>Participant</Title1>
        <Stack flexDirection={'row'} alignItems={'center'} gap={11}>
          <AvatarList />
          <Stack flexDirection={'row'} alignItems={'center'}>
            <Title2>2050 </Title2>
            <Title1>{` `}/ 20,000</Title1>
          </Stack>
        </Stack>
      </Stack>
      <LinearProgress
        sx={{
          '&.MuiLinearProgress-root': {
            height: 8,
            background: '#D9D9D9'
          },
          '& .MuiLinearProgress-bar': {
            background: '#76BA1E'
          }
        }}
        color="success"
        variant="determinate"
        value={(2050 / 20000) * 100}
      />
    </Stack>
  )
}

export default PoolProgress
