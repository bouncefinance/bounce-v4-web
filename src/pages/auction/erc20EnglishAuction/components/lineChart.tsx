import { Box, Stack, Typography, styled } from '@mui/material'
import { ReactComponent as OpenChartIcon } from 'assets/imgs/dutchAuction/openChart.svg'
import { useMemo, useRef, useEffect } from 'react'
import { BigNumber } from 'bignumber.js'
import { createChart, ColorType, LineData, SeriesMarker, Time, MouseEventParams } from 'lightweight-charts'
import moment from 'moment'
import PoolInfoItem from './poolInfoItem'
import { RightText } from './creatorBlock/auctionInfo'
import PoolProgress from 'bounceComponents/common/PoolProgress'
import { formatNumber } from 'utils/number'
import { PoolStatus } from 'api/pool/type'
import { useEnglishAuctionPoolInfo } from '../ValuesProvider'

interface PointerItem {
  time: number | string
  value: number
}

const OpenChartImg = styled(OpenChartIcon)(() => ({
  width: '16px',
  height: '16px',
  cursor: 'pointer',
  '&:hover path': {
    fill: '#2663FF'
  }
}))
interface ToolTipParam {
  dateStr?: string | number
  x?: string | number
  y?: string | number
  bgColor?: string
  display?: boolean
  token0Price?: string
}
export class ToolTip {
  el: any
  constructor({ dateStr, x, y, bgColor, display }: ToolTipParam) {
    console.log('实例化...')
    this.createToolTip({ dateStr, x, y, bgColor, display })
  }
  createToolTip({ dateStr, x, y, bgColor, display }: ToolTipParam) {
    if (!this.el) {
      const toolTip = document.createElement('div')
      toolTip.innerHTML = `<p style="font-family: 'Inter';font-size: 12px;color:#fff;">${dateStr}</p>`
      toolTip.setAttribute(
        'style',
        `width: 128px; height: 50px; position: absolute; display: none; padding: 8px; box-sizing: border-box; z-index: 1000; top: ${y}px; left: ${x}px; pointer-events: none; border: 1px solid #E1F25C; border-radius: 8px;`
      )
      toolTip.style.background = 'rgba(18, 18, 18, 0.6)'
      this.el = toolTip
      return this.el
    } else {
      this.update({ dateStr, x, y, bgColor, display })
    }
  }
  update({ dateStr, x, y, display, token0Price }: ToolTipParam) {
    if (!this.el) {
      return this.createToolTip({ dateStr, x, y })
    } else {
      this.el.innerHTML = `
      <p style="font-family: 'Inter';font-size: 12px;color:#fff;line-height:17px;margin:0;">${dateStr}</p>
      <p style="font-family: 'Inter';font-size: 12px;color:#E1F25C;line-height:17px;margin:0;white-space:nowrap;">${token0Price}</p>
      `
      this.el.setAttribute(
        'style',
        `width: 132px; position: absolute; display: ${
          display ? 'flex' : 'none'
        }; padding: 8px;flex-flow: column nowrap; justify-content:flex-start;align-items:flex-start; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: ${y}px; left: ${x}px; pointer-events: none; border: 1px solid #E1F25C; border-radius: 8px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
      )
      this.el.style.background = 'rgba(18, 18, 18, 0.6)'
      this.el.style.color = 'black'
    }
  }
}
;({ data }: { data: PointerItem[] }) => {
  const chartContainerRef = useRef<any>()
  const { data: poolInfo } = useEnglishAuctionPoolInfo()
  const colorObj = useMemo(() => {
    return poolInfo?.status === PoolStatus.Upcoming
      ? {
          lineColor: '#959595',
          topColor: 'rgba(149, 149, 149, 0.2)',
          bottomColor: 'rgba(149, 149, 149, 0.2)'
        }
      : poolInfo?.status === PoolStatus.Live
      ? {
          lineColor: '#20994B',
          topColor: '#20994B',
          bottomColor: 'rgba(32, 153, 75, 0.2)'
        }
      : {
          lineColor: '#2B51DA',
          topColor: '#2B51DA',
          bottomColor: 'rgba(43, 81, 218, 0.2)'
        }
  }, [poolInfo])
  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#121212' },
        textColor: '#626262'
      },
      grid: {
        vertLines: { color: '#D7D6D9', style: 4 },
        horzLines: { color: '#D7D6D9', style: 4 }
      },
      width: chartContainerRef.current.clientWidth,
      height: 250,
      timeScale: {
        borderVisible: true,
        borderColor: '#D7D6D9'
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
      }
    })
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }
    chart.timeScale().fitContent()
    // set line
    const newSeries = chart.addAreaSeries({
      ...colorObj
    })
    newSeries.setData(data as LineData[])
    // set current time data
    const markers = [
      {
        time: new Date().valueOf() / 1000,
        position: 'inBar',
        color: '#959595',
        shape: 'circle',
        size: 0.7
      }
    ]
    newSeries.setMarkers(markers as SeriesMarker<Time>[])
    window.addEventListener('resize', handleResize)
    const TipsTool = new ToolTip({ dateStr: '' })
    chartContainerRef.current.appendChild(TipsTool.el)
    chart.subscribeCrosshairMove((param: MouseEventParams) => {
      const currentValue = param?.seriesPrices?.values().next().value
      let dateStr = ''
      const resultItem = data.find((item: PointerItem) => Number(item.value) === Number(currentValue))
      if (resultItem && resultItem?.time) {
        dateStr = moment(Number(resultItem.time) * 1000).format('DD MMMM') || '--'
      }
      const token0Price = currentValue + poolInfo?.token0.symbol
      const x = Number(param?.point?.x) + 110
      const y = Number(newSeries.priceToCoordinate(currentValue)) + 200
      if (
        param.point === undefined ||
        !param.time ||
        param?.point?.x < 0 ||
        param?.point?.x > chartContainerRef.current.clientWidth ||
        param?.point?.y < 0 ||
        param?.point?.y > chartContainerRef.current.clientHeight
      ) {
        TipsTool.update({ dateStr, x, y, display: false })
        return
      }
      TipsTool.update({ dateStr, x, y, display: true, token0Price })
    })
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [colorObj, data, poolInfo?.token0.symbol])
  return <Box ref={chartContainerRef}></Box>
}
const LineChartSection = () => {
  const { data: poolInfo } = useEnglishAuctionPoolInfo()
  const segments = poolInfo?.fragments ? poolInfo?.fragments : 0
  const startTime = poolInfo?.openAt ? Number(poolInfo?.openAt * 1000) : 0
  const endTime = poolInfo?.closeAt ? Number(poolInfo?.closeAt * 1000) : 0
  const startPrice = poolInfo?.currencyAmountStartPrice ? Number(poolInfo?.currencyAmountStartPrice.toExact()) : 0
  const endPrice = poolInfo?.currencyAmountEndPrice ? Number(poolInfo?.currencyAmountEndPrice.toExact()) : 0
  const arrayRange = (start: number | string, stop: number, step: number | string) =>
    Array.from({ length: stop + 1 }, (value, index) => {
      return BigNumber(start).plus(BigNumber(step).times(index)).toNumber()
    })
  const priceSegments = new BigNumber(endPrice).minus(startPrice).div(segments).toNumber()
  const timeSegments = new BigNumber(endTime).minus(startTime).div(segments).integerValue().toNumber()
  console.log(
    'segments startPrice endPrice startTime endTime>>',
    segments,
    startPrice,
    endPrice,
    startTime,
    endTime,
    priceSegments,
    timeSegments
  )
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
  console.log('lineData>>>', lineData)
  const swapedPercent = poolInfo?.currencySwappedAmount0
    ? new BigNumber(poolInfo.currencySwappedAmount0.raw.toString()).div(poolInfo.amountTotal0).times(100).toNumber()
    : undefined
  const swappedAmount0 = poolInfo?.swappedAmount0
    ? formatNumber(poolInfo.swappedAmount0, {
        unit: poolInfo.token0.decimals,
        decimalPlaces: poolInfo.token0.decimals
      })
    : undefined
  const amountTotal0 = poolInfo?.amountTotal0
    ? formatNumber(poolInfo.amountTotal0, {
        unit: poolInfo.token0.decimals,
        decimalPlaces: poolInfo.token0.decimals
      })
    : undefined
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
            color: '#fff'
          }}
        >
          Duction Auction Live Chart
        </Typography>
        <OpenChartImg />
      </Stack>
      {/* <LineChartView data={lineData} /> */}
      <PoolInfoItem title={'Starting price'} sx={{ marginBottom: '10px', marginTop: '10px' }}>
        <RightText>
          {`${poolInfo?.currencyAmountEndPrice?.toSignificant()} ${(poolInfo?.token1.symbol + '').toUpperCase()}`}
        </RightText>
      </PoolInfoItem>
      <PoolInfoItem title={'Reserve price'}>
        <RightText>
          {`${poolInfo?.currencyAmountStartPrice?.toSignificant()} ${(poolInfo?.token1.symbol + '').toUpperCase()}`}
        </RightText>
      </PoolInfoItem>
      <PoolProgress value={swapedPercent} sx={{ mt: 12 }} poolStatus={poolInfo?.status}></PoolProgress>
      <PoolInfoItem
        title={swappedAmount0 + ' ' + poolInfo?.token0.symbol.toUpperCase()}
        sx={{
          marginTop: '4px'
        }}
      >
        <RightText>
          / {amountTotal0} {poolInfo?.token0.symbol.toUpperCase()}
        </RightText>
      </PoolInfoItem>
    </Box>
  )
}
export default LineChartSection
