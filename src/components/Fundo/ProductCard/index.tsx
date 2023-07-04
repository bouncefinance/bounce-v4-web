import { Box, Typography, Grid } from '@mui/material'
import LineImg from 'components/Fundo/assets/img/line.svg'
import Icon1 from 'components/Fundo/assets/img/icon1.png'
import Icon2 from 'components/Fundo/assets/img/icon2.png'
import Icon3 from 'components/Fundo/assets/img/icon3.png'
import Icon4 from 'components/Fundo/assets/img/icon4.png'
import Icon5 from 'components/Fundo/assets/img/icon5.png'
import Icon6 from 'components/Fundo/assets/img/icon6.png'
import Icon8 from 'components/Fundo/assets/img/icon8.png'
import ProdIcon from 'components/Fundo/assets/img/mainImg.png'
import Logo from 'components/Fundo/assets/img/logo1.png'
import { useIsSMDown } from 'themes/useTheme'

export default function ProductCard({
  hideProductImg,
  hideProduct
}: {
  hideProductImg?: boolean
  hideProduct?: boolean
}) {
  const isSm = useIsSMDown()
  const config = [
    {
      text: 'Gemstone: Diamonds',
      img: Icon1
    },
    {
      text: 'Made In:  Lab-grown',
      img: Icon2
    },
    {
      text: 'Diamonds (Carats): 19.82',
      img: Icon3
    },
    {
      text: 'Pendant size: 4.1 cm',
      img: Icon8
    },
    {
      text: 'Material​: 18k White gold',
      img: Icon5
    },
    {
      text: 'Necklace : 50 cm',
      img: Icon4
    }
  ]
  return (
    <Box
      sx={{
        position: 'relative',
        width: isSm ? '258px' : '458px',
        height: isSm ? '360px' : '640px',
        background: 'rgba(73, 73, 73, 0.31)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(25px)',
        borderRadius: '16px',
        opacity: hideProduct ? 0 : 1,
        padding: isSm ? '16px 16px 0' : '26px 19px 0'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: isSm ? '26px' : '37px'
        }}
        gap={'2px'}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: isSm ? '14px' : '16px',
            fontFamily: `'Public Sans'`,
            color: 'var(--ps-text-5)'
          }}
        >
          Details
        </Typography>
        <img
          src={LineImg}
          alt=""
          style={{
            width: '50px',
            display: 'inline-block',
            flex: 1
          }}
        />
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: isSm ? '14px' : '16px',
            fontFamily: `'Public Sans'`,
            color: 'var(--ps-text-5)',
            whiteSpace: 'nowrap'
          }}
        >
          Ref : LG578319461
        </Typography>
      </Box>
      <Grid container rowSpacing={'8px'}>
        {config.map((item, index) => {
          return (
            <Grid key={index} item xs={isSm ? 12 : 6}>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: isSm ? 'flex-start' : (index + 1) % 2 === 0 ? 'flex-end' : 'flex-start',
                  alignItems: 'ceneter'
                }}
              >
                <img
                  src={item.img}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '8px'
                  }}
                  alt=""
                />
                <Typography
                  sx={{
                    fontFamily: `'Inter'`,
                    color: 'var(--ps-text-2)',
                    fontSize: isSm ? '14px' : '16px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
      <img
        src={ProdIcon}
        style={{
          position: isSm ? 'absolute' : 'relative',
          top: isSm ? '93px' : '0',
          width: isSm ? 250 : 420,
          height: isSm ? 250 : 420,
          objectFit: 'contain',
          opacity: hideProductImg ? 0 : 1,
          transform: 'scale(1.3)',
          overflow: 'hidden'
        }}
        alt=""
      />
      <img
        src={Logo}
        style={{
          position: 'absolute',
          width: isSm ? 33 : 58,
          left: isSm ? 16 : 24,
          bottom: isSm ? 24 : 27,
          cursor: 'pointer'
        }}
        alt=""
      />
      <img
        src={Icon6}
        style={{
          position: 'absolute',
          width: isSm ? 24 : 44,
          right: isSm ? 16 : 24,
          bottom: isSm ? 24 : 30
        }}
        alt=""
      />
    </Box>
  )
}
