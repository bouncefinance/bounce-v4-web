import React from 'react'
import { LoadingButton } from '@mui/lab'

import useIsAllTokenSwapped from 'bounceHooks/auction/useIsAllTokenSwapped'

export interface ClaimButtonProps {
  onClick: () => void
  loading?: boolean
}

const ClaimButton = ({ loading, onClick }: ClaimButtonProps): JSX.Element => {
  const isAllTokenSwapped = useIsAllTokenSwapped()

  return (
    <LoadingButton variant="contained" fullWidth loading={loading} onClick={onClick}>
      {!isAllTokenSwapped ? 'Claim your unswapped tokens and fund raised' : 'Claim fund raised'}
    </LoadingButton>
  )
}

export default ClaimButton
