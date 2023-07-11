import { Box, Typography } from '@mui/material'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
import WarningIcon from 'assets/imgs/dutchAuction/warning.png'
import TipsIcon from 'assets/imgs/dutchAuction/tips.png'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import ErrorIcon from 'assets/imgs/dutchAuction/error.png'
import { CurrencyAmount } from 'constants/token'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'

export interface PoolStatusBoxProps {
  status: PoolStatus
  style?: React.CSSProperties
  currentTotal0?: CurrencyAmount
  hiddenStatus?: boolean
  poolInfo: Erc20EnglishAuctionPoolProp
}
const UserPoolStatusBox = ({ status, currentTotal0, style, hiddenStatus = false, poolInfo }: PoolStatusBoxProps) => {
  const { enableWhiteList, whitelistData } = poolInfo
  const { account } = useActiveWeb3React()
  const isCreator = useMemo(() => poolInfo?.creator === account, [account, poolInfo?.creator])
  if (hiddenStatus) {
    return <Box></Box>
  }
  if ((enableWhiteList && whitelistData?.isUserInWhitelist) || !enableWhiteList) {
    switch (status) {
      case PoolStatus.Upcoming:
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
              padding: '16px 24px',
              border: '1px solid #626262',
              ...style
            }}
          >
            <img
              src={TipsIcon}
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
              The auction is still live.
              <span style={{ color: '#959595' }}>Please wait patiently until your auction is filled or closed.</span>
            </Typography>
          </Box>
        )

      case PoolStatus.Closed:
      case PoolStatus.Cancelled:
        // all token auctioned
        if (currentTotal0?.equalTo('0')) {
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
                All Tokens Auctioned.
                <span style={{ color: '#959595' }}>Congratulations! Your auction is complete. Claim fund raised</span>
              </Typography>
            </Box>
          )
        } else if (isCreator) {
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
                src={ErrorIcon}
                style={{ width: '24px', marginRight: '16px', verticalAlign: 'middle' }}
                alt=""
                srcSet=""
              />
              <Typography
                variant="body1"
                sx={{
                  fontFamily: `'Inter'`,
                  fontSize: '14px',
                  color: '#FD3333'
                }}
              >
                Claim back your unswapped tokens and fund raised.
                <span style={{ color: '#959595' }}>Unfortunately, your pool is not fully filled and closed.</span>
              </Typography>
            </Box>
          )
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
              <img
                src={ErrorIcon}
                style={{ width: '24px', marginRight: '16px', verticalAlign: 'middle' }}
                alt=""
                srcSet=""
              />
              <Typography
                variant="body1"
                sx={{
                  fontFamily: `'Inter'`,
                  fontSize: '14px',
                  color: '#FD3333'
                }}
              >
                Claim back your tokens and fund raised.
              </Typography>
            </Box>
          )
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
