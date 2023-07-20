import { Box, Grid, Typography, styled } from '@mui/material'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { BigNumber } from 'bignumber.js'

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
const SubscriptLeft = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  return (
    <Box
      sx={{
        flex: 350,
        borderRadius: '6px',
        background: '#121219',
        padding: '16px',
        minHeight: '230px'
      }}
    >
      <Grid container rowGap={'20px'}>
        <Grid item xs={6}>
          <TitleCom>Completed Commit</TitleCom>
          <DescCom>
            {poolInfo?.currencyLowestBidPrice?.toExact() && poolInfo?.currencySwappedAmount0?.toExact()
              ? BigNumber(poolInfo?.currencyLowestBidPrice?.toExact())
                  .times(poolInfo?.currencySwappedAmount0?.toExact())
                  .toFixed(6, BigNumber.ROUND_DOWN)
              : '0'}
            {` ${poolInfo.token1.symbol.toUpperCase()}`}
          </DescCom>
        </Grid>
        <Grid item xs={6}>
          <TitleCom>Successful sold amount</TitleCom>
          <DescCom>
            {poolInfo.currencySwappedAmount0?.toSignificant() + ` ${poolInfo.token0.symbol.toUpperCase()}`} DGT
          </DescCom>
        </Grid>
        {/* <Grid item xs={6}>
          <TitleCom>Total participants</TitleCom>
          <DescCom>--</DescCom>
        </Grid> */}
        <Grid item xs={6}>
          <TitleCom>Current price</TitleCom>
          <DescCom>
            {'1 ' +
              `${poolInfo.token0.symbol.toUpperCase()} = ` +
              poolInfo.currencyCurrentPrice?.toSignificant() +
              ' ' +
              poolInfo.token1.symbol.toUpperCase()}
          </DescCom>
        </Grid>
      </Grid>
    </Box>
  )
}
export default SubscriptLeft
