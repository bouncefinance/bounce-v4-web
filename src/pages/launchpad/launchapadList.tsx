import { Box } from '@mui/material'
import { useRequest } from 'ahooks'
import { getUserLaunchpadInfo, searchLaunchpad } from 'api/user'
import { CardSize, Launchpad } from 'pages/account/AccountPrivateLaunchpad'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { IBasicInfoParams, IPoolInfoParams, PoolStatus } from './create-launchpad/type'
const LaunchpadList = () => {
  const { data } = useRequest(async () => {
    const res = await searchLaunchpad({})
    return {
      list: res.data.list,
      total: res.data.total
    }
  })

  return (
    <Box sx={{ maxWidth: 1320 }}>
      {data &&
        data.list &&
        !!data.list.length &&
        data.list.map(item => (
          <LaunchpadItem key={item.basicInfo.id} poolInfo={item.poolInfo} basicInfo={item.basicInfo} />
        ))}
    </Box>
  )
}
const LaunchpadItem = ({ poolInfo, basicInfo }: { poolInfo: IPoolInfoParams; basicInfo: IBasicInfoParams }) => {
  const navigate = useNavigate()
  const { data: poolList } = useRequest(
    async () => {
      const res = await getUserLaunchpadInfo({ launchpadId: basicInfo.id })
      return res.data.list
    },
    { refreshDeps: [basicInfo.id] }
  )
  const approvedNum = useMemo(
    () => poolList?.filter(item => item.status === PoolStatus.Approved || item.status === PoolStatus.On_Chain).length,
    [poolList]
  )
  return (
    <Launchpad
      onClick={() => navigate('/launchpad/party/' + basicInfo.id)}
      size={CardSize.Large}
      poolInfo={poolInfo}
      basicInfo={basicInfo}
      approvedNum={approvedNum}
    />
  )
}
export default LaunchpadList
