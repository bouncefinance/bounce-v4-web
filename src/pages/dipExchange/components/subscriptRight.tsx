import { Box, Grid, Typography, styled } from '@mui/material'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { ReactComponent as TipSvg } from 'assets/imgs/dipExchange/tips.svg'
import { useMemo, useState } from 'react'
import { useActiveWeb3React } from 'hooks'
import { ComBtn } from './claimBlock'
import { TipsBox } from './claimBlock'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import BidDialog from './bidDialog'

const TitleCom = styled(Typography)(() => ({
  color: '#626262',
  fontFamily: `'Inter'`,
  fontSize: 12,
  fontWeight: 400,
  marginBottom: '8px'
}))
const DescCom = styled(Typography)(() => ({
  color: '#959595',
  fontFamily: `'Inter'`,
  fontSize: 13,
  fontWeight: 400,
  marginBottom: '8px'
}))
const SubscriptRight = ({ poolInfo, maxValue }: { poolInfo: DutchAuctionPoolProp; maxValue: number | string }) => {
  const { account, chainId } = useActiveWeb3React()
  const [open, setOpen] = useState<boolean>(false)

  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  if (!account) {
    return (
      <Box
        sx={{
          flex: 317,
          padding: '16px 0'
        }}
      >
        <ConnectWalletButton />
      </Box>
    )
  }
  if (!isCurrentChainEqualChainOfPool) {
    return (
      <Box
        sx={{
          flex: 317,
          padding: '16px 0'
        }}
      >
        <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
      </Box>
    )
  }
  return (
    <Box
      sx={{
        flex: 317,
        padding: '16px 0'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
        mb={'8px'}
      >
        <DescCom
          sx={{
            marginBottom: 0
          }}
        >
          Your max commitment limit{' '}
        </DescCom>
        <TipSvg
          style={{
            marginLeft: '8px'
          }}
        />
      </Box>
      <Typography
        sx={{
          color: '#D7D6D9',
          fontFamily: `'Public Sans'`,
          fontSize: 16,
          fontWeight: 600
        }}
        mb={'20px'}
      >
        {`${maxValue} ${poolInfo.token0.symbol.toUpperCase()}`}
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <TitleCom>You will receive</TitleCom>
          <Typography
            sx={{
              color: '#2B51DA',
              fontFamily: `'Public Sans'`,
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            {poolInfo.currencySwappedAmount0?.toSignificant()}
            {` ${poolInfo.token0.symbol.toUpperCase()}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TitleCom>Your committed USDT</TitleCom>
          <Typography
            sx={{
              color: '#2B51DA',
              fontFamily: `'Public Sans'`,
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            {poolInfo.currencySwappedAmount0?.toSignificant() + ` ${poolInfo.token0.symbol.toUpperCase()}`} DGT
          </Typography>
        </Grid>
      </Grid>
      {Number(maxValue) > 0 && (
        <ComBtn
          sx={{
            width: '100%',
            marginTop: '30px'
          }}
          onClick={() => setOpen(true)}
        >
          Bid
        </ComBtn>
      )}
      {Number(maxValue) === 0 && (
        <TipsBox
          style={{
            marginTop: '16px'
          }}
        >
          There is no quota for sale and the purchased tokens can be claimed after the end of the current round
        </TipsBox>
      )}
      <BidDialog
        poolInfo={poolInfo}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        maxValue={maxValue}
      />
    </Box>
  )
}
export default SubscriptRight
