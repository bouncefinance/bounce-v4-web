import { Box, Tabs, Tab, styled } from '@mui/material'
import { useState } from 'react'
import AuctionInfo from './auctionInfo'
import { useErc20EnglishAuctionPoolInfo } from '../../ValuesProvider'
import LineChart from '../lineChart'

const LeftTabs = styled(Tabs)(() => ({
  height: '37px',
  '.MuiButtonBase-root': {
    padding: '0',
    minWidth: '0',
    marginRight: '24px',
    color: '#626262'
  },
  '.Mui-selected': {
    color: '#fff'
  }
}))
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
const Left = () => {
  const { data: poolInfo } = useErc20EnglishAuctionPoolInfo()
  const [value, setValue] = useState<number>(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  if (!poolInfo) return <></>
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <LeftTabs value={value} onChange={handleChange}>
        <Tab label="Chart" {...a11yProps(0)} />
        <Tab label="Token/ Auction Information" {...a11yProps(1)} />
      </LeftTabs>
      {value === 0 && <LineChart poolInfo={poolInfo} />}
      {value === 1 && <AuctionInfo />}
    </Box>
  )
}
export default Left
