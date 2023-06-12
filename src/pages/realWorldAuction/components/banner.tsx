import { Box, styled, Skeleton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useCountDown } from 'ahooks'
import useBreakpoint from '../../../hooks/useBreakpoint'
import EthIcon from 'assets/imgs/realWorld/eth.png'
export interface BannerType {
  name: string
  time: string
  img: string
  link: string
  startTime: number | string
  endTime: number | string
  categories?: string
}

export interface IBanner {
  pic: string
  title: string
  tag: string[]
  countDown: string
}

export const SwiperSkeleton = () => {
  const isSm = useBreakpoint('sm')
  const isMd = useBreakpoint('md')
  return (
    <Box
      sx={{
        width: '100%',
        height: isSm ? 400 : 460,
        backgroundColor: '#e3e3e0',
        borderRadius: '30px',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          left: '0',
          bottom: '40px',
          width: '100%',
          padding: isSm ? '0 16px' : '0 38px 0 40px',
          boxSizing: 'border-box',
          '& .MuiSkeleton-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
          }
        }}
      >
        <Box display="flex" flexDirection="column" width="61%" maxWidth="800px" gap="24px">
          <Box display="flex" flexDirection="row" gap="4px">
            <Skeleton width="32px" height="32px" variant="circular" animation="wave" />
            <Skeleton
              width="107px"
              height="32px"
              variant="rectangular"
              sx={{ borderRadius: '100px' }}
              animation="wave"
            />
          </Box>
          <Skeleton variant="rectangular" width="100%" height="26px" animation="wave" />
          <Skeleton variant="rectangular" width="262px" height="24px" animation="wave" />
        </Box>
      </Box>
      <Box
        display="flex"
        gap="8px"
        flexDirection="row"
        alignItems="end"
        sx={{
          position: 'absolute',
          right: isSm ? 16 : 38,
          top: isSm ? 16 : 420,
          transform: isSm ? 'translateY(0)' : 'translateY(-100%)',
          '& .MuiSkeleton-root': {
            width: isMd ? 44 : 60,
            height: isMd ? 44 : 60,
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
          }
        }}
      >
        {new Array(4).fill(0).map((i, v) => (
          <Skeleton key={v} variant="rectangular" animation="wave" />
        ))}
      </Box>
    </Box>
  )
}

const BannerH3 = styled(Typography)`
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 130%;
  letter-spacing: -0.02em;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #ffffff;
  align-self: stretch;
  flex-grow: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 600px) {
    font-size: 22px;
  }
`
const BannerH6 = styled(Typography)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: #ffffff;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

const CountDownBg = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  width: 60px;
  height: 60px;
  background: rgba(18, 18, 18, 0.2);
  backdrop-filter: blur(2px);
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
    font-size: 14px;
  }
`
const Shadow = styled(Box)`
  position: absolute;
  width: 100%;
  height: 300px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #000000 100%);
  mix-blend-mode: multiply;
  opacity: 0.8;
  border-radius: 0 0 30px 30px;

  @media (max-width: 600px) {
    height: 327px;
    border-radius: 0 0 15px 15px;
  }
`
export function Banner({ banner }: { banner: BannerType }) {
  const isSm = useBreakpoint('sm')
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
        height: '500px',
        width: '100%',
        cursor: 'pointer'
      }}
      onClick={() => handleClick(banner.link || '')}
    >
      <img
        src={banner.img}
        alt=""
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '500px',
          objectFit: 'cover',
          borderRadius: isSm ? '15px' : '30px',
          overflow: 'hidden'
        }}
      />
      <Shadow style={{ position: 'absolute', bottom: 0, left: 0 }} />
      <Box
        sx={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          right: '40px',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}
      >
        <Box
          sx={{
            width: '60%',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              height: '24px',
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              background: 'rgba(18, 18, 18, 0.2)',
              backdropFilter: `blur(2px)`
            }}
            mb={'24px'}
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
                fontSize: '14px',
                color: '#fff',
                fontFamily: `'Public Sans'`,
                fontWeight: 600
              }}
            >
              NFT issued by 4K Alpha Vault
            </Typography>
          </Box>
          <BannerH3 mb={'24px'}>{banner.name}</BannerH3>
          <BannerH6>
            Real World Collectibles | {'Top bid'} | {'ON VIEW'}
          </BannerH6>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}
        >
          <Box
            sx={{
              width: '92px',
              height: '34px',
              lineHeight: '34px',
              textAlign: 'center',
              background: '#CFF8D1',
              borderRadius: '34px',
              fontFamily: `'Inter'`,
              fontSize: 16,
              color: 'var(--ps-green-1)'
            }}
          >
            Ongoing
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '4px'
            }}
            mt={countdown > 0 ? '24px' : 0}
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
        </Box>
      </Box>
    </Box>
  )
}
