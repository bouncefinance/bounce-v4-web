import { Box, Typography } from '@mui/material'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { useState } from 'react'
import Line from '../lineChart'
import AuctionInfo from '../creatorBlock/auctionInfo'
import { ReactComponent as ArrowIcon } from 'assets/imgs/dutchAuction/yellowArrowIcon.svg'
import { useIsMDDown } from 'themes/useTheme'
const OthersDetail = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  const [isSlide, setIsSlide] = useState(true)
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: '8px',
        marginTop: '30px',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '54px',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          background: '#626262',
          padding: '0 24px',
          borderRadius: '8px 8px 0 0'
        }}
        onClick={() => {
          setIsSlide(!isSlide)
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontSize: 16,
            fontWeight: 500,
            color: '#E1F25C'
          }}
        >
          Others Detail
        </Typography>
        <ArrowIcon
          style={{
            transform: `rotateZ(${isSlide ? '180deg' : '0'})`
          }}
        />
      </Box>
      {isSlide && (
        <Box
          sx={{
            width: '100%',
            background: '#20201E',
            display: 'flex',
            flexFlow: isMd ? 'column nowrap' : 'row nowrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: isMd ? '0 16px 16px' : '0 24px 24px',
            overflow: 'hidden'
          }}
          gap={'30px'}
        >
          <Box
            sx={{
              width: isMd ? '100%' : 'unset',
              flex: isMd ? 'unset' : 1
            }}
          >
            <Line poolInfo={poolInfo} />
          </Box>
          <Box
            sx={{
              width: isMd ? '100%' : 'unset',
              flex: isMd ? 'unset' : 1
            }}
          >
            <AuctionInfo />
          </Box>
        </Box>
      )}
    </Box>
  )
}
export default OthersDetail
