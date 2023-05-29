import { Button, Stack } from '@mui/material'
import React, { useCallback, useState } from 'react'
import dayjs from 'dayjs'
import Year from './Year'
import Month from './Month'

export type IPickerProps = {
  date: number
  onChange?: (val: IDateProps) => void
  onClose?: () => void
}

export type IDateProps = {
  year: number
  month: number
}

const Picker: React.FC<IPickerProps> = ({ date, onChange, onClose }) => {
  const [year, setYear] = useState<number>(dayjs(date).year())
  const [month, setMonth] = useState<number>(dayjs(date).month())

  const handleApplay = useCallback(() => {
    onChange?.({ year, month })
    onClose?.()
  }, [month, onChange, onClose, year])

  const yearChange = useCallback((val: number) => {
    setYear(val)
  }, [])

  const monthChange = useCallback((val: number) => {
    setMonth(val)
  }, [])

  return (
    <Stack
      sx={{
        width: '100%',
        minHeight: 364,
        background: '#FFFFFF',
        boxShadow: '0px 2px 15px 2px rgba(0, 0, 0, 0.02), 0px 8px 32px rgba(0, 0, 0, 0.12)',
        borderRadius: 20,
        padding: '40px 30px'
      }}
    >
      <Year year={year} onChange={yearChange} />
      <Month month={month} onChange={monthChange} />
      <Stack direction="row" justifyContent="center">
        <Button variant="contained" sx={{ width: '80%' }} onClick={handleApplay}>
          Apply
        </Button>
      </Stack>
    </Stack>
  )
}

export default Picker
