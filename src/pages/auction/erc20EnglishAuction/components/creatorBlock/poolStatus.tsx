import { Box, Typography } from '@mui/material'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
import WarningIcon from 'assets/imgs/dutchAuction/warning.png'
import TipsIcon from 'assets/imgs/dutchAuction/tips.png'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import ErrorIcon from 'assets/imgs/dutchAuction/error.png'

export interface PoolStatusBoxProps {
  status: PoolStatus
  style?: React.CSSProperties
  hiddenStatus?: boolean
  poolInfo: Erc20EnglishAuctionPoolProp
}
const CreatorPoolStatusBox = ({ status, style, hiddenStatus = false, poolInfo }: PoolStatusBoxProps) => {
  if (hiddenStatus) {
    return <Box></Box>
  }
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
          mb={'24px'}
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
              fontFamily: `'Inter'`,
              fontSize: '14px',
              color: '#fff'
            }}
          >
            The auction has not started yet.{' '}
            <span style={{ color: '#959595' }}>Please wait patiently until your auction starts.</span>
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
            border: '1px solid #626262',
            padding: '16px 24px',
            ...style
          }}
          mb={'24px'}
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
      if (poolInfo?.currencySwappedAmount0 && poolInfo.currencyAmountTotal0.equalTo(poolInfo?.currencySwappedAmount0)) {
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
            mb={'24px'}
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
            mb={'24px'}
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
      }
    default:
      return <></>
  }
}
export default CreatorPoolStatusBox
