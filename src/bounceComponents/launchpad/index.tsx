import React from 'react'
import { Box, Stack, styled, SxProps } from '@mui/material'
import useBreakpoint from 'hooks/useBreakpoint'

// import Temp1 from 'assets/imgs/auction/1.png'
// import Temp2 from 'assets/imgs/auction/3.png'

const CommonBg = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: '1320px',
  height: '400px',
  background: '#e8e9e4',
  borderRadius: '30px',
  '&:hover': {
    cursor: 'pointer',
    background: '#e1f25c'
  },
  [theme.breakpoints.down('md')]: {
    width: 'calc(100vw - 32px)',
    height: 'auto',
    flexDirection: 'column'
  }
}))

export function Common({
  img,
  child,
  sx,
  poolTypeName,
  startAndEnd,
  onClick
}: {
  img: string
  child: React.ReactElement
  onClick?: () => void
  sx?: SxProps
  poolTypeName: string
  startAndEnd:
    | {
        start: number
        end: number
      }
    | undefined
}) {
  const isSm = useBreakpoint('sm')
  const isMd = useBreakpoint('md')
  return (
    <CommonBg sx={sx} onClick={onClick} position={'relative'}>
      <Box sx={{ position: 'relative' }}>
        <img
          style={{
            width: isSm ? '100%' : isMd ? 'calc(100vw - 32px)' : '600px',
            objectFit: 'cover',
            borderRadius: isMd ? '30px 30px 0 0' : '30px 0 0 30px',
            height: isMd ? 350 : 400
          }}
          src={img}
        />
        <Stack
          spacing={isSm ? 5 : 10}
          direction={isSm ? 'column' : 'row'}
          sx={{
            position: 'absolute',
            '@media(max-width:600px)': {
              left: 0,
              padding: '0 16px',
              top: 5
            },
            '@media(min-width:600px)': {
              left: 24,
              top: 24
            }
          }}
        >
          {poolTypeName && (
            <Box
              padding="5px 14px"
              color="#B5E629"
              sx={{
                width: 'max-content',
                fontFamily: 'Public Sans',
                background: 'rgba(18, 18, 18, 0.5)',
                backdropFilter: 'blur(5px)',
                borderRadius: '100px'
              }}
            >
              {poolTypeName}
            </Box>
          )}
          {startAndEnd && (
            <Box
              padding="5px 14px"
              color="#B5E629"
              sx={{
                fontFamily: 'Public Sans',
                background: 'rgba(18, 18, 18, 0.5)',
                backdropFilter: 'blur(5px)',
                borderRadius: '100px'
              }}
            >
              {new Date(startAndEnd.start).toLocaleString() + ' - ' + new Date(startAndEnd.end).toLocaleString()}
            </Box>
          )}
        </Stack>
      </Box>

      <Box sx={{ width: '100%', height: '100%' }}>{child}</Box>
    </CommonBg>
  )
}
