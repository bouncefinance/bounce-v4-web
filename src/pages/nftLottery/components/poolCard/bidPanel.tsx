import { Box, styled } from '@mui/material'
import PoolProgress from 'pages/nftLottery/components/poolCard/poolProgress'
import BidBtnBox from './bidBtnBox'
import { useEffect, useState } from 'react'
import CheckBox from './checkBox'
import { RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
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
  const { isUserJoined } = useGetRandomSelectionNFTPoolStatus(poolInfo)
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
  return (
    <Container>
      {action === 'FIRST' && (
        <>
          <PoolProgress allStatus={allStatus} poolInfo={poolInfo} />
          <BidBtnBox goCheck={goCheckHandle} />
        </>
      )}
      {action === 'GO_TO_CHECK' && <CheckBox onConfirm={bidHandle} />}
      {action === 'BID' && <BidButtonBlock poolInfo={poolInfo} />}
    </Container>
  )
}
export default BidPanel