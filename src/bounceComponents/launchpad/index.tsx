import React, { useRef, useEffect, useState } from 'react'
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
  overflow: 'hidden',
  '.img': {
    transition: 'all .6s'
  },
  '&:hover': {
    cursor: 'pointer',
    background: '#e1f25c',
    '.img': {
      transform: 'scale(1.15)'
    }
  },
  '.left': {
    transform: 'translate3D(-50%, 0, 0)',
    transition: 'all 0.6s',
    opacity: 0
  },
  '.right': {
    transform: 'translate3D(50%, 0, 0)',
    transition: 'all 0.6s',
    opacity: 0
  },
  '&.active': {
    '.left': {
      transform: 'translate3D(0, 0, 0)',
      opacity: 1
    },
    '.right': {
      transform: 'translate3D(0, 0, 0)',
      opacity: 1
    }
  },
  [theme.breakpoints.down('md')]: {
    width: 'calc(100vw - 32px)',
    height: 'auto',
    flexDirection: 'column',
    '.left': {
      transform: 'translate3D(0, -50%, 0)',
      transition: 'all 0.6s',
      opacity: 0
    },
    '.right': {
      transform: 'translate3D(0, 50%, 0)',
      transition: 'all 0.6s',
      opacity: 0
    }
  }
}))

export function Common({
  img,
  child,
  sx,
  poolTypeName,
  startAndEnd,
  onClick,
  keyId
}: {
  img: string
  child: React.ReactElement
  onClick?: () => void
  sx?: SxProps
  poolTypeName: string
  keyId?: number
  startAndEnd:
    | {
        start: number
        end: number
      }
    | undefined
}) {
  const isSm = useBreakpoint('sm')
  const isMd = useBreakpoint('md')
  const comEl = useRef<any>(null)
  const [winH, setWinHeight] = useState<number>(window.innerHeight)
  const [isEnter, setIsEnter] = useState(false)
  const resizeWinH = () => {
    setWinHeight(window.innerHeight)
  }
  useEffect(() => {
    const getScrollCount = () => {
      if (isEnter) return
      const typesOfAuctionTop = comEl?.current?.getBoundingClientRect().top
      console.log('typesOfAuctionTop>', typesOfAuctionTop)
      if (typesOfAuctionTop <= winH - 200) {
        setIsEnter(true)
      }
    }
    window.addEventListener('resize', resizeWinH)
    window.addEventListener('scroll', getScrollCount)
    return () => {
      window.removeEventListener('scroll', getScrollCount)
      window.removeEventListener('resize', resizeWinH)
    }
  }, [isEnter, winH])
  return (
    <CommonBg className={isEnter ? 'active' : ''} ref={comEl} sx={sx} onClick={onClick} position={'relative'}>
      {/* img section */}
      <Box className={'left'} sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'block',
            width: isSm ? '100%' : isMd ? 'calc(100vw - 32px)' : '600px',
            height: '100%',
            objectFit: 'cover',
            borderRadius: isMd ? '30px 30px 0 0' : '30px 0 0 30px',
            // height: isMd ? 350 : 400,
            overflow: 'hidden'
          }}
        >
          <img
            className={'img'}
            style={{
              display: 'block',
              width: isSm ? '100%' : isMd ? 'calc(100vw - 32px)' : '600px',
              objectFit: keyId === 6 || keyId === 7 ? 'initial' : 'cover',
              borderRadius: isMd ? '30px 30px 0 0' : '30px 0 0 30px',
              height: '100%'
            }}
            src={img}
          />
        </Box>
        <Stack
          spacing={isSm ? 5 : 10}
          direction={isSm ? 'column' : 'row'}
          sx={{
            position: 'absolute',
            '@media(max-width:600px)': {
              // padding: '0 16px',
              left: 24,
              top: 24
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
                fontFamily: 'Inter',
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
                fontFamily: 'Inter',
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
      {/* right content section */}
      <Box className={'right'} sx={{ width: '100%', height: '100%' }}>
        {child}
      </Box>
    </CommonBg>
  )
}
