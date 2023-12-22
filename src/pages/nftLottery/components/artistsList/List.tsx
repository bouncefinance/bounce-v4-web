import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import Image from 'components/Image'

const StyledBox = styled(Box)(() => ({
  position: 'relative',
  '&:hover #textBox': {
    opacity: '1'
  },
  '&:hover #moveLine': {
    width: '100%',
    opacity: '1'
  }
}))

export default function ArtistsList({
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
        sx={{
          '&:hover #imgBox': {
            transform: `translate(0,-40%) ${rotate} scale(0.9)`,
            opacity: '1'
          }
        }}
      >
        {/* 文字内容 */}
        <Box
          id={'textBox'}
          display={'flex'}
          marginBottom={30}
          gap={124}
          position={'relative'}
          sx={{
            transition: '1s',
            opacity: '0.3'
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
          {/* 数字 */}
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
        </Box>
        {/* 图片 */}
        <Box
          id={'imgBox'}
          sx={{
            width: '190px',
            height: '287px',
            background: `url(${url})`,
            position: 'absolute',
            top: '0',
            left: '370px',
            transform: 'translate(0,-40%) scale(0.5)',
            zIndex: '10',
            opacity: '0',
            transition: '1.5s'
          }}
        ></Box>
        {/* 线 */}
        {idx + 1 < length ? (
          <Box width={'100%'} height={'1px'} position={'relative'}>
            <Box width={'100%'} height={'1px'} bgcolor={'#737373'}></Box>
            <Box
              id={'moveLine'}
              width={0}
              height={'1px'}
              bgcolor={'#fff'}
              position={'absolute'}
              top={0}
              left={0}
              zIndex={1}
              sx={{ transition: '1s' }}
            ></Box>
          </Box>
        ) : null}
      </StyledBox>
    </a>
  )
}

export function ArtistsListApp({
  children,
  name,
  idx,
  href,
  url,
  rotate
}: {
  idx: number
  url?: string
  children?: React.ReactNode
  name?: string
  href?: string
  rotate?: string
}) {
  return (
    <a href={href} style={{ cursor: 'pointer' }}>
      <Box position={'relative'}>
        <Box display={'flex'} alignItems={'center'} gap={5}>
          <Typography
            variant="lotteryh1"
            color={'var(--AI-grey-02, #474543)'}
            fontSize={56}
            fontWeight={500}
            lineHeight={'90%'}
            textTransform={'uppercase'}
            sx={{
              transform: 'rotate(15.01deg)'
            }}
          >
            {idx + 1}
          </Typography>
          <Typography
            variant="lotteryh2"
            paddingTop={10}
            fontSize={28}
            fontWeight={500}
            lineHeight={'90%'}
            textTransform={'uppercase'}
            color={'#C3A16D'}
            zIndex={9}
          >
            {name}
          </Typography>
        </Box>

        <Typography
          marginTop={12}
          fontSize={17}
          fontWeight={400}
          lineHeight={'140%'}
          color={'var(--ai-white-70, rgba(255, 255, 255, 0.70))'}
        >
          {children}
        </Typography>
        <Image
          src={url ? url : ''}
          style={{
            width: '70px',
            position: 'absolute',
            top: '0',
            right: '0',
            transform: `translate(20%,-45%) ${rotate}`,
            zIndex: '10'
          }}
        ></Image>
      </Box>
    </a>
  )
}
