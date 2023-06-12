import React, { useState, useMemo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import FixedPriceWhite from 'assets/imgs/home/TypeOfAuction/FixedPriced-white.svg'
import FixedPriceBlack from 'assets/imgs/home/TypeOfAuction/FixedPriced-black.svg'
import DutchAuctionWhite from 'assets/imgs/home/TypeOfAuction/DutchAuction-white.svg'
import DutchAuctionBlack from 'assets/imgs/home/TypeOfAuction/DutchAuction-black.svg'
import EnglishAuctionWhite from 'assets/imgs/home/TypeOfAuction/EnglishAuction-white.svg'
import EnglishAuctionBlack from 'assets/imgs/home/TypeOfAuction/EnglishAuction-black.svg'
import SealedBidAuctionBlack from 'assets/imgs/home/TypeOfAuction/Sealed-BidAuction-black.svg'
import SealedBidAuctionWhite from 'assets/imgs/home/TypeOfAuction/Sealed-BidAuction-white.svg'
import LeftArrow from 'assets/imgs/home/TypeOfAuction/leftArrow.svg'
import TopArrow from 'assets/imgs/home/TypeOfAuction/type-arrow-down.svg'
import BottomArrow from 'assets/imgs/home/TypeOfAuction/type-arrow-up.svg'
import CenterBottomArrow from 'assets/imgs/home/TypeOfAuction/centerBottomArrow.svg'
import Logo from 'assets/imgs/home/TypeOfAuction/logo.svg'
import RightArrow from 'assets/imgs/home/TypeOfAuction/rightArrow.svg'
import RandomSelectWhite from 'assets/imgs/home/TypeOfAuction/RandomSelect-white.svg'
import RandomSelectBlack from 'assets/imgs/home/TypeOfAuction/RandomSelect-black.svg'
import PlayableBlack from 'assets/imgs/home/TypeOfAuction/Playable-black.svg'
import PlayableWhite from 'assets/imgs/home/TypeOfAuction/Playable-white.svg'
import OrderBookBlack from 'assets/imgs/home/TypeOfAuction/OrderBook-black.svg'
import OrderBookWhite from 'assets/imgs/home/TypeOfAuction/OrderBook-white.svg'
import HoldToCompeteBlack from 'assets/imgs/home/TypeOfAuction/Hold-to-compete-black.svg'
import HoldToCompeteWhite from 'assets/imgs/home/TypeOfAuction/Hold-to-compete-white.svg'
import { keyframes } from '@mui/system'
import { styled } from '@mui/material/styles'
import Icon1 from 'assets/imgs/home/TypeOfAuction/icon1.svg'
import Icon2 from 'assets/imgs/home/TypeOfAuction/icon2.svg'
import Icon3 from 'assets/imgs/home/TypeOfAuction/icon3.svg'
import Icon4 from 'assets/imgs/home/TypeOfAuction/icon4.svg'
import Icon5 from 'assets/imgs/home/TypeOfAuction/icon5.svg'
import Icon6 from 'assets/imgs/home/TypeOfAuction/icon6.svg'
import Icon7 from 'assets/imgs/home/TypeOfAuction/icon7.svg'
import Icon8 from 'assets/imgs/home/TypeOfAuction/icon8.svg'
import { getAuctionVolumeCountData } from 'api/market'
import { useRequest } from 'ahooks'
import { PoolType } from 'api/pool/type'
import PoolListDialog from 'pages/tokenAuction/components/listDialog'
import NftListDialog from 'pages/nftAuction/components/listDialog'
import useBreakpoint from '../../hooks/useBreakpoint'

interface AuctionItemParams {
  title: string
  defaultImg: string
  hoverImg: string
  totalValue: number
  link?: string
  poolType?: PoolType | string
  handleOpenTokenAuction?: () => void
  handleOpenNFTAuction?: () => void
}

const AuctionItem = (props: AuctionItemParams) => {
  const { title, defaultImg, hoverImg, totalValue, link, handleOpenTokenAuction, handleOpenNFTAuction, poolType } =
    props
  const [isHover, setIsHover] = useState(false)
  return (
    <Box
      sx={{
        position: 'relative',
        width: [152, 230],
        height: [90, 110],
        cursor: 'pointer'
      }}
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
      onClick={() => {
        if (poolType === PoolType.FixedSwap || poolType === PoolType.Lottery) {
          handleOpenTokenAuction && handleOpenTokenAuction()
        } else if (poolType === PoolType.fixedSwapNft) {
          handleOpenNFTAuction && handleOpenNFTAuction()
        } else {
          link && window.open(link, '_blank')
        }
      }}
    >
      {
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: [152, 230],
            height: [90, 110],
            background: 'var(--ps-text-3)',
            borderRadius: 24,
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            transform: !isHover ? 'rotateX(0)' : 'rotateX(90deg)',
            transition: 'all 0.6s'
          }}
        >
          <img
            src={defaultImg}
            style={{
              display: 'block',
              width: 24
            }}
            alt=""
          />
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: 14,
              textAlign: 'center',
              color: '#fff'
            }}
          >
            {title}
          </Typography>
        </Box>
      }
      {
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: [152, 230],
            height: [90, 110],
            background: 'var(--ps-yellow-1)',
            borderRadius: 24,
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '12px 16px',
            transform: isHover ? 'rotateX(0)' : 'rotateX(90deg)',
            transition: 'all 0.6s'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: 13,
              color: 'var(--ps-text-3)',
              lineHeight: '24px',
              marginBottom: 15
            }}
          >
            <img
              src={hoverImg}
              style={{
                display: 'inline-block',
                width: 24,
                verticalAlign: 'middle',
                marginRight: 12
              }}
              alt=""
            />
            {title}
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--ps-text-1)',
              lineHeight: '17px'
            }}
          >
            total value
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: 20,
              color: 'var(--ps-text-3)',
              lineHeight: '28px'
            }}
          >
            ${totalValue}
          </Typography>
        </Box>
      }
    </Box>
  )
}
const logoDown = keyframes`
  25% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(3px);
  }
`
const scrollX = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - calc(clamp(10rem, 1rem + 40vmin, 30rem) / 8)));
  }
