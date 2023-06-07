import { Box, Button, Chip, Container, Skeleton, Stack, Typography } from '@mui/material'
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
import SocialMediaButtonGroup from 'bounceComponents/fixed-swap/CreatorInfoCard/SocialMediaButtonGroup'
import { useActiveWeb3React } from 'hooks'
import Copy from 'components/essential/Copy'
import Divider from 'components/Divider'
import useBreakpoint from '../../hooks/useBreakpoint'

const btnStyle = {
  height: 26,
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  padding: '0 8px',
  borderRadius: 20
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
            <Typography variant="h3" fontSize={isSm ? 22 : 30}>
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
                    {userInfo?.isVerify && (
                      <VerifiedIcon
                        isVerify={userInfo.isVerify}
                        width={42}
                        height={42}
                        showVerify
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
                          label={userInfo.location}
                        />
                      </Box>
                    )}

                    <Stack direction={'row'} alignItems="center" justifyContent="space-between" spacing={12}>
                      <SocialMediaButtonGroup
                        style={{ margin: 0 }}
                        email={userInfo?.contactEmail}
                        shouldShowEmailButton={true}
                        twitter={userInfo?.twitter}
                        instagram={userInfo?.instagram}
                        website={userInfo?.website}
                        linkedin={userInfo?.linkedin}
                        github={userInfo?.github}
                      />
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
                <Box sx={{ position: 'relative', width: '120px', left: 'calc(50% - 60px)' }}>
                  {!userInfo?.avatar ? (
                    <Skeleton variant="circular" width={72} height={72} sx={{ background: 'var(--ps-gray-50)' }} />
                  ) : (
                    <AccountAvatar src={userInfo?.avatar?.fileThumbnailUrl || userInfo?.avatar?.fileUrl} />
                  )}
                  {userInfo?.isVerify && (
                    <VerifiedIcon
                      isVerify={userInfo.isVerify}
                      width={42}
                      height={42}
                      showVerify
                      sx={{ position: 'absolute', right: 0, bottom: 0 }}
                    />
                  )}
                </Box>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} mt={20} mb={8}>
                  {!userInfo?.fullName && !userInfo?.fullNameId ? (
                    <Skeleton variant="rectangular" width={280} height={46} sx={{ background: 'var(--ps-gray-50)' }} />
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
                  <Box height={32} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                    <Chip
                      sx={{
                        width: 84,
                        height: '100%'
                      }}
                      label={userInfo.location}
                    />
                  </Box>
                )}
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
              <Typography variant="h3" fontSize={isSm ? 16 : 24}>
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
                background: '#F5F5F5',
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
