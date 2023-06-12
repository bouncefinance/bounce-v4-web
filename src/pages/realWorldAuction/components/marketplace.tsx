// import { Box, Typography, Select, MenuItem, styled, useTheme } from '@mui/material'
import { Box, Typography, styled, useTheme } from '@mui/material'
import { FilterSearchConfig } from './auction'
import ArrowRight from 'assets/imgs/realWorld/arrow_right.svg'
import ArrowLeft from 'assets/imgs/realWorld/arrow_left.svg'
import RefreshSvg from 'assets/imgs/realWorld/refresh.svg'
// import RangeSvg from 'assets/imgs/realWorld/range.svg'
import LeftFilter from './leftFilter'
import { useState } from 'react'
import IconSVG from 'bounceComponents/common/SearchInput/icon.svg'
import { useValuesState, ActionType, useValuesDispatch } from 'bounceComponents/real-world-collectibles/ValuesProvider'
import { BannerType } from './banner'
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
const ComSearch = styled(Box)(() => ({
  width: '200px',
  height: '38px',
  background: '#fff',
  borderRadius: '8px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px',
  '.searchInput': {
    border: 'none',
    background: 'none',
    outline: 'none',
    flex: 1,
    height: '18px',
    lineHeight: '18px'
  }
}))
const Marketplace = ({
  filterConfig,
  children,
  handleSetOpen,
  handleSearch,
  poolList
}: {
  filterConfig: FilterSearchConfig[]
  children: JSX.Element
  handleSetOpen?: (open: boolean) => void
  handleSearch?: () => void
  poolList?: BannerType[]
}) => {
  //   const [chainFilter, setChainFilter] = useState<number>(0)
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const valuesDispatch = useValuesDispatch()
  const valuesState = useValuesState()
  const theme = useTheme()
  const refreshData = () => {
    valuesDispatch({
      type: ActionType.ClearParams,
      payload: {}
    })
    handleSearch && handleSearch()
  }
  const handleSetSearch = (value: string) => {
    valuesDispatch({
      type: ActionType.SetKeyword,
      payload: {
        keyword: value
      }
    })
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: 'calc(100% - 40px)',
        maxWidth: '1296px',
        minHeight: `calc(100vh - ${theme.height.header})`,
        margin: '0 auto',
        background: '#121212',
        borderRadius: '30px',
        padding: '80px 40px 40px'
      }}
      mb={144}
    >
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          width: '700px',
          fontWeight: 600,
          fontSize: '36px',
          lineHeight: '30px',
          color: '#fff'
        }}
        mb={'40px'}
      >
        Marketplace
      </Typography>
      {/* filter head */}
      <Box
        sx={{
          height: '38px',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          marginBottom: '33px'
        }}
      >
        {/* left */}
        <Box
          sx={{
            height: '38px',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          {openFilter && (
            <Box
              sx={{
                height: '38px',
                width: '360px',
                display: 'flex',
                flexFlow: 'row nowrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                sx={{
                  fontFamily: `'Public Sans'`,
                  fontSize: '28px',
                  color: '#B5E529'
                }}
              >
                Filter
              </Typography>
              <img
                style={{
                  width: '32px',
                  height: '16px',
                  marginRight: '20px',
                  cursor: 'pointer'
                }}
                src={ArrowLeft}
                alt=""
                srcSet=""
                onClick={() => {
                  setOpenFilter(false)
                  handleSetOpen && handleSetOpen(false)
                }}
              />
            </Box>
          )}
          {!openFilter && (
            <>
              <ComBtn
                onClick={() => {
                  setOpenFilter(true)
                  handleSetOpen && handleSetOpen(true)
                }}
              >
                Filter
              </ComBtn>
              <img
                style={{
                  width: '32px',
                  height: '16px',
                  marginRight: '20px',
                  cursor: 'pointer'
                }}
                src={ArrowRight}
                alt=""
                srcSet=""
                onClick={() => {
                  setOpenFilter(true)
                  handleSetOpen && handleSetOpen(true)
                }}
              />
            </>
          )}
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              color: '#fff',
              fontSize: '16px',
              marginRight: '9px'
            }}
          >
            {poolList?.length || 1} items
          </Typography>
          <img
            style={{
              width: '19px',
              height: '19px',
              cursor: 'pointer'
            }}
            src={RefreshSvg}
            alt=""
            onClick={() => {
              refreshData()
            }}
          />
        </Box>
        {/* right condition */}
        <Box
          sx={{
            height: '38px',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
          gap={'12px'}
        >
          <ComSearch>
            <img
              style={{
                verticalAlign: 'middle',
                marginRight: '8px',
                cursor: 'pointer'
              }}
              src={IconSVG}
              alt=""
              onClick={() => {
                handleSearch && handleSearch()
              }}
            />
            <input
              className="searchInput"
              value={valuesState.keyword}
              placeholder="Search By Name"
              onChange={e => {
                handleSetSearch(e.target.value)
              }}
            />
          </ComSearch>
          {/* <Select
            sx={{
              width: '200px',
              height: '38px',
              '.MuiSelect-select': {
                paddingRight: '14px !important'
              },
              '.MuiSelect-iconOutlined': {
                display: 'none'
              }
            }}
            value={chainFilter}
            onChange={e => setChainFilter(Number(e.target.value))}
          >
            <MenuItem key={0} value={0}>
              <img
                style={{
                  verticalAlign: 'middle',
                  marginRight: '8px'
                }}
                src={RangeSvg}
                alt=""
              />
              Recently added
            </MenuItem>
          </Select> */}
        </Box>
      </Box>
      {/* list content */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <Box
          sx={{
            width: openFilter ? '360px' : '0',
            transition: 'width 0.6s',
            overflow: 'hidden'
          }}
        >
          <LeftFilter handleSearch={handleSearch} config={filterConfig}></LeftFilter>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
            minHeight: '80vh'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
export default Marketplace
