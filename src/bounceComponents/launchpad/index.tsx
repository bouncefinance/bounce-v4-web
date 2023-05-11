import React from 'react'
import { Box, styled, SxProps } from '@mui/material'
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
  onClick
}: {
  img: string
  child: React.ReactElement
  onClick: () => void
  sx?: SxProps
}) {
  return (
    <CommonBg sx={sx} mb={24} onClick={onClick}>
      <img style={{ width: '600px', backgroundSize: 'cover', borderRadius: '30px 0 0 30px' }} src={img} />
      <Box sx={{ width: '100%', height: '100%' }}>{child}</Box>
    </CommonBg>
  )
}
