import { Box, Typography, useTheme } from '@mui/material'
import CenterSection from 'components/Fundo/CenterSection'
import FixedIndex from 'components/Fundo/Banner/FixedIndex'
import FixedLeft from 'components/Fundo/Banner/FixedLeft'
import { useIsSMDown } from 'themes/useTheme'

export default function One() {
  const theme = useTheme()
  const isSm = useIsSMDown()
  return (
    <CenterSection
      style={{
        height: `calc(100vh - ${theme.height.header})`,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: isSm ? 'calc(100% - 20px)' : 'calc(100% - 75px - 45px)'
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
          Diamond
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
          HAND Necklace
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginBottom: '40px'
          }}
          gap={'40px'}
        >
          <Typography
            sx={{
              flex: 470,
              fontFamily: `'Inter'`,
              fontWight: 400,
              fontSize: '16px',
              color: 'var(--ps-text-2)'
            }}
          >{`Embodying the indomitable spirit of the blockchain pioneers, we present the 'Diamond Hand' necklace - a testament to the unwavering faith of those who dared to venture into the uncharted territories of the crypto world.`}</Typography>
          <Typography
            sx={{
              flex: 688,
              fontFamily: `'Inter'`,
              fontWight: 400,
              fontSize: '16px',
              color: 'var(--ps-text-2)'
            }}
          >{`This piece is a homage to the 'Hodl' philosophy, a term deeply embedded in the lexicon of the crypto community, symbolizing their steadfast commitment to hold onto their investments amidst the capricious tides of the market.`}</Typography>
        </Box>
        <FixedIndex />
        <FixedLeft />
      </>
    </CenterSection>
  )
}
