import { Box } from '@mui/material'
import { useRequest } from 'ahooks'
import { useQueryParams } from 'hooks/useQueryParams'
import { getUserLaunchpadInfo } from 'api/user'
import { useUserInfo } from 'state/users/hooks'
import { useMemo } from 'react'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'

import ShowLaunchpad from './showLaunchpad'
const LaunchpadDetail = () => {
  const { id } = useQueryParams()
  const { token } = useUserInfo()
  const { data } = useRequest(
    async () => {
      const res = await getUserLaunchpadInfo({})
      return {
        list: res.data.list,
        basicInfo: res.data.basicInfo,
        total: res.data.total
      }
    },
    { ready: !!token }
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
