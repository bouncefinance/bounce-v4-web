import { Box, styled } from '@mui/material'
import PoolProgress from 'pages/nftLottery/components/poolCard/poolProgress'
import BidBtnBox from './bidBtnBox'
import { useState } from 'react'
import CheckBox from './checkBox'
interface IProps {
  setZoom: () => void
}
type ActionStatus = 'FIRST' | 'GO_TO_CHECK'
const Container = styled(Box)`
  width: 100%;
  max-width: 1076px;
  margin: 0 auto;
  margin-top: 40px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 0 16px;
  }
`
const BidPanel = ({ setZoom }: IProps) => {
  const [action, setAction] = useState<ActionStatus>('FIRST')

  const goCheckHandle = () => {
    setAction('GO_TO_CHECK')
    setZoom()
  }
  const bidHandle = () => {}
  return (
    <Container>
      {action === 'FIRST' && (
        <>
          <PoolProgress />
          <BidBtnBox goCheck={goCheckHandle} />
        </>
      )}
      {action === 'GO_TO_CHECK' && <CheckBox onConfirm={bidHandle} />}
    </Container>
  )
}
export default BidPanel
