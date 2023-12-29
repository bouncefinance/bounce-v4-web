import { Box, Theme, styled, useTheme } from '@mui/material'
import PoolProgress from 'pages/nftLottery/components/poolCard/poolProgress'
import BidBtnBox, { CloseBtn, UpcomingBtn } from './bidBtnBox'
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
const Container = styled(Box)(
  ({ theme, hideMt }: { theme: Theme; hideMt: boolean }) => `
  width: 100%;
  max-width: 1076px;
  margin: 0 auto;
  ${
    hideMt
      ? `
          margin-top: 0;
        `
      : `
          margin-top: 64px;
        `
  }
  ${theme.breakpoints.down('sm')} {
    padding: 0 16px;
  }
`
)
const BidPanel = ({ setZoom, allStatus, poolInfo }: IProps) => {
  const [action, setAction] = useState<ActionStatus>('FIRST')
  const { account } = useActiveWeb3React()
  const { isUserJoined, poolStatus } = useGetRandomSelectionNFTPoolStatus(poolInfo)
  const theme = useTheme()

  const isSoldOut = useMemo(() => {
    return `${poolInfo.curPlayer}` === `${poolInfo.maxPlayere}`
  }, [poolInfo.curPlayer, poolInfo.maxPlayere])
  const goCheckHandle = () => {
    setAction('GO_TO_CHECK')
    setZoom()
  }
  const bidHandle = () => {
    setAction('BID')
    setZoom()
  }
  useEffect(() => {
    if (account && isUserJoined) {
      setAction('BID')
    }
  }, [account, isUserJoined])

  const otherBtns = useMemo(() => {
    if (poolStatus === RandomPoolStatus.Live && action === 'FIRST' && !isSoldOut) {
      return { otherBtns: <BidBtnBox goCheck={goCheckHandle} /> }
    }
    return {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, poolStatus])

  useEffect(() => {
    setAction('FIRST')
  }, [account])
  return (
    <Container theme={theme} hideMt={poolStatus === RandomPoolStatus.Waiting || action === 'GO_TO_CHECK'}>
      {action !== 'GO_TO_CHECK' && <PoolProgress allStatus={allStatus} poolInfo={poolInfo} />}

      {poolStatus === RandomPoolStatus.Live && action === 'GO_TO_CHECK' && <CheckBox onConfirm={bidHandle} />}

      <Box sx={{ marginTop: { xs: 40, md: 80 } }}>
        {poolStatus === RandomPoolStatus.Upcoming && <UpcomingBtn poolInfo={poolInfo} />}

        {poolStatus === RandomPoolStatus.Live && action !== 'GO_TO_CHECK' && (
          <BidButtonBlock poolInfo={poolInfo} {...otherBtns} />
        )}

        {(poolStatus === RandomPoolStatus.Waiting || poolStatus === RandomPoolStatus.Closed) && <CloseBtn />}
      </Box>
    </Container>
  )
}
export default BidPanel
