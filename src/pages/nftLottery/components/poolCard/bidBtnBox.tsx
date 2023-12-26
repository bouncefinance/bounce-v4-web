import { Button, Stack, Typography, styled } from '@mui/material'
import { useCountDown } from 'ahooks'
import { RandomSelectionNFTProps } from 'api/pool/type'
import useBreakpoint from 'hooks/useBreakpoint'
interface IProps {
  goCheck: () => void
}
export const BaseBtnStyle = styled(Button)`
  width: 100%;
  max-width: 534px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 100px;
  background: #0f0f0f;
  color: #fff;
  &.dis {
    background: #d7d6d9;
    &:hover {
      background: #d7d6d9;
    }
  }
  &:hover {
    background: #e1f25c;
    color: #0f0f0f;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 48px;
  }
`
const UpcomingBtnStyle = styled(BaseBtnStyle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`
const Title = styled(Typography)`
  color: #fff;
  leading-trim: both;
  text-edge: cap;

  /* D/body01 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`
export const TipTitle = styled(Typography)`
  color: #171717;

  /* D/H5 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 14px;
  }
`
export function UpcomingBtn({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) {
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: poolInfo.openAt * 1000
  })
  return (
    <>
      <UpcomingBtnStyle className="dis">
        <Title>Place a Bid</Title>
        {countdown > 0 ? (
          <Title>
            {days}d : {hours}h : {minutes}m : {seconds}s
          </Title>
        ) : null}
      </UpcomingBtnStyle>
      <TipTitle mt={24}>Haven’t start yet</TipTitle>
    </>
  )
}

const PurchaseBtn = ({ goCheck }: { goCheck: () => void }) => (
  <>
    <BaseBtnStyle onClick={goCheck}>Purchase</BaseBtnStyle>
    <TipTitle mt={24}>If you failed, you can get fund back later</TipTitle>
  </>
)

export const CloseBtn = () => <BaseBtnStyle className="dis">Auction closed</BaseBtnStyle>
export const DrawedBtn = () => (
  <>
    <BaseBtnStyle className="dis">You are in the draw...</BaseBtnStyle>
    <TipTitle mt={24}>If you failed, you can get fund back later</TipTitle>
  </>
)

const BidBtnBox = ({ goCheck }: IProps) => {
  const isSm = useBreakpoint('sm')

  return (
    <Stack flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={isSm ? 40 : 80}>
      <PurchaseBtn goCheck={goCheck} />
    </Stack>
  )
}
export default BidBtnBox
