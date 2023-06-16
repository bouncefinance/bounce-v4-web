import { Box, Typography, styled, Select, MenuItem } from '@mui/material'
import { FilterSearchConfig } from './auction'
import { useState } from 'react'
import AddIcon from 'assets/imgs/realWorld/add.svg'
import DscIcon from 'assets/imgs/realWorld/dsc.svg'
import { ComBtn } from './marketplace'
import { AuctionFilterKey } from './auction'
import { useIsSMDown } from 'themes/useTheme'
import { ActionType, useValuesDispatch, useValuesState } from 'bounceComponents/real-world-collectibles/ValuesProvider'
interface SelectItemProps {
  config: FilterSearchConfig
  handleSelect: (key: string, value: string) => void
  value?: string
  min?: string
  max?: string
}
const SelectItemBtn = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  height: '44px',
  lineHeight: '44px',
  padding: '0 24px',
  fontFamily: `'Inter'`,
  fontWeight: 400,
  fontSize: '16px',
  background: '#20201E',
  color: 'var(--ps-text-5)',
  cursor: 'pointer',
  borderRadius: '8px',
  '&.active': {
    background: '#E1F25C',
    color: 'var(--ps-text-3)'
  },
  '&:hover': {
    background: '#E1F25C',
    color: 'var(--ps-text-3)'
  },
  [theme.breakpoints.down('md')]: {
    height: '34px',
    lineHeight: '34px',
    padding: '0 8px'
  }
}))
const FilterItem = styled(Box)(({ theme }) => ({
  maxHeight: 'auto',
  overflow: 'hidden',
  '&.slide': {
    maxHeight: '64px'
  },
  [theme.breakpoints.down('sm')]: {
    '&.slide': {
      maxHeight: '34px'
    }
  }
}))
const InputNum = styled('input')(({ theme }) => ({
  flex: 1,
  minWidth: '126px',
  height: '44px',
  padding: '0 16px',
  color: 'var(--ps-text-5)',
  fontFamily: `'Inter'`,
  fontSize: 16,
  background: 'var(--ps-text-4)',
  border: 'none',
  lightingColor: 'none',
  outline: 'none',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    minWidth: '85px',
    height: '52px'
  }
}))
export const SelectItem = (props: SelectItemProps) => {
  const { config, handleSelect, value } = props
  const [open, setOpen] = useState<boolean>(true)
  const isSm = useIsSMDown()
  return (
    <FilterItem className={open ? '' : 'slide'}>
      <Box
        sx={{
          width: '100%',
          height: isSm ? '34px' : '64px',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid rgba(255, 255, 255, 0.2)`,
          cursor: 'pointer'
        }}
        onClick={() => {
          const result = !open
          setOpen(result)
        }}
      >
        <Typography
          sx={{
            color: 'var(--ps-text-5)',
            fontWeight: 500,
            fontSize: '16px'
          }}
        >
          {config.label}
        </Typography>
        <img
          style={{
            width: '16px'
          }}
          src={open ? DscIcon : AddIcon}
          alt=""
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: '24px 0',
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'flex-start'
        }}
        gap={'12px'}
      >
        {config.values.map((item, index) => {
          return (
            <SelectItemBtn
              key={index}
              onClick={() => {
                handleSelect(config.key as unknown as string, item)
              }}
              className={value === item ? 'active' : ''}
            >
              {item}
            </SelectItemBtn>
          )
        })}
      </Box>
    </FilterItem>
  )
}
export const RangeItem = (props: SelectItemProps) => {
  const { config, handleSelect, value = '', min = '', max = '' } = props
  const [open, setOpen] = useState<boolean>(true)
  return (
    <FilterItem className={open ? '' : 'slide'}>
      <Box
        sx={{
          width: '100%',
          height: '64px',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid rgba(255, 255, 255, 0.2)`,
          cursor: 'pointer'
        }}
        onClick={() => {
          const result = !open
          setOpen(result)
        }}
      >
        <Typography
          sx={{
            color: 'var(--ps-text-5)',
            fontWeight: 500,
            fontSize: '16px'
          }}
        >
          {config.label}
        </Typography>
        <img
          style={{
            width: '16px'
          }}
          src={open ? DscIcon : AddIcon}
          alt=""
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: '24px 0',
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'flex-start'
        }}
      >
        <Select
          sx={{
            height: '44px',
            lineHeight: '44px',
            width: '100%',
            background: 'var(--ps-text-4)',
            color: 'var(--ps-text-5)',
            borderRadius: '8px',
            border: 'none',
            '.MuiSelect-select': {
              height: '44px',
              lineHeight: '44px',
              borderRadius: '8px',
              background: 'var(--ps-text-4)',
              color: 'var(--ps-text-5)',
              paddingLeft: '24px',
              border: 'none',
              '&:hover': {
                background: 'var(--ps-text-4)',
                color: 'var(--ps-text-5)',
                border: 'none'
              },
              '&:focus': {
                background: 'var(--ps-text-4)',
                color: 'var(--ps-text-5)',
                border: 'none'
              }
            },
            '.MuiSelect-nativeInput': {
              height: '44px',
              lineHeight: '44px',
              background: 'var(--ps-text-4)',
              color: 'var(--ps-text-5)',
              borderRadius: '8px',
              border: 'none'
            },
            '.MuiSelect-outlined': {
              border: 'none'
            },
            '.MuiSelect-icon path': {
              stroke: '#fff'
            },
            '&:hover': {
              background: 'var(--ps-text-4)',
              color: 'var(--ps-text-5)',
              border: 'none'
            }
          }}
          onChange={e => {
            handleSelect(AuctionFilterKey.range, e.target.value)
          }}
          variant={'standard'}
          value={value}
        >
          <MenuItem key={0} value={'SOL'}>
            SOL
          </MenuItem>
        </Select>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
            marginTop: '12px'
          }}
        >
          <InputNum
            onChange={e => {
              const result = e.target.value.replace(/[^\d]/g, '')
              handleSelect(AuctionFilterKey.min, result)
            }}
            placeholder="Min"
            value={min}
          />
          <Typography
            sx={{
              width: '40px',
              height: '44px',
              lineHeight: '44px',
              textAlign: 'center',
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: 16,
              color: 'var(--ps-text-2)'
            }}
          >
            to
          </Typography>
          <InputNum
            onChange={e => {
              const result = e.target.value.replace(/[^\d]/g, '')
              handleSelect(AuctionFilterKey.max, result)
            }}
            value={max}
            placeholder="Max"
          />
        </Box>
      </Box>
    </FilterItem>
  )
}
const LeftFilter = ({ config, handleSearch }: { config: FilterSearchConfig[]; handleSearch?: () => void }) => {
  const valuesState = useValuesState()
  const valuesDispatch = useValuesDispatch()
  const handleSelect = (key: string, value: string) => {
    switch (key) {
      case 'categories':
        valuesDispatch({
          type: ActionType.SetCategories,
          payload: {
            categories: value
          }
        })
        break
      case 'status':
        valuesDispatch({
          type: ActionType.SetStatus,
          payload: {
            status: value
          }
        })
        break
      case 'range':
        valuesDispatch({
          type: ActionType.SetRange,
          payload: {
            range: value
          }
        })
        break
      case 'min':
        valuesDispatch({
          type: ActionType.SetMin,
          payload: {
            min: value
          }
        })
        break
      case 'max':
        valuesDispatch({
          type: ActionType.SetMax,
          payload: {
            max: value
          }
        })
        break
      default:
        break
    }
  }
  const isSm = useIsSMDown()
  return (
    <Box
      sx={{
        padding: isSm ? '0 16px 70px' : '0 40px 0 0'
      }}
    >
      {config.map((item, index) => {
        let value = ''
        let min = ''
        let max = ''
        switch (item.key) {
          case AuctionFilterKey.categories:
            value = valuesState.categories || ''
            break
          case AuctionFilterKey.status:
            value = valuesState.status || ''
            break
          case AuctionFilterKey.range:
            value = valuesState.range || ''
            min = valuesState.min || ''
            max = valuesState.max || ''
            break
          default:
            value = ''
        }
        if (item.type === 'select') {
          return (
            <SelectItem
              key={index}
              value={value}
              config={item}
              handleSelect={(key: string, value: string) => {
                handleSelect(key, value)
              }}
            />
          )
        } else {
          return (
            <RangeItem
              key={index}
              value={valuesState.range || 'SOL'}
              min={min}
              max={max}
              config={item}
              handleSelect={(key: string, value: string) => {
                handleSelect(key, value)
              }}
            />
          )
        }
      })}
      <ComBtn
        sx={{
          position: isSm ? 'fixed' : 'relative',
          bottom: isSm ? '16px' : 'unset',
          left: isSm ? '16px' : 'unset',
          width: isSm ? '208px' : '100%',
          height: isSm ? '42px' : '53px',
          lineHeight: isSm ? '42px' : '53px',
          textAlign: 'center',
          fontFamily: `'Inter'`,
          fontSize: '16px'
        }}
        onClick={() => {
          handleSearch && handleSearch()
        }}
      >
        Apply
      </ComBtn>
    </Box>
  )
}
export default LeftFilter
