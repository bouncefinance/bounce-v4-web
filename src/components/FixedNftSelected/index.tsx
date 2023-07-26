import { useMemo, useState } from 'react'
import { Box, Typography, Input, styled } from '@mui/material'
import UpArrowIcon from 'assets/imgs/common/upArrow.svg'
import BottomArrowIcon from 'assets/imgs/common/bottomArrow.svg'
import SearchSvg from 'assets/imgs/common/search.svg'
import { useOptionDatas } from 'state/configOptions/hooks'
import { useGetListBySearchValue } from 'bounceHooks/auction/useTokenList'
import { useDebounce } from 'ahooks'
import SearchIcon from '@mui/icons-material/Search'
import { initialValues, InitialValuesPros } from 'pages/nftAuction/components/listDialog'
import { getLabelById } from 'utils'
import { ChainId } from 'constants/chain'

const SearchInput = styled(Input)(() => ({
  height: 38,
  lineHeight: '38px',
  flex: 1,
  borderRadius: 20,
  padding: '0 16px',
  border: 0,
  '&.MuiInputBase-root': {
    '&:after': {
      border: 0
    }
  },
  '&.MuiInputBase-root:hover': {
    border: 0
  },
  '.Mui-disabled': {
    color: 'var(--ps-text-3) !important',
    textFillColor: 'var(--ps-text-3) !important'
  }
}))
interface SelectDialogProps {
  open?: boolean
  title: string
  list: any[] | undefined
}
interface OptionListProps {
  list: SelectDialogProps[]
  currentIndex: number
  setCurrentIndex: (index: number) => void
}
interface SelectItemBtnProps {
  title: string
  status: boolean // focus:true, blur: false
  handleClick: () => void
}
interface SearchBoxProps {
  open: boolean
  handleCancel: () => void
}
const searchTypeOptions = ['Pool Name', 'Pool ID', 'Creator Name', 'Creator Address']
export default function FixedSelected({ handleSubmit }: { handleSubmit: (values: InitialValuesPros) => void }) {
  const optionDatas = useOptionDatas()
  const [chain, setChain] = useState<number>(3)
  const [filterInputValue, setFilterInputValue] = useState<string>('')
  const chainId = getLabelById(chain, 'ethChainId', optionDatas?.chainInfoOpt || []) as ChainId
  const debouncedFilterInputValue = useDebounce(filterInputValue, { wait: 400 })
  const { data: tokenList } = useGetListBySearchValue(chainId, debouncedFilterInputValue)
  const [filterValues, setFilterValues] = useState<InitialValuesPros>(initialValues)
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
        list: chainList ? [{ label: 'All Chain', value: 0 }, ...chainList] : chainList
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
            value: 5
          },
          {
            label: 'English Auction NFT',
            value: 6
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
      },
      {
        title: 'Clear',
        list: []
      }
    ],
    [chainList, tokenList]
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchTypeIndex, setSearchTypeIndex] = useState<number>(99)
  const currentData = useMemo(() => {
    if (currentIndex === 99) {
      return {
        title: '',
        list: []
      }
    } else {
      return selecteOption[currentIndex] && selecteOption[currentIndex]
    }
  }, [currentIndex, selecteOption])
  const SelectItemBtn = (props: SelectItemBtnProps) => {
    const { title, status, handleClick } = props
    if (title === 'Search') {
      return (
        <Box
          onClick={() => {
            handleClick && handleClick()
          }}
          sx={{
            padding: 18,
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            background: status ? 'var(--ps-text-3)' : 'var(--ps-text-4)',
            borderRadius: 8,
            fontFamily: `'Inter'`,
            color: status ? '#fff' : 'var(--ps-text-5)',
            '&:hover': {
              background: 'var(--ps-text-3)',
              color: '#fff'
            }
          }}
        >
          <img
            style={{
              width: 18,
              height: 18
            }}
            src={SearchSvg}
            alt=""
          />
        </Box>
      )
    }
    if (title === 'Cancel' || title === 'Confirm') {
      return (
        <Box
          onClick={() => {
            handleClick && handleClick()
          }}
          sx={{
            padding: 16,
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            background: status ? 'var(--ps-text-3)' : 'var(--ps-text-4)',
            borderRadius: 8,
            fontFamily: `'Inter'`,
            color: status ? '#fff' : 'var(--ps-text-5)',
            '&:hover': {
              background: 'var(--ps-text-3)',
              color: '#fff'
            }
          }}
        >
          {title === 'Confirm' ? 'Search' : title}
        </Box>
      )
    }
    return (
      <Box
        onClick={() => {
          handleClick && handleClick()
        }}
        sx={{
          padding: 16,
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          background: status ? 'var(--ps-text-3)' : 'var(--ps-text-4)',
          borderRadius: 8,
          fontFamily: `'Inter'`,
          color: status ? '#fff' : 'var(--ps-text-5)',
          '&:hover': {
            background: 'var(--ps-text-3)',
            color: '#fff'
          }
        }}
      >
        {title}
        {!!status && title !== 'Clear' && (
          <img
            style={{
              width: 20,
              height: 20,
              marginLeft: 4
            }}
            src={UpArrowIcon}
            alt=""
          />
        )}
        {!status && title !== 'Clear' && (
          <img
            style={{
              width: 20,
              height: 20,
              marginLeft: 4
            }}
            src={BottomArrowIcon}
            alt=""
          />
        )}
      </Box>
    )
  }
  const setValuesItem = (title?: string, item?: any) => {
    let result: InitialValuesPros = Object.assign({}, initialValues, filterValues)
    switch (title) {
      case 'Chain':
        setChain(Number(item.value))
        result.chain = Number(item.value)
        break
      case 'Token':
        result.tokenFromAddress = item.contract
        result.tokenFromSymbol = item.symbol
        result.tokenFromLogoURI = item.logoURI
        result.tokenFromDecimals = item.decimals
        break
      case 'Status':
        result.poolStatus = item.value
        break
      case 'Auction':
        result.auctionType = item.value
        break
      case 'Sort By':
        result.sortBy = item.value
        break
    }
    if (typeof searchTypeIndex === 'number' && searchTypeIndex !== 99) {
      const seatchValue = {
        searchType: searchTypeIndex,
        searchText: searchValue || ''
      }
      result = Object.assign(result, seatchValue)
    }
    setFilterValues(result)
    handleSubmit(result)
    setDialogOpen(false)
  }
  const SelectDialog = (porps: SelectDialogProps) => {
    const { title, list } = porps
    const RowItem = ({
      title,
      handleClick,
      item,
      isLight
    }: {
      title: string
      item: any
      handleClick: () => void
      isLight: boolean
    }) => {
      return (
        <Box
          sx={{
            position: 'relative',
            lineHeight: '38px',
            padding: '0 16px',
            width: '100%',
            color: isLight ? 'var(--ps-yellow-1)' : '#fff',
            fontFamily: `'Inter'`,
            fontSize: 14,
            cursor: 'pointer',
            borderRadius: 8,
            '&:hover': {
              background: 'var(--ps-yellow-1)',
              color: 'var(--ps-text-3)'
            }
          }}
          onClick={() => {
            handleClick && handleClick()
          }}
        >
          {title === 'Token' ? item.symbol : item.label}
        </Box>
      )
    }
    return (
      <Box
        sx={{
          position: 'absolute',
          bottom: 66,
          left: 0,
          right: 0,
          maxHeight: 285,
          padding: 6,
          transition: 'all 0.6s',
          transform: dialogOpen ? 'translateY(0)' : 'translateY(100%)',
          opacity: dialogOpen ? 1 : 0,
          background: 'var(--ps-text-3)',
          borderRadius: 8
        }}
        onMouseLeave={() => {
          setDialogOpen(false)
          setFilterInputValue('')
        }}
      >
        <Box
          sx={{
            height: '38px',
            padding: '0 16px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap'
          }}
        >
          <Typography
            component={'span'}
            sx={{
              fontFamily: `'Inter'`,
              height: '38px',
              lineHeight: '38px',
              color: 'var(--ps-text-2)',
              fontSize: 12,
              width: title === 'Token' ? 50 : 'unset'
            }}
          >
            {title}
          </Typography>
          {title === 'Token' && (
            <SearchInput
              autoFocus={true}
              value={filterInputValue}
              onChange={(event: any) => {
                setFilterInputValue(event.target.value)
              }}
              startAdornment={<SearchIcon sx={{ mr: 4 }} />}
              placeholder="Search by token name or contract address"
            />
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
            maxHeight: 180,
            marginTop: 12,
            overflowY: 'auto'
          }}
        >
          {list &&
            list.map((item, i) => {
              return (
                <RowItem
                  key={i}
                  isLight={
                    // eslint-disable-next-line react/prop-types
                    (title === 'Chain' && filterValues.chain === Number(item.value)) ||
                    // eslint-disable-next-line react/prop-types
                    (title === 'Token' && filterValues.tokenFromAddress === item.address) ||
                    // eslint-disable-next-line react/prop-types
                    (title === 'Status' && filterValues.poolStatus === item.value) ||
                    // eslint-disable-next-line react/prop-types
                    (title === 'Auction' && filterValues.auctionType === Number(item?.value)) ||
                    // eslint-disable-next-line react/prop-types
                    (title === 'Sort By' && filterValues.sortBy === Number(item?.value))
                  }
                  title={title}
                  item={item}
                  handleClick={() => setValuesItem(title, item)}
                />
              )
            })}
        </Box>
      </Box>
    )
  }
  const SearchDialog = (porps: SelectDialogProps) => {
    const { title, list, open } = porps
    const RowItem = ({ handleClick, item, isLight }: { item: any; handleClick: () => void; isLight: boolean }) => {
      return (
        <Box
          sx={{
            position: 'relative',
            lineHeight: '38px',
            padding: '0 16px',
            width: '100%',
            color: isLight ? 'var(--ps-yellow-1)' : '#fff',
            fontFamily: `'Inter'`,
            fontSize: 14,
            cursor: 'pointer',
            borderRadius: 8,
            '&:hover': {
              background: 'var(--ps-yellow-1)',
              color: 'var(--ps-text-3)'
            }
          }}
          onClick={() => {
            handleClick && handleClick()
          }}
        >
          {item.label}
        </Box>
      )
    }
    return (
      <Box
        sx={{
          position: 'absolute',
          bottom: 66,
          left: 0,
          right: 0,
          maxHeight: 285,
          padding: 6,
          transition: 'all 0.6s',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          opacity: open ? 1 : 0,
          background: 'var(--ps-text-3)',
          borderRadius: 8,
          zIndex: 3
        }}
        onMouseLeave={() => {
          setSearchDialogOpen(false)
          setSearchValue('')
        }}
      >
        <Box
          sx={{
            height: '38px',
            padding: '0 16px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap'
          }}
        >
          <Typography
            component={'span'}
            sx={{
              fontFamily: `'Inter'`,
              height: '38px',
              lineHeight: '38px',
              color: 'var(--ps-text-2)',
              fontSize: 12
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            maxHeight: 180,
            marginTop: 12,
            overflowY: 'auto'
          }}
        >
          {list &&
            list.map((item, i) => {
              return (
                <RowItem
                  key={i}
                  isLight={searchTypeIndex === Number(i)}
                  item={item}
                  handleClick={() => {
                    setSearchTypeIndex(i)
                    setSearchDialogOpen(false)
                  }}
                />
              )
            })}
        </Box>
      </Box>
    )
  }
  const SearchBox = (props: SearchBoxProps) => {
    const { open, handleCancel } = props
    return (
      <Box
        sx={{
          position: 'absolute',
          left: open ? 0 : '100%',
          bottom: 0,
          width: open ? '100%' : 0,
          display: 'flex',
          padding: '0 16px',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          background: 'var(--ps-text-3)',
          borderRadius: 8,
          transition: 'opacity 0.3s width 0.1s left 12s',
          zIndex: 2,
          opacity: open ? 1 : 0
        }}
      >
        <SearchInput
          autoFocus={true}
          disabled={searchTypeIndex === 99}
          value={searchValue}
          onChange={(event: any) => {
            setSearchValue(event.target.value)
          }}
          startAdornment={<SearchIcon sx={{ mr: 4 }} />}
          placeholder="Search by token name or contract address"
          onKeyPress={event => {
            if (event.charCode === 13) {
              setValuesItem()
            }
          }}
        />
        <SelectItemBtn
          title={
            typeof searchTypeIndex === 'number' && searchTypeIndex !== 99
              ? searchTypeOptions[searchTypeIndex]
              : 'Search Type'
          }
          status={false}
          handleClick={() => {
            setSearchDialogOpen(true)
          }}
        />
        <SelectItemBtn
          title={'Confirm'}
          status={false}
          handleClick={() => {
            setSearchDialogOpen(false)
            setValuesItem()
          }}
        />
        <SelectItemBtn
          title={'Cancel'}
          status={false}
          handleClick={() => {
            setSearchValue('')
            setSearchTypeIndex(99)
            handleCancel && handleCancel()
          }}
        />
        {searchDialogOpen && <SearchDialog title={'Search'} open={searchDialogOpen} list={selecteOption[5].list} />}
      </Box>
    )
  }
  const OptionList = (props: OptionListProps) => {
    const { list, currentIndex, setCurrentIndex } = props
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexFlow: 'row nowrap',
          background: 'var(--ps-text-3)',
          borderRadius: 8
        }}
      >
        {list.map((item, i) => {
          // eslint-disable-next-line react/prop-types
          const { title } = item
          return (
            <SelectItemBtn
              key={i}
              title={title || ''}
              status={Number(currentIndex) === Number(i)}
              handleClick={() => {
                if (title === 'Clear') {
                  // reset filter condition
                  setFilterValues(initialValues)
                  handleSubmit(initialValues)
                  setSearchValue('')
                  setSearchTypeIndex(99)
                  setDialogOpen(false)
                } else if (title === 'Search') {
                  setCurrentIndex(i)
                  setDialogOpen(false)
                } else {
                  setCurrentIndex(i)
                  setDialogOpen(true)
                }
              }}
            />
          )
        })}
        {dialogOpen && currentData.list && currentData.list.length && (
          <SelectDialog title={currentData.title} list={currentData.list} />
        )}
        <SearchBox open={Number(currentIndex) === 5} handleCancel={() => setCurrentIndex(7)} />
      </Box>
    )
  }
  return (
    <OptionList list={selecteOption} setCurrentIndex={i => setCurrentIndex(i)} currentIndex={currentIndex}></OptionList>
  )
}
