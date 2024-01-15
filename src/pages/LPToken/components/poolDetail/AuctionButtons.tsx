import { Box, Button, styled } from '@mui/material'
import { ActionStatus } from '.'
export const BaseButton = styled(Button)`
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  background: #121212;
  &:hover {
    background: #e1f25c;
    color: #121212;
  }

  color: #fff;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`
const AuctionButtons = ({ onCheck, action }: { onCheck: () => void; action: ActionStatus }) => {
  if (action === 'FIRST') {
    return <BaseButton onClick={onCheck}>To Bid</BaseButton>
  }
  return (
    <Box>
      <BaseButton disabled>1</BaseButton>
    </Box>
  )
}
export default AuctionButtons
