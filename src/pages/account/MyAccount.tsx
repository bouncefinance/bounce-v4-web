import { Box, Container, Stack, Typography } from '@mui/material'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import EditInfo from 'bounceComponents/profile/account/components/EditInfo'
import LoginOpton from 'bounceComponents/profile/account/components/LoginOption'
import { useUserInfo } from 'state/users/hooks'
import { useQueryParams } from 'hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from '../../hooks/useBreakpoint'

export default function MyAccount() {
  const { userInfo, userId } = useUserInfo()
  const navigate = useNavigate()
  const { redirectUrl } = useQueryParams()
  const isSm = useBreakpoint('sm')
  const handleEmailChange = () => {
    redirectUrl && navigate(redirectUrl)
  }
  return (
    <AccountLayout bgColor="#F6F6F3">
      <Box padding={isSm ? '28px 0 0 0' : '40px 20px 80px'}>
        <Container
          sx={{
            maxWidth: '1080px !important'
          }}
        >
          <Typography
            variant="h3"
            fontSize={isSm ? 22 : 36}
            sx={{ paddingLeft: isSm ? '18px' : 0, fontFamily: 'Public Sans' }}
          >
            My Account
          </Typography>
          <Box
            sx={{
              mt: isSm ? 35 : 40,
              border: '1px solid var(--ps-text-5)',
              padding: isSm ? '30px 16px' : '80px 30px',
              background: '#FFFFFF',
              borderRadius: '16px'
            }}
          >
            <Container
              sx={{
                maxWidth: '640px !important'
              }}
            >
              <Stack direction={'row'} alignItems="center">
                <Typography variant="h1" fontWeight={500} fontSize={isSm ? 22 : 36} fontFamily="Public Sans">
                  {userInfo?.fullName}
                </Typography>
                <Typography variant="body1" fontSize={600} color="#2B51DA" ml={10} sx={{ fontSize: isSm ? 16 : 20 }}>
                  {userInfo?.fullNameId && `#${userInfo?.fullNameId}`}
                </Typography>
              </Stack>
              <Typography mt={isSm ? 10 : 20} variant="body1" color="var(--ps-text-1)">
                If you want to create an auction pool, you must connect to email and Twitter.
              </Typography>

              <EditInfo userInfoEmail={userInfo?.email || ''} handleEmailChange={handleEmailChange} userId={userId} />
              <LoginOpton twitter={userInfo?.twitterName || ''} />
            </Container>
          </Box>
        </Container>
      </Box>
    </AccountLayout>
  )
}
