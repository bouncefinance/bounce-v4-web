import { Slider, styled } from '@mui/material'

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

const StyledProgressSlider = styled(Slider)<{ isDark?: true }>(({ isDark }) => ({
  color: isDark ? '#fff' : '#0057FF',
  height: 3,
  marginBottom: '30px !important',
  '& .MuiSlider-thumb': {
    // display: 'none',
    height: 20,
    width: 20,
    backgroundColor: isDark ? '#fff' : '#2B51DA'
  },
  // '& .MuiSlider-valueLabel': {
  //   display: 'none'
  // },
  '& .MuiSlider-markLabel': {
    color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#fff',
    height: 10,
    width: 10,
    border: `1.84966px solid ${isDark ? '#fff' : '#2B51DA'}`,
    borderRadius: '50%',
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor'
    }
  }
}))

export default function ProgressSlider({
  isDark,
  curSliderPer,
  curSliderHandler
}: {
  isDark?: true
  curSliderPer: number
  curSliderHandler: (val: number) => void
}) {
  return (
    <StyledProgressSlider
      isDark={isDark}
      aria-label="Small steps"
      value={curSliderPer}
      onChange={(_, v) => curSliderHandler(Number(v))}
      marks={marks}
      valueLabelDisplay="auto"
    />
  )
}
