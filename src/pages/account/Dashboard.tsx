import { Box, Button, Chip, Container, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import VerifiedIcon from 'bounceComponents/common/VerifiedIcon'
import AccountAvatar from 'bounceComponents/account/AccountAvatar'
import { useUserInfo } from 'state/users/hooks'
import { getCurrentTimeStamp, shortenAddress } from 'utils'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as EditSVG } from 'assets/imgs/companies/edit.svg'
import { routes } from 'constants/routes'
import { useDashboardStat, useDashboardUserCollect, useDashboardUserCreated } from 'bounceHooks/account/useDashboard'
import { formatGroupNumber } from 'utils/number'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { Timer } from 'components/Timer'
import {
  DashboardNoData,
  DashboardPoolCard,
  DashboardShowCategoryName,
  DashboardStatCard,
  DashboardToPoolButton
} from 'bounceComponents/account/Dashboard'
import { DashboardQueryType } from 'api/account/types'
import { useMemo } from 'react'
// import SocialMediaButtonGroup from 'bounceComponents/fixed-swap/CreatorInfoCard/SocialMediaButtonGroup'
import { useActiveWeb3React } from 'hooks'
import Copy from 'components/essential/Copy'
import Divider from 'components/Divider'
import useBreakpoint from '../../hooks/useBreakpoint'
import countries from 'i18n-iso-countries'
// import { ReactComponent as InstagramSvg } from 'assets/socialLinksIcon/instagram-dashboard.svg'
import { ReactComponent as TwitterSVG } from 'assets/imgs/auction/twitter.svg'
import { ReactComponent as TwitterDisSVG } from 'assets/imgs/auction/twitter-dis.svg'
import { ReactComponent as InstagramSVG } from 'assets/imgs/auction/instagram.svg'
import { ReactComponent as InstagramDisSVG } from 'assets/imgs/auction/instagram-dis.svg'

import { ReactComponent as DiscordSVG } from 'assets/imgs/auction/discord.svg'
import { ReactComponent as DiscordDisSVG } from 'assets/imgs/auction/discord-dis.svg'

import { ReactComponent as EmailSVG } from 'assets/imgs/auction/email.svg'
import { ReactComponent as EmailDisSVG } from 'assets/imgs/auction/email-dis.svg'

