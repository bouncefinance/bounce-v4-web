import { Autocomplete, Box, IconButton, MenuItem, OutlinedInput, Stack, Typography } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import { ReactComponent as IconSVG } from './icon.svg'
import VerifiedIcon from '../VerifiedIcon'
import { USER_TYPE } from 'api/user/type'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import { BackedTokenType } from 'pages/account/MyTokenOrNFT'
import getAuctionPoolLink from 'utils/auction/getAuctionPoolRouteLink'
import { PoolType } from 'api/pool/type'
import EmptyToken from 'assets/imgs/auction/token-default.svg'

export type ISearchOption = {
  label?: string
  icon?: string
  value?: any
  name?: string
  poolId?: number
  chainId?: number
  tokenType?: number
  category?: PoolType
  token0?: any
}

export type ISearchAllOption = { type: string; values: ISearchOption }

export type ISearchProps = {
  disabled?: boolean
  freeSolo?: boolean
  value?: string
  idx?: number
  selected?: ISearchOption
  multiple?: boolean
  options: ISearchAllOption[]
  renderOption?: (option: any) => ReactNode
  onChange?: (ev: React.SyntheticEvent<Element, Event>, value: string) => void
  onSearch?: (value: string) => void
  onSelect?: (ev: React.SyntheticEvent<Element, Event>, value: any) => void
  placeholder?: string
  startIcon?: boolean
  loadingText?: string
  [key: string]: any
  opacity?: number
  onFocus?: (value: boolean) => void
}

// const noFocusStyle: SxProps = {
//   width: 44,
//   width: '100%',
//   height: 44,
//   border: '1px solid var(--ps-border-1)',
//   borderRadius: 8,
//   fontSize: 0
// }

