import { Box } from '@mui/material'
import { useRequest } from 'ahooks'
import { useQueryParams } from 'hooks/useQueryParams'
import { getUserLaunchpadInfo } from 'api/user'
import { useUserInfo } from 'state/users/hooks'
import { useMemo } from 'react'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'

import ShowLaunchpad from './showLaunchpad'
import { GetUserLaunchpadInfo } from 'api/user/type'
const LaunchpadDetail = () => {
  const { id, party } = useQueryParams()
  const { token } = useUserInfo()
  const { data } = useRequest(
    async () => {
      const params: GetUserLaunchpadInfo = party ? { launchpadId: Number(party) } : ({} as GetUserLaunchpadInfo)
      const res = await getUserLaunchpadInfo(params)
      return {
        list: res.data.list,
        basicInfo: res.data.basicInfo,
        total: res.data.total
      }
    },
    { ready: !!token, refreshDeps: [id, party] }
  )
  const curPoolInfo = useMemo(() => {
    const pool = data?.list.find(item => item.id === Number(id))
    return pool
  }, [id, data])

  if (!curPoolInfo || !data?.basicInfo) {
    return (
      <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BounceAnime />
      </Box>
    )
  }
  return <ShowLaunchpad basicInfo={data?.basicInfo} poolInfo={curPoolInfo} />
}

export default LaunchpadDetail
