import { Box, Button, Link, Stack, Typography, styled } from '@mui/material'
import { IPoolInfoParams, IBasicInfoParams, IAuctionTypeMap, PoolStatus } from '../create-launchpad/type'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Image from 'components/Image'
import { socialMap } from 'pages/account/AccountPrivateLaunchpad'
import { ReactComponent as IconBook } from 'assets/svg/icon-book.svg'
import { useOptionDatas } from 'state/configOptions/hooks'
import { useMemo } from 'react'
import TokenImage from 'bounceComponents/common/TokenImage'
import { PoolStatus as ChainPoolStatus } from 'api/pool/type'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { matchPath, useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
export enum HeadLayout {
  CENTER = 1,
  SPACE = 2
}
interface IHeadProps {
  poolInfo: IPoolInfoParams
  basicInfo: IBasicInfoParams
  headLayout?: HeadLayout
}
const LaunchpadHead = ({ poolInfo, basicInfo, headLayout }: IHeadProps) => {
  const isLaunchpadPartyRoute = matchPath(routes.launchpad.account.launchpadParty, window.location.pathname)
  const isLaunchpadDetailRoute = matchPath(routes.launchpad.account.launchpadDetail, window.location.pathname)

  const optionDatas = useOptionDatas()
  const curChain = useMemo(() => {
    const chainInfo = optionDatas.chainInfoOpt?.find(item => item.id === poolInfo.chainId)
    return chainInfo
  }, [optionDatas, poolInfo])
  const { openAt, closeAt } = poolInfo
  const status = useMemo(() => {
    const cur = new Date().valueOf() / 1000
    if (!openAt || !closeAt) return ChainPoolStatus.Upcoming
    if (cur < openAt) return ChainPoolStatus.Upcoming
    if (cur >= openAt && cur <= closeAt) return ChainPoolStatus.Live
    return ChainPoolStatus.Closed
  }, [openAt, closeAt])
  if (poolInfo.status === PoolStatus.On_Chain && !!isLaunchpadDetailRoute) {
    headLayout = HeadLayout.SPACE
  } else {
    headLayout = HeadLayout.CENTER
  }
  return (
    <Box sx={{ position: 'relative', height: 600, width: '100%', padding: '0 35px', marginTop: '-76px' }}>
      <img
        src={poolInfo.picture1}
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: -2,
          filter: 'blur(50px)',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      <Stack
        justifyContent={'space-between'}
        sx={{
          height: '100%',
          paddingTop: '80px',
          background: `url(${poolInfo.picture1})`,
          backgroundSize: 'cover',
          objectFit: 'scale-down',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: '0 0 20px 20px'
        }}
      >
        <Stack
          flexDirection={headLayout === HeadLayout.CENTER ? 'row' : 'column'}
          px={40}
          justifyContent={'space-between'}
          gap={headLayout === HeadLayout.SPACE ? 20 : 0}
        >
          <Stack flexDirection={'row'} justifyContent={'flex-start'}>
            {/* <TextBox title="Preview" color="#E1F25C" /> */}
            {!!isLaunchpadPartyRoute && <HomeBtn />}
          </Stack>
          <Stack flexDirection={'row'} justifyContent={'flex-end'}>
            {poolInfo.status !== PoolStatus.On_Chain && <TextBox title="Coming soon" color="#fff" />}
            {poolInfo.status === PoolStatus.On_Chain && (
              <PoolStatusBox
                style={{ width: 'max-content', height: 'max-content' }}
                status={status}
                claimAt={poolInfo.claimAt || 0}
                closeTime={poolInfo.closeAt as number}
                openTime={poolInfo.openAt as number}
              />
            )}
          </Stack>
        </Stack>
        <Stack
          gap={32}
          sx={{
            padding: '0px 40px 40px',
            borderRadius: '20px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #000000 100%)'
          }}
        >
          {headLayout === HeadLayout.SPACE && (
            <SansTitle sx={{ fontSize: 44, fontWeight: 700, color: '#fff' }}>{poolInfo.name}</SansTitle>
          )}
          <Stack
            gap={16}
            // justifyContent={'center'}
            alignItems={'center'}
            flexDirection={headLayout === HeadLayout.CENTER ? 'column' : 'row'}
          >
            <Image src={basicInfo.projectLogo} style={{ width: 60, height: 60, borderRadius: '6px' }} />
            <Stack
              gap={headLayout === HeadLayout.CENTER ? 14 : 0}
              justifyContent={'center'}
              alignItems={headLayout === HeadLayout.CENTER ? 'center' : 'flex-start'}
            >
              <SansTitle sx={{ fontSize: headLayout === HeadLayout.CENTER ? 44 : 16, fontWeight: 700, color: '#fff' }}>
                {basicInfo.projectName}
              </SansTitle>
              <InterTitle
                sx={{ fontSize: headLayout === HeadLayout.CENTER ? 16 : 13, color: '#D7D6D9', maxWidth: 800 }}
              >
                {basicInfo.description}
              </InterTitle>
            </Stack>
          </Stack>
          <Stack gap={16}>
            <Stack
              flexDirection={'row'}
              gap={16}
              justifyContent={headLayout === HeadLayout.CENTER ? 'center' : 'flex-end'}
            >
              {basicInfo?.community
                .filter(item => !!item.communityLink)
                .map((item, index) => (
                  <Link
                    sx={{ width: 32, height: 32 }}
                    key={item.communityName + index}
                    href={item.communityLink}
                    target="_blank"
                  >
                    <Image width={'100%'} height={'100%'} src={socialMap[item.communityName]} />
                  </Link>
                ))}
              {basicInfo.whitepaperLink && (
                <WhiteButton
                  onClick={() => {
                    window.open(basicInfo.whitepaperLink, '_blank')
                  }}
                >
                  <IconBook />
                  <SansTitle sx={{ color: '#20201E' }}>Whitepaper</SansTitle>
                </WhiteButton>
              )}
            </Stack>
            <Stack
              flexDirection={'row'}
              justifyContent={headLayout === HeadLayout.CENTER ? 'center' : 'flex-end'}
              alignItems={'center'}
              gap={16}
            >
              <Stack
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ padding: '4px 14px', background: 'rgba(18, 18, 18, 0.60)', borderRadius: '100px' }}
                gap={10}
              >
                <TokenImage src={(poolInfo.token0Logo as string) || (poolInfo.token0Symbol as string)} size={24} />
                <SansTitle sx={{ color: '#fff ' }}>{poolInfo.token0Name}</SansTitle>
              </Stack>
              <Box sx={{ padding: '4px 14px', background: 'rgba(18, 18, 18, 0.60)', borderRadius: '100px' }}>
                <SansTitle sx={{ color: '#B5E529' }}>{Object.assign({}, IAuctionTypeMap)[poolInfo.category]}</SansTitle>
              </Box>
            </Stack>
            {headLayout === HeadLayout.CENTER && (
              <Stack flexDirection={'row'} gap={24} alignItems={'center'} justifyContent={'center'}>
                {poolInfo.token0Name && (
                  <>
                    <Stack gap={8}>
                      <InterTitle sx={{ color: '#D7D6D9', fontSize: 14 }}>Token Name</InterTitle>
                      <SansTitle sx={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>{poolInfo.token0Name}</SansTitle>
                    </Stack>
                    <VerticalLine />
                  </>
                )}
                {poolInfo.ratio && (
                  <>
                    <Stack gap={8}>
                      <InterTitle sx={{ color: '#D7D6D9', fontSize: 14 }}>Token Price</InterTitle>
                      <SansTitle sx={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>{poolInfo.ratio}</SansTitle>
                    </Stack>
                    <VerticalLine />
                  </>
                )}

                {poolInfo.totalAmount0 && (
                  <>
                    <Stack gap={8}>
                      <InterTitle sx={{ color: '#D7D6D9', fontSize: 14 }}>Token Amount</InterTitle>
                      <SansTitle sx={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>
                        {poolInfo.totalAmount0}
                      </SansTitle>
                    </Stack>
                    <VerticalLine />
                  </>
                )}
                {poolInfo.chainId && (
                  <>
                    <Stack gap={8}>
                      <InterTitle sx={{ color: '#D7D6D9', fontSize: 14 }}>Blockchain / Platform</InterTitle>
                      <SansTitle sx={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>
                        {curChain && curChain.chainName}
                      </SansTitle>
                    </Stack>
                    <VerticalLine />
                  </>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
// const ProjectIntro = () => {
//   return <Box></Box>
// }
const TextBox = ({ title, color }: { title: string; color: string }) => {
  return (
    <GrayBox>
      <SansTitle sx={{ color: color }}>{title}</SansTitle>
    </GrayBox>
  )
}
const HomeBtn = () => {
  const nav = useNavigate()
  return (
    <GrayButton onClick={() => nav(routes.launchpad.index)}>
      <ArrowBackIcon />
      <Typography variant={'h5'}>Launchpad homepage</Typography>
    </GrayButton>
  )
}
const SansTitle = styled(Typography)({
  fontFamily: 'Public Sans',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '150%',
  letterSpacing: '-0.28px'
})
const InterTitle = styled(Typography)({
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '150%'
})
const GrayBox = styled(Box)({
  width: 'max-content',
  height: 'max-content',
  padding: '4px 12px',
  background: 'rgba(18, 18, 18, 0.20)',
  borderRadius: '100px'
})
export const GrayButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 12px 20px;
  gap: 12px;
  width: fit-content;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 8px;

  :hover {
    background: rgba(255, 255, 255, 0.2);
    border: none;
  }
`
const WhiteButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
  width: fit-content;
  height: 32px;
  background: #ffffff;
  border-radius: 8px;
`
const VerticalLine = styled(Box)({
  width: 1,
  height: 32,
  background: 'rgba(255, 255, 255, 0.60)',
  '&:last-child': {
    display: 'none'
  }
})
export default LaunchpadHead
