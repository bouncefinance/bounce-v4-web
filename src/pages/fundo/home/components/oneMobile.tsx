import { Box, Typography } from '@mui/material'
import CenterSection from 'components/Fundo/CenterSection'
import FixedIndex from 'components/Fundo/Banner/FixedIndex'
import FixedLeft from 'components/Fundo/Banner/FixedLeft'

export default function oneMobile() {
  return (
    <CenterSection
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: '70vh'
      }}
    >
      <>
        <Typography
          sx={{
            width: '100%',
            fontStyle: 'italic',
            fontWeight: 100,
            fontSize: '36px',
            height: '26px',
            lineHeight: '26px',
            color: '#626262',
            textAlign: 'left',
            marginBottom: '14px'
          }}
        >
          ANGEL HAND
        </Typography>
        <Typography
          sx={{
            width: '100%',
            fontWeight: 600,
            fontSize: '40px',
            textAlign: 'right',
            height: '29px',
            lineHeight: '29px',
            color: '#959595',
            marginBottom: '14px'
          }}
        >
          DIAMOND
        </Typography>
        <Typography
          sx={{
            width: '100%',
            fontWeight: 600,
            fontSize: '40px',
            textAlign: 'left',
            height: '29px',
            lineHeight: '29px',
            color: '#959595',
            marginBottom: '59px'
          }}
        >
          NECKLACE
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'column nowrap',
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
              fontSize: '14px'
            }}
          >{`Blossoming between the marvellous monuments of the Eternal City, Fiorever draws inspiration from the alluring four-petal flower that was cherished by the Romans as a symbol of happiness and joy. A blend of two meaningful`}</Typography>
          <Typography
            sx={{
              flex: 688,
              fontFamily: `'Inter'`,
              fontWight: 400,
              fontSize: '14px'
            }}
          >{`words: Fiore - Italian for flower, and forever. Fiorever celebrates the Roman love for life with a free-spirited and passionate design. Designed to sparkle with an eternal glow, the precious floral icon is crafted with a corolla of the highest quality diamonds. Fiorever necklace in 18 kt white gold, set with round brilliant-cut diamonds and pavé diamonds.`}</Typography>
        </Box>
        <FixedIndex
          style={{
            width: '50px',
            top: '250px',
            right: '20px'
          }}
        />
        <FixedLeft
          style={{
            width: '90px',
            top: '100px',
            left: '20px'
          }}
        />
      </>
    </CenterSection>
  )
}
