import { Avatar, Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getCompanyInfo } from 'api/company'
import { getUserInfo } from 'api/user'
import { USER_TYPE } from 'api/user/type'
// import DefaultAvatarSVG from 'assets/imgs/profile/yellow_avatar.svg'
import { CreatorUserInfo } from 'api/pool/type'
// import { ReactComponent as TwitterSVG } from 'assets/imgs/auction/twitter.svg'
// import { ReactComponent as InstagramSVG } from 'assets/imgs/auction/instagram.svg'
// import { ReactComponent as WebsiteSVG } from 'assets/imgs/auction/website.svg'
// import { ReactComponent as LinkedinSVG } from 'assets/imgs/auction/linkedin.svg'
// import { ReactComponent as GithubSVG } from 'assets/imgs/auction/github.svg'
// import { ReactComponent as EmailSVG } from 'assets/imgs/auction/email.svg'
import Tooltip from 'bounceComponents/common/Tooltip'
import VerifiedIcon from 'bounceComponents/common/VerifiedIcon'
import { useUserInfo } from 'state/users/hooks'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import DefaultAvatarSVG from 'assets/imgs/profile/yellow_avatar.svg'
import { useActiveWeb3React } from 'hooks'
import { PoolInfoProp } from '../type'
import AuctionDescription from 'bounceComponents/fixed-swap/CreatorInfoCard/AuctionDescription'
import AuctionFiles from 'bounceComponents/fixed-swap/CreatorInfoCard/AuctionFiles'
import SocialMediaButtonGroup from 'bounceComponents/fixed-swap/CreatorInfoCard/SocialMediaButtonGroup'
import useBreakpoint from '../../../hooks/useBreakpoint'

interface ICreatorInfoCardProps {
  creatorUserInfo: CreatorUserInfo
  creator: string
  poolInfo: PoolInfoProp
  getPoolInfo: () => void
}

const CreatorInfoCard: React.FC<ICreatorInfoCardProps> = ({ poolInfo, getPoolInfo, creator, creatorUserInfo }) => {
  const { token } = useUserInfo()
  const navigate = useNavigate()
  const { account } = useActiveWeb3React()
  const isMobile = useBreakpoint('lg')

  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    const getInfo = async () => {
      const res =
        creatorUserInfo?.userType === USER_TYPE.USER
          ? await getUserInfo({ userId: creatorUserInfo?.userId })
          : await getCompanyInfo({ userId: creatorUserInfo?.userId })
      setUserInfo(res.data)
    }
    if (creatorUserInfo) {
      getInfo()
    }
  }, [creatorUserInfo])

  const isCurrentUserCreatedThisPool = creator.toLowerCase() === account?.toLowerCase()

  const handleUser = () => {
    if (userInfo?.userType === USER_TYPE.USER) {
      return navigate(`${routes.profile.summary}?id=${userInfo?.id}`)
    }
    return navigate(`${routes.profile.summary}?id=${userInfo?.companyId}`)
  }

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: 20,
        width: isMobile ? '100%' : 275,
        flexShrink: 0,
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 28,
        px: 24,
        mb: 28,
        mt: isMobile ? '20px' : ''
      }}
    >
      <Avatar
        sx={{ width: 120, height: 120, cursor: 'pointer' }}
        src={userInfo?.avatar?.fileUrl || DefaultAvatarSVG}
        onClick={handleUser}
      />

      <Stack direction={'row'} alignItems="center" spacing={8} mt={24}>
        <Typography
          variant="h4"
          sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}
          onClick={handleUser}
        >
          {userInfo?.fullName || userInfo?.companyName}
        </Typography>
        <VerifiedIcon isVerify={userInfo?.isVerify} />
      </Stack>
      <Tooltip title={userInfo?.description || userInfo?.briefIntro || 'No description yet'}>
        <Typography
          variant="body1"
          sx={{
            mt: 10,
            color: 'var(--ps-gray-700)',
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical'
          }}
        >
          {userInfo?.description || userInfo?.briefIntro || 'No description yet'}
        </Typography>
      </Tooltip>

      <SocialMediaButtonGroup
        email={userInfo?.contactEmail}
        shouldShowEmailButton={!!token}
        twitter={userInfo?.twitter}
        instagram={userInfo?.instagram}
        website={userInfo?.website}
        linkedin={userInfo?.linkedin}
        github={userInfo?.github}
      />

      <AuctionDescription poolInfo={poolInfo} getPoolInfo={getPoolInfo} canEdit={isCurrentUserCreatedThisPool} />
      <AuctionFiles
        poolInfo={poolInfo}
        getPoolInfo={getPoolInfo}
        canDownloadFile={!isCurrentUserCreatedThisPool}
        canDeleteFile={isCurrentUserCreatedThisPool}
        canAddFile={isCurrentUserCreatedThisPool}
      />
    </Box>
  )
}

export default CreatorInfoCard
