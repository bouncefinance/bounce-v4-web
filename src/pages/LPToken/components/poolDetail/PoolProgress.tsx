import { Avatar, AvatarGroup, LinearProgress, Stack, Typography, styled } from '@mui/material'
import { RandomPoolStatus, RandomSelectionLPProps } from 'api/pool/type'
// import { RandomPoolStatus, RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
import DefaultAvatar from 'assets/imgs/nftLottery/default-ava.svg'
import UserAvatar2 from 'assets/imgs/nftLottery/user-avatar2.png'
import UserAvatar3 from 'assets/imgs/nftLottery/user-avatar3.svg'
import UserAvatar4 from 'assets/imgs/nftLottery/user-avatar4.png'
import UserAvatar5 from 'assets/imgs/nftLottery/user-avatar5.png'

import useBreakpoint from 'hooks/useBreakpoint'
import { useMemo } from 'react'
const InterH3 = styled(Typography)`
  color: var(--yellow-d, var(--yellow-yellow-d, #959595));

  /* D/H6 */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;
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
  width: 24px;
  height: 24px;
  border-radius: 24px;
`

const AvatarList = ({ curPlayer }: { curPlayer: number }) => {
  const avatarList = [DefaultAvatar, UserAvatar2, UserAvatar3, UserAvatar4, UserAvatar5]
  const isSm = useBreakpoint('sm')
  const len = useMemo(() => {
    const list = avatarList.splice(0, curPlayer)
    if (isSm && list.length > 3) {
      return list.slice(0, 3).reverse()
    }
    return list.reverse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPlayer, isSm])

  return (
    <Stack sx={{ position: 'relative' }} flexDirection={'row'} alignItems={'center'}>
      <AvatarGroupStyle>
        {len.map((i, d) => (
          <AvatarStyle key={i + d} alt="DefaultAvatar" src={i} />
        ))}
      </AvatarGroupStyle>
      {len.length > 0 && '+'}
    </Stack>
  )
}

const PoolProgress = ({ poolInfo, poolStatus }: { poolInfo: RandomSelectionLPProps; poolStatus: RandomPoolStatus }) => {
  const isSm = useBreakpoint('sm')

  return (
    <Stack gap={8} mb={16}>
      <Stack
        flexDirection={isSm ? 'column' : 'row'}
        justifyContent={'space-between'}
        alignItems={isSm ? 'start' : 'center'}
        gap={isSm ? 8 : 0}
      >
        {/* <Title1>{allStatus.poolStatus === RandomPoolStatus.Upcoming ? 'Number of entries' : 'Participant'} </Title1> */}
        <InterH3 sx={{ fontSize: 12 }}>{'Number of entries'} </InterH3>

        <Stack flexDirection={'row'} alignItems={'center'} gap={11}>
          {poolStatus !== RandomPoolStatus.Upcoming && <AvatarList curPlayer={Number(poolInfo.curPlayer)} />}
        </Stack>
      </Stack>
      <LinearProgress
        sx={{
          '&.MuiLinearProgress-root': {
            height: 6,
            background: '#959595',
            borderRadius: 4
          },
          '& .MuiLinearProgress-bar': {
            background: '#B5E529',
            borderRadius: 4
          }
        }}
        color="success"
        variant="determinate"
        value={(Number(poolInfo.curPlayer) / Number(poolInfo.maxPlayere)) * 100}
      />
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <InterH3 sx={{ color: '#B5E529' }}>{poolInfo.curPlayer} </InterH3>
        <InterH3 sx={{ fontWeight: 400 }}>
          <span style={{ padding: '0 5px 0 10px', fontWeight: 500 }}>/</span>
          {poolInfo.maxPlayere}
        </InterH3>
      </Stack>
    </Stack>
  )
}

export default PoolProgress
