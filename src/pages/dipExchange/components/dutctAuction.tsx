import { Box, Typography } from '@mui/material'
import { PoolsData } from './stageLine'
import { useDutchAuctionInfo } from 'bounceHooks/auction/useDutchAuctionInfo'
import { useMemo } from 'react'
const DutchAuction = ({ index, poolsData }: { index: number; poolsData: PoolsData }) => {
  const { list } = poolsData
  const currentData = useMemo(() => {
    return list[index]
  }, [index, list])
  const { poolInfo } = useDutchAuctionInfo(currentData?.dgt?.id ? Number(currentData?.dgt?.id) : undefined)
  if (!poolInfo || !currentData?.dgt?.id) {
    return <Box>1</Box>
  }
  console.log('currentData>>', currentData)
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
      {poolInfo.name}
    </Box>
  )
}
export default DutchAuction
