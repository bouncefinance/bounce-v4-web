import { Box, Stack, Typography, styled, useTheme } from '@mui/material'
import { MultiTokenResultType } from 'bounceHooks/launchpad/useLaunchpadCoinInfo'
import { ChainId } from 'constants/chain'
import { Currency, CurrencyAmount } from 'constants/token'
import { getIcon } from 'pages/nftLottery/sections/tokenInformation/config'
import { useMemo } from 'react'
import { useToken } from 'state/wallet/hooks'

const BlackWeightP1 = styled(Typography)`
  color: var(--black-100, #121212);
  leading-trim: both;
  text-edge: cap;
  font-variant-numeric: lining-nums proportional-nums;

  /* D/H3 */
  font-family: Public Sans;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 36.4px */
  letter-spacing: -0.56px;
  text-transform: capitalize;
`
const GrayP1 = styled(Typography)`
  color: var(--grey-03, #959595);
  leading-trim: both;
  text-edge: cap;

  /* D/body01 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`
const BlueP1 = styled(Typography)`
  color: var(--blue-d, #2b51da);
  leading-trim: both;
  text-edge: cap;

  /* M/body01 */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`

const BlackSmallP1 = styled(Typography)`
  color: var(--black-100, #121212);

  /* D/H5 */
  font-family: Public Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`
export const token1Info = [
  { name: 'AUCTION', price: 100, weights: 2, icon: getIcon('AUCTION'), color: '#7966E7' },
  { name: 'MUBI', price: 100, weights: 1, icon: getIcon('MUBI'), color: '#90BE6D' },
  { name: 'DAII', price: 100, weights: 2, icon: getIcon('DAII'), color: '#3F90FF' },
  { name: 'BSSB', price: 100, weights: 2, icon: getIcon('BSSB'), color: '#0BFFDA' },
  { name: 'AMMX', price: 100, weights: 1, icon: getIcon('AMMX'), color: '#51DCF6' }
]
const TitleContainer = () => {
  return (
    <>
      <BlackWeightP1>Choose One Token from a Variety of Token Types for Staking</BlackWeightP1>
      <GrayP1 mt={20}>
        After staking one type of supported token, you are required to use the same token type for any subsequent
        increases to your stake.
      </GrayP1>
      <Box mt={24} sx={{ padding: '24px 16px', borderRadius: 12, background: '#D6DFF6' }}>
        <BlueP1>
          Calculation of final limit = number of tokens you staked (USD value) + staked time
          {/* *Staking auctions will receive additional calculation weight. */}
        </BlueP1>
      </Box>
    </>
  )
}
interface ITokenList {
  name: string
  weights: number
  price: string
  icon: string | null
}
const TokenBoxList = ({
  token1Amounts,
  token0Currency
}: {
  token1Amounts: ITokenList[] | undefined
  token0Currency: Currency | undefined | null
}) => {
  const theme = useTheme()
  return (
    <Stack mt={40} flexDirection={'row'} gap={16} flexWrap={'wrap'}>
      {token1Amounts?.map(i => (
        <Box
          key={i.name}
          sx={{
            display: 'flex',
            padding: '12px 24px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 10,
            borderRadius: 8,
            background: 'var(--yellow, #E1F25C)',
            [theme.breakpoints.down('sm')]: {
              flex: 1
            }
          }}
        >
          <Stack flexDirection={'row'} alignItems={'center'} gap={4}>
            <img src={i.icon || ''} style={{ width: 20, height: 20 }} />
            <BlackSmallP1> 1 {i.name} = </BlackSmallP1>
            <img src={getIcon('PORT3') || ''} style={{ width: 20, height: 20 }} />
            <BlackSmallP1>
              {' '}
              {i.price} {token0Currency?.symbol?.toLocaleUpperCase()}
            </BlackSmallP1>
          </Stack>
          <Box>
            <BlackSmallP1>Weights = {i.weights}</BlackSmallP1>
          </Box>
        </Box>
      ))}
    </Stack>
  )
}
const Header = ({ coinInfo }: { coinInfo: MultiTokenResultType | undefined }) => {
  const quoteAmount = useMemo(() => {
    if (!coinInfo?.poolInfo?.quoteAmountTotal1) return
    return CurrencyAmount.fromRawAmount(Currency.getNativeCurrency(), coinInfo?.poolInfo?.quoteAmountTotal1.toString())
  }, [coinInfo?.poolInfo?.quoteAmountTotal1])

  const poolToken1s = coinInfo?.token1StakedStats?.totalStakeAmount

  const token1Amounts = useMemo(() => {
    if (
      !coinInfo ||
      !quoteAmount ||
      !poolToken1s ||
      poolToken1s.some(i => !i) ||
      !coinInfo.token1StakedStats?.token1sCurrency
    ) {
      return
    }
    return coinInfo.token1StakedStats?.token1sCurrency.map<ITokenList>((cr, id) => ({
      name: cr.symbol || '--',
      price: quoteAmount.div(poolToken1s[id]).toSignificant(4),
      icon: getIcon(cr.symbol) || '',
      weights: 1
    }))
  }, [coinInfo, poolToken1s, quoteAmount])
  const token0Currency = useToken(coinInfo?.poolInfo?.token0 || '', coinInfo?.poolInfo?.chainId || ChainId.MAINNET)

  return (
    <Box sx={{ width: '100%' }}>
      <TitleContainer />
      <TokenBoxList token1Amounts={token1Amounts} token0Currency={token0Currency} />
    </Box>
  )
}
export default Header
