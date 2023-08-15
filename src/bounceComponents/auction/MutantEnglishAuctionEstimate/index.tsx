import { muiDialogV5, useModal, create } from '@ebay/nice-modal-react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Dialog from 'bounceComponents/common/DialogBase'
import { useMemo, useState } from 'react'
import { DistributionRatioCalculator } from './DistributionRatioCalculator'
import NumberInput from 'bounceComponents/common/NumberInput'
import FormItem from 'bounceComponents/common/FormItem'

interface IDistributionRatioCalculator {
  startPrice: number | string
  incrRate: number | string
  creatorShareRatio: number | string
  prevParticipantShareRatio: number | string
  winnerShareRatio: number | string
}

function useDistributionRatioCalculator(params: IDistributionRatioCalculator, auctionNum = 10) {
  const calculator = useMemo(() => {
    return new DistributionRatioCalculator(
      params.startPrice,
      params.incrRate,
      params.creatorShareRatio,
      params.prevParticipantShareRatio,
      params.winnerShareRatio
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo(() => {
    calculator.setStartPrice(params.startPrice)
    calculator.setIncrRate(params.incrRate)
    calculator.setCreatorShareRatio(params.creatorShareRatio)
    calculator.setPrevParticipantShareRatio(params.prevParticipantShareRatio)
    calculator.setWinnerShareRatio(params.winnerShareRatio)
    return calculator.estimateDistributionToFixed(auctionNum, 6)
  }, [
    auctionNum,
    calculator,
    params.creatorShareRatio,
    params.incrRate,
    params.prevParticipantShareRatio,
    params.startPrice,
    params.winnerShareRatio
  ])
}

const MutantEnglishAuctionEstimateDialog = create(
  ({
    startPrice,
    incrRate,
    creatorShareRatio,
    prevParticipantShareRatio,
    winnerShareRatio
  }: IDistributionRatioCalculator) => {
    const modal = useModal()
    const [number, setNumber] = useState('10')
    const [showNumber, setShowNumber] = useState(10)

    const handleReject = () => {
      modal.reject(new Error('Rejected'))
      modal.hide()
    }

    const distributionList = useDistributionRatioCalculator(
      {
        startPrice,
        incrRate,
        creatorShareRatio,
        prevParticipantShareRatio,
        winnerShareRatio
      },
      showNumber
    )

    return (
      <Dialog
        contentStyle={{
          padding: '0 10px',
          minWidth: 800
        }}
        title="Auction Estimate"
        {...muiDialogV5(modal)}
        onClose={handleReject}
      >
        <Box>
          <FormItem label="Auction Number">
            <NumberInput
              value={number}
              onUserInput={v => {
                setNumber(v)
              }}
              onBlur={e => {
                const cur = Number(e.target.value) > 100 ? 100 : Number(e.target.value)
                setShowNumber(cur)
                setNumber(cur.toString())
              }}
            />
          </FormItem>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Times</TableCell>
                  <TableCell>Auction Price</TableCell>
                  <TableCell>Creator Share</TableCell>
                  <TableCell>Creator Accumulated</TableCell>
                  <TableCell>Previous Share</TableCell>
                  <TableCell>Winner Accumulated</TableCell>
                  <TableCell>Platform Accumulated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {distributionList.map(record => (
                  <TableRow key={record.position} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{record.position}</TableCell>
                    <TableCell>{record.curPrice}</TableCell>
                    <TableCell>{record.creatorTotalShare}</TableCell>
                    <TableCell>{record.creatorReceiveTotal}</TableCell>
                    <TableCell>{record.prevParticipantShare}</TableCell>
                    <TableCell>{record.winnerShare}</TableCell>
                    <TableCell>{record.platformTotalFees}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>
    )
  }
)

export default MutantEnglishAuctionEstimateDialog
