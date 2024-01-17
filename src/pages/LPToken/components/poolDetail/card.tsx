import { Box, Typography } from '@mui/material'
import Image from 'components/Image'
import Logo from 'assets/imgs/randomSelection/logo.png'
import TypeIcon from 'assets/imgs/randomSelection/typeIcon.png'
import NotWinIcon from 'assets/imgs/randomSelection/Failed.png'
import PendingWinIcon from 'assets/imgs/randomSelection/pending_drawn.png'
import { RandomPoolStatus, RandomSelectionLPProps } from 'api/pool/type'
import { useGetRandomSelectionLPPoolStatus } from 'bounceHooks/auction/useRandomSelectionLPPoolInfo'
import useBreakpoint from 'hooks/useBreakpoint'
import { useEffect, useState } from 'react'
import { Currency, CurrencyAmount } from 'constants/token'

const NoJoinedCard = ({
  poolInfo,
  isJoined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isUpcoming,
  isClose
}: {
  isJoined: boolean
  isUpcoming: boolean
  isClose: boolean
  poolInfo: RandomSelectionLPProps
}) => {
  const isSm = useBreakpoint('sm')
  const [zoomNum, setZoomNum] = useState(1)
  const handleZoom = () => {
    if (isSm) {
      const w = window.innerWidth
      const zoom = (w - 32) / 426

      setZoomNum(zoom)
    } else {
      setZoomNum(1)
    }
  }

  useEffect(() => {
    handleZoom()
    window.addEventListener('resize', handleZoom)
    return () => {
      window.removeEventListener('resize', handleZoom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Box
        sx={{
          width: 426,
          height: 207,
          display: 'flex',
          flexFlow: 'row nowrap',
          overflow: 'visible',
          margin: isSm ? '0 auto' : '0 auto 30px',
          zoom: isSm && isJoined ? zoomNum - 0.1 : zoomNum,
          transform: `${isSm && isJoined ? 'translateX(13px)' : 'translateX(0px)'} scale(1) `,
          transformOrigin: '0 0',
          mt: 40,
          mb: 32
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 122,
            height: 216,
            background: '#E1F25C',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            borderRight: '1px dashed #959595',
            transform: isJoined ? 'rotateZ(-10deg)' : 'unset',
            transformOrigin: isJoined ? `bottom right` : 'unset',
            opacity: isClose ? 0.2 : 1
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: 22,
              transform: 'translateX(-50%)'
            }}
          >
            <Image src={Logo} width={50} height={50} />
          </Box>
          {Number(poolInfo.curPlayer) > 0 ? (
            <Typography
              sx={{
                position: 'absolute',
                left: '0',
                top: '43%',
                transform: 'translate(0%,0%) scale(0.8)',
                width: '100%',
                textAlign: 'center',
                fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                fontWeight: 400,
                fontSize: 12,
                color: '#959595'
              }}
            >
              {(100 / Number(poolInfo.totalShare)).toFixed(2)} % of the
              <br /> LP pool
              <br /> revenue
            </Typography>
          ) : (
            <></>
          )}
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
              color: '#959595',
              transform: 'scale(0.8)'
            }}
          >
            Random <br /> selection
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
          ></Box>
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
          ></Box>
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
          ></Box>
        </Box>
        <Box
          sx={{
            position: 'relative',
            width: 322,
            height: 216,
            background: '#E1F25C',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            padding: '0 15px 0 10px',
            borderLeft: isJoined ? '1px dashed #959595' : 'unset',
            opacity: isClose ? 0.2 : 1
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
                borderBottom: '1px dashed #959595',
                paddingLeft: 20
              }}
            >
              <Typography
                sx={{
                  fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                  fontWeight: 400,
                  fontSize: isSm ? 10 : 13,
                  color: '#959595'
                  // marginBottom: 10
                }}
              >
                Number of winners
              </Typography>
              <Typography
                sx={{
                  fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                  fontWeight: 400,
                  fontSize: isSm ? 24 : 28,
                  color: '#121212'
                }}
              >
                {poolInfo.totalShare || '--'}
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
                  fontSize: isSm ? 10 : 13,
                  color: '#959595'
                  // marginBottom: 10
                }}
              >
                Total lottery tickets
              </Typography>
              <Typography
                sx={{
                  fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                  fontWeight: 400,
                  fontSize: isSm ? 24 : 28,
                  color: '#121212'
                }}
              >
                {CurrencyAmount.fromAmount(Currency.getNativeCurrency(), poolInfo.maxPlayere || '0')?.toSignificant() ||
                  '--'}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: 113,
              height: 186,
              background: '#A4D220',
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
                fontSize: isSm ? 10 : 13,
                color: '#959595',
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
                fontSize: 24,
                color: '#121212',
                marginBottom: 5,
                letterSpacing: 0
              }}
            >
              10
            </Typography>
            <Typography
              sx={{
                fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                fontWeight: 400,
                fontSize: isSm ? 10 : 13,
                color: '#959595'
              }}
            >
              AUCTION
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
        {isClose && (
          <Box sx={{ width: '100%', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
            <Typography
              sx={{
                color: 'var(--blue-d, #2B51DA)',
                textAlign: 'center',
                leadingTrim: 'both',
                textEdge: 'cap',

                /* D/H3 */
                fontFamily: 'Public Sans',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '130%' /* 36.4px */,
                letterSpacing: '-0.56px',
                textTransform: 'capitalize'
              }}
            >
              Lottery Completed
            </Typography>
          </Box>
        )}
      </Box>
    </>
  )
}
const NoWinnerCard = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          mt: 40,
          mb: 32
        }}
      >
        <Typography
          sx={{
            color: '#121212',
            textAlign: 'center',
            fontFamily: 'Public Sans',
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '140%' /* 28px */,
            letterSpacing: '-0.4px'
          }}
        >
          Sorry! You are not selected as a winner
        </Typography>
        <Image src={NotWinIcon} width={200} height={250} style={{ marginTop: 16 }} />
      </Box>
    </>
  )
}
const WaitLotteryDraw = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          mt: 40,
          mb: 16
        }}
      >
        <Image src={PendingWinIcon} height={250} />
      </Box>
    </>
  )
}

const PoolCard = ({ poolInfo }: { poolInfo: RandomSelectionLPProps }) => {
  const { poolStatus, isUserJoined, isWinnerSeedDone, isUserWinner } = useGetRandomSelectionLPPoolStatus(poolInfo)
  if (isUserJoined && poolStatus === RandomPoolStatus.Waiting && !isWinnerSeedDone) {
    return <WaitLotteryDraw />
  }
  if (isUserJoined && !isUserWinner && isWinnerSeedDone) {
    return <NoWinnerCard />
  }
  return (
    <NoJoinedCard
      poolInfo={poolInfo}
      isJoined={isUserJoined}
      isUpcoming={poolStatus === RandomPoolStatus.Upcoming}
      isClose={poolStatus === RandomPoolStatus.Closed || poolStatus === RandomPoolStatus.Waiting}
    />
  )
}

export default PoolCard
