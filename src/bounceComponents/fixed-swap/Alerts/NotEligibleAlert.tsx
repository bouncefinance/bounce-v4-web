import { Alert, Typography } from '@mui/material'
import { ReactComponent as ErrorIcon } from 'assets/imgs/icon/err.svg'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import { useRequireWhitelistAndEmail } from 'bounceHooks/auction/useRequireWhitelistAndEmail'
const NotEligibleAlert = () => {
  const isRequireWhiteListAndEmail = useRequireWhitelistAndEmail()
  const connectEmail = () => {
    const url = new URL(window.location.href)
    const pathname = url?.pathname
    navigate({
      pathname: routes.account.myAccount,
      search: `?redirectUrl=${pathname}`
    })
  }
  const navigate = useNavigate()
  return (
    <Alert
      severity="error"
      sx={{ borderRadius: 20, '&.MuiAlert-root': { background: '#F9E3DA' } }}
      icon={<ErrorIcon />}
    >
      <Typography variant="body1" component="span">
        You are not eligible.&nbsp;{' '}
      </Typography>
      <Typography variant="body1" component="span" sx={{ color: '#908E96' }}>
        You are not whitelisted for this auction.
      </Typography>
      {isRequireWhiteListAndEmail && (
        <span
          style={{
            cursor: 'pointer',
            margin: '0 10px',
            background: 'rgb(212, 245, 222)',
            lineHeight: '24px',
            padding: '4px 8px',
            borderRadius: '24px'
          }}
          onClick={() => connectEmail()}
        >
          Please connect your email.
        </span>
      )}
    </Alert>
  )
}

export default NotEligibleAlert
