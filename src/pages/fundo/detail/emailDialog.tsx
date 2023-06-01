import { Box, Typography, styled } from '@mui/material'
import EmailIcon from 'components/Fundo/assets/img/email.png'
import CloseIcon from 'components/Fundo/assets/img/mobile/x.svg'
import { useIsSMDown } from 'themes/useTheme'
import SendBtn from 'components/Fundo/assets/img/sendEmail.svg'
const InputEl = styled('input')(({ theme }) => ({
  textDecoration: 'none',
  width: '100%',
  background: '0',
  outline: 'none',
  border: 'none',
  color: '#959595',
  fontSize: '16px',
  '&:focus': {
    border: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px'
  }
}))
export default function EmailDialog({ handleClose }: { handleClose?: () => void }) {
  const isSm = useIsSMDown()
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',

        zIndex: 998
      }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'rgba(0,0,0, 0.7)',
          width: '100%',
          height: '100%'
        }}
        onClick={() => {
          handleClose && handleClose()
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          top: '50%',
          left: '50%',
          transform: 'translate3D(-50%, -50%, 0)',
          maxWidth: isSm ? 'calc(100vw - 32px)' : '620px'
        }}
      >
        <img
          style={{
            width: '100%'
          }}
          src={EmailIcon}
          alt=""
        />
        <img
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            cursor: 'pointer'
          }}
          src={CloseIcon}
          alt=""
          onClick={() => {
            handleClose && handleClose()
          }}
        />
        <Box
          sx={{
            padding: isSm ? '32px 16px' : '32px 48px',
            background: 'rgba(73, 73, 73, 0.11)',
            backdropFilter: 'blur(25px)'
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexFlow: isSm ? 'column nowrap' : 'row nowrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
            gap={'40px'}
          >
            <Typography
              sx={{
                width: isSm ? '100%' : '50%',
                fontFamily: `'Public Sans'`,
                fontWeight: 600,
                fontSize: isSm ? '16px' : '20px',
                letterSpacing: '-0.02em',
                color: '#D7D6D9'
              }}
            >
              WE DON’T WANT YOU TO MISS THIS!
            </Typography>
            <Typography
              sx={{
                width: isSm ? '100%' : '50%',
                fontFamily: `'Inter'`,
                fontWeight: 400,
                fontSize: isSm ? '14px' : '16px',
                letterSpacing: '-0.02em',
                color: '#D7D6D9'
              }}
            >
              Get notified when auctions start, make sure you didn’t miss it. Enter your email below, so we can invite
              you to join the party.
            </Typography>
          </Box>
          <Box
            sx={{
              height: '56px',
              borderBottom: '1px solid #626262',
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            gap={'30px'}
          >
            <InputEl type="text" placeholder="Email adress" />
            <img
              src={SendBtn}
              style={{
                cursor: 'pointer'
              }}
              alt=""
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
