import React, { useCallback, useState } from 'react'
import { ExpandMore } from '@mui/icons-material'
import { Box, Drawer, Stack, Theme } from '@mui/material'
import Search from '../../bounceComponents/common/Header/Search'
import Resources from './Resources'
import CreateBtn from '../../bounceComponents/common/Header/CreateBtn'

const navLinkSx = {
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: 24,
  color: (theme: Theme) => theme.palette.text.secondary,
  padding: '13px 24px',
  width: '100%',
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'flex-start',
  '&.active': {
    color: (theme: Theme) => theme.palette.primary.main
  },
  '&:hover': {
    color: (theme: Theme) => theme.palette.text.primary
  }
} as const

export default function MobileMenu({ isOpen, onDismiss }: { isOpen: boolean; onDismiss: () => void }) {
  return (
    <Drawer
      open={isOpen}
      onClose={onDismiss}
      anchor="top"
      BackdropProps={{ sx: { backgroundColor: 'transparent' } }}
      PaperProps={{
        sx: {
          top: theme => ({ xs: theme.height.mobileHeader, sm: theme.height.header })
        }
      }}
      sx={{
        zIndex: theme => theme.zIndex.appBar,
        overflow: 'hidden',
        top: theme => ({ xs: theme.height.mobileHeader, sm: theme.height.header })
      }}
    >
      <Stack spacing={10} padding={16}>
        <Search />
        <Resources />
        <CreateBtn />
      </Stack>
    </Drawer>
  )
}

export function Accordion({ children, placeholder }: { children: React.ReactNode; placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = useCallback(() => {
    setIsOpen(state => !state)
  }, [])
  return (
    <>
      <Box sx={navLinkSx} display="flex" alignItems="center" gap={12} onClick={handleClick}>
        {placeholder}{' '}
        <ExpandMore
          sx={{
            transform: isOpen ? 'rotate(180deg)' : ''
          }}
        />
      </Box>

      {isOpen && (
        <Box mt={-25} mb={12}>
          {children}
        </Box>
      )}
    </>
  )
}
