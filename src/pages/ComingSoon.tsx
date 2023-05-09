import { Dots } from 'themes/components'
import { Box, Container, SxProps, Theme, Typography } from '@mui/material'
import DefaultIcon from 'assets/imgs/common/ComingSoon.png'

export default function ComingSoon({
  sx,
  prompt,
  bgColor
}: {
  sx?: SxProps<Theme> | undefined
  prompt?: string
  bgColor?: string
}) {
  return (
    <Box
      sx={{
        padding: '0 60px 40px',
        ...sx
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: bgColor || '#F5F5F5',
          borderRadius: '20px',
          minHeight: 436,
          display: 'grid',
          justifyItems: 'center',
          alignItems: 'center'
        }}
      >
        <Box mt={100}>
          <img
            style={{
              width: 453,
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
            Coming soon <Dots />
          </Typography>
          {prompt && <Typography textAlign={'center'}>{prompt}</Typography>}
        </Box>
      </Container>
    </Box>
  )
}
