import { Box, Grid, Typography, styled } from '@mui/material'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { BigNumber } from 'bignumber.js'
import { useIsMDDown } from 'themes/useTheme'

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
const SubscriptLeft = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  return (
    <Box
      sx={{
        flex: 350,
        borderRadius: '6px',
        background: '#121219',
        padding: '16px',
        minHeight: isMd ? 'unset' : '230px'
      }}
    >
      <Grid container rowGap={isMd ? '0' : '20px'}>
        <Grid item xs={12} md={12} lg={6}>
          <TitleCom>Completed Commit</TitleCom>
          <DescCom>
            {poolInfo?.currencyAmountStartPrice?.toExact() && poolInfo?.currencySwappedAmount0?.toExact()
              ? BigNumber(poolInfo?.currencyAmountStartPrice?.toExact())
                  .times(poolInfo?.currencySwappedAmount0?.toExact())
                  .toFixed(6, BigNumber.ROUND_DOWN)
              : '0'}
            {` ${poolInfo.token1.symbol.toUpperCase()}`}
          </DescCom>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <TitleCom>Successful sold amount</TitleCom>
          <DescCom>
            {poolInfo.currencySwappedAmount0?.toSignificant() + ` ${poolInfo.token0.symbol.toUpperCase()}`}
          </DescCom>
        </Grid>
        {/* <Grid item xs={6}>
          <TitleCom>Total participants</TitleCom>
          <DescCom>--</DescCom>
        </Grid> */}
        <Grid item xs={12} md={12} lg={6}>
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
