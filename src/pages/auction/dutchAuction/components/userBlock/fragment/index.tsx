import { Box, Grid, Typography } from '@mui/material'
import { DutchAuctionPoolProp, PoolStatus } from 'api/pool/type'
import { useIsUserJoinedDutchPool } from 'bounceHooks/auction/useIsUserJoinedPool'
import TokenImage from 'bounceComponents/common/TokenImage'
import { StatusBox } from '../../userBlock/right'
import PoolTextItem from '../../poolTextItem'
import PoolInfoItem from '../../poolInfoItem'
import { RightText } from '../../creatorBlock/auctionInfo'
import ClaimBlock from '../../userBlock/claimBlock'
import OthersDetail from '../othersDetail'
import StageLine from '../stageLine'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { useIsMDDown } from 'themes/useTheme'
import OneTime from '../oneTime'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
const Fragment = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const isUserJoined = useIsUserJoinedDutchPool(poolInfo)
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
  const NormalContent = () => {
    if (!account) {
      return <ConnectWalletButton />
    }
    if (!isCurrentChainEqualChainOfPool) {
      return <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
    }
    return (
      <>
        {isUserJoined && (
          <ClaimBlock
            isErc20EnglishAuction={false}
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
      </>
    )
  }
  if (poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled) {
    return (
      <Box
        sx={{
          flex: 1,
          width: '100%'
        }}
      >
        <StageLine
          style={{
            margin: isMd ? '40px 0' : '30px 0'
          }}
          poolInfo={poolInfo}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: isMd ? 'column nowrap' : 'row nowrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderRadius: '20px',
            background: '#20201e',
            paddingBottom: isMd ? '24px' : '0'
          }}
          gap={isMd ? '0' : '30px'}
        >
          <Box
            sx={{
              width: isMd ? '100%' : 'unset',
              flex: isMd ? 'unset' : 1,
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
                  fontFamily: `'Inter'`,
                  fontWeight: 600,
                  fontSize: 20,
                  color: '#000'
                }}
              >
                {isUserJoined
                  ? 'You Joined'
                  : poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled
                  ? 'Pool is done'
                  : 'Join The Pool'}
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
                        fontFamily: `'Inter'`,
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
                        {poolInfo.token0.name.toUpperCase()}
                      </span>
                    </Box>
                  </>
                </PoolTextItem>
              </Grid>
              <Grid item xs={6}>
                <PoolTextItem
                  title={'total stage'}
                  sx={{
                    alignItems: isMd ? 'flex-end' : 'flex-start'
                  }}
                >
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        fontFamily: `'Inter'`,
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
                        fontFamily: `'Inter'`,
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
              width: isMd ? '100%' : 'unset',
              flex: isMd ? 'unset' : 1,
              height: isMd ? 'auto' : '100%',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              minHeight: isMd ? 'unset' : '226px',
              paddingRight: isMd ? '0' : '24px',
              paddingBottom: isMd ? '0' : '24px',
              padding: isMd ? '0 16px' : ''
            }}
            gap={isMd ? '20px' : ''}
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
            <NormalContent />
          </Box>
        </Box>
        <OthersDetail poolInfo={poolInfo} />
      </Box>
    )
  }
  return <OneTime poolInfo={poolInfo} />
}
export default Fragment
