import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Stack, styled, Typography } from '@mui/material'
import styles from './styles'
import { IProfileUserInfo } from 'api/user/type'
import { ITabsListProps } from 'bounceComponents/profile/ProfileLayout'
import { Link } from 'react-router-dom'
import { useQueryParams } from 'hooks/useQueryParams'
import { routes } from 'constants/routes'
import ComingSoon from 'pages/ComingSoon'
import TokenAuction from './TokenAuction'
import { H4, H6, H7, SmallText } from '../../../components/Text'
import { Row } from '../../../components/Layout'
import GithubIcon from 'assets/socialLinksIcon/github.svg'
import Insta from 'assets/socialLinksIcon/instagram.svg'
import Linkin from 'assets/socialLinksIcon/linkin.svg'
import Twitter from 'assets/socialLinksIcon/twitter-circle.svg'
import Website from 'assets/socialLinksIcon/website.svg'
import { ReactComponent as VerifyIcon } from 'assets/imgs/user/profile-verify.svg'
import { BackedTokenType } from '../../../pages/account/MyTokenOrNFT'
import { getUserPoolCount } from 'api/user'

const IntroBg = styled(Box)`
  flex-direction: column;
  display: flex;
  align-items: center;
  padding: 40px 24px 64px;
  width: 264px;
  height: min-content;
  background: #ffffff;
  border-radius: 20px;
`

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
  height: 74px;
  border: 1px solid #e8e9e4;
  border-radius: 8px;
`

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

  function getSocialList() {
    const list = []
    if (personalInfo?.twitter) {
      list.push({ icon: Twitter, link: personalInfo.twitter })
    }
    if (personalInfo?.instagram) {
      list.push({ icon: Insta, link: personalInfo?.instagram })
    }
    if (personalInfo?.website) {
      list.push({ icon: Website, link: personalInfo?.website })
    }
    if (personalInfo?.linkedin) {
      list.push({ icon: Linkin, link: personalInfo?.linkedin })
    }
    if (personalInfo?.github) {
      list.push({ icon: GithubIcon, link: personalInfo?.github })
    }
    return list
  }

  return (
    <IntroBg>
      <Avatar
        sx={{ width: 120, height: 120 }}
        src={personalInfo?.avatar?.fileThumbnailUrl || personalInfo?.avatar?.fileUrl}
      />
      <H4 mt={24}>{personalInfo?.fullName}</H4>
      <H6 mt={4} sx={{ color: '#2B51DA' }}>
        {`#${personalInfo?.fullNameId}`}1
      </H6>
      <Row mt={24} gap={4}>
        <ProfileTag>{personalInfo?.location}</ProfileTag>
        {personalInfo?.isVerify && (
          <ProfileTag display={'none !important'}>
            KYC Verified
            <VerifyIcon />
          </ProfileTag>
        )}
      </Row>
      <Box mt={32} sx={{ width: '100%', borderBottom: '1px solid #E8E9E4' }} />
      <H6 mt={24} width={'100%'}>
        About
      </H6>
      <Typography mt={16} variant={'body2'}>
        {personalInfo?.description || 'There is nothing for the time being'}
      </Typography>
      <Stack mt={32} mb={38} direction={'row'} spacing={9}>
        {getSocialList().map((icon, idx) => (
          <img onClick={() => window.open(icon.link, '_blank')} src={icon.icon} key={idx} />
        ))}
      </Stack>
      <AuctionCount title={'Auction Participated'} count={poolCount?.participantCount || 0} />
      <AuctionCount title={'Auction Created'} count={poolCount?.createdCount || 0} />
    </IntroBg>
  )
}

const ProfileSummaryLayout: React.FC<{
  personalInfo: IProfileUserInfo | undefined
  userId: number | string
  id: string | undefined
}> = props => {
  const { type } = useQueryParams()
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
        components: <ComingSoon bgColor="var(--ps-white)" />
      },
      {
        labelKey: 'Ads Auction',
        label: 'Ads Auction',
        href: 'ads',
        components: <ComingSoon bgColor="var(--ps-white)" />
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
        <Stack direction="row" spacing={36} alignItems="center" sx={{ padding: '40px 48px 0' }}>
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
