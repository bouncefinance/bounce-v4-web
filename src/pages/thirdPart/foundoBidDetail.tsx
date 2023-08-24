import { Box, Stack, Tab, Tabs, Typography, styled } from '@mui/material'
import Header from './foundoComponents/section/headerSection'
import PcBanner from './foundoComponents/section/pcBannerSection'
import BidSection from './foundoComponents/section/bidSection'
import { RowLabel } from './foundoComponents/snippet/creatorBidAuction'
import Icon1 from 'assets/imgs/thirdPart/foundoDetail/icon1.svg'
import Icon2 from 'assets/imgs/thirdPart/foundoDetail/icon2.svg'
import Icon3 from 'assets/imgs/thirdPart/foundoDetail/icon3.svg'
import Icon4 from 'assets/imgs/thirdPart/foundoDetail/icon4.svg'
import Icon5 from 'assets/imgs/thirdPart/foundoDetail/icon5.svg'
// import FoundoLogo from 'assets/imgs/thirdPart/foundoDetail/foundoLogo.png'
import FoundoLogo from 'assets/imgs/thirdPart/foundoDetail/FOUNDO.png'
import ShareIcon from 'assets/imgs/thirdPart/foundoDetail/share.png'
// import WinnerList from './foundoComponents/section/winnerSection'
import { ChainListMap } from 'constants/chain'
import TokenImage from 'bounceComponents/common/TokenImage'
import { getEtherscanLink } from 'utils'
import { useIsSMDown } from 'themes/useTheme'
import { useCallback, useState } from 'react'
import CenterSeciont from '../thirdPart/foundoComponents/centerSection'
import { useMutantEnglishAuctionPool } from 'hooks/useMutantEnglishAuctionPool'
import ActionHistory from './foundoComponents/snippet/auctionHistory'
// import { useParams } from 'react-router-dom'
import Footer from 'bounceComponents/common/Footer'
import Image from 'components/Image'
import authenticationDefalut from 'assets/imgs/thirdPart/foundoDetail/authentication-defalut.png'
const NewTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
  '.MuiTabs-scroller': {
    overflowX: 'hidden'
  },
  '.MuiTabs-flexContainer': {
    overflowX: 'auto',
    justifyContent: 'center',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start'
    }
  },
  '.MuiTab-root': {
    borderRadius: '100px',
    fontWeight: 600,
    margin: '48px 12px',
    border: '1px solid var(--grey-03, #959595)',
    fontFamily: `Public Sans`,
    backgroundColor: 'transparent',
    color: '#fff !important',
    [theme.breakpoints.down('sm')]: {
      margin: '32px 8px'
    }
  },
  '.MuiTabs-indicator': {
    display: 'none'
  },
  '.Mui-selected': {
    fontFamily: `Public Sans`,
    backgroundColor: '#fff',
    color: '#121212 !important'
  }
}))

