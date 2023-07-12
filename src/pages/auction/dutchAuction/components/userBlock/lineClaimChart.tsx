import { Box } from '@mui/material'
import { useMemo, useRef, useEffect, useState } from 'react'
import { BigNumber } from 'bignumber.js'
import {
  createChart,
  ColorType,
  TimeFormatterFn,
  LineData,
  SeriesMarker,
  Time,
  MouseEventParams
} from 'lightweight-charts'
import moment from 'moment'
import { PoolStatus } from 'api/pool/type'
import { DutchAuctionPoolProp } from 'api/pool/type'
interface PointerItem {
  time: number | string
  value: number
}
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
    } else if (!display) {
      this.el.setAttribute(
        'style',
        `width: 132px; position: absolute; display: none; padding: 8px;flex-flow: column nowrap; justify-content:flex-start;align-items:flex-start; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: ${y}px; left: ${x}px; pointer-events: none; border: 1px solid #E1F25C; border-radius: 8px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
      )
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
const LineChartView = ({ data, poolInfo }: { data: PointerItem[]; poolInfo: DutchAuctionPoolProp }) => {
  const chartContainerRef = useRef<any>()
  const [tooltipInstance, setTooltipInstance] = useState<any>(null)
  const colorObj = useMemo(() => {
    return poolInfo.status === PoolStatus.Upcoming
      ? {
          lineColor: '#959595',
          topColor: 'rgba(149, 149, 149, 0.2)',
          bottomColor: 'rgba(149, 149, 149, 0.2)'
        }
      : poolInfo.status === PoolStatus.Live
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
  const timeFormatter: TimeFormatterFn = (time: any) => {
    const date = new Date(time)
    return moment(date).format('DD MMMM')
  }
  useEffect(() => {
    if (!chartContainerRef.current) return
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
      localization: {
        timeFormatter: function (businessDayOrTimestamp: number | string) {
          // console.log(businessDayOrTimestamp);
          return moment(businessDayOrTimestamp).format('YYYY-MM-DD HH:mm:ss')
        }
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
    if (!tooltipInstance) {
      const TipsTool = new ToolTip({ dateStr: '' })
      setTooltipInstance(TipsTool)
      chartContainerRef.current.appendChild(TipsTool?.el)
    }
    chart.subscribeCrosshairMove((param: MouseEventParams) => {
      const currentValue = param?.seriesPrices?.values().next().value
      let dateStr = ''
      const resultItem = data.find((item: PointerItem) => Number(item.value) === Number(currentValue))
      if (resultItem && resultItem?.time) {
        dateStr = moment(Number(resultItem.time)).format('DD MMMM') || '--'
      }
      const token0Price = Number(currentValue).toFixed(6) + poolInfo.token1.symbol
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
        console.log('123132')
        tooltipInstance.update({ dateStr, x, y, display: false })
        return
      }
      tooltipInstance.update({ dateStr, x, y, display: true, token0Price })
    })
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [colorObj, data, poolInfo.token0.symbol, poolInfo.token1.symbol, tooltipInstance])
  return <Box ref={chartContainerRef}></Box>
}
const lineClaimChart = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const startTime = poolInfo.releaseData?.[0]?.startAt ? Number(poolInfo.releaseData?.[0]?.startAt * 1000) : 0
  const endTime = poolInfo.releaseData?.[0]?.endAt ? Number(poolInfo.releaseData?.[0]?.endAt * 1000) : 0
  const lineData = [
    {
      time: startTime,
      value: 0
    },
    {
      time: endTime,
      value: BigNumber(poolInfo.participant.currencySwappedAmount0?.toExact() + '').toNumber()
    }
  ]
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <LineChartView data={lineData} poolInfo={poolInfo} />
    </Box>
  )
}
export default lineClaimChart
