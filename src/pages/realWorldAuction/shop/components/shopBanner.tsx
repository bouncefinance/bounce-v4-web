import { Box, useTheme, Typography } from '@mui/material'
import EthIcon2 from 'assets/imgs/realworldShop/ethIcon.png'
import { useIsMDDown } from 'themes/useTheme'

export interface BannerType {
  banner: string
  logo: string
  logoMobile: string
  bannerMobile: string
  name: string
  link1?: string
  link2?: string
  link3?: string
  link4?: string
}
const ShopBanner = ({ bannerData }: { bannerData: BannerType }) => {
  const theme = useTheme()
  const isMd = useIsMDDown()
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: isMd ? 'auto' : `calc(100vh - ${theme.height.head ? theme.height.head : '0px'})`,
        maxHeight: isMd ? 'unset' : '680px'
      }}
    >
      <img
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: isMd ? 'unset' : '100%',
          objectFit: 'cover'
        }}
        src={isMd ? bannerData.bannerMobile : bannerData.banner}
        alt=""
      />
      <Box
        sx={{
          position: 'absolute',
          width: 'calc(100% - 32px)',
          maxWidth: '1296px',
          bottom: isMd ? 24 : 40,
          left: isMd ? 16 : '50%',
          transform: isMd ? 'unset' : 'translate3D(-50%, 0, 0)',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
        gap={'15px'}
      >
        <img
          style={{
            width: isMd ? 40 : 120,
            height: isMd ? 40 : 120,
            objectFit: 'cover'
          }}
          src={bannerData.logo}
          alt=""
          srcSet=""
        />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexFlow: isMd ? 'row nowrap' : 'column nowrap',
            justifyContent: isMd ? 'space-between' : 'center',
            alignItems: isMd ? 'center' : 'flex-start'
          }}
          gap={'16px'}
        >
          <Typography
            sx={{
              fontVariantNumeric: 'lining-nums proportional-nums',
              fontFamily: `'Instrument Serif'`,
              fontSize: isMd ? 32 : 64,
              fontWeight: 400,
              lineHeight: '46px',
              textTransform: 'uppercase',
              color: '#fff'
            }}
          >
            {bannerData.name}
          </Typography>
          <Box
            sx={{
              position: isMd ? 'relative' : 'sticky',
              top: isMd ? 0 : 166,
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            gap={'12px'}
          >
            <Box
              sx={{
                display: 'inline-block',
                color: '#626262',
                textAlign: 'center',
                padding: '0 12px',
                fontFamily: `'Inter'`,
                fontSize: 12,
                borderRadius: '25px',
                background: '#D7D6D9',
                backdropFilter: 'blur(2px)'
              }}
            >
              Upcoming
            </Box>
            <img
              style={{
                width: isMd ? 24 : 25
              }}
              src={EthIcon2}
              alt=""
              srcSet=""
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default ShopBanner
