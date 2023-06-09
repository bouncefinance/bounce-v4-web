import { Box, Typography } from '@mui/material'
import LeftFilter from './leftFilter'
import { FilterSearchConfig } from './auction'
import ArrowLeft from 'assets/imgs/realWorld/arrow_left.svg'

const MobileFilterDialog = ({
  setOpenFilter,
  filterConfig,
  handleSearch
}: {
  setOpenFilter: (open: boolean) => void
  filterConfig: FilterSearchConfig[]
  handleSearch: () => void
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: '0',
        right: 0,
        bottom: '0',
        zIndex: '1201'
      }}
    >
      {/* bg */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)'
        }}
        onClick={() => {
          setOpenFilter && setOpenFilter(false)
        }}
      ></Box>
      {/* content */}
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: 0,
          bottom: '0',
          width: '240px',
          overflowY: 'auto',
          background: '#121212'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '38px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontSize: '20px',
              fontWeight: 600,
              color: '#B5E529'
            }}
          >
            Filter
          </Typography>
          <img
            style={{
              width: '32px',
              height: '16px'
            }}
            src={ArrowLeft}
            onClick={() => {
              setOpenFilter && setOpenFilter(false)
            }}
          />
        </Box>
        <LeftFilter handleSearch={handleSearch} config={filterConfig}></LeftFilter>
      </Box>
    </Box>
  )
}
export default MobileFilterDialog
