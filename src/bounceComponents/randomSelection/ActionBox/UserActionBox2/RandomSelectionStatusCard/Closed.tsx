import { Box, Typography } from '@mui/material'
import Image from 'components/Image'
import { FixedSwapPoolProp } from 'api/pool/type'
import Logo from 'assets/imgs/randomSelection/logoGray.png'
import TypeIcon from 'assets/imgs/randomSelection/typeIconGray.png'
import WarningIcon from 'assets/imgs/randomSelection/warning.png'
import NotWinIcon from 'assets/imgs/randomSelection/Failed.png'
import WinIcon from 'assets/imgs/randomSelection/Win.png'

import BigNumber from 'bignumber.js'
import { formatNumber } from 'utils/number'
import PoolProgress from 'bounceComponents/common/PoolProgress'
import { AuctionProgressPrimaryColor } from 'constants/auction/color'
import { UserAction } from '../ActionBlock'
import ClaimButton from '../ClaimButton'
import { NoJoinedCardMobile } from './NoJoinedCardMobile'
import useBreakpoint from '../../../../../hooks/useBreakpoint'
import SuccessfullyClaimedAlert from 'bounceComponents/fixed-swap/Alerts/SuccessfullyClaimedAlert'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import ClaimingCountdownButton from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/ClaimingCountdownButton'

