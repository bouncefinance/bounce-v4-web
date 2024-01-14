import { Avatar, AvatarGroup, LinearProgress, Stack, Typography, styled } from '@mui/material'
// import { RandomPoolStatus, RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
import DefaultAvatar from 'assets/imgs/nftLottery/default-ava.svg'
import UserAvatar2 from 'assets/imgs/nftLottery/user-avatar2.png'
import UserAvatar3 from 'assets/imgs/nftLottery/user-avatar3.svg'
import UserAvatar4 from 'assets/imgs/nftLottery/user-avatar4.png'
import UserAvatar5 from 'assets/imgs/nftLottery/user-avatar5.png'

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
const AvatarGroupStyle = styled(AvatarGroup)`
  &.MuiAvatarGroup-root {
    flex-direction: row;
  }
  & .MuiAvatar-root,
  & .MuiAvatar-root:last-child {
    margin-left: -15px;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    & .MuiAvatar-root {
      margin-left: -8px;
    }
    & .MuiAvatar-root:first-child {
      margin-left: 0px;
    }
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

const AvatarList = ({ curPlayer }: { curPlayer: number }) => {
  const avatarList = [DefaultAvatar, UserAvatar2, UserAvatar3, UserAvatar4, UserAvatar5]
  const isSm = useBreakpoint('sm')
  const len = useMemo(() => {
    const list = avatarList.splice(0, curPlayer)
    if (isSm && list.length > 3) {
      return list.slice(0, 3)
    }
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPlayer, isSm])

  return (
    <Stack sx={{ position: 'relative' }} flexDirection={'row'}>
      <AvatarGroupStyle>
        {len.map((i, d) => (
          <AvatarStyle key={i + d} alt="DefaultAvatar" src={i} />
        ))}
      </AvatarGroupStyle>
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
        {/* <Title1>{allStatus.poolStatus === RandomPoolStatus.Upcoming ? 'Number of entries' : 'Participant'} </Title1> */}
        <Title1>{'Number of entries'} </Title1>

        <Stack flexDirection={'row'} alignItems={'center'} gap={11}>
          {/* {allStatus.poolStatus !== RandomPoolStatus.Upcoming && <AvatarList curPlayer={Number(poolInfo.curPlayer)} />} */}
          {<AvatarList curPlayer={Number(5)} />}

          <Stack flexDirection={'row'} alignItems={'center'}>
            {/* <Title2>{poolInfo.curPlayer} </Title2> */}
            <Title2>{200} </Title2>

            <span style={{ padding: '0 5px 0 10px' }}>/</span>
            {/* <Title1>{poolInfo.maxPlayere}</Title1> */}
            <Title1>{2000}</Title1>
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
        // value={(Number(poolInfo.curPlayer) / Number(poolInfo.maxPlayere)) * 100}
        value={100}
      />
    </Stack>
  )
}

export default PoolProgress
