import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Box, SxProps, Typography, styled, Stack, IconButton } from '@mui/material'
import { ReactNode, useState } from 'react'
import Tooltip from 'bounceComponents/common/Tooltip'
const DividingLine = styled(Box)`
  width: 100%;
  height: 1px;
  opacity: 0.7;
  background: #d4d6cf;
  margin: 32px 0;
`

const SubTitle = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography fontSize={20} fontWeight={600} color={'#121212'} lineHeight={'28px'}>
    {children}
  </Typography>
)

interface PoolInfoItemProps {
  title: string
  tip?: string
  children?: ReactNode
  sx?: SxProps
  iconButton?: ReactNode
  iconButtonCallBack?: () => void
}

const BotSetUpInfoItem = ({
  title,
  tip,
  children,
  sx,
  iconButton,
  iconButtonCallBack
}: PoolInfoItemProps): JSX.Element => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  return (
    <>
      <DividingLine />
      <Box gap={12} sx={{ ...sx, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#908E96' }}>
          <Stack direction={'row'} alignItems={'cener'}>
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
          </Stack>
          {iconButton ? <IconButton onClick={iconButtonCallBack}>{iconButton}</IconButton> : null}
        </Box>
        {children}
      </Box>
    </>
  )
}

export default BotSetUpInfoItem
