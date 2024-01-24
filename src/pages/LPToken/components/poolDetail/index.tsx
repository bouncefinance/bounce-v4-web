import { Box, styled } from '@mui/material'
import Header from './header'
import Card from './card'
import PoolProgress from './PoolProgress'
import AuctionButtons from './AuctionButtons'
import CheckBox from './CheckBox'
import { useEffect, useState } from 'react'
import WinnerPage from './winnerPage'
import { RandomSelectionLPProps } from 'api/pool/type'
import { useGetRandomSelectionLPPoolStatus } from 'bounceHooks/auction/useRandomSelectionLPPoolInfo'
import { useActiveWeb3React } from 'hooks'
export type ActionStatus = 'FIRST' | 'GO_TO_CHECK' | 'BID'
const Container = styled(Box)(
  () => `
     max-width: 800px; margin: 0 auto
`
)
const PoolDetail = ({ poolInfo }: { poolInfo: RandomSelectionLPProps }) => {
  const { chainId, account } = useActiveWeb3React()
  const allStatus = useGetRandomSelectionLPPoolStatus(poolInfo)
  const [action, setAction] = useState<ActionStatus>('FIRST')
  const onGoCheckBox = () => {
    setAction('GO_TO_CHECK')
  }
  useEffect(() => {
    setAction('FIRST')
  }, [chainId, account])
  return (
    <Container>
      <Header poolInfo={poolInfo} poolStatus={allStatus.poolStatus} isUserJoined={allStatus.isUserJoined} />
      {!allStatus.isUserWinner && <Card poolInfo={poolInfo} />}
      {allStatus.isUserWinner && <WinnerPage poolInfo={poolInfo} />}
      {action === 'GO_TO_CHECK' ? (
        <CheckBox onToBid={() => setAction('BID')} />
      ) : (
        !allStatus.isUserWinner && <PoolProgress poolInfo={poolInfo} poolStatus={allStatus.poolStatus} />
      )}
      {action !== 'GO_TO_CHECK' && (
        <AuctionButtons onCheck={onGoCheckBox} action={action} poolInfo={poolInfo} allStatus={allStatus} />
      )}
    </Container>
  )
}

export default PoolDetail
