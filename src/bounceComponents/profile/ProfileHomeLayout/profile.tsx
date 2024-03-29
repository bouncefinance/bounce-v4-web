import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Stack, styled, Typography } from '@mui/material'
import styles from './styles'
import { IProfileUserInfo } from 'api/user/type'
import { Link } from 'react-router-dom'
import { useQueryParams } from 'hooks/useQueryParams'
import { routes } from 'constants/routes'
import ComingSoon from 'pages/ComingSoon'
import TokenAuction from './TokenAuction'
import { H4, H6, H7, SmallText } from '../../../components/Text'
import { Row } from '../../../components/Layout'
// import GithubIcon from 'assets/socialLinksIcon/github.svg'
// import Insta from 'assets/socialLinksIcon/instagram.svg'
// import Linkin from 'assets/socialLinksIcon/linkin.svg'
// import Twitter from 'assets/socialLinksIcon/twitter-circle.svg'
// import Website from 'assets/socialLinksIcon/website.svg'
import { ReactComponent as VerifyIcon } from 'assets/imgs/user/profile-verify.svg'
import { BackedTokenType } from '../../../pages/account/MyTokenOrNFT'
import { getUserPoolCount } from 'api/user'
import useBreakpoint from '../../../hooks/useBreakpoint'
import { VerifyStatus } from 'api/profile/type'
import countries from 'i18n-iso-countries'
import SocialMediaButtonGroup from 'bounceComponents/fixed-swap/CreatorInfoCard/SocialMediaButtonGroup'

const ProfileTag = styled(SmallText)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12.5px 12px;
  gap: 10px;
  height: 32px;
  background: #f6f7f3;
  border-radius: 27px;
`

const AuctionCountBg = styled(Box)`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
  height: 84px;
  border: 1px solid #e8e9e4;
  border-radius: 8px;
`

export interface ITabsListProps {
  labelKey: number | string
  label: string | ReactNode
  content?: string | ReactNode
  href?: string
}

function AuctionCount({ title, count }: { title: string; count: number }) {
  return (
    <AuctionCountBg>
      <H7 sx={{ color: '#959595' }}>{title}</H7>
      <H4 sx={{ color: '#2B51DA' }}>{count}</H4>
    </AuctionCountBg>
  )
}

export function ProfileIntroduce({ personalInfo }: { personalInfo: IProfileUserInfo | undefined }) {
  const [poolCount, setPoolCount] = useState<{
    createdCount: number
    participantCount: number
  }>()
  const isMobile = useBreakpoint('lg')
  const [showAbout, setShowAbout] = useState(false)
  useEffect(() => {
    const userPoolCount = async () => {
      if (!personalInfo?.address) {
        return
      }
      const res = await getUserPoolCount(personalInfo.address)
      setPoolCount(res.data)
    }
    userPoolCount()
  }, [personalInfo?.address])

  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '22px 17px' : '40px 24px 64px',
        width: isMobile ? '100%' : '264px',
        height: 'min-content',
        background: '#ffffff',
        borderRadius: '20px',
        mb: 28
      }}
    >
      <Avatar
        sx={{ width: 120, height: 120 }}
        src={personalInfo?.avatar?.fileThumbnailUrl || personalInfo?.avatar?.fileUrl}
      />
      <Stack sx={{ flexDirection: { xs: 'row', sm: 'column' }, gap: { xs: 4, sm: 10 }, alignItems: 'center' }}>
        <H4
          sx={{
            fontSize: { xs: 22, sm: 20 },
            wordBreak: 'break-all',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis'
          }}
        >
          {personalInfo?.fullName}
        </H4>
        <H6 sx={{ fontSize: { xs: 16, sm: 14 }, color: '#2B51DA' }}>{`#${personalInfo?.fullNameId}`}</H6>
      </Stack>
      <Row mt={24} gap={4}>
        <ProfileTag>{countries.getName(personalInfo?.location as string, 'en')}</ProfileTag>
        {personalInfo?.ifKyc === VerifyStatus.Verified && (
          <ProfileTag>
            KYC Verified
            <VerifyIcon />
          </ProfileTag>
        )}
      </Row>
      {isMobile && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            mt: '24px',
            justifyContent: 'space-between',
            '> div:first-child': {
              mr: '12px'
            }
          }}
        >
          <AuctionCount title={'Auction Participated'} count={poolCount?.participantCount || 0} />
          <AuctionCount title={'Auction Created'} count={poolCount?.createdCount || 0} />
        </Box>
      )}

      {(!isMobile || (isMobile && showAbout)) && (
        <>
          <Box mt={32} sx={{ width: '100%', borderBottom: '1px solid #E8E9E4' }} />
          <H6 mt={24} width={'100%'}>
            About
          </H6>
          <Typography mt={16} variant={'body2'} width={'100%'} sx={{ wordBreak: 'break-word' }}>
            {personalInfo?.description || 'There is nothing for the time being'}
          </Typography>
          <Stack
            sx={{
              '& .has-link': {
                cursor: 'pointer'
              },
              '& .no-link': {
                cursor: 'not-allowed'
              }
            }}
            mt={32}
            mb={38}
            direction={'row'}
            spacing={9}
          >
            <SocialMediaButtonGroup
              showAll
              twitter={personalInfo?.twitter || personalInfo?.twitterName}
              instagram={personalInfo?.instagram}
              website={personalInfo?.website}
              // linkedin={personalInfo?.linkedin}
              discord={personalInfo?.discord}
              github={personalInfo?.github}
            />
          </Stack>
        </>
      )}
      {isMobile && (
        <Typography
          sx={{ fontSize: 14, fontFamily: 'Inter', borderBottom: '1px solid #121212' }}
          // onClick={() => setShowAbout(!showAbout)}
          onClick={() => {
            setShowAbout(pre => !pre)
          }}
        >
          {!showAbout ? 'view more' : 'view less'}
        </Typography>
      )}
      {!isMobile && (
        <>
          <AuctionCount title={'Auction Participated'} count={poolCount?.participantCount || 0} />
          <AuctionCount title={'Auction Created'} count={poolCount?.createdCount || 0} />
        </>
      )}
    </Box>
  )
}

