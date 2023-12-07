import React, { useMemo, useState } from 'react'
import { Box, Button, Grid, Skeleton, Stack, styled, Typography } from '@mui/material'
import TokenAuctionImg from 'assets/imgs/common/TokenAuction.png'
import NFTAuctionImg from 'assets/imgs/common/NFTAuction.png'
import AdSpaceAuctionImg from 'assets/imgs/common/AdSpaceAuction.png'
import RealWorldImg from 'assets/imgs/common/RealWorld.png'
import leftArrowLightImg from 'assets/imgs/common/leftArrowLight.svg'
import leftArrowGrayImg from 'assets/imgs/common/leftArrowGray.svg'
import rightArrayLightImg from 'assets/imgs/common/rightArrayLight.svg'
import rightArrayGrayImg from 'assets/imgs/common/rightArrayGray.svg'
import { useRequest } from 'ahooks'
import { getAuctionTypeCountData, getPools } from 'api/market'
import { Link, useNavigate } from 'react-router-dom'
import { NFTCard } from 'pages/market/nftAuctionPool'
import { useOptionDatas } from 'state/configOptions/hooks'
import { routes } from 'constants/routes'
import getAuctionPoolLink from 'utils/auction/getAuctionPoolRouteLink'
import useBreakpoint from '../../hooks/useBreakpoint'
import AuctionCardFull from 'bounceComponents/common/AuctionCard/AuctionCardFull'
import { TotalAuctionIcon, TotalValueIcon, TrendingIcon } from './assets'

interface InfoBoxParams {
  title: string
  value: string
  style?: React.CSSProperties
  logo?: React.ReactNode
}

const InfoBox = (props: InfoBoxParams) => {
  const { title, value, style, logo } = props
  return (
    <Box
      sx={{
        background: 'var(--ps-text-3)',
        borderRadius: 20,
        width: 188,
        height: 98,
        ...style
      }}
    >
      {logo}
      <Typography
        sx={{
          textAlign: 'left',
          fontFamily: `'Inter'`,
          fontWeight: 600,
          fontSize: 14,
          width: '100%',
          height: '21px',
          lineHeight: '22px',
          color: '#ffffff',
          marginTop: 12,
          marginBottom: 4,
          letterSpacing: '-0.02em'
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          textAlign: 'left',
          fontFamily: `'Inter'`,
          fontWeight: 600,
          fontSize: 18,
          lineHeight: '21px',
          color: '#ffffff',
          width: '100%',
          height: '27px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.02em'
        }}
      >
        {value ? Number(value).toLocaleString() : '--'}
      </Typography>
    </Box>
  )
}

const enum AuctionType {
  TokenAuction = 'Permissionless Auction',
  NFTAuction = 'NFT Auction',
  AdSpaceAuction = 'Ad Space Auction',
  RealWorldCollectibleAuction = 'Real-World Collectible Auction'
}

type Tuple4<TItem> = [TItem, ...TItem[]] & { length: 4 }

interface PaginationParams {
  index: number
  total: number
  rotateRatioList: Tuple4<number>
  style?: React.CSSProperties
  setCurrent: (index: number) => void
  setRotateRatioList: (value: Tuple4<number>) => void
}

