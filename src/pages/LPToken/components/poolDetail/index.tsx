import { Box } from '@mui/material'
import Header from './header'
import Card from './card'
import PoolProgress from './PoolProgress'
import AuctionButtons from './AuctionButtons'
import CheckBox from './CheckBox'
import { useState } from 'react'
export type ActionStatus = 'FIRST' | 'GO_TO_CHECK' | 'BID'
const PoolDetail = () => {
  const [action, setAction] = useState<ActionStatus>('FIRST')
  const onGoCheckBox = () => {
    setAction('GO_TO_CHECK')
  }

  return (
    <Box>
      <Header />
      <Card />
      {action === 'GO_TO_CHECK' ? <CheckBox onToBid={() => setAction('BID')} /> : <PoolProgress />}
      {action !== 'GO_TO_CHECK' && <AuctionButtons onCheck={onGoCheckBox} action={action} />}
    </Box>
  )
}

export default PoolDetail
