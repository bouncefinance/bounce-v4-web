import { Box, Stack, styled, Typography, SxProps, Select, MenuItem, OutlinedInput, Button } from '@mui/material'
import FormItem from 'bounceComponents/common/FormItem'
import UploadItem from 'bounceComponents/common/UploadCard/UploadItem'
import { IFile } from 'bounceComponents/common/Uploader'
import Image from 'components/Image'
import * as yup from 'yup'
import { Formik } from 'formik'
import React from 'react'
import MarkdownEditor from './markdownEditor'
import { ChainId } from 'constants/chain'
import { useActiveWeb3React } from 'hooks'
import { ChainList } from 'constants/chain'
interface ImageProps {
  fileName: string
  fileSize: number
  fileThumbnailUrl: string
  fileType: string
  fileUrl: string
  id: number
}
enum ThemeColor {
  BLACK = 'black',
  WHITE = 'white'
}
interface ISeller {
  banner: ImageProps
  logo: ImageProps
  themeColor: ThemeColor
  projectName: string
  ProjectDescribe: string
  websiteURL: string
  chainId: ChainId
  whitepaperLink: string
  relationship: string
}

const sellerValidationSchema = yup.object({
  banner: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Token Logo'),
    id: yup.number()
  }),
  logo: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  }),
  themeColor: yup.mixed().oneOf(Object.values(ThemeColor)).required(),
  projectName: yup.string().required('Project Name is a required field'),
  ProjectDescribe: yup
    .string()
    .required()
    .min(100, 'Describe your project (100-500 words)')
    .max(500, 'Describe your project (100-500 words)'),
  websiteURL: yup.string().url().required(),
  chainId: yup.number().required(),
  whitepaperLink: yup.string().url().required(),
  relationship: yup.string().required()
})

