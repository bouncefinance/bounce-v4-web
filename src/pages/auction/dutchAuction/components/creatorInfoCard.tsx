import { Avatar, Box, Typography, styled } from '@mui/material'
// import ChainIcon from 'assets/imgs/dutchAuction/chainIcon.png'
import { ReactComponent as Icon1 } from 'assets/imgs/dutchAuction/icon1.svg'
import { ReactComponent as Icon2 } from 'assets/imgs/dutchAuction/icon2.svg'
import { ReactComponent as Icon3 } from 'assets/imgs/dutchAuction/icon3.svg'
import { ReactComponent as Icon4 } from 'assets/imgs/dutchAuction/icon4.svg'
import { ReactComponent as Icon5 } from 'assets/imgs/dutchAuction/icon5.svg'
import { useState, useEffect } from 'react'
import { getCompanyInfo } from 'api/company'
import { getUserInfo } from 'api/user'
import { USER_TYPE } from 'api/user/type'
import DefaultAvatarSVG from 'assets/imgs/profile/yellow_avatar.svg'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { ChainId, ChainListMap } from 'constants/chain'
import Image from 'components/Image'
import { DutchAuctionPoolProp } from 'api/pool/type'
import AuctionDescription from 'bounceComponents/fixed-swap/CreatorInfoCard/AuctionDescription'
import AuctionFiles from 'bounceComponents/fixed-swap/CreatorInfoCard/AuctionFiles'
import { useActiveWeb3React } from 'hooks'
import LikeUnlike from './likeUnlike'
import { LIKE_OBJ } from 'api/idea/type'

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
const LinkItem = styled(Box)(() => ({
  width: '40px',
  height: '40px',
  background: '#121212',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '50%',
  '&:hover': {
    background: '#E1F25C',
    'svg path': {
      stroke: '#121212'
    },
    'svg circle': {
      stroke: '#121212'
    }
  }
}))
export interface SocialMediaButtonGroupProps {
  email?: string
  shouldShowEmailButton?: boolean
  twitter?: string
  instagram?: string
  website?: string
  linkedin?: string
  github?: string
  style?: React.CSSProperties
}
export const SocialLink = ({ twitter, instagram, website, linkedin, github }: SocialMediaButtonGroupProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
      gap={'6px'}
    >
      {twitter && (
        <LinkItem
          onClick={() => {
            window.open(twitter, '_blank')
          }}
        >
          <Icon1 />
        </LinkItem>
      )}
      {instagram && (
        <LinkItem
          onClick={() => {
            window.open(instagram, '_blank')
          }}
        >
          <Icon2 />
        </LinkItem>
      )}
      {website && (
        <LinkItem
          onClick={() => {
            window.open(website, '_blank')
          }}
        >
          <Icon3 />
        </LinkItem>
      )}
      {linkedin && (
        <LinkItem
          onClick={() => {
            window.open(linkedin, '_blank')
          }}
        >
          <Icon4 />
        </LinkItem>
      )}
      {github && (
        <LinkItem
          onClick={() => {
            window.open(github, '_blank')
          }}
        >
          <Icon5 />
        </LinkItem>
      )}
    </Box>
  )
}
interface ICreatorInfoCardProps {
  creator: string
  poolInfo: DutchAuctionPoolProp
  getPoolInfo: () => void
}
const PoolInfo = (props: ICreatorInfoCardProps) => {
  const { creator, poolInfo, getPoolInfo } = props
  const chainConfigInBackend = useChainConfigInBackend('id', poolInfo.chainId)
  const { account } = useActiveWeb3React()
  const isCurrentUserCreatedThisPool = creator.toLowerCase() === account?.toLowerCase()
  const [userInfo, setUserInfo] = useState<any>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const getInfo = async () => {
      const res =
        poolInfo.creatorUserInfo?.userType === USER_TYPE.USER
          ? await getUserInfo({ userId: poolInfo.creatorUserInfo?.userId })
          : await getCompanyInfo({ userId: poolInfo.creatorUserInfo?.userId })
      setUserInfo(res.data)
    }
    if (poolInfo.creatorUserInfo) {
      getInfo()
    }
  }, [poolInfo.creatorUserInfo])
  const handleUser = () => {
    if (userInfo?.userType === USER_TYPE.USER) {
      return navigate(`${routes.profile.summary}?id=${userInfo?.id}`)
    }
    return navigate(`${routes.profile.summary}?id=${userInfo?.companyId}`)
  }
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
          #{poolInfo.id}
        </Typography>
        <ChainType>
          <Image
            src={
              chainConfigInBackend?.ethChainId
                ? ChainListMap?.[chainConfigInBackend.ethChainId as ChainId]?.logo || ''
                : ''
            }
            style={{
              marginRight: '10px'
            }}
            width={20}
            height={20}
            alt={chainConfigInBackend?.shortName}
          />
          <Typography className="text">
            {chainConfigInBackend?.ethChainId
              ? ChainListMap?.[chainConfigInBackend.ethChainId as ChainId]?.name.toUpperCase() || ''
              : '-'}
          </Typography>
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
        {poolInfo.name || '--'}
      </Typography>
      {!isCurrentUserCreatedThisPool && (
        <LikeUnlike
          likeObj={LIKE_OBJ.pool}
          objId={poolInfo?.id}
          likeAmount={{
            dislikeCount: poolInfo?.likeInfo?.dislikeCount,
            likeCount: poolInfo?.likeInfo?.likeCount,
            myDislike: poolInfo?.likeInfo?.myDislike,
            myLike: poolInfo?.likeInfo?.myLike
          }}
          onSuccess={getPoolInfo}
        />
      )}
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
          {userInfo?.fullName || userInfo?.companyName}
        </Typography>
      </Box>
      {!isCurrentUserCreatedThisPool && (
        <Typography
          sx={{
            fontFamily: `'Inter'`,
            fontWeight: 400,
            fontSize: '14px',
            color: '#626262',
            marginBottom: '28px',
            wordBreak: 'break-all'
          }}
        >
          {poolInfo?.description || 'No description yet'}
        </Typography>
      )}
      <SocialLink
        twitter={userInfo?.twitter}
        instagram={userInfo?.instagram}
        website={userInfo?.website}
        linkedin={userInfo?.linkedin}
        github={userInfo?.github}
      />
      {isCurrentUserCreatedThisPool && (
        <>
          <AuctionDescription
            isDutchAuction={true}
            poolInfo={poolInfo}
            getPoolInfo={getPoolInfo}
            canEdit={isCurrentUserCreatedThisPool}
          />
        </>
      )}
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
export default PoolInfo
