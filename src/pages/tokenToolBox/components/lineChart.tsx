import { Box, Stack, Typography } from '@mui/material'
import { useMemo, useRef, useEffect } from 'react'
import { BigNumber } from 'bignumber.js'
import { useIsMDDown } from 'themes/useTheme'
import {
  createChart,
  ColorType,
  LineData,
  SeriesMarker,
  Time,
  DeepPartial,
  TimeFormatterFn,
  ChartOptions
} from 'lightweight-charts'
import moment from 'moment'
import { LockInfo } from 'api/toolbox/type'
import { Currency, CurrencyAmount } from 'constants/token'
export interface PointerItem {
  time: number | string
  value: number
}
export enum ViewTypeParam {
  'default' = 0,
  'dialog' = 1,
  'dip' = 2,
  'linear' = 3
}

export const LineChartView = ({
  data,
  lockInfo,
  token,
  options,
  viewType = ViewTypeParam.default
}: {
  data: PointerItem[]
  token: Currency
  lockInfo: LockInfo
  options?: DeepPartial<ChartOptions>
  viewType?: ViewTypeParam
}) => {
  const isMd = useIsMDDown()
  const chartContainerRef = useRef<any>()
  const colorObj = useMemo(() => {
    return {
      lineColor: '#B5E529',
      topColor: '#fff',
      bottomColor: '#fff'
    }
  }, [])
  const timeFormatter: TimeFormatterFn = (time: any) => {
    const date = new Date(time)
    return moment(date).format('DD MMMM')
  }
  const offsetXy = useMemo(() => {
    if (ViewTypeParam.default === viewType) {
      return {
        x: 120,
        y: 140
      }
    } else if (ViewTypeParam.dialog === viewType) {
      return {
        x: 120,
        y: 30
      }
    } else if (ViewTypeParam.linear === viewType) {
      return {
        x: 100,
        y: 40
      }
    }
    return {
      x: 90,
      y: 230
    }
  }, [viewType])
  useEffect(() => {
    if (!chartContainerRef.current) return
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#fff' },
        textColor: '#121212'
      },
      grid: {
        vertLines: { color: '#D7D6D9', style: 4 },
        horzLines: { color: '#D7D6D9', style: 4 }
      },
      localization: {
        timeFormatter: function (businessDayOrTimestamp: number | string) {
          // console.log(businessDayOrTimestamp);
          return moment(businessDayOrTimestamp).format('YYYY-MM-DD HH:mm:ss')
        },
        priceFormatter: (price: number | string) => {
          return Number(price).toFixed(6)
        }
      },
      width: chartContainerRef.current.clientWidth,
      height: 250,
      timeScale: {
        borderVisible: true,
        borderColor: '#D7D6D9',
        timeVisible: false
      },
      leftPriceScale: {
        visible: true,
        borderVisible: false,
        autoScale: true,
        borderColor: 'red'
      },
      rightPriceScale: {
        visible: false,
        borderVisible: false,
        autoScale: true
      },
      ...options
    })
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }
    chart.timeScale().applyOptions({
      tickMarkFormatter: timeFormatter
    })
    chart.timeScale().fitContent()
    // set line
    const newSeries = chart.addAreaSeries({
      ...colorObj
    })
    newSeries.setData(data as LineData[])
    // set current time data
    const nowDate = new Date().valueOf()
    if (nowDate / 1000 <= lockInfo.lock_end && nowDate / 1000 >= lockInfo.lock_start) {
      // set current time data
      const markers = [
        {
          time: nowDate,
          position: 'inBar',
          color: '#959595',
          shape: 'circle',
          size: 0.7
        }
      ]
      newSeries.setMarkers(markers as SeriesMarker<Time>[])
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [colorObj, data, token.symbol, options, lockInfo.lock_start, lockInfo.lock_end, offsetXy, viewType, isMd])
  return <Box ref={chartContainerRef}></Box>
}
const LineChartSection = ({ lockInfo, lockToken }: { lockInfo: LockInfo; lockToken: Currency }) => {
  const { lock_start: openAt, lock_end: closeAt, amount: highestPrice } = lockInfo
  const segments = Math.floor((closeAt - openAt) / 3600 > 1 ? (closeAt - openAt) / 3600 : 1)
  const startTime = openAt ? Number(openAt * 1000) : 0
  const endTime = closeAt ? Number((openAt + closeAt) * 1000) : 0
  const startPrice = highestPrice ? CurrencyAmount.fromRawAmount(lockToken, highestPrice).toSignificant() : 0
  const endPrice = 0
  const arrayRange = (start: number | string, stop: number, step: number | string) =>
    Array.from({ length: stop + 1 }, (value, index) => {
      return BigNumber(start).plus(BigNumber(step).times(index)).toNumber()
    })
  const priceSegments = new BigNumber(endPrice).minus(startPrice).div(segments).toNumber()
  const timeSegments = new BigNumber(endTime).minus(startTime).div(segments).integerValue().toNumber()
  const lineData = useMemo(() => {
    const xList = arrayRange(startTime, segments, timeSegments)
    const yList = arrayRange(startPrice, segments, priceSegments).reverse()
    const dataPoint = new Array(segments + 1).fill(0).map((item, index) => {
      return {
        time: xList[index],
        value: yList[index]
      }
    })
    return dataPoint
  }, [startTime, segments, timeSegments, startPrice, priceSegments])
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        sx={{
          padding: '30px 0 20px'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: 14,
            color: '#121212'
          }}
        >
          Lock Chart
        </Typography>
      </Stack>
      <LineChartView data={lineData} token={lockToken} lockInfo={lockInfo} viewType={ViewTypeParam.default} />
    </Box>
  )
}
export default LineChartSection
