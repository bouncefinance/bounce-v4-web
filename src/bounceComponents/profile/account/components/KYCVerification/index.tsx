import { Box, Button, Typography } from '@mui/material'
import SumsubWebSdk from '@sumsub/websdk-react'
import { useRequest } from 'ahooks'
import { getSumsubAccessToken } from 'api/account'
import { ReactComponent as KYC_LOCK } from 'assets/svg/account/kyc_lock.svg'
import { useCallback, useState } from 'react'

export default function KYCVerification() {
  const [showSumsub, setShowSumsub] = useState(false)

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
          onClick={() => setShowSumsub(true)}
          sx={{
            ml: 10,
            height: 40
          }}
        >
          Verify
        </Button>
      </Box>
      {showSumsub && <SumsubWeb />}
    </Box>
  )
}

function SumsubWeb() {
  const { data } = useRequest(
    async () => {
      return await getSumsubAccessToken()
    },
    { debounceWait: 1000 }
  )

  const accessTokenExpirationHandler = useCallback(async () => {
    const data = await getSumsubAccessToken()
    return data.data.token
  }, [])

  if (!data?.data.token) return null

  return (
    <SumsubWebSdk
      accessToken={data.data.token}
      // testEnv
      expirationHandler={accessTokenExpirationHandler}
      // config={config}
      // options={options}
      onMessage={(msg: any) => console.log('SumsubWeb', msg)}
      onError={(error: any) => console.error('SumsubWeb', error)}
    />
  )
}
