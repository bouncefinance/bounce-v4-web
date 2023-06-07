import { Box, Container, Typography } from '@mui/material'
// import { updateUserBanner } from 'api/user'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import ProfileOverview from 'bounceComponents/account/ProfileOverview'
import { useState } from 'react'
import { useUserInfo } from 'state/users/hooks'
import CropImg from 'bounceComponents/common/DialogCropImg'
import useBreakpoint from '../../hooks/useBreakpoint'

export default function MyProfile() {
  const { userInfo } = useUserInfo()
  const isSm = useBreakpoint('sm')

  const [showBgEditCropDialog, setShowBgEditCropDialog] = useState(false)
  const [profileBg, setProfileBg] = useState(userInfo?.banner || '')
  return (
    <AccountLayout>
      <Box>
        <Box
          onClick={() => setShowBgEditCropDialog(true)}
          sx={{
            height: isSm ? 314 : 400,
            transition: 'background-color 1s',
            backgroundColor: '#626262',
            position: 'relative',
            zIndex: 1,
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#404040'
            }
          }}
        >
          {profileBg ? (
            <picture style={{ width: '100%', height: '100%' }}>
              <img src={profileBg} alt="banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </picture>
          ) : (
            <Box sx={{ pt: isSm ? 29 : 60, width: '100%', height: '100%' }}>
              <Box sx={{ display: 'grid', justifyItems: 'center' }}>
                <svg
                  width={isSm ? '22' : '56'}
                  height={isSm ? '22' : '56'}
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.3337 48.9557C13.1465 48.7109 10.118 47.4654 7.68087 45.397C5.24369 43.3286 3.52236 40.543 2.76267 37.438C2.00297 34.3329 2.24376 31.0673 3.45065 28.1073C4.65753 25.1473 6.76881 22.6443 9.483 20.9556C10.0605 16.4525 12.2592 12.3142 15.6675 9.31501C19.0759 6.31587 23.4603 4.6615 28.0003 4.6615C32.5403 4.6615 36.9248 6.31587 40.3331 9.31501C43.7415 12.3142 45.9401 16.4525 46.5177 20.9556C49.2319 22.6443 51.3431 25.1473 52.55 28.1073C53.7569 31.0673 53.9977 34.3329 53.238 37.438C52.4783 40.543 50.757 43.3286 48.3198 45.397C45.8826 47.4654 42.8542 48.7109 39.667 48.9557V49H16.3337V48.9557ZM30.3337 28V18.6666H25.667V28H18.667L28.0003 39.6666L37.3337 28H30.3337Z"
                    fill="white"
                    fillOpacity="0.8"
                  />
                </svg>
                <Typography variant={isSm ? 'h5' : 'h3'} color="#fff">
                  Profile Picture
                </Typography>
                <Typography fontSize={isSm && 12} color="#fff">
                  The most suitable size is 1200 * 300px
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box
          padding={isSm ? '0' : '0 20px 30px 20px'}
          sx={{
            backgroundColor: '#F6F6F3'
          }}
        >
          <Container
            sx={{
              maxWidth: '1080px !important',
              mt: -200,
              position: 'relative',
              zIndex: 2,
              padding: isSm ? '26px 16px 80px' : '40px 47px 100px 64px',
              background: '#FFF',
              borderRadius: isSm ? '8px' : '20px'
            }}
          >
            <ProfileOverview />
          </Container>
        </Box>

        <CropImg
          showBgEditCropDialog={showBgEditCropDialog}
          setShowBgEditCropDialog={setShowBgEditCropDialog}
          setProfileBg={setProfileBg}
        />
      </Box>
    </AccountLayout>
  )
}
