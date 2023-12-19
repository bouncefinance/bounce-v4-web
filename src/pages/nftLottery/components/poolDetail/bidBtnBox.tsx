import { Button, Stack, Typography, styled } from '@mui/material'
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
const TipTitle = styled(Typography)`
  color: #171717;

  /* D/H5 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`
const UpcomingBtn = () => (
  <>
    <UpcomingBtnStyle className="dis">
      <Title>Place a Bid</Title>
      <Title>0d : 32h : 12m : 10s</Title>
    </UpcomingBtnStyle>
    <TipTitle mt={24}>Haven’t start yet</TipTitle>
  </>
)

const PurchaseBtn = ({ goCheck }: { goCheck: () => void }) => (
  <>
    <BaseBtnStyle onClick={goCheck}>Purchase</BaseBtnStyle>
    <TipTitle mt={24}>If you failed, you can get fund back later</TipTitle>
  </>
)

const CloseBtn = () => <BaseBtnStyle>Auction closed</BaseBtnStyle>
const BidBtnBox = ({ goCheck }: IProps) => {
  console.log('PurchaseBtn', PurchaseBtn, UpcomingBtn, CloseBtn)

  return (
    <Stack flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mt={80}>
      <PurchaseBtn goCheck={goCheck} />
    </Stack>
  )
}
export default BidBtnBox
