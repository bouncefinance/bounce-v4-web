import { Box, Typography } from '@mui/material'
import CenterSection from 'components/Fundo/CenterSection'
import FixedIndex from 'components/Fundo/Banner/FixedIndex'
import FixedLeft from 'components/Fundo/Banner/FixedLeft'
export default function One() {
  return (
    <CenterSection
      style={{
        height: '100vh',
        minHeight: '880px',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      <>
        <Typography
          sx={{
            width: '100%',
            fontFamily: `'Public Sans'`,
            fontStyle: 'italic',
            fontWeight: 100,
            fontSize: '130px',
            height: '94px',
            lineHeight: '94px',
            color: '#626262',
            textAlign: 'left',
            marginBottom: '24px'
          }}
        >
          ANGEL HAND
        </Typography>
        <Typography
          sx={{
            width: '100%',
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: '110px',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            height: '80px',
            lineHeight: '80px',
            color: '#959595',
            marginBottom: '48px'
          }}
        >
          DIAMOND NECKLACE
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          gap={'40px'}
        >
          <Typography
            sx={{
              flex: 470,
              fontFamily: `'Inter'`,
              fontWight: 400,
              fontSize: '16px'
            }}
          >{`Blossoming between the marvellous monuments of the Eternal City, Fiorever draws inspiration from the alluring four-petal flower that was cherished by the Romans as a symbol of happiness and joy. A blend of two meaningful`}</Typography>
          <Typography
            sx={{
              flex: 688,
              fontFamily: `'Inter'`,
              fontWight: 400,
              fontSize: '16px'
            }}
          >{`words: Fiore - Italian for flower, and forever. Fiorever celebrates the Roman love for life with a free-spirited and passionate design. Designed to sparkle with an eternal glow, the precious floral icon is crafted with a corolla of the highest quality diamonds. Fiorever necklace in 18 kt white gold, set with round brilliant-cut diamonds and pavé diamonds.`}</Typography>
        </Box>
        <FixedIndex />
        <FixedLeft />
      </>
    </CenterSection>
  )
}
