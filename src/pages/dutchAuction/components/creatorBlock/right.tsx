import { Box, Typography, Grid, Stack, styled, Button } from '@mui/material'
import { PoolStatus } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import PoolTextItem from '../poolTextItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import { formatNumber } from 'utils/number'
import PoolInfoItem from '../poolInfoItem'
import { RightText } from './auctionInfo'
import { shortenAddress } from 'utils'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { useMemo } from 'react'
import TipsIcon from 'assets/imgs/dutchAuction/tips2.png'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'

const ComBtn = styled(Button)(() => ({
  '&.MuiButtonBase-root': {
    background: 'transparent',
    border: '1px solid #FFFFFF',
    color: '#FFFFFF'
  },
  '&.MuiButtonBase-root:hover': {
    background: '#E1F25C',
    border: '1px solid #E1F25C',
    color: '#121212'
  }
}))
const StatusBox = ({ poolInfo }: { poolInfo: any }) => {
  const { status, openAt, closeAt, claimAt, onEnd } = poolInfo
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate:
      status === PoolStatus.Upcoming
        ? openAt * 1000
        : status === PoolStatus.Live
        ? closeAt * 1000
        : status === PoolStatus.Closed
        ? claimAt * 1000
        : undefined,
    onEnd
  })
  switch (status) {
    case PoolStatus.Upcoming:
      return (
        <Box
          sx={{
            height: '25px',
            lineHeight: '25px',
            padding: '0 12px',
            bgcolor: '#D7D6D9',
            borderRadius: '100px',
            backdropFilter: 'blur(2px)',
            fontFamily: `'Inter'`,
            color: '#626262'
          }}
        >
          {countdown > 0 ? `Upcoming in ${days}d : ${hours}h : ${minutes}m : ${seconds}s` : 'Upcoming'}
        </Box>
      )
    case PoolStatus.Live:
      return (
        <Box
          sx={{
            height: '25px',
            lineHeight: '25px',
            padding: '0 12px',
            bgcolor: '#CFF8D1',
            borderRadius: '100px',
            backdropFilter: 'blur(2px)',
            fontFamily: `'Inter'`,
            color: '#30A359'
          }}
        >
          {countdown > 0 ? `Live ${days}d : ${hours}h : ${minutes}m : ${seconds}s` : 'Upcoming'}
        </Box>
      )
    case PoolStatus.Closed:
    case PoolStatus.Cancelled:
      return (
        <Box
          sx={{
            height: '25px',
            lineHeight: '25px',
            padding: '0 12px',
            bgcolor: '#D6DFF6',
            borderRadius: '100px',
            backdropFilter: 'blur(2px)',
            fontFamily: `'Inter'`,
            color: '#2B51DA'
          }}
        >
          Closed
        </Box>
      )
    default:
      return <></>
  }
}
const TipsBox = ({
  style,
  children,
  iconUrl
}: {
  iconUrl?: string
  style?: React.CSSProperties
  children?: string
}) => (
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
    <img src={iconUrl} style={{ width: '24px', marginRight: '12px', verticalAlign: 'middle' }} alt="" srcSet="" />
    <Typography
      variant="body1"
      sx={{
        fontFamily: `'Inter'`,
        fontSize: '13px',
        color: '#959595'
      }}
    >
      {children}
    </Typography>
  </Box>
)
const Right = ({ poolInfo }: { poolInfo: any }) => {
  const ticketPrice = poolInfo.maxAmount1PerWallet
    ? formatNumber(poolInfo.maxAmount1PerWallet, {
        unit: poolInfo.token0.decimals,
        decimalPlaces: poolInfo.token0.decimals
      })
    : undefined
  const swappedAmount0 = poolInfo.swappedAmount0
    ? formatNumber(poolInfo.swappedAmount0, {
        unit: poolInfo.token1.decimals,
        decimalPlaces: poolInfo.token1.decimals
      })
    : undefined
  const toClaim = () => {
    console.log('toClaim>>>')
  }
  const btnStr = useMemo(() => {
    if (poolInfo.status === PoolStatus.Upcoming || poolInfo.status === PoolStatus.Live) {
      return 'Cancel & Claim tokens'
    } else if (poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled) {
      return Number(poolInfo.currentTotal0) !== 0 ? 'Claim your unswapped tokens and fund raised' : 'Claim fund raised'
    } else {
      return 'Cancel & Claim tokens'
    }
  }, [poolInfo.currentTotal0, poolInfo.status])
  return (
    <Box
      sx={{
        width: '100%',
        background: '#20201E',
        borderRadius: '20px',
        padding: '0 0 24px'
      }}
    >
      <Box
        sx={{
          background: '#E1F25C',
          border: '1px solid rgba(18, 18, 18, 0.06)',
          borderRadius: '20px',
          padding: '24px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: 20,
              color: '#000'
            }}
          >
            My Pool
          </Typography>
          <StatusBox poolInfo={poolInfo} />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 0,
            borderBottom: `1px solid rgba(18, 18, 18, 0.2)`,
            margin: '16px 0'
          }}
        ></Box>
        <Grid container rowGap={'16px'}>
          <Grid xs={6}>
            <PoolTextItem title={'Current floor price'}>
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  1
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo.token1.largeUrl}
                    alt={poolInfo.token1.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    Auction
                  </span>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    =
                  </span>
                  &nbsp; {ticketPrice}
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo.token0.largeUrl}
                    alt={poolInfo.token0.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    {(poolInfo.token0.symbol + '').toUpperCase()}
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
          <Grid xs={6}>
            <PoolTextItem title={'Successful sold amount'} tip={'The amount of token you successfully secured.'}>
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  {swappedAmount0}
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo.token1.largeUrl}
                    alt={poolInfo.token1.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    Auction
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
          <Grid xs={6}>
            <PoolTextItem title={'Estimated funds raised'} tip={'The amount of token you successfully secured.'}>
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  200
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo.token0.largeUrl}
                    alt={poolInfo.token0.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    {(poolInfo.token0.symbol + '').toUpperCase()}
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: '30px 24px'
        }}
      >
        <PoolInfoItem
          title={'Fund receiving wallet'}
          tip={'Fund receiving wallet'}
          sx={{
            marginBottom: '9px'
          }}
        >
          <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
            <RightText>{shortenAddress(poolInfo.creator)}</RightText>
            <CopyToClipboard text={poolInfo.creator} />
          </Stack>
        </PoolInfoItem>
        <PoolInfoItem title={'Platform fee charged'} tip={'Platform fee charged'}>
          <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
            <RightText>
              2.5%
              <span
                style={{
                  color: '#959595'
                }}
              >
                {' '}
                / 0 ETH
              </span>
            </RightText>
          </Stack>
        </PoolInfoItem>
      </Box>
      {(poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled) && (
        <Box
          sx={{
            width: 'calc(100% - 48px)',
            margin: '0 auto 12px',
            padding: '16px',
            border: '1px solid #626262',
            borderRadius: '8px'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600
            }}
            mb={'12px'}
          >
            Final Auction Results
          </Typography>
          <PoolInfoItem
            title={'Fund receiving wallet'}
            sx={{
              marginBottom: '9px'
            }}
          >
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                color: '#E1F25C',
                fontSize: '13px',
                fontWeight: 400
              }}
            >
              0.25 ETH ($0.8035)
            </Typography>
          </PoolInfoItem>
          <PoolInfoItem title={'Fund receiving wallet'}>
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                color: '#E1F25C',
                fontSize: '13px',
                fontWeight: 400
              }}
            >
              700 ETH
            </Typography>
          </PoolInfoItem>
        </Box>
      )}
      <Box
        sx={{
          padding: '0 24px '
        }}
      >
        {!poolInfo.participant.claimed && (
          <ComBtn fullWidth onClick={toClaim} disabled={poolInfo.status === PoolStatus.Live}>
            {btnStr}
          </ComBtn>
        )}
        {poolInfo.status === PoolStatus.Upcoming && (
          <TipsBox
            iconUrl={TipsIcon}
            style={{
              marginTop: '16px'
            }}
          >
            You can only claim your fund raised after your auction is finished. There is a 2.5% platform feed charged
            automatically from fund raised.
          </TipsBox>
        )}
        {poolInfo.status === PoolStatus.Live && (
          <TipsBox
            iconUrl={TipsIcon}
            style={{
              marginTop: '16px'
            }}
          >
            You can only claim your fund raised after your auction is finished. There is a 2.5% platform feed charged
            automatically from fund raised.
          </TipsBox>
        )}
        {poolInfo.participant.claimed && (
          <TipsBox
            iconUrl={SuccessIcon}
            style={{
              marginTop: '16px'
            }}
          >
            You can only claim your fund raised after your auction is finished. There is a 2.5% platform feed charged
            automatically from fund raised.
          </TipsBox>
        )}
      </Box>
    </Box>
  )
}
export default Right
