import { Box } from '@mui/material'

import Header from './Header'
import ActionBlock from './ActionBlock'
import { FixedSwapPoolProp } from 'api/pool/type'
import { useIsJoinedRandomSelectionPool } from 'hooks/useCreateRandomSelectionPool'
import { useActiveWeb3React } from 'hooks'

const UserActionBox2 = ({
  poolInfo,
  getPoolInfo,
  isWinnerSeedDone
}: {
  poolInfo: FixedSwapPoolProp
  getPoolInfo: () => void
  isWinnerSeedDone?: boolean
}) => {
  const { account } = useActiveWeb3React()
  const isJoined = useIsJoinedRandomSelectionPool(
    Number(poolInfo.poolId),
    account || undefined,
    poolInfo.contract,
    poolInfo.ethChainId
  )
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '476px',
        margin: '0 auto',
        flex: 1
      }}
    >
      <Box sx={{ borderRadius: 20, bgcolor: '#F5F5F5', padding: '24px' }}>
        <Header
          poolInfo={poolInfo}
          getPoolInfo={getPoolInfo}
          isJoined={isJoined}
          isWinnerSeedDone={!!isWinnerSeedDone}
        />
      </Box>
      {poolInfo.contract && (
        <ActionBlock
          poolInfo={poolInfo}
          getPoolInfo={getPoolInfo}
          isJoined={isJoined}
          isWinnerSeedDone={isWinnerSeedDone}
        />
      )}
    </Box>
  )
}

export default UserActionBox2
