import { Box, Stack, Typography, styled } from '@mui/material'
import { ReactComponent as OpenChartIcon } from 'assets/imgs/dutchAuction/openChart.svg'
import { useMemo, useRef, useEffect } from 'react'
import { BigNumber } from 'bignumber.js'
import { createChart, ColorType, LineData, SeriesMarker, Time, MouseEventParams } from 'lightweight-charts'
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
  dateStr?: string
  x?: string | number
  y?: string | number
  bgColor?: string
  display?: boolean
}
class ToolTip {
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
  update({ dateStr, x, y, bgColor, display }: ToolTipParam) {
    if (!this.el) {
      return this.createToolTip({ dateStr, x, y })
    } else {
      this.el.setAttribute(
        'style',
        `width: 128px; height: 50px; position: absolute; display: ${
          display ? 'block' : 'none'
        }; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: ${y}px; left: ${x}px; pointer-events: none; border: 1px solid; border-radius: 2px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
      )
      this.el.style.background = 'rgba(18, 18, 18, 0.6)'
      this.el.style.color = 'black'
      this.el.style.borderColor = bgColor ? bgColor : '#2962FF'
    }
  }
  setLeft({ x, y, bgColor, display }: ToolTipParam) {
    this.el.setAttribute(
      'style',
      `width: 128px; height: 50px; position: absolute; display: ${
        display ? 'block' : 'none'
      }; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: ${y}px; left: ${x}px; pointer-events: none; border: 1px solid; border-radius: 2px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
    )
    this.el.style.transform = 'translate3D(-100%, 0, 0)'
    this.el.style.background = 'rgba(18, 18, 18, 0.6)'
    this.el.style.color = 'black'
    this.el.style.borderColor = bgColor ? bgColor : '#2962FF'
  }
  setRight({ x, y, bgColor, display }: ToolTipParam) {
    this.el.setAttribute(
      'style',
      `width: 128px; height: 50px; position: absolute; display: ${
        display ? 'block' : 'none'
      }; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: ${y}px; left: ${x}px; pointer-events: none; border: 1px solid; border-radius: 2px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
    )
    this.el.style.background = 'rgba(18, 18, 18, 0.6)'
    this.el.style.color = 'black'
    this.el.style.borderColor = bgColor ? bgColor : '#2962FF'
  }
}
const LineChartView = ({ data }: { data: PointerItem[] }) => {
  const chartContainerRef = useRef<any>()
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
      lineColor: '#959595',
      topColor: 'rgba(149, 149, 149, 0.2)',
      bottomColor: 'rgba(149, 149, 149, 0.2)'
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
      const data = param?.seriesPrices?.values().next().value
      const x = Number(param?.point?.x) + 110
      const y = Number(newSeries.priceToCoordinate(data)) + 200
      if (
        param.point === undefined ||
        !param.time ||
        param?.point?.x < 0 ||
        param?.point?.x > chartContainerRef.current.clientWidth ||
        param?.point?.y < 0 ||
        param?.point?.y > chartContainerRef.current.clientHeight
      ) {
        TipsTool.update({ dateStr: data, x, y, display: false })
        return
      }
      //   if (x > chartContainerRef.current.clientWidth - 128 && x < chartContainerRef.current.clientWidth) {
      //     TipsTool.setRight({ x, y })
      //     return
      //   }
      //   if (x > 0 && x < 128) {
      //     TipsTool.setLeft({ x, y })
      //     return
      //   }
      console.log(`The data point is at position: ${x}, ${y}`)
      TipsTool.update({ dateStr: data, x, y, display: true })
    })
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data])
  return <Box ref={chartContainerRef}></Box>
}
const LineChartSection = ({ poolInfo }: { poolInfo: any }) => {
  const startTime = 1687835547
  const endTime = 1687935547
  const startPrice = 20
  const endPrice = 40
  const segments = 10
  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from({ length: stop + 1 }, (value, index) => start + index * step)
  const lineData = useMemo(() => {
    const timeSegments = new BigNumber(endTime).minus(startTime).div(segments).integerValue().toNumber()
    const xList = arrayRange(startTime, segments, timeSegments)
    const priceSegments = new BigNumber(endPrice).minus(startPrice).div(segments).integerValue().toNumber()
    const yList = arrayRange(startPrice, segments, priceSegments).reverse()
    const dataPoint = new Array(segments + 1).fill(0).map((item, index) => {
      return {
        time: xList[index],
        value: yList[index]
      }
    })
    return dataPoint
  }, [startTime, endTime, startPrice, endPrice, segments])
  console.log('lineData>>>', lineData)
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
      <LineChartView data={lineData} />
      {poolInfo.name}
    </Box>
  )
}
export default LineChartSection
