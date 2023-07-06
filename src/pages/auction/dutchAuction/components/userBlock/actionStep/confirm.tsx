import React, { useState, useCallback } from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup, Typography, styled } from '@mui/material'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { StatusBox } from '../right'
import { useIsUserJoinedDutchPool } from 'bounceHooks/auction/useIsUserJoinedPool'
import { ComBtn } from '../bidBlock'
import { CurrencyAmount } from 'constants/token'
import { BigNumber } from 'bignumber.js'
import { useDutchCurrentPriceAndAmount1, AmountAndCurrentPriceParam } from 'bounceHooks/auction/useDutchAuctionInfo'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import usePlaceBidDutch from 'bounceHooks/auction/usePlaceBidDutch'
import DialogTips from 'bounceComponents/common/DialogTips'
import { show } from '@ebay/nice-modal-react'

const NewFormControlLabel = styled(FormControlLabel)(() => ({
  fontFamily: `'Inter'`,
  fontSize: '14px',
  fontWeight: 600,
  color: '#fff'
}))
interface CheckProps {
  poolInfo: DutchAuctionPoolProp
  amount: string
  onConfirm: () => void
}

const Confirm = ({ onConfirm, poolInfo, amount }: CheckProps) => {
  const isUserJoined = useIsUserJoinedDutchPool(poolInfo)
  const [confirmationState, setConfirmationState] = useState({
    notice1: false,
    notice2: false,
    notice3: false,
    notice4: false
  })
  const handleChange = (event: React.ChangeEvent<any>) => {
    setConfirmationState({
      ...confirmationState,
      [event.target.name]: event.target.checked
    })
  }
  const { notice1, notice2, notice3, notice4 } = confirmationState
  const currentPriceAndAmount1: AmountAndCurrentPriceParam = useDutchCurrentPriceAndAmount1(amount || 0, poolInfo)
  const { run: bid, submitted } = usePlaceBidDutch(poolInfo)
  const amount0CurrencyAmount = poolInfo?.currencyAmountTotal0
    ? CurrencyAmount.fromAmount(poolInfo?.currencyAmountTotal0?.currency, amount || '0')
    : 0
  const amount1CurrencyAmount = poolInfo?.currencyAmountTotal1
    ? CurrencyAmount.fromAmount(
        poolInfo?.currencyAmountTotal1?.currency,
        BigNumber(currentPriceAndAmount1.amount1).toString()
      )
    : 0
  const toBid = useCallback(async () => {
    if (!amount1CurrencyAmount || !amount0CurrencyAmount) return
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } = await bid(amount0CurrencyAmount, amount1CurrencyAmount)
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully bid ${amount1CurrencyAmount.toSignificant()} ${poolInfo.token1.symbol}`
          })
          onConfirm && onConfirm()
        })
        .catch(() => {
          onConfirm && onConfirm()
        })
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toBid
      })
      onConfirm && onConfirm()
    }
  }, [amount1CurrencyAmount, amount0CurrencyAmount, bid, poolInfo.token1.symbol, onConfirm])
  return (
    <Box>
      <Box
        sx={{
          background: '#E1F25C',
          border: '1px solid rgba(18, 18, 18, 0.06)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: 20,
            color: '#000'
          }}
        >
          {!isUserJoined ? 'Join The Pool' : 'You Joined'}
        </Typography>
        <StatusBox poolInfo={poolInfo} />
      </Box>
      <Box
        sx={{
          padding: '0 24px '
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: `'Public Sans'`,
            fontSize: '14px',
            fontWeight: 600,
            color: '#D7D6D9',
            margin: '24px 0 12px 0'
          }}
        >
          Please check the following information before your participation
        </Typography>
        <FormGroup>
          <NewFormControlLabel
            checked={notice1}
            name="notice1"
            control={<Checkbox defaultChecked />}
            onChange={handleChange}
            label="I researched the creator"
          />
          <NewFormControlLabel
            checked={notice2}
            control={<Checkbox />}
            onChange={handleChange}
            name="notice2"
            label="I checked the token and contract address to make sure it is not fake token"
          />
          <NewFormControlLabel
            checked={notice3}
            control={<Checkbox />}
            onChange={handleChange}
            name="notice3"
            label="I checked the price"
          />
          <NewFormControlLabel
            checked={notice4}
            control={<Checkbox />}
            onChange={handleChange}
            name="notice4"
            label="I understand rules about Dutch Auction"
          />
        </FormGroup>
        <ComBtn
          variant="contained"
          fullWidth
          loading={submitted.complete || submitted.submitted}
          disabled={!Object.values(confirmationState).every(item => item === true)}
          sx={{ mt: '80px' }}
          onClick={toBid}
        >
          Confirm and continue
        </ComBtn>
      </Box>
    </Box>
  )
}

export default Confirm
