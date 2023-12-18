import { Typography, Theme } from '@mui/material'
import { SxProps } from '@mui/system'
import useBreakpoint from 'hooks/useBreakpoint'

export default function Text({
  children,
  style,
  color
}: {
  children?: React.ReactNode
  style?: React.CSSProperties & SxProps<Theme>
  color?: string
}) {
  const isSm = useBreakpoint('sm')

  return (
    <Typography
      fontSize={isSm ? 15 : 18}
      lineHeight={'140%'}
      fontWeight={400}
      color={color ? color : 'var(--AI-dark-02, #4C483A)'}
      sx={{ ...style }}
    >
      {children}
    </Typography>
  )
}