const ClosedCard = ({
  poolInfo,
  isJoined,
  action,
  toClaim,
  submitted,
  getPoolInfo,
  isWinnerSeedDone,
  isWinner
}: {
  poolInfo: FixedSwapPoolProp
  isJoined: boolean
  action: UserAction
  toClaim: () => void
  submitted: boolean
  getPoolInfo: () => void
  isWinnerSeedDone?: boolean
  isWinner?: boolean
}) => {
  const isMobile = useBreakpoint('lg')
  const singleShare = poolInfo.totalShare
    ? formatNumber(new BigNumber(poolInfo.amountTotal0).div(poolInfo.totalShare).toString(), {
        unit: poolInfo.token0.decimals,
        decimalPlaces: poolInfo.token0.decimals
      })
    : undefined
  const swapedPercent =
    poolInfo?.curPlayer && poolInfo.maxPlayere
      ? new BigNumber(poolInfo.curPlayer).div(poolInfo.maxPlayere).times(100).toNumber()
      : undefined
  const NoJoinedCard = () => {
    return (
      <>
        {isMobile ? (
          <NoJoinedCardMobile poolInfo={poolInfo} singleShare={singleShare} />
        ) : (
          <>
            <Box
              sx={{
                width: 444,
                height: 216,
                display: 'flex',
                flexFlow: 'row nowrap',
                overflow: 'hidden',
                marginBottom: 30
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 122,
                  height: 216,
                  background: '#f5f5f5',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '4px',
                  borderRight: '1px dashed #FFFFFF'
                }}
              >
                <Image src={Logo} width={50} height={50} />
                <Typography
                  sx={{
                    position: 'absolute',
                    left: 0,
                    bottom: '12px',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                    fontWeight: 400,
                    fontSize: 12,
                    color: '#DFDFDF',
                    transform: 'scale(0.8)'
                  }}
                >
                  Random selection
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '-30px',
                    top: '50%',
                    width: 41,
                    height: 21,
                    marginTop: '-11px',
                    background: '#fff',
                    borderRadius: '50%'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    right: '-1px',
                    top: '0',
                    width: 0,
                    height: 0,
                    border: '8px solid',
                    borderColor: `#fff #fff transparent transparent`
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    right: '-1px',
                    bottom: '0',
                    width: 0,
                    height: 0,
                    border: '8px solid',
                    borderColor: `transparent #fff #fff transparent`
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  width: 322,
                  height: 216,
                  background: '#f5f5f5',
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '4px',
                  padding: '0 15px 0 10px'
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '10px'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      flex: 1,
                      height: 93,
                      display: 'flex',
                      flexFlow: 'column nowrap',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      borderBottom: '1px dashed #FFFFFF',
                      paddingLeft: 20
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: 12,
                        color: '#DFDFDF',
                        marginBottom: 10
                      }}
                    >
                      Number of winners
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                        fontWeight: 400,
                        fontSize: 28,
                        color: '#DFDFDF'
                      }}
                    >
                      {poolInfo.totalShare}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      flex: 1,
                      height: 93,
                      display: 'flex',
                      flexFlow: 'column nowrap',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: 20
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: 12,
                        color: '#DFDFDF',
                        marginBottom: 10
                      }}
                    >
                      Token per ticket
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                        fontWeight: 400,
                        fontSize: 28,
                        color: '#DFDFDF'
                      }}
                    >
                      {singleShare}
                      <span
                        style={{
                          fontSize: 12,
                          marginLeft: 8,
                          color: '#DFDFDF'
                        }}
                      >
                        {poolInfo.token0.symbol}
                      </span>
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 113,
                    height: 186,
                    background: '#FDFDFD',
                    borderRadius: '6px',
                    paddingTop: 12,
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                      fontWeight: 400,
                      fontSize: 12,
                      color: '#DFDFDF',
                      textAlign: 'center',
                      marginBottom: 20
                    }}
                  >
                    Ticket price
                  </Typography>
                  <Image
                    src={TypeIcon}
                    width={41}
                    height={41}
                    style={{
                      marginBottom: 19
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                      fontWeight: 400,
                      fontSize: 28,
                      color: '#DFDFDF',
                      marginBottom: 5
                    }}
                  >
                    {formatNumber(poolInfo.maxAmount1PerWallet, {
                      unit: poolInfo.token1.decimals
                    })}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                      fontWeight: 400,
                      fontSize: 12,
                      color: '#DFDFDF'
                    }}
                  >
                    {poolInfo.token1.symbol}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '-1px',
                    top: '0',
                    width: 0,
                    height: 0,
                    border: '8px solid',
                    borderColor: `#fff transparent transparent #fff`
                  }}
                ></Box>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '-1px',
                    bottom: '0',
                    width: 0,
                    height: 0,
                    border: '8px solid',
                    borderColor: `transparent transparent #fff #fff`
                  }}
                ></Box>
              </Box>
            </Box>
            <Typography
              sx={{
                color: '#171717',
                fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                fontWeight: 500,
                fontSize: 22,
                textAlign: 'center',
                margin: '27px 0 24px'
              }}
            >
              Lottery Completed
            </Typography>
          </>
        )}
      </>
    )
  }
  const AuctionCloseBtn = () => {
    return (
      <Box
        sx={{
          width: '100%',
          height: 60,
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#F5F5F5',
          borderRadius: '60px',
          cursor: 'pointer'
        }}
      >
        <Image
          src={WarningIcon}
          width={20}
          height={20}
          style={{
            marginRight: 8
          }}
        />
        <Typography
          component="span"
          sx={{ color: '#171717', fontFamily: `'Sharp Grotesk DB Cyr Book 20'`, fontWeight: 400, fontSize: 14 }}
        >
          Auction closed
        </Typography>
      </Box>
    )
  }
  const JoinedNotSelectWin = () => {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Image src={NotWinIcon} width={200} height={250} />
          <Typography
            sx={{
              color: '#171717',
              fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
              fontWeight: 500,
              fontSize: 22,
              textAlign: 'center',
              margin: '27px 0 24px'
            }}
          >
            Sorry! No winner has been selected yet. Please wait.
          </Typography>
        </Box>
      </>
    )
  }
  const JoinedButNotWin = () => {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Image src={NotWinIcon} width={200} height={250} />
          <Typography
            sx={{
              color: '#171717',
              fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
              fontWeight: 500,
              fontSize: 22,
              textAlign: 'center',
              margin: '27px 0 24px'
            }}
          >
            Sorry! You are not selected as a winner
          </Typography>
        </Box>
      </>
    )
  }
  const JoinedAndWin = () => {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Image src={WinIcon} width={200} height={250} />
          <Typography
            sx={{
              color: '#171717',
              fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
              fontWeight: 500,
              fontSize: 22,
              textAlign: 'center',
              margin: '27px 0 24px'
            }}
          >
            You are a Winner
          </Typography>
        </Box>
      </>
    )
  }
  return (
    <>
      {action === 'POOL_CLOSED_AND_NOT_JOINED' && <NoJoinedCard />}
      {isJoined && !isWinnerSeedDone && <JoinedNotSelectWin />}
      {isJoined && isWinnerSeedDone && !isWinner && <JoinedButNotWin />}
      {isJoined && isWinnerSeedDone && isWinner && <JoinedAndWin />}
      <Box
        sx={{
          marginBottom: '30px'
        }}
      >
        <PoolInfoItem title="Number of entries">
          <Box>
            <Typography component="span" sx={{ color: AuctionProgressPrimaryColor[poolInfo.status] }}>
              {poolInfo.curPlayer}
            </Typography>
            <Typography component="span">&nbsp;/ {poolInfo.maxPlayere}</Typography>
          </Box>
        </PoolInfoItem>
        <PoolProgress value={swapedPercent} sx={{ mt: 12 }} poolStatus={poolInfo.status} />
      </Box>
      {action === 'POOL_CLOSED_AND_NOT_JOINED' && <AuctionCloseBtn />}
      {action === 'NEED_TO_CLAIM' && (
        <ClaimButton onClick={toClaim} loading={submitted} isWinnerSeedDone={isWinnerSeedDone} />
      )}
      {action === 'CLAIMED' && <SuccessfullyClaimedAlert />}
      {action === 'WAIT_FOR_DELAY' && <ClaimingCountdownButton claimAt={poolInfo.claimAt} getPoolInfo={getPoolInfo} />}
    </>
  )
}

export default ClosedCard
