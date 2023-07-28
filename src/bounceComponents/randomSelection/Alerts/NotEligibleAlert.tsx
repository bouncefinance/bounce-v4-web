import { Alert, Typography } from '@mui/material'
import { ReactComponent as ErrorIcon } from 'assets/imgs/icon/err.svg'

const NotEligibleAlert = () => {
  return (
    <Alert
      severity="error"
      sx={{ borderRadius: 20, '&.MuiAlert-root': { background: '#F9E3DA' } }}
      icon={<ErrorIcon />}
    >
      <Typography variant="body1" component="span">
        You are not eligible.&nbsp;
      </Typography>
      <Typography variant="body1" component="span" sx={{ color: '#908E96' }}>
        You are not whitelisted for this auction.
      </Typography>
    </Alert>
  )
}

export default NotEligibleAlert
