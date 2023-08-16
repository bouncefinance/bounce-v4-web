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

enum CreTab {
  'BASIC' = 1,
  'POOL' = 2
}

interface ICreComProps {
  tab?: CreTab
  id?: number
  setTab: (tab: CreTab) => void
  launchpadInfo: IUserLaunchpadInfo
}
// const launchpadInfo: IUserLaunchpadInfo = {
//   basicInfo: {
//     banner: '',
//     chainId: 0,
//     community: [],
//     description: '',
//     id: 0,
//     projectLogo: '',
//     projectMobilePicture: '',
//     projectName: '',
//     projectPicture: '',
//     roadmap: '',
//     tokennomics: '',
//     website: '',
//     whitepaperLink: ''
//   },
//   list: [{ id: 1, category: 1, chainId: 5, releaseType: 0, ratio: '0.001' }],
//   total: 1
// }
const CreateLaunchpad = () => {
  const { tab, id } = useQueryParams()
  const { token } = useUserInfo()

  const { loading, data } = useRequest(
    () => {
      return getUserLaunchpadInfo({})
    },
    { ready: !!token }
  )
  console.log('loading, data')
  console.log(loading, data)
  const [curTab, setCurTab] = useState(Number(tab) ?? CreTab.POOL)
  const curProps = useMemo<ICreComProps>(() => {
    const props: ICreComProps = {
      tab: curTab,
      setTab: setCurTab,
      launchpadInfo: data?.data as IUserLaunchpadInfo
    }
    if (id) {
      props.id = Number(id)
    }
    return props
  }, [curTab, id, data])

  console.log('props')

  console.log(curProps)

  return <LaunchpadForm {...curProps} />
}
export default CreateLaunchpad
const tabs = [['Basic Information', 'Promotional Display Before The Launchpad'], 'Launchpad Detail(Optional)']
const LaunchpadForm: React.FC<ICreComProps> = ({ tab, setTab, id, launchpadInfo }) => {
  console.log('id, launchpadInfo')
  console.log(id, launchpadInfo)

  const isSm = useBreakpoint('sm')
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Box>
        <ContainerBox>
          <HeadTitle>Create Program</HeadTitle>
          <Stack sx={{ flexDirection: 'row', mt: isSm ? 32 : 48 }}>
            {tabs.map((t, i) => (
              <Tab onClick={() => setTab(i + 1)} key={i} className={tab === i + 1 ? 'active' : ''}>
                {Array.isArray(t) ? (
                  <>
                    <TabTitle1>{t[0]}</TabTitle1>
                    {!isSm && <TabTitle2>{t[1]}</TabTitle2>}
                  </>
                ) : (
                  <TabTitle1>{t}</TabTitle1>
                )}
              </Tab>
            ))}
          </Stack>

          <BasicForm sx={{ display: tab === CreTab.BASIC ? 'block' : 'none' }} />
          <DetailForm sx={{ display: tab === CreTab.POOL ? 'block' : 'none' }} />
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
