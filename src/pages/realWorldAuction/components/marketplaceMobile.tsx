import { Box, Typography, styled } from '@mui/material'
import { FilterSearchConfig } from './auction'
import ArrowTop from 'assets/imgs/realWorld/arrow_top.png'
import { useState } from 'react'
import MobileFilterDialog from './mobileFilterDialog'
export const ComBtn = styled(Box)(() => ({
  height: '38px',
  lineHeight: '38px',
  padding: '0 24px',
  marginRight: '20px',
  background: 'var(--ps-yellow-1)',
  color: '#121212',
  cursor: 'pointer',
  borderRadius: '6px',
  fontFamily: `'Public Sans'`,
  fontSize: '14px',
  fontWeight: 600
}))
const MarketplaceMobile = ({
  filterConfig,
  children,
  handleSearch
}: {
  filterConfig: FilterSearchConfig[]
  children: JSX.Element
  handleSearch?: () => void
}) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  return (
    <Box
      sx={{
        position: 'relative',
        width: 'calc(100% - 16px)',
        margin: '0 auto',
        background: '#121212',
        borderRadius: '16px',
        padding: '80px 24px 24px'
      }}
      mb={144}
    >
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          width: '100%',
          fontWeight: 600,
          fontSize: '22px',
          lineHeight: '30px',
          textAlign: 'center',
          color: '#fff'
        }}
        mb={'30px'}
      >
        Marketplace
      </Typography>
      <Box
        sx={{
          minHeight: '100vh'
        }}
      >
        {children}
      </Box>
      <ComBtn
        sx={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translate3D(-50%, 0, 0)'
        }}
        onClick={() => {
          setOpenFilter(true)
        }}
      >
        Filter
        <img
          src={ArrowTop}
          style={{
            width: '16px',
            height: '16px',
            verticalAlign: 'middle',
            marginLeft: '4px'
          }}
          alt=""
          srcSet=""
        />
      </ComBtn>
      {openFilter && (
        <MobileFilterDialog
          setOpenFilter={setOpenFilter}
          filterConfig={filterConfig}
          handleSearch={() => {
            handleSearch && handleSearch()
          }}
        ></MobileFilterDialog>
      )}
    </Box>
  )
}
export default MarketplaceMobile
