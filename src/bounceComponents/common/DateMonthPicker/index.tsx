import { IconButton, InputAdornment, OutlinedInput, Popover } from '@mui/material'
import React, { useCallback, useState } from 'react'
import dayjs from 'dayjs'
import Picker, { IDateProps } from './components/Picker'
import { monthEnum } from './components/Month'
import { ReactComponent as DateSVG } from 'assets/imgs/components/date.svg'

export type IDateMonthPickerProps = {
  disabled?: boolean
  value: number
  onChange: (val: IDateProps) => void
}

const DateMonthPicker: React.FC<IDateMonthPickerProps> = ({ value, onChange, disabled = false }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null)

  const handleDateChange = useCallback(
    (val: IDateProps) => {
      onChange(val)
    },
    [onChange]
  )

  const handleClick = useCallback((ev: any) => {
    setAnchorEl(ev.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <OutlinedInput
        disabled={disabled}
        aria-describedby="date-month-popover"
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <DateSVG />
            </IconButton>
          </InputAdornment>
        }
        value={
          value
            ? `${monthEnum.find(v => v.value === dayjs(value * 1000)?.month())?.shortLabel} ${dayjs(
                value * 1000
              )?.year()}`
            : ``
        }
        onClick={ev => !disabled && handleClick(ev)}
      />
      <Popover
        id="date-month-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        PaperProps={{
          sx: {
            borderRadius: 20,
            marginTop: 10,
            maxWidth: 'calc(38% - 32px)'
          }
        }}
      >
        <Picker date={value ? value * 1000 : Number(dayjs())} onChange={handleDateChange} onClose={handleClose} />
      </Popover>
    </>
  )
}

export default DateMonthPicker
