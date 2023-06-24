import { SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Popper from '@mui/material/Popper'
import React, { useState } from 'react'
import useBreakpoint from '../../hooks/useBreakpoint'

export default function PopperCard({
  popperSx,
  sx,
  targetElement,
  children
}: {
  popperSx?: SxProps<Theme>
  sx?: SxProps<Theme>
  targetElement: JSX.Element
  children: JSX.Element | string | number
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = !!anchorEl
  const isSm = useBreakpoint('sm')

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        setAnchorEl(null)
      }}
    >
      <Box>
        <Box onClick={handleClick}>{targetElement}</Box>
        <Popper
          open={open}
          anchorEl={anchorEl}
          sx={{
            top: isSm ? 0 : '20px !important',
            // width: 220,
            zIndex: theme => theme.zIndex.modal,
            ...popperSx
          }}
        >
          <Box
            sx={{
              bgcolor: 'background.paper',
              border: isSm ? 0 : '1px solid rgba(18, 18, 18, 0.06)',
              borderRadius: '8px',
              padding: '6px',
              ...sx
            }}
          >
            {children}
          </Box>
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}
