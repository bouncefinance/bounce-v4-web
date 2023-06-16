import { Dots } from 'themes/components'
import { Box, Container, SxProps, Theme, Typography } from '@mui/material'
import DefaultIcon from 'assets/imgs/common/ComingSoon.png'
import useBreakpoint from '../hooks/useBreakpoint'

export default function ComingSoon({
  sx,
  prompt,
  bgColor
}: {
  sx?: SxProps<Theme> | undefined
  prompt?: string
  bgColor?: string
}) {
  const isSm = useBreakpoint('sm')
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
        <Box mt={100} mb={100} display="grid" justifyItems={'center'}>
          <img
            style={{
              display: 'block',
              width: isSm ? 226 : 453,
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
