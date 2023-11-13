import { Box, Typography, Stack, styled } from '@mui/material'
import { useIsMDDown } from 'themes/useTheme'
import { ReactComponent as Step1Svg } from 'assets/imgs/thirdPart/nfcDetail/step1.svg'
import { ReactComponent as Step2Svg } from 'assets/imgs/thirdPart/nfcDetail/step2.svg'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { PageStep } from '../nfcDetail'
export const BtnCom = styled(Box)(() => ({
  width: '100%',
  padding: '16px',
  border: '1px solid #fff',
  borderRadius: '30px',
  color: '#fff',
  fontFamily: `'Inter'`,
  fontSize: '14px',
  textAlign: 'center',
  wordBreak: 'break-all',
  cursor: 'pointer',
  '&:hover': {
    background: '#fff',
    color: '#121212'
  }
}))
const NfcDetail = ({ setPageStep }: { setPageStep?: (arg: PageStep) => void }) => {
  const isMd = useIsMDDown()
  return (
    <Box
      sx={{
        position: 'fixed',
        top: isMd ? 0 : 76,
        left: '50%',
        transform: 'translate3D(-50%, 0, 0)',
        width: '100%',
        minHeight: '100vh',
        maxWidth: isMd ? '100vw' : '360px',
        margin: '0 auto',
        background: '#000',
        padding: '80px 16px 0',
        zIndex: 9999999999
      }}
    >
      <Typography
        sx={{
          color: '#FFF',
          leadingTrim: 'both',
          textEdge: 'cap',
          fontFamily: `'Inter'`,
          fontSize: 14,
          lineHeight: '21px',
          marginBottom: '64px'
        }}
      >
        Please follow the instruction below
      </Typography>
      <Stack
        sx={{
          padding: '0 10px 48px',
          borderBottom: '1px solid #fff'
        }}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontSize: 24,
              fontWeight: 600,
              lineHeight: '33px',
              color: '#fff',
              marginBottom: '10px'
            }}
          >
            Step 1
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontSize: 14,
              lineHeight: '21px',
              color: '#fff'
            }}
          >
            Copy current page link
          </Typography>
        </Box>
        <Step1Svg />
      </Stack>
      <Stack
        sx={{
          padding: '48px 10px 67px'
        }}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontSize: 24,
              fontWeight: 600,
              lineHeight: '33px',
              color: '#fff',
              marginBottom: '10px'
            }}
          >
            Step 2
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontSize: 14,
              lineHeight: '21px',
              color: '#fff',
              width: 230
            }}
          >
            Open the browser inside the wallet (such as Metamask, OKX, etc.) and paste and go to the page
          </Typography>
        </Box>
        <Step2Svg />
      </Stack>
      <CopyToClipboard text={window.location.href} placement={'bottom'}>
        <BtnCom
          sx={{
            marginBottom: '18px',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Copy page link
        </BtnCom>
      </CopyToClipboard>
      <BtnCom
        onClick={() => {
          setPageStep && setPageStep(PageStep.claimPage)
        }}
      >
        I have already opened it with the built-in browser of the wallet
      </BtnCom>
    </Box>
  )
}
export default NfcDetail
