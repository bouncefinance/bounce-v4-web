import React, { useState, useMemo, useEffect } from 'react'
import { Box, Grid, Typography, Button, Skeleton, Stack } from '@mui/material'
import TokenAuctionImg from 'assets/imgs/common/TokenAuction.png'
import NFTAuctionImg from 'assets/imgs/common/NFTAuction.png'
import AdSpaceAuctionImg from 'assets/imgs/common/AdSpaceAuction.png'
import RealWorldImg from 'assets/imgs/common/RealWorld.png'
import leftArrowLightImg from 'assets/imgs/common/leftArrowLight.svg'
import leftArrowGrayImg from 'assets/imgs/common/leftArrowGray.svg'
import rightArrayLightImg from 'assets/imgs/common/rightArrayLight.svg'
import rightArrayGrayImg from 'assets/imgs/common/rightArrayGray.svg'
import { useRequest } from 'ahooks'
import { getPools, getAuctionTypeCountData } from 'api/market'
import { Link } from 'react-router-dom'
import { NFTCard } from 'pages/market/nftAuctionPool'
import { useOptionDatas } from 'state/configOptions/hooks'
import { routes } from 'constants/routes'
import { getLabelById, shortenAddress } from 'utils'
import AuctionCard, { AuctionHolder, AuctionListItem } from 'bounceComponents/common/AuctionCard'
import TokenImage from 'bounceComponents/common/TokenImage'
import Image from 'components/Image'
import BigNumber from 'bignumber.js'
import ErrorSVG from 'assets/imgs/icon/error_filled.svg'
import CoingeckoSVG from 'assets/imgs/chains/coingecko.svg'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { PoolType } from 'api/pool/type'

