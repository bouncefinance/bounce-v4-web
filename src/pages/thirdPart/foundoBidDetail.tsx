import { Box, Typography } from '@mui/material'
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
import EnglishAuctionValuesProvider, { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import { ChainListMap } from 'constants/chain'
import TokenImage from 'bounceComponents/common/TokenImage'
import { getEtherscanLink } from 'utils'
import { useIsSMDown } from 'themes/useTheme'

const FoundoBidDetail = () => {
  const isSm = useIsSMDown()
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
        mt: theme => (isSm ? 0 : `-${theme.height.header}`),
        pt: theme => (isSm ? 0 : `${theme.height.header}`),
        width: '100%',
        background: '#000'
      }}
    >
      <Header />
      <PcBanner />
      <BidSection />
      <SlideSection title={'Product Description'}>
        <Box
          sx={{
            width: isSm ? '100%' : '680px',
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
            <Typography className="value">Ref.: 356934</Typography>
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
      </SlideSection>
      <SlideSection title={'Authentication'}></SlideSection>
      <SlideSection title={'About Foundo'}>
        <Box
          sx={{
            width: isSm ? '100%' : '680px',
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
                width: isSm ? '90px' : '120px',
                height: isSm ? '90px' : '120px'
              }}
              alt=""
            />
          </Box>
        </Box>
      </SlideSection>
      <SlideSection title={'Token Detail'}>
        <Box
          sx={{
            width: isSm ? '100%' : '680px',
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
      </SlideSection>
      <SlideSection title={'Auction Detail'}>
        <Box
          sx={{
            width: isSm ? '100%' : '763px',
            padding: '70px 0'
          }}
        >
          {poolInfo && <WinnerList poolInfo={poolInfo} />}
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
