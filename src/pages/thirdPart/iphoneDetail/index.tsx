import { Box, Stack, Tab, Tabs, Typography, styled } from '@mui/material'
import Header from '../foundoComponents/section/headerSection'
import PcBanner from '../foundoComponents/section/pcBannerSection'
import BidSection from '../foundoComponents/section/bidSection'
import { RowLabel } from '../foundoComponents/snippet/creatorBidAuction'
import ShareIcon from 'assets/imgs/thirdPart/foundoDetail/share.png'
import { ChainListMap } from 'constants/chain'
import TokenImage from 'bounceComponents/common/TokenImage'
import { getEtherscanLink } from 'utils'
import { useIsSMDown } from 'themes/useTheme'
import { useCallback, useState } from 'react'
import CenterSeciont from '../../thirdPart/foundoComponents/centerSection'
import { useMutantEnglishAuctionPool } from 'hooks/useMutantEnglishAuctionPool'
import ActionHistory from '../foundoComponents/snippet/auctionHistory'
import Footer from 'bounceComponents/common/Footer'
import Banner2 from 'assets/imgs/thirdPart/iphoneDetail/banner2.jpeg'
import Banner3 from 'assets/imgs/thirdPart/iphoneDetail/banner3.jpeg'
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

const bannerList = [Banner2, Banner3, Banner2, Banner3]
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
      label: 'About Bounce Finance'
    },
    {
      label: 'Token Detail'
    }
  ]

  const { data: poolInfo } = useMutantEnglishAuctionPool(20684)
  console.log('🚀 ~ file: foundoBidDetail.tsx:111 ~ FoundoBidDetail ~ poolInfo:', poolInfo)
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
      <PcBanner bannerList={bannerList} />
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
              >{`
              The iPhone 15, Apple's latest iteration, is on the horizon. Stay tuned for the official details, which are rumored to be revealed during Apple's special event on September 12th. The product is expected for an official release on September 22nd. 
              `}</Typography>
              <Typography
                mt={15}
                sx={{
                  fontFamily: `'Inter'`,
                  fontWeight: 400,
                  fontSize: 16,
                  color: 'var(--ps-text-2)'
                }}
              >{`
              Additionally, please note that upon the iPhone 15's official release, Bounce Finance will acquire one unit and promptly deliver it to the lucky winner of this auction.
              `}</Typography>
            </Box>
          </Stack>
        )}
        {tabIndex === 2 && (
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
              About Bounce Finance
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
                  color: 'var(--ps-text-2)',
                  lineHeight: '1.5'
                }}
                mb={'40px'}
              >{`Bounce Finance is a decentralized platform dedicated to meeting the evolving needs of the Web3 space. Established in 2020, Bounce Finance is proudly known for outstanding user experience and seamless integration of blockchain technology in trading both digital and tangible assets. We provide a decentralized auction protocol that empowers users to create and participate in diverse types of auctions on multiple blockchain networks. With a focus on Auction as a Service, Bounce Finance offers a wide range of products, including Token & NFT Auctions, Real-World Collectible Auctions, Ad Space Auction, and SDKs & Plug-Ins. Bounce Finance also provides Private Launchpad services, an on-chain solution designed to streamline IDOs for new projects.`}</Typography>
            </Box>
          </Stack>
        )}
        {tabIndex === 3 && (
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
