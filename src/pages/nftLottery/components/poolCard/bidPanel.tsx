import { Box, styled } from '@mui/material'
import PoolProgress from 'pages/nftLottery/components/poolCard/poolProgress'
import BidBtnBox, { UpcomingBtn } from './bidBtnBox'
import { useEffect, useMemo, useState } from 'react'
import CheckBox from './checkBox'
import { RandomPoolStatus, RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
import BidButtonBlock from './bidButtonBlock'
import { useActiveWeb3React } from 'hooks'
import { useGetRandomSelectionNFTPoolStatus } from 'bounceHooks/auction/useRandomSelectionNFTPoolInfo'
interface IProps {
  setZoom: () => void
  allStatus: RandomSelectionNFTResultProps
  poolInfo: RandomSelectionNFTProps
}
export type ActionStatus = 'FIRST' | 'GO_TO_CHECK' | 'BID'
const Container = styled(Box)`
  width: 100%;
  max-width: 1076px;
  margin: 0 auto;
  margin-top: 40px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 0 16px;
  }
`
const BidPanel = ({ setZoom, allStatus, poolInfo }: IProps) => {
  const [action, setAction] = useState<ActionStatus>('FIRST')
  const { account } = useActiveWeb3React()
  const { isUserJoined, poolStatus } = useGetRandomSelectionNFTPoolStatus(poolInfo)
  const goCheckHandle = () => {
    setAction('GO_TO_CHECK')
    setZoom()
  }
  const bidHandle = () => {
    setAction('BID')
  }
  useEffect(() => {
    if (account && isUserJoined) {
      setAction('BID')
    }
  }, [account, isUserJoined])

  const otherBtns = useMemo(() => {
    if ((poolStatus === RandomPoolStatus.Live && action === 'FIRST') || poolStatus === RandomPoolStatus.Closed) {
      return { otherBtns: <BidBtnBox goCheck={goCheckHandle} /> }
    }
    return {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, poolStatus])

  return (
    <Container>
      {action !== 'GO_TO_CHECK' && <PoolProgress allStatus={allStatus} poolInfo={poolInfo} />}

      {poolStatus === RandomPoolStatus.Upcoming && <UpcomingBtn poolInfo={poolInfo} />}

      {poolStatus === RandomPoolStatus.Live && action === 'GO_TO_CHECK' && <CheckBox onConfirm={bidHandle} />}

      {poolStatus === RandomPoolStatus.Live && action !== 'GO_TO_CHECK' && (
        <Box sx={{ marginTop: { sm: 40, md: 80 } }}>
          <BidButtonBlock poolInfo={poolInfo} {...otherBtns} />
        </Box>
      )}
    </Container>
  )
}
export default BidPanel
