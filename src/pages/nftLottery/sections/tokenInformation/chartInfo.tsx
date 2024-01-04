import { Typography, styled, Box, Stack } from '@mui/material'
import DonutChart from 'components/DonutChart'
import { getIcon, colorList } from './config'
import Icon1 from 'assets/imgs/nftLottery/tokenInformation/token-icon1.svg'
import Icon2 from 'assets/imgs/nftLottery/tokenInformation/token-icon2.svg'
import Icon3 from 'assets/imgs/nftLottery/tokenInformation/token-icon3.svg'
import Icon4 from 'assets/imgs/nftLottery/tokenInformation/token-icon4.svg'
import Icon5 from 'assets/imgs/nftLottery/tokenInformation/token-icon5.png'
import { EChartsOption } from 'echarts/types/dist/echarts'
import useBreakpoint from 'hooks/useBreakpoint'
import { RandomSelectionNFTProps } from 'api/pool/type'
import { CurrencyAmount } from 'constants/token'
import BigNumber from 'bignumber.js'
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
const InfoP4 = styled('span')`
  color: var(--AI-dark-01, var(--AI-black-02, #3d3a32));

  /* D/H4 */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.4px;
`
const TokenBg = styled(Box)`
  display: flex;
  padding: 12px 10px;
  flex-direction: row;
  align-items: center;
  gap: 7px;
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
export const tokenInfoList = [
  {
    price: 0.35,
    name: 'AUCTION',
    icon: Icon1,
    color: '#CCC496'
  },
  {
    price: 43,
    name: 'MUBI',
    icon: Icon2,
    color: '#DBAC48'
  },
  {
    price: 10,
    name: 'DAII',
    icon: Icon3,
    color: '#AB883C'
  },
  {
    price: 2.38,
    name: 'BSSB',
    icon: Icon4,
    color: '#9E9871'
  },
  {
    price: 2500,
    name: 'AMMX',
    icon: Icon5,
    color: '#614C1F'
  }
]
const ChartInfo = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  console.log(
    '🚀 ~ file: chartInfo.tsx:107 ~ ChartInfo ~ poolInfo:',
    poolInfo.burnedTokens[4].toString(),
    poolInfo.burnedTokens[0].toString(),
    poolInfo.burnedTokens[1].toString()
  )
  const isSm = useBreakpoint('sm')

  const wrapperData = poolInfo.betTokenAmount.map((item, index) => {
    const value = new BigNumber(new BigNumber(poolInfo.burnedTokens?.[index].toString())).dividedBy(
      new BigNumber(item.toString())
    )
    const result = {
      value: value.toNumber(),
      amount: Number(
        CurrencyAmount.fromRawAmount(poolInfo.token1Currency[index], poolInfo.burnedTokens[index]).toExact()
      ),
      price: Number(
        CurrencyAmount.fromRawAmount(poolInfo.token1Currency[index], poolInfo.betTokenAmount[index]).toSignificant(6)
      ),
      itemStyle: { color: colorList[index] },
      name: poolInfo.token1Currency?.[index].symbol,
      color: colorList[index],
      icon: getIcon(poolInfo.token1Currency?.[index].symbol)
    }
    return result
  })
  console.log('🚀 ~ file: chartInfo.tsx:126 ~ wrapperData ~ wrapperData:', wrapperData)
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      position: 'inside',
      formatter: function (parms: any) {
        const str =
          parms.seriesName +
          '</br>' +
          parms.data.name +
          '：' +
          parms.data.amount +
          '</br>' +
          'percent：' +
          parms.percent +
          '%'
        return str
      }
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
        data: wrapperData
      }
    ]
  }
  return (
    <Box>
      {!isSm && (
        <>
          <Box>
            <InfoP1>
              1 Lottery <InfoP4> = </InfoP4>
            </InfoP1>
            <Box mt={16}>
              <Stack flexDirection={'row'} flexWrap={'wrap'} gap={10} sx={{ width: 370 }}>
                {wrapperData.slice(0, poolInfo.burnedTokens.length).map(i => (
                  <TokenBg key={i.name}>
                    <InfoP2>{i.price}</InfoP2>
                    {i.icon && <img src={i.icon} style={{ width: 20, height: 20 }} />}
                    <InfoP2>{i.name}</InfoP2>
                  </TokenBg>
                ))}
              </Stack>
            </Box>
          </Box>
          <Line mt={32} mb={48} />
        </>
      )}
      <Box mb={isSm ? 0 : 57}>
        <InfoP1>Invest Tokens/Lottery </InfoP1>
        <Stack flexDirection={isSm ? 'column' : 'row'} gap={isSm ? 24 : 64} alignItems={'center'} mt={40}>
          <DonutChart option={option} size={{ width: 252, height: 252 }} />
          <Stack
            gap={20}
            height={'fit-content'}
            width={'100%'}
            flexDirection={isSm ? 'row' : 'column'}
            flexWrap={'wrap'}
          >
            {wrapperData.slice(0, poolInfo.burnedTokens.length).map(i => (
              <Stack key={i.name} flexDirection={'row'} alignItems={'center'}>
                <Circle sx={{ background: i.color }} />
                <InfoP3 ml={12} mr={4}>
                  {i.name}
                </InfoP3>
                {i.icon && <img src={i.icon} style={{ width: 24, height: 24 }} />}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
export default ChartInfo
