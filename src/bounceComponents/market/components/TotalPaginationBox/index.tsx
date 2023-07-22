import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import React, { useCallback } from 'react'
import { toast } from 'react-toastify'
import { routes } from 'constants/routes'
import { useShowLoginModal, useUserInfo } from 'state/users/hooks'
import { useNavigate } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks'

export type ITotalPaginationBoxProps = {
  total: number
  children: React.ReactNode
  create?: boolean
}

const TotalPaginationBox: React.FC<ITotalPaginationBoxProps> = ({ total, children, create }) => {
  const { token } = useUserInfo()
  const { account } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const navigate = useNavigate()
  // const { run: web3Login } = useWeb3Login(`${routes.auction.createAuctionPool}?redirect=${routes.market.index}`)

  const handleCreateBtnClick = useCallback(() => {
    if (!account || !token) {
      toast.error('Please connect wallet first')
      showLoginModal()
      return
    }
    navigate(`${routes.auction.createAuctionPool}?redirect=${routes.market.index}`)
  }, [account, navigate, showLoginModal, token])

  return (
    <Box p={'50px 48px 59px'} sx={{ background: '#FFFFFF', borderRadius: 20 }}>
      <Box display={'flex'} justifyContent="space-between" mb={44} alignItems={'center'}>
        <Typography variant="h2" fontSize={24}>
          Total {total} results
        </Typography>
        {create && (
          <Button
            variant="contained"
            sx={{ width: 163 }}
            endIcon={<AddCircleOutlineIcon />}
            onClick={handleCreateBtnClick}
          >
            Create pool
          </Button>
        )}
      </Box>
      {children}
    </Box>
  )
}

export default TotalPaginationBox
