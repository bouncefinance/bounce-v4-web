import { Typography, styled, Box, Stack } from '@mui/material'
import DonutChart from 'components/DonutChart'
import Icon1 from 'assets/imgs/nftLottery/tokenInformation/token-icon1.svg'
import Icon2 from 'assets/imgs/nftLottery/tokenInformation/token-icon2.svg'
import Icon3 from 'assets/imgs/nftLottery/tokenInformation/token-icon3.svg'
import Icon4 from 'assets/imgs/nftLottery/tokenInformation/token-icon4.svg'
import Icon5 from 'assets/imgs/nftLottery/tokenInformation/token-icon5.png'
import { EChartsOption } from 'echarts/types/dist/echarts'
const InfoP1 = styled(Typography)`
  color: var(--AI-dark-02, #4c483a);
  font-variant-numeric: lining-nums proportional-nums;
  /* AI/D/H5 */
  font-family: Cormorant SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 90%; /* 16.2px */
  text-transform: uppercase;
`
const InfoP2 = styled(Typography)`
  color: var(--black-100, #121212);

  /* D/H5 */
  font-family: Public Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`
const InfoP3 = styled(Typography)`
  color: #a57d24;

  /* AI/D/body 03 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 22.4px */
`
const TokenBg = styled(Box)`
  display: flex;
  padding: 12px 10px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: #efebe6;
`
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: #a4a79f;
`
const Circle = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 10px;
`
const tokenInfoList = [
  {
    price: 10,
    name: 'AUCTION',
    icon: Icon1,
    color: '#CCC496'
  },
  {
    price: 20,
    name: 'MUBI',
    icon: Icon2,
    color: '#DBAC48'
  },
  {
    price: 20,
    name: 'DAII',
    icon: Icon3,
    color: '#AB883C'
  },
  {
    price: 20,
    name: 'BSSB',
    icon: Icon4,
    color: '#9E9871'
  },
  {
    price: 20,
    name: 'AMMX',
    icon: Icon5,
    color: '#614C1F'
  }
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
      radius: ['44%', '84%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'inside',
        formatter: '{d}',
        color: '#fff',
        fontFamily: 'Public Sans',
        fontWeight: 400,
        lineHeight: 1.5
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 25, name: 'AUCTION', itemStyle: { color: '#CCC496' } },
        { value: 12, name: 'DAII', itemStyle: { color: '#AB883C' } },
        { value: 13, name: 'AMMX', itemStyle: { color: '#614C1F' } },
        { value: 25, name: 'MUBI', itemStyle: { color: '#DBAC48' } },
        { value: 25, name: 'BSSB', itemStyle: { color: '#9E9871' } }
      ]
    }
  ]
}

const ChartInfo = () => {
  return (
    <Box>
      <Box>
        <InfoP1>1 Lottery = </InfoP1>
        <Box mt={16}>
          <Stack flexDirection={'row'} flexWrap={'wrap'} gap={7} sx={{ width: 370 }}>
            {tokenInfoList.map(i => (
              <TokenBg key={i.name}>
                <InfoP2>{i.price}</InfoP2>
                <img src={i.icon} style={{ width: 20, height: 20 }} />
                <InfoP2>{i.name}</InfoP2>
              </TokenBg>
            ))}
          </Stack>
        </Box>
      </Box>
      <Line mt={32} mb={48} />
      <Box>
        <InfoP1>Invest Tokens/Lottery </InfoP1>
        <Stack flexDirection={'row'} gap={64} alignItems={'center'} mt={40}>
          <DonutChart option={option} size={{ width: 252, height: 252 }} />
          <Stack gap={20} height={'fit-content'}>
            {tokenInfoList.map(i => (
              <Stack key={i.name} flexDirection={'row'} alignItems={'center'}>
                <Circle sx={{ background: i.color }} />
                <InfoP3 ml={12} mr={4}>
                  {i.name}
                </InfoP3>
                <img src={i.icon} style={{ width: 24, height: 24 }} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
export default ChartInfo