interface InfoBoxParams {
  title: string
  value: string
  style?: React.CSSProperties
}
const InfoBox = (props: InfoBoxParams) => {
  const { title, value, style } = props
  return (
    <Box
      sx={{
        background: 'var(--ps-text-3)',
        borderRadius: 20,
        width: 110,
        height: 81,
        padding: 12,
        ...style
      }}
    >
      <Typography
        sx={{
          textAlign: 'left',
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: 14,
          width: '100%',
          height: '21px',
          lineHeight: '21px',
          color: 'var(--ps-text-1)',
          marginBottom: 12,
          letterSpacing: '-0.02em'
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          textAlign: 'right',
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: 14,
          lineHeight: '21px',
          color: 'var(--ps-text-1)',
          width: '100%',
          height: '21px',
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
  TokenAuction = 'Token Auction',
  NFTAuction = 'NFT Auction',
  AdSpaceAuction = 'Ad Space Auction',
  RealWorldCollectibleAuction = 'Real-World Collectible Auction'
}
const poolType: Record<PoolType, string> = {
  [PoolType.FixedSwap]: 'Fixed-Price',
  [PoolType.Lottery]: 'Lottery',
  [PoolType.Duch]: 'Dutch Auction',
  [PoolType.SealedBid]: 'SealedBid',
  [PoolType.fixedSwapNft]: 'Fixed-Swap-Nft',
  [PoolType['ENGLISH_AUCTION_NFT']]: 'ENGLISH_AUCTION_NFT'
}
interface PaginationParams {
  index: number
  total: number
  style?: React.CSSProperties
  setCurrent: (index: number) => void
}
const PaginationBox = (props: PaginationParams) => {
  const { index, total, style, setCurrent } = props
  return (
    <Box
      sx={{
        width: 128,
        height: 60,
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        ...style
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          cursor: index === 0 ? 'unset' : 'pointer',
          background: index === 0 ? 'var(--ps-text-1)' : 'var(--ps-text-3)',
          '&:hover': {
            background: 'var(--ps-text-1)'
          }
        }}
        onClick={() => {
          const value = index - 1 <= 0 ? 0 : index - 1
          setCurrent && setCurrent(value)
        }}
      >
        {index === 0 ? (
          <img
            src={leftArrowGrayImg}
            alt=""
            style={{
              width: 16,
              height: 16
            }}
          />
        ) : (
          <img
            src={leftArrowLightImg}
            alt=""
            style={{
              width: 16,
              height: 16
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          width: 60,
          height: 60,
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          cursor: index === total - 1 ? 'unset' : 'pointer',
          background: index === total - 1 ? 'var(--ps-text-1)' : 'var(--ps-text-3)',
          '&:hover': {
            background: 'var(--ps-text-1)'
          }
        }}
        onClick={() => {
          const value = index >= total - 1 ? total - 1 : index + 1
          console.log('value>>>', value)
          setCurrent && setCurrent(value)
        }}
      >
        {index === total - 1 ? (
          <img
            src={rightArrayGrayImg}
            alt=""
            style={{
              width: 16,
              height: 16
            }}
          />
        ) : (
          <img
            src={rightArrayLightImg}
            alt=""
            style={{
              width: 16,
              height: 16
            }}
          />
        )}
      </Box>
    </Box>
  )
}
const TokenAuction: React.FC = () => {
  const optionDatas = useOptionDatas()
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data: nftPoolData, loading: nftLoading } = useRequest(async () => {
    const resp = await getPools({
      offset: 0,
      limit: 4,
      category: 5,
      chainId: 2,
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
      category: 1,
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
  useEffect(() => {
    setCurrentIndex(0)
  }, [])
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 1540,
        height: showData.title === AuctionType.NFTAuction || showData.title === AuctionType.TokenAuction ? 1188 : 622,
        margin: '120px auto 0'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: showData.title === AuctionType.NFTAuction || showData.title === AuctionType.TokenAuction ? 865 : 622,
          background: 'var(--ps-text-4)',
          borderRadius: 30
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 1296,
            height: 622,
            paddingTop: 80,
            margin: '0 auto',
            overflow: 'hidden'
          }}
        >
          <Typography
            sx={{
              textAlign: 'left',
              fontFamily: `'Public Sans'`,
              fontWeight: 700,
              fontSize: 44,
              width: '100%',
              lineHeight: '32px',
              color: 'var(--ps-yellow-1)',
              marginBottom: 30,
              letterSpacing: '-0.02em'
            }}
          >
            {showData.title}
          </Typography>
          <Typography
            sx={{
              textAlign: 'left',
              width: 420,
              fontFamily: `'Public Sans'`,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: '21px',
              color: 'var(--ps-primary)',
              marginBottom: 30,
              letterSpacing: '-0.02em'
            }}
          >
            {showData.subTitle}
          </Typography>
          <Typography
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 172,
              textAlign: 'right',
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: 14,
              width: 200,
              lineHeight: '20px',
              color: 'var(--ps-yellow-1)'
            }}
          >
            {`${currentIndex + 1} / ${AuctionList.length}`}
          </Typography>
          <PaginationBox
            index={currentIndex}
            total={AuctionList.length}
            setCurrent={setCurrentIndex}
            style={{
              position: 'absolute',
              bottom: 80,
              right: 0
            }}
          />
          <InfoBox
            title={'total value'}
            value={showData.totalValue}
            style={{
              position: 'absolute',
              bottom: 161,
              left: 0
            }}
          />
          <InfoBox
            title={'Total Auction'}
            value={showData.totalAuction}
            style={{
              position: 'absolute',
              bottom: 161,
              left: 110
            }}
          />
          <InfoBox
            title={'Trending Token Auction'}
            value={showData.trendingTokenAuction}
            style={{
              position: 'absolute',
              width: 220,
              background: 'var(--ps-yellow-1)',
              bottom: 80,
              left: 0
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 763,
              height: 763,
              borderRadius: '50%',
              border: '1px solid var(--ps-yellow-1)',
              opacity: 0.6
            }}
          ></Box>
          {/* Token Auction */}
          <Box
            sx={{
              position: 'absolute',
              width: 763,
              height: 622,
              top: 622,
              left: '50%',
              transform:
                currentIndex === 0
                  ? 'translateX(-50%) translateY(-100%) rotateZ(0)'
                  : `translateX(-50%) translateY(-100%) rotateZ(-180deg)`,
              transformOrigin: 'bottom center',
              transition: 'all 1s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <img
              style={{
                position: 'absolute',
                top: 100,
                display: 'block',
                width: 350,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
              src={AuctionList[0].auctionImg}
              alt=""
            />
          </Box>
          {/* NFT Auctioin */}
          <Box
            sx={{
              position: 'absolute',
              width: 763,
              height: 622,
              top: 622,
              left: '50%',
              transform: `translateX(-50%) translateY(-100%) rotateZ(${
                currentIndex < 1 ? 180 : currentIndex > 1 ? -180 : 0
              }deg)`,
              transformOrigin: 'bottom center',
              transition: 'all 1s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <img
              style={{
                position: 'absolute',
                top: 100,
                display: 'block',
                width: 350,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
              src={AuctionList[1].auctionImg}
              alt=""
            />
          </Box>
          {/* Real World Auction */}
          <Box
            sx={{
              position: 'absolute',
              width: 763,
              height: 622,
              top: 622,
              left: '50%',
              transform: `translateX(-50%) translateY(-100%) rotateZ(${
                currentIndex < 2 ? 180 : currentIndex > 2 ? -180 : 0
              }deg)`,
              transformOrigin: 'bottom center',
              transition: 'all 1s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <img
              style={{
                position: 'absolute',
                top: 100,
                display: 'block',
                width: 350,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
              src={AuctionList[2].auctionImg}
              alt=""
            />
          </Box>
          {/* Ad Space Auction */}
          <Box
            sx={{
              position: 'absolute',
              width: 763,
              height: 622,
              top: 622,
              left: '50%',
              transform: `translateX(-50%) translateY(-100%) rotateZ(${
                currentIndex < 3 ? 180 : currentIndex > 3 ? -180 : 0
              }deg)`,
              transformOrigin: 'bottom center',
              transition: 'all 1s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <img
              style={{
                position: 'absolute',
                top: 100,
                display: 'block',
                width: 350,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
              src={AuctionList[3].auctionImg}
              alt=""
            />
          </Box>
        </Box>
      </Box>
      {(showData.title === AuctionType.NFTAuction || showData.title === AuctionType.TokenAuction) && (
        <>
          <Box
            sx={{
              position: 'absolute',
              width: 1440,
              minHeight: 496,
              top: 622,
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: 30,
              margin: '0 auto',
              background: '#fff',
              padding: 24
            }}
          >
            <Box
              sx={{
                minHeight: 368,
                marginBottom: 24
              }}
            >
              {showData.title === AuctionType.NFTAuction && (
                <>
                  {nftLoading && (
                    <Grid container spacing={18}>
                      {Array.from(new Array(6)).map((_, index) => (
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={index}>
                          <Box>
                            <Skeleton
                              variant="rounded"
                              height={400}
                              sx={{ bgcolor: 'var(--ps-gray-30)', borderRadius: 20 }}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  <Grid container spacing={18}>
                    {optionDatas?.chainInfoOpt &&
                      nftPoolData?.list.map((nft: any, i: number) => (
                        <Grid key={i} xs={3} item>
                          <Link
                            to={routes.auction.fixedSwapNft
                              .replace(
                                ':chainShortName',
                                getLabelById(nft.chainId, 'shortName', optionDatas?.chainInfoOpt || [])
                              )
                              .replace(':poolId', nft.poolId)}
                          >
                            <NFTCard nft={nft} hiddenStatus={true} />
                          </Link>
                        </Grid>
                      ))}
                  </Grid>
                </>
              )}
              {showData.title === AuctionType.TokenAuction && (
                <>
                  {loading ? (
                    <Grid container spacing={18}>
                      {Array.from(new Array(8)).map((lodingItem, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                          <Box>
                            <Skeleton
                              variant="rounded"
                              height={400}
                              sx={{ bgcolor: 'var(--ps-gray-30)', borderRadius: 20 }}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Grid container spacing={18}>
                      {data?.list?.map((fixedSwaptem: any, index: number) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={index}>
                          <Link
                            to={routes.auction.fixedPrice
                              .replace(
                                ':chainShortName',
                                getLabelById(fixedSwaptem.chainId, 'shortName', optionDatas?.chainInfoOpt || [])
                              )
                              .replace(':poolId', fixedSwaptem.poolId)}
                          >
                            <AuctionCard
                              style={{ minWidth: 'unset' }}
                              poolId={fixedSwaptem.poolId}
                              title={fixedSwaptem.name}
                              status={fixedSwaptem.status}
                              claimAt={fixedSwaptem.claimAt}
                              closeAt={fixedSwaptem.closeAt}
                              dateStr={fixedSwaptem.status == 1 ? fixedSwaptem.openAt : fixedSwaptem.closeAt}
                              holder={
                                <AuctionHolder
                                  href={`${routes.profile.summary}?id=${fixedSwaptem.creatorUserInfo?.userId}`}
                                  avatar={fixedSwaptem.creatorUserInfo?.avatar}
                                  name={fixedSwaptem.creatorUserInfo?.name}
                                  description={
                                    fixedSwaptem.creatorUserInfo?.publicRole?.length > 0
                                      ? fixedSwaptem.creatorUserInfo?.publicRole?.map((item: any, index: number) => {
                                          return (
                                            getLabelById(item, 'role', optionDatas?.publicRoleOpt) +
                                            `${
                                              index !== fixedSwaptem.creatorUserInfo?.publicRole?.length - 1 ? ', ' : ''
                                            }`
                                          )
                                        })
                                      : 'Individual account'
                                  }
                                  isVerify={fixedSwaptem.creatorUserInfo?.isVerify}
                                />
                              }
                              progress={{
                                symbol: fixedSwaptem.token0.symbol?.toUpperCase(),
                                decimals: fixedSwaptem.token0.decimals,
                                sold: fixedSwaptem.swappedAmount0,
                                supply: fixedSwaptem.amountTotal0
                              }}
                              listItems={
                                <>
                                  <AuctionListItem
                                    label="Token symbol"
                                    value={
                                      <Stack direction="row" alignItems="center" spacing={4}>
                                        <TokenImage
                                          src={fixedSwaptem.token0.largeUrl}
                                          alt={fixedSwaptem.token0.symbol}
                                          size={20}
                                        />
                                        <span>{fixedSwaptem.token0.symbol.toUpperCase()}</span>
                                      </Stack>
                                    }
                                  />
                                  <AuctionListItem
                                    label="Contract address"
                                    value={
                                      <Stack direction="row" alignItems="center" spacing={4}>
                                        {fixedSwaptem.token0.coingeckoId ? (
                                          <TokenImage src={CoingeckoSVG} alt="coingecko" size={20} />
                                        ) : (
                                          <Image src={ErrorSVG} width={20} height={20} alt="Dangerous" />
                                        )}
                                        <span>{shortenAddress(fixedSwaptem.token0.address)}</span>
                                        <CopyToClipboard text={fixedSwaptem.token0.address} />
                                      </Stack>
                                    }
                                  />
                                  <AuctionListItem
                                    label="Fixed price ratio"
                                    value={
                                      <Stack direction="row" spacing={8}>
                                        <Typography fontSize={12}>1</Typography>
                                        <Typography fontSize={12}>
                                          {fixedSwaptem.token0.symbol.toUpperCase()} ={' '}
                                          {new BigNumber(fixedSwaptem.ratio)
                                            .decimalPlaces(6, BigNumber.ROUND_DOWN)
                                            .toFormat()}
                                        </Typography>
                                        <Typography fontSize={12}>
                                          {fixedSwaptem.token1.symbol.toUpperCase()}
                                        </Typography>
                                      </Stack>
                                    }
                                  />
                                  <AuctionListItem
                                    label="Price,$"
                                    value={
                                      <span>
                                        {new BigNumber(fixedSwaptem.poolPrice)
                                          .decimalPlaces(6, BigNumber.ROUND_DOWN)
                                          .toFormat()}
                                      </span>
                                    }
                                  />
                                </>
                              }
                              categoryName={poolType[fixedSwaptem.category as PoolType]}
                              whiteList={fixedSwaptem.enableWhiteList ? 'Whitelist' : 'Public'}
                              chainId={fixedSwaptem.chainId}
                            />
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </>
              )}
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center'
              }}
            >
              <Button
                href={AuctionList[currentIndex].checkAllLink}
                variant="contained"
                sx={{
                  // background: 'var(--ps-yellow-1)',
                  padding: '16px 20px'
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
