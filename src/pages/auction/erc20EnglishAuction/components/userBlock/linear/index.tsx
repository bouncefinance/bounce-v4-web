import { Box, Grid, Typography } from '@mui/material'
import LeftBox from '../../creatorBlock/left'
import RightBox from '../right'
import { PoolStatus } from 'api/pool/type'
import TokenImage from 'bounceComponents/common/TokenImage'
import moment from 'moment'
import { useErc20EnglishAuctionPoolInfo } from 'pages/auction/erc20EnglishAuction/ValuesProvider'
import { useMemo } from 'react'
import { StatusBox } from 'pages/auction/dutchAuction/components/userBlock/right'
import ClaimBlock from 'pages/auction/dutchAuction/components/userBlock/claimBlock'
import OthersDetail from '../othersDetail'
import LineClaimChart from '../lineClaimChart'
import PoolTextItem from 'pages/auction/dutchAuction/components/poolTextItem'

const Linear = () => {
  const { data: poolInfo } = useErc20EnglishAuctionPoolInfo()
  const isUserJoined = useMemo(
    () => Number(poolInfo?.participant.swappedAmount0),
    [poolInfo?.participant.swappedAmount0]
  )
  if (poolInfo?.status === PoolStatus.Closed) {
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
                  <PoolTextItem title={'Release start date'}>
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
                  <PoolTextItem title={'Release end date'}>
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
                        poolInfo.participant?.currencyCurClaimableAmount
                          ? poolInfo.participant?.currencySwappedAmount0
                              ?.subtract(poolInfo.participant?.currencyCurClaimableAmount)
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
                  isErc20EnglishAuction={true}
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
        <LeftBox />
      </Box>
      <Box
        sx={{
          flex: 474
        }}
      >
        <RightBox />
      </Box>
    </Box>
  )
}
export default Linear
