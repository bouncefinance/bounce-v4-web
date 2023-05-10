import { Box, Container, Typography } from '@mui/material'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import ComingSoon from 'pages/ComingSoon'

export default function AccountRealAuction() {
  return (
    <AccountLayout>
      <Box padding="40px 20px">
        <Container
          sx={{
            maxWidth: '1080px !important',
            position: 'relative'
          }}
        >
          <Typography variant="h3" fontSize={30}>
            My Advertisement Auction
          </Typography>
          <ComingSoon
            bgColor="var(--ps-white)"
            prompt="This feature will be available soon. Please stay tuned."
            sx={{
              padding: '0'
            }}
          />
        </Container>
      </Box>
    </AccountLayout>
  )
}
