import React from 'react'
import { Box, Container, Link, Stack, Typography } from '@mui/material'
import useBreakpoint from '../../../hooks/useBreakpoint'

// export type IFooterProps = {}

const Footer: React.FC = ({}) => {
  const isSm = useBreakpoint('sm')
  return (
    <Container maxWidth="xl">
      {!isSm && (
        <Stack sx={{ py: 20, px: 40 }} spacing={34}>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontSize={12} color="#908E96">
              ©2023 Bounce dao Ltd. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={28} sx={{ a: { color: '#908E96', fontSize: 12 } }}>
              <Link href="https://bounce.finance/termsOfService">Terms Of Service</Link>
              <Link href="https://bounce.finance/privacyPolicy">Privacy Policy</Link>
            </Stack>
          </Stack>
        </Stack>
      )}
      {isSm && (
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid rgba(18, 18, 18, 0.2)'
          }}
          spacing={34}
        >
          <Box
            sx={{
              pt: 20,
              mb: 28
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                mb: 4,
                a: {
                  color: '#908E96',
                  fontSize: 12
                }
              }}
            >
              <Link href="https://bounce.finance/termsOfService">Terms Of Service</Link>
              <Link href="https://bounce.finance/privacyPolicy">Privacy Policy</Link>
            </Box>
            <Typography fontSize={12} color="#908E96">
              ©2023 Bounce dao Ltd. All rights reserved.
            </Typography>
          </Box>
        </Stack>
      )}
      {/*<Stack sx={{ py: 20, px: 40 }} spacing={34}>*/}
      {/*  <Stack direction="row" justifyContent="space-between">*/}
      {/*    <Typography fontSize={12} color="#908E96">*/}
      {/*      ©2023 Bounce dao Ltd. All rights reserved.*/}
      {/*    </Typography>*/}
      {/*    <Stack direction="row" spacing={28} sx={{ a: { color: '#908E96', fontSize: 12 } }}>*/}
      {/*      <Link href="https://bounce.finance/termsOfService">Terms Of Service</Link>*/}
      {/*      <Link href="https://bounce.finance/privacyPolicy">Privacy Policy</Link>*/}
      {/*    </Stack>*/}
      {/*  </Stack>*/}
      {/*</Stack>*/}
    </Container>
  )
}

export default Footer
