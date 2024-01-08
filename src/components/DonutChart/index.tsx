import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'

type EChartsOption = echarts.EChartsOption

const DonutChart = ({
  option,
  width,
  height
}: {
  option: EChartsOption
  width: number | string
  height: number | string
}) => {
  const [myChart, setMyChart] = useState<echarts.ECharts | null>(null)
  const chartRef = useRef<HTMLDivElement | null>(null)

  const initChart = () => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)
      setMyChart(chart)
    }
  }

  const disposeChart = () => {
    if (myChart) {
      myChart.dispose()
      setMyChart(null)
    }
  }

  const echartsResize = () => {
    if (chartRef.current) {
      echarts.init(chartRef.current).resize()
    }
  }

  useEffect(() => {
    initChart()
    window.addEventListener('resize', echartsResize)
    return () => {
      disposeChart()
      window.removeEventListener('resize', echartsResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (myChart && option) {
      myChart.setOption(option)
    }
  }, [myChart, option])
  return <div style={{ width: width, height: height }} ref={chartRef}></div>
}
export default DonutChart
