import { Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import ShowLaunchpad from './showLaunchpad'
import { getUserLaunchpadInfo } from 'api/user'
import { useRequest } from 'ahooks'
import { CardSize, Launchpad } from 'pages/account/AccountPrivateLaunchpad'
import { IBasicInfoParams, PoolStatus } from '../create-launchpad/type'
const Party = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useRequest(async () => {
    const res = await getUserLaunchpadInfo({ launchpadId: Number(id) })
    return {
      basicInfo: res.data.basicInfo,
      list: res.data.list.filter(item => item.status === PoolStatus.Approved || item.status === PoolStatus.On_Chain),
      total: res.data.total
    }
  })
  if (data?.list.length === 0) {
    navigate('/')
    return null
  }
  if (data?.list.length === 1) {
    navigate(`/account/launchpad/${data.list[0].id}?party=${id}`, { replace: true })
    return null
  }

  return (
    <ShowLaunchpad
      basicInfo={data?.basicInfo as IBasicInfoParams}
      poolInfo={data?.list[0]}
      poolListEl={
        <Stack alignItems={'center'} sx={{ width: '100%', padding: '80px 40px 100px' }}>
          <Stack sx={{ maxWidth: 1320 }}>
            {data &&
              data.list &&
              data.list.length &&
              data.list.map(item => (
                <Launchpad
                  onClick={() => navigate('/account/launchpad/' + item.id)}
                  key={item.id}
                  size={CardSize.Medium}
                  poolInfo={item}
                  basicInfo={data.basicInfo}
                />
              ))}
          </Stack>
        </Stack>
      }
    />
  )
}
export default Party
