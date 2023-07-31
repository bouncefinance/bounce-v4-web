import { Box } from '@mui/material'
import Header from '../../dutchAuction/components/header'
import CreatorInfoCard from '../../dutchAuction/components/creatorInfoCard'
import CreatorBlock from '../components/creatorBlock/indexMobile'
import UserBlock from '../components/userBlock'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import ActionHistory from '../components/auctionHistory'

const EnglishAuctionMobile = ({
  poolInfo,
  getPoolInfo
}: {
  poolInfo: Erc20EnglishAuctionPoolProp
  getPoolInfo: () => void
}) => {
  const { account } = useActiveWeb3React()
  const isCreator = useMemo(() => poolInfo?.creator === account, [account, poolInfo?.creator])
  return (
    <Box
      sx={{
        background: '#20201E'
      }}
    >
      <Header />
      <CreatorInfoCard poolInfo={poolInfo} creator={poolInfo.creator} getPoolInfo={getPoolInfo} />
      <Box
        sx={{
          width: '100%'
        }}
      >
        {isCreator ? <CreatorBlock poolInfo={poolInfo} /> : <UserBlock poolInfo={poolInfo} />}
      </Box>
      <ActionHistory poolInfo={poolInfo} />
    </Box>
  )
}
export default EnglishAuctionMobile
