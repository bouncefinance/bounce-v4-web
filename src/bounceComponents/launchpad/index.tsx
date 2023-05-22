import React from 'react'
import { Box, Stack, styled, SxProps } from '@mui/material'
// import Temp1 from 'assets/imgs/auction/1.png'
// import Temp2 from 'assets/imgs/auction/3.png'

const CommonBg = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 1320px;
  height: 400px;
  background: #20201e;
  border-radius: 30px;

  :hover {
    cursor: pointer;
  }
`

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
  onClick: () => void
  sx?: SxProps
  poolTypeName: string
  startAndEnd:
    | {
        start: number
        end: number
      }
    | undefined
}) {
  return (
    <CommonBg sx={sx} mb={24} onClick={onClick} position={'relative'}>
      <img style={{ width: '600px', backgroundSize: 'cover', borderRadius: '30px 0 0 30px' }} src={img} />
      <Box sx={{ width: '100%', height: '100%' }}>{child}</Box>
      <Stack
        spacing={10}
        direction={'row'}
        sx={{
          position: 'absolute',
          left: 24,
          top: 24
        }}
      >
        {poolTypeName && (
          <Box
            padding="5px 14px"
            color="#B5E629"
            sx={{
              fontFamily: 'Public Sans',
              background: 'rgba(18, 18, 18, 0.6)',
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
              background: 'rgba(18, 18, 18, 0.6)',
              backdropFilter: 'blur(5px)',
              borderRadius: '100px'
            }}
          >
            {new Date(startAndEnd.start).toLocaleString() + ' - ' + new Date(startAndEnd.end).toLocaleString()}
          </Box>
        )}
      </Stack>
    </CommonBg>
  )
}