const ComBtn = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  cursor: 'pointer',
  background: 'transparent',
  border: '1px solid var(--ps-yellow-1)',
  '.img': {
    display: 'block',
    width: 16,
    height: 16
  },
  '.active': {
    display: 'none',
    width: 16,
    height: 16
  },
  '&:hover': {
    background: 'var(--ps-yellow-1)',
    '.img': {
      display: 'none'
    },
    '.active': {
      display: 'block'
    }
  },
  [theme.breakpoints.down('sm')]: {
    width: 44,
    height: 44
  }
}))
const RightBtn = styled(ComBtn)(({ theme }) => ({
  background: 'var(--ps-yellow-1)',
  '.img': {
    display: 'none'
  },
  '.active': {
    display: 'block'
  },
  '&:hover': {
    background: '#121212',
    '.img': {
      display: 'block'
    },
    '.active': {
      display: 'none'
    }
  },
  [theme.breakpoints.down('sm')]: {
    width: 44,
    height: 44
  }
}))
const PaginationBox = (props: PaginationParams) => {
  const { index, total, style, setCurrent, rotateRatioList, setRotateRatioList } = props
  const isSm = useBreakpoint('sm')
  const toPrev = () => {
    const result: Tuple4<number> = [...rotateRatioList] as Tuple4<number>
    const value = index - 1 < 0 ? total - 1 : index - 1
    result[index] += 180
    result[value] += 180
    setRotateRatioList(result)
    setCurrent && setCurrent(value)
  }
  const toNext = () => {
    const result: Tuple4<number> = [...rotateRatioList] as Tuple4<number>
    const value = index + 1 > total - 1 ? 0 : index + 1
    result[index] -= 180
    result[value] -= 180
    setRotateRatioList(result)
    setCurrent && setCurrent(value)
  }
  return (
    <Box
      sx={{
        padding: isSm ? 16 : 'inherit',
        width: isSm ? '100%' : 104,
        height: 60,
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: isSm ? 'center' : 'inherit',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2,
        '@media(max-width:1347px)': {
          right: 20
        },
        ...style
      }}
    >
      <ComBtn onClick={toPrev}>
        <img
          className={'img'}
          src={leftArrowLightImg}
          alt=""
          style={{
            width: 16,
            height: 16
          }}
        />
        <img
          className={'active'}
          src={leftArrowGrayImg}
          alt=""
          style={{
            width: 16,
            height: 16
          }}
        />
      </ComBtn>
      {isSm && (
        <Typography sx={{ color: '#E1F25C' }}>
          {index + 1}/{total}
        </Typography>
      )}
      <RightBtn onClick={toNext}>
        <img
          className={'img'}
          src={rightArrayLightImg}
          alt=""
          style={{
            width: 16,
            height: 16
          }}
        />
        <img
          className={'active'}
          src={rightArrayGrayImg}
          alt=""
          style={{
            width: 16,
            height: 16
          }}
        />
      </RightBtn>
    </Box>
  )
}
const TokenAuction: React.FC = () => {
  const navigate = useNavigate()
  const optionDatas = useOptionDatas()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rotateRatioList, setRotateRatioList] = useState<Tuple4<number>>([0, 180, 180, 180])
  const isSm = useBreakpoint('sm')
  const isLg = useBreakpoint('lg')
  const { data: nftPoolData, loading: nftLoading } = useRequest(async () => {
    const resp = await getPools({
      offset: 0,
      limit: 4,
      category: 0,
      chainId: 0,
      creatorAddress: '',
      creatorName: '',
      orderBy: 'openTs',
      poolId: '',
      poolName: '',
      tokenType: 2, // erc20:1, nft:2
      token0Address: ''
    })
    return {
      list: resp.data.fixedSwapNftList.list,
      total: resp.data.fixedSwapNftList.total
    }
  })
  const { data: countData } = useRequest(async () => {
    const resp = await getAuctionTypeCountData()
    return {
      data: (resp?.data && resp?.data?.stat) || []
    }
  })
  const { data, loading } = useRequest(async () => {
    const resp = await getPools({
      offset: 0,
      limit: 4,
      category: 0,
      tokenType: 1, // erc20:1, nft:2
      chainId: 0,
      creatorAddress: '',
      creatorName: '',
      orderBy: '',
      poolId: '',
      poolName: '',
      token0Address: ''
    })
    return {
      list: resp.data.fixedSwapList.list,
      total: resp.data.fixedSwapList.total
    }
  })
  const AuctionList = useMemo(() => {
    const result = [
      {
        title: AuctionType.TokenAuction,
        subTitle:
          'Experience seamless trading of digital tokens through diverse types of on-chain auctions across various blockchain ecosystems, ensuring a fair and transparent marketplace.',
        totalValue: '',
        totalAuction: '',
        trendingTokenAuction: '',
        auctionImg: TokenAuctionImg,
        checkAllLink: routes.tokenAuction.index
      },
      {
        title: AuctionType.NFTAuction,
        subTitle:
          'Dive into the world of Non-Fungible Tokens (NFTs) across multiple blockchains, offering a streamlined and secure way to buy, sell, and trade unique digital art and virtual goods within a decentralized environment.',
        totalValue: '',
        totalAuction: '',
        trendingTokenAuction: '',
        auctionImg: NFTAuctionImg,
        checkAllLink: routes.nftAuction.index
      },
      {
        title: AuctionType.AdSpaceAuction,
        subTitle:
          'Explore our innovative approach to auctioning ad spaces on websites and digital platforms, fostering a transparent, decentralized marketplace that empowers advertisers and publishers to connect and transact directly, optimizing value and efficiency.',
        totalValue: '',
        totalAuction: '',
        trendingTokenAuction: '',
        auctionImg: AdSpaceAuctionImg,
        checkAllLink: routes.adsAuction.index
      },
      {
        title: AuctionType.RealWorldCollectibleAuction,
        subTitle:
          'Discover our groundbreaking solution for auctioning real-world assets on blockchain, bridging the gap between physical and digital domains, and unlocking unprecedented opportunities for decentralized auctions of collectibles, memorabilia, and beyond.',
        totalValue: '',
        totalAuction: '',
        trendingTokenAuction: '',
        auctionImg: RealWorldImg,
        checkAllLink: routes.realAuction.index
      }
    ]
    if (countData && countData?.data && Array.isArray(countData?.data) && countData.data.length > 0) {
      countData.data.map((item, index) => {
        result[index].totalAuction = `${typeof item.totalPools === 'number' ? item.totalPools : 0}`
        result[index].totalValue = `${item.totalVolume ? item.totalVolume : 0}`
        result[index].trendingTokenAuction = `${typeof item.totalLivePools === 'number' ? item.totalLivePools : 0}`
      })
    }
    return result || []
  }, [countData])
  const showData = useMemo(() => {
    return AuctionList[currentIndex]
  }, [AuctionList, currentIndex])
  const AuctionImg = styled('img')(({}) => ({
    position: 'absolute',
    top: isSm ? 217 : 100,
    display: 'block',
    width: isSm ? 283 : 350,
    '@media(max-width:640px)': {
      left: '50%',
      transform: 'translateX(-50%)'
    },
    '@media(max-width:996px)': {
      right: 0
    },
    '@media(min-width:996px)': {
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }))

  function NftSkeleton() {
    return (
      <Box>
        <Skeleton variant="rounded" height={400} sx={{ bgcolor: 'var(--ps-gray-30)', borderRadius: 20 }} />
      </Box>
    )
  }

  function NftLink({ nft }: { nft: any }) {
    return (
      <Link to={getAuctionPoolLink(nft.id, nft.category, nft.chainId, nft.poolId)}>
        <NFTCard nft={nft} hiddenStatus={true} />
      </Link>
    )
  }

  const TokenAuctionSkeleton = () => {
    return (
      <Stack spacing={18} direction={'row'} sx={{ width: 1380, overflowX: 'scroll' }}>
        {Array.from(new Array(4)).map((lodingItem, index) => (
          <Box display={'flex'} flexDirection={'column'} key={index} flex={1}>
            <Box
              height={400}
              sx={{
                bgcolor: 'var(--ps-white)',
                borderRadius: 20,
                padding: '16px',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              <Box display="flex" width={'100%'} gap={20} sx={{ '& > span': { borderRadius: '12px' } }}>
                <Skeleton variant="rectangular" width={'15%'} height={24} />
                <Skeleton variant="rectangular" width={'25%'} height={24} />
                <Skeleton variant="rectangular" width={'60%'} height={24} />
              </Box>
              <Skeleton
                component={'div'}
                variant="rectangular"
                width={'50%'}
                height={24}
                sx={{ marginTop: '20px', borderRadius: '12px' }}
              />
              <Skeleton
                component={'div'}
                variant="rectangular"
                width={'100%'}
                height={24}
                sx={{ marginTop: '10px', borderRadius: '12px' }}
              />
              <Box mt={20} display={'flex'}>
                <Skeleton variant="circular" width={52} height={52} />
                <Box width={'calc(100% - 52px)'} sx={{ marginLeft: '10px' }}>
                  <Skeleton variant="text" width={'20%'} />
                  <Skeleton variant="text" width={'40%'} />
                </Box>
              </Box>
              <Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
              <Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
              <Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
              <Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
              <Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
            </Box>
          </Box>
        ))}
      </Stack>
    )
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        background: '#111111',
        height:
          showData.title === AuctionType.NFTAuction || showData.title === AuctionType.TokenAuction
            ? isSm
              ? 1450
              : 1288
            : isSm
            ? 850
            : 650,
        margin: '0 auto'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: showData.title === AuctionType.NFTAuction || showData.title === AuctionType.TokenAuction ? 865 : 622,
          background: '#111111',
          borderRadius: 12
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: isSm ? '100%' : 1296,
            height: 622,
            padding: isSm ? '40px 16px 20px' : '80px 0 0 0',
            margin: '0 auto',
            overflow: 'hidden',
            '@media(max-width:1360px)': {
              paddingLeft: 20
            }
          }}
        >
          <Typography
            sx={{
              textAlign: 'left',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: isSm ? 24 : 44,
              width: '100%',
              lineHeight: '32px',
              color: 'var(--ps-yellow-1)',
              marginBottom: 20,
              letterSpacing: '-0.02em'
            }}
          >
            {showData.title}
          </Typography>
          <Typography
            sx={{
              textAlign: 'left',
              width: '100%',
              maxWidth: 420,
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: isSm ? 14 : 16,
              lineHeight: '21px',
              color: 'var(--ps-primary)',
              marginBottom: 20,
              letterSpacing: '-0.02em'
            }}
          >
            {showData.subTitle}
          </Typography>
          {!isSm && (
            <Typography
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 110,
                textAlign: 'right',
                fontFamily: `'Inter'`,
                fontWeight: 400,
                fontSize: 14,
                width: 200,
                lineHeight: '20px',
                color: 'var(--ps-yellow-1)',
                '@media(max-width:1347px)': {
                  right: 20
                }
              }}
            >
              {`${currentIndex + 1} / ${AuctionList.length}`}
            </Typography>
          )}
          {!isSm && (
            <Box
              sx={{
                '@media(max-width:1360px)': {
                  '&>div:nth-child(1)': {
                    left: 20
                  },
                  '&>div:nth-child(2)': {
                    left: 130
                  },
                  '&>div:nth-child(3)': {
                    left: 20
                  }
                }
              }}
            >
              <InfoBox
                title={'Trending Token Auction'}
                value={showData.trendingTokenAuction}
                logo={<TrendingIcon />}
                style={{
                  position: 'absolute',
                  width: 220,
                  color: '#ffffff',
                  marginBottom: 30,
                  bottom: 161,
                  left: 0
                }}
              />
              <InfoBox
                title={'Total Value'}
                value={showData.totalValue}
                logo={<TotalValueIcon />}
                style={{
                  position: 'absolute',
                  bottom: 48,
                  left: 0
                }}
              />
              <InfoBox
                title={'Total Auction'}
                value={showData.totalAuction}
                logo={<TotalAuctionIcon />}
                style={{
                  position: 'absolute',
                  bottom: 48,
                  left: 220
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              position: 'absolute',
              bottom: isSm ? '-80%' : '-70%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 763,
              height: 763
            }}
          >
            <Box position="relative">
              <Box
                sx={{
                  width: 763,
                  height: 763,
                  borderRadius: '50%',
                  border: '1px solid var(--ps-yellow-1)',
                  opacity: 0.6
                }}
              ></Box>
              <Box
                position="absolute"
                sx={{
                  top: '30%',
                  left: 0,
                  width: '100%',
                  height: 100,
                  display: 'block',
                  background: isSm ? undefined : 'linear-gradient(0deg, rgba(17,17,17,100) 40%, rgba(17,17,17,0) 100%);'
                }}
              ></Box>
            </Box>
          </Box>
          {/* Token Auction */}
          <Box
            sx={{
              position: 'absolute',
              width: 763,
              height: isSm ? 600 : 622,
              top: isSm ? 600 : 622,
              left: '50%',
              transform: `translateX(-50%) translateY(-100%) rotateZ(${rotateRatioList[0]}deg)`,
              transformOrigin: 'bottom center',
              transition: 'all 1s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <AuctionImg src={AuctionList[0].auctionImg} alt="" />
          </Box>
          {/* NFT Auctioin */}
          <Box
            sx={{
              position: 'absolute',
              width: 763,
              height: isSm ? 600 : 622,
              top: isSm ? 600 : 622,
              left: '50%',
              transform: `translateX(-50%) translateY(-100%) rotateZ(${rotateRatioList[1]}deg)`,
              transformOrigin: 'bottom center',
              transition: 'all 1s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <AuctionImg src={AuctionList[1].auctionImg} alt="" />
          </Box>
          {/* Real World Auction */}
          <Box
            sx={{
              position: 'absolute',
              width: 763,
              height: 622,
              top: isSm ? 600 : 622,
              left: '50%',
              transform: `translateX(-50%) translateY(-100%) rotateZ(${rotateRatioList[2]}deg)`,
              transformOrigin: 'bottom center',
              transition: 'all 1s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <AuctionImg src={AuctionList[2].auctionImg} alt="" />
          </Box>
          {/* Ad Space Auction */}
          <Box
            sx={{
              position: 'absolute',
              width: 763,
              height: 622,
              top: isSm ? 600 : 622,
              left: '50%',
              transform: `translateX(-50%) translateY(-100%) rotateZ(${rotateRatioList[3]}deg)`,
              transformOrigin: 'bottom center',
              transition: 'all 1s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <AuctionImg src={AuctionList[3].auctionImg} alt="" />
          </Box>
          {!isSm && (
            <PaginationBox
              rotateRatioList={rotateRatioList}
              index={currentIndex}
              total={AuctionList.length}
              setCurrent={setCurrentIndex}
              setRotateRatioList={setRotateRatioList}
              style={
                isSm
                  ? {
                      position: 'absolute',
                      bottom: '30px',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }
                  : {
                      position: 'absolute',
                      bottom: 80,
                      right: 0
                    }
              }
            />
          )}
        </Box>
      </Box>
      {isSm && (
        <>
          <Box
            sx={{
              '@media(max-width:1360px)': {
                '&>div:nth-child(1)': {
                  left: 20
                },
                '&>div:nth-child(2)': {
                  left: 130
                },
                '&>div:nth-child(3)': {
                  left: 20
                }
              },
              width: '100%',
              padding: '0 16px',
              position: 'absolute',
              left: 0,
              bottom:
                showData.title === AuctionType.NFTAuction || showData.title === AuctionType.TokenAuction ? 710 : 145,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr'
            }}
          >
            <InfoBox
              title={'Trending Token Auction'}
              value={showData.trendingTokenAuction}
              logo={<TrendingIcon />}
              style={{
                width: 220,
                color: '#ffffff',
                marginBottom: 30,
                gridColumn: '1 /span 2',
                background: 'transparent'
              }}
            />
            <InfoBox
              title={'Total Value'}
              value={showData.totalValue}
              logo={<TotalValueIcon />}
              style={{
                background: 'transparent'
              }}
            />
            <InfoBox
              title={'Total Auction'}
              value={showData.totalAuction}
              logo={<TotalAuctionIcon />}
              style={{
                background: 'transparent'
              }}
            />
          </Box>
          <PaginationBox
            rotateRatioList={rotateRatioList}
            index={currentIndex}
            total={AuctionList.length}
            setCurrent={setCurrentIndex}
            setRotateRatioList={setRotateRatioList}
            style={
              isSm
                ? {
                    position: 'absolute',
                    bottom:
                      showData.title === AuctionType.NFTAuction || showData.title === AuctionType.TokenAuction
                        ? 605
                        : 40,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }
                : {
                    position: 'absolute',
                    bottom: 80,
                    right: 0
                  }
            }
          />
        </>
      )}
      {(showData.title === AuctionType.NFTAuction || showData.title === AuctionType.TokenAuction) && (
        <>
          <Box
            sx={{
              position: 'absolute',
              minHeight: 496,
              width: 1296,
              top: isSm ? 870 : 622,
              borderRadius: 30,
              margin: '0 auto',
              padding: isSm ? '24px 16px' : 0,
              transform: 'translateX(-50%)',
              left: '50%',
              '@media(max-width:600px)': {
                left: 0,
                width: '100%',
                transform: 'none'
              }
            }}
          >
            <Box
              sx={{
                minHeight: isSm ? 300 : 368,
                marginBottom: isSm ? 0 : 24
              }}
            >
              {showData.title === AuctionType.NFTAuction && (
                <>
                  {nftLoading &&
                    (isSm ? (
                      <Stack spacing={18} direction={'row'} sx={{ overflowX: 'scroll' }}>
                        {Array.from(new Array(4)).map((_, index) => (
                          <NftSkeleton key={index} />
                        ))}
                      </Stack>
                    ) : (
                      <Grid container spacing={18}>
                        {Array.from(new Array(4)).map((_, index) => (
                          <Grid item key={index} xs={3}>
                            <NftSkeleton />
                          </Grid>
                        ))}
                      </Grid>
                    ))}
                  {isLg ? (
                    <Box
                      sx={{
                        width: '100%',
                        overflowX: 'scroll',
                        '&::-webkit-scrollbar': {
                          display: 'none'
                        }
                      }}
                    >
                      <Stack gap={18} direction={'row'} sx={{ minWidth: 1440, '&>a': { flex: 1 } }}>
                        {optionDatas?.chainInfoOpt &&
                          nftPoolData?.list.map((nft: any, i: number) => <NftLink nft={nft} key={i} />)}
                      </Stack>
                    </Box>
                  ) : (
                    <Grid container spacing={18}>
                      {optionDatas?.chainInfoOpt &&
                        nftPoolData?.list.map((nft: any, i: number) => (
                          <Grid key={i} xs={3} item>
                            <Link to={getAuctionPoolLink(nft.id, nft.category, nft.chainId, nft.poolId)}>
                              <NFTCard nft={nft} hiddenStatus={true} isDark />
                            </Link>
                          </Grid>
                        ))}
                    </Grid>
                  )}
                </>
              )}
              {showData.title === AuctionType.TokenAuction && (
                <>
                  {loading ? (
                    <TokenAuctionSkeleton />
                  ) : (
                    <Stack
                      spacing={isSm ? 8 : 24}
                      direction={'row'}
                      sx={{
                        maxWidth: isSm ? '100%' : 1296,
                        overflowX: 'scroll',
                        '&::-webkit-scrollbar': {
                          display: 'none'
                        }
                      }}
                    >
                      {data?.list?.map((fixedSwaptem: any, index: number) => (
                        <AuctionCardFull
                          key={index}
                          isDark
                          style={{
                            maxWidth: 306,
                            minWidth: 306,
                            gap: 20,
                            boxSizing: 'border-box'
                          }}
                          auctionPoolItem={fixedSwaptem}
                        />
                      ))}
                    </Stack>
                  )}
                </>
              )}
            </Box>
            <Box
              sx={{
                maxWidth: isSm ? '100%' : 1296,
                width: isSm ? 'calc(100% - 32px)' : '100%',
                display: 'flex',
                marginTop: isSm ? '24px' : 'unset',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                '@media(max-width:1440px)': {
                  width: '100vw'
                }
              }}
            >
              <Button
                onClick={() => navigate(AuctionList[currentIndex].checkAllLink)}
                variant="contained"
                sx={{
                  width: isSm ? 'calc(100% - 32px)' : '100%',
                  borderRadius: '100px',
                  padding: '16px 20px',
                  fontWeight: 500,
                  fontSize: 24,
                  border: '1px solid var(--ps-yellow-1)',
                  '&:hover': { color: 'var(--ps-yellow-1)', borderColor: 'var(--ps-yellow-1)' }
                }}
              >
                View all auctions
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default TokenAuction