const onSubmit = () => {
  console.log('submit')
}
const ApplyToBeSeller = () => {
  const { chainId } = useActiveWeb3React()
  const sellerValue: ISeller = {
    banner: {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: 0
    },
    logo: {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: 0
    },
    themeColor: ThemeColor.BLACK,
    projectName: '',
    ProjectDescribe: '',
    websiteURL: '',
    chainId: chainId as ChainId,
    whitepaperLink: '',
    relationship: ''
  }
  return (
    <ContainerBox>
      <Formik
        enableReinitialize
        initialValues={sellerValue}
        validationSchema={sellerValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Box component={'form'} onSubmit={handleSubmit}>
            <Title sx={{ textAlign: 'center' }}>Apply To Be A Seller</Title>
            <FormCard mt={64}>
              <Title>Poject Information</Title>
              <FormUploadLayout
                formItemName="banner"
                fileUrl={values.banner.fileUrl}
                setFieldValue={setFieldValue}
                uploadTitle1="Project Banner"
                uploadTitle2="For Shop Display"
                labelId="banner img"
              />
              <FormUploadLayout
                formItemName="ProjectLogo"
                fileUrl={values.logo.fileUrl}
                setFieldValue={setFieldValue}
                uploadTitle1="Project Logo"
                labelId="ProjectLogoImg"
                imgSx={{
                  width: 72,
                  height: 72
                }}
              />
              <FormLayout
                title1="Theme Color"
                childForm={
                  <FormItem>
                    <Select
                      value={values.themeColor}
                      onChange={({ target }) => {
                        console.log(target)
                        setFieldValue('themeColor', target.value)
                        console.log(values.themeColor)
                      }}
                      renderValue={selected => (
                        <Title sx={{ fontSize: 16, fontWeight: 500, color: '#959595' }}>{selected}</Title>
                      )}
                    >
                      {Object.values(ThemeColor).map((val, id) => (
                        <MenuItem key={id} value={val}>
                          <Title sx={{ fontSize: 16, fontWeight: 500, color: '#959595' }}>{val}</Title>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormItem>
                }
              />
              <FormLayout
                title1="Project Name"
                childForm={
                  <FormItem name={'projectName'}>
                    <OutlinedInput placeholder={'Name of the project, eg. Bounce'} />
                  </FormItem>
                }
              />
              <FormLayout
                title1="Describe Your Project (100-500 Words)"
                title2="Please address the following questions in your description."
                childTitle={
                  <Title mt={16} sx={{ fontSize: 16, fontWeight: 500, color: '#959595', lineHeight: '1.7' }}>
                    1. What is the project about?
                    <br />
                    2. What makes your project unique? <br />
                    3. History of your project.
                    <br />
                    4. What’s next for your project?
                    <br /> 5. What can your token be used for? (Utility, NOT tokenomics)
                    <br />
                  </Title>
                }
                childForm={
                  <FormItem style={{ marginTop: 20 }} name="ProjectDescribe">
                    <MarkdownEditor
                      value={values.ProjectDescribe}
                      setEditorValue={value => setFieldValue('ProjectDescribe', value)}
                      placeholder="Project description"
                    />
                  </FormItem>
                }
              />
              <FormLayout
                title1="Website URL"
                childForm={
                  <FormItem name={'websiteURL'}>
                    <OutlinedInput placeholder={'https://bitcoin.org'} />
                  </FormItem>
                }
              />
              <FormLayout
                title1="Blockchain Platform"
                title2="What platform is this project issued on?"
                childForm={
                  <FormItem>
                    <Select
                      value={values.chainId}
                      onChange={({ target }) => {
                        setFieldValue('ChainId', target.value)
                      }}
                      renderValue={selected => {
                        const currentChain = ChainList.find(item => item.id === selected)
                        return (
                          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                            {selected ? (
                              <>
                                <Image style={{ width: 25, height: 25 }} src={currentChain?.logo as string} />
                                <Title sx={{ fontSize: 16 }}>{currentChain?.name}</Title>
                              </>
                            ) : (
                              <Title sx={{ fontSize: 14, color: '#959595', fontWeight: 500 }}>select platform</Title>
                            )}
                          </Box>
                        )
                      }}
                    >
                      {ChainList.map(t => (
                        <MenuItem
                          key={t.id}
                          value={t.id}
                          sx={{
                            '&.Mui-selected': {
                              background: values.chainId === t.id ? '#E1F25C' : ''
                            }
                          }}
                        >
                          <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                            <Image style={{ width: 25, height: 25 }} src={t.logo} />
                            <Title sx={{ fontSize: 16 }}>{t.name}</Title>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormItem>
                }
              />
              <FormLayout
                title1="Whitepaper/Technical Documentation Link"
                childForm={
                  <FormItem name={'websiteURL'}>
                    <OutlinedInput placeholder={'https://bitcoin.org/bitcoin.pdf'} />
                  </FormItem>
                }
              />
            </FormCard>
            <FormCard mt={24}>
              <FormLayout
                title1="Relationship With The Project"
                childForm={
                  <FormItem name={'relationship'}>
                    <OutlinedInput placeholder={'(E.G. CEO, Founder, Employee, Community Member And Exchange'} />
                  </FormItem>
                }
              />
            </FormCard>
            <SubmitComp />
          </Box>
        )}
      </Formik>
    </ContainerBox>
  )
}
export default ApplyToBeSeller
const FormLayout = ({
  title1,
  title2,
  childTitle,
  childForm
}: {
  title1: string
  title2?: string
  childTitle?: React.ReactElement
  childForm: React.ReactElement
}) => {
  return (
    <Stack sx={{ flexDirection: 'column', gap: 16 }}>
      <Stack sx={{ flexDirection: 'column', gap: 5 }}>
        <Title sx={{ color: '#20201E', fontSize: 20 }}>{title1}</Title>
        {title2 && <Title sx={{ color: '#626262', fontWeight: 500, fontSize: 16 }}>{title2}</Title>}
        {childTitle && childTitle}
      </Stack>
      {childForm}
    </Stack>
  )
}
const FormUploadLayout = ({
  fileUrl,
  setFieldValue,
  formItemName,
  uploadTitle1,
  uploadTitle2,
  labelId,
  imgSx
}: {
  fileUrl: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  formItemName: string
  uploadTitle1: string
  uploadTitle2?: string
  labelId: string
  imgSx?: SxProps
}) => {
  imgSx = imgSx || {
    width: 132,
    height: 52,
    borderRadius: '4px !important',
    background: 'rgb(232,233,228)',
    '& svg': { width: '100%', height: '100% ' },
    '& .add-svg': {
      border: 'none'
    }
  }

  return (
    <UploadLayout>
      <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
        <FormItem name={formItemName} fieldType="custom" style={{ display: fileUrl ? 'none' : 'block' }}>
          <UploadItem
            inputId={labelId}
            value={{ fileUrl: fileUrl }}
            onChange={(file: IFile) => {
              setFieldValue(formItemName, file)
            }}
            accept={['image/jpeg', 'image/png', 'image/webp']}
            tips={'Please do not exceed a file size of 10MB'}
            limitSize={10}
            sx={imgSx}
          />
        </FormItem>
        {fileUrl && <ImageBg url={fileUrl} />}
        <UploadIntroduce title1={uploadTitle1} title2={uploadTitle2} />
      </Stack>
      <UploadBtn htmlFor={labelId}>Upload</UploadBtn>
    </UploadLayout>
  )
}
const UploadLayout = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})
const ImageBg = ({ sx, url }: { sx?: SxProps; url: string }) => {
  return (
    <Box
      sx={{
        width: 130,
        height: 52,
        borderRadius: 4,
        overflow: 'hidden',
        ...sx
      }}
    >
      <Image style={{ width: '100%', height: '100%' }} src={url} />
    </Box>
  )
}
const UploadIntroduce = ({ title1, title2 }: { title1: string; title2?: string }) => {
  return (
    <Stack sx={{ flexDirection: 'column', gap: 8 }}>
      <Box>
        <BaseTitle1 sx={{ fontSize: 16, color: '#171717' }}>{title1}</BaseTitle1>
        <BaseTitle1 sx={{ fontSize: 12, color: '#394959' }}>{title2}</BaseTitle1>
      </Box>
      <BaseTitle2 sx={{ fontSize: 12, color: '#626262' }}>{`(JPEG, PNG, WEBP Files, Size<10M)`}</BaseTitle2>
    </Stack>
  )
}
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
const FormCard = styled(Stack)({
  width: '100%',
  padding: 64,
  borderRadius: 24,
  background: '#FFF',
  flexDirection: 'column',
  gap: 50
})
const SubmitComp = () => (
  <Box mt={48} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 54 }}>
    <Button
      type="submit"
      variant="contained"
      sx={{
        padding: '16px 40px',
        boxSizing: 'border-box',
        background: '#E1F25C',
        '&:hover': { background: '#E1F25C', border: 'none' }
      }}
    >
      <Title sx={{ fontSize: 16, fontWeight: 500, color: '#20201E' }}>Submit</Title>
    </Button>
  </Box>
)
