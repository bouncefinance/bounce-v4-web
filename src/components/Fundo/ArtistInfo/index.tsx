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
        justifyContent: 'flex-start',
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
        Joshua Davis
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
        Joshua Davis is often referred to as a legend in the digital art space. His history in pushing the boundaries of
        generative, programmatic art is unquestionable. His code symphonies are operatic. The codebase is one of his
        masterpieces that has yielded a body of artwork that is vital, arresting and gorgeous. The artwork is a glorious
        fusion of creativity, both human and machine. As a painter, turned programmer, computation became a way to
        amplify his vision. Animation and interaction presented yet another frontier.
      </Typography>
    </Box>
  )
}
