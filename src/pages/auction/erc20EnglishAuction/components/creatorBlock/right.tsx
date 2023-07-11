import { Box, Typography, Grid, Stack } from '@mui/material'
import { PoolStatus } from 'api/pool/type'
import PoolTextItem from '../poolTextItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import PoolInfoItem from '../poolInfoItem'
import { RightText } from './auctionInfo'
import { shortenAddress } from 'utils'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import ClaimBlock from './ClaimBlock'
import TipsIcon from 'assets/imgs/dutchAuction/tips2.png'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import BigNumber from 'bignumber.js'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { useErc20EnglishAuctionPoolInfo } from '../../ValuesProvider'

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
const Right = () => {
  const { data: poolInfo } = useErc20EnglishAuctionPoolInfo()
  if (!poolInfo) return <></>

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
          <PoolStatusBox
            showCreatorClaim={poolInfo.creatorClaimed === false}
            status={poolInfo?.status}
            openTime={poolInfo?.openAt}
            claimAt={poolInfo?.claimAt}
            closeTime={poolInfo?.closeAt}
          />
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
          {poolInfo.status !== PoolStatus.Closed && (
            <Grid item xs={6}>
              <PoolTextItem title={'Current price'}>
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
                      src={poolInfo?.token0.largeUrl}
                      alt={poolInfo?.token0.symbol}
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
                      {poolInfo?.token0.symbol.toUpperCase()}
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
                    &nbsp; {poolInfo?.currencyCurrentPrice?.toSignificant()}
                    <TokenImage
                      sx={{
                        margin: '0 4px'
                      }}
                      src={poolInfo?.token1.largeUrl}
                      alt={poolInfo?.token1.symbol}
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
                      {(poolInfo?.token1.symbol + '').toUpperCase()}
                    </span>
                  </Box>
                </>
              </PoolTextItem>
            </Grid>
          )}

          <Grid item xs={6}>
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
                  {poolInfo?.currencySwappedAmount0?.toSignificant()}
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo?.token0.largeUrl}
                    alt={poolInfo?.token0.symbol}
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
                    {poolInfo?.token0.symbol.toUpperCase()}
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
          <Grid item xs={6}>
            <PoolTextItem title={'Successful funds raised'} tip={'The amount of token you successfully secured.'}>
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
                  {poolInfo?.currencySwappedAmount1?.toExact()}
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo?.token1.largeUrl}
                    alt={poolInfo?.token1.symbol}
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
                    {(poolInfo?.token1.symbol + '').toUpperCase()}
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
          {poolInfo.status === PoolStatus.Closed && (
            <Grid item xs={6}>
              <PoolTextItem title={'Average price'}>
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
                    {poolInfo?.currencyCurrentPrice?.toExact()}
                    <TokenImage
                      sx={{
                        margin: '0 4px'
                      }}
                      src={poolInfo?.token1.largeUrl}
                      alt={poolInfo?.token1.symbol}
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
                      {(poolInfo?.token1.symbol + '').toUpperCase()}
                    </span>
                  </Box>
                </>
              </PoolTextItem>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box padding="30px 24px">
        <PoolInfoItem
          title={'Fund receiving wallet'}
          tip={'Fund receiving wallet'}
          sx={{
            marginBottom: '9px'
          }}
        >
          <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
            <RightText>{shortenAddress(poolInfo?.creator || '')}</RightText>
            <CopyToClipboard text={poolInfo?.creator || ''} />
          </Stack>
        </PoolInfoItem>
        <PoolInfoItem title={'Platform fee charged'} tip={'Platform fee charged'}>
          <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
            <RightText>
              {poolInfo.currencySwappedAmount1 &&
                new BigNumber(poolInfo.currencySwappedAmount1.toExact())
                  .times(new BigNumber(25))
                  .div(new BigNumber(1000))
                  .toFixed()}
              {poolInfo.token1.symbol.toUpperCase()}
            </RightText>
          </Stack>
        </PoolInfoItem>
      </Box>
      {(poolInfo?.status === PoolStatus.Closed || poolInfo?.status === PoolStatus.Cancelled) && (
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
            title={'Average Price'}
            sx={{
              marginBottom: '9px'
            }}
          >
            <RightText
              style={{
                color: '#E1F25C'
              }}
            >
              {poolInfo.currencyCurrentPrice?.toExact()}
              {poolInfo.token1.symbol}
            </RightText>
          </PoolInfoItem>
          <PoolInfoItem title={'Successful Funds Raised'}>
            <RightText
              style={{
                color: '#E1F25C'
              }}
            >
              {poolInfo.currencySwappedAmount1?.toExact() || '--'} {poolInfo.token1.symbol}
            </RightText>
          </PoolInfoItem>
          {poolInfo.participant.currencySwappedAmount0?.greaterThan('0') && (
            <PoolInfoItem title={'Excessive Paid Amount'}>
              <RightText
                style={{
                  color: '#E1F25C'
                }}
              >
                {(poolInfo.participant?.currencySwappedAmount0?.toExact() || 0) +
                  ' ' +
                  poolInfo.token1.symbol.toUpperCase()}
              </RightText>
            </PoolInfoItem>
          )}
        </Box>
      )}
      <Box
        sx={{
          padding: '0 24px '
        }}
      >
        <ClaimBlock />
        {poolInfo?.status === PoolStatus.Upcoming && (
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
        {poolInfo?.status === PoolStatus.Live && (
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
        {poolInfo?.status === PoolStatus.Closed && poolInfo?.creatorClaimed && (
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
