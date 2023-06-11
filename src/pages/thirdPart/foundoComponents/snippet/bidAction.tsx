import { Box, Typography, styled } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { PoolType } from 'api/pool/type'
import LogoIcon from 'assets/imgs/thirdPart/foundoDetail/chart.png'
import BidIcon from 'assets/imgs/thirdPart/foundoDetail/bidIcon.svg'
import WinTips from 'assets/imgs/thirdPart/foundoDetail/winTips.png'
import DidDialog from './bidDialog'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
import ReactECharts from 'echarts-for-react'
import 'echarts/i18n/langFR'
export enum BidType {
  'dataView' = 0,
  'chartView' = 1
}
interface DataViewParam {
  auctionType: PoolType
  priceFloor: number | string
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
export const BidBtn = styled(Box)(() => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #959595',
  borderRadius: '100px',
  height: '56px',
  cursor: 'pointer'
}))
function DataView(props: DataViewParam) {
  const { auctionType, priceFloor } = props
  return (
    <Box
      sx={{
        padding: '48px 0 24px'
      }}
    >
      <RowLabel style={{ marginBottom: '16px' }}>
        <Typography className="label">Auction Type</Typography>
        <Typography className="value">{auctionType}</Typography>
      </RowLabel>
      <RowLabel>
        <Typography className="label">Price Floor</Typography>
        <Typography className="value">{priceFloor}</Typography>
      </RowLabel>
    </Box>
  )
}
const ChartView: React.FC = ({}) => {
  const option = {
    toolbox: {
      feature: {
        saveAsImage: {},
        dataZoom: {},
        restore: {}
      }
    },
    tooltip: {},
    legend: {
      data: ['Price']
    },
    xAxis: {
      data: ['06:30 01-07', '08:30 01-07', '10:30 01-07', '12:30 01-07', '14:30 01-07', '16:30 01-07']
    },
    yAxis: {},
    series: [
      {
        name: 'Price',
        type: 'line',
        data: [5, 20, 36, 10, 15, 20]
      }
    ]
  }
  return <ReactECharts option={option} style={{ height: 450 }} opts={{ locale: 'FR' }} />
}
const LiveStr = styled(Typography)(() => ({
  display: 'inline-block',
  fontFamily: `'Public Sans'`,
  fontWeight: 600,
  fontSize: 28,
  color: 'var(--ps-green-1)'
}))
const UpcomingStatus = (props: { OpenAt: string }) => {
  const { OpenAt } = props
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
          <LiveStr>Live </LiveStr>
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
  const OpenAt = '1689485474'

  const [poolStatus, setPoolStatus] = useState<PoolStatus>(PoolStatus.Upcoming)
  useEffect(() => {
    setPoolStatus(PoolStatus.Upcoming)
    return () => {}
  }, [])
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
        {poolStatus === PoolStatus.Upcoming && <UpcomingStatus OpenAt={OpenAt} />}
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
            const resule = viewType === BidType.chartView ? BidType.dataView : BidType.chartView
            setViewType(resule)
          }}
        >
          {viewType === BidType.chartView ? 'Chart View' : 'Data View'}
        </Typography>
      </Box>
      {viewType === BidType.dataView && <DataView auctionType={PoolType.ENGLISH_AUCTION_NFT} priceFloor={'25000'} />}
      {viewType === BidType.chartView && <ChartView />}
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
              height: '20px',
              lineHeight: '20px'
            }}
          >
            26000 ETH
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
              Congraduations! You win the auction
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
