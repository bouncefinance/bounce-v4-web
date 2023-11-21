import React, { useMemo } from 'react'
import {
  Dialog as MuiDialog,
  DialogContent,
  Stack,
  Typography,
  DialogTitle,
  DialogProps as MuiDialogProps,
  IconButton,
  Button
} from '@mui/material'
import { NiceModalHocProps } from '@ebay/nice-modal-react'

import { ReactComponent as CloseSVG } from '../DialogConfirmation/assets/close.svg'
import styled from '@emotion/styled'
import { CurrencyAmount } from 'constants/token'
import StakeInput from 'pages/launchpadCoin/components/stakeInput'

export interface DialogProps extends MuiDialogProps {
  token1Balance: CurrencyAmount | undefined
  amount: string
  handleSetAmount: (v: string) => void
  onClose: () => void
  open: boolean
  confirm: () => void
  token1: CurrencyAmount | undefined
}
const GrayTitle = styled(Typography)`
  color: #626262;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`
const BalanceTitle = styled(Typography)`
  color: #121212;
  font-family: Public Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`
const BlueTitle = styled(Typography)`
  color: #2b51da;
  font-family: Public Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`
const ConfirmBtnStyle = styled(Button)`
  width: 100%;
  border-radius: 8px;
  background: #121212;
  color: #fff;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  &:hover {
    background: #121212;
    opacity: 0.9;
  }
`
const CancelBtnStyle = styled(Button)`
  border-radius: 8px;
  border: 1px solid #121212;
  background: #fff;
  color: #121212;
  leading-trim: both;
  text-edge: cap;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  &:hover {
    background: #fff;
  }
`
const CoinInputDialog: React.FC<DialogProps & NiceModalHocProps> = (props: DialogProps) => {
  const { token1Balance, amount, handleSetAmount, onClose, open, confirm, token1, ...rest } = props
  const confirmBtn = useMemo(() => {
    if (!amount) {
      return (
        <ConfirmBtnStyle disabled sx={{ flex: 2 }}>
          Confirm
        </ConfirmBtnStyle>
      )
    }
    if (token1 && token1Balance && token1.greaterThan(token1Balance)) {
      return (
        <ConfirmBtnStyle disabled sx={{ flex: 2 }}>
          Insufficient Balance
        </ConfirmBtnStyle>
      )
    }
    if (token1 && token1Balance && open && !token1.greaterThan(token1Balance)) {
      return (
        <ConfirmBtnStyle sx={{ flex: 2 }} onClick={() => confirm()}>
          Confirm
        </ConfirmBtnStyle>
      )
    }
    return (
      <ConfirmBtnStyle disabled sx={{ flex: 2 }}>
        Confirm
      </ConfirmBtnStyle>
    )
  }, [amount, confirm, open, token1, token1Balance])
  return (
    <MuiDialog
      onClose={() => onClose()}
      sx={{
        '& .MuiDialog-paper': {
          width: 480,
          borderRadius: 20,
          pl: 30,
          pr: 40
        }
      }}
      open={open}
      {...Object.assign(rest)}
    >
      <IconButton
        color="primary"
        aria-label="dialog-close"
        sx={{ position: 'absolute', right: 12, top: 12 }}
        onClick={() => onClose()}
      >
        <CloseSVG />
      </IconButton>

      <DialogTitle sx={{ position: 'relative', padding: '50px 0 0px' }}>
        <Stack spacing={4} justifyContent="center" alignItems="center">
          <Typography variant="h2" sx={{ fontWeight: 500, textAlign: 'center' }}>
            Stake
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ py: 48, px: 6, paddingTop: '48px !important' }}>
        <>
          <Stack gap={12}>
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
              <GrayTitle>Amount</GrayTitle>
              <BalanceTitle>
                Available: {token1Balance?.toSignificant()} {token1Balance?.currency.symbol}
              </BalanceTitle>
            </Stack>
            <StakeInput
              value={amount}
              onChange={v => {
                handleSetAmount(v)
              }}
              token1Balance={token1Balance}
            />
          </Stack>
          <Stack mt={48} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <GrayTitle>Maximum stake amount</GrayTitle>
            <BlueTitle>100,000,000 BNB</BlueTitle>
          </Stack>
        </>
      </DialogContent>
      <Stack flexDirection={'row'} alignItems={'center'} gap={12} mb={40}>
        <CancelBtnStyle style={{ flex: 1 }} onClick={() => onClose()}>
          Cancel
        </CancelBtnStyle>
        {confirmBtn}
      </Stack>
    </MuiDialog>
  )
}

export default CoinInputDialog
