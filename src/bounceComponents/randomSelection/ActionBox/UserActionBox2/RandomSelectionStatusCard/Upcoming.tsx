import { Box, Typography } from '@mui/material'
import Image from 'components/Image'
import { FixedSwapPoolProp } from 'api/pool/type'
import Logo from 'assets/imgs/randomSelection/logo.png'
import TypeIcon from 'assets/imgs/randomSelection/typeIcon.png'
import BigNumber from 'bignumber.js'
import { formatNumber } from 'utils/number'
import PoolProgress from 'bounceComponents/common/PoolProgress'
import { AuctionProgressPrimaryColor } from 'constants/auction/color'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import { useEffect, useState } from 'react'
import useBreakpoint from 'hooks/useBreakpoint'

const UpcomingCard = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }) => {
  const [zoomNum, setZoomNum] = useState(1)
  const isSm = useBreakpoint('sm')
  const handleZoom = () => {
    if (isSm) {
      const w = window.innerWidth
      setZoomNum((w - 55) / 444)
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
  return (
    <>
      <Box
        sx={{
          width: 444,
          height: 216,
          display: 'flex',
          flexFlow: 'row nowrap',
          overflow: 'hidden',
          margin: '0 auto 30px',
          zoom: zoomNum
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 122,
            height: 216,
            background: '#2B51DA',
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
              color: '#E8E8E8',
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
            background: '#2B51DA',
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
                  color: '#E8E8E8',
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
                  color: '#fff'
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
                  color: '#E8E8E8',
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
                  color: '#fff'
                }}
              >
                {singleShare}
                <span
                  style={{
                    fontSize: 12,
                    marginLeft: 8
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
              background: '#4568E4',
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
                color: '#E8E8E8',
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
                color: '#fff',
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
                color: '#fff'
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
      <Box>
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
    </>
  )
}

export default UpcomingCard
