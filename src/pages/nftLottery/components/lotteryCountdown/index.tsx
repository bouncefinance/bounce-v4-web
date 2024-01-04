import { Box, Typography } from '@mui/material'
import useBreakpoint from 'hooks/useBreakpoint'
import { useCountDown } from 'ahooks'
// import AnimatedNumber from './animatedNumber'
import P6Img from 'assets/imgs/nftLottery/p6.png'
import P7Img from 'assets/imgs/nftLottery/p7.png'
import { RandomPoolStatus, RandomSelectionNFTProps } from 'api/pool/type'
import { ReactComponent as Tick } from 'assets/imgs/nftLottery/tick.svg'
import dayjs from 'dayjs'
import Image from 'components/Image'
import { useEffect, useState } from 'react'

function StepperBox({ activeStep, timeList, isSm }: { activeStep: number; timeList: number[]; isSm: boolean }) {
  console.log('🚀 ~ file: index.tsx:13 ~ StepperBox ~ isSm:', isSm)
  const stepName = ['PARTICIPATION', 'LOTTERY DRAWING', 'ANNOUNCEMENT OF WINNERS']
  return isSm ? (
    <Box width={'100%'} sx={{ position: 'relative' }}>
      {timeList.map((time, index) => (
        <Box key={index} display={'flex'} gap={16}>
          <Box width={30} display={'flex'} flexDirection={'column'} alignItems={'center'}>
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
            <Box
              height={index === timeList.length - 1 ? 0 : 40}
              width={4}
              borderRadius={'4px'}
              bgcolor={activeStep > index ? 'var(--AI-black, #0F0F0F)' : 'var(--gray-03, #959595)'}
            ></Box>
          </Box>
          <Box>
            <Typography
              variant="lotteryh1"
              fontSize={activeStep > index ? 18 : 16}
              lineHeight={'130%'}
              fontWeight={700}
              color={activeStep > index ? 'var(--black-100, #121212)' : 'var(--gray-03, var(--gray-03, #959595))'}
            >
              {stepName[index]}
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
      <Image
        src={P6Img}
        style={{
          position: 'absolute',
          top: '-212%',
          width: 110,
          height: 73,
          right: '-14%'
        }}
      />
      <Image
        src={P7Img}
        style={{
          position: 'absolute',
          top: '-159%',
          width: 110,
          height: 86,
          left: '-19%'
        }}
      />
    </Box>
  ) : (
    <Box display={'flex'} alignItems={'flex-end'}>
      {timeList.map((time, index) => (
        <Box key={index}>
          <Typography
            variant="lotteryh1"
            fontSize={activeStep > index ? 32 : 18}
            lineHeight={'90%'}
            fontWeight={700}
            color={activeStep > index ? 'var(--black-100, #121212)' : 'var(--gray-03, var(--gray-03, #959595))'}
          >
            {stepName[index]}
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
          <Box height={32} display={'flex'} alignItems={'center'}>
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

export default function Countdown({
  status,
  timeList,
  poolInfo
}: {
  status: RandomPoolStatus
  timeList?: number[]
  poolInfo: RandomSelectionNFTProps
}) {
  const now = () => new Date().getTime()
  const [startTime, setStartTime] = useState<number>(0)
  const [refresh, setRefresh] = useState(false)
  const isSm = useBreakpoint('sm')
  if (!timeList) {
    timeList = [1703127600, 1703127600, 1703127600]
  }
  useEffect(() => {
    if (now() < poolInfo.openAt * 1000) {
      setStartTime(poolInfo.openAt)
    }
    if (now() > poolInfo.openAt * 1000 && now() < poolInfo.closeAt * 1000) {
      setStartTime(poolInfo.closeAt)
    }
    if (now() > poolInfo.claimAt * 1000) {
      setStartTime(poolInfo.claimAt)
    }
  }, [poolInfo.claimAt, poolInfo.closeAt, poolInfo.openAt, refresh])

  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: startTime ? startTime * 1000 : 0,
    onEnd() {
      setRefresh(!refresh)
    }
  })
  const handleActiveStep = (timeList: number[]) => {
    if (now() < timeList[0] * 1000 || (now() > timeList[0] * 1000 && now() < timeList[1] * 1000)) {
      return 1
    }
    if (now() > timeList[1] * 1000 && now() < timeList[2] * 1000) {
      return 2
    }
    if (now() > timeList[2] * 1000) {
      return 3
    }
    return 0
  }

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} padding={isSm ? '0 16px' : '0'}>
      <Typography
        variant="lotteryh1"
        fontSize={isSm ? 18 : 32}
        lineHeight={isSm ? '130%' : '90%'}
        fontWeight={700}
        color={'var(--AI-brown-dark, #8B6D3F)'}
      >
        NFT AUCTION
      </Typography>
      <Box margin={isSm ? '8px 0 48px' : '32px 0 80px'}>
        {countdown ? (
          <Box color={status === RandomPoolStatus.Upcoming ? '#C3A16D' : 'var(--AI-green, #76BA1E)'}>
            <Typography
              variant="lotteryh1"
              fontSize={isSm ? 50 : 100}
              lineHeight={'90%'}
              fontWeight={500}
              textAlign={'center'}
            >
              {status === RandomPoolStatus.Upcoming && 'UPCOMING IN'}
              {status === RandomPoolStatus.Live && 'LIVE'}
            </Typography>
            <Typography
              variant="lotteryh1"
              fontSize={isSm ? 50 : 100}
              lineHeight={'90%'}
              fontWeight={500}
              textAlign={'center'}
            >
              {days ? days + 'D : ' : null}
              {hours}H : {minutes}M : {seconds}S
            </Typography>
            {/* <AnimatedNumber hours={hours} minutes={minutes} seconds={seconds} fontSize={isSm ? 50 : 100} /> */}
          </Box>
        ) : (
          <Typography
            variant="lotteryh1"
            fontSize={isSm ? 50 : 100}
            lineHeight={'90%'}
            fontWeight={500}
            color={'var(--AI-red, #F00)'}
          >
            CLOSED
          </Typography>
        )}
      </Box>
      <StepperBox activeStep={handleActiveStep(timeList)} timeList={timeList} isSm={isSm} />
      <Typography
        maxWidth={isSm ? 328 : 800}
        margin={isSm ? '48px 0' : '120px 0'}
        fontSize={isSm ? 17 : 20}
        lineHeight={'140%'}
        fontWeight={400}
        color={'var(--AI-dark-02, #4C483A)'}
        textAlign={'center'}
      >
        {`The “AI Meets Bitcoin” Auction features the first-ever AI-generated NFT collection on Bitcoin, with 450
            exquisite artworks co-created by three top artists: Charlesai, 0009, and RedruM. This collection represents
            a pioneering fusion of artificial intelligence, art and the Bitcoin ecosystem. Each of the featured artworks
            gain a unique identity and narrative, permanently inscribed on the Bitcoin network, guaranteeing their
            endurance and legacy.`}
      </Typography>
    </Box>
  )
}
