import { useQueryParams } from 'hooks/useQueryParams'
import React, { useMemo, useState } from 'react'
import { useRequest } from 'ahooks'
import { IUserLaunchpadInfo } from 'api/user/type'
import { getUserLaunchpadInfo } from 'api/user'
import { Box, Stack, styled, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import { HeadTitle } from './form/BaseComponent'
import BasicForm from './form/BasicForm'
import DetailForm from './form/DetailForm'
import useBreakpoint from 'hooks/useBreakpoint'
import { useUserInfo } from 'state/users/hooks'
import Tooltip from 'bounceComponents/common/Tooltip'
import { toast } from 'react-toastify'
enum CreTab {
  'BASIC' = 1,
  'POOL' = 2
}
interface ICreComProps {
  tab?: CreTab
  id?: number
  setTab: (tab: CreTab) => void
  launchpadInfo: IUserLaunchpadInfo
  first: boolean
  getLaunchpadInfo: () => void
}
const CreateLaunchpad = () => {
  const { tab, id } = useQueryParams()
  const { token } = useUserInfo()
  const [curTab, setCurTab] = useState(tab ? Number(tab) : CreTab.POOL)
  const [isFirst, setIsFirst] = useState(false)
  const { data, run: getLaunchpadInfo } = useRequest(
    () => {
      return getUserLaunchpadInfo({})
    },
    {
      ready: !!token,
      onError: () => {
        toast.error('network error')
      }
    }
  )
  if (data && !data.data.basicInfo) {
    if (!isFirst) setIsFirst(true)
    if (curTab !== CreTab.BASIC) setCurTab(CreTab.BASIC)
  }
  const curProps = useMemo<ICreComProps>(() => {
    const props: ICreComProps = {
      tab: curTab,
      setTab: setCurTab,
      launchpadInfo: data?.data as IUserLaunchpadInfo,
      first: isFirst,
      getLaunchpadInfo
    }
    if (id) {
      props.id = Number(id)
    }
    return props
  }, [curTab, id, data, isFirst, getLaunchpadInfo])
  return <LaunchpadForm {...curProps} />
}
export default CreateLaunchpad
const tabs = [['Basic Information', 'Promotional Display Before The Launchpad'], 'Launchpad Detail(Optional)']
const LaunchpadForm: React.FC<ICreComProps> = ({ getLaunchpadInfo, tab, setTab, id, launchpadInfo, first }) => {
  console.log(id)

  const isSm = useBreakpoint('sm')
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Box>
        <ContainerBox>
          <HeadTitle>Create Program</HeadTitle>
          <Stack sx={{ flexDirection: 'row', mt: isSm ? 32 : 48 }}>
            {tabs.map((t, i) => (
              <Tab onClick={() => !first && setTab(i + 1)} key={i} className={tab === i + 1 ? 'active' : ''}>
                {Array.isArray(t) ? (
                  <>
                    <TabTitle1>{t[0]}</TabTitle1>
                    {!isSm && <TabTitle2>{t[1]}</TabTitle2>}
                  </>
                ) : (
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    {!first && <TabTitle1>{t}</TabTitle1>}
                    {first && (
                      <Tooltip title="Complete the Basic Information before filling in the Launchpad Detail (optional).">
                        <TabTitle1 className="dis">{t}</TabTitle1>
                      </Tooltip>
                    )}
                  </Stack>
                )}
              </Tab>
            ))}
          </Stack>

          <BasicForm
            first={first}
            launchpadInfo={launchpadInfo}
            sx={{ display: tab === CreTab.BASIC ? 'block' : 'none' }}
          />
          <DetailForm
            getLaunchpadInfo={getLaunchpadInfo}
            launchpadInfo={launchpadInfo}
            sx={{ display: tab === CreTab.POOL ? 'block' : 'none' }}
          />
        </ContainerBox>
        <FooterBox>
          <TabTitle2>©2023 Bounce dao Ltd. All rights reserved.</TabTitle2>
          <Stack flexDirection={'row'} gap={40}>
            <TabTitle2>Terms Of Service</TabTitle2>
            <TabTitle2>Privacy Policy</TabTitle2>
          </Stack>
        </FooterBox>
      </Box>
    </LocalizationProvider>
  )
}
const ContainerBox = styled(Box)({
  width: '100%',
  maxWidth: 1164,
  margin: '48px auto',
  padding: '0 82px',
  '@media(max-width:600px)': {
    padding: '0',
    margin: '40px auto'
  }
})
const FooterBox = styled(Box)({
  width: '100%',
  maxWidth: '1296px',
  paddingTop: 32,
  margin: '41px auto 20px',
  borderTop: '1px solid #D7D6D9',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
  '& p': {
    color: 'rgba(18, 18, 18, 0.60)'
  },
  '@media(max-width:600px)': {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    marginTop: 36
  }
})

const Tab = styled(Stack)({
  width: 'max-content',
  padding: '15px 28px',
  borderRadius: '8px 8px 0px 0px',
  cursor: 'pointer',
  '&.active': {
    background: '#FFF',
    cursor: 'inherit'
  },
  '@media(max-width:600px)': {
    padding: '12px 16px'
  }
})
const TabTitle1 = styled(Typography)({
  fontFamily: 'Public Sans',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '140%',
  letterSpacing: '-0.4px',
  textTransform: 'capitalize',
  color: '#121212',
  '@media(max-width:600px)': {
    fontSize: 14
  },
  '&.dis': {
    color: 'gray',
    cursor: 'initial'
  }
})
const TabTitle2 = styled(Typography)({
  fontFamily: 'Inter',
  fontSize: '13px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%',
  textTransform: 'capitalize',
  color: '#959595'
})
