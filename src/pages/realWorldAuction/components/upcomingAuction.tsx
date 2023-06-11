import { Box, Typography, Button } from '@mui/material'
import LeftIcon from 'assets/imgs/realWorld/leftIcon.svg'
import { useIsSMDown } from 'themes/useTheme'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { useState } from 'react'
import UpcomingCard from './upcomingCard'
import 'swiper/css'
const UpcomingAuction = () => {
  const isSm = useIsSMDown()
  const swiper = useSwiper()
  const [swiperItem, setSwiperItem] = useState(swiper)
  const swiperData = [0]
  return (
    <Box
      sx={{
        width: isSm ? 'calc(100% - 16px)' : 'calc(100% - 40px)',
        maxWidth: '1296px',
        margin: '0 auto 20px',
        background: 'var(--ps-text-8)',
        borderRadius: '30px',
        padding: '80px 0 100px',
        overflow: 'hidden'
      }}
    >
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: isSm ? '22px' : '36px',
          width: '100%',
          textAlign: 'center',
          color: 'var(--ps-text-4)',
          marginBottom: '32px'
        }}
      >
        Upcoming Auctions
      </Typography>
      {!isSm && swiperData.length > 3 && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            margin: '40px 0'
          }}
          gap={'8px'}
        >
          <Button
            variant="contained"
            sx={{
              height: '60px',
              width: '60px',
              background: '#fff',
              padding: '0',
              '&:hover': {
                background: 'var(--ps-yellow-1)',
                border: '1px solid var(--ps-yellow-1)'
              }
            }}
            onClick={() => {
              swiperItem?.slidePrev()
            }}
          >
            <img
              src={LeftIcon}
              style={{
                width: '16px',
                height: '16px'
              }}
              alt=""
            />
          </Button>
          <Button
            variant="contained"
            sx={{
              height: '60px',
              width: '60px',
              background: '#fff',
              padding: '0',
              '&:hover': {
                background: 'var(--ps-yellow-1)',
                border: '1px solid var(--ps-yellow-1)'
              }
            }}
            onClick={() => {
              swiperItem?.slideNext()
            }}
          >
            <img
              src={LeftIcon}
              style={{
                width: '16px',
                height: '16px',
                transform: 'rotateZ(180deg)'
              }}
              alt=""
            />
          </Button>
        </Box>
      )}
      <Box
        sx={{
          width: '100%',
          minWidth: '1000px',
          maxWidth: '1216px',
          margin: '0 auto',
          padding: isSm ? '0 0 0 16px' : 'unset'
        }}
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={isSm ? 1 : 3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => {
            console.log(swiper)
            setSwiperItem(swiper)
          }}
        >
          {swiperData.map(item => {
            return (
              <SwiperSlide key={item}>
                <UpcomingCard isSm={isSm} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    </Box>
  )
}
export default UpcomingAuction
