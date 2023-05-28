import { Autocomplete, Box, IconButton, MenuItem, OutlinedInput, Stack, Typography } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import { ReactComponent as IconSVG } from './icon.svg'
import VerifiedIcon from '../VerifiedIcon'
import { USER_TYPE } from 'api/user/type'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'

export type ISearchOption = {
  label?: string
  icon?: string
  value?: any
  name?: string
  poolId?: number
  chainId?: number
  tokenType?: number
  category?: number
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
  const [, setFocus] = useState(false)

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
      value={value}
      renderInput={params => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { InputProps, InputLabelProps, ...rest } = params
        return (
          <OutlinedInput
            {...InputProps}
            {...rest}
            value={value}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder={placeholder}
            sx={{
              fontSize: 13,
              borderRadius: 8,
              height: 44,
              width: 44,
              '& fieldset': {
                border: 'none'
              }
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
                      stroke: '#232323'
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
                <Typography ml={18} fontSize={14} fontWeight={600} color={'#959595'} lineHeight={'21px'}>
                  {option.type}
                </Typography>
              ) : (
                ''
              )}
              <MenuItem>
                <Stack direction="row" alignItems="center" spacing={8} height={63}>
                  {option.values?.icon && (
                    <picture>
                      <img src={option.values.icon} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                    </picture>
                  )}
                  <div>
                    <Typography variant="h6">{option.values.name}</Typography>
                    <Typography color={'#959595'} fontSize={12} lineHeight={'18px'}>
                      NFT
                    </Typography>
                  </div>
                </Stack>
              </MenuItem>
            </>
          ) : (
            <>
              {idx === index ? (
                <Typography ml={18} fontSize={14} fontWeight={600} color={'#959595'} lineHeight={'21px'}>
                  {option.type}
                </Typography>
              ) : (
                ''
              )}
              <MenuItem
                onClick={() => {
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
                    {option.values.label}
                    {option?.values.value?.userType === USER_TYPE.USER && (
                      <span style={{ color: 'rgba(23, 23, 23, 0.7)', marginLeft: 8 }}>
                        #{option?.values.value?.fullNameId}
                      </span>
                    )}
                  </div>
                  <VerifiedIcon isVerify={option?.values?.value?.isVerify} />
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
