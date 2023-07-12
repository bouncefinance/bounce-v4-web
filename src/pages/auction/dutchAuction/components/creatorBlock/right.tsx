import { Box, Typography, Stack } from '@mui/material'
import { PoolStatus } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import PoolInfoItem from '../poolInfoItem'
import { RightText } from './auctionInfo'
import { shortenAddress } from 'utils'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { DutchAuctionPoolProp } from 'api/pool/type'
import ClaimBlock from './claimBlcok'
import TipsIcon from 'assets/imgs/dutchAuction/tips2.png'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import PoolSaleInfo from './poolSaleInfo'
export const StatusBox = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const { status, openAt, closeAt, claimAt } = poolInfo
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate:
      status === PoolStatus.Upcoming
        ? openAt * 1000
        : status === PoolStatus.Live
        ? closeAt * 1000
        : status === PoolStatus.Closed
        ? claimAt * 1000
        : undefined
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
export const TipsBox = ({
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
const Right = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  return (
    <Box
      sx={{
        width: '100%',
        background: '#20201E',
        borderRadius: '20px',
        padding: '0 0 24px'
      }}
    >
      <PoolSaleInfo poolInfo={poolInfo} />
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
        <PoolInfoItem title={'Platform fee charged'} tip={'The amount of fee paid to platform.'}>
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
      <Box
        sx={{
          padding: '0 24px '
        }}
      >
        {/* claim block */}
        <ClaimBlock poolInfo={poolInfo} />
        {/* upcoming tips */}
        {poolInfo.status === PoolStatus.Upcoming && (
          <TipsBox
            iconUrl={TipsIcon}
            style={{
              marginTop: '16px'
            }}
          >
            After the start of the auction you can only claim your fund raised after your auction is finished. There is
            a 2.5% platform feed charged automatically from fund raised.
          </TipsBox>
        )}
        {/* live tips */}
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
        {/* success tips */}
        {poolInfo.status === PoolStatus.Closed && poolInfo.creatorClaimed && (
          <TipsBox
            iconUrl={SuccessIcon}
            style={{
              marginTop: '16px'
            }}
          >
            You have successfully claimed your tokens. See you next time!
          </TipsBox>
        )}
      </Box>
    </Box>
  )
}
export default Right
