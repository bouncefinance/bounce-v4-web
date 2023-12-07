import { MenuItem, Select } from '@mui/material'
import { PoolStatus } from 'api/pool/type'
import { useMemo } from 'react'

export default function StatusSelect({
  curPoolType,
  setCurPoolType,
  noBorder
}: {
  curPoolType: PoolStatus | 0
  setCurPoolType: (type: PoolStatus) => void
  noBorder?: boolean
}) {
  const list = useMemo(() => {
    return [
      { label: 'Upcoming', value: PoolStatus.Upcoming },
      { label: 'Live', value: PoolStatus.Live },
      { label: 'Cancelled', value: PoolStatus.Cancelled },
      { label: 'Ended', value: PoolStatus.Closed }
    ]
  }, [])

  return (
    <Select
      sx={{
        width: [160, '200px'],
        height: 38,
        fieldset: {
          border: noBorder ? 0 : '1px solid var(--ps-text-8)'
        }
      }}
      defaultValue={PoolStatus.Upcoming}
      value={curPoolType}
      onChange={e => setCurPoolType(e.target.value as PoolStatus)}
    >
      <MenuItem value={0}>All</MenuItem>
      {list.map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}
