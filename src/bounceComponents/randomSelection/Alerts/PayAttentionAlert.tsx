import { Alert, Typography } from '@mui/material'
import { ReactComponent as ErrorIcon } from 'assets/imgs/icon/gree-err.svg'
const PayAttentionAlert = () => {
  return (
    <Alert
      icon={<ErrorIcon />}
      sx={{
        '&.MuiAlert-root': {
          background: '#F9FCDE',
          alignItems: 'center',
          color: 'black',
          border: '1px dashed rgb(41,152,235)'
        }
      }}
    >
      <Typography variant="body1" component="span">
        Please pay attention.&nbsp;
      </Typography>
      <Typography variant="body1" component="span" sx={{ color: '#908E96' }}>
        Check the auction creator, token contract and price.
      </Typography>
      <Typography sx={{ color: '#908E96' }}>Bounce auction is a decentralized tool where anyone can launch.</Typography>
    </Alert>
  )
}

export default PayAttentionAlert
