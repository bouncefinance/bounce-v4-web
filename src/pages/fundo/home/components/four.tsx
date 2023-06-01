import { Box, Typography } from '@mui/material'
import { useIsSMDown } from 'themes/useTheme'
import P1 from 'components/Fundo/assets/img/mobile/p1.png'
import D5 from 'components/Fundo/assets/img/D5.png'
import Icon7 from 'components/Fundo/assets/img/icon7.png'
import X1 from 'components/Fundo/assets/img/mobile/x.svg'
export default function Four() {
  const isSm = useIsSMDown()
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '1400px',
        padding: isSm ? '105px 0 92px' : 'calc(100vh + 200px) 0 2400px',
        margin: '0 auto'
      }}
    >
      <Box
        style={{
          width: '100%',
          maxWidth: '950px',
          margin: '0 auto',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '80px'
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: isSm ? '14px' : '36px',
            textAlign: 'center',
            color: '#959595'
          }}
        >
          {`FOUNDO® is a new luxury brand that uses the latest in blockchain technology, superior materials and world-class craftsmanship to provide customer-centric products and experiences. It has an extensive line of collections ranging from fine jewelry, home goods, bags, accessorized installations, artwork to NFTs - seeking to unite the virtual-reality world with inter-human verse.`}
        </Typography>
      </Box>
      {isSm && (
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
          gap={'60px'}
        >
          <img
            src={D5}
            style={{
              display: 'block',
              width: '132px'
            }}
            alt=""
          />
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            gap={'50px'}
          >
            <img
              src={Icon7}
              style={{
                display: 'block',
                width: '61px'
              }}
              alt=""
            />
            <img
              src={X1}
              style={{
                display: 'block',
                width: '15px'
              }}
              alt=""
            />
            <img
              src={P1}
              style={{
                display: 'block',
                width: '67px'
              }}
              alt=""
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}
