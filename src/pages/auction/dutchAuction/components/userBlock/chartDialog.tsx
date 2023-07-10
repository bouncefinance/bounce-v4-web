import { LineChartView } from '../lineChart'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import React from 'react'
import DialogBase from 'bounceComponents/common/DialogBase'
import { PointerItem } from '../lineChart'
import { ColorType } from 'lightweight-charts'
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
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />
  })
  return (
    <>
      <DialogBase
        onClose={() => {
          console.log('close')
          onClose && onClose()
        }}
        title={'Duction Auction Live Chart'}
        open={open}
        fullWidth
        TransitionComponent={Transition}
        titleStyle={{ padding: '48px 24px 30px 48px' }}
        contentStyle={{
          padding: '0px 20px 37px 48px'
        }}
      >
        <LineChartView
          data={data}
          poolInfo={poolInfo}
          options={{
            layout: {
              background: { type: ColorType.Solid, color: '#fff' },
              textColor: '#959595'
            }
          }}
        />
      </DialogBase>
    </>
  )
}

export default ChartDialog
