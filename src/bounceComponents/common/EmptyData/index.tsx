import { Box, Container, SxProps, Theme, Typography } from '@mui/material'
import DefaultIcon from 'assets/imgs/common/ComingSoon.png'

export default function EmptyData({
  sx,
  title,
  height,
  prompt,
  bgColor
}: {
  sx?: SxProps<Theme> | undefined
  title?: string
  prompt?: string
  bgColor?: string
  height?: number | string
}) {
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
            width: height || 300,
            margin: '0 auto'
          }}
          src={DefaultIcon}
          alt=""
          srcSet=""
        />
        <Typography
          variant="h4"
          sx={{
            fontSize: 20,
            textAlign: 'center',
            mt: 40
          }}
        >
          {title || 'No Data'}
        </Typography>
        {prompt && (
          <Typography mt={5} textAlign={'center'}>
            {prompt}
          </Typography>
        )}
      </Container>
    </Box>
  )
}
