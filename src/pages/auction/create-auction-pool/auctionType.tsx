import { Box } from '@mui/material'

import { useEffect } from 'react'

import RoundedContainer from 'bounceComponents/create-auction-pool/RoundedContainer'
import { CreationStep, TokenType, AuctionType } from 'bounceComponents/create-auction-pool/types'
import ValuesProvider, {
  ActionType,
  useValuesDispatch,
  useValuesState
} from 'bounceComponents/create-auction-pool/ValuesProvider'
import Stepper from 'bounceComponents/create-auction-pool/Stepper'
import { isSupportedAuctionType } from 'constants/auction'
import { useQueryParams } from 'hooks/useQueryParams'
import { useActiveWeb3React } from 'hooks'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import Erc20Pool from './Erc20Pool'
import Erc1155Pool from './Erc1155Pool'
import Erc721Pool from './Erc721Pool'

import RandomSelection from './RandomSelection'
import useBreakpoint from 'hooks/useBreakpoint'
import DutchAuction from './DutchAuction'
const steps = ['1. Token Information', '2. Auction Parameters', '3. Advanced Settings']

const CreateAuctionPool = () => {
  const valuesState = useValuesState()
  const valuesDispatch = useValuesDispatch()
  const isSm = useBreakpoint('sm')
  const { tokenType, auctionType } = useQueryParams()

  useEffect(() => {
    console.log('tokenType, auctionType>>>', tokenType, auctionType)
    valuesDispatch?.({
      type: ActionType.SetTokenType,
      payload: { tokenType: tokenType || TokenType.ERC20 }
    })
    valuesDispatch?.({
      type: ActionType.SetAuctionType,
      payload: { auctionType: auctionType }
    })
  }, [auctionType, tokenType, valuesDispatch])
  return (
    <>
      <RoundedContainer maxWidth="md" sx={{ pt: 22 }}>
        {valuesState.activeStep !== CreationStep.CREATION_CONFIRMATION && (
          <Box sx={{ px: isSm ? 16 : 22 }}>
            <Stepper steps={steps} valuesState={valuesState} valuesDispatch={valuesDispatch} />
          </Box>
        )}
        {valuesState.auctionType === AuctionType.FIXED_PRICE && valuesState.tokenType === TokenType.ERC20 ? (
          <Erc20Pool />
        ) : null}
        {valuesState.auctionType === AuctionType.DUTCH_AUCTION && valuesState.tokenType === TokenType.ERC20 ? (
          <DutchAuction />
        ) : null}
        {valuesState.auctionType === AuctionType.FIXED_PRICE && valuesState.tokenType === TokenType.ERC1155 ? (
          <Erc1155Pool />
        ) : null}
        {valuesState.auctionType === AuctionType.RANDOM_SELECTION && valuesState.tokenType === TokenType.ERC20 ? (
          <RandomSelection />
        ) : null}
        {valuesState.tokenType === TokenType.ERC721 ? <Erc721Pool /> : null}
      </RoundedContainer>
    </>
  )
}

// TODO: Disabe pool creation is account is not binded
// TODO: notice user that start time is earlier current moment

const CreateAuctionPoolPage = () => {
  const { redirect } = useQueryParams()
  const navigate = useNavigate()

  const { account } = useActiveWeb3React()

  const { auctionType } = useQueryParams()

  useEffect(() => {
    if (!account || typeof auctionType !== 'string' || !isSupportedAuctionType(auctionType)) {
      navigate(`${routes.auction.createAuctionPool}?redirect=${redirect}`)
    }
  }, [account, auctionType, navigate, redirect])

  return (
    <ValuesProvider>
      <CreateAuctionPool />
    </ValuesProvider>
  )
}

export default CreateAuctionPoolPage
