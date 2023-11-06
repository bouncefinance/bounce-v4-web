import { Box, Button, Menu, MenuItem, SxProps, Theme, useTheme } from '@mui/material'
import React, { useState } from 'react'
// import { ReactComponent as ArrowDownSVG } from 'assets/imgs/user/arrow_down.svg'
// import { ReactComponent as ArrowUpSVG } from 'assets/imgs/user/arrow_up.svg'
import { ReactComponent as AddSvg } from 'assets/imgs/user/add.svg'
import { useNavigate } from 'react-router-dom'
import { useUserInfo } from 'state/users/hooks'
import { routes } from 'constants/routes'

const CreateBtn: React.FC<{ sx?: SxProps<Theme>; onDismiss?: () => void; opacity?: number }> = ({
  sx,
  onDismiss,
  opacity = 1
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const { token, userInfo } = useUserInfo()
  const theme = useTheme()

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const CreateDialog = () => (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      sx={{
        mt: 4,
        '& .MuiPopover-paper': {
          borderRadius: 8,
          padding: '6px'
        },
        '& .MuiList-padding': {
          padding: '0px 0px 0px 0px',
          background: '#FFFFFF',
          boxShadow: 'none',
          borderRadius: 20
        },
        '& .MuiMenuItem-gutters': {
          padding: '10px 20px',
          borderRadius: 8
        },
        '& .MuiMenuItem-gutters:hover': {
          background: '#E1F25C'
        }
      }}
    >
      <MenuItem
        onClick={() => {
          navigate(`${routes.auction.createAuctionPool}`)
          setAnchorEl(null)
          onDismiss && onDismiss()
        }}
      >
        Create an auction
      </MenuItem>
      {userInfo?.isWhitelist === 2 && (
        <MenuItem
          onClick={() => {
            navigate(`${routes.thirdPart.CreateLaunchpad}`)
            setAnchorEl(null)
            onDismiss && onDismiss()
          }}
        >
          Create an Launchpad
        </MenuItem>
      )}

      {/* <MenuItem
        onClick={() => {
          navigate(routes.idea.create)
          setAnchorEl(null)
        }}
      >
        Create an idea
      </MenuItem> */}
    </Menu>
  )

  if (!token) {
    return <></>
  }

  return (
    <Box>
      <Button
        sx={{
          width: 109,
          height: 44,
          borderRadius: 60,
          border: 'none',
          background: opacity >= 0.65 ? '#F6F6F3' : '#F6F6F315',
          color: opacity >= 0.65 ? theme.palette.text.primary : '#fff',
          ...sx
        }}
        onClick={handleMenuOpen}
        startIcon={<AddSvg />}
      >
        Create
      </Button>
      <CreateDialog />
    </Box>
  )
}

export default CreateBtn
