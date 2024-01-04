import { Box, Stack, Typography, styled } from '@mui/material'
import DonutChart from 'components/DonutChart'
import { EChartsOption } from 'echarts/types/dist/echarts'
import { token1Info } from './header'
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
        background: 'linear-gradient(152deg, #26273B 10.68%, #363853 104.23%)',
        paddingBottom: 48,
        margin: '0 auto'
      }}
    >
      <Box sx={{ width: '100%', height: 82, borderBottom: '2px solid #4F4F4F' }}>
        <Box sx={{ padding: '28px 48px' }}>
          <Title>Token proportion</Title>
        </Box>
      </Box>
      <Box>
        <Box mt={32} mb={28}>
          <DonutChart option={option} size={{ width: 252, height: 252 }} />
        </Box>

        <Stack flexDirection={'row'} flexWrap={'wrap'} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr1 1fr' }}>
          {token1Info.map(i => (
            <Stack key={i.name} flexDirection={'row'} alignItems={'center'}>
              <Box sx={{ width: 12, height: 12, background: i.color, borderRadius: 12 }} />
              <WhiteP1 ml={12} mr={4}>
                {i.name}
              </WhiteP1>
              <img src={i.icon} style={{ width: 20, height: 20 }} />
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

const Charts = () => {
  return (
    <Stack flexDirection={'row'} gap={20}>
      <Box sx={{ flex: 1 }}>
        <ChartLayout />
      </Box>
      <Box sx={{ flex: 0.678 }}>
        <ChartLayout />
      </Box>
    </Stack>
  )
}
export default Charts