const HeaderSearchInput: React.FC<ISearchProps> = ({
  disabled = false,
  freeSolo = true,
  value,
  selected,
  options,
  multiple = false,
  onSearch,
  onChange,
  onSelect,
  placeholder,
  startIcon,
  loadingText,
  idx,
  opacity,
  onFocus,
  ...restProps
}) => {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setSelect] = useState<ISearchOption | null>(null)
  const handleSearch = (_value?: string) => {
    onSearch?.(_value || value || '')
  }
  useEffect(() => {
    setSelect(selected || null)
  }, [selected])
  const [focus, setFocus] = useState(false)

  const isOverHeader = opacity === undefined || opacity >= 0.65

  useEffect(() => {
    if (onFocus) {
      onFocus(focus)
    }
  }, [focus, onFocus])

  return (
    <Autocomplete
      fullWidth
      disabled={disabled}
      freeSolo={freeSolo}
      disableClearable
      loading
      loadingText={loadingText ? loadingText : ''}
      multiple={multiple}
      options={options}
      getOptionLabel={option => (typeof option === 'string' ? option : option.type)}
      {...restProps}
      onChange={(ev, value) => {
        onSelect?.(ev, value)
        setSelect(value as ISearchOption)
      }}
      inputValue={value}
      renderInput={params => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { InputProps, InputLabelProps, ...rest } = params
        return (
          <OutlinedInput
            {...InputProps}
            {...rest}
            className="OInput"
            value={value}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder={placeholder}
            sx={{
              fontSize: 13,
              fontFamily: `'Inter'`,
              borderRadius: 60,
              height: 44,
              width: 44,
              color: isOverHeader ? undefined : '#ffffff',
              background: isOverHeader ? '#F6F6F3!important' : '#F6F6F315!important',
              '& fieldset': {
                border: 'none'
              },
              border: 'transparent'
            }}
            onChange={ev => {
              onChange?.(ev, ev.target.value)
              setSelect(null)
            }}
            // startAdornment={
            //   select?.icon ? (
            //     <picture style={{ marginTop: 15 }}>
            //       <img src={select.icon} width={20} height={20} style={{ objectFit: 'cover', borderRadius: '50%' }} />
            //     </picture>
            //   ) : null
            // }
            startAdornment={
              startIcon && (
                <IconButton
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    transition: 'all 0.4s',
                    background: 'transparent',
                    '& svg path': {
                      stroke: isOverHeader ? '#232323' : '#ffffff'
                    },
                    '&:hover': {
                      '& svg path': {
                        // stroke: 'var(--ps-text-5)'
                      }
                      // background: 'var(--ps-text-4)'
                    }
                  }}
                  onClick={() => {
                    handleSearch()
                  }}
                >
                  <IconSVG />
                </IconButton>
              )
            }
            endAdornment={
              !startIcon && (
                <IconButton
                  onClick={() => {
                    handleSearch()
                  }}
                >
                  <IconSVG />
                </IconButton>
              )
            }
          />
        )
      }}
      renderOption={(props: any, option, { index }) => (
        <Box key={`${props.id}_${props.key}`}>
          {option.type === 'Auction' ? (
            <>
              {index === 0 ? (
                <Typography
                  fontFamily={'Public Sans'}
                  ml={18}
                  fontSize={14}
                  fontWeight={600}
                  color={'#959595'}
                  lineHeight={'21px'}
                >
                  {option.type}
                </Typography>
              ) : (
                ''
              )}
              <MenuItem
                onClick={() => {
                  const element = document.querySelector('.OInput input') as HTMLInputElement
                  element && element.blur()
                  const _to = getAuctionPoolLink(
                    0,
                    option.values.category ?? 1,
                    option.values.chainId ?? 1,
                    option.values.poolId ?? 0
                  )
                  console.log('_to>>>', _to)
                  navigate(_to)
                }}
              >
                <Stack width={'100%'} direction="row" alignItems="center" spacing={8} height={63}>
                  <picture>
                    <img
                      src={option.values?.token0?.smallUrl || EmptyToken}
                      style={{ width: 32, height: 32, borderRadius: '6px' }}
                    />
                  </picture>
                  <Box
                    width={'100%'}
                    sx={{
                      overflow: 'hidden',
                      '& p': {
                        width: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                      }
                    }}
                  >
                    <Typography
                      color={'#121212'}
                      fontSize={14}
                      lineHeight={'21px'}
                      fontWeight={600}
                      fontFamily={'Public Sans'}
                    >
                      {option.values.name}
                    </Typography>
                    <Typography color={'#959595'} fontSize={12} lineHeight={'18px'}>
                      {option.values.tokenType === BackedTokenType.TOKEN ? 'Token' : 'NFT'}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            </>
          ) : (
            <>
              {idx === index ? (
                <Typography
                  fontFamily={'Public Sans'}
                  ml={18}
                  fontSize={14}
                  fontWeight={600}
                  color={'#959595'}
                  lineHeight={'21px'}
                >
                  {option.type}
                </Typography>
              ) : (
                ''
              )}
              <MenuItem
                onClick={() => {
                  const element = document.querySelector('.OInput input') as HTMLInputElement
                  element && element.blur()
                  navigate(`${routes.profile.summary}?id=${option?.values.value?.userId}`)
                }}
              >
                <Stack direction="row" alignItems="center" spacing={8} height={63}>
                  {option.values?.icon && (
                    <picture>
                      <img src={option.values.icon} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                    </picture>
                  )}
                  <div>
                    <Typography>{option.values.label}</Typography>
                    <Typography>
                      {option?.values.value?.userType === USER_TYPE.USER && (
                        <span style={{ color: 'rgba(23, 23, 23, 0.7)' }}>#{option?.values.value?.fullNameId}</span>
                      )}
                    </Typography>
                  </div>
                  <VerifiedIcon ifKyc={option?.values?.value?.ifKyc} />
                </Stack>
              </MenuItem>
            </>
          )}
        </Box>
      )}
    />
  )
}

export default HeaderSearchInput
