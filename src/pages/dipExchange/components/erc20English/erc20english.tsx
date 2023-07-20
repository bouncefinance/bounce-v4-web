import { Box, Typography } from '@mui/material'
import { PoolsData } from '../stageLine'
import { useErc20EnglishAuctionInfo } from 'bounceHooks/auction/useErc20EnglishAuctionInfo'

import { useMemo } from 'react'
import TimeStageLine from './timeStageLine'
import LineChart from '../../../auction/erc20EnglishAuction/components/lineChart'
import PoolStep from './poolStep'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'

const Erc20english = ({ index, poolsData }: { index: number; poolsData: PoolsData }) => {
  const { list } = poolsData
  const currentData = useMemo(() => {
    return list[index]?.dip
  }, [index, list])
  const { poolInfo } = useErc20EnglishAuctionInfo(currentData?.id ? Number(currentData?.id) : undefined)
  if (!poolInfo || !currentData) {
    return <BounceAnime></BounceAnime>
  }
  console.log('erc20englishAuction>>', poolInfo)
  return (
    <Box
      sx={{
        width: '100%',
        padding: '56px 48px',
        background: '#121219'
      }}
    >
      <Typography
        sx={{
          color: '#D7D6D9',
          fontFamily: `'Public Sans'`,
          fontSize: 20,
          fontWeight: 600
        }}
        mb={'33px'}
      >
        Subscription Timeline
      </Typography>
      <TimeStageLine poolInfo={poolInfo} />
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '30px'
        }}
        gap={'40px'}
      >
        <Box
          sx={{
            flex: 370
          }}
        >
          <LineChart poolInfo={poolInfo} />
        </Box>
        <Box
          sx={{
            flex: 790
          }}
        >
          <PoolStep poolInfo={poolInfo} />
        </Box>
      </Box>
    </Box>
  )
}
export default Erc20english
