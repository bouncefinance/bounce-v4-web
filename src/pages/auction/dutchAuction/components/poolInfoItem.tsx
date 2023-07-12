import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Box, SxProps, Typography } from '@mui/material'
import { ReactNode } from 'react'
import Tooltip from 'bounceComponents/common/Tooltip'

const SubTitle = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography sx={{ color: '#959595', fontSize: '13px', fontFamily: `'Inter'` }}>{children}</Typography>
)

interface PoolInfoItemProps {
  title: string
  tip?: string
  children?: ReactNode
  sx?: SxProps
}

const PoolInfoItem = ({ title, tip, children, sx }: PoolInfoItemProps): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center', color: '#908E96' }}>
        <SubTitle>{title}</SubTitle>
        {tip ? (
          <Tooltip title={tip}>
            <HelpOutlineIcon sx={{ width: 20, height: 20, ml: 4, cursor: 'pointer' }} />
          </Tooltip>
        ) : null}
      </Box>
      {children}
    </Box>
  )
}

export default PoolInfoItem