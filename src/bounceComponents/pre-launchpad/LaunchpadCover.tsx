import { Box, Stack, Link, styled } from '@mui/material'

import { useMemo } from 'react'

import { routes } from 'constants/routes'
import Image from 'components/Image'
import TokenImage from 'bounceComponents/common/TokenImage'
import { ChainListMap, ChainId } from 'constants/chain'

import { useOptionDatas } from 'state/configOptions/hooks'
import { IAuctionTypeMap, IBasicInfoParams, IPoolInfoParams, PoolStatus } from 'pages/launchpad/create-launchpad/type'

// import { Body02 } from 'components/Text'
import { PoolStatus as ChainPoolStatus } from 'api/pool/type'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { CardSize, InterTitle, RoundedBox, SansTitle, socialMap } from 'pages/account/AccountPrivateLaunchpad'
import useBreakpoint from 'hooks/useBreakpoint'

const MoreDataBox = ({ title, content, size }: { title: string; content: string; size: CardSize }) => {
  const isMd = useBreakpoint('md')
  return (
    <Box>
      <InterTitle sx={{ fontSize: isMd ? 12 : size === CardSize.Small ? 8 : size === CardSize.Medium ? 12 : 13 }}>
        {title}
      </InterTitle>
      <InterTitle
        mt={4}
        sx={{
          fontSize: isMd ? 14 : size === CardSize.Small ? 10 : size === CardSize.Medium ? 14 : 16,
          fontWeight: 500,
          textTransform: 'capitalize'
        }}
      >
        {content}
      </InterTitle>
    </Box>
  )
}
const LaunchpadCover = ({
  poolInfo,
  basicInfo,
  size,
  mark,
  onClick,
  approvedNum
}: {
  poolInfo: IPoolInfoParams & { opId?: number }
  basicInfo: IBasicInfoParams
  size: CardSize
  mark?: JSX.Element
  onClick?: () => void
  approvedNum?: number
}) => {
  const optionDatas = useOptionDatas()
  const curChain = useMemo(() => {
    const chainInfo = optionDatas.chainInfoOpt?.find(item => item.id === (poolInfo.opId || poolInfo.chainId))
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
  const isMd = useBreakpoint('md')
  return (
    <Row
      onClick={onClick}
      sx={[
        {
          width: '100%',
          position: 'relative',
          borderRadius: 30,
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
        },
        size === CardSize.Small && {
          height: 292,
          borderRadius: 18
        },
        size === CardSize.Medium && {
          height: 373
        },
        size === CardSize.Large && {
          height: 500
        },
        isMd && {
          flexDirection: 'column',
          height: '100%'
        }
      ]}
      mt={48}
    >
      <Box
        sx={[
          {
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          },
          size === CardSize.Small && {
            width: 375
          },
          (size === CardSize.Medium || size === CardSize.Large) && {
            width: 600
          },
          isMd && {
            width: '100%'
          }
        ]}
      >
        <Image
          className="left_banner"
          style={{ width: '100%', height: isMd ? 200 : '100%', verticalAlign: 'middle' }}
          src={poolInfo.picture2 || 'http://localhost:3000/static/media/deelance.883555954fb281ea1f93.png'}
        />
        <Row sx={{ position: 'absolute', top: 0, left: 0, gap: 8, padding: 15 }}>
          <RoundedBox>
            <TokenImage
              src={ChainListMap[poolInfo.chainId as ChainId]?.logo}
              size={size === CardSize.Small ? 15 : 24}
            />
            <SansTitle sx={{ color: '#FFF', fontSize: size === CardSize.Small ? 10 : 16 }}>
              {curChain?.chainName}
            </SansTitle>
          </RoundedBox>
          <RoundedBox sx={{ color: '#B5E529', fontSize: size === CardSize.Small ? 10 : 16 }}>
            {Object.assign({}, IAuctionTypeMap)[poolInfo.category]}
          </RoundedBox>
        </Row>
      </Box>
      <Box
        sx={{
          width: isMd ? '100%' : `calc(100% - ${size === CardSize.Small ? '375px' : '600px'})`,
          flex: 1,
          background: '#E8E9E4',
          padding: { xs: 16, md: size === CardSize.Small ? 24 : 40 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Row
          sx={{
            justifyContent: 'space-between',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            gap: isMd ? 12 : 0
          }}
        >
          <Row gap={10} sx={{ alignItems: 'center', gap: 10 }}>
            {size !== CardSize.Medium && (
              <Image
                style={{
                  width: isMd ? 40 : size === CardSize.Large ? 60 : 37,
                  height: isMd ? 40 : size === CardSize.Large ? 60 : 37,
                  borderRadius: 4
                }}
                src={
                  basicInfo.projectLogo ||
                  'https://images-v3.bounce.finance/2fb011f35fc0c258b50d44f1fb6b70c0-1683626370.png'
                }
              />
            )}
            <Stack sx={{ justifyContent: 'start', alignItems: 'start' }}>
              <SansTitle sx={{ fontSize: isMd ? 20 : size === CardSize.Small ? 17 : 28, fontWeight: 600 }}>
                {window.location.pathname === routes.launchpad.index ? basicInfo.projectName : poolInfo.name}
              </SansTitle>
              {/* {size === CardSize.Large && (
                <Body02 sx={{ color: '#121212' }}>Hiley Golbel Coin and text and the coin</Body02>
              )} */}
            </Stack>
          </Row>
          {poolInfo.status === PoolStatus.On_Chain && (
            <PoolStatusBox
              style={{ width: 'max-content', height: 'max-content' }}
              status={status}
              claimAt={poolInfo.claimAt || 0}
              closeTime={poolInfo.closeAt as number}
              openTime={poolInfo.openAt as number}
            />
          )}
        </Row>

        <Stack flexDirection={'column'} justifyContent={'space-between'} sx={{ height: '100%' }}>
          <Box sx={{ paddingLeft: 6 }} mt={isMd ? 12 : 18}>
            <InterTitle
              sx={{
                fontSize: 14,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {basicInfo.description}
            </InterTitle>
            <Row mt={10} gap={6}>
              {basicInfo?.community
                .filter(item => !!item.communityLink)
                .map((item, index) => (
                  <Link
                    sx={{ width: size === CardSize.Small ? 20 : 32, height: size === CardSize.Small ? 20 : 32 }}
                    key={item.communityName + index}
                    href={item.communityLink}
                    target="_blank"
                  >
                    <Image width={'100%'} height={'100%'} src={socialMap[item.communityName]} />
                  </Link>
                ))}
            </Row>
          </Box>
          <Stack justifyContent={'space-between'} gap={20}>
            <Box
              mt={12}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridRowGap: 8,
                paddingLeft: 6
              }}
            >
              {poolInfo.token0Name && <MoreDataBox size={size} title="Token Name" content={poolInfo.token0Name} />}
              {poolInfo.ratio && <MoreDataBox size={size} title="Token Price" content={poolInfo.ratio} />}
              {poolInfo.totalAmount0 && (
                <MoreDataBox size={size} title="Token Amount" content={poolInfo.totalAmount0} />
              )}
              {curChain && <MoreDataBox size={size} title="Blockchain / Platform" content={curChain.chainName} />}
            </Box>
            {!!approvedNum && approvedNum > 1 && !isMd && (
              <Stack pl={10} gap={8}>
                <SansTitle sx={{ fontSize: 20, fontWeight: 600 }}>Auction Pool</SansTitle>
                <SansTitle sx={{ color: '#2B51DA', fontSize: 44, fontWeight: 700 }}>{approvedNum}</SansTitle>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>

      {mark && mark}
    </Row>
  )
}
const Row = styled(Box)({
  display: 'flex',
  flexDirection: 'row'
})
export default LaunchpadCover
