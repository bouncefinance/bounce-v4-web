import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export type IBoxLayoutProps = {
  link: string
  title: string
  image: React.ReactNode
  onBind: () => void
}

const BoxLayout: React.FC<IBoxLayoutProps> = ({ link, title, image, onBind }) => {
  return (
    <Box
      display={'flex'}
      alignItems="center"
      justifyContent={'space-between'}
      height={80}
      sx={{ borderBottom: '1px solid #D7D6D9' }}
    >
      <Box display={'flex'} alignItems="center">
        {image}
        <Typography variant="body1" color={'var(--ps-text-3)'} ml={10}>
          {title}
        </Typography>
      </Box>
      <Box display={'flex'} alignItems="center">
        <Typography variant="body1" fontWeight={600} color={'var(--ps-text-3)'} ml={10}>
          {link}
        </Typography>
      </Box>
      {!link && (
        <Button sx={{ width: 102, height: 32, backgroundColor: 'var(--ps-yellow-1)' }} onClick={onBind}>
          Connect
        </Button>
      )}
    </Box>
  )
}

export default BoxLayout
