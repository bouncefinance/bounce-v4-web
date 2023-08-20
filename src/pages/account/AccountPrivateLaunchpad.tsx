import { Box, Button, Container, Stack, Typography, styled, Link, Pagination } from '@mui/material'
import { Add } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import { useEffect, useMemo, useState } from 'react'
import tabStyles from './tabStyles'
import ChainSelect from 'bounceComponents/common/ChainSelect'
import AuctionTypeSelect from 'bounceComponents/common/AuctionTypeSelect'
import { PoolType } from 'api/pool/type'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import Image from 'components/Image'
import TokenImage from 'bounceComponents/common/TokenImage'
import { ChainListMap, ChainId } from 'constants/chain'
// import { AuctionProgressPrimaryColor } from 'constants/auction/color'
import useBreakpoint from 'hooks/useBreakpoint'
import { usePagination } from 'ahooks'
import { getUserLaunchpadInfo } from 'api/user'
import { Params } from 'ahooks/lib/usePagination/types'
import { getLabelById } from 'utils'
import { useActiveWeb3React } from 'hooks'
import { useOptionDatas } from 'state/configOptions/hooks'
import { IBasicInfoParams, IPoolInfoParams } from 'pages/launchpad/create-launchpad/type'
import Twitter from 'assets/imgs/auction/round-icon-twitter.svg'
import Telegram from 'assets/imgs/common/Telegram.png'
import Facebook from 'assets/imgs/common/Facebook-Blue-Logo.svg'
import YouTube from 'assets/imgs/common/YouTube-Icon-Full.svg'
import Medium from 'assets/imgs/common/Medium.png'
import Discord from 'assets/socialLinksIcon/Discord.svg'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import EmptyData from 'bounceComponents/common/EmptyData'
import ShowDetailIcon from 'assets/imgs/auction/show-detail-icon.svg'
import EditDetailIcon from 'assets/imgs/auction/edit-detail-icon.svg'
enum ETabList {
  All = 'All',
  Upcoming = 'Upcoming',
  Live = 'Live',
  Close = 'Close'
}

const socialMap: { [key: string]: string } = {
  twitter: Twitter,
  telegram: Telegram,
  facebook: Facebook,
  youTube: YouTube,
  medium: Medium,
  discord: Discord
}
const MoreDataBox = ({ title, content }: { title: string; content: string }) => {
  return (
    <Box>
      <InterTitle sx={{ fontSize: 8 }}>{title}</InterTitle>
      <InterTitle mt={4} sx={{ fontSize: 10, fontWeight: 500 }}>
        {content}
      </InterTitle>
    </Box>
  )
}
const tabList = [ETabList.All, ETabList.Close, ETabList.Live, ETabList.Upcoming]

