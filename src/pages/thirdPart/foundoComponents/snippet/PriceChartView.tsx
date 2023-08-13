import { Box, Typography } from '@mui/material'
import { MutantEnglishAuctionNFTPoolProp } from 'api/pool/type'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'
import LineChart from 'components/LineChart'
import { Currency, CurrencyAmount } from 'constants/token'
import { DeepPartial, ChartOptions } from 'lightweight-charts'
import { useMemo } from 'react'
import { useIsSMDown } from 'themes/useTheme'
const chartOptions: DeepPartial<ChartOptions> = {
  layout: { fontSize: 12 },
  leftPriceScale: {
    borderColor: 'rgba(255, 255, 255, 0.20)',
    borderVisible: true,
    drawTicks: false
  },
  timeScale: {
    borderVisible: true,
    borderColor: 'rgba(255, 255, 255, 0.20)'
  }
}

export default function PriceChartView({
  poolInfo,
  isDark,
  minHeight
}: {
  poolInfo: MutantEnglishAuctionNFTPoolProp
  minHeight?: number
  isDark?: true
}) {
  const { data } = usePoolHistory(poolInfo.chainId, poolInfo.poolId, poolInfo.category, '', ['Bid'])
  const isSm = useIsSMDown()
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

  if (!chatData?.length) return null

  return (
    <Box
      minHeight={minHeight || 220}
      sx={{
        mt: { xs: 40, sm: 80 },
        position: 'relative',
        paddingRight: isSm ? 0 : 35
      }}
    >
      <Typography
        color={'#e8e9e4'}
        fontSize={12}
        sx={{
          position: isSm ? 'relative' : 'unset',
          left: isSm ? 40 : 'unset'
        }}
      >
        Price
      </Typography>
      <Typography
        color={'#e8e9e4'}
        fontSize={12}
        sx={{
          position: 'absolute',
          bottom: 15,
          right: 0
        }}
      >
        Time
      </Typography>
      {!!chatData?.length && (
        <LineChart data={chatData} isDark={isDark} token1Name={poolInfo.token1.symbol} chartOption={chartOptions} />
      )}
    </Box>
  )
}
