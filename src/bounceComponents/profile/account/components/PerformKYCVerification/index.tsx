import { Stack, Typography, Box } from '@mui/material'
import { ReactComponent as GreeErrSvg } from 'assets/imgs/icon/gree-err.svg'
import useBreakpoint from 'hooks/useBreakpoint'
import SumsubWebDialog from 'bounceComponents/account/SumsubWebDialog'
import { show } from '@ebay/nice-modal-react'
import { useMemo } from 'react'
import { useUserInfo } from 'state/users/hooks'
import { VerifyStatus } from 'api/profile/type'
const PerformKYCVerification = () => {
  const isSm = useBreakpoint('sm')
  const { userInfo } = useUserInfo()

  const showBox = useMemo(() => userInfo && userInfo.ifKyc === VerifyStatus.NoVerify, [userInfo])
  return (
    <>
      {showBox && (
        <Box
          onClick={() => show(SumsubWebDialog)}
          mb={isSm ? 8 : 0}
          sx={{
            background: '#F9FCDE',
            padding: '16px 0',
            cursor: 'pointer',
            '@media(max-width:1296px)': {
              marginBottom: 24,
              '&>div': {
                marginLeft: 16
              }
            }
          }}
        >
          <Stack
            sx={{
              maxWidth: '1296px',
              margin: '0 auto',
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center'
            }}
          >
            <Box>
              <GreeErrSvg />
            </Box>
            <Box
              sx={{
                color: '#908E96',
                '&>span,&': {
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%'
                }
              }}
            >
              <Typography sx={{ color: '#171717' }} component={'span'}>
                Perform Sumsub KYC Verification{' '}
              </Typography>
              You have not performed KYC verification on the bounce platform yet, Please click to verify.
            </Box>
          </Stack>
        </Box>
      )}
    </>
  )
}
export default PerformKYCVerification
