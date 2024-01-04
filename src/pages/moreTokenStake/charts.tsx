import { Box, Typography, styled } from '@mui/material'
import DonutChart from 'components/DonutChart'
import { EChartsOption } from 'echarts/types/dist/echarts'

const Title = styled(Typography)`
  color: var(--white, #fff);

  /* D/H4 */
  font-family: Public Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.4px;
`
const data = [
  { name: 'AUCTION', value: 100, itemStyle: { color: '#7966E7' } },
  { name: 'MUBI', value: 100, itemStyle: { color: '#90BE6D' } },
  { name: 'DAII', value: 100, itemStyle: { color: '#3F90FF' } },
  { name: 'BSSB', value: 100, itemStyle: { color: '#0BFFDA' } },
  { name: 'AMMX', value: 100, itemStyle: { color: '#51DCF6' } }
]
const option: EChartsOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    top: 'center',
    right: '0%',
    show: false
  },
  series: [
    {
      name: 'Invest Tokens/Lottery',
      type: 'pie',
      radius: ['50%', '95%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'inside',
        formatter: `{d}%`,
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
const ChartLayout = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 16,
        background: 'linear-gradient(152deg, #26273B 10.68%, #363853 104.23%)'
      }}
    >
      <Box sx={{ width: '100%', height: 82, borderBottom: '2px solid #4F4F4F' }}>
        <Box sx={{ padding: '28px 48px' }}>
          <Title>Token proportion</Title>
        </Box>
      </Box>
      <Box>
        <DonutChart option={option} size={{ width: 252, height: 252 }} />
      </Box>
    </Box>
  )
}

const Charts = () => {
  return (
    <Box>
      <ChartLayout />
    </Box>
  )
}
export default Charts
