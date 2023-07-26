import { Alert, Typography } from '@mui/material'

const PayAttentionAlert = () => {
  return (
    <Alert severity="warning" sx={{ '&.MuiAlert-root': { background: '#F9FCDE' }, borderRadius: 20 }}>
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
