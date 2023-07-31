import { Box, Typography } from '@mui/material'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
import WarningIcon from 'assets/imgs/dutchAuction/warning.png'
import TipsIcon from 'assets/imgs/dutchAuction/tips.png'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import ErrorIcon from 'assets/imgs/dutchAuction/error.png'
import { useMemo } from 'react'
import { useIsMDDown } from 'themes/useTheme'
import { useActiveWeb3React } from 'hooks'
export interface PoolStatusBoxProps {
  status: PoolStatus
  style?: React.CSSProperties
  hiddenStatus?: boolean
  poolInfo: Erc20EnglishAuctionPoolProp
}
const UserPoolStatusBox = ({ status, style, hiddenStatus = false, poolInfo }: PoolStatusBoxProps) => {
  const isMd = useIsMDDown()
  const { enableWhiteList, whitelistData } = poolInfo
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const isUserJoined = useMemo(
    () => Number(poolInfo?.participant.swappedAmount0),
    [poolInfo?.participant.swappedAmount0]
  )
  if (hiddenStatus || !account || !isCurrentChainEqualChainOfPool) {
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
              padding: isMd ? '16px' : '16px 24px',
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
                width: 'fit-content',
                fontFamily: `'Inter'`,
                fontSize: '14px',
                color: '#fff'
              }}
            >
              The auction has not started yet.
              <span style={{ color: '#959595' }}> Please wait patiently until your auction starts.</span>
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
              padding: isMd ? '16px' : '16px 24px',
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
                padding: isMd ? '16px' : '16px 24px',
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
          padding: isMd ? '16px' : '16px 24px',
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
