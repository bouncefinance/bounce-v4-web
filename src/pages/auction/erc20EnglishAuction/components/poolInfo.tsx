import { Avatar, Box, Typography, styled } from '@mui/material'
import DefaultAvatarSVG from 'assets/imgs/profile/yellow_avatar.svg'
import Collect from './collect'
import { useEffect, useState } from 'react'
import { useErc20EnglishAuctionPoolInfo } from '../ValuesProvider'
import { ChainListMap } from 'constants/chain'
import { USER_TYPE } from 'api/user/type'
import { getUserInfo } from 'api/user'
import { getCompanyInfo } from 'api/company'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { shortenAddress } from 'utils'
import { SocialLink } from 'pages/auction/dutchAuction/components/creatorInfoCard'
const ChainType = styled(Box)(() => ({
  height: '32px',
  lineHeight: '32px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
  background: '#20201E',
  backdropFilter: 'blur(5px)',
  borderRadius: '100px',
  padding: '0 14px',
  '.img': {
    width: '20px',
    height: '20px',
    marginRight: '10px'
  },
  '.text': {
    fontFamily: `'Public Sans'`,
    fontWeight: 600,
    fontSize: '14px',
    textAlign: 'center',
    letterSpacing: '-0.02em',
    color: '#FFFFFF'
  }
}))
export enum CollectStatus {
  'collect' = 1,
  'discontent' = 2,
  'inital' = 3
}

const PoolInfo = () => {
  const [userInfo, setUserInfo] = useState<any>(null)
  const navigate = useNavigate()
  const { data: poolInfo } = useErc20EnglishAuctionPoolInfo()
  const [collectStatus, setCollectStatus] = useState<CollectStatus>(CollectStatus.inital)
  const handleCollectChange = (status: CollectStatus) => {
    setCollectStatus(status)
  }
  useEffect(() => {
    const getInfo = async () => {
      const res =
        poolInfo?.creatorUserInfo?.userType === USER_TYPE.USER
          ? await getUserInfo({ userId: poolInfo.creatorUserInfo?.userId })
          : await getCompanyInfo({ userId: poolInfo?.creatorUserInfo?.userId })
      setUserInfo(res.data)
    }
    if (poolInfo?.creatorUserInfo) {
      getInfo()
    }
  }, [poolInfo?.creatorUserInfo])

  const handleUser = () => {
    if (userInfo?.userType === USER_TYPE.USER) {
      return navigate(`${routes.profile.summary}?id=${userInfo?.id}`)
    }
    return navigate(`${routes.profile.summary}?id=${userInfo?.companyId}`)
  }
  if (!poolInfo) return <></>

  return (
    <Box
      sx={{
        width: '280px',
        background: 'rgba(18, 18, 18, 0.6)',
        backdropFilter: 'blur(5px)',
        borderRadius: '20px',
        padding: '20px 24px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        mb={'12px'}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: '14px',
            color: '#E1F25C'
          }}
        >
          #{poolInfo?.id}
        </Typography>
        <ChainType>
          <img className="img" src={ChainListMap[poolInfo?.ethChainId || 1]?.logo} alt="" srcSet="" />
          <Typography className="text">{ChainListMap[poolInfo?.ethChainId || 1]?.name}</Typography>
        </ChainType>
      </Box>
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: '20px',
          color: '#fff'
        }}
        mb={'12px'}
      >
        {poolInfo?.name || '--'}
      </Typography>
      <Collect collectStatus={collectStatus} setCollectStatus={handleCollectChange} />
      <Box
        sx={{
          width: '100%',
          height: '0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          margin: '30px 0'
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
        mb={'24px'}
      >
        <Avatar
          sx={{ width: 48, height: 48, cursor: 'pointer', borderRadius: '8px', marginRight: '12px' }}
          src={userInfo?.avatar?.fileUrl || DefaultAvatarSVG}
          onClick={handleUser}
        />
        <Typography
          sx={{
            flex: 1,
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: '20px',
            color: '#E1F25C',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {userInfo?.fullName || userInfo?.companyName || shortenAddress(poolInfo?.creator || '')}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: `'Inter'`,
          fontWeight: 400,
          fontSize: '14px',
          color: '#626262',
          marginBottom: '28px'
        }}
      >
        {userInfo?.description || userInfo?.briefIntro || 'No description yet'}
      </Typography>
      <SocialLink
        twitter={userInfo?.twitter}
        instagram={userInfo?.instagram}
        website={userInfo?.website}
        linkedin={userInfo?.linkedin}
        github={userInfo?.github}
      />
    </Box>
  )
}
export default PoolInfo
