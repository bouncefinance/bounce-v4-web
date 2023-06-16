import { Box, Typography, styled } from '@mui/material'
import { BannerType } from './banner'
import { useCountDown } from 'ahooks'
// import P2Img from 'assets/imgs/realWorld/p2.png'
// import EthIcon from 'assets/imgs/realWorld/eth.png'
import { useNavigate } from 'react-router-dom'
const CountDownBg = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  width: 44px;
  height: 44px;
  background: rgba(18, 18, 18, 0.2);
  backdrop-filter: blur(2px);
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #ffffff;

  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
    font-size: 14px;
  }
`
const AuctionCard = ({ banner }: { banner: BannerType }) => {
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: Number(banner.startTime) * 1000
  })
  const navigate = useNavigate()
  const handleClick = (url: string) => {
    if (!url) return
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      window.open(url, '_blank')
    } else {
      navigate(url)
    }
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        margin: '0 auto',
        height: '360px',
        borderRadius: '8px',
        background: `url(${banner.img}) no-repeat top center / auto 100%`,
        backgroundColor: '#000'
      }}
      onClick={() => {
        handleClick(banner.link)
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          display: 'flex',
          gap: '4px'
        }}
      >
        {countdown > 0 ? (
          <>
            <CountDownBg key={'banner0'}>{days}D</CountDownBg>
            <CountDownBg key={'banner1'}>{hours}H</CountDownBg>
            <CountDownBg key={'banner2'}>{minutes}M</CountDownBg>
            <CountDownBg key={'banner3'}>{seconds}S</CountDownBg>
          </>
        ) : (
          <></>
        )}
      </Box>
      {banner.status === 'Live auction' && (
        <Box
          sx={{
            position: 'absolute',
            top: '68px',
            right: '16px',
            width: '60px',
            height: '21px',
            textAlign: 'center',
            background: '#CFF8D1',
            borderRadius: '21px',
            fontFamily: `'Inter'`,
            fontSize: 12,
            color: 'var(--ps-green-1)'
          }}
        >
          Ongoing
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-end',
          alignItems: 'flex-start'
        }}
        gap={'16px'}
      >
        {/* <Box
          sx={{
            height: '24px',
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            background: 'rgba(18, 18, 18, 0.2)',
            backdropFilter: `blur(2px)`
          }}
        >
          <img
            style={{
              width: '24px',
              height: '24px',
              marginRight: '10px'
            }}
            src={EthIcon}
            alt=""
            srcSet=""
          />
          <Typography
            sx={{
              fontSize: '13px',
              color: '#fff',
              fontFamily: `'Public Sans'`,
              fontWeight: 600
            }}
          >
            NFT issued by 4K Alpha Vault
          </Typography>
        </Box> */}
        <Typography
          sx={{
            lineHeight: '22px',
            fontSize: '22px',
            color: '#fff',
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            wordBreak: 'break-all'
          }}
        >
          {banner.name}
        </Typography>
        <Box
          sx={{
            height: '21px',
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            background: 'rgba(18, 18, 18, 0.2)',
            backdropFilter: `blur(2px)`
          }}
          gap={'10px'}
        >
          <Typography
            sx={{
              height: '21px',
              fontSize: '14px',
              color: '#D7D6D9',
              fontFamily: `'Public Sans'`,
              fontWeight: 500
            }}
          >
            Real World Col...
          </Typography>
          <Typography
            sx={{
              height: '21px',
              fontSize: '14px',
              color: '#D7D6D9',
              fontFamily: `'Public Sans'`,
              fontWeight: 500
            }}
          >
            |
          </Typography>
          <Typography
            sx={{
              height: '21px',
              fontSize: '14px',
              color: '#D7D6D9',
              fontFamily: `'Public Sans'`,
              fontWeight: 500
            }}
          >
            Top bid
          </Typography>
          <Typography
            sx={{
              height: '21px',
              fontSize: '14px',
              color: '#D7D6D9',
              fontFamily: `'Public Sans'`,
              fontWeight: 500
            }}
          >
            |
          </Typography>
          <Typography
            sx={{
              height: '21px',
              fontSize: '14px',
              color: '#D7D6D9',
              fontFamily: `'Public Sans'`,
              fontWeight: 500
            }}
          >
            {/* 23.00 BNB */}
            {'ON VIEW'}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
export default AuctionCard
