import { Box, Typography } from '@mui/material'
import { DutchAuctionPoolProp, PoolStatus } from 'api/pool/type'
import WarningIcon from 'assets/imgs/dutchAuction/warning.png'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import ErrorIcon from 'assets/imgs/dutchAuction/error.png'
import { useIsUserJoinedDutchPool } from 'bounceHooks/auction/useIsUserJoinedPool'

export interface PoolStatusBoxProps {
  status: PoolStatus
  style?: React.CSSProperties
  hiddenStatus?: boolean
  poolInfo: DutchAuctionPoolProp
}
const UserPoolStatusBox = ({ status, style, hiddenStatus = false, poolInfo }: PoolStatusBoxProps) => {
  const isUserJoined = useIsUserJoinedDutchPool(poolInfo)
  const { enableWhiteList, whitelistData } = poolInfo
  if (hiddenStatus) {
    return <Box></Box>
  }
  if ((enableWhiteList && whitelistData?.isUserInWhitelist) || !enableWhiteList) {
    switch (status) {
      case PoolStatus.Upcoming:
      case PoolStatus.Live:
        return (
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              borderRadius: 8,
              border: '1px solid #626262',
              padding: '16px 24px',
              ...style
            }}
          >
            <img
              src={WarningIcon}
              style={{ width: '24px', marginRight: '16px', verticalAlign: 'middle' }}
              alt=""
              srcSet=""
            />
            <Typography
              variant="body1"
              sx={{
                width: '500px',
                fontFamily: `'Inter'`,
                fontSize: '14px',
                color: '#fff'
              }}
            >
              Please pay attention.
              <span style={{ color: '#959595' }}>
                Check the auction creator, token contract and price. Bounce auction is a decentralized tool where anyone
                can launch.
              </span>
            </Typography>
          </Box>
        )
      case PoolStatus.Closed:
      case PoolStatus.Cancelled:
        // all token auctioned
        if (isUserJoined) {
          return (
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                borderRadius: 8,
                border: '1px solid #626262',
                padding: '16px 24px',
                ...style
              }}
            >
              <img
                src={SuccessIcon}
                style={{ width: '24px', marginRight: '16px', verticalAlign: 'middle' }}
                alt=""
                srcSet=""
              />
              <Typography
                variant="body1"
                sx={{
                  fontFamily: `'Inter'`,
                  fontSize: '14px',
                  color: '#fff'
                }}
              >
                Success!
                <span style={{ color: '#959595' }}>
                  You have successfully participated in this auction and bided for your tokens. Please claim your
                  tokens.
                </span>
              </Typography>
            </Box>
          )
        } else {
          return <></>
        }
      default:
        return <></>
    }
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          borderRadius: 8,
          border: '1px solid #626262',
          padding: '16px 24px',
          ...style
        }}
      >
        <img src={ErrorIcon} style={{ width: '24px', marginRight: '16px', verticalAlign: 'middle' }} alt="" srcSet="" />
        <Typography
          variant="body1"
          sx={{
            fontFamily: `'Inter'`,
            fontSize: '14px',
            color: '#FD3333'
          }}
        >
          You are not eligible.
          <span style={{ color: '#959595' }}>You are not whitelisted for this auction.</span>
        </Typography>
      </Box>
    )
  }
}
export default UserPoolStatusBox
