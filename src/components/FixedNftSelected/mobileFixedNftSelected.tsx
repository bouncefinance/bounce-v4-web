import styled from '@emotion/styled'
import { Button, Drawer, Box, IconButton, Stack, Typography, InputBase } from '@mui/material'
import { useDebounce } from 'ahooks'
import { ReactComponent as BottomArrowIcon } from 'assets/imgs/common/bottomArrow.svg'
import { ReactComponent as SearchSvg } from 'assets/imgs/common/search.svg'
import { useGetListBySearchValue } from 'bounceHooks/auction/useTokenList'
import { ChainId } from 'constants/chain'
import { initialValues, InitialValuesPros } from 'pages/nftAuction/components/listDialog'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useOptionDatas } from 'state/configOptions/hooks'
import { getLabelById } from 'utils'
import { PoolType } from 'api/pool/type'

export interface IDrawerOpen {
  open: boolean
  title: 'search' | 'filter' | ''
}
const searchTypeOptions = ['Pool Name', 'Pool ID', 'Creator Name', 'Creator Address']
const filterType = { Chain: '', Auction: '', Status: '', Token: '', 'Sort By': '', Clear: '' }
const MobileFixedSelected = ({ handleSubmit }: { handleSubmit: (values: InitialValuesPros) => void }) => {
  const optionDatas = useOptionDatas()
  const [currOpen, setCurrOpen] = useState<IDrawerOpen>({ open: false, title: '' })
  const [chain] = useState<number>(3)
  const [searchVal, setSearchVal] = useState('')
  const chainId = getLabelById(chain, 'ethChainId', optionDatas?.chainInfoOpt || []) as ChainId
  const debouncedFilterInputValue = useDebounce(searchVal, { wait: 400 })
  const { data: tokenList } = useGetListBySearchValue(chainId, debouncedFilterInputValue)
  const [filterValues, setFilterValues] = useState(initialValues)
  const [selectButton, setSelectButton] = useState('')
  const [selectMenuItem, setSelectMenuItem] = useState<any>(filterType)

  useEffect(() => {
    setValues({ type: 'Search Val', item: { value: searchVal } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal])
  const chainList = useMemo(
    () =>
      optionDatas?.chainInfoOpt?.map(item => {
        return {
          label: item.chainName,
          value: item.id
        }
      }),
    [optionDatas?.chainInfoOpt]
  )
  const selecteOption = useMemo(
    () => [
      {
        title: 'Chain',
        name: 'searchType',
        list: chainList
      },
      {
        title: 'Auction',
        name: 'auctionType',
        list: [
          {
            label: 'All NFT',
            value: 0
          },
          {
            label: 'Fixed Swap NFT',
            value: PoolType.fixedSwapNft
          },
          {
            label: 'English Auction NFT',
            value: PoolType.ENGLISH_AUCTION_NFT
          }
        ]
      },
      {
        title: 'Status',
        name: 'poolStatus',
        list: [
          {
            label: 'All Status',
            value: '0'
          },
          {
            label: 'Live',
            value: 'live'
          },
          {
            label: 'Close',
            value: 'finished'
          },
          {
            label: 'Upcoming',
            value: 'upcoming'
          }
        ]
      },
      {
        title: 'Token',
        name: 'tokenFromSymbol',
        list: tokenList || []
      },
      {
        title: 'Sort By',
        list: [
          {
            label: 'Start Time',
            value: 0
          },
          {
            label: 'Creation Time',
            value: 1
          }
        ]
      },

      {
        title: 'Search',
        list: searchTypeOptions.map((item, index) => {
          return {
            label: item,
            value: index
          }
        })
      }
    ],
    [chainList, tokenList]
  )
  const setValues = ({ type, item, isCancel }: { type: string; item: any; isCancel?: boolean }) => {
    const body = { ...filterValues }
    switch (type) {
      case 'Chain':
        body.chain = isCancel ? initialValues['chain'] : Number(item.value)
        break
      case 'Auction':
        body.auctionType = isCancel ? initialValues['auctionType'] : Number(item.value)
        break
      case 'Status':
        body.poolStatus = isCancel ? initialValues['poolStatus'] : item.value
        break
      case 'Token':
        body.tokenFromAddress = isCancel ? initialValues['tokenFromAddress'] : item.contract
        body.tokenFromSymbol = isCancel ? initialValues['tokenFromSymbol'] : item.symbol
        body.tokenFromLogoURI = isCancel ? initialValues['tokenFromLogoURI'] : item.logoURI
        body.tokenFromDecimals = isCancel ? initialValues['tokenFromDecimals'] : item.decimals
        break
      case 'Sort By':
        body.sortBy = isCancel ? initialValues['sortBy'] : item.value
        break
      case 'Search':
        body.searchType = isCancel ? initialValues['searchType'] : item.value
        break
      case 'Search Val':
        body.searchText = item.value
    }

    setFilterValues({ ...body })
  }
  const submit = () => {
    handleSubmit(filterValues)
    closeDrawer()
  }
  const clear = () => {
    setSearchVal('')
    setSelectMenuItem(filterType)
    setSelectButton('')
    setFilterValues(initialValues)
    handleSubmit(initialValues)
    closeDrawer()
  }
  const menuItemStatus = useCallback(
    ({ title, item }: { title: string; item: any }) => {
      return selectMenuItem[title] === (title === 'Token' ? item.symbol : item.label)
    },
    [selectMenuItem]
  )
  const closeDrawer = () => {
    setCurrOpen({ open: false, title: '' })
  }
  const DrawerTitle = ({ title }: { title: string }) => {
    return (
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography sx={{ color: '#B5E529', fontSize: 20, lineHeight: '130%' }}>{title}</Typography>
        <Box
          onClick={() => {
            closeDrawer()
          }}
          sx={{ transform: 'rotate(90deg)' }}
        >
          <BottomArrowIcon />
        </Box>
      </Stack>
    )
  }
  const FixedIcon = () => {
    return (
      <Stack
        direction="row"
        alignItems={'center'}
        spacing={6}
        sx={{
          position: 'fixed',
          top: '76%',
          right: 110,
          width: 139,
          height: 50,
          backgroundColor: '#121212',
          borderRadius: 6
        }}
      >
        <Button
          sx={{
            width: 83,
            height: 42,
            backgroundColor: '#20201E',
            color: '#D7D6D9',
            fontSize: 13,
            lineHeight: '150%',
            borderRadius: 6,
            '& svg': {
              transform: 'rotate(180deg)'
            }
          }}
          endIcon={<BottomArrowIcon />}
          onClick={() => setCurrOpen({ open: true, title: 'filter' })}
        >
          Filter
        </Button>
        <IconButton
          sx={{
            width: 42,
            height: 42,
            backgroundColor: '#20201E',
            borderRadius: 6
          }}
          onClick={() => setCurrOpen({ open: true, title: 'search' })}
        >
          <SearchSvg />
        </IconButton>
      </Stack>
    )
  }
  const SelectItem = ({ data }: { data: any }) => {
    return (
      <Box>
        <FilterButton
          onClick={() => {
            selectButton === data.title ? setSelectButton('') : setSelectButton(data.title)
          }}
          sx={{ border: selectButton === data.title ? '1px solid #E1F25C' : '' }}
        >
          <Typography>{data.title}</Typography>
          <BottomArrowIcon />
        </FilterButton>
        {data.list?.length > 0 && (
          <Stack
            sx={{
              display: selectButton === data.title ? 'block' : 'none',
              maxHeight: 123,
              marginTop: 8,
              padding: '20px 22px',
              overflowY: 'scroll',
              backgroundColor: '#20201E',
              shadow: '0px 1px 4px rgba(0, 0, 0, 0.12)',
              borderRadius: 8,
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            {data.list.map((item: any, id: number) => (
              <Typography
                mb={15}
                key={id}
                onClick={() => {
                  setSelectMenuItem({
                    ...selectMenuItem,
                    [data.title]: menuItemStatus({ title: data.title, item })
                      ? ''
                      : data.title === 'Token'
                      ? item.symbol
                      : item.label
                  })
                  setValues({
                    type: data.title,
                    item,
                    isCancel: menuItemStatus({ title: data.title, item })
                  })
                }}
                sx={{
                  color: menuItemStatus({ title: data.title, item }) ? '#E1F25C' : '#FFFFFF',
                  fontSize: 13,
                  lineHeight: '150%'
                }}
              >
                {data.title === 'Token' ? item.symbol : item.label}
              </Typography>
            ))}
          </Stack>
        )}
      </Box>
    )
  }
  const FilterContainer = () => {
    return (
      <>
        <DrawerTitle title="Filter" />
        <Stack gap={16} mt={36}>
          {selecteOption
            .filter(item => item.title !== 'Search')
            .map((type, tid) => (
              <SelectItem data={type} key={tid} />
            ))}
        </Stack>
      </>
    )
  }
  const SearchContainer = () => {
    return (
      <>
        <DrawerTitle title="Search" />
        <InputBase
          key="search-input"
          autoFocus
          value={searchVal}
          onChange={e => {
            setSearchVal(e.target.value.trim())
          }}
          onKeyDown={e => e.key === 'Enter' && submit()}
          startAdornment={<SearchSvg />}
          placeholder="Search..."
          sx={{
            width: '100%',
            marginTop: 36,
            backgroundColor: '#20201E',
            border: 'none',
            outline: 'none',
            color: '#959595',
            paddingLeft: 16,
            '& .MuiInputBase-input': {
              textIndent: 15
            }
          }}
        />
        <Stack gap={16} mt={36}>
          {selecteOption
            .filter(item => item.title === 'Search' || item.title === 'Clear')
            .map((type, tid) => (
              <SelectItem data={type} key={tid} />
            ))}
        </Stack>
      </>
    )
  }
  const DrawerBtn = () => {
    return (
      <Stack>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            marginBottom: 10,
            border: '1px solid var(--ps-yellow-1)',
            '&.MuiButton-root:hover': {
              backgroundColor: 'transparent'
            }
          }}
          onClick={() => clear()}
        >
          Clear
        </Button>
        <Button onClick={() => submit()} variant="contained" sx={{ fontSize: 14, backgroundColor: '#E1F25C' }}>
          Apply
        </Button>
      </Stack>
    )
  }
  return (
    <>
      <FixedIcon />
      <DrawerBox key="drawer" open={currOpen.open} anchor="left" onClose={closeDrawer}>
        <Stack height={'calc(100% - 130px)'} direction={'column'} sx={{ overflowY: 'scroll' }}>
          <Box
            sx={{
              height: '100%',
              overflowY: 'scroll',
              overflowX: 'hidden',
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            {currOpen.title === 'filter' && <FilterContainer />}
            {currOpen.title === 'search' && <SearchContainer />}
          </Box>
        </Stack>
        <DrawerBtn />
      </DrawerBox>
    </>
  )
}
const DrawerBox = styled(Drawer)({
  '& .MuiDrawer-paperAnchorLeft': {
    width: '75vw',
    padding: 16,
    backgroundColor: '#121212',
    overflowY: 'auto'
  },
  zIndex: 9999
})
const FilterButton = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '21px 16px',
  color: '#D7D6D9',
  backgroundColor: '#20201E',
  borderRadius: 6,
  fontFamily: 'Inter',
  boxSizing: 'border-box'
})
export default MobileFixedSelected
