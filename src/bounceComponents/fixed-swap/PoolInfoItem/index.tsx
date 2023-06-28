import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Box, SxProps, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import Tooltip from 'bounceComponents/common/Tooltip'

const SubTitle = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography variant="body2" sx={{ color: '#908E96', textTransform: 'capitalize' }}>
    {children}
  </Typography>
)

interface PoolInfoItemProps {
  title: string
  tip?: string
  children?: ReactNode
  sx?: SxProps
}

const PoolInfoItem = ({ title, tip, children, sx }: PoolInfoItemProps): JSX.Element => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  return (
    <Box sx={{ ...sx, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', color: '#908E96' }}>
        <SubTitle>{title}</SubTitle>
        {tip ? (
          <Tooltip open={isTooltipVisible} title={tip} onClose={() => setIsTooltipVisible(false)}>
            <HelpOutlineIcon
              sx={{ width: 20, height: 20, ml: 4 }}
              onClick={() => setIsTooltipVisible(true)}
              onMouseEnter={() => setIsTooltipVisible(true)}
            />
          </Tooltip>
        ) : null}
      </Box>
      {children}
    </Box>
  )
}

export default PoolInfoItem
