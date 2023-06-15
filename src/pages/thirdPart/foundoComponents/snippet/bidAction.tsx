import { Box, ButtonBase, Stack, Typography, styled } from '@mui/material'
import { useState, useMemo } from 'react'
import LogoIcon from 'assets/imgs/thirdPart/foundoDetail/chart.png'
import BidIcon from 'assets/imgs/thirdPart/foundoDetail/bidIcon.svg'
import WinTips from 'assets/imgs/thirdPart/foundoDetail/winTips.png'
import DidDialog from './bidDialog'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'

import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import TokenImage from 'bounceComponents/common/TokenImage'
import PriceChartView from 'bounceComponents/englishAuction/PriceChartView'
export enum BidType {
  'dataView' = 0,
  'chartView' = 1
}
interface DataViewParam {
  priceFloor: number | string
  increase: number | string
}
export const RowLabel = styled(Box)(() => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  '.label': {
    color: 'var(--ps-text-2)',
    fontFamily: `'Public Sans'`,
    fontWeight: 500,
    fontSize: 16
  },
  '.value': {
    color: 'var(--ps-text-5)',
    fontFamily: `'Public Sans'`,
    fontWeight: 500,
    fontSize: 16
  }
}))
export const BidBtn = styled(ButtonBase)(() => ({
  display: 'flex',
  width: '100%',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #959595',
  borderRadius: '100px',
  height: '56px',
  cursor: 'pointer'
}))
function DataView(props: DataViewParam) {
  const { priceFloor, increase } = props
  return (
    <Stack
      spacing={16}
      sx={{
        padding: '48px 0 24px'
      }}
    >
      <RowLabel>
        <Typography className="label">Auction Type</Typography>
        <Typography className="value">English Auction</Typography>
      </RowLabel>
      <RowLabel>
        <Typography className="label">Price Floor</Typography>
        <Typography className="value">{priceFloor}</Typography>
      </RowLabel>
      <RowLabel>
        <Typography className="label">Every time Minimum Price Increase</Typography>
        <Typography className="value">{increase}</Typography>
      </RowLabel>
    </Stack>
  )
}

const LiveStr = styled(Typography)(() => ({
  display: 'inline-block',
  fontFamily: `'Public Sans'`,
  fontWeight: 600,
  fontSize: 28,
  color: 'var(--ps-green-1)'
}))
const UpcomingStatus = (props: { OpenAt: string | number; text?: string }) => {
  const { OpenAt, text } = props
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: Number(OpenAt) * 1000
  })
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex'
      }}
      gap={'8px'}
    >
      {countdown > 0 ? (
        <>
          <LiveStr>{text || 'Live'} </LiveStr>
          <LiveStr>{days}d</LiveStr>
          <LiveStr>:</LiveStr>
          <LiveStr>{hours}h</LiveStr>
          <LiveStr>:</LiveStr>
          <LiveStr>{minutes}m </LiveStr>
          <LiveStr>:</LiveStr>
          <LiveStr>{seconds}s </LiveStr>
        </>
      ) : (
        <></>
      )}
    </Box>
  )
}
const BidAction = () => {
  const [viewType, setViewType] = useState<BidType>(BidType.dataView)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const { data: poolInfo } = useEnglishAuctionPoolInfo()

  const OpenAt = useMemo(() => poolInfo?.openAt || 0, [poolInfo?.openAt])

  const poolStatus = useMemo(() => poolInfo?.status, [poolInfo?.status])
  return (
    <Box
      sx={{
        width: '640px'
      }}
    >
      {/* Pool Status */}
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Pool Status */}
        {poolStatus === PoolStatus.Upcoming && <UpcomingStatus OpenAt={OpenAt || 0} />}
        {poolStatus === PoolStatus.Closed && (
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: 28,
              color: '#FD3333'
            }}
          >
            Close
          </Typography>
        )}
        {poolStatus === PoolStatus.Live && <UpcomingStatus text="Close At" OpenAt={poolInfo?.closeAt || 0} />}

        {(poolStatus === PoolStatus.Cancelled || poolStatus === PoolStatus.Finish) && (
          <Typography color={'#fff'}>Finish</Typography>
        )}

        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: 14,
            color: '#fff',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => {
            const result = viewType === BidType.chartView ? BidType.dataView : BidType.chartView
            setViewType(result)
          }}
        >
          {viewType === BidType.chartView ? 'Chart View' : 'Data View'}
        </Typography>
      </Box>
      {viewType === BidType.dataView && (
        <DataView
          priceFloor={`${poolInfo?.currencyAmountMin1?.toSignificant()} ${
            poolInfo?.currencyAmountMin1?.currency.symbol
          }`}
          increase={`${poolInfo?.currencyAmountMinIncr1?.toSignificant()} ${
            poolInfo?.currencyAmountMin1?.currency.symbol
          }`}
        />
      )}
      {viewType === BidType.chartView && poolInfo && <PriceChartView isDark showText={false} poolInfo={poolInfo} />}
      <RowLabel
        style={{
          padding: '34px 0 66px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Typography className="label">Current Highest Bid</Typography>
        <RowLabel
          style={{
            justifyContent: 'flex-end'
          }}
        >
          <TokenImage
            size={20}
            style={{
              display: 'inline-block',
              marginRight: '8px'
            }}
            src={poolInfo?.token1.smallUrl}
            alt=""
            srcSet=""
          />
          <Typography className="value" style={{ fontSize: 28 }}>
            {poolInfo?.currentBidderAmount1?.toSignificant() || '--'} {poolInfo?.currentBidderAmount1?.currency.symbol}
          </Typography>
        </RowLabel>
      </RowLabel>
      {/* closed and win tips */}
      {poolStatus === PoolStatus.Closed && (
        <Box
          sx={{
            width: '100%',
            height: '60px',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#E1F25C',
            padding: '0 16px'
          }}
          mb={'32px'}
        >
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <img
              src={WinTips}
              style={{
                width: '24px',
                height: '24px'
              }}
              alt=""
            />
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                color: 'var(--ps-text-3)',
                fontSize: '13px'
              }}
            >
              Congratulations! You win the auction
            </Typography>
          </Box>
          <RowLabel
            style={{
              justifyContent: 'flex-end'
            }}
          >
            <img
              style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                marginRight: '8px'
              }}
              src={LogoIcon}
              alt=""
              srcSet=""
            />
            <Typography
              className="value"
              style={{
                color: 'var(--ps-text-3)',
                height: '20px',
                lineHeight: '20px',
                fontSize: '16px'
              }}
            >
              26000 ETH
            </Typography>
          </RowLabel>
        </Box>
      )}
      <BidBtn
        disabled={poolStatus !== PoolStatus.Live}
        onClick={() => {
          const result = !openDialog
          setOpenDialog(result)
        }}
      >
        <img
          src={BidIcon}
          style={{
            width: '16px',
            height: '16px',
            marginRight: '10px'
          }}
          alt=""
          srcSet=""
        />
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontStyle: 'italic',
            fontWeight: 100,
            fontSize: 20,
            color: 'var(--ps-text-5)'
          }}
        >
          Place A Bid
        </Typography>
      </BidBtn>
      {openDialog && (
        <DidDialog
          handleClose={() => {
            setOpenDialog(false)
          }}
        />
      )}
    </Box>
  )
}
export default BidAction
