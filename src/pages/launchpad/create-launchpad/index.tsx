import { Box, OutlinedInput, Stack, Typography, styled } from '@mui/material'
import FormItem from 'bounceComponents/common/FormItem'
import UploadItem from 'bounceComponents/common/UploadCard/UploadItem'
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
const UploadIntroduce = ({ title }: { title: string }) => {
  return (
    <Stack sx={{ flexDirection: 'column', gap: 8 }}>
      <BaseTitle1 sx={{ fontSize: 16, color: '#171717' }}>{title}</BaseTitle1>
      <BaseTitle2 sx={{ fontSize: 12, color: '#626262' }}>{`(JPEG, PNG, WEBP Files, Size<10M)`}</BaseTitle2>
    </Stack>
  )
}

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
    },
    ProjectName: ''
  }
  const onSubmit = () => {}
  return (
    <CardBox>
      <Formik validationSchema={validationSchema} initialValues={initBasicValue} onSubmit={onSubmit}>
        {({ values, setFieldValue }) => {
          return (
            <Stack component={'form'}>
              {/*
                 <Stack component={Form} noValidate>
               */}
              <BaseBox>
                <Stack flexDirection={'column'} gap={32}>
                  <FormItem>
                    <Title mb={32}>Basic Information</Title>
                    <UploadLayout>
                      <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
                        <UploadItem
                          onChange={file => setFieldValue('ProjectPicture', file)}
                          inputId={'ProjectPictureImg'}
                          value={{ fileUrl: values.ProjectPicture.fileUrl }}
                          accept={['image/jpeg', 'image/png', 'image/webp']}
                          tips={'Please do not exceed a file size of 10MB'}
                          limitSize={10}
                          sx={{
                            width: 132,
                            height: 52,
                            borderRadius: '4px !important',
                            background: 'rgb(232,233,228)',
                            '& svg': { width: '100%', height: '100% ' },
                            '& .add-svg': {
                              border: 'none'
                            }
                          }}
                        />
                        <UploadIntroduce title="Project Picture" />
                      </Stack>
                      <UploadBtn htmlFor="ProjectPictureImg">Upload</UploadBtn>
                    </UploadLayout>
                  </FormItem>

                  <FormItem>
                    <UploadLayout>
                      <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
                        <UploadItem
                          onChange={file => setFieldValue('ProjectLogo', file)}
                          inputId={'ProjectLogoImg'}
                          value={{ fileUrl: values.ProjectLogo.fileUrl }}
                          accept={['image/jpeg', 'image/png', 'image/webp']}
                          tips={'Please do not exceed a file size of 10MB'}
                          limitSize={10}
                          sx={{
                            width: 72,
                            height: 72
                          }}
                        />
                        <UploadIntroduce title="Project Logo" />
                      </Stack>
                      <UploadBtn htmlFor="ProjectLogoImg">Upload</UploadBtn>
                    </UploadLayout>
                  </FormItem>

                  <FormItem>
                    <Title mb={16}>Project Name</Title>
                    <OutlinedInput placeholder="Name of the project, eg. Bounce" />
                  </FormItem>
                </Stack>
              </BaseBox>
            </Stack>
          )
        }}
      </Formik>
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
      <Title sx={{ textAlign: 'center' }}>Create Program</Title>
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
  textAlign: 'left',
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
const UploadLayout = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})
const BaseTitle1 = styled(Typography)({
  fontFamily: 'Public Sans',

  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.4px',
  textTransform: 'capitalize'
})
const BaseTitle2 = styled(Typography)({
  fontFamily: 'Inter',

  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%'
})
const UploadBtn = styled('label')({
  fontSize: 14,
  background: '#E1F25C',
  borderRadius: 6,
  padding: '8px 24px',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.4px',
  textTransform: 'capitalize',
  cursor: 'pointer'
})
export default CreateLaunchpad
