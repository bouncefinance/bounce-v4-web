import { Autocomplete, IconButton, MenuItem, OutlinedInput, Stack, SxProps } from '@mui/material'
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

const noFocusStyle: SxProps = {
  width: 44,
  height: 44,
  border: '1px solid var(--ps-border-1)',
  borderRadius: 8,
  fontSize: 0
}

const HeaderSearchOldInput: React.FC<ISearchProps> = ({
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
  const [focus, setFocus] = useState(false)

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
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder={focus ? placeholder : ''}
            sx={{
              '& fieldset': {
                border: 'none'
              },
              ...(focus ? { fontSize: 13, borderRadius: 8, height: 44 } : noFocusStyle)
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
                      stroke: focus ? 'var(--ps-text-5)' : '#232323'
                    },
                    '&:hover': {
                      '& svg path': {
                        stroke: 'var(--ps-text-5)'
                      },
                      background: 'var(--ps-text-4)'
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
              <VerifiedIcon isVerify={option?.value?.isVerify} />
            </Stack>
          </MenuItem>
        )
      }}
    />
  )
}

export default HeaderSearchOldInput
