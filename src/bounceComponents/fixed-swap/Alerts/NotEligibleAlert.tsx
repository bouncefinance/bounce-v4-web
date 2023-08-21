import { Alert, Typography, Button, Box } from '@mui/material'
import { ReactComponent as ErrorIcon } from 'assets/imgs/icon/err.svg'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import { useIsMDDown } from 'themes/useTheme'
import { needEmailValidPoolId, useRequireWhitelistAndEmail } from 'bounceHooks/auction/useRequireWhitelistAndEmail'
import { useActiveWeb3React } from 'hooks'
import { useQueryParams } from 'hooks/useQueryParams'
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
  const isMd = useIsMDDown()
  const { account } = useActiveWeb3React()
  const { sysId } = useQueryParams()
  const navigate = useNavigate()
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
      {!account && needEmailValidPoolId.indexOf(Number(sysId)) > -1 && (
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
        </Box>
      )}
      {!isRequireWhiteListAndEmail && needEmailValidPoolId.indexOf(Number(sysId)) === -1 && (
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
