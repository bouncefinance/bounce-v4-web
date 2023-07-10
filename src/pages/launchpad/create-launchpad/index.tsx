import { Box, Stack, Typography, styled, OutlinedInput } from '@mui/material'
import FormItem from 'bounceComponents/common/FormItem'
// import Uploader from 'bounceComponents/common/Uploader'
import { Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
const validationSchema = yup.object({
  ProjectPicture: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  }),
  ProjectLogo: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  }),
  BannerBigPicture: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  }),
  BannerSmallPicture: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  })
})
const BasicCard = () => {
  const initBasicValue = {
    ProjectPicture: {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: ''
    },
    ProjectLogo: {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: ''
    },
    BannerBigPicture: {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: ''
    },
    BannerSmallPicture: {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: ''
    }
  }
  const onSubmit = () => {}
  return (
    <CardBox>
      <Formik validationSchema={validationSchema} initialValues={initBasicValue} onSubmit={onSubmit}>
        <Stack component={'form'}>
          <BaseBox>
            <FormItem>
              <OutlinedInput placeholder={'Please enter text'} />

              {/* <Box>
                <Uploader />
              </Box> */}
            </FormItem>
          </BaseBox>
        </Stack>
      </Formik>
      {/* <BaseBox>
        <Title>Basic Information</Title>
      </BaseBox> */}
    </CardBox>
  )
}
const DetailCard = () => {
  return <Box>DetailCard</Box>
}
const CreateLaunchpad = () => {
  const [tabActive, setTabActive] = useState(0)
  const tabs = [['Basic Information', 'Promotional Display Before The Launchpad'], 'Launchpad Detail(Optional)']
  return (
    <ContainerBox>
      <Title>Create Program</Title>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'center', mt: 48 }}>
        {tabs.map((t, i) => (
          <Tab onClick={() => setTabActive(i)} key={i} className={tabActive === i ? 'active' : ''}>
            {Array.isArray(t) ? (
              <>
                <TabTitle1>{t[0]}</TabTitle1>
                <TabTitle2>{t[1]}</TabTitle2>
              </>
            ) : (
              <TabTitle1>{t}</TabTitle1>
            )}
          </Tab>
        ))}
      </Stack>
      {tabActive === 0 && <BasicCard />}
      {tabActive === 1 && <DetailCard />}
    </ContainerBox>
  )
}
const ContainerBox = styled(Box)({
  width: '100%',
  maxWidth: 1164,
  margin: '48px auto',
  padding: '0 82px'
})
const Title = styled(Typography)({
  fontFamily: 'Public Sans',
  fontSize: '28px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '130%',
  letterSpacing: '-0.56px',
  textTransform: 'capitalize',
  textAlign: 'center',
  color: '#20201E'
})
const Tab = styled(Box)({
  width: 360,
  padding: '15px 28px',
  borderRadius: '8px 8px 0px 0px',
  cursor: 'pointer',
  '&.active': {
    background: '#E1F25C',
    cursor: 'inherit'
  }
})
const TabTitle1 = styled(Typography)({
  fontFamily: 'Public Sans',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.4px',
  textTransform: 'capitalize',
  color: '#121212'
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
const BaseBox = styled(Box)({
  width: '100%',
  padding: 64,
  borderRadius: 24,
  background: '#FFF'
})
const CardBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  marginTop: 24
})
export default CreateLaunchpad
