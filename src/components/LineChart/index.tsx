import { Box, Typography } from '@mui/material'
import {
  ChartOptions,
  DeepPartial,
  createChart,
  LineData,
  TimeFormatterFn,
  Coordinate,
  MouseEventParams,
  UTCTimestamp,
  SeriesMarker,
  Time,
  IChartApi,
  ISeriesApi
} from 'lightweight-charts'
import { useRef, useEffect, useState, useMemo } from 'react'

const darkStyle = {
  layoutTextColor: 'rgba(255,255,255,0.3)',
  layoutBackground: 'black',
  borderColor: 'white',
  lineColor: 'white',
  tooltipColor: '#000'
}

const whiteStyle = {
  layoutTextColor: 'rgba(0,0,0,0.3)',
  layoutBackground: 'white',
  borderColor: 'black',
  lineColor: '#2B51DA',
  tooltipColor: '#fff'
}
interface IDataType {
  value: number
  time: number
}

const timeFormatter: TimeFormatterFn = (time: any) => {
  const date = new Date(time * 1000)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes} ${month}-${day}`
}
const markersFormatter = (data: IDataType[], dotColor?: string) => {
  const markers = data.map<SeriesMarker<Time>>(item => ({
    time: item.time as Time,
    position: 'inBar',
    color: dotColor || '#2B51DA',
    shape: 'circle',
    size: 0.1
  }))
  return markers
}

let chart: IChartApi | null = null
let lineSeries: ISeriesApi<'Line'> | null = null

const initChart = (
  dom: HTMLElement,
  style: {
    layoutTextColor: string
    layoutBackground: string
    borderColor: string
    lineColor: string
    tooltipColor: string
  }
) => {
  const chartOptions: DeepPartial<ChartOptions> = {
    layout: {
      textColor: style.layoutTextColor,
      background: { color: style.layoutBackground }
    },
    grid: { vertLines: { visible: false }, horzLines: { visible: false } },
    leftPriceScale: {
      visible: true,
      // topColor: style.layoutTextColor,
      borderColor: style.borderColor,
      borderVisible: false,
      autoScale: true
    },
    rightPriceScale: { visible: false },
    crosshair: {
      horzLine: { visible: false },
      vertLine: { visible: true, color: style.lineColor, style: 0, labelVisible: false }
    },
    timeScale: {
      borderVisible: false,
      timeVisible: true,
      secondsVisible: true,
      shiftVisibleRangeOnNewBar: true
    }
  }
  chart = createChart(dom, chartOptions)
  lineSeries = chart.addLineSeries({
    color: style.lineColor,
    lineWidth: 3,
    priceLineVisible: false,
    lastValueVisible: false
  })
  lineSeries.applyOptions({
    priceFormat: { type: 'volume', precision: 8, minMove: 0.00000001 }
  })
  chart.timeScale().applyOptions({
    tickMarkFormatter: timeFormatter
  })
  // const markers = markersFormatter(data)
  // lineSeries.setMarkers(markers)

  // lineSeries.setData(data as LineData[])

  chart.timeScale().fitContent()
}

export default function LineChart({
  isDark,
  data,
  token1Name
}: {
  isDark?: true
  data: IDataType[]
  token1Name: string
}) {
  const style = useMemo(() => (isDark ? darkStyle : whiteStyle), [isDark])
  const [localData, setLocalData] = useState<IDataType[]>([])

  const BoxRef = useRef<HTMLElement>(null)
  const infoBoxRef = useRef<HTMLElement>(null)
  const [infoPoint, setInfoPoint] = useState<{ x: number; y: number }>()
  const [info, setInfo] = useState<{ value: any; time: any }>()

  useEffect(() => {
    if (!chart) {
      initChart(BoxRef.current as HTMLElement, style)
    }
  }, [data, style])

  useEffect(() => {
    if (lineSeries && data.length > localData.length) {
      setLocalData(data)
      if (localData.length) {
        for (let index = localData.length; index < data.length; index++) {
          const element = data[index]
          lineSeries.update(element as LineData)
        }
      } else {
        lineSeries.setData(data as LineData[])
      }
      const markers = markersFormatter(data, style.lineColor)
      lineSeries.setMarkers(markers)
    }
  }, [data, localData.length, style.lineColor])

  useEffect(() => {
    const move = (param: MouseEventParams) => {
      if (!chart || !lineSeries) return
      if (!param.point) {
        setInfoPoint({ x: 10000, y: 10000 })
        return
      }
      if (param) {
        const time = param.time as UTCTimestamp
        const value = param?.seriesPrices?.values()?.next().value
        let x = chart.timeScale().timeToCoordinate(time) as Coordinate
        const y = lineSeries.priceToCoordinate(value) as Coordinate
        if (x - (BoxRef.current?.offsetLeft as number) <= 100) {
          if (infoBoxRef.current?.clientWidth) {
            x = (x + infoBoxRef.current?.clientWidth) as Coordinate
          }
        }
        setInfoPoint({ ...infoPoint, x, y })
        setInfo({ ...info, value, time })
      }
    }
    if (chart) {
      chart.subscribeCrosshairMove(move)
    }
    return () => {
      chart?.unsubscribeCrosshairMove(move)
    }
  }, [data, info, infoPoint])

  useEffect(() => {
    return () => {
      chart = null
      lineSeries = null
    }
  }, [])

  return (
    <Box
      mt={10}
      ref={BoxRef}
      height={240}
      sx={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          color: style.lineColor,
          left: infoPoint?.x,
          top: infoPoint?.y,
          zIndex: '3',
          transform: 'translate(-120%,-100%)',
          pointerEvents: 'none'
        }}
        ref={infoBoxRef}
      >
        <Typography
          sx={{
            padding: '10px',
            whiteSpace: 'nowrap',
            backgroundColor: style.lineColor,
            fontWeight: 500,
            fontSize: 12,
            color: style.tooltipColor,
            borderRadius: '8px'
          }}
        >
          {info?.value} {token1Name}
        </Typography>

        <Typography sx={{ whiteSpace: 'nowrap', fontSize: 12, marginTop: '5px', fontWeight: 500 }}>
          {timeFormatter(info?.time)}
        </Typography>
      </Box>
    </Box>
  )
}
