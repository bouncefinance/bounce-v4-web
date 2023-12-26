import { Box, Typography } from '@mui/material'
import AnimatedNumber from 'react-animated-numbers'

export default function animatedNumber({
  days,
  hours,
  minutes,
  seconds,
  fontSize
}: {
  days: number
  hours: number
  minutes: number
  seconds: number
  fontSize?: number
}) {
  return (
    <Typography
      variant="lotteryh1"
      display={'flex'}
      flexWrap={'wrap'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        fontSize: fontSize,
        textAlign: 'center',
        fontWeight: 500,
        textTransform: 'uppercase',
        fontVariantNumeric: 'lining-nums proportional-nums'
      }}
    >
      {days ? (
        <>
          {Math.floor((days % 10000) / 1000) ? (
            <AnimatedNumber
              animateToNumber={Math.floor((days % 10000) / 1000)}
              transitions={index => ({
                type: 'spring',
                duration: index + 0.5
              })}
            ></AnimatedNumber>
          ) : null}
          {Math.floor((days % 1000) / 100) ? (
            <AnimatedNumber
              animateToNumber={Math.floor((days % 1000) / 100)}
              transitions={index => ({
                type: 'spring',
                duration: index + 0.5
              })}
            ></AnimatedNumber>
          ) : null}
          {Math.floor((days % 100) / 10) ? (
            <AnimatedNumber
              animateToNumber={Math.floor((days % 100) / 10)}
              transitions={index => ({
                type: 'spring',
                duration: index + 0.5
              })}
            ></AnimatedNumber>
          ) : null}
          <AnimatedNumber
            animateToNumber={days % 10}
            transitions={index => ({
              type: 'spring',
              duration: index + 0.2
            })}
          ></AnimatedNumber>
          <Box whiteSpace={'pre'}>D : </Box>
        </>
      ) : null}
      <AnimatedNumber
        animateToNumber={Math.floor((hours % 100) / 10)}
        transitions={index => ({
          type: 'spring',
          duration: index + 0.5
        })}
      ></AnimatedNumber>
      <AnimatedNumber
        animateToNumber={hours % 10}
        transitions={index => ({
          type: 'spring',
          duration: index + 0.2
        })}
      ></AnimatedNumber>
      <Box whiteSpace={'pre'}>H : </Box>
      <AnimatedNumber
        animateToNumber={Math.floor((minutes % 100) / 10)}
        transitions={index => ({
          type: 'spring',
          duration: index + 0.5
        })}
      ></AnimatedNumber>
      <AnimatedNumber
        animateToNumber={minutes % 10}
        transitions={index => ({
          type: 'spring',
          duration: index + 0.2
        })}
      ></AnimatedNumber>
      <Box whiteSpace={'pre'}>M : </Box>
      <AnimatedNumber
        animateToNumber={Math.floor((seconds % 100) / 10)}
        transitions={index => ({
          type: 'spring',
          duration: index + 0.5
        })}
      ></AnimatedNumber>
      <AnimatedNumber
        animateToNumber={seconds % 10}
        transitions={index => ({
          type: 'spring',
          duration: index + 0.2
        })}
      ></AnimatedNumber>
      S
    </Typography>
  )
}
