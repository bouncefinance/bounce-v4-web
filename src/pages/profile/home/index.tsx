import ProfileSummaryLayout, { ProfileIntroduce } from '../../../bounceComponents/profile/ProfileHomeLayout/profile'
import { Box } from '@mui/material'
import ProfileBg from 'assets/imgs/user/profile-bg.png'
import { useEffect, useMemo, useState } from 'react'
import { IProfileUserInfo } from '../../../api/user/type'
import { getUserInfo } from '../../../api/user'
import { useUserInfo } from '../../../state/users/hooks'
import { useQueryParams } from '../../../hooks/useQueryParams'

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState<IProfileUserInfo>()
  const { userInfo, userId } = useUserInfo()
  const { id } = useQueryParams()
  const isLoginUser = useMemo(() => {
    return Number(userId) === Number(id)
  }, [userId, id])

  useEffect(() => {
    const getInfo = async () => {
      const res = await getUserInfo({ userId: Number(id) })
      setPersonalInfo(res.data)
    }
    if (isLoginUser) {
      setPersonalInfo(userInfo)
    } else if (id) {
      getInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isLoginUser, userId])
  return (
    <Box display={'flex'} position={'relative'}>
      <img width={'100%'} style={{ objectFit: 'cover' }} src={personalInfo?.banner || ProfileBg} />
      <Box
        display={'flex'}
        padding={'0 40px'}
        gap={16}
        sx={{
          position: 'absolute',
          width: '100%',
          minHeight: '788px',
          top: '260px',
          left: 0
        }}
      >
        <ProfileIntroduce personalInfo={personalInfo} />
        <ProfileSummaryLayout id={id} personalInfo={personalInfo} userId={userId} />
      </Box>
    </Box>
  )
}
