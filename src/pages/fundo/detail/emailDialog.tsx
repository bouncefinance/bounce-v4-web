import { Box, Typography, styled } from '@mui/material'
import EmailIcon from 'components/Fundo/assets/img/email.png'
import CloseIcon from 'components/Fundo/assets/img/mobile/x.svg'
import { useIsSMDown } from 'themes/useTheme'
import SendBtnImg from 'components/Fundo/assets/img/sendEmail.svg'
import sendEmailBlack from 'components/Fundo/assets/img/sendEmailBlack.svg'
import { fundoRegisterEmail } from 'api/fundo'
import { useState, useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import { toast } from 'react-toastify'
const InputEl = styled('input')(({ theme }) => ({
  textDecoration: 'none',
  width: '100%',
  background: '0',
  outline: 'none',
  border: 'none',
  color: 'var(--ps-text-2)',
  fontSize: '16px',
  '&:focus': {
    border: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px'
  }
}))
const SendBtn = ({ sendEmail }: { sendEmail?: () => void }) => {
  const [isHover, setIsHover] = useState(false)
  const imgBg = useMemo(() => {
    return isHover ? sendEmailBlack : SendBtnImg
  }, [isHover])
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        '&:hover': {
          background: '#fff'
        }
      }}
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
    >
      <img
        src={imgBg}
        style={{
          cursor: 'pointer'
        }}
        onClick={sendEmail}
        alt=""
      />
    </Box>
  )
}
export default function EmailDialog({ handleClose }: { handleClose?: () => void }) {
  const isSm = useIsSMDown()
  const { account } = useActiveWeb3React()
  const [email, setEmail] = useState('')
  const [isRegisterDone, setIsRegisterDone] = useState(false)
  const sendEmail = async () => {
    if (!email) {
      toast.warning(`email can't be empty~`)
      return
    }
    const { code, msg } = await fundoRegisterEmail({
      side: 'fundo',
      account: account || '',
      email: email
    })
    if (code === 200 && msg === 'ok') {
      toast.success('Successful operation~')
      setIsRegisterDone(true)
    } else {
      toast.warning(msg)
    }
  }
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
          backgroundColor: 'rgba(0,0,0, 0.8)',
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
            setIsRegisterDone(false)
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
                color: 'var(--ps-text-5)'
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
                color: 'var(--ps-text-2)'
              }}
            >
              Get notified when auctions start, make sure you didn’t miss it. Enter your email below, so we can invite
              you to join the party.
            </Typography>
          </Box>
          {!isRegisterDone && (
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
              <InputEl
                type="text"
                onChange={e => {
                  const value = e.target.value
                  setEmail(value)
                }}
                placeholder="Email adress"
              />
              <SendBtn sendEmail={sendEmail} />
            </Box>
          )}
          {isRegisterDone && (
            <Typography
              sx={{
                width: '100%',
                fontFamily: `'Inter'`,
                fontWeight: 400,
                fontSize: isSm ? '14px' : '16px',
                letterSpacing: '-0.02em',
                color: '#fff',
                marginTop: '56px'
              }}
            >
              Email has been sent, please wait for our auction to start
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
