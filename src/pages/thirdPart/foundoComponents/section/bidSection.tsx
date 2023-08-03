import { Box } from '@mui/material'
import CenterSeciont from '../centerSection'
import PoolBaseInfo from '../snippet/poolBaseInfo'
import UserBidAction from '../snippet/userBidAuction'
import CreatorBidAction from '../snippet/creatorBidAuction'
import { useIsSMDown } from 'themes/useTheme'
import { useActiveWeb3React } from 'hooks'
import { useMutantEnglishAuctionPool } from 'hooks/useMutantEnglishAuctionPool'

const BidSection = () => {
  const isSm = useIsSMDown()
  const { account } = useActiveWeb3React()
  const { data: poolInfo } = useMutantEnglishAuctionPool(20342)
  console.log('🚀 ~ file: bidSection.tsx:14 ~ BidSection ~ poolInfo:', poolInfo)
  if (!poolInfo) return <></>
  return (
    <Box
      style={{
        width: '100%',
        padding: isSm ? '48px 0' : '0',
        borderTop: `1px solid rgba(255, 255, 255, 0.4)`,
        borderBottom: `1px solid rgba(255, 255, 255, 0.4)`
      }}
    >
      <CenterSeciont
        style={{
          flexFlow: isSm ? 'column nowrap' : 'row nowrap',
          justifyContent: isSm ? 'flex-start' : 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <PoolBaseInfo />
        {poolInfo?.creator.toLocaleLowerCase() === account?.toLocaleLowerCase() ? (
          <CreatorBidAction poolInfo={poolInfo} />
        ) : (
          <UserBidAction poolInfo={poolInfo} />
        )}
      </CenterSeciont>
    </Box>
  )
}
export default BidSection
