import { Box, Typography, styled, Stack } from '@mui/material'
import { RandomSelectionNFTProps } from 'api/pool/type'
import Icon1 from 'assets/imgs/nftLottery/tokenInformation/token-icon1.svg'
import Icon2 from 'assets/imgs/nftLottery/tokenInformation/token-icon2.svg'
import Icon3 from 'assets/imgs/nftLottery/tokenInformation/token-icon3.svg'
import Icon4 from 'assets/imgs/nftLottery/tokenInformation/token-icon4.svg'
import Icon5 from 'assets/imgs/nftLottery/tokenInformation/token-icon5.png'

const TokenBg = styled(Box)(
  ({ theme }) => `
display: flex;
padding: 12px 16px;
flex-direction: row;
align-items: center;
gap: 10px;
border-radius: 100px;
background: #fff;
border: 1px solid #fff;
cursor: pointer;
&:hover,
&.select {
  border: 1px solid #000;
}
${theme.breakpoints.down('sm')} {
  padding: 8px 12px;
}
`
)
const P1 = styled(Typography)(
  ({ theme }) => `
  color: var(--black-100, #121212);

  /* D/H5 */
  font-family: Public Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  ${theme.breakpoints.down('sm')} {
    font-size:14px;
  }

`
)
const bidTokenList = [
  {
    price: 10,
    name: 'AUCTION',
    icon: Icon1,
    color: '#CCC496'
  },
  {
    price: 20,
    name: 'MUBI',
    icon: Icon2,
    color: '#DBAC48'
  },
  {
    price: 20,
    name: 'DAII',
    icon: Icon3,
    color: '#AB883C'
  },
  {
    price: 20,
    name: 'BSSB',
    icon: Icon4,
    color: '#9E9871'
  },
  {
    price: 20,
    name: 'AMMX',
    icon: Icon5,
    color: '#614C1F'
  }
]
const BidTokenPanel = ({
  selectFn,
  selectIndex,
  poolInfo
}: {
  selectFn: (i: number) => void
  selectIndex: number | null
  poolInfo: RandomSelectionNFTProps
}) => {
  return (
    <Stack gap={8} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
      {bidTokenList.slice(0, poolInfo.tokensAddress.length).map((i, d) => (
        <TokenBg key={i.name} className={d === selectIndex ? 'select' : ''} onClick={() => selectFn(d)}>
          <P1>{i.price}</P1>
          <img src={i.icon} style={{ width: 20, height: 20 }} />
          <P1>{i.name}</P1>
        </TokenBg>
      ))}
    </Stack>
  )
}
export default BidTokenPanel
