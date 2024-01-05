import { Box, Typography, styled, Stack } from '@mui/material'
import { RandomSelectionNFTProps } from 'api/pool/type'
import { CurrencyAmount } from 'constants/token'
import { getIcon } from 'pages/nftLottery/sections/tokenInformation/config'

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

const BidTokenPanel = ({
  selectFn,
  selectIndex,
  poolInfo
}: {
  selectFn: (i: number) => void
  selectIndex: number | null
  poolInfo: RandomSelectionNFTProps
}) => {
  const tokenInfoList = poolInfo.betTokenAmount.map((item, index) => {
    return {
      price: CurrencyAmount.fromRawAmount(poolInfo.token1Currency[index], item).toSignificant(6),
      name: poolInfo.token1Currency?.[index].symbol.toUpperCase(),
      icon: getIcon(poolInfo.token1Currency?.[index].symbol)
    }
  })
  return (
    <Stack gap={8} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
      {tokenInfoList.slice(0, poolInfo.tokensAddress.length).map((i, d) => (
        <TokenBg key={i.name} className={d === selectIndex ? 'select' : ''} onClick={() => selectFn(d)}>
          <P1>{i.price}</P1>
          {i.icon && <img src={i.icon} style={{ width: 20, height: 20 }} />}
          <P1>{i.name}</P1>
        </TokenBg>
      ))}
    </Stack>
  )
}
export default BidTokenPanel