`
const LogoDown = styled('img')(() => ({
  width: 90,
  animation: `${logoDown} 1.2s infinite`
}))
const SlideBox = styled(Box)(() => ({
  '.marqueeGroup': {
    animation: `${scrollX} 60s linear infinite`
  }
}))
const TypesOfAuction: React.FC = () => {
  const isSm = useBreakpoint('sm')
  const slideImgList = [Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8]
  const { data: volumnCountData } = useRequest(async () => {
    const resp = await getAuctionVolumeCountData()
    return {
      data: resp?.data || {}
    }
  })
  const leftAuctioinList = useMemo(() => {
    const result = [
      {
        title: 'Fixed-priced Auction',
        defaultImg: FixedPriceWhite,
        hoverImg: FixedPriceBlack,
        totalValue: 0,
        link: 'https://docs.bounce.finance/bounce-auctions/fixed-price-auction',
        poolType: PoolType.FixedSwap
      },
      {
        title: 'English Auction',
        defaultImg: EnglishAuctionWhite,
        hoverImg: EnglishAuctionBlack,
        totalValue: 0,
        link: 'https://docs.bounce.finance/bounce-auctions/english-auction',
        poolType: PoolType.ENGLISH_AUCTION_NFT
      },
      {
        title: 'Dutch Auction',
        defaultImg: DutchAuctionWhite,
        hoverImg: DutchAuctionBlack,
        totalValue: 0,
        link: 'https://docs.bounce.finance/bounce-auctions/dutch-auction',
        poolType: PoolType.Duch
      },
      {
        title: 'Sealed-Bid Auction',
        defaultImg: SealedBidAuctionWhite,
        hoverImg: SealedBidAuctionBlack,
        totalValue: 0,
        link: 'https://docs.bounce.finance/bounce-auctions/sealed-bid-auction',
        poolType: PoolType.SealedBid
      }
    ]
    result.map(item => {
      if (volumnCountData?.data && volumnCountData?.data[item.poolType]) {
        item.totalValue = volumnCountData.data[item.poolType]
      }
    })
    return result
  }, [volumnCountData])
  const rightAuctioinList = useMemo(() => {
    const result = [
      {
        title: 'Random Selection Auction',
        defaultImg: RandomSelectWhite,
        hoverImg: RandomSelectBlack,
        totalValue: 0,
        link: 'https://docs.bounce.finance/bounce-auctions/random-selection-auction',
        poolType: PoolType.Lottery
      },
      {
        title: 'Playable Auction',
        defaultImg: PlayableWhite,
        hoverImg: PlayableBlack,
        totalValue: 0,
        link: 'https://docs.bounce.finance/bounce-auctions/playable-auction',
        poolType: ''
      },
      {
        title: 'Order Book Auction',
        defaultImg: OrderBookWhite,
        hoverImg: OrderBookBlack,
        totalValue: 0,
        link: 'https://docs.bounce.finance/bounce-auctions/orderbook-auction',
        poolType: ''
      },
      {
        title: 'Hold-to-compete Auction',
        defaultImg: HoldToCompeteWhite,
        hoverImg: HoldToCompeteBlack,
        totalValue: 0,
        link: '',
        poolType: ''
      }
    ]
    result.map(item => {
      if (volumnCountData?.data && volumnCountData?.data[item.poolType]) {
        item.totalValue = volumnCountData.data[item.poolType]
      }
    })
    return result
  }, [volumnCountData])
  const [openTokenAuction, setOpenTokenAuction] = useState(false)
  const [openNFTAuction, setOpenNFTAuction] = useState(false)
  const handleClose = () => {
    setOpenTokenAuction(false)
    setOpenNFTAuction(false)
  }
  const handleOpenToken = () => {
    setOpenTokenAuction(true)
  }
  const handleOpenNft = () => {
    setOpenTokenAuction(true)
  }
  return (
    <>
      {/* Types of Auction On Bounce Finance */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1440,
          margin: '60px auto 20px',
          background: `var(--ps-text-4)`,
          borderRadius: 30,
          padding: ['40px 0', '60px 0 0'],
          marginBottom: 20
        }}
      >
        <Typography
          sx={{
            color: 'var(--ps-yellow-1)',
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: [22, 36],
            lineHeight: '26px',
            marginBottom: 46,
            textAlign: 'center'
          }}
        >
          Types of Auction {isSm && <br />}On Bounce Finance
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexFlow: ['column nowrap', 'row nowrap'],
            justifyContent: 'center',
            alignItems: ['center', 'flex-start']
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 24,
              border: '1px solid var(--ps-yellow-1)',
              margin: ['0 16px', 0],
              padding: [8, 16]
            }}
          >
            <Grid
              container
              sx={{
                width: ['100%', 'min-content'],
                '@media(max-width:600px)': {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  justifyItems: 'center'
                },
                display: 'grid',
                gridTemplateColumns: 'repeat(1,1fr)'
              }}
              spacing={[8, 16]}
            >
              {leftAuctioinList.map((item, index) => (
                <Grid item key={index} sm={6} lg={12}>
                  <AuctionItem
                    key={index}
                    title={item.title}
                    defaultImg={item.defaultImg}
                    hoverImg={item.hoverImg}
                    totalValue={item.totalValue}
                    link={item.link}
                    poolType={item.poolType}
                    handleOpenTokenAuction={handleOpenToken}
                    handleOpenNFTAuction={handleOpenNft}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <img
            src={isSm ? TopArrow : LeftArrow}
            style={{
              width: isSm ? 224 : 120
            }}
            alt=""
            srcSet=""
          />
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column nowrap',
              width: ['100%', 'inherit'],
              padding: ['0 16px', 0],
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: ['100%', 300],
                height: [160, 300],
                borderRadius: 30,
                border: '1px solid var(--ps-yellow-1)',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <LogoDown src={Logo} alt="" srcSet="" />
            </Box>
            {!isSm && (
              <img
                src={CenterBottomArrow}
                style={{
                  width: 24
                }}
                alt=""
                srcSet=""
              />
            )}
          </Box>
          <img
            src={isSm ? BottomArrow : RightArrow}
            style={{
              width: isSm ? 224 : 120
            }}
            alt=""
            srcSet=""
          />
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 24,
              border: '1px solid var(--ps-yellow-1)',
              margin: ['0 16px', 0],
              padding: 16
            }}
          >
            <Grid
              container
              sx={{
                width: ['100%', 'min-content'],
                '@media(max-width:600px)': {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  justifyItems: 'center'
                },
                display: 'grid',
                gridTemplateColumns: 'repeat(1,1fr)'
              }}
              spacing={[8, 16]}
            >
              {rightAuctioinList.map((item, index) => (
                <Grid item key={index} sm={6} lg={12}>
                  <AuctionItem
                    key={index}
                    title={item.title}
                    defaultImg={item.defaultImg}
                    hoverImg={item.hoverImg}
                    totalValue={item.totalValue}
                    link={item.link}
                    poolType={item.poolType}
                    handleOpenTokenAuction={handleOpenToken}
                    handleOpenNFTAuction={handleOpenNft}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      {/* slide */}
      <SlideBox
        sx={{
          width: '100%',
          height: [62, 90],
          maxWidth: 1296,
          margin: '0 auto 20px',
          background: 'var(--ps-yellow-1)',
          borderRadius: 90,
          overflow: 'hidden'
          //   maskImage: `linear-gradient( var(--mask-direction, to right), hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0) )`
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: [62, 90],
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
          className={'marqueeGroup'}
          gap={isSm ? 30 : 100}
        >
          {[...slideImgList, ...slideImgList].map((item, index) => {
            return (
              <img
                key={index}
                src={item}
                style={{
                  width: isSm ? 30 : 50
                }}
                alt="logo"
              />
            )
          })}
        </Box>
      </SlideBox>
      <PoolListDialog open={openTokenAuction} handleClose={handleClose} />
      <NftListDialog open={openNFTAuction} handleClose={handleClose} />
    </>
  )
}

export default TypesOfAuction
