import { Box } from '@mui/material'
import React from 'react'
const CenterSection = ({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1440px',
        padding: '0 72px',
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
