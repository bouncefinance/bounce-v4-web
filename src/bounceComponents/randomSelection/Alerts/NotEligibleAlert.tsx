import { Alert, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

const NotEligibleAlert = () => {
  return (
    <Alert
      severity="error"
      sx={{ borderRadius: 20, '&.MuiAlert-root': { background: '#F9E3DA' } }}
      icon={<ErrorIcon sx={{ color: '#FF0000' }} />}
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
