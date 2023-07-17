import { DutchAuctionPoolProp } from 'api/pool/type'
import { Typography, styled, Dialog, Stack, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { ReactComponent as XIcon } from 'assets/imgs/dutchAuction/x.svg'
import { ReactComponent as TipSvg } from 'assets/imgs/dipExchange/tips.svg'
import { useMemo, useState } from 'react'
import BidInput from './bidInput'
import BidBlock from './bidBlock'
import { useDutchCurrentPriceAndAmount1, AmountAndCurrentPriceParam } from 'bounceHooks/auction/useDutchAuctionInfo'
import { DisableBtn } from './bidBlock'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'

const NewFormControlLabel = styled(FormControlLabel)(() => ({
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  '.MuiCheckbox-root': {
    padding: 0,
    marginRight: '8px'
  },
  fontFamily: `'Inter'`,
  fontSize: '12px',
  fontWeight: 400,
  color: '#626262',
  width: '100%',
  margin: '33px 0 48px'
}))
const ChartDialogEl = styled(Dialog)(() => ({
  '.MuiDialog-paper': {
    width: '480px',
    borderRadius: '8px',
    background: '#fff',
    padding: '72px'
  }
}))
const ChartDialog = ({
  poolInfo,
  open,
  onClose,
  maxValue
}: {
  poolInfo: DutchAuctionPoolProp
  open: boolean
  onClose?: () => void
  maxValue: string | number
}) => {
  const [amount, setAmount] = useState('0')
  const [confirmationState, setConfirmationState] = useState({
    notice1: false
  })
  const currentPriceAndAmount1: AmountAndCurrentPriceParam = useDutchCurrentPriceAndAmount1(amount, poolInfo)
  const maxAmount0PerWalletText = useMemo(() => {
    const currencyMaxAmount0PerWallet = poolInfo.currencyMaxAmount0PerWallet?.toSignificant()
    if (Number(currencyMaxAmount0PerWallet) > 0) {
      return currencyMaxAmount0PerWallet + ' ' + poolInfo?.token0?.symbol.toUpperCase()
    } else {
      return 'No Limit'
    }
  }, [poolInfo.currencyMaxAmount0PerWallet, poolInfo.token0.symbol])
  const handleChange = (event: React.ChangeEvent<any>) => {
    setConfirmationState({
      ...confirmationState,
      [event.target.name]: event.target.checked
    })
  }
  const { account } = useActiveWeb3React()

  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1?.currency)

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
            color: '#121212',
            marginBottom: 48,
            textAlign: 'center'
          }}
        >
          Commit
        </Typography>
        <Stack mb={'12px'} direction="row" justifyContent={'space-between'}>
          <Stack direction="row" justifyContent={'flex-start'}>
            <Typography
              sx={{
                color: '#626262',
                fontFamily: `'Inter'`,
                fontSize: '14px',
                marginRight: '10px'
              }}
            >
              Your max commitment limit
            </Typography>
            <TipSvg />
          </Stack>
          <Typography
            sx={{
              color: '#121212',
              fontFamily: `'Public Sans'`,
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            {`${maxValue} ${poolInfo.token1.symbol.toUpperCase()}`}
          </Typography>
        </Stack>
        <Stack mb={'32px'} direction="row" justifyContent={'space-between'}>
          <Typography
            sx={{
              color: '#626262',
              fontFamily: `'Inter'`,
              fontSize: '14px',
              marginRight: '10px'
            }}
          >
            Hard cap per user
          </Typography>
          <Typography
            sx={{
              color: '#121212',
              fontFamily: `'Public Sans'`,
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            {maxAmount0PerWalletText}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent={'space-between'}>
          <Typography
            sx={{
              color: '#626262',
              fontFamily: `'Inter'`,
              fontSize: '14px',
              marginRight: '10px'
            }}
          >
            Amount
          </Typography>
          <Typography
            sx={{
              color: '#121212',
              fontFamily: `'Public Sans'`,
              fontSize: '12px',
              fontWeight: 400
            }}
          >
            Available: {userToken1Balance?.toSignificant() || '--'} {poolInfo.token1.symbol}
          </Typography>
        </Stack>
        <BidInput maxValue={maxValue} poolInfo={poolInfo} amount={amount + ''} setAmount={setAmount} />
        <FormGroup>
          <NewFormControlLabel
            checked={confirmationState.notice1}
            name="notice1"
            control={<Checkbox defaultChecked />}
            onChange={handleChange}
            label="I have read and agree to the purchase agreement"
          />
        </FormGroup>
        {!confirmationState.notice1 && (
          <DisableBtn
            sx={{
              justifyContent: 'center'
            }}
          >
            Bid
          </DisableBtn>
        )}
        {confirmationState.notice1 && (
          <BidBlock
            maxValue={maxValue}
            poolInfo={poolInfo}
            amount={amount + ''}
            currentPriceAndAmount1={currentPriceAndAmount1}
            onConfirm={() => {
              setConfirmationState({
                notice1: false
              })
            }}
          />
        )}

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
