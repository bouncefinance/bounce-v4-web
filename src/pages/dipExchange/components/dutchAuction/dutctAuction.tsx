import { Box, Typography } from '@mui/material'
import { PoolsData } from '../stageLine'
import { useDutchAuctionInfo } from 'bounceHooks/auction/useDutchAuctionInfo'
import TimeStageLine from './timeStageLine'
import LineChart from '../../../auction/dutchAuction/components/lineChart'
import PoolStep from './poolStep'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useIsMDDown } from 'themes/useTheme'

const DutchAuction = ({ index, poolsData }: { index: number; poolsData: PoolsData }) => {
  const { list } = poolsData
  const isMd = useIsMDDown()
  const currentData = list[index]?.dgt
  console.log(123)
  const { poolInfo, loading } = useDutchAuctionInfo(currentData?.id ? Number(currentData?.id) : undefined)
  if (!poolInfo || !currentData) {
    return <BounceAnime></BounceAnime>
  }
  console.log('dutchAuction poolInfo>>', currentData, poolInfo)
  if (isMd) {
    return (
      <>
        <Box
          sx={{
            width: '100%',
            padding: '30px 16px 33px',
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
          >
            Subscription Timeline
          </Typography>
        </Box>
        {!loading && (
          <Box
            sx={{
              width: '100%',
              padding: '0 0 0 16px',
              background: '#121219',
              overflow: 'hidden'
            }}
          >
            <TimeStageLine poolInfo={poolInfo} />
          </Box>
        )}
        <Box
          sx={{
            width: '100%',
            padding: '0 16px 30px',
            background: '#121219'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}
            gap={'40px'}
          >
            <Box
              sx={{
                width: '100%'
              }}
            >
              <LineChart poolInfo={poolInfo} hideDialogBtn={true} />
            </Box>
            <Box
              sx={{
                width: '100%'
              }}
            >
              <PoolStep poolInfo={poolInfo} />
            </Box>
          </Box>
        </Box>
      </>
    )
  }
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
      {!loading && <TimeStageLine poolInfo={poolInfo} />}
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
export default DutchAuction
