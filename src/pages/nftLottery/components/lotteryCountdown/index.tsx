import { Box, Typography } from '@mui/material'
import useBreakpoint from 'hooks/useBreakpoint'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
import { ReactComponent as Tick } from 'assets/imgs/nftLottery/tick.svg'
import dayjs from 'dayjs'

// 进度条
function StepperBox({ activeStep, timeList, isSm }: { activeStep: number; timeList: any[]; isSm: boolean }) {
  return isSm ? (
    <Box>
      {timeList.map(({ name, time }, index) => (
        <Box key={index} display={'flex'} gap={16}>
          {/* 进度 */}
          <Box width={30} display={'flex'} flexDirection={'column'} alignItems={'center'}>
            {/* 图标 */}
            <Box
              width={activeStep > index ? 30 : 20}
              height={activeStep > index ? 30 : 20}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={'50%'}
              bgcolor={activeStep > index ? 'var(--AI-black, #0F0F0F)' : 'var(--gray-03, #959595)'}
            >
              {activeStep > index ? <Tick width={15} /> : <Tick width={12} />}
            </Box>
            {/* 线 */}
            <Box
              height={index === timeList.length - 1 ? 0 : 40}
              width={4}
              borderRadius={'4px'}
              bgcolor={activeStep > index ? 'var(--AI-black, #0F0F0F)' : 'var(--gray-03, #959595)'}
            ></Box>
          </Box>
          {/* 文字 */}
          <Box>
            <Typography
              variant="lotteryh1"
              fontSize={activeStep > index ? 18 : 16}
              lineHeight={'90%'}
              fontWeight={700}
              color={activeStep > index ? 'var(--black-100, #121212)' : 'var(--gray-03, var(--gray-03, #959595))'}
            >
              {name}
            </Typography>
            <Typography
              marginTop={3}
              fontSize={12}
              lineHeight={'140%'}
              fontWeight={400}
              color={'var(--gray-03, var(--gray-03, #959595))'}
            >
              {dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  ) : (
    <Box display={'flex'} alignItems={'flex-end'}>
      {timeList.map(({ name, time }, index) => (
        <Box key={index}>
          {/* 文字 */}
          <Typography
            variant="lotteryh1"
            fontSize={activeStep > index ? 32 : 18}
            lineHeight={'90%'}
            fontWeight={700}
            color={activeStep > index ? 'var(--black-100, #121212)' : 'var(--gray-03, var(--gray-03, #959595))'}
          >
            {name}
          </Typography>
          <Typography
            margin={'3px 0 16px'}
            fontSize={activeStep > index ? 16 : 12}
            lineHeight={'140%'}
            fontWeight={400}
            color={'var(--gray-03, var(--gray-03, #959595))'}
          >
            {dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')}
          </Typography>
          {/* 进度 */}
          <Box height={32} display={'flex'} alignItems={'center'}>
            {/* 图标 */}
            <Box
              width={activeStep > index ? 36 : 23}
              height={activeStep > index ? 32 : 20}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={'50%'}
              bgcolor={activeStep > index ? 'var(--AI-black, #0F0F0F)' : 'var(--gray-03, #959595)'}
            >
              {activeStep > index ? <Tick /> : <Tick width={12} />}
            </Box>
            {/* 线 */}
            <Box
              width={'100%'}
              minWidth={activeStep > index ? 300 : 257}
              height={4}
              borderRadius={'4px'}
              marginTop={4}
              bgcolor={activeStep > index ? 'var(--AI-black, #0F0F0F)' : 'var(--gray-03, #959595)'}
            ></Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

/* 
status:抽奖状态
startTime:状态持续时间
timeList:各阶段名称及时间
*/
export default function Countdown({
  status,
  startTime,
  timeList
}: {
  status: PoolStatus
  startTime: number
  timeList?: any[]
}) {
  const isSm = useBreakpoint('sm')
  if (!timeList) {
    timeList = [
      { name: 'PARTICIPATION', time: 170312760 },
      { name: 'LOTTERY DRAWING', time: 170312760 },
      { name: 'ANNOUNCEMENT OF WINNERS', time: 170312760 }
    ]
  }
  const [countdown, { hours, minutes, seconds }] = useCountDown({
    targetDate: startTime * 1000
  })
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      {/* 小标题 */}
      <Typography
        variant="lotteryh1"
        fontSize={isSm ? 18 : 32}
        lineHeight={isSm ? '130%' : '90%'}
        fontWeight={700}
        color={'var(--AI-brown-dark, #8B6D3F)'}
      >
        NFT AUCTION
      </Typography>
      {/* 时间 */}
      <Box margin={isSm ? '8px 0 48px' : '32px 0 80px'}>
        {countdown ? (
          <Box color={status === 1 ? '#C3A16D' : 'var(--AI-green, #76BA1E)'}>
            <Typography
              variant="lotteryh1"
              fontSize={isSm ? 50 : 100}
              lineHeight={'90%'}
              fontWeight={500}
              textAlign={'center'}
            >
              {status === PoolStatus.Upcoming && 'UPCOMING IN'}
              {status === PoolStatus.Live && 'LIVE'}
            </Typography>
            <Typography
              variant="lotteryh1"
              fontSize={isSm ? 50 : 100}
              lineHeight={'90%'}
              fontWeight={500}
              textAlign={'center'}
            >
              {hours}H : {minutes}M : {seconds}S
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="lotteryh1"
            fontSize={isSm ? 50 : 100}
            lineHeight={'90%'}
            fontWeight={500}
            color={'var(--AI-red, #F00)'}
          >
            {status === PoolStatus.Closed ? 'CLOSED' : null}
          </Typography>
        )}
      </Box>
      {/* 进度 */}
      <StepperBox
        activeStep={status === PoolStatus.Upcoming ? 1 : status === PoolStatus.Live ? 2 : 3}
        timeList={timeList}
        isSm={isSm}
      />
      {/* 底部文字 */}
      <Typography
        maxWidth={isSm ? 328 : 800}
        marginTop={isSm ? 48 : 120}
        fontSize={isSm ? 17 : 20}
        lineHeight={'140%'}
        fontWeight={400}
        color={'var(--AI-dark-02, #4C483A)'}
        textAlign={'center'}
      >
        Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and
        transparent environment for the auction process. The use of blockchain technology also allows for the automatic
        execution of the auction rules and the issuance of tokens to the winning bidders.
      </Typography>
    </Box>
  )
}
