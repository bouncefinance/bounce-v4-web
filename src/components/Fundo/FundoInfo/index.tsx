import { Box, Typography } from '@mui/material'
import Icon1 from 'components/Fundo/assets/img/icon1.png'
import Icon2 from 'components/Fundo/assets/img/icon2.png'
import Icon3 from 'components/Fundo/assets/img/icon3.png'
import Icon4 from 'components/Fundo/assets/img/icon4.png'
import Icon5 from 'components/Fundo/assets/img/icon5.png'
import Icon8 from 'components/Fundo/assets/img/icon8.png'
import { useIsSMDown } from 'themes/useTheme'
import { useMemo } from 'react'
export default function FundoInfo({ animationRatio }: { animationRatio?: string }) {
  const isSm = useIsSMDown()
  const config = [
    {
      label: 'Gemstone',
      value: 'Diamonds',
      img: Icon1
    },
    {
      label: 'Diamonds (Carats) ',
      value: '19.21 Carats',
      img: Icon3
    },
    {
      label: 'Material',
      value: '18K  ​White gold',
      img: Icon5
    },
    {
      label: 'Made In',
      value: 'Lab-grown',
      img: Icon2
    },
    {
      label: 'Pendant size',
      value: '4.1 cm',
      img: Icon8
    },
    {
      label: 'Necklace length',
      value: '50 cm',
      img: Icon4
    }
  ]
  const transformStr = useMemo(() => {
    let result = 'translate3D(0, 0, 0)'
    if (Number(animationRatio) > 0.2 && Number(animationRatio) < 0.5) {
      result = `translate3D(0 , -${(Number(animationRatio) - 0.2) * 480}px, 0)`
    } else if (Number(animationRatio) >= 0.5) {
      result = `translate3D(0 , -164px, 0)`
    }
    return result
  }, [animationRatio])
  return (
    <Box
      sx={{
        position: 'relative',
        width: isSm ? '280px' : '550px',
        minWidth: isSm ? '280px' : '550px',
        minHeight: isSm ? 'unset' : '640px',
        paddingTop: '26px',
        '&:after': {
          content: `''`,
          display: isSm ? 'none' : 'block',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '150px',
          background: `linear-gradient(2.46deg, #000000 -10.63%, rgba(0, 0, 0, 0.36) 28.27%, rgba(0, 0, 0, 0) 98.37%)`
        }
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: isSm ? '24px' : '64px',
          lineHeight: '70px',
          marginBottom: isSm ? '32px' : '20px',
          color: 'var(--ps-text-5)'
        }}
      >
        Diamond Hand Necklace
      </Typography>
      <Box
        sx={{
          fontWeight: 500,
          width: '100%',
          maxHeight: isSm ? 'unset' : '450px',
          overflow: isSm ? 'unset' : 'hidden'
        }}
      >
        <Box
          sx={{
            transform: transformStr
          }}
        >
          <Box
            sx={{
              height: '48px',
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #343434'
            }}
          >
            <Typography
              sx={{
                fontFamily: `'Public Sans'`,
                fontWeight: isSm ? 600 : 500,
                fontSize: isSm ? '13px' : '16px',
                color: 'var(--ps-text-5)'
              }}
            >
              Details
            </Typography>
            <Typography
              sx={{
                fontFamily: `'Public Sans'`,
                fontWeight: isSm ? 600 : 500,
                fontSize: isSm ? '14px' : '16px',
                color: 'var(--ps-text-5)'
              }}
            >
              Ref: LG578319461
            </Typography>
          </Box>
          {config.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  height: '48px',
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: index !== config.length - 1 ? '1px solid #343434' : ''
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start'
                  }}
                >
                  <img
                    src={item.img}
                    style={{
                      width: isSm ? '16px' : '20px',
                      height: isSm ? '16px' : '20px',
                      marginRight: '8px'
                    }}
                    alt=""
                  />
                  <Typography
                    sx={{
                      fontFamily: `'Public Sans'`,
                      fontWeight: 500,
                      fontSize: isSm ? '13px' : '16px',
                      color: 'var(--ps-text-2)'
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: `'Public Sans'`,
                    fontWeight: 500,
                    fontSize: isSm ? '14px' : '16px',
                    color: 'var(--ps-text-5)'
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            )
          })}
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: isSm ? '13px' : '16px',
              margin: '10px 0',
              color: 'var(--ps-text-5)'
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: isSm ? '14px' : '16px',
              fontFamily: `'Inter'`,
              color: 'var(--ps-text-2)'
            }}
          >
            {/* 0 - 0.4 scroll to bottom */}
            {`Blossoming between the marvellous monuments of the Eternal City, Fiorever draws inspiration from the alluring four-petal flower that was cherished by the Romans as a symbol of happiness and joy. A blend of two meaningful words: Fiore - Italian for flower, and forever. Fiorever celebrates the Roman love for life with a free-spirited and passionate design. Designed to sparkle with an eternal glow, the precious floral icon is crafted with a corolla of the highest quality diamonds. Fiorever necklace in 18 kt white gold, set with round brilliant-cut diamonds and pavé diamonds.`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
