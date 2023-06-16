import { Box, styled } from '@mui/material'
import useBreakpoint from '../../../hooks/useBreakpoint'
import AuctionSvg from 'assets/imgs/realWorld/auction.svg'
import AuctionActiveSvg from 'assets/imgs/realWorld/auction_active.svg'
import BuynowSvg from 'assets/imgs/realWorld/buynow.svg'
import BuynowActiveSvg from 'assets/imgs/realWorld/buynow_active.svg'
import { TabsType } from '../index'
const TabsItem = styled(Box)(({ theme }) => ({
  width: '320px',
  height: '76px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px 20px 0 0 ',
  background: 'transparent',
  color: 'var(--ps-text-2)',
  fontFamily: `'Public Sans'`,
  fontSize: '20px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all .6s',
  '&.active': {
    background: '#fff',
    color: 'var(--ps-text-3)'
  },
  [theme.breakpoints.down('md')]: {
    borderRadius: '16px 16px 0 0 ',
    fontSize: '14px',
    width: '110px',
    height: '45px'
  }
}))
const Tabs = ({ index, setIndex }: { index: TabsType; setIndex: (type: TabsType) => void }) => {
  const isSm = useBreakpoint('sm')
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: isSm ? '31px' : '67px'
      }}
    >
      <TabsItem
        className={index === TabsType.auction ? 'active' : ''}
        onClick={() => {
          setIndex(TabsType.auction)
        }}
        gap={isSm ? 8 : 12}
      >
        {index === TabsType.auction && <img src={AuctionActiveSvg} alt="" />}
        {index === TabsType.buynow && <img src={AuctionSvg} alt="" />}
        Auction
      </TabsItem>
      <TabsItem
        className={index === 1 ? 'active' : ''}
        onClick={() => {
          setIndex(1)
        }}
        gap={isSm ? 8 : 12}
      >
        {index === TabsType.buynow && <img src={BuynowActiveSvg} alt="" />}
        {index === TabsType.auction && <img src={BuynowSvg} alt="" />}
        Buy now
      </TabsItem>
    </Box>
  )
}
export default Tabs
