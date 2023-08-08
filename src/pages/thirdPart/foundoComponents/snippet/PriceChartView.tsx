import { Box, Typography } from '@mui/material'
import { MutantEnglishAuctionNFTPoolProp } from 'api/pool/type'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'
import LineChart from 'components/LineChart'
import { Currency, CurrencyAmount } from 'constants/token'
import { useMemo } from 'react'

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
    <Box
      mt={80}
      minHeight={minHeight || 220}
      sx={{
        position: 'relative'
      }}
    >
      <Typography color={'#e8e9e4'} fontSize={12}>
        Price
      </Typography>
      <Typography
        color={'#e8e9e4'}
        fontSize={12}
        sx={{
          position: 'absolute',
          bottom: 10,
          right: 20
        }}
      >
        Time
      </Typography>
      {!!chatData?.length && <LineChart data={chatData} isDark={isDark} token1Name={poolInfo.token1.symbol} />}
    </Box>
  )
}
