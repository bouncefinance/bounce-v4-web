import { Box, Stack, Typography, styled } from '@mui/material'
import { getIcon } from 'pages/nftLottery/sections/tokenInformation/config'
import EmptyImg from 'assets/imgs/lpToken/empty.png'
import { RandomSelectionLPProps } from 'api/pool/type'
const InterLargeTitle = styled(Typography)`
  color: #000;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 25.601px; /* 160.009% */
  text-transform: capitalize;
`
const Icon1 = getIcon('AUCTION')
import Icon2 from 'assets/images/eth_logo.png'
import useBreakpoint from 'hooks/useBreakpoint'
import { useMemo } from 'react'
import { formatGroupNumber } from 'utils/number'

const PoolInformation = ({ poolInfo }: { poolInfo: RandomSelectionLPProps }) => {
  console.log('🚀 ~ PoolInformation ~ poolInfo:', poolInfo)
  const isSm = useBreakpoint('sm')
  return (
    <Stack
      spacing={24}
      gap={24}
      sx={{
        height: '100%',
        padding: isSm ? '40px 16px' : '40px 32px 64px 32px',
        borderRadius: 20,
        marginTop: isSm ? 32 : 0,
        background: '#F6F6F3'
      }}
    >
      <Stack flexDirection={'row'} gap={13}>
        <Stack
          sx={{
            width: 48,
            flexDirection: 'row',
            position: 'relative',
            img: {
              width: 32,
              height: 32
            }
          }}
        >
          <img
            src={Icon1 || ''}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 1
            }}
          />
          <img
            src={Icon2 || ''}
            style={{
              position: 'absolute',
              left: 16,
              top: 0,
              zIndex: 2
            }}
          />
        </Stack>
        <InterLargeTitle>SAVM/ETH Pool Information</InterLargeTitle>
      </Stack>
      {poolInfo.PoolTotal0Fees?.greaterThan('0') || poolInfo.PoolTotal1Fees?.greaterThan('0') ? (
        <DetailPanel poolInfo={poolInfo} />
      ) : (
        <EmptyPanel />
      )}
    </Stack>
  )
}
const WhiteCard = styled(Box)`
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  background: #fff;
`
const LabelTitle = styled(Typography)`
  color: var(--grey-01, #20201e);
  /* D/H5 */
  width: 100%;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`
const LargeValueTitle = styled(Typography)({
  color: 'var(--blue-d, #2B51DA)',
  leadingTrim: 'both',
  textEdge: 'cap',
  fontVariantNumeric: 'lining-nums proportional-nums',
  width: '100%',
  /* D/H2 */
  wordBreak: 'break-all',
  fontFamily: 'Inter',
  fontSize: 36,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '130%' /* 46.8px */,
  letterSpacing: '-0.72px'
})
const TokenNameTitle = styled(Typography)`
  color: var(--grey-01, #20201e);

  /* D/H4 */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.4px;
`

const DetailPanel = ({ poolInfo }: { poolInfo: RandomSelectionLPProps }) => {
  console.log('🚀 ~ DetailPanel ~ poolInfo:', poolInfo.token0Price?.toString())
  const poolTotalReward = useMemo(() => {
    if (poolInfo.PoolTotal0Fees && poolInfo.PoolTotal1Fees && poolInfo.token0Price && poolInfo.token1Price) {
      return poolInfo.token0Price
        .multipliedBy(poolInfo.PoolTotal0Fees.toExact())
        .plus(poolInfo.token1Price.multipliedBy(poolInfo.PoolTotal1Fees.toExact()))
    }
    return undefined
  }, [poolInfo.PoolTotal0Fees, poolInfo.PoolTotal1Fees, poolInfo.token0Price, poolInfo.token1Price])
  return (
    <Box pt={24}>
      <Stack flex={'grid'} gridTemplateColumns={'50% 50%'} flexDirection={'row'} gap={16}>
        <WhiteCard sx={{ width: '50%' }}>
          <LabelTitle sx={{ textAlign: 'center' }}>Pool Total Revenue Income</LabelTitle>
          <LargeValueTitle>
            $ {poolTotalReward ? formatGroupNumber(poolTotalReward.toNumber(), '', 2) : '--'}
          </LargeValueTitle>
        </WhiteCard>
        <WhiteCard sx={{ width: '50%' }}>
          <LabelTitle sx={{ textAlign: 'center' }}>Liquidity</LabelTitle>
          <LargeValueTitle color={'#121212 !important'}>$ 999939.11</LargeValueTitle>
        </WhiteCard>
      </Stack>
      <WhiteCard mt={16} sx={{ alignItems: 'start' }}>
        <LabelTitle>Total Tokens Earned</LabelTitle>
        <Stack gap={16} width={'100%'}>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignContent={'center'}>
            <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
              <img src={Icon1 || ''} style={{ width: 32, height: 32 }} />
              <TokenNameTitle>SAVM</TokenNameTitle>
            </Stack>
            <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
              <LabelTitle>{poolInfo.PoolTotal0Fees?.toSignificant(6)}</LabelTitle>
            </Stack>
          </Stack>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignContent={'center'}>
            <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
              <img src={Icon2 || ''} style={{ width: 32, height: 32 }} />
              <TokenNameTitle>ETH</TokenNameTitle>
            </Stack>
            <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
              <LabelTitle>{poolInfo.PoolTotal1Fees?.toSignificant(6)}</LabelTitle>
            </Stack>
          </Stack>
        </Stack>
      </WhiteCard>
    </Box>
  )
}
const EmptyPanel = () => {
  return (
    <Stack gap={32} pt={24} justifyContent={'center'} alignItems={'center'}>
      <img src={EmptyImg} style={{ width: '280.109px', height: '186.958px' }} />
      <Typography
        sx={{
          color: '#000',
          fontFamily: 'Poppins',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '25.601px' /* 160.009% */,
          textTransform: 'capitalize'
        }}
      >
        After the lottery is drawn, the detailed information of the pool will be displayed.
      </Typography>
    </Stack>
  )
}
export default PoolInformation
