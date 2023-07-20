import { Box, Grid, Typography } from '@mui/material'
import LeftBox from '../../creatorBlock/left'
import RightBox from '../right'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
import TokenImage from 'bounceComponents/common/TokenImage'
import { RightText } from '../../creatorBlock/auctionInfo'
import { StatusBox } from 'pages/auction/dutchAuction/components/userBlock/right'
import ClaimBlock from 'pages/auction/dutchAuction/components/userBlock/claimBlock'
import { useMemo } from 'react'
import OthersDetail from '../othersDetail'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import StageLine from 'pages/auction/dutchAuction/components/userBlock/stageLine'
import PoolTextItem from 'pages/auction/dutchAuction/components/poolTextItem'
import PoolInfoItem from 'pages/auction/dutchAuction/components/poolInfoItem'

const Fragment = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isUserJoined = useMemo(
    () => Number(poolInfo?.participant.swappedAmount0),
    [poolInfo?.participant.swappedAmount0]
  )
  const notTimeStage = useMemo(() => {
    let result = poolInfo.releaseData
      ? poolInfo.releaseData.map(item => {
          const nowDate = new BigNumber(new Date().valueOf())
          const startAtDate = new BigNumber(item.startAt * 1000)
          const isActive = nowDate.comparedTo(startAtDate) === 1
          return {
            startAt: moment(item.startAt * 1000).format('YYYY-MM-DD HH:mm:ss'),
            active: isActive
          }
        })
      : []
    result = result.filter(item => !item.active)
    return result
  }, [poolInfo.releaseData])
  if (poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled) {
    return (
      <Box
        sx={{
          flex: 1,
          width: '100%'
        }}
      >
        <StageLine poolInfo={poolInfo} />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderRadius: '20px',
            background: '#20201e'
          }}
          mt={'30px'}
          gap={'30px'}
        >
          <Box
            sx={{
              flex: 1,
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
                      {poolInfo.participant.currencyCurClaimableAmount?.toSignificant()}
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
                        {poolInfo.token0.symbol.toUpperCase()}
                      </span>
                    </Box>
                  </>
                </PoolTextItem>
              </Grid>
              <Grid item xs={6}>
                <PoolTextItem title={'Total stage'}>
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
                      {poolInfo.releaseData?.length || '0'}
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
                      {poolInfo.participant?.currencySwappedAmount0 && poolInfo.participant?.currencyCurReleasableAmount
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
          <Box
            sx={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              minHeight: '226px',
              paddingRight: '24px',
              paddingBottom: '24px'
            }}
          >
            <Box
              sx={{
                padding: '24px 0 0',
                width: '100%'
              }}
            >
              <PoolInfoItem title={'Next claim time'}>
                <RightText
                  style={{
                    color: '#fff'
                  }}
                >
                  {notTimeStage?.[0]?.startAt || 'Is Done'}
                </RightText>
              </PoolInfoItem>
              <PoolInfoItem title={'remaining stage'}>
                <RightText
                  style={{
                    color: '#fff'
                  }}
                >
                  {notTimeStage.length || 0}
                </RightText>
              </PoolInfoItem>
            </Box>
            {isUserJoined && (
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
            )}
          </Box>
        </Box>
        <OthersDetail poolInfo={poolInfo} />
      </Box>
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
export default Fragment
