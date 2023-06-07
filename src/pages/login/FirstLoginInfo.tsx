import Container from '@mui/material/Container'
import Complete0Img from 'assets/images/login_complete.png'
import Complete1Img from 'assets/images/login_complete1.png'
import { LoginLayout } from '.'
import Box from '@mui/material/Box'
import { Button, Stack, Typography, styled } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useEffect, useState } from 'react'
import { useUserInfo } from 'state/users/hooks'
import EditInfo from 'bounceComponents/profile/account/components/EditInfo'
import LoginOpton from 'bounceComponents/profile/account/components/LoginOption'
import { Link, useNavigate } from 'react-router-dom'
import FirstProfileOverview from 'bounceComponents/account/FirstProfileOverview'
import { useQueryParams } from 'hooks/useQueryParams'
import { routes } from 'constants/routes'
import useBreakpoint from '../../hooks/useBreakpoint'

const CurStepper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '50% 50%',
  gap: 10,
  '& .check-default': {
    color: 'rgba(18, 18, 18, 0.2)'
  },
  '& .check-default.complete': {
    color: '#000'
  },
  '& .line': {
    height: 1,
    background: 'rgba(18, 18, 18, 0.2)'
  },
  '& .line.complete': {
    background: '#000'
  }
})

const steps = ['Complete Account', 'Complete Profile']

export default function FirstLoginInfo() {
  const [activeStep, setActiveStep] = useState(1)
  const { token } = useUserInfo()
  const navigate = useNavigate()
  const isSm = useBreakpoint('sm')

  useEffect(() => {
    if (!token) {
      navigate(routes.market.index, { replace: true })
    }
  }, [navigate, token])

  return (
    <section>
      <LoginLayout image={activeStep === 1 ? Complete0Img : Complete1Img} isSm={isSm}>
        <Container
          sx={{
            maxWidth: '640px !important',
            py: 32
          }}
        >
          <Box sx={{ px: 32 }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                {steps.map((label, key) => (
                  <Box key={key} display={'flex'} alignItems={'center'}>
                    <Typography variant="h4" mr={5}>
                      0{key + 1}
                    </Typography>
                    <Typography color={'var(--ps-text-1)'} fontSize={10}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <CurStepper>
                {steps.map((item, idx) => (
                  <Box key={item} display={'grid'} gap={5} gridTemplateColumns={'20px 1fr'} alignItems={'center'}>
                    <CheckCircleIcon className={`check-default ${activeStep > idx ? 'complete' : ''}`} />
                    <Box className={`line ${activeStep > idx ? 'complete' : ''}`} />
                  </Box>
                ))}
              </CurStepper>
            </Box>

            {activeStep === 1 ? (
              <CompleteAccount
                continueButton={
                  <Button
                    onClick={() => setActiveStep(2)}
                    sx={{ width: '100%', height: 52 }}
                    variant="contained"
                    color="secondary"
                  >
                    Continue
                  </Button>
                }
              />
            ) : (
              <CompleteProfile />
            )}
          </Box>
        </Container>
      </LoginLayout>
    </section>
  )
}

function CompleteAccount({ continueButton }: { continueButton: JSX.Element }) {
  const { userInfo, userId } = useUserInfo()
  return (
    <Box>
      <Stack direction={'row'} alignItems="center" mt={60}>
        <Typography variant="h1" fontWeight={500} fontSize={36}>
          Complete Account
        </Typography>
      </Stack>
      <Typography mt={10} variant="body1" color="var(--ps-text-1)">
        If you want to create an auction pool, you must connect to email and Twitter.
      </Typography>

      <EditInfo userInfoEmail={userInfo?.email || ''} userId={userId} />
      <LoginOpton twitter={userInfo?.twitterName || ''} />
      <FirstLoginNextButtonGroup continueButton={continueButton} />
    </Box>
  )
}

function CompleteProfile() {
  // const { userInfo, userId } = useUserInfo()

  return (
    <Box>
      <Stack direction={'row'} alignItems="center" mt={60}>
        <Typography variant="h1" fontWeight={500} fontSize={36}>
          Complete Profile
        </Typography>
      </Stack>
      <FirstProfileOverview />
    </Box>
  )
}

export function FirstLoginNextButtonGroup({ continueButton }: { continueButton: JSX.Element }) {
  const { redirect } = useQueryParams()
  return (
    <Box mt={40}>
      {continueButton}
      <Link to={redirect || '/'}>
        <Typography
          textAlign={'center'}
          sx={{
            mt: 6,
            textDecoration: 'underline'
          }}
        >
          skip
        </Typography>
      </Link>
    </Box>
  )
}
