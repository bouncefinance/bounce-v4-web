import { LineChartView, ViewTypeParam } from '../lineChart'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { PointerItem } from '../lineChart'
import { ColorType } from 'lightweight-charts'
import { Box, Typography, styled, Dialog } from '@mui/material'
import { ReactComponent as XIcon } from 'assets/imgs/dutchAuction/x.svg'
const ChartDialogEl = styled(Dialog)(() => ({
  '.MuiDialog-paper': {
    width: '60%',
    minWidth: '860px',
    borderRadius: '8px',
    background: '#fff',
    padding: '48px'
  }
}))
const ChartDialog = ({
  poolInfo,
  open,
  onClose,
  data
}: {
  poolInfo: DutchAuctionPoolProp
  open: boolean
  data: PointerItem[]
  onClose?: () => void
}) => {
  return (
    <>
      <ChartDialogEl
        onClose={() => {
          console.log('close')
          onClose && onClose()
        }}
        open={open}
      >
        <Typography
          sx={{
            fontFamily: `'Inter'`,
            fontSize: 28,
            fontWeight: 600,
            color: '#121212'
          }}
        >
          Duction Auction Live Chart
        </Typography>
        <LineChartView
          data={data}
          poolInfo={poolInfo}
          options={{
            layout: {
              background: { type: ColorType.Solid, color: '#fff' },
              textColor: '#959595'
            }
          }}
          viewType={ViewTypeParam.dialog}
        />
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
          mt={'30px'}
        >
          <Typography
            sx={{
              color: '#908E96',
              fontFamily: `'Inter'`,
              fontSize: '14px',
              marginRight: '10px'
            }}
          >
            Starting price:
          </Typography>
          <Typography
            sx={{
              color: '#171717',
              fontFamily: `'Inter'`,
              fontSize: '14px',
              marginRight: '30px',
              fontWeight: 600
            }}
          >
            {poolInfo.highestPrice?.toSignificant(18) + ' ' + poolInfo.token1.symbol.toUpperCase()}
          </Typography>
          <Typography
            sx={{
              color: '#908E96',
              fontFamily: `'Inter'`,
              fontSize: '14px',
              marginRight: '10px'
            }}
          >
            Reserve price:
          </Typography>
          <Typography
            sx={{
              color: '#171717',
              fontFamily: `'Inter'`,
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            {poolInfo.currencyLowestBidPrice?.toExact() + ' ' + poolInfo.token1.symbol.toUpperCase()}
          </Typography>
        </Box>
        <XIcon
          onClick={() => {
            onClose && onClose()
          }}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            cursor: 'pointer'
          }}
        />
      </ChartDialogEl>
    </>
  )
}

export default ChartDialog
