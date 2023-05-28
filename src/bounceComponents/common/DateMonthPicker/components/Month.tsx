import { Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

export const monthEnum = [
  {
    value: 0,
    label: 'January',
    shortLabel: 'Jan'
  },
  {
    value: 1,
    label: 'February',
    shortLabel: 'Feb'
  },
  {
    value: 2,
    label: 'March',
    shortLabel: 'Mar'
  },
  {
    value: 3,
    label: 'April',
    shortLabel: 'Apr'
  },
  {
    value: 4,
    label: 'May',
    shortLabel: 'May'
  },
  {
    value: 5,
    label: 'June',
    shortLabel: 'Jun'
  },
  {
    value: 6,
    label: 'July',
    shortLabel: 'Jul'
  },
  {
    value: 7,
    label: 'August',
    shortLabel: 'Aug'
  },
  {
    value: 8,
    label: 'September',
    shortLabel: 'Sep'
  },
  {
    value: 9,
    label: 'October',
    shortLabel: 'Oct'
  },
  {
    value: 10,
    label: 'November',
    shortLabel: 'Nov'
  },
  {
    value: 11,
    label: 'December',
    shortLabel: 'Dec'
  }
]

export type IMonthProps = {
  month: number
  onChange: (month: number) => void
}

const Month: React.FC<IMonthProps> = ({ month, onChange }) => {
  const [val, setVal] = useState(month)

  useEffect(() => {
    onChange(val)
  }, [onChange, val])

  const handleClick = useCallback((val: React.SetStateAction<number>) => {
    setVal(val)
  }, [])

  return (
    <Stack direction="row" sx={{ display: 'flex', flexWrap: 'wrap', margin: '24px 0 40px' }}>
      {monthEnum.map(v => (
        <Typography
          key={v.value}
          variant="body1"
          sx={{
            flex: '1 0 33.33%',
            margin: '8px 0px',
            height: '36px',
            lineHeight: '36px',
            textAlign: 'center',
            borderRadius: '18px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: val !== v.value ? 'rgba(0, 0, 0, 0.04)' : ''
            },
            color: val === v.value ? 'rgb(255, 255, 255)' : '',
            backgroundColor: val === v.value ? 'rgb(25, 118, 210)' : ''
          }}
          onClick={() => handleClick(v.value)}
        >
          {v.label}
        </Typography>
      ))}
    </Stack>
  )
}

export default Month
