import { Box, Stack, Typography, styled } from '@mui/material'
import DonutChart from 'components/DonutChart'
import { EChartsOption } from 'echarts/types/dist/echarts'
import useBreakpoint from 'hooks/useBreakpoint'
import { getIcon, muColorList } from 'pages/nftLottery/sections/tokenInformation/config'

interface ChartsDataType {
  name: string
  value: number
  itemStyle: any
  color: string
  icon: string
  amount: number
}

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
const data = [
  {
    name: 'AUCTION',
    value: 100,
    itemStyle: { color: muColorList[0] },
    color: muColorList[0],
    icon: getIcon('AUCTION')
  },
  { name: 'MUBI', value: 100, itemStyle: { color: muColorList[1] }, color: muColorList[1], icon: getIcon('MUBI') },
  { name: 'DAII', value: 100, itemStyle: { color: muColorList[2] }, color: muColorList[2], icon: getIcon('DAII') },
  { name: 'BSSB', value: 100, itemStyle: { color: muColorList[3] }, color: muColorList[3], icon: getIcon('BSSB') },
  { name: 'AMMX', value: 100, itemStyle: { color: muColorList[4] }, color: muColorList[4], icon: getIcon('AMMX') }
]

const ChartLayout = ({
  title,
  option,
  width,
  height
}: {
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
          {data.map(i => (
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

const Charts = ({ chartsData }: { chartsData?: ChartsDataType[] }) => {
  const isSm = useBreakpoint('sm')
  console.log(chartsData)

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
        data: data
      }
    ]
  }
  const barOption: EChartsOption = {
    grid: {
      top: '10%',
      right: '5%',
      bottom: '10%',
      left: '10%'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
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
        type: 'bar',
        barWidth: 30,
        data: data
      }
    ]
  }
  return (
    <Stack flexDirection={'row'} flexWrap={isSm ? 'wrap' : 'nowrap'} gap={isSm ? 16 : 20} mt={isSm ? 24 : 60}>
      <Box width={isSm ? '100%' : '60%'}>
        <ChartLayout title="Token proportion" option={pieOption} width={isSm ? 200 : 252} height={isSm ? 200 : 252} />
      </Box>
      <Box width={isSm ? '100%' : '40%'}>
        <ChartLayout title="Value Distribution" option={barOption} width={isSm ? 300 : 450} height={isSm ? 200 : 252} />
      </Box>
    </Stack>
  )
}
export default Charts
