import { Box, Typography, useTheme } from '@mui/material'
import Header from './foundoComponents/section/headerSection'
import PcBanner from './foundoComponents/section/pcBannerSection'
import BidSection from './foundoComponents/section/bidSection'
import SlideSection from './foundoComponents/section/slideSection'
import { RowLabel } from './foundoComponents/snippet/bidAction'
import Icon1 from 'assets/imgs/thirdPart/foundoDetail/icon1.svg'
import Icon2 from 'assets/imgs/thirdPart/foundoDetail/icon2.svg'
import Icon3 from 'assets/imgs/thirdPart/foundoDetail/icon3.svg'
import Icon4 from 'assets/imgs/thirdPart/foundoDetail/icon4.svg'
import Icon5 from 'assets/imgs/thirdPart/foundoDetail/icon5.svg'
import FoundoLogo from 'assets/imgs/thirdPart/foundoDetail/foundoLogo.png'
import ShareIcon from 'assets/imgs/thirdPart/foundoDetail/share.png'
import WinnerList from './foundoComponents/section/winnerSection'
import { PoolStatus } from 'api/pool/type'
import EnglishAuctionValuesProvider, { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import { ChainListMap } from 'constants/chain'
import TokenImage from 'bounceComponents/common/TokenImage'
import { getEtherscanLink } from 'utils'

const FoundoBidDetail = () => {
  const theme = useTheme()
  const detailConfig = [
    {
      img: Icon1,
      label: 'Gemstone',
      value: 'Diamonds'
    },
    {
      img: Icon2,
      label: 'Diamonds (Carats) ',
      value: '8.81'
    },
    {
      img: Icon3,
      label: 'Material',
      value: 'White gold'
    },
    {
      img: Icon4,
      label: 'Made In',
      value: 'Italy'
    },
    {
      img: Icon5,
      label: 'Dimension',
      value: '40.5 cm'
    }
  ]
  const { data: poolInfo } = useEnglishAuctionPoolInfo()

  return (
    <Box
      sx={{
        width: '100%',
        height: `calc(100vh - ${theme.height.header})`,
        overflowX: 'hidden',
        overflowY: 'auto',
        background: '#000'
      }}
    >
      <Header />
      <PcBanner />
      <BidSection />
      <SlideSection title={'Product Description'}>
        <Box
          sx={{
            width: '680px',
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
                fontSize: '14px'
              }}
            >
              Details
            </Typography>
            <Typography className="value">Ref.: 356934</Typography>
          </RowLabel>
          {detailConfig.map((item, index) => {
            return (
              <RowLabel key={index} style={{ height: '48px', borderBottom: `1px solid #343434` }}>
                <Typography className="label">
                  <img
                    src={item.img}
                    style={{
                      width: '20px',
                      height: '20px',
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
      </SlideSection>
      <SlideSection title={'Authentication'}></SlideSection>
      <SlideSection title={'About Foundo'}>
        <Box
          sx={{
            width: '680px',
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
            mb={'40px'}
          >{`FOUNDO® is a new luxury brand that uses the latest in blockchain technology, superior materials and world-class craftsmanship to provide customer-centric products and experiences. It has an extensive line of collections ranging from fine jewelry, home goods, bags, accessorized installations, artwork to NFTs - seeking to unite the virtual-reality world with inter-human verse.`}</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <img
              src={FoundoLogo}
              style={{
                width: '120px',
                height: '120px'
              }}
              alt=""
            />
          </Box>
        </Box>
      </SlideSection>
      <SlideSection title={'Token Detail'}>
        <Box
          sx={{
            width: '680px',
            padding: '24px 0 48px'
          }}
        >
          <RowLabel
            style={{
              justifyContent: 'flex-start',
              marginBottom: '28px'
            }}
          >
            <Typography
              className="label"
              sx={{
                width: '300px'
              }}
            >
              CONTRACT ADDRESS
            </Typography>
            <Typography className="value">{poolInfo?.token0.address}</Typography>
          </RowLabel>
          <RowLabel
            style={{
              justifyContent: 'flex-start',
              marginBottom: '28px'
            }}
          >
            <Typography
              className="label"
              sx={{
                width: '300px'
              }}
            >
              NETWORK
            </Typography>
            <Typography className="value" display={'flex'} alignItems={'center'}>
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
              justifyContent: 'flex-start',
              marginBottom: '28px'
            }}
          >
            <Typography
              className="label"
              sx={{
                width: '300px'
              }}
            >
              TOKEN ID
            </Typography>
            <Typography className="value">{poolInfo?.tokenId}</Typography>
          </RowLabel>
          <RowLabel
            style={{
              justifyContent: 'flex-start',
              marginBottom: '28px'
            }}
          >
            <Typography
              className="label"
              sx={{
                width: '300px'
              }}
            >
              TOKEN TYPE
            </Typography>
            <Typography className="value">ERC721</Typography>
          </RowLabel>
        </Box>
      </SlideSection>
      <SlideSection title={'Auction Detail'}>
        <Box
          sx={{
            width: '763px',
            padding: '70px 0'
          }}
        >
          {poolInfo?.status === PoolStatus.Closed && <WinnerList poolInfo={poolInfo} />}
        </Box>
      </SlideSection>
    </Box>
  )
}
export default function FoundoBidDetailContent() {
  return (
    <EnglishAuctionValuesProvider backedId={666}>
      <FoundoBidDetail />
    </EnglishAuctionValuesProvider>
  )
}
