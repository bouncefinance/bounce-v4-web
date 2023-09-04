import { Box, Button, Link, Stack, Typography, styled } from '@mui/material'
import { IPoolInfoParams, IBasicInfoParams, IAuctionTypeMap } from '../create-launchpad/type'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Image from 'components/Image'
import { socialMap } from 'pages/account/AccountPrivateLaunchpad'
import { ReactComponent as IconBook } from 'assets/svg/icon-book.svg'
import { useOptionDatas } from 'state/configOptions/hooks'
import { useMemo } from 'react'
import TokenImage from 'bounceComponents/common/TokenImage'
interface IHeadProps {
  poolInfo: IPoolInfoParams
  basicInfo: IBasicInfoParams
}
const LaunchpadHead = ({ poolInfo, basicInfo }: IHeadProps) => {
  const optionDatas = useOptionDatas()
  const curChain = useMemo(() => {
    const chainInfo = optionDatas.chainInfoOpt?.find(item => item.id === poolInfo.chainId)
    return chainInfo
  }, [optionDatas, poolInfo])
  console.log('poolInfo', poolInfo)

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
          borderRadius: '20px'
        }}
      >
        <Stack flexDirection={'row'} px={40} justifyContent={'space-between'}>
          <Stack flexDirection={'row'}>
            <TextBox title="Preview" color="#E1F25C" />
            <HomeBtn />
          </Stack>
          <Stack flexDirection={'row'}>
            <TextBox title="Coming soon" color="#fff" />
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
          <Stack gap={16} justifyContent={'center'} alignItems={'center'}>
            <Image src={basicInfo.projectLogo} style={{ width: 60, height: 60, borderRadius: '6px' }} />
            <Stack gap={14} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
              <SansTitle sx={{ fontSize: 44, fontWeight: 700, color: '#fff' }}>{basicInfo.projectName}</SansTitle>
              <InterTitle sx={{ color: '#D7D6D9', maxWidth: 800 }}>{basicInfo.description}</InterTitle>
            </Stack>
          </Stack>
          <Stack gap={16}>
            <Stack flexDirection={'row'} gap={16} justifyContent={'center'}>
              {basicInfo?.community
                .filter(item => !!item.communityLink)
                .map(item => (
                  <Link
                    sx={{ width: 32, height: 32 }}
                    key={item.communityLink}
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
            <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'} gap={16}>
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
                    <SansTitle sx={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>{poolInfo.totalAmount0}</SansTitle>
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
  return (
    <GrayButton>
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
