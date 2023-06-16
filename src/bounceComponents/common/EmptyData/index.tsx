import { Box, Container, SxProps, Theme, Typography } from '@mui/material'
import DefaultIcon from 'assets/imgs/common/ComingSoon.png'
import useBreakpoint from '../../../hooks/useBreakpoint'

export default function EmptyData({
  sx,
  title,
  height,
  prompt,
  bgColor,
  isLight
}: {
  sx?: SxProps<Theme> | undefined
  title?: string
  prompt?: string
  bgColor?: string
  height?: number | string
  isLight?: boolean
}) {
  const isSm = useBreakpoint('sm')
  return (
    <Box sx={{ padding: 40, ...sx }}>
      <Container
        maxWidth="lg"
        sx={{
          width: '100%',
          backgroundColor: bgColor || 'transparent',
          display: 'grid',
          justifyItems: 'center',
          alignItems: 'center'
        }}
      >
        <img
          style={{
            width: height || isSm ? 220 : 300,
            margin: '0 auto'
          }}
          src={DefaultIcon}
          alt=""
          srcSet=""
        />
        <Typography
          variant="h4"
          sx={{
            fontSize: isSm ? 16 : 20,
            textAlign: 'center',
            mt: isSm ? 16 : 40,
            color: isLight ? '#fff' : ''
          }}
        >
          {title || 'No Data'}
        </Typography>
        {prompt && (
          <Typography
            mt={5}
            textAlign={'center'}
            sx={{
              color: isLight ? '#fff' : ''
            }}
          >
            {prompt}
          </Typography>
        )}
      </Container>
    </Box>
  )
}
