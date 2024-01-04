import { Box, Stack, Typography, styled } from '@mui/material'
import Icon1 from 'assets/imgs/nftLottery/tokenInformation/token-icon1.svg'
import Icon2 from 'assets/imgs/nftLottery/tokenInformation/token-icon2.svg'
import Icon3 from 'assets/imgs/nftLottery/tokenInformation/token-icon3.svg'
import Icon4 from 'assets/imgs/nftLottery/tokenInformation/token-icon4.svg'
import Icon5 from 'assets/imgs/nftLottery/tokenInformation/token-icon5.png'
import { ChainId } from 'constants/chain'
import { BAST_TOKEN } from 'constants/index'
import { Currency } from 'constants/token'

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
const token1Info = [
  { name: 'AUCTION', price: 100, weights: 2, icon: Icon1, color: '#7966E7' },
  { name: 'MUBI', price: 100, weights: 1, icon: Icon2, color: '#90BE6D' },
  { name: 'DAII', price: 100, weights: 2, icon: Icon3, color: '#3F90FF' },
  { name: 'BSSB', price: 100, weights: 2, icon: Icon4, color: '#0BFFDA' },
  { name: 'AMMX', price: 100, weights: 1, icon: Icon5, color: '#51DCF6' }
]
const TitleContainer = () => {
  return (
    <>
      <BlackWeightP1>Support multiple stake assets</BlackWeightP1>
      <GrayP1 mt={20}>
        Once you stake a certain token, you can only stake that token here when you want to increase your stake again.
      </GrayP1>
      <Box mt={24} sx={{ padding: '24px 16px', borderRadius: 12, background: '#D6DFF6' }}>
        <BlueP1>
          Calculation of final limit = number of tokens you staked (USD value) + staked time *Staking auctions will
          receive additional calculation weight.
        </BlueP1>
      </Box>
    </>
  )
}
const TokenBoxList = ({ token1 }: { token1: Currency | undefined }) => {
  return (
    <Stack mt={40} flexDirection={'row'} gap={16} flexWrap={'wrap'}>
      {token1Info.map(i => (
        <Box
          key={i.name}
          sx={{
            display: 'flex',
            padding: '12px 24px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 10,
            borderRadius: 8,
            background: 'var(--yellow, #E1F25C)'
          }}
        >
          <Stack flexDirection={'row'} alignItems={'center'} gap={4}>
            <img src={i.icon} style={{ width: 20, height: 20 }} />
            <BlackSmallP1> 1 {i.name} = </BlackSmallP1>
            <img src={token1?.logo || Icon2} style={{ width: 20, height: 20 }} />
            <BlackSmallP1>
              {' '}
              {i.price} {token1?.name}{' '}
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
const Header = () => {
  const token1 = BAST_TOKEN[ChainId.MAINNET]
  console.log('token1', token1)

  return (
    <Box sx={{ width: '100%', maxWidth: 1440, margin: '0 auto' }}>
      <TitleContainer />
      <TokenBoxList token1={token1} />
    </Box>
  )
}
export default Header
