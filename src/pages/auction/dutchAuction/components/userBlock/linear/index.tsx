import { Box, Grid, Typography } from '@mui/material'
import LeftBox from '../../creatorBlock/left'
import RightBox from '../right'
import { DutchAuctionPoolProp, PoolStatus } from 'api/pool/type'
// import Stepper from '../stepper'
import { useIsUserJoinedDutchPool } from 'bounceHooks/auction/useIsUserJoinedPool'
import TokenImage from 'bounceComponents/common/TokenImage'
import { StatusBox } from '../../userBlock/right'
import PoolTextItem from '../../poolTextItem'
import OthersDetail from '../othersDetail'
import moment from 'moment'
import LineClaimChart from '../lineClaimChart'
import ClaimBlock from '../../userBlock/claimBlock'

const Linear = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const isUserJoined = useIsUserJoinedDutchPool(poolInfo)
  if (poolInfo.status === PoolStatus.Closed) {
    return (
      <>
        {/* <Stepper poolInfo={poolInfo} /> */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
          mt={'30px'}
          gap={'30px'}
        >
          <Box
            sx={{
              flex: 1,
              height: '100%',
              minHeight: '226px',
              paddingRight: '24px'
            }}
          >
            <LineClaimChart poolInfo={poolInfo} />
          </Box>
          <Box
            sx={{
              flex: 1,
              borderRadius: '20px',
              background: '#20201e',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              maxWidth: 380
            }}
          >
            <Box
              sx={{
                width: '100%',
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
                  {!isUserJoined ? 'Join The Pool' : 'You Joined'}
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
                <Grid item xs={6}>
                  <PoolTextItem title={'release start date'}>
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
                        {poolInfo.releaseData?.[0]?.startAt
                          ? moment(poolInfo.releaseData?.[0]?.startAt * 1000).format('YYYY-MM-DD HH:mm')
                          : '--'}
                      </Box>
                    </>
                  </PoolTextItem>
                </Grid>
                <Grid item xs={6}>
                  <PoolTextItem title={'release end date'}>
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
                        {poolInfo.releaseData?.[0]?.endAt
                          ? moment(poolInfo.releaseData?.[0]?.endAt * 1000).format('YYYY-MM-DD HH:mm')
                          : '--'}
                      </Box>
                    </>
                  </PoolTextItem>
                </Grid>
                <Grid item xs={6}>
                  <PoolTextItem title={'Token Available to Claim'}>
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
                        {poolInfo.participant?.currencyCurClaimableAmount
                          ? poolInfo.participant?.currencyCurClaimableAmount.toSignificant()
                          : '--'}
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
                <Grid item xs={6}>
                  <PoolTextItem title={'Remaining Locked token'}>
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
                        {poolInfo.participant?.currencySwappedAmount0 &&
                        poolInfo.participant?.currencyCurReleasableAmount
                          ? poolInfo.participant?.currencySwappedAmount0
                              ?.subtract(poolInfo.participant?.currencyCurReleasableAmount)
                              .toSignificant()
                          : '--'}
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
            {isUserJoined && (
              <Box
                sx={{
                  width: 'calc(100% - 48px)',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto',
                  padding: '30px 0 24px'
                }}
              >
                <ClaimBlock
                  style={{
                    padding: '0'
                  }}
                  notTimeStyle={{
                    width: '100%',
                    padding: '0 24px',
                    margin: 0
                  }}
                  poolInfo={poolInfo}
                />
              </Box>
            )}
          </Box>
        </Box>
        <OthersDetail poolInfo={poolInfo} />
      </>
    )
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '30px'
      }}
      gap={'30px'}
    >
      <Box
        sx={{
          flex: 400
        }}
      >
        <LeftBox poolInfo={poolInfo} />
      </Box>
      <Box
        sx={{
          flex: 474
        }}
      >
        <RightBox poolInfo={poolInfo} />
      </Box>
    </Box>
  )
}
export default Linear