const btnStyle = {
  height: 26,
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  padding: '0 8px',
  borderRadius: 20
}
// const socialSvg = [
//   <svg key={1} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect x="1" y="1" width="32" height="32" rx="16" fill="white" />
//     <g clipPath="url(#clip0_9225_275909)">
//       <path
//         d="M17.6072 17.4027C17.6072 20.3233 15.233 22.6916 12.303 22.6916C11.6075 22.6925 10.9187 22.5564 10.2758 22.2911C9.6329 22.0258 9.04856 21.6365 8.55613 21.1454C8.0637 20.6543 7.67283 20.071 7.40583 19.4288C7.13883 18.7866 7.00093 18.0981 7 17.4027C7 14.4808 9.37412 12.1138 12.303 12.1138C12.9986 12.1127 13.6875 12.2486 14.3306 12.5139C14.9736 12.7791 15.5581 13.1684 16.0506 13.6595C16.5432 14.1507 16.9341 14.734 17.2012 15.3763C17.4683 16.0185 17.6062 16.7071 17.6072 17.4027ZM23.4249 17.4027C23.4249 20.1529 22.2379 22.3813 20.7734 22.3813C19.309 22.3813 18.1219 20.1517 18.1219 17.4027C18.1219 14.6524 19.309 12.4241 20.7734 12.4241C22.2379 12.4241 23.4249 14.6536 23.4249 17.4027ZM25.8049 17.4027C25.8049 19.8661 25.3877 21.863 24.8717 21.863C24.357 21.863 23.9397 19.8649 23.9397 17.4027C23.9397 14.9392 24.357 12.9424 24.8729 12.9424C25.3877 12.9424 25.8049 14.9392 25.8049 17.4027Z"
//         fill="black"
//       />
//     </g>
//     <rect x="1" y="1" width="32" height="32" rx="16" stroke="#121212" strokeOpacity="0.2" />
//     <defs>
//       <clipPath id="clip0_9225_275909">
//         <rect width="18.8049" height="18.8049" fill="white" transform="translate(7 8)" />
//       </clipPath>
//     </defs>
//   </svg>,
//   <svg key={2} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect x="1" y="1" width="32" height="32" rx="16" fill="white" />
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M25.954 11.7276C25.2924 12.0196 24.5826 12.2178 23.838 12.3062C24.5987 11.8508 25.1826 11.1276 25.4558 10.2679C24.7433 10.6911 23.9558 10.9964 23.1175 11.1625C22.4452 10.4473 21.4889 10 20.4282 10C18.3953 10 16.7453 11.65 16.7453 13.6829C16.7453 13.9722 16.7774 14.2535 16.8417 14.5213C13.7802 14.3686 11.0669 12.9008 9.25086 10.6723C8.9348 11.216 8.75266 11.8482 8.75266 12.5231C8.75266 13.8008 9.40353 14.9284 10.3919 15.5874C9.78924 15.5686 9.2214 15.4025 8.7232 15.1267C8.7232 15.1427 8.7232 15.1561 8.7232 15.1722C8.7232 16.9561 9.9928 18.4453 11.6776 18.7828C11.3696 18.8658 11.0428 18.9114 10.708 18.9114C10.4696 18.9114 10.2392 18.8873 10.0142 18.8444C10.483 20.3069 11.8436 21.3729 13.4534 21.4024C12.1919 22.3907 10.6062 22.98 8.87855 22.98C8.58123 22.98 8.28928 22.9613 8 22.9291C9.62853 23.9737 11.5651 24.5844 13.6463 24.5844C20.4202 24.5844 24.1246 18.973 24.1246 14.1061C24.1246 13.9454 24.1219 13.7874 24.1139 13.6294C24.8344 13.1097 25.4585 12.4615 25.9513 11.7223L25.954 11.7276Z"
//       fill="#0697F8"
//     />
//     <rect x="1" y="1" width="32" height="32" rx="16" stroke="#121212" strokeOpacity="0.2" />
//   </svg>,
//   <svg key={3} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect x="1" y="1" width="32" height="32" rx="16" fill="white" />
//     <path
//       d="M23.0189 10.8949C21.8822 10.3135 20.6796 9.90039 19.4429 9.6665C19.2889 9.97091 19.1089 10.3803 18.9848 10.7061C17.6515 10.4869 16.3305 10.4869 15.0217 10.7061C14.8976 10.3804 14.7136 9.97091 14.5581 9.6665C13.3203 9.9005 12.1167 10.3146 10.9794 10.8979C8.71632 14.6361 8.10281 18.2814 8.40953 21.875C9.91056 23.1003 11.3652 23.8446 12.7953 24.3317C13.1508 23.7974 13.4649 23.2318 13.7347 22.6406C13.2212 22.4269 12.7262 22.1636 12.2555 21.8537C12.3794 21.7534 12.5003 21.6488 12.6181 21.5401C15.4702 22.9983 18.569 22.9983 21.387 21.5401C21.5054 21.6481 21.6263 21.7526 21.7496 21.8537C21.2782 22.1644 20.7823 22.4283 20.2678 22.6422C20.539 23.2357 20.8526 23.8019 21.2071 24.3332C22.6386 23.8462 24.0946 23.1019 25.5956 21.875C25.9555 17.7091 24.9808 14.0973 23.0189 10.8949ZM14.1232 19.665C13.2671 19.665 12.5649 18.7913 12.5649 17.7274C12.5649 16.6635 13.2521 15.7883 14.1232 15.7883C14.9944 15.7883 15.6965 16.6619 15.6815 17.7274C15.6829 18.7913 14.9944 19.665 14.1232 19.665ZM19.8819 19.665C19.0257 19.665 18.3237 18.7913 18.3237 17.7274C18.3237 16.6635 19.0108 15.7883 19.8819 15.7883C20.7531 15.7883 21.4552 16.6619 21.4402 17.7274C21.4402 18.7913 20.7531 19.665 19.8819 19.665Z"
//       fill="black"
//     />
//     <rect x="1" y="1" width="32" height="32" rx="16" stroke="#121212" strokeOpacity="0.2" />
//   </svg>,
//   <InstagramSvg key={4} />,
//   <svg key={5} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect x="1" y="1" width="32" height="32" rx="16" fill="white" />
//     <rect x="1" y="1" width="32" height="32" rx="16" fill="white" stroke="#121212" strokeOpacity="0.2" />
//     <path
//       d="M12.5472 18.6693L11.9902 20.7495L9.95325 20.7927C9.3252 19.627 8.99758 18.3231 9.00001 16.9989C8.99801 15.7181 9.30496 14.4557 9.89483 13.3188L11.7085 13.651L12.5024 15.4534C12.3319 15.9511 12.2451 16.4736 12.2455 16.9997C12.2455 17.5872 12.352 18.1499 12.5472 18.6693Z"
//       fill="#FBBB00"
//     />
//     <path
//       d="M24.8594 15.5044C25.0582 16.5517 25.0462 17.6281 24.8242 18.6707C24.4394 20.473 23.4443 22.0873 22.0069 23.2408L19.7226 23.1239L19.3993 21.1062C20.3422 20.5534 21.0666 19.6936 21.4514 18.6707H17.1719V15.5044H24.8594Z"
//       fill="#518EF8"
//     />
//     <path
//       d="M22.0131 23.2406C20.5936 24.3837 18.8253 25.0058 17.0028 25.0031C15.557 25.0036 14.1381 24.6125 12.8968 23.8712C11.6555 23.13 10.6383 22.0662 9.95312 20.7931L12.5463 18.6689C12.7897 19.3182 13.172 19.9064 13.6665 20.3924C14.161 20.8784 14.7558 21.2505 15.4091 21.4827C16.0625 21.7148 16.7586 21.8014 17.4489 21.7363C18.1392 21.6713 18.807 21.4562 19.4055 21.1061L22.0131 23.2406Z"
//       fill="#28B446"
//     />
//     <path
//       d="M22.1074 10.8382L19.5143 12.9608C18.9068 12.5827 18.2219 12.3465 17.5106 12.2696C16.7992 12.1926 16.0796 12.2771 15.4054 12.5166C14.7312 12.756 14.1196 13.1444 13.6161 13.6528C13.1127 14.1612 12.7303 14.7766 12.4974 15.4532L9.89062 13.3186C10.5653 12.0159 11.5851 10.9237 12.8385 10.1615C14.092 9.39928 15.5309 8.99628 16.9979 8.99658C18.9404 8.99658 20.7212 9.6873 22.1074 10.8382Z"
//       fill="#F14336"
//     />
//   </svg>
// ]
// const social = [
//   <Link key={1} href="https://poseiswap.medium.com/" target="_blank">
//     {socialSvg[0]}
//   </Link>,
//   <Link key={2} href="https://twitter.com/poseiswap" target="_blank">
//     {socialSvg[1]}
//   </Link>,
//   <Link key={3} href="https://discord.com/invite/rWdHnb45UG" target="_blank">
//     {socialSvg[2]}
//   </Link>,
//   <Link key={3} href="https://discord.com/invite/rWdHnb45UG" target="_blank">
//     {socialSvg[3]}
//   </Link>,
//   <Link key={3} href="https://discord.com/invite/rWdHnb45UG" target="_blank">
//     {socialSvg[4]}
//   </Link>
// ]
const SocialDisSvg = ({ userInfo }: { userInfo: any }) => {
  return (
    <>
      <IconButton
        href={userInfo?.twitter as string}
        target="_blank"
        disabled={!!!userInfo?.twitter}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.27)',
          width: 38,
          height: 38,
          p: 5
        }}
      >
        {userInfo?.twitter ? <TwitterSVG /> : <TwitterDisSVG />}
      </IconButton>
      <IconButton
        href={userInfo?.discord as string}
        target="_blank"
        disabled={!!!userInfo?.discord}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.27)',
          width: 38,
          height: 38,
          p: 5
        }}
      >
        {userInfo?.discord ? <DiscordSVG /> : <DiscordDisSVG />}
      </IconButton>
      <IconButton
        href={userInfo?.instagram as string}
        target="_blank"
        disabled={!!!userInfo?.instagram}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.27)',
          width: 38,
          height: 38,
          p: 5
        }}
      >
        {userInfo?.instagram ? <InstagramSVG /> : <InstagramDisSVG />}
      </IconButton>
      <IconButton
        href={userInfo?.contactEmail as string}
        target="_blank"
        disabled={!!!userInfo?.contactEmail}
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.27)',
          width: 38,
          height: 38,
          p: 5
        }}
      >
        {userInfo?.contactEmail ? <EmailSVG /> : <EmailDisSVG />}
      </IconButton>
    </>
  )
}
export default function Dashboard() {
  const { userInfo } = useUserInfo()
  const { account } = useActiveWeb3React()
  const navigate = useNavigate()
  const { data: dashboardStat } = useDashboardStat()
  const isSm = useBreakpoint('sm')

  return (
    <AccountLayout>
      <Box padding="0 20px" sx={{ background: isSm ? '#fff' : '' }}>
        <Container maxWidth="lg">
          <Box padding={isSm ? `20px 0` : `40px 0`}>
            <Typography variant="h3" fontSize={isSm ? 22 : 30} fontFamily="Public Sans" fontWeight={600}>
              Dashboard
            </Typography>
            {!isSm && (
              <Box pt={40}>
                <Box display="flex" alignItems={'center'}>
                  <Box sx={{ position: 'relative', width: '120px' }}>
                    {!userInfo?.avatar ? (
                      <Skeleton variant="circular" width={120} height={120} sx={{ background: 'var(--ps-gray-50)' }} />
                    ) : (
                      <AccountAvatar src={userInfo?.avatar?.fileThumbnailUrl || userInfo?.avatar?.fileUrl} />
                    )}
                    {userInfo?.ifKyc && (
                      <VerifiedIcon
                        ifKyc={userInfo.ifKyc}
                        width={42}
                        height={42}
                        sx={{ position: 'absolute', right: 0, bottom: 0 }}
                      />
                    )}
                  </Box>
                  <Stack sx={{ width: '100%', ml: 16 }} spacing={5}>
                    <Stack direction={'row'} alignItems={'center'}>
                      {!userInfo?.fullName && !userInfo?.fullNameId ? (
                        <Skeleton
                          variant="rectangular"
                          width={280}
                          height={46}
                          sx={{ background: 'var(--ps-gray-50)' }}
                        />
                      ) : (
                        <Stack direction={'row'} alignItems="center">
                          <Typography variant="h1" fontWeight={500}>
                            {userInfo?.fullName}
                          </Typography>
                          <Typography variant="body1" color="#2663FF" ml={10} sx={{ fontSize: 20 }}>
                            {userInfo?.fullNameId && `#${userInfo?.fullNameId}`}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>

                    {userInfo?.location && (
                      <Box height={32}>
                        <Chip
                          sx={{
                            width: 84,
                            height: '100%'
                          }}
                          label={countries.getName(userInfo.location, 'en')}
                        />
                      </Box>
                    )}
                    {/* <Stack
                      sx={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-start', marginTop: '12px !important' }}
                    >
                      {social}
                    </Stack> */}
                    <Stack direction={'row'} alignItems="center" justifyContent="start" spacing={12}>
                      <SocialDisSvg userInfo={userInfo} />
                    </Stack>
                  </Stack>
                </Box>

                <Box display={'flex'} justifyContent={'flex-end'}>
                  <Box
                    sx={{
                      mt: -50,
                      backgroundColor: '#F6F7F3',
                      borderRadius: '8px',
                      height: 45,
                      width: 320,
                      padding: '12px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1px 1fr',
                      alignContent: 'center',
                      justifyItems: 'center'
                    }}
                  >
                    <Box display={'flex'} alignItems={'center'}>
                      <Typography mr={5}>{account ? shortenAddress(account) : '-'}</Typography>
                      <Copy toCopy={account || ''} />
                    </Box>
                    <Box
                      sx={{
                        borderRight: '1px solid var(--ps-border-1)',
                        height: '100%'
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate(routes.account.myProfile)
                      }}
                      size="small"
                      sx={{
                        background: 'none',
                        '&:hover': {
                          border: 'none',
                          background: 'none',
                          color: 'var(--ps-blue)'
                        }
                      }}
                    >
                      <EditSVG style={{ marginRight: 10 }} />
                      Edit portfolio
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
            {isSm && (
              <Box pt={26}>
                <Box sx={{ position: 'relative', width: 'max-content', left: '50%', transform: 'translateX(-50%)' }}>
                  {!userInfo?.avatar ? (
                    <Skeleton variant="circular" width={72} height={72} sx={{ background: 'var(--ps-gray-50)' }} />
                  ) : (
                    <AccountAvatar src={userInfo?.avatar?.fileThumbnailUrl || userInfo?.avatar?.fileUrl} />
                  )}
                  {userInfo?.ifKyc && (
                    <VerifiedIcon
                      ifKyc={userInfo.ifKyc}
                      width={24}
                      height={24}
                      sx={{ position: 'absolute', left: 50, bottom: 0 }}
                    />
                  )}
                </Box>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} mt={20} mb={8}>
                  {!userInfo?.fullName && !userInfo?.fullNameId ? (
                    <Skeleton variant="rectangular" width={280} height={46} sx={{ background: 'var(--ps-gray-50)' }} />
                  ) : (
                    <Stack direction={'row'} alignItems="center">
                      <Typography variant="h1" fontWeight={500} fontFamily="Public Sans" sx={{ fontSize: 22 }}>
                        {userInfo?.fullName}
                      </Typography>
                      <Typography variant="body1" color="#2663FF" ml={10} sx={{ fontSize: 16 }}>
                        {userInfo?.fullNameId && `#${userInfo?.fullNameId}`}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
                {userInfo?.location && (
                  <Box height={32} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Chip
                      sx={{
                        width: 84,
                        height: '100%'
                      }}
                      label={userInfo.location}
                    />
                  </Box>
                )}
                {/* <Stack mt={22} mb={24} sx={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                  {social}
                </Stack> */}

                <Stack direction={'row'} mt={10} alignItems="center" justifyContent="center" spacing={12}>
                  <SocialDisSvg userInfo={userInfo} />
                </Stack>

                <Box display={'flex'} justifyContent={'center'} mt={20}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItem: 'center',
                      width: '100%',
                      borderRadius: '6px',
                      background: '#F6F7F3'
                    }}
                  >
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexBasis={'50%'}>
                      <Typography mr={5}>{account ? shortenAddress(account) : '-'}</Typography>
                      <Copy toCopy={account || ''} />
                    </Box>
                    <Box
                      sx={{
                        borderRight: '1px solid var(--ps-border-1)',
                        height: '100%'
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate(routes.account.myProfile)
                      }}
                      size="small"
                      sx={{
                        flexBasis: '50%',
                        background: 'none',
                        '&:hover': {
                          border: 'none',
                          background: 'none',
                          color: 'var(--ps-blue)'
                        }
                      }}
                    >
                      <EditSVG style={{ marginRight: 10 }} />
                      Edit portfolio
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            <Box py={50}>
              <Divider />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { lg: '346fr 346fr 346fr', md: '346fr 346fr', xs: '1fr' },
                gap: 30
              }}
            >
              <CreateAuctionsList title="Ongoing Auctions" queryType={DashboardQueryType.ongoing} />
              <FavoritesAuctionsList />
              <PendingClaimAuctionsList />
            </Box>
          </Box>
        </Container>
        <Box>
          <Container
            maxWidth="lg"
            sx={{
              background: '#F6F6F3',
              borderRadius: '20px 20px 0 0'
            }}
          >
            <Box padding={isSm ? '34px 26px' : '50px 60px'}>
              <Typography variant="h3" fontSize={isSm ? 16 : 24} fontFamily="Public Sans">
                Auction Statistics
              </Typography>
              <Box
                display={'grid'}
                mt={24}
                sx={{
                  gridTemplateColumns: { lg: '1fr 1fr 1fr 1fr', md: '1fr 1fr' }
                }}
                gap={20}
              >
                <DashboardStatCard
                  name="Auction Participated"
                  value={formatGroupNumber(dashboardStat?.participantCount || 0)}
                />
                <DashboardStatCard name="Auction Created" value={formatGroupNumber(dashboardStat?.createdCount || 0)} />
                <DashboardStatCard
                  name="Auction Sale Volume"
                  value={formatGroupNumber(Number(dashboardStat?.saledVolume) || 0, '$', 2)}
                />
                <DashboardStatCard
                  name="Auction Buy Volume"
                  value={formatGroupNumber(Number(dashboardStat?.buyVolume) || 0, '$', 2)}
                />
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </AccountLayout>
  )
}

function FavoritesAuctionsList() {
  const { data, loading } = useDashboardUserCollect()
  const curTime = getCurrentTimeStamp()
  return (
    <DashboardPoolCard title="Favorites Auctions">
      <>
        {loading ? (
          <BounceAnime />
        ) : !data?.length ? (
          <DashboardNoData />
        ) : (
          data?.map((item, idx) => (
            <Box
              display={'grid'}
              key={idx}
              gridTemplateColumns="1.3fr 4fr 2fr"
              gap={10}
              sx={{
                padding: '4px 0 4px 10px',
                alignItems: 'center',
                background: '#F5F5F5',
                borderRadius: 8
              }}
            >
              <Typography fontSize={12}>#{item.poolId}</Typography>
              <DashboardShowCategoryName category={item.category} backedChainId={item.chainId} />
              <Box display={'flex'} justifyContent="right">
                {curTime < item.openAt ? (
                  <Box sx={{ ...btnStyle, background: '#E6E6E6' }}>
                    <Timer timer={item.openAt * 1000} />
                  </Box>
                ) : (
                  <DashboardToPoolButton
                    text="Participate"
                    category={item.category}
                    poolId={item.poolId}
                    backedChainId={item.chainId}
                  />
                )}
              </Box>
            </Box>
          ))
        )}
      </>
    </DashboardPoolCard>
  )
}

function CreateAuctionsList({ title, queryType }: { title: string; queryType: DashboardQueryType }) {
  const { data, loading } = useDashboardUserCreated(queryType)
  return (
    <DashboardPoolCard title={title}>
      <>
        {loading ? (
          <BounceAnime />
        ) : !data?.length ? (
          <DashboardNoData />
        ) : (
          data?.map((item, idx) => (
            <Box
              display={'grid'}
              key={idx}
              gridTemplateColumns="1.3fr 4fr 2fr"
              gap={10}
              sx={{
                padding: '4px 0 4px 10px',
                alignItems: 'center',
                background: '#F6F6F3',
                borderRadius: 8
              }}
            >
              <Typography fontSize={12}>#{item.poolId}</Typography>
              <DashboardShowCategoryName category={item.category} backedChainId={item.chainId} />
              <Box display={'flex'} justifyContent="right">
                <DashboardToPoolButton
                  category={item.category}
                  text={queryType === DashboardQueryType.ongoing ? 'Check' : 'Claim'}
                  poolId={item.poolId}
                  backedChainId={item.chainId}
                />
              </Box>
            </Box>
          ))
        )}
      </>
    </DashboardPoolCard>
  )
}

function PendingClaimAuctionsList() {
  const { data, loading } = useDashboardUserCreated(DashboardQueryType.claim)
  const { data: colletData, loading: colletLoading } = useDashboardUserCollect(DashboardQueryType.claim)

  const list = useMemo(() => {
    return [...(data || []), ...(colletData || [])]
  }, [colletData, data])

  return (
    <DashboardPoolCard title={'Pending Claim'}>
      <>
        {loading || colletLoading ? (
          <BounceAnime />
        ) : !data?.length ? (
          <DashboardNoData />
        ) : (
          list.map((item, idx) => (
            <Box
              display={'grid'}
              key={idx}
              gridTemplateColumns="1.3fr 4fr 2fr"
              gap={10}
              sx={{
                padding: '4px 0 4px 10px',
                alignItems: 'center',
                background: '#F5F5F5',
                borderRadius: 8
              }}
            >
              <Typography fontSize={12}>#{item.poolId}</Typography>
              <DashboardShowCategoryName category={item.category} backedChainId={item.chainId} />
              <Box display={'flex'} justifyContent="right">
                <DashboardToPoolButton
                  category={item.category}
                  text={'Claim'}
                  poolId={item.poolId}
                  backedChainId={item.chainId}
                />
              </Box>
            </Box>
          ))
        )}
      </>
    </DashboardPoolCard>
  )
}
