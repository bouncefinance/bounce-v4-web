import { Box, Typography } from '@mui/material'
import { useIsSMDown } from 'themes/useTheme'

export default function FundoInfo() {
  const isSm = useIsSMDown()
  1
  return (
    <Box
      sx={{
        position: 'relative',
        width: isSm ? '280px' : '550px',
        minWidth: isSm ? '280px' : '550px',
        minHeight: isSm ? 'unset' : '640px',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: isSm ? '14px' : '16px',
          lineHeight: '24px',
          marginBottom: isSm ? '12px' : '24px',
          color: 'var(--ps-text-2)'
        }}
      >
        Jewelry Artist
      </Typography>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: isSm ? '24px' : '44px',
          marginBottom: isSm ? '32px' : '40px',
          color: 'var(--ps-text-5)'
        }}
      >
        NAHIYA SU
      </Typography>
      <Typography
        sx={{
          fontFamily: `'Inter'`,
          fontWeight: 400,
          fontSize: isSm ? '14px' : '16px',
          lineHeight: '24px',
          marginBottom: isSm ? '12px' : '24px',
          color: 'var(--ps-text-2)'
        }}
      >
        {`Nahiya Su, a visionary in the realm of accessory design, is renowned for her unique ability to weave together
        disparate elements into a harmonious narrative. Her work, much like the artist herself, is a testament to the
        power of contradiction and the beauty that can emerge from it. `}
        <br />
        <br />
        {`Drawing from a rich tapestry of influences, Su's designs are a blend of the ethereal and the earthly, the
        futuristic and the traditional. Her Mongolian roots imbue her work with a sense of primal energy, while her
        fascination with futurism and technology lends a sleek, avant-garde aesthetic to her creations. `}
        <br />
        <br />
        {`Nahiya Su is more than a designer - she is a storyteller. Each piece she creates is a chapter in a larger
        narrative, a tale of transformation and evolution. Her work is not merely about adorning the body, but about
        expressing the complexities of the human spirit.`}
      </Typography>
    </Box>
  )
}
