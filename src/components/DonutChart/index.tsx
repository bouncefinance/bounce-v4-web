import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'

type EChartsOption = echarts.EChartsOption

const DonutChart = ({ option, size }: { option: EChartsOption; size: { width: number; height: number } }) => {
  const [myChart, setMyChart] = useState<echarts.ECharts | null>(null)
  const chartRef = useRef<HTMLDivElement | null>(null)

  const initChart = () => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current as any as HTMLElement, undefined, {
        width: size.width,
        height: size.height
      })
      setMyChart(chart)
    }
  }

  const disposeChart = () => {
    if (myChart) {
      myChart.dispose()
      setMyChart(null)
    }
  }

  useEffect(() => {
    initChart()

    return () => {
      disposeChart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (myChart && option) {
      myChart.setOption(option)
    }
  }, [myChart, option])
  return <div ref={chartRef}></div>
}
export default DonutChart
