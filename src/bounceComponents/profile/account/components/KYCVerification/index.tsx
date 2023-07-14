import { Box, Button, Typography } from '@mui/material'
import { ReactComponent as KYC_LOCK } from 'assets/svg/account/kyc_lock.svg'
import SumsubWebDialog from 'bounceComponents/account/SumsubWebDialog'
import { show } from '@ebay/nice-modal-react'

export default function KYCVerification() {
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
        <Button
          onClick={() => show(SumsubWebDialog)}
          sx={{
            ml: 10,
            height: 40
          }}
        >
          Verify
        </Button>
      </Box>
    </Box>
  )
}
