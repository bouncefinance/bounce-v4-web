import React from 'react'
import { Box, Typography, styled } from '@mui/material'
// import Image from 'components/Image'

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  paddingBottom: '30px',
  position: 'relative',
  opacity: '0.3',
  '&:hover ': {
    opacity: '1'
  }
}))

export default function Card({
  children,
  name,
  idx,
  length,
  href,
  url,
  rotate
}: {
  idx: number
  length: number
  url?: string
  children?: React.ReactNode
  name?: string
  href?: string
  rotate?: string
}) {
  return (
    <a href={href} style={{ cursor: 'pointer' }}>
      <StyledBox
        gap={124}
        borderBottom={idx !== length - 1 ? '1px solid #737373' : 'none'}
        sx={{
          '&:hover div': {
            transition: '1s',
            transform: `translate(-100%,-40%) ${rotate} scale(0.9)`,
            opacity: '1'
          }
        }}
      >
        <Typography
          variant="lotteryh2"
          width={469}
          fontSize={100}
          fontWeight={500}
          lineHeight={'90%'}
          textTransform={'uppercase'}
          color={'#C3A16D'}
          zIndex={9}
          sx={{}}
        >
          {name}
        </Typography>
        <Typography
          flex={1}
          fontSize={20}
          fontWeight={400}
          lineHeight={'140%'}
          color={'var(--ai-white-70, rgba(255, 255, 255, 0.70))'}
        >
          {children}
        </Typography>
        <Typography
          variant="lotteryh1"
          position={'absolute'}
          top={0}
          color={'var(--AI-grey-02, #474543)'}
          fontSize={240}
          fontWeight={500}
          lineHeight={'90%'}
          textTransform={'uppercase'}
          sx={{
            transform: 'translateY(-35%) rotate(15.01deg)'
          }}
        >
          {idx + 1}
        </Typography>
        <Box
          sx={{
            width: '190px',
            height: '287px',
            background: `url(${url})`,
            position: 'absolute',
            top: '0',
            left: '40%',
            transform: 'translate(-100%,-40%) scale(0.5)',
            zIndex: '10',
            opacity: '0'
          }}
        ></Box>
      </StyledBox>
    </a>
  )
}
