import { Box, Stack, Typography, styled } from '@mui/material'
import { ReactComponent as OpenChartIcon } from 'assets/imgs/dutchAuction/openChart.svg'
import { useMemo, useRef, useEffect, useState } from 'react'
import { BigNumber } from 'bignumber.js'
import {
  createChart,
  ColorType,
  LineData,
  SeriesMarker,
  Time,
  MouseEventParams,
  ChartOptions,
  DeepPartial,
  LineStyle,
  LineType
} from 'lightweight-charts'
import { RightText } from './creatorBlock/auctionInfo'
import PoolProgress from 'bounceComponents/common/PoolProgress'
import { formatNumber } from 'utils/number'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
import PoolInfoItem from 'pages/auction/dutchAuction/components/poolInfoItem'
import ChartDialog from './userBlock/chartDialog'
import { formatNumberWithCommas } from 'utils'
import { CurrencyAmount } from 'constants/token'

interface PointerItem {
  time: number | string
  value: number
}
export enum ViewTypeParam {
  'default' = 0,
  'dialog' = 1,
  'dip' = 2,
  'linear' = 3
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
    this.createToolTip({ dateStr, x, y, bgColor, display })
  }
  createToolTip({ dateStr, x, y, bgColor, display }: ToolTipParam) {
    if (!this.el) {
      const toolTip = document.createElement('div')
      toolTip.innerHTML = `<p style="font-family: 'Inter';font-size: 12px;color:#fff;">${dateStr}</p>`
      toolTip.setAttribute(
        'style',
        `width: 128px; height: 50px; position: absolute; display: none; padding: 8px; box-sizing: border-box; z-index: 1000; top: ${y}px; left: ${x}px; pointer-events: none; border: 1px solid #E1F25C;font-weight:600; border-radius: 8px;`
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
        `width: 132px; position: absolute; display: none; padding: 8px;flex-flow: column nowrap; justify-content:flex-start;align-items:flex-start; box-sizing: border-box; font-size: 12px;font-weight: 600; text-align: left; z-index: 1000; top: ${y}px; left: ${x}px; pointer-events: none; border: 1px solid #20994B; border-radius: 8px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
      )
    } else {
      this.el.innerHTML = `
      <p style="font-family: 'Inter';font-size: 12px;color:#fff;line-height:17px;margin:0;">${dateStr}</p>
      <p style="font-family: 'Inter';font-size: 12px;color:#20994B;font-weight:600;line-height:17px;margin:0;white-space:nowrap;">${token0Price}</p>
      `
      this.el.setAttribute(
        'style',
        `width: 132px; position: absolute; display: ${
          display ? 'flex' : 'none'
        }; padding: 8px;flex-flow: column nowrap; justify-content:flex-start;align-items:flex-start; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: ${y}px; left: ${x}px; pointer-events: none; border: 1px solid #20994B; border-radius: 8px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
      )
      this.el.style.background = 'rgba(18, 18, 18, 0.6)'
      this.el.style.color = 'black'
    }
  }
}
export const LineChartView = ({
  data,
  poolInfo,
  options,
  viewType = ViewTypeParam.default
}: {
  data: PointerItem[]
  poolInfo: Erc20EnglishAuctionPoolProp
  options?: DeepPartial<ChartOptions>
  viewType?: ViewTypeParam
}) => {
  const chartContainerRef = useRef<any>()
  const [tooltipInstance, setTooltipInstance] = useState<any>(null)
  const segmentLeftAmount = useMemo(
    () =>
      poolInfo?.fragments &&
      CurrencyAmount.fromRawAmount(
        poolInfo.currencyAmountTotal0.currency,
        BigNumber(poolInfo.amountTotal0).div(poolInfo?.fragments).integerValue(BigNumber.ROUND_DOWN).toString()
      ).toExact(),
    [poolInfo.amountTotal0, poolInfo.currencyAmountTotal0.currency, poolInfo?.fragments]
  )

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
  const offsetXy = useMemo(() => {
    if (ViewTypeParam.default === viewType) {
      return {
        x: 120,
        y: 240
      }
    } else if (ViewTypeParam.dialog === viewType) {
      return {
        x: 120,
        y: 50
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
        background: { type: ColorType.Solid, color: '#121212' },
        textColor: '#626262'
      },
      grid: {
        vertLines: { color: '#D7D6D9', style: 4 },
        horzLines: { color: '#D7D6D9', style: 4 }
      },
      localization: {
        timeFormatter: function (time: number | string) {
          return formatNumberWithCommas(Number(time).toFixed(6))
        },
        priceFormatter: (price: number | string) => {
          return Number(price).toFixed(6)
        }
      },
      width: chartContainerRef.current.clientWidth,
      height: 250,
      timeScale: {
        timeVisible: false,
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
      },
      ...options
    })
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }
    chart.timeScale().applyOptions({
      tickMarkFormatter: (time: any) => {
        return formatNumberWithCommas(Math.round(Number(Number(time).toFixed(6))))
      }
    })
    chart.timeScale().fitContent()
    // set line
    // const newSeries = chart.addAreaSeries({
    //   ...colorObj
    // })
    const lineSeries = chart.addLineSeries({
      lineWidth: 2,
      lineType: LineType.Simple,
      priceLineColor: colorObj.lineColor,
      color: colorObj.lineColor
    })
    const createStepLine = () => {
      for (let i = 0; i < data.length - 1; i++) {
        const curData = data[i]
        const nextData = data[i + 1]
        const priceLine = lineSeries.createPriceLine({
          price: Number(curData.value),
          color: 'green',
          lineWidth: 1,
          lineStyle: LineStyle.Dotted,
          lineVisible: false,
          axisLabelVisible: false,
          title: ''
        })
        lineSeries.createPriceLine({
          price: Number(nextData.value),
          color: 'green',
          lineWidth: 1,
          lineVisible: false,
          axisLabelVisible: false,
          title: '',
          lineStyle: LineStyle.Dashed
        })
        priceLine.applyOptions({
          lineStyle: 0
        })
      }
    }
    createStepLine()
    lineSeries.setData(data as LineData[])
    // newSeries.setData(data as LineData[])
    const nowDate = new Date().valueOf()
    if (nowDate / 1000 <= poolInfo.closeAt && nowDate / 1000 >= poolInfo.openAt) {
      // set current time data
      const markers = [
        {
          time:
            Number(segmentLeftAmount) !== 0
              ? Math.floor(Number(poolInfo.currencySwappedAmount0?.toExact()) / Number(segmentLeftAmount)) *
                Number(segmentLeftAmount)
              : 0,
          position: 'inBar',
          color: '#959595',
          shape: 'circle',
          size: 0.7
        }
      ]
      lineSeries.setMarkers(markers as SeriesMarker<Time>[])
    }
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
      if (resultItem) {
        dateStr = Number(resultItem.time).toFixed(6) + poolInfo.token0.symbol
      } else {
        dateStr = '--'
      }
      const token0Price = currentValue ? Number(currentValue).toFixed(6) : '--' + poolInfo.token1.symbol
      const x = Number(param?.point?.x) + offsetXy.x
      const y = Number(lineSeries.priceToCoordinate(currentValue)) + offsetXy.y
      if (
        param.point === undefined ||
        Number(param.time) < 0 ||
        param?.point?.x < 0 ||
        param?.point?.x > chartContainerRef.current.clientWidth ||
        param?.point?.y < 0 ||
        param?.point?.y > chartContainerRef.current.clientHeight
      ) {
        tooltipInstance?.update({ dateStr, x, y, display: false })
        return
      }
      tooltipInstance?.update({ dateStr, x, y, display: true, token0Price })
    })
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [
    tooltipInstance,
    colorObj,
    data,
    poolInfo.token0.symbol,
    poolInfo.token1.symbol,
    options,
    poolInfo.currencyCurrentPrice,
    poolInfo.currencySwappedAmount0,
    poolInfo.closeAt,
    poolInfo.openAt,
    poolInfo.fragments,
    segmentLeftAmount,
    offsetXy.x,
    offsetXy.y
  ])
  return (
    <>
      <Box fontSize={12} color={'#626262'} mb={8}>{`Price(${poolInfo.token1.symbol})`}</Box>
      <Box ref={chartContainerRef}></Box>
    </>
  )
}
const LineChartSection = ({
  poolInfo,
  hideDialogBtn = false
}: {
  poolInfo: Erc20EnglishAuctionPoolProp
  hideDialogBtn?: boolean
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const { currencyAmountTotal0, currencyAmountStartPrice, currencyAmountEndPrice, fragments: times } = poolInfo
  const segments = times ? Number(times) : 0
  const lowestPrice = useMemo(() => currencyAmountStartPrice, [currencyAmountStartPrice])
  const highestPrice = useMemo(() => currencyAmountEndPrice, [currencyAmountEndPrice])
  const startAmount = 0
  const endAmount = currencyAmountTotal0 ? Number(currencyAmountTotal0.toExact()) : 0
  const startPrice = lowestPrice ? Number(lowestPrice?.toExact()) : 0
  const endPrice = highestPrice ? Number(highestPrice?.toExact()) : 0
  const arrayRange = (start: number | string, stop: number, step: number | string) =>
    Array.from({ length: stop + 1 }, (value, index) => {
      return BigNumber(start).plus(BigNumber(step).times(index)).toNumber()
    })
  const priceSegments = new BigNumber(endPrice).minus(startPrice).div(segments).toNumber()
  const timeSegments = new BigNumber(endAmount).minus(startAmount).div(segments).toNumber()
  const lineData = useMemo(() => {
    const xList = arrayRange(startAmount, segments, timeSegments)
    const yList = arrayRange(startPrice, segments, priceSegments)
    const dataPoint = new Array(segments + 1).fill(0).map((item, index) => {
      return {
        time: xList[index],
        value: yList[index]
      }
    })
    return dataPoint
  }, [segments, timeSegments, startPrice, priceSegments])

  const swapedPercent = poolInfo?.currencySwappedAmount0
    ? new BigNumber(poolInfo.currencySwappedAmount0.raw.toString()).div(poolInfo.amountTotal0).times(100).toNumber()
    : undefined
  const amountTotal0 = poolInfo.amountTotal0
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
          ERC20 English Auction Live Chart
        </Typography>
        {!hideDialogBtn && (
          <OpenChartImg
            onClick={() => {
              setDialogOpen(!dialogOpen)
            }}
          />
        )}
      </Stack>
      <LineChartView data={lineData} poolInfo={poolInfo} viewType={ViewTypeParam.default} />
      <PoolInfoItem title={'Starting price'} sx={{ marginBottom: '10px', marginTop: '10px' }}>
        <RightText>
          {`${poolInfo.currencyAmountStartPrice?.toSignificant()} ${(poolInfo.token1.symbol + '').toUpperCase()}`}
        </RightText>
      </PoolInfoItem>
      <PoolInfoItem title={'Ending price'}>
        <RightText>
          {`${poolInfo.currencyAmountEndPrice?.toSignificant()} ${(poolInfo.token1.symbol + '').toUpperCase()}`}
        </RightText>
      </PoolInfoItem>
      <PoolProgress value={swapedPercent} sx={{ mt: 12 }} poolStatus={poolInfo.status}></PoolProgress>
      <PoolInfoItem
        title={poolInfo.currencySwappedAmount0?.toSignificant() + ' ' + poolInfo.token0.symbol.toUpperCase()}
        sx={{
          marginTop: '4px'
        }}
      >
        <RightText>
          / {amountTotal0} {poolInfo.token0.symbol.toUpperCase()}
        </RightText>
      </PoolInfoItem>
      <ChartDialog
        onClose={() => {
          setDialogOpen(false)
        }}
        data={lineData}
        poolInfo={poolInfo}
        open={dialogOpen}
      />
    </Box>
  )
}
export default LineChartSection
