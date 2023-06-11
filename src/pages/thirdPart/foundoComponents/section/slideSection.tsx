import { Box, Typography } from '@mui/material'
import CenterSeciont from '../centerSection'
import React, { useState } from 'react'
const SlideSection = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  return (
    <CenterSeciont
      style={{
        maxWidth: '100vw',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: '104px',
        overflow: 'hidden',
        maxHeight: open ? 'auto' : '104px',
        borderBottom: `1px solid rgba(255, 255, 255, 0.4)`
      }}
    >
      <Typography
        sx={{
          width: open ? 'unset' : '100%',
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: 20,
          color: '#fff',
          cursor: 'pointer',
          lineHeight: '104px'
        }}
        onClick={() => {
          const result = !open
          setOpen(result)
        }}
      >
        {title}
      </Typography>
      {open && <Box>{children}</Box>}
    </CenterSeciont>
  )
}
export default SlideSection
