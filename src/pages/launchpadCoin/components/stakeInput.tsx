import styled from '@emotion/styled'
import { Button, Stack, Typography } from '@mui/material'
import NumberInput from 'bounceComponents/common/NumberInput'
import { CurrencyAmount } from 'constants/token'
const StakeInputStyle = styled(NumberInput)`
  border-radius: 8px;
  &.MuiInputBase-root {
    background: #f6f6f3;
  }
`
const TokenNameTitle = styled(Typography)`
  color: #959595;
  /* D/H5 */
  font-family: Public Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`
const MaxButtonStyle = styled(Button)`
  height: max-content;
  &:hover {
    background-color: transparent;
  }
`
const ButtonTitle = styled(Typography)`
  color: #2b51da;
  /* D/body01 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  text-decoration: underline;
`
const StakeInput = ({
  value,
  onChange,
  token1Balance
}: {
  value: string
  onChange: (v: string) => void
  token1Balance: CurrencyAmount | undefined
}) => {
  const handleMax = () => {
    if (!token1Balance) return
    onChange(token1Balance.toExact())
  }
  return (
    <StakeInputStyle
      value={value}
      onUserInput={value => {
        onChange(value)
      }}
      endAdornment={
        <Stack flexDirection={'row'} alignItems={'center'}>
          <MaxButtonStyle onClick={() => handleMax()}>
            <ButtonTitle>Max</ButtonTitle>
          </MaxButtonStyle>
          <TokenNameTitle>{token1Balance?.currency.symbol}</TokenNameTitle>
        </Stack>
      }
    />
  )
}
export default StakeInput
