import { SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import React, { useState } from 'react'
import useBreakpoint from '../../hooks/useBreakpoint'

export default function PopperCard({
  popperSx,
  sx,
  targetElement,
  closeHandler,
  children,
  placement
}: {
  popperSx?: SxProps<Theme>
  sx?: SxProps<Theme>
  targetElement: JSX.Element
  children: JSX.Element | string | number
  closeHandler?: () => void
  placement?: PopperPlacementType
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = !!anchorEl
  const isSm = useBreakpoint('sm')

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    anchorEl && closeHandler && closeHandler()
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        setAnchorEl(null)
        closeHandler && closeHandler()
      }}
    >
      <Box>
        <Box onClick={handleClick}>{targetElement}</Box>
        <Popper
          open={open}
          anchorEl={anchorEl}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            top: isSm ? 0 : '20px !important',
            // width: 220,
            zIndex: theme => theme.zIndex.modal,
            ...popperSx
          }}
          placement={placement}
        >
          <Box
            sx={{
              bgcolor: 'background.paper',
              border: isSm ? 0 : '1px solid rgba(18, 18, 18, 0.06)',
              borderRadius: '8px',
              padding: { xs: 12, sm: 6 },
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
