import { Button, FormLabel, Stack, styled } from '@mui/material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useCountDown } from 'ahooks'
import { EnglishAuctionNFTPoolProp, PoolStatus } from 'api/pool/type'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import NumberInput from 'bounceComponents/common/NumberInput'
import TokenImage from 'bounceComponents/common/TokenImage'
import { LoadingButton } from '@mui/lab'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useMemo, useState } from 'react'
import JSBI from 'jsbi'
import ProgressSlider from 'bounceComponents/common/ProgressSlider'

const InputPanel = styled(Box)({
  border: '1px solid #D7D6D9',
  borderRadius: '20px',
  padding: '14px 10px 4px'
})

export default function UserBidPanel() {
  const { data: poolInfo } = useEnglishAuctionPoolInfo()

  if (!poolInfo) return null

  return poolInfo.status === PoolStatus.Upcoming ? (
    <UpComingPanel startTime={poolInfo.openAt} />
  ) : poolInfo.status === PoolStatus.Cancelled ? (
    <></>
  ) : poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Finish ? (
    <>
      <ClosedPanel />
      <LivePanel poolInfo={poolInfo} />
    </>
  ) : (
    <LivePanel poolInfo={poolInfo} />
  )
}

function UpComingPanel({ startTime }: { startTime: number }) {
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: startTime
  })
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        alignSelf: 'self-end',
        fontSize: 16
      }}
      disabled={!!countdown}
    >
      {days}d : {hours}h : {minutes}m : {seconds}s
    </Button>
  )
}

function LivePanel({ poolInfo }: { poolInfo: EnglishAuctionNFTPoolProp }) {
  const { account } = useActiveWeb3React()
  const token1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountMin1?.currency)

  const [bidVal, setBidVal] = useState('')
  const minBidVal = useMemo(() => poolInfo.currentBidderMinAmount, [poolInfo.currentBidderMinAmount])
  const [curSliderPer, setCurSliderPer] = useState(0)

  const bidHandler = useCallback((v: string) => {
    setBidVal(v)
    setCurSliderPer(0)
  }, [])

  const curSliderHandler = useCallback(
    (val: number) => {
      setCurSliderPer(val)
      if (!minBidVal) return
      setBidVal(
        minBidVal
          .multiply(JSBI.BigInt(100 + val))
          .divide('100')
          .toSignificant(6, { groupSeparator: '' })
      )
    },
    [minBidVal]
  )

  return (
    <Box>
      <Alert color="warning" icon={<></>} sx={{ borderRadius: 10 }}>
        <Typography variant="body1" color={'#171717'}>
          New bid amount must be greater than the highest Bid ({poolInfo.currentBidderMinAmount?.toSignificant()}{' '}
          {poolInfo.token1.symbol})
        </Typography>
      </Alert>

      <Stack spacing={10} mt={30}>
        <Typography variant="h6">Place Your Bid</Typography>
        <InputPanel>
          <Box display={'flex'} padding={'0 10px'} justifyContent={'space-between'}>
            <FormLabel>Min {minBidVal?.toSignificant()}</FormLabel>
            <FormLabel>Balance: {token1Balance?.toSignificant()}</FormLabel>
          </Box>
          <NumberInput
            fullWidth
            placeholder="0"
            value={bidVal}
            onUserInput={v => bidHandler(v)}
            sx={{
              fontSize: 24,
              border: 'none',
              '& fieldset': {
                border: 'none'
              }
            }}
            endAdornment={
              <Stack direction={'row'} alignItems={'center'} spacing={6}>
                <Button
                  variant="outlined"
                  sx={{ height: 30 }}
                  onClick={() => setBidVal(token1Balance?.toSignificant(6, { groupSeparator: '' }) || '')}
                >
                  Max
                </Button>
                <TokenImage size={30} src={poolInfo.token1.symbol}></TokenImage>
                <Typography fontSize={16} fontWeight={500}>
                  {poolInfo.token1.symbol}
                </Typography>
              </Stack>
            }
          />
        </InputPanel>
        <ProgressSlider curSliderPer={curSliderPer} curSliderHandler={v => curSliderHandler(Number(v))} />
        <LoadingButton disabled={!bidVal} loadingPosition="start" variant="contained" fullWidth>
          Place a Bid
        </LoadingButton>
      </Stack>
    </Box>
  )
}

function ClosedPanel() {
  return null
}
