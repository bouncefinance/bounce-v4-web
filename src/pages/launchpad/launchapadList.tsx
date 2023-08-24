import { Box } from '@mui/material'
import { useRequest } from 'ahooks'
import { searchLaunchpad } from 'api/user'
import { CardSize, Launchpad } from 'pages/account/AccountPrivateLaunchpad'
import { useNavigate } from 'react-router-dom'
const LaunchpadList = () => {
  const navigate = useNavigate()
  const { data } = useRequest(async () => {
    const res = await searchLaunchpad({})
    console.log('res')
    console.log(res)
    return {
      list: res.data.list,
      total: res.data.total
    }
  })
  console.log('launchpad list')
  console.log(data)

  return (
    <Box sx={{ maxWidth: 1320 }}>
      {data &&
        data.list &&
        data.list.length &&
        data.list.map(item => (
          <Launchpad
            onClick={() => navigate('/launchpad/party/' + item.basicInfo.id)}
            key={item.basicInfo.id}
            size={CardSize.Large}
            poolInfo={item.poolInfo}
            basicInfo={item.basicInfo}
          />
        ))}
    </Box>
  )
}
export default LaunchpadList
