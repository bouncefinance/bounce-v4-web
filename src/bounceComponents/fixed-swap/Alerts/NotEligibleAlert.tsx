import { Alert, Typography, Button, Box } from '@mui/material'
import { ReactComponent as ErrorIcon } from 'assets/imgs/icon/err.svg'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import { useIsMDDown } from 'themes/useTheme'
import { useIsSpecialPoolId, useRequireWhitelistAndEmail } from 'bounceHooks/auction/useRequireWhitelistAndEmail'
import { useActiveWeb3React } from 'hooks'
const NotEligibleAlert = () => {
  const { account } = useActiveWeb3React()
  const isRequireWhiteListAndEmail = useRequireWhitelistAndEmail()
  const isSpecialPoolId = useIsSpecialPoolId()
  const connectEmail = () => {
    const url = new URL(window.location.href)
    const pathname = url?.pathname
    navigate({
      pathname: routes.account.myAccount,
      search: `?redirectUrl=${pathname}`
    })
  }
  const isMd = useIsMDDown()
  const navigate = useNavigate()
  const Content = () => {
    if (isSpecialPoolId) {
      if (!account) {
        return (
          <>
            <Typography variant="body1" component="span">
              You need to connect to your email to participate in this auction
            </Typography>
          </>
        )
      }
      if (isRequireWhiteListAndEmail) {
        return (
          <>
            <Typography variant="body1" component="span">
              You need to connect to your email to participate in this auction
            </Typography>
            <Button
              sx={{
                margin: '0 10px'
              }}
              variant="contained"
              onClick={() => connectEmail()}
            >
              Please connect your email.
            </Button>
          </>
        )
      } else {
        return (
          <>
            <Typography variant="body1" component="span">
              You are not eligible.&nbsp;{' '}
            </Typography>
            <Typography variant="body1" component="span" sx={{ color: '#908E96' }}>
              You are not whitelisted for this auction.
            </Typography>
          </>
        )
      }
    } else {
      return (
        <>
          <Typography variant="body1" component="span">
            You are not eligible.&nbsp;{' '}
          </Typography>
          <Typography variant="body1" component="span" sx={{ color: '#908E96' }}>
            You are not whitelisted for this auction.
          </Typography>
        </>
      )
    }
  }
  return (
    <Alert
      severity="error"
      sx={{
        borderRadius: 20,
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: isMd ? 'flex-start' : 'center',
        '&.MuiAlert-root': { background: '#F9E3DA' }
      }}
      icon={<ErrorIcon />}
    >
      <Content />
      {isRequireWhiteListAndEmail && (
        <Box
          sx={{
            display: 'flex',
            flexFlow: isMd ? 'column wrap' : 'row wrap',
            justifyContent: 'flex-start',
            alignItems: isMd ? 'flex-start' : 'center'
          }}
        >
          <Typography variant="body1" component="span">
            You need to connect to your email to participate in this auction
          </Typography>
          <Button
            sx={{
              margin: isMd ? '8px 0 0' : '0 10px'
            }}
            variant="contained"
            onClick={() => connectEmail()}
          >
            Please connect your email.
          </Button>
        </Box>
      )}
      {!isRequireWhiteListAndEmail && (
        <>
          <Typography variant="body1" component="span">
            You are not eligible.&nbsp;{' '}
          </Typography>
          <Typography variant="body1" component="span" sx={{ color: '#908E96' }}>
            You are not whitelisted for this auction.
          </Typography>
        </>
      )}
    </Alert>
  )
}

export default NotEligibleAlert
