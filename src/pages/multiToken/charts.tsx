import { Box, Stack, Typography, styled } from '@mui/material'
import DonutChart from 'components/DonutChart'
import { EChartsOption } from 'echarts/types/dist/echarts'
import useBreakpoint from 'hooks/useBreakpoint'
import { getIcon, muColorList } from 'pages/nftLottery/sections/tokenInformation/config'
import { MultiTokenResultType } from 'bounceHooks/launchpad/useLaunchpadCoinInfo'
import { useMemo } from 'react'
import { useTokens } from 'state/wallet/hooks'
import { ChainId } from 'constants/chain'

const Title = styled(Typography)`
  color: var(--white, #fff);

  /* D/H4 */
  font-family: Public Sans;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.4px;
`
const WhiteP1 = styled(Typography)`
  color: #fff;

  /* D/H6 */
  font-family: Public Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;
`

const ChartLayout = ({
  data,
  title,
  option,
  width,
  height
}: {
  data: any
  title: string
  option: EChartsOption
  width: number
  height: number
}) => {
  const isSm = useBreakpoint('sm')
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 16,
        background: 'linear-gradient(152deg, #26273B 10.68%, #363853 104.23%)',
        paddingBottom: isSm ? 16 : 36,
        margin: '0 auto'
      }}
    >
      <Box sx={{ padding: isSm ? '24px 24px 16px 24px' : '28px 48px', borderBottom: '2px solid #4F4F4F' }}>
        <Title fontSize={isSm ? 16 : 20}>{title}</Title>
      </Box>
      <Box>
        <Box margin={isSm ? '24px 0 32px' : '32px 0 28px'} display={'flex'} justifyContent={'center'}>
          <DonutChart option={option} size={{ width: width, height: height }} />
        </Box>

        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} pl={isSm ? '18%' : '15%'}>
          {data?.map((i: any) => (
            <Stack
              key={i.name}
              flexDirection={'row'}
              alignItems={'center'}
              width={isSm ? '50%' : '33.3%'}
              mb={isSm ? 16 : 12}
            >
              <Box sx={{ width: 12, height: 12, background: i.color, borderRadius: 12 }} />
              <WhiteP1 ml={12} mr={4}>
                {i.name}
              </WhiteP1>
              {i.icon && <img src={i.icon} style={{ width: 20, height: 20 }} />}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

const Charts = ({ coinInfo }: { coinInfo: MultiTokenResultType | undefined }) => {
  const isSm = useBreakpoint('sm')
  const _chainId = useMemo(() => {
    return ChainId.SEPOLIA
  }, [])
  const poolStakeTokens = useTokens(
    coinInfo?.myStakeToken1WeightAmountMap?.myStakeToken1WeightTokenAddr ?? [],
    _chainId
  )

  const pieData = useMemo(() => {
    if (coinInfo && poolStakeTokens) {
      const arr = coinInfo.token1StakedStats?.stakeTokenPrices?.map((item, index) => ({
        value:
          Number(coinInfo?.poolStakeToken1WeightAmountMap?.poolStakeToken1WeightAmounts?.[index].div(item).toExact()) ||
          0,
        color: muColorList[index],
        name: poolStakeTokens[index]?.symbol?.toLocaleUpperCase(),
        logo: getIcon(poolStakeTokens[index]?.name?.toLocaleUpperCase()),
        itemStyle: { color: muColorList[index] }
      }))
      return arr
    }
    return undefined
  }, [coinInfo, poolStakeTokens])

  const barData = useMemo(() => {
    if (coinInfo && poolStakeTokens) {
      const arr = coinInfo.poolStakeToken1WeightAmountMap?.poolStakeToken1WeightAmounts?.map((item, index) => ({
        value: Number(item.toExact()),
        color: muColorList[index],
        name: poolStakeTokens[index]?.symbol?.toLocaleUpperCase(),
        logo: getIcon(poolStakeTokens[index]?.name?.toLocaleUpperCase()),
        itemStyle: { color: muColorList[index] }
      }))
      return arr
    }
    return undefined
  }, [coinInfo, poolStakeTokens])
  const barXAxisData = barData
    ? barData.map(item => {
        return item.name ? item.name : ''
      })
    : []

  const pieOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      position: 'inside'
    },
    legend: {
      orient: 'vertical',
      top: 'center',
      right: '0%',
      show: false
    },
    series: [
      {
        name: 'Token proportion',
        type: 'pie',
        radius: ['50%', '95%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inside',
          formatter: function (params: any) {
            if (params.value == 0) {
              return ''
            } else {
              return params.percent + '%'
            }
          },
          color: '#fff',
          fontFamily: 'Public Sans',
          fontWeight: 400,
          lineHeight: 1.5
        },
        labelLine: {
          show: false
        },
        data: pieData
      }
    ]
  }
  const barOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      position: 'inside',
      formatter: function (parms: any) {
        const str =
          parms.seriesName +
          '</br>' +
          parms.marker +
          parms.data.name +
          ':  ' +
          `<span style='font-weight:600;margin-left:20'>$${parms.data.value}</span>`
        return str
      }
    },
    grid: {
      top: '10%',
      right: '5%',
      bottom: '10%',
      left: '10%'
    },
    xAxis: {
      type: 'category',
      data: barXAxisData,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#4F4F4F'
        }
      },
      axisLabel: {
        show: true,
        margin: 10,
        fontSize: 10,
        color: '#FFF'
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#4F4F4F'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#4F4F4F'
        }
      },
      axisLabel: {
        show: true,
        margin: 10,
        fontSize: 10,
        color: '#FFF'
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#4F4F4F'
        }
      }
    },
    series: [
      {
        name: 'Value Distribution',
        type: 'bar',
        barWidth: 30,
        data: barData
      }
    ]
  }
  return (
    <Stack flexDirection={'row'} flexWrap={isSm ? 'wrap' : 'nowrap'} gap={isSm ? 16 : 20} mt={isSm ? 24 : 60}>
      <Box width={isSm ? '100%' : '60%'}>
        <ChartLayout
          data={pieData}
          title="Token proportion"
          option={pieOption}
          width={isSm ? 200 : 252}
          height={isSm ? 200 : 252}
        />
      </Box>
      <Box width={isSm ? '100%' : '40%'}>
        <ChartLayout
          data={barData}
          title="Value Distribution"
          option={barOption}
          width={isSm ? 300 : 450}
          height={isSm ? 200 : 252}
        />
      </Box>
    </Stack>
  )
}
export default Charts
