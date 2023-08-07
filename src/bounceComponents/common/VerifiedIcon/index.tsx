import { Box, SxProps } from '@mui/material'
import React from 'react'
import Image from 'components/Image'
import Tooltip from '../Tooltip'
import { VerifyStatus } from 'api/profile/type'
import VerifiedSVG from 'assets/imgs/profile/verify.svg'
// import NoVerifySVG from 'assets/imgs/profile/no-verify.svg'

export interface IVerifiedIconProps {
  ifKyc: VerifyStatus
  width?: number
  height?: number
  sx?: SxProps
}

const VerifiedIcon: React.FC<IVerifiedIconProps> = ({ ifKyc, width = 20, height = 20, sx }) => {
  return (
    <Box sx={sx}>
      {ifKyc === VerifyStatus.Verified && (
        <Tooltip title="Bounce Verification">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image alt="" src={VerifiedSVG} width={width} height={height} />
          </Box>
        </Tooltip>
      )}
    </Box>
  )
}

export default VerifiedIcon
