import { Box, Typography } from '@mui/material'
import { useIsSMDown } from 'themes/useTheme'
import P1 from 'components/Fundo/assets/img/mobile/p1.png'
import D5 from 'components/Fundo/assets/img/D5.png'
import Icon7 from 'components/Fundo/assets/img/icon7.png'
import D3 from 'components/Fundo/assets/img/D3.png'
import D4 from 'components/Fundo/assets/img/D4.png'
import X1 from 'components/Fundo/assets/img/mobile/x.svg'
import CenterSection from 'components/Fundo/CenterSection'

export default function Four() {
  const isSm = useIsSMDown()
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '1400px',
        padding: isSm ? '105px 0 92px' : 'calc(100vh + 350px) 0 2400px',
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
        {isSm && (
          <>
            <CenterSection
              style={{
                width: '100%',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: isSm ? '30px' : '94px'
              }}
            >
              <>
                <Typography
                  sx={{
                    fontWeight: 100,
                    fontSize: isSm ? '56px' : '200px',
                    textAlign: 'center',
                    fontFamily: 'Public Sans',
                    fontStyle: 'italic',
                    lineHeight: isSm ? '40px' : '145px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  NFT ISSUED
                </Typography>
                <img
                  src={D3}
                  style={{
                    display: 'block',
                    width: isSm ? '50px' : '244px'
                  }}
                  alt=""
                />
              </>
            </CenterSection>
            <CenterSection
              style={{
                width: '100%',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 80
              }}
            >
              <>
                <img
                  src={D4}
                  style={{
                    display: 'block',
                    width: isSm ? '50px' : '244px'
                  }}
                  alt=""
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: isSm ? '56px' : '200px',
                    textAlign: 'center',
                    fontFamily: 'Public Sans',
                    fontStyle: 'italic',
                    lineHeight: isSm ? '40px' : '145px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  BY FOUNDO
                </Typography>
              </>
            </CenterSection>
          </>
        )}
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            width: isSm ? '280px' : '950px',
            margin: '0 auto',
            fontWeight: 600,
            fontSize: isSm ? '14px' : '36px',
            textAlign: 'center',
            color: 'var(--ps-text-2)'
          }}
        >
          {`FOUNDO is a web3-native jewellery brand that leverages web3 technology and culture, with a focus on digital art, to provide customer centric products and experiences. The FOUNDO team have experience growing another jewellery brand from zero to over $100M within 3 years previously and are now building FOUNDO as a more ambitious, higher-end brand while integrating web3 IP to growth hack the brand-building process.`}
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
