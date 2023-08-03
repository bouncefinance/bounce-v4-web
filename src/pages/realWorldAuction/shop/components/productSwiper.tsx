import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectCreative, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
import { Box, Skeleton, Typography } from '@mui/material'
import { useState } from 'react'
// import EthIcon from 'assets/imgs/auction/eth-icon.svg'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from 'hooks/useBreakpoint'
import ProductImg from 'assets/imgs/realworldShop/bounce/product.png'
import ProductMobileImg from 'assets/imgs/realworldShop/bounce/productMobile.png'
import EthIcon from 'assets/imgs/realworldShop/ethIcon.png'
SwiperCore.use([Autoplay, Pagination])

export interface IBanner {
  pic: string
  title: string
  tag: string[]
  countDown: string
}
interface ProductType {
  title: string
  imgPc: string
  imgMobile: string
  url: string
  amount: number
  status: string
}
export const SwiperSkeleton = () => {
  const isMd = useBreakpoint('md')
  return (
    <Box
      sx={{
        width: '100%',
        height: isMd ? 400 : 460,
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
          padding: isMd ? '0 16px' : '0 38px 0 40px',
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
          right: isMd ? 16 : 38,
          top: isMd ? 16 : 420,
          transform: isMd ? 'translateY(0)' : 'translateY(-100%)',
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

function ProductSwiper() {
  const [swiper, setSwiper] = useState<SwiperCore>()
  console.log('swiper>>', swiper)
  const isMd = useBreakpoint('md')
  const bannerList = [
    {
      title: 'DIMOND HAND NECKLACE',
      imgPc: ProductImg,
      imgMobile: ProductMobileImg,
      url: '',
      amount: 1,
      status: 'unlist'
    },
    {
      title: 'DIMOND HAND NECKLACE',
      imgPc: ProductImg,
      imgMobile: ProductMobileImg,
      url: '',
      amount: 2,
      status: 'unlist'
    }
  ]
  return (
    <Box
      position={'relative'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        maxWidth: '1296px',
        width: '100%',
        minHeight: isMd ? 125 : 460
      }}
    >
      <Swiper
        speed={1200}
        onSwiper={setSwiper}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            translate: [0, 0, -1]
          },
          next: {
            translate: ['100%', 0, 0]
          }
        }}
        modules={[EffectCreative]}
        autoplay={{
          delay: 3000
        }}
        style={{
          maxWidth: '1296px',
          width: '100%'
        }}
      >
        {bannerList?.map((item: ProductType, index: number) => (
          <SwiperSlide key={index}>
            <Banner key={index} index={index} product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
export function Banner({ product, index }: { product: ProductType; index: number }) {
  const isMd = useBreakpoint('md')
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
        cursor: 'pointer',
        background: '#fff'
      }}
      onClick={() => handleClick(product.url || '')}
    >
      <img
        src={isMd ? product.imgMobile : product.imgPc}
        alt=""
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          minHeight: 300,
          objectFit: 'cover',
          borderRadius: isMd ? '12px' : '0'
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: `'Instrument Serif'`,
              color: '#171717',
              fontSize: isMd ? '20px' : '24px',
              lineHeight: '30px'
            }}
          >
            {product.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              color: '#171717',
              fontSize: isMd ? '14px' : '16px',
              lineHeight: '30px'
            }}
          >
            <span
              style={{
                color: '#959595',
                marginRight: '12px'
              }}
            >
              Amount{' '}
            </span>{' '}
            {product.amount}
          </Typography>
        </Box>
        <Box
          sx={{
            color: '#1B1B1B',
            textAlign: 'center',
            fontFamily: 'Inter',
            fontSize: 12,
            fontWeight: 400,
            height: 25,
            lineHeight: '25px',
            padding: '0 8px',
            borderRadius: '100px',
            border: '1px solid #000',
            backdropFilter: 'blur(2px)'
          }}
        >
          unlist
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: isMd ? 12 : 24,
          left: isMd ? 12 : 24,
          width: 60,
          height: 40,
          lineHeight: '40px',
          textAlign: 'center',
          borderRadius: '100px',
          fontSize: isMd ? 14 : 16,
          border: '1px solid var(--black-100, #121212)',
          background: 'rgba(255, 255, 255, 0.40)',
          backdropFilter: 'blur(5px)'
        }}
      >
        {index + 1}
      </Box>
      <img
        style={{
          position: 'absolute',
          top: isMd ? 12 : 24,
          right: isMd ? 12 : 24,
          width: 40,
          height: 40
        }}
        src={EthIcon}
        alt=""
        srcSet=""
      />
    </Box>
  )
}

export default ProductSwiper