const LaunchpadCard = ({ poolInfo, basicInfo }: { poolInfo: IPoolInfoParams; basicInfo: IBasicInfoParams }) => {
  const optionDatas = useOptionDatas()

  const chainName = useMemo(() => {
    const chainInfo = optionDatas.chainInfoOpt?.find(item => item.ethChainId === poolInfo.chainId)
    return chainInfo?.chainName
  }, [optionDatas, poolInfo])
  return (
    <Row
      sx={{
        position: 'relative',
        height: 292,
        borderRadius: 18,
        overflow: 'hidden',
        cursor: 'pointer',
        '& .mask': {
          display: 'none'
        },
        '& .left_banner': {
          transform: 'scale(1)',
          transition: 'all .6s'
        },
        '&:hover': {
          '& .mask': {
            display: 'block'
          },
          '& .left_banner': {
            transform: 'scale(1.2)'
          }
        }
      }}
      mt={48}
    >
      <Box
        sx={{
          width: 375,
          height: 292,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Image
          className="left_banner"
          style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }}
          src={poolInfo.picture2 || 'http://localhost:3000/static/media/deelance.883555954fb281ea1f93.png'}
        />
        <Row sx={{ position: 'absolute', top: 0, left: 0, gap: 8, padding: 15 }}>
          <RoundedBox>
            <TokenImage src={ChainListMap[poolInfo.chainId as ChainId]?.logo} size={15} />
            <SansTitle sx={{ color: '#FFF', fontSize: 10 }}>
              {ChainListMap[poolInfo.chainId as ChainId]?.name}
            </SansTitle>
          </RoundedBox>
          <RoundedBox sx={{ color: '#B5E529', fontSize: 10 }}>{PoolType[poolInfo.category]}</RoundedBox>
        </Row>
      </Box>
      <Box sx={{ flex: 1, background: '#E8E9E4', padding: 24 }}>
        <Row sx={{ justifyContent: 'space-between' }}>
          <Row gap={10} sx={{ alignItems: 'center', gap: 10 }}>
            <Image
              style={{ width: 37, height: 37, borderRadius: 4 }}
              src={
                basicInfo.projectLogo ||
                'https://images-v3.bounce.finance/2fb011f35fc0c258b50d44f1fb6b70c0-1683626370.png'
              }
            />
            <SansTitle sx={{ fontSize: 17, fontWeight: 600 }}>{basicInfo.projectName}</SansTitle>
          </Row>
          {/* <Box>
            <RoundedBox sx={{ color: AuctionProgressPrimaryColor[1] }}>Upcoming in 32h : 12m : 10s</RoundedBox>
          </Box> */}
        </Row>

        <Box sx={{ paddingLeft: 6 }} mt={18}>
          <InterTitle
            sx={{
              fontSize: 14,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {basicInfo.description}
          </InterTitle>
          <Row
            mt={10}
            gap={6}
            sx={{
              '&>a': {
                width: 20,
                height: 20
              },
              '&>a>svg': {
                width: 20,
                height: 20
              }
            }}
          >
            {basicInfo.community
              .filter(item => !!item.communityLink)
              .map(item => (
                <Link key={item.communityLink} href={item.communityLink} target="_blank">
                  <Image width={20} height={20} src={socialMap[item.communityName]} />
                </Link>
              ))}
          </Row>
        </Box>
        <Box
          mt={12}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridRowGap: 8,
            paddingLeft: 6
          }}
        >
          {poolInfo.token0Name && <MoreDataBox title="Token Name" content={poolInfo.token0Name} />}
          {poolInfo.ratio && <MoreDataBox title="Token Price" content={poolInfo.ratio} />}
          {poolInfo.totalAmount0 && <MoreDataBox title="Token Amount" content={poolInfo.totalAmount0} />}
          {chainName && <MoreDataBox title="Blockchain / Platform" content={chainName} />}
        </Box>
      </Box>
      <Box
        className="mask"
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          background: 'rgba(23, 23, 23, 0.30)'
        }}
      >
        <Stack
          sx={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 74
          }}
        >
          <Image src={ShowDetailIcon} />
          <Link href={`${routes.thirdPart.CreateLaunchpad}?tab=2&id=${poolInfo.id}`}>
            <Image src={EditDetailIcon} />
          </Link>
        </Stack>
      </Box>
    </Row>
  )
}
const defaultPageSize = 4
export default function AccountPrivateLaunchpad() {
  const [curTab, setCurTab] = useState(ETabList.All)
  const [curChain, setCurChain] = useState(0)
  const [curPoolType, setCurPoolType] = useState<PoolType | 0>(0)
  const navigate = useNavigate()
  const { account } = useActiveWeb3React()
  const optionDatas = useOptionDatas()
  const isSm = useBreakpoint('sm')
  const { loading, data, pagination } = usePagination<any, Params>(
    async ({ current, pageSize }) => {
      const chainInfoOptId = optionDatas?.chainInfoOpt?.find(item => item.ethChainId === curChain)
      if (!account) {
        return {
          total: 0,
          list: [],
          basicInfo: {}
        }
      }
      const res = await getUserLaunchpadInfo({
        limit: pageSize,
        offset: (current - 1) * pageSize,
        chainId: chainInfoOptId?.id,
        category: curPoolType
      })
      return {
        list: res.data.list.map(i => {
          const ethChainId = getLabelById(i.chainId, 'ethChainId', optionDatas?.chainInfoOpt || [])
          return { ...i, chainId: ethChainId }
        }),
        total: res.data.total,
        basicInfo: res.data.basicInfo as IBasicInfoParams
      }
    },
    {
      defaultPageSize,
      ready: !!account,
      refreshDeps: [account, curChain, curPoolType],
      debounceWait: 100
    }
  )
  const handlePageChange = (_: any, p: number) => {
    pagination.changeCurrent(p)
  }
  useEffect(() => {
    pagination.changeCurrent(1)
    console.log('curPoolType', curPoolType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, curPoolType, curChain])
  console.log(' loading, data')
  console.log(loading)
  console.log(data)
  console.log(pagination)

  return (
    <AccountLayout>
      <Box padding="40px 20px">
        <Container
          sx={{
            maxWidth: '1080px !important',
            position: 'relative'
          }}
        >
          <Typography variant="h3" fontSize={isSm ? 22 : 36} fontFamily={'Public Sans'} fontWeight={600}>
            Private Launchpad
          </Typography>
          <Row sx={{ justifyContent: 'flex-start' }} mt={28}>
            {tabList.map((item, index) => (
              <Typography
                onClick={() => setCurTab(item)}
                sx={{
                  ...tabStyles.menu,
                  ...(item === curTab ? tabStyles.menuActive : ({} as any)),
                  padding: '16px 32px 12px 32px',
                  fontFamily: 'Public Sans',
                  borderRadius: '12px 12px 0px 0px'
                }}
                key={index}
              >
                {item}
              </Typography>
            ))}
          </Row>
          <Box
            sx={{
              height: '100%',
              padding: '48px 40px',
              background: '#F6F6F3'
            }}
          >
            <Row sx={{ justifyContent: 'space-between' }}>
              <Row sx={{ gap: 8 }}>
                <AuctionTypeSelect curPoolType={curPoolType} setCurPoolType={v => setCurPoolType(v)} />
                <ChainSelect curChain={curChain} setCurChain={i => setCurChain(i)} />
              </Row>
              <Stack flexDirection={'row'} gap={20}>
                <Button
                  sx={{ height: 44 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(routes.thirdPart.CreateLaunchpad)}
                >
                  <EditIcon /> Edit BasicInfo
                </Button>
                <Button
                  sx={{ height: 44 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(routes.thirdPart.CreateLaunchpad)}
                >
                  <Add /> Create a pool
                </Button>
              </Stack>
            </Row>
            {loading ? (
              <Box
                sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <BounceAnime />
              </Box>
            ) : !loading && data && data.list.length > 0 ? (
              <>
                <Stack sx={{ flexDirection: 'column', gap: 48 }}>
                  {data?.list.map((item: IPoolInfoParams) => (
                    <LaunchpadCard key={item.id} poolInfo={item} basicInfo={data.basicInfo} />
                  ))}
                </Stack>
                <Stack mt={48} alignItems={'center'}>
                  <Pagination
                    onChange={handlePageChange}
                    page={pagination.current}
                    count={Math.ceil((data?.total || 0) / (defaultPageSize || 0))}
                  />
                </Stack>
              </>
            ) : (
              <EmptyData />
            )}
          </Box>
        </Container>
      </Box>
    </AccountLayout>
  )
}

const Row = styled(Box)({
  display: 'flex',
  flexDirection: 'row'
})
const RoundedBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '2px 9px',
  background: 'rgba(18, 18, 18, 0.60)',
  borderRadius: 62
})
const SansTitle = styled(Typography)({
  color: '#121212',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '150%',
  letterSpacing: -0.2
})
const InterTitle = styled(Typography)({
  color: '#121212',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '150%',
  fontFeatureSettings: 'calt',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textEdge: 'cap',
  textTransform: 'lowercase',
  leadingTrim: 'both'
})
