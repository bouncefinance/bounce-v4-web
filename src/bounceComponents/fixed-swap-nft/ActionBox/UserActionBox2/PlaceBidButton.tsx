import React from 'react'
import { SxProps } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import useIsUserInWhitelist from 'bounceHooks/auction/useIsUserIn1155Whitelist'

export interface PlaceBidButtonProps {
  bidAmount: string
  sx?: SxProps
  onClick: () => void
  loading?: boolean
}

const PlaceBidButton = ({ bidAmount, sx, onClick, loading }: PlaceBidButtonProps): JSX.Element => {
  const { data: isUserInWhitelist, loading: isCheckingWhitelist } = useIsUserInWhitelist()

  // console.log('>>>>>> isUserInWhitelist: ', isUserInWhitelist)

  return (
    <LoadingButton
      variant="contained"
      fullWidth
      sx={{ ...sx }}
      loading={loading}
      disabled={!bidAmount || Number(bidAmount) === 0 || (!isUserInWhitelist && !isCheckingWhitelist)}
      onClick={onClick}
    >
      Place a Bid
    </LoadingButton>
  )
}

export default PlaceBidButton
