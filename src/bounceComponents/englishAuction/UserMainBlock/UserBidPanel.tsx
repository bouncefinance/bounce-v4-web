import { Slider, styled } from '@mui/material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'

const marks = [
  {
    value: 0,
    label: '0%'
  },
  {
    value: 25,
    label: '25%'
  },
  {
    value: 50,
    label: '50%'
  },
  {
    value: 75,
    label: '75%'
  },
  {
    value: 100,
    label: '100%'
  }
]

const ProgressSlider = styled(Slider)(({}) => ({
  color: '#0057FF',
  height: 3,
  '& .MuiSlider-thumb': {
    display: 'none',
    height: 20,
    width: 20,
    backgroundColor: '#2B51DA'
  },
  '& .MuiSlider-valueLabel': {
    display: 'none'
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#fff',
    height: 10,
    width: 10,
    border: '1.84966px solid #2B51DA',
    borderRadius: '50%',
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor'
    }
  }
}))

export default function UserBidPanel() {
  const { data: poolInfo } = useEnglishAuctionPoolInfo()

  if (!poolInfo) return null

  return (
    <Box>
      <Alert color="warning" icon={<></>} sx={{ borderRadius: 10 }}>
        <Typography variant="body1" color={'#171717'}>
          New bid amount must be greater than the highest Bid ({poolInfo.currentBidderMinAmount?.toSignificant()}{' '}
          {poolInfo.token1.symbol})
        </Typography>
      </Alert>

      <Box mt={30}>
        <Typography variant="h6">Place Your Bid</Typography>
        <ProgressSlider aria-label="progress slider" defaultValue={0} marks={marks} valueLabelDisplay="on" />
      </Box>
    </Box>
  )
}
