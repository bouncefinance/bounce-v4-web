import { Autocomplete, IconButton, MenuItem, OutlinedInput, Stack } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import VerifiedIcon from '../VerifiedIcon'
import { ReactComponent as IconSVG } from './icon.svg'

export type ISearchOption = {
  label: string
  icon?: string
  value: any
}
export type ISearchProps = {
  disabled?: boolean
  freeSolo?: boolean
  value?: string
  selected?: ISearchOption
  multiple?: boolean
  options: ISearchOption[]
  renderOption?: (option: any) => ReactNode
  onChange?: (ev: React.SyntheticEvent<Element, Event>, value: string) => void
  onSearch?: (value: string) => void
  onSelect?: (ev: React.SyntheticEvent<Element, Event>, value: any) => void
  placeholder?: string
  startIcon?: boolean
  loadingText?: string
  [key: string]: any
}

const SearchInput: React.FC<ISearchProps> = ({
  disabled = false,
  freeSolo = true,
  value,
  selected,
  options,
  renderOption,
  multiple = false,
  onSearch,
  onChange,
  onSelect,
  placeholder,
  startIcon,
  loadingText,
  ...restProps
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setSelect] = useState<ISearchOption | null>(null)
  const handleSearch = (_value?: string) => {
    onSearch?.(_value || value || '')
  }
  useEffect(() => {
    setSelect(selected || null)
  }, [selected])

  return (
    <Autocomplete
      disabled={disabled}
      freeSolo={freeSolo}
      disableClearable
      loading
      loadingText={loadingText ? loadingText : ''}
      multiple={multiple}
      options={options}
      getOptionLabel={option => (typeof option === 'string' ? option : option.label)}
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
            placeholder={placeholder}
            style={{ paddingTop: 12 }}
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
      renderOption={(props: any, option) => {
        return (
          <MenuItem {...props} key={`${props.id}_${props.key}`}>
            <Stack direction="row" alignItems="center" spacing={8}>
              {/* {option.icon && (
                <Image src={option.icon} width={32} height={32} alt={option.label} style={{ borderRadius: '50%' }} />
              )} */}
              {option.icon && (
                <picture>
                  <img src={option.icon} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                </picture>
              )}
              <div>{renderOption ? renderOption(option) : option.label}</div>
              <VerifiedIcon ifKyc={option?.value?.ifKyc} />
            </Stack>
          </MenuItem>
        )
      }}
    />
  )
}

export default SearchInput
