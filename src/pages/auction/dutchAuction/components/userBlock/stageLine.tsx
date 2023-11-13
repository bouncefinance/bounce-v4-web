import { Box, Typography } from '@mui/material'
import { DutchAuctionPoolProp, Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { CurrencyAmount } from 'constants/token'
import { useMemo, useEffect } from 'react'
import moment from 'moment'
import BigNumber from 'bignumber.js'
import { ReactComponent as ActiveIcon } from 'assets/imgs/dutchAuction/active.svg'
import { ReactComponent as DisActiveIcon } from 'assets/imgs/dutchAuction/disactive.svg'
const StageLine = ({
  poolInfo,
  style
}: {
  poolInfo: DutchAuctionPoolProp | Erc20EnglishAuctionPoolProp
  style?: React.CSSProperties
}) => {
  const releaseData = useMemo(() => {
    const result = poolInfo.releaseData
      ? poolInfo.releaseData.map(item => {
          const nowDate = new BigNumber(new Date().valueOf())
          const startAtDate = new BigNumber(item.startAt * 1000)
          const isActive = nowDate.comparedTo(startAtDate) === 1
          return {
            startAt: moment(item.startAt * 1000).format('YYYY-MM-DD HH:mm:ss'),
            ratio:
              BigNumber(CurrencyAmount.ether(item.ratio || '0').toExact())
                .times(100)
                .toString() + '%',
            timaSteamp: item.startAt * 1000,
            active: isActive
          }
        })
      : []
    return result
  }, [poolInfo.releaseData])
  const activeIndex = useMemo(() => {
    let lastActiveIndex = 0
    releaseData.map((item, index) => {
      if (item.active) {
        lastActiveIndex = index
      }
    })
    return lastActiveIndex
  }, [releaseData])
  useEffect(() => {
    const stageLineEl = document.getElementById(`stageLine${activeIndex}`)
    if (stageLineEl) {
      stageLineEl?.scrollIntoView(true)
    }
    return () => {}
  }, [activeIndex])
  if (Array.isArray(releaseData) && releaseData.length === 0) {
    return <Box></Box>
  }
  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none'
        },
        ...style
      }}
    >
      {releaseData.map((item, index) => {
        return (
          <Box
            key={index}
            id={'stageLine' + index}
            sx={{
              flex: 1,
              minWidth: '240px',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'flex-start',
              alignItems: 'flex-start'
            }}
          >
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontSize: 12,
                fontWeight: 400,
                color: item.active ? '#fff' : '#959595'
              }}
            >
              Stage {index + 1}
            </Typography>
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontSize: 12,
                fontWeight: 400,
                color: '#959595'
              }}
              mb={'8px'}
            >
              {item.startAt}
            </Typography>
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontSize: 14,
                fontWeight: 600,
                color: item.active ? '#fff' : '#959595'
              }}
              mb={'16px'}
            >
              Release{item.ratio}
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              {item.active ? <ActiveIcon /> : <DisActiveIcon />}
              <Box
                sx={{
                  flex: 1,
                  height: 4,
                  borderRadius: '4px',
                  background: item.active ? '#E1F25C' : '#959595'
                }}
              ></Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
export default StageLine
