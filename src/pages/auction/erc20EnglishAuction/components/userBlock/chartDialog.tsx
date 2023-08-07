import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { ColorType } from 'lightweight-charts'
import { Box, Typography, styled, Dialog } from '@mui/material'
import { ReactComponent as XIcon } from 'assets/imgs/dutchAuction/x.svg'
import { PointerItem } from 'pages/auction/dutchAuction/components/lineChart'
import { LineChartView, ViewTypeParam } from '../lineChart'
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
  poolInfo: Erc20EnglishAuctionPoolProp
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
            fontFamily: `'Public Sans'`,
            fontSize: 28,
            fontWeight: 600,
            color: '#121212'
          }}
        >
          Erc20 English Auction Live Chart
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
            {poolInfo.currencyAmountStartPrice?.toExact() + ' ' + poolInfo.token1.symbol.toUpperCase()}
          </Typography>
          <Typography
            sx={{
              color: '#908E96',
              fontFamily: `'Inter'`,
              fontSize: '14px',
              marginRight: '10px'
            }}
          >
            Ending price:
          </Typography>
          <Typography
            sx={{
              color: '#171717',
              fontFamily: `'Inter'`,
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            {poolInfo.currencyAmountEndPrice?.toExact() + ' ' + poolInfo.token1.symbol.toUpperCase()}
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