const ProfileSummaryLayout: React.FC<{
  personalInfo: IProfileUserInfo | undefined
  userId: number | string
  id: string | undefined
}> = props => {
  const { type } = useQueryParams()
  const isMobile = useBreakpoint('lg')
  const { personalInfo, id } = props

  const tabsList: (ITabsListProps & { components: JSX.Element })[] = useMemo(
    () => [
      // {
      //   labelKey: 'All',
      //   label: 'All',
      //   href: '',
      //   components: personalInfo ? <TokenAuction userInfo={personalInfo} /> : <></>
      // },
      {
        labelKey: 'Token',
        label: 'Token',
        href: '',
        components: personalInfo ? <TokenAuction userInfo={personalInfo} tokenType={BackedTokenType.TOKEN} /> : <></>
      },
      {
        labelKey: 'NFT',
        label: 'NFT',
        href: 'NFT',
        components: personalInfo ? <TokenAuction userInfo={personalInfo} tokenType={BackedTokenType.NFT} /> : <></>
      },
      {
        labelKey: 'Real World Collectibles Auction',
        label: 'Real World Collectibles Auction',
        href: 'realWorld',
        components: (
          <ComingSoon
            bgColor="var(--ps-white)"
            sx={{ marginTop: '30px' }}
            prompt={'The Real World Collectibles Auction will be available soon. Please stay tuned.'}
          />
        )
      },
      {
        labelKey: 'Ads Auction',
        label: 'Ads Auction',
        href: 'ads',
        components: (
          <ComingSoon
            bgColor="var(--ps-white)"
            sx={{ marginTop: '30px' }}
            prompt={'The Ads Auction will be available soon. Please stay tuned.'}
          />
        )
      }
    ],
    [personalInfo]
  )

  const hasActive = (path: string | undefined) => {
    if (!path && !type) return true
    return path === type
  }

  const currentTypeRender = useMemo(() => {
    return tabsList.find(({ href }) => href === (type || ''))?.components || null
  }, [tabsList, type])

  return (
    <>
      <Box sx={{ position: 'relative', width: '100%', ...styles.contain }}>
        <Stack
          direction="row"
          spacing={36}
          alignItems="center"
          sx={{
            padding: isMobile ? '12px 16px 0' : '40px 48px 0',
            whiteSpace: 'nowrap',
            overflowX: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          {tabsList?.map(item => {
            return (
              <Typography
                variant="h4"
                key={item.labelKey}
                sx={{ ...styles.menu, ...(hasActive(item?.href) ? styles.menuActive : ({} as any)) }}
              >
                <Link replace to={`${routes.profile.summary}?id=${id}&type=${item.href}`}>
                  {item.label}
                </Link>
              </Typography>
            )
          })}
        </Stack>
        <Box
          sx={{
            opacity: '0.1',
            border: '1px solid #000000'
          }}
        />
        <Box sx={{ background: '#FFFFFF', borderRadius: 20, minHeight: 711 }}>{currentTypeRender}</Box>
      </Box>
    </>
  )
}

export default ProfileSummaryLayout
