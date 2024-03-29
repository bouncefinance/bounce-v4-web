import React, { useState, useCallback, useMemo } from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup, Typography, styled } from '@mui/material'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { ComBtn } from '../bidBlock'
import { CurrencyAmount } from 'constants/token'
import DialogTips from 'bounceComponents/common/DialogTips'
import { show } from '@ebay/nice-modal-react'
import { StatusBox } from 'pages/auction/dutchAuction/components/userBlock/right'
import { useErc20EnglishSwap } from 'bounceHooks/auction/useErc20EnglishAuctionCallback'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'

const NewFormControlLabel = styled(FormControlLabel)(() => ({
  fontFamily: `'Inter'`,
  fontSize: '14px',
  fontWeight: 600,
  color: '#fff'
}))
interface CheckProps {
  poolInfo: Erc20EnglishAuctionPoolProp
  amount: string
  onConfirm: () => void
}

const Confirm = ({ onConfirm, poolInfo, amount }: CheckProps) => {
  const isUserJoined = useMemo(
    () => Number(poolInfo?.participant.swappedAmount0),
    [poolInfo?.participant.swappedAmount0]
  )
  const [confirmationState, setConfirmationState] = useState({
    notice1: false,
    notice2: false,
    notice3: false
  })
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const handleChange = (event: React.ChangeEvent<any>) => {
    setConfirmationState({
      ...confirmationState,
      [event.target.name]: event.target.checked
    })
  }
  const { notice1, notice2, notice3 } = confirmationState
  const { swapCallback: bid, swapPermitCallback } = useErc20EnglishSwap(poolInfo)
  const amount1CurrencyAmount = poolInfo?.currencyAmountEndPrice
    ? CurrencyAmount.fromAmount(poolInfo?.currencyAmountEndPrice?.currency, amount || '0')
    : 0
  const bidDisabled = useMemo(() => {
    return !Object.values(confirmationState).every(item => item === true)
  }, [confirmationState])
  const toBid = useCallback(async () => {
    if (!amount1CurrencyAmount) return
    showRequestConfirmDialog()
    setConfirmLoading(true)
    try {
      const func = poolInfo.enableWhiteList && poolInfo.whitelistData?.isPermit ? swapPermitCallback : bid
      const { transactionReceipt } = await func(amount1CurrencyAmount)
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
            notice3: false
          })
          setConfirmLoading(false)
          onConfirm && onConfirm()
        })
        .catch(() => {
          setConfirmationState({
            notice1: false,
            notice2: false,
            notice3: false
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
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toBid
      })
      setConfirmationState({
        notice1: false,
        notice2: false,
        notice3: false
      })
      setConfirmLoading(false)
      onConfirm && onConfirm()
    }
  }, [
    amount1CurrencyAmount,
    poolInfo.enableWhiteList,
    poolInfo.whitelistData?.isPermit,
    poolInfo.token1.symbol,
    swapPermitCallback,
    bid,
    onConfirm
  ])
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
            fontFamily: `'Inter'`,
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
            fontFamily: `'Inter'`,
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
