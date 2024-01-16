import { Box } from '@mui/material'
import Header from './header'
import Card from './card'
import PoolProgress from './PoolProgress'
import AuctionButtons from './AuctionButtons'
import CheckBox from './CheckBox'
import { useState } from 'react'
import WinnerPage from './winnerPage'
import { RandomSelectionLPProps } from 'api/pool/type'
import { useGetRandomSelectionLPPoolStatus } from 'bounceHooks/auction/useRandomSelectionLPPoolInfo'
export type ActionStatus = 'FIRST' | 'GO_TO_CHECK' | 'BID'
const PoolDetail = ({ poolInfo }: { poolInfo: RandomSelectionLPProps }) => {
  const allStatus = useGetRandomSelectionLPPoolStatus(poolInfo)
  const [action, setAction] = useState<ActionStatus>('FIRST')
  const onGoCheckBox = () => {
    setAction('GO_TO_CHECK')
  }

  return (
    <Box>
      <Header poolInfo={poolInfo} />
      {!allStatus.isUserWinner && <Card poolInfo={poolInfo} />}
      {allStatus.isUserWinner && <WinnerPage />}
      {action === 'GO_TO_CHECK' ? (
        <CheckBox onToBid={() => setAction('BID')} />
      ) : (
        <PoolProgress poolInfo={poolInfo} poolStatus={allStatus.poolStatus} />
      )}
      {action !== 'GO_TO_CHECK' && (
        <AuctionButtons onCheck={onGoCheckBox} action={action} poolInfo={poolInfo} allStatus={allStatus} />
      )}
    </Box>
  )
}

export default PoolDetail
