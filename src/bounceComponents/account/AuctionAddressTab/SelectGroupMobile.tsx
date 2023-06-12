import { MenuItem, Select, Stack } from '@mui/material'
import { DashboardQueryType } from '../../../api/account/types'
import { useOptionDatas } from '../../../state/configOptions/hooks'

export const SelectGroupMobile = ({
  curChain,
  setCurChain,
  queryType,
  setQueryType
}: {
  curChain: number
  setCurChain: (v: number) => void
  queryType: 0 | DashboardQueryType
  setQueryType: React.Dispatch<React.SetStateAction<0 | DashboardQueryType>>
}) => {
  const optionDatas = useOptionDatas()
  return (
    <Stack spacing={10} direction="row" sx={{ width: '100%', mb: '56px' }}>
      <Select
        sx={{ width: '50%', height: 38 }}
        value={curChain}
        onChange={e => setCurChain(Number(e.target?.value) || 0)}
      >
        <MenuItem key={0} value={0}>
          All Chains
        </MenuItem>
        {optionDatas?.chainInfoOpt?.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {item.chainName}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={queryType}
        sx={{ width: '50%', height: 38 }}
        onChange={e => setQueryType(Number(e.target?.value) || 0)}
      >
        <MenuItem key={0} value={0}>
          All
        </MenuItem>
        <MenuItem key={1} value={DashboardQueryType.ongoing}>
          ongoing
        </MenuItem>
        <MenuItem key={2} value={DashboardQueryType.claim}>
          claim
        </MenuItem>
      </Select>
    </Stack>
  )
}
