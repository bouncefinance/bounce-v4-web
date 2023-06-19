import { Box, Typography } from '@mui/material'
import { EnglishAuctionNFTPoolProp } from 'api/pool/type'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'
import LineChart from 'components/LineChart'
import { Currency, CurrencyAmount } from 'constants/token'
import { useMemo } from 'react'

export default function PriceChartView({
  poolInfo,
  isDark,
  minHeight,
  showText
}: {
  poolInfo: EnglishAuctionNFTPoolProp
  minHeight?: number
  isDark?: true
  showText?: boolean
}) {
  const { data } = usePoolHistory(poolInfo.chainId, poolInfo.poolId, poolInfo.category, '', ['Bid'])

  const chatData:
    | {
        value: number
        time: number
      }[]
    | undefined = useMemo(() => {
    if (!poolInfo.currentBidderAmount1?.currency) return []
    return data?.list
      .map(item => ({
        value: Number(
          CurrencyAmount.fromRawAmount(
            poolInfo.currentBidderAmount1?.currency as Currency,
            item.token1Amount || '0'
          ).toSignificant(8, { groupSeparator: '' })
        ),
        time: item.blockTs
      }))
      .reverse()
  }, [data?.list, poolInfo.currentBidderAmount1?.currency])

  return (
    <Box minHeight={minHeight || 220}>
      {showText && <Typography variant="h4">Chart View</Typography>}
      {!!chatData?.length && <LineChart data={chatData} isDark={isDark} token1Name={poolInfo.token1.symbol} />}
    </Box>
  )
}
