import { Box } from '@mui/material'
import React from 'react'
import { useIsSMDown } from 'themes/useTheme'

const CenterSection = ({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) => {
  const isSm = useIsSMDown()
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: isSm ? '100%' : '1440px',
        padding: isSm ? '0 16px' : '0 72px',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
    >
      {children}
    </Box>
  )
}
export default CenterSection