const FoundoBidDetail = () => {
  const isSm = useIsSMDown()
  const [tabIndex, setTabIndex] = useState(0)
  const handleChange = useCallback((e: any, newValue: number) => {
    setTabIndex(newValue)
  }, [])
  const tabList = [
    {
      label: 'Auction History'
    },
    {
      label: 'Product Description'
    },
    {
      label: 'Authentication'
    },
    {
      label: 'About Foundo'
    },
    {
      label: 'Token Detail'
    }
  ]
  const detailConfig = [
    {
      img: Icon1,
      label: 'Gemstone',
      value: 'Diamonds'
    },
    {
      img: Icon2,
      label: 'Diamonds (Carats) ',
      value: '19.21'
    },
    {
      img: Icon3,
      label: 'Material',
      value: '18k White gold'
    },
    {
      img: Icon4,
      label: 'Made In',
      value: 'Italy'
    },
    {
      img: Icon5,
      label: 'Necklace length',
      value: '50 cm'
    }
  ]

  // const { '*': sysId } = useParams()
  const { data: poolInfo } = useMutantEnglishAuctionPool(18392)
  if (!poolInfo) return <></>
  return (
    <Box
      sx={{
        mt: theme => (isSm ? 0 : `-${theme.height.header}`),
        pt: theme => (isSm ? 0 : `${theme.height.header}`),
        width: '100%',
        backgroundColor: '#121212'
      }}
    >
      <Header poolInfo={poolInfo} />
      <PcBanner />
      <BidSection poolInfo={poolInfo} />
      <NewTabs value={tabIndex} onChange={handleChange}>
        {tabList.map((item: any) => (
          <Tab
            sx={{
              '&.MuiTab-root': {
                fontSize: isSm ? 20 : 28,
                'line-height': '130%',
                'letter-spacing': '-0.56px',
                'text-transform': 'capitalize',
                padding: isSm ? 16 : 24,
                '&:hover': {
                  background: '#fff',
                  color: '#000 !important'
                }
              }
            }}
            label={item.label}
            key={item.label}
          ></Tab>
        ))}
      </NewTabs>
      <CenterSeciont>
        {tabIndex === 0 && <ActionHistory poolInfo={poolInfo} />}
        {tabIndex === 1 && (
          <Stack
            direction={'row'}
            sx={{
              mt: { xs: 0, sm: 120 },
              width: 'inherit',
              flexWrap: { xs: 'wrap', sm: 'unset' },
              justifyContent: 'space-between'
            }}
          >
            <Typography width={470} sx={{ color: '#fff', mt: 16, fontSize: { xs: 16, sm: 36 } }}>
              Product Description
            </Typography>
            <Box
              sx={{
                width: isSm ? '100%' : '680px',
                minHeight: 500,
                padding: '24px 0 48px'
              }}
            >
              <Typography
                sx={{
                  fontFamily: `'Inter'`,
                  fontWeight: 400,
                  fontSize: 16,
                  color: 'var(--ps-text-2)'
                }}
              >{`Blossoming between the marvellous monuments of the Eternal City, Fiorever draws inspiration from the alluring four-petal flower that was cherished by the Romans as a symbol of happiness and joy. A blend of two meaningful words: Fiore - Italian for flower, and forever. Fiorever celebrates the Roman love for life with a free-spirited and passionate design. Designed to sparkle with an eternal glow, the precious floral icon is crafted with a corolla of the highest quality diamonds. Fiorever necklace in 18 kt white gold, set with round brilliant-cut diamonds and pavé diamonds.`}</Typography>
              <RowLabel style={{ height: '64px', borderBottom: `1px solid #343434` }}>
                <Typography
                  className="label"
                  style={{
                    color: '#D7D6D9',
                    fontSize: isSm ? '13px' : '14px'
                  }}
                >
                  Details
                </Typography>
                <Typography className="value">Ref: LG578319461</Typography>
              </RowLabel>
              {detailConfig.map((item, index) => {
                return (
                  <RowLabel key={index} style={{ height: '48px', borderBottom: `1px solid #343434` }}>
                    <Typography className="label">
                      <img
                        src={item.img}
                        style={{
                          width: isSm ? '16px' : '20px',
                          height: isSm ? '16px' : '20px',
                          marginRight: '8px',
                          verticalAlign: 'middle',
                          marginTop: '-5px'
                        }}
                        alt=""
                        srcSet=""
                      />
                      {item.label}
                    </Typography>
                    <Typography className="value">{item.value}</Typography>
                  </RowLabel>
                )
              })}
            </Box>
          </Stack>
        )}
        {tabIndex === 2 && (
          <Box sx={{ width: '100%', paddingTop: isSm ? 0 : 120 }}>
            <Typography width={320} sx={{ color: '#fff', mt: 16, fontSize: { xs: 16, sm: 36 } }}>
              Authentication
            </Typography>
            <Box sx={{ width: '100%', maxWidth: 1296, margin: '0 auto ', marginTop: isSm ? 56 : 64 }}>
              <Image width={'100%'} height={'100%'} src={authenticationDefalut} />
            </Box>
          </Box>
        )}
        {tabIndex === 3 && (
          <Stack
            direction={'row'}
            sx={{
              mt: { xs: 0, sm: 120 },
              width: 'inherit',
              flexWrap: { xs: 'wrap', sm: 'unset' },
              justifyContent: 'space-between'
            }}
          >
            <Typography width={320} sx={{ color: '#fff', mt: 16, fontSize: { xs: 16, sm: 36 } }}>
              About Foundo
            </Typography>
            <Box
              sx={{
                width: isSm ? '100%' : '680px',
                minHeight: 500,
                padding: '24px 0 48px'
              }}
            >
              <Typography
                sx={{
                  fontFamily: `'Inter'`,
                  fontWeight: 400,
                  fontSize: isSm ? 14 : 16,
                  color: 'var(--ps-text-2)'
                }}
                mb={'40px'}
              >{`FOUNDO® is a new luxury brand that uses the latest in blockchain technology, superior materials and world-class craftsmanship to provide customer-centric products and experiences. It has an extensive line of collections ranging from fine jewelry, home goods, bags, accessorized installations, artwork to NFTs - seeking to unite the virtual-reality world with inter-human verse.`}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: isSm ? 'flex-start' : 'flex-end'
                }}
              >
                <img
                  src={FoundoLogo}
                  style={{
                    width: isSm ? '90px' : '160px',
                    height: isSm ? '90px' : '160px'
                  }}
                  alt=""
                />
              </Box>
            </Box>
          </Stack>
        )}
        {tabIndex === 4 && (
          <Stack
            direction={'row'}
            sx={{
              mt: { xs: 0, sm: 120 },
              width: 'inherit',
              flexWrap: { xs: 'wrap', sm: 'unset' }
            }}
          >
            <Typography width={320} sx={{ color: '#fff', mt: 16, fontSize: { xs: 16, sm: 36 } }}>
              Token Detail
            </Typography>
            <Box
              sx={{
                width: isSm ? '100%' : '680px',
                minHeight: 500,
                padding: '24px 0 48px'
              }}
            >
              <RowLabel
                style={{
                  flexFlow: isSm ? 'column nowrap' : 'row nowrap',
                  justifyContent: 'flex-start',
                  marginBottom: isSm ? '24px' : '28px'
                }}
              >
                <Typography
                  className="label"
                  sx={{
                    width: isSm ? '100%' : '300px'
                  }}
                >
                  CONTRACT ADDRESS
                </Typography>
                <Typography
                  className="value"
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    marginTop: isSm ? '8px' : '0'
                  }}
                >
                  {poolInfo?.token0.address}
                </Typography>
              </RowLabel>
              <RowLabel
                style={{
                  flexFlow: isSm ? 'column nowrap' : 'row nowrap',
                  justifyContent: 'flex-start',
                  marginBottom: isSm ? '24px' : '28px'
                }}
              >
                <Typography
                  className="label"
                  sx={{
                    width: isSm ? '100%' : '300px'
                  }}
                >
                  NETWORK
                </Typography>
                <Typography
                  className="value"
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginTop: isSm ? '8px' : '0'
                  }}
                >
                  <TokenImage
                    size={20}
                    src={poolInfo?.ethChainId ? ChainListMap[poolInfo.ethChainId]?.logo : undefined}
                    sx={{
                      marginRight: '12px',
                      verticalAlign: 'middle',
                      marginTop: '-3px'
                    }}
                    alt=""
                  />
                  {poolInfo?.ethChainId ? ChainListMap[poolInfo.ethChainId]?.name : '-'} Chain
                  <img
                    src={ShareIcon}
                    onClick={() =>
                      poolInfo?.ethChainId &&
                      window.open(
                        getEtherscanLink(poolInfo.ethChainId, poolInfo.token0.address || '', 'token') +
                          `?a=${poolInfo.tokenId}`
                      )
                    }
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      marginLeft: '18px',
                      verticalAlign: 'middle',
                      marginTop: '-3px'
                    }}
                    alt=""
                  />
                </Typography>
              </RowLabel>
              <RowLabel
                style={{
                  flexFlow: isSm ? 'column nowrap' : 'row nowrap',
                  justifyContent: 'flex-start',
                  marginBottom: isSm ? '24px' : '28px'
                }}
              >
                <Typography
                  className="label"
                  sx={{
                    width: isSm ? '100%' : '300px'
                  }}
                >
                  TOKEN ID
                </Typography>
                <Typography
                  className="value"
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    marginTop: isSm ? '8px' : '0'
                  }}
                >
                  {poolInfo?.tokenId}
                </Typography>
              </RowLabel>
              <RowLabel
                style={{
                  flexFlow: isSm ? 'column nowrap' : 'row nowrap',
                  justifyContent: 'flex-start',
                  marginBottom: isSm ? '24px' : '28px'
                }}
              >
                <Typography
                  className="label"
                  sx={{
                    width: isSm ? '100%' : '300px'
                  }}
                >
                  TOKEN TYPE
                </Typography>
                <Typography
                  className="value"
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    marginTop: isSm ? '8px' : '0'
                  }}
                >
                  ERC721
                </Typography>
              </RowLabel>
            </Box>
          </Stack>
        )}
        {/* {tabIndex === 4 && (
          <Box
            sx={{
              width: isSm ? '100%' : '763px',
              padding: '70px 0'
            }}
          >
            {poolInfo && <WinnerList poolInfo={poolInfo} />}
          </Box>
        )} */}
      </CenterSeciont>
      <Box sx={{ mt: { xs: 80, sm: 120 } }}>
        <Footer />
      </Box>
    </Box>
  )
}
export default function FoundoBidDetailContent() {
  return <FoundoBidDetail />
}
