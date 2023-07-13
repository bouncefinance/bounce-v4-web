import React, { useState, useCallback, useMemo } from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup, Typography, styled } from '@mui/material'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { ComBtn } from '../bidBlock'
import { CurrencyAmount } from 'constants/token'
import { BigNumber } from 'bignumber.js'
import { useDutchCurrentPriceAndAmount1, AmountAndCurrentPriceParam } from 'bounceHooks/auction/useDutchAuctionInfo'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import usePlaceBidDutch from 'bounceHooks/auction/usePlaceBidDutch'
import DialogTips from 'bounceComponents/common/DialogTips'
import { show } from '@ebay/nice-modal-react'
import PoolSaleInfo from '../poolSaleInfo'

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
  const [confirmationState, setConfirmationState] = useState({
    notice1: false,
    notice2: false,
    notice3: false,
    notice4: false
  })
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const handleChange = (event: React.ChangeEvent<any>) => {
    setConfirmationState({
      ...confirmationState,
      [event.target.name]: event.target.checked
    })
  }
  const { notice1, notice2, notice3, notice4 } = confirmationState
  const currentPriceAndAmount1: AmountAndCurrentPriceParam = useDutchCurrentPriceAndAmount1(amount || 0, poolInfo)
  const { swapCallback: bid, swapPermitCallback } = usePlaceBidDutch(poolInfo)
  const amount0CurrencyAmount = poolInfo?.currencyAmountTotal0
    ? CurrencyAmount.fromAmount(poolInfo?.currencyAmountTotal0?.currency, amount || '0')
    : 0
  const amount1CurrencyAmount = poolInfo?.currencyAmountTotal1
    ? CurrencyAmount.fromAmount(
        poolInfo?.currencyAmountTotal1?.currency,
        BigNumber(currentPriceAndAmount1.amount1).toString()
      )
    : 0
  const bidDisabled = useMemo(() => {
    return !Object.values(confirmationState).every(item => item === true)
  }, [confirmationState])
  const toBid = useCallback(async () => {
    if (!amount1CurrencyAmount || !amount0CurrencyAmount) return
    showRequestConfirmDialog()
    setConfirmLoading(true)
    try {
      const func = poolInfo.enableWhiteList && poolInfo.whitelistData?.isPermit ? swapPermitCallback : bid
      const { transactionReceipt } = await func(amount0CurrencyAmount, amount1CurrencyAmount)
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
          setConfirmationState({
            notice1: false,
            notice2: false,
            notice3: false,
            notice4: false
          })
          setConfirmLoading(false)
          onConfirm && onConfirm()
        })
        .catch(() => {
          setConfirmationState({
            notice1: false,
            notice2: false,
            notice3: false,
            notice4: false
          })
          setConfirmLoading(false)
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
      setConfirmationState({
        notice1: false,
        notice2: false,
        notice3: false,
        notice4: false
      })
      setConfirmLoading(false)
      onConfirm && onConfirm()
    }
  }, [
    amount1CurrencyAmount,
    amount0CurrencyAmount,
    poolInfo.enableWhiteList,
    poolInfo.whitelistData?.isPermit,
    poolInfo.token1.symbol,
    swapPermitCallback,
    bid,
    onConfirm
  ])
  return (
    <Box>
      <PoolSaleInfo poolInfo={poolInfo} />
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
          loading={confirmLoading}
          fullWidth
          disabled={bidDisabled}
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
