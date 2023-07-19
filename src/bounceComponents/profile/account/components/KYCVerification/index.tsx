import { Box, Button, Typography } from '@mui/material'
import { ReactComponent as KYC_LOCK } from 'assets/svg/account/kyc_lock.svg'
import SumsubWebDialog from 'bounceComponents/account/SumsubWebDialog'
import { show } from '@ebay/nice-modal-react'
import { useUserInfo } from 'state/users/hooks'
import { VerifyStatus } from 'api/profile/type'

export default function KYCVerification() {
  const { userInfo } = useUserInfo()
  console.log(userInfo)

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          height: 54,
          padding: '20px 16px',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '10px',
          background: 'var(--ps-yellow-1)'
        }}
      >
        <Box display={'flex'} alignItems={'center'}>
          <KYC_LOCK />
          <Typography ml={10}>KYC Verification</Typography>
        </Box>
        {userInfo?.isVerify === VerifyStatus.NoVerify ? (
          <Button
            onClick={() => show(SumsubWebDialog)}
            sx={{
              ml: 10,
              height: 40
            }}
          >
            Verify
          </Button>
        ) : (
          <Button
            sx={{
              ml: 10,
              height: 40
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#20994B" />
              <path d="M7.5 12.7181L10.6702 15.5L16.5 8.5" stroke="white" strokeLinecap="round" />
            </svg>
            <Typography ml={5}>Verified</Typography>
          </Button>
        )}
      </Box>
    </Box>
  )
}
