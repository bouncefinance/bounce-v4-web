import { Box, Stack, styled, Typography, SxProps, Select, MenuItem, OutlinedInput, Button } from '@mui/material'
import FormItem from 'bounceComponents/common/FormItem'
import UploadItem from 'bounceComponents/common/UploadCard/UploadItem'
import { IFile } from 'bounceComponents/common/Uploader'
import Image from 'components/Image'
import * as yup from 'yup'
import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { ChainId } from 'constants/chain'
import { useActiveWeb3React } from 'hooks'
import { ChainList } from 'constants/chain'
import { Body02 } from 'components/Text'
import { ReactComponent as AddCircleIcon } from 'assets/imgs/icon/add_circle_outline.svg'
import { ReactComponent as BigAddIcon } from 'assets/imgs/icon/big-add.svg'
import { useOptionDatas } from 'state/configOptions/hooks'
import { useRequest } from 'ahooks'
import { applySeller } from 'api/user'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { useShowLoginModal } from 'state/users/hooks'
enum ThemeColor {
  BLACK = 'black',
  YELLOW = 'yellow',
  BLUE = 'blue',
  PURPLE = 'purple',
  ORANGE = 'orange',
  RED = 'red'
}
interface ISeller {
  banner: IFile
  projectLogo: IFile
  themeColor: ThemeColor
  projectName: string
  description: string
  website: string
  chainId: ChainId
  whitepaperLink: string
  relationship: string
}
export interface IBodySeller extends Omit<ISeller, 'banner' | 'projectLogo'> {
  banner: string
  projectLogo: string
}
const sellerValidationSchema = yup.object({
  banner: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Project Banner'),
    id: yup.number()
  }),
  projectLogo: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Project Logo'),
    id: yup.number()
  }),
  themeColor: yup.mixed().oneOf(Object.values(ThemeColor)).required(),
  projectName: yup.string().required('Project Name is a required field'),
  description: yup
    .string()
    .required('Describe Your Project is a required field')
    .min(100, 'Describe your project (100-500 words)')
    .max(500, 'Describe your project (100-500 words)'),
  website: yup.string().url('Website URL must be a valid URL').required('Website URL is a required field'),
  chainId: yup.number().required(),
  whitepaperLink: yup
    .string()
    .url('Whitepaper/Technical Documentation Link must be a valid URL')
    .required('Whitepaper/Technical Documentation Link is a required field'),
  relationship: yup.string().required('Relationship is a required field')
})

const TokenLockerForm = () => {
  const showLoginModal = useShowLoginModal()
  const { chainId, account } = useActiveWeb3React()
  const optionDatas = useOptionDatas()
  const { run, data, error } = useRequest((body: IBodySeller) => applySeller(body), { manual: true })
  const navigate = useNavigate()
  useEffect(() => {
    if (data) {
      toast.success('Successfully applied')
      navigate(routes.realAuction.index)
      return
    }
    if (error) {
      toast.error('Error applied')
      return
    }
  }, [data, error, navigate])

  useEffect(() => {
    !account && showLoginModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  const sellerValue: ISeller = {
    banner: {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: 0
    },
    projectLogo: {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: 0
    },
    themeColor: ThemeColor.BLACK,
    projectName: '',
    description: '',
    website: '',
    chainId: chainId || ChainId.MAINNET,
    whitepaperLink: '',
    relationship: ''
  }

  const onSubmit = (value: ISeller) => {
    const chainInfoOptId = optionDatas?.chainInfoOpt?.find(chainInfo => chainInfo?.['ethChainId'] === value.chainId)
    run({
      ...value,
      chainId: chainInfoOptId?.id as ChainId,
      banner: value.banner.fileUrl,
      projectLogo: value.projectLogo.fileUrl
    })
  }
  return (
    <Formik
      enableReinitialize
      initialValues={sellerValue}
      validationSchema={sellerValidationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Box
          component={'form'}
          sx={{
            borderRadius: ' 25px 25px 25px 25px',
            background: '#fff'
          }}
          onSubmit={handleSubmit}
        >
          <FormCard>
            <FormLayout
              title1="Project Name"
              childForm={
                <FormItem name={'projectName'}>
                  <OutlinedInput placeholder={'Name of the project, eg. Bounce'} />
                </FormItem>
              }
            />

            <FormLayout
              title1="Project Logo"
              childTitle={
                <Body02 sx={{ fontSize: 12, color: '#626262' }}>{`(JPEG, PNG, WEBP Files, Size<10M)`}</Body02>
              }
              childForm={
                <FormUploadAdd
                  formItemName="projectLogo"
                  labelId="logoId"
                  fileUrl={values.projectLogo.fileUrl}
                  setFieldValue={setFieldValue}
                  labelChild={<AddFile />}
                />
              }
            />
            <FormLayout
              title1="Project Banner"
              childTitle={
                <Body02
                  sx={{ fontSize: 12, color: '#626262' }}
                >{`For Shop Display (JPEG, PNG, WEBP Files, Size<10M)`}</Body02>
              }
              childForm={
                <FormUploadAdd
                  formItemName="banner"
                  labelId="bannerid"
                  fileUrl={values.banner.fileUrl}
                  setFieldValue={setFieldValue}
                  labelChild={<BigAddIcon />}
                  labelSx={{ width: '100%', height: 240, border: '1px dashed #D7D6D9' }}
                />
              }
            />
            <FormLayout
              title1="Theme Color"
              childForm={
                <FormItem>
                  <Select
                    value={values.themeColor}
                    onChange={({ target }) => {
                      setFieldValue('themeColor', target.value)
                    }}
                    renderValue={selected => (
                      <Stack sx={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                        <Box sx={{ width: 32, height: 32, background: selected, borderRadius: '50%' }}></Box>
                        <Title sx={{ fontSize: 16, fontWeight: 500, color: '#959595' }}>{selected}</Title>
                      </Stack>
                    )}
                    MenuProps={{
                      MenuListProps: {
                        sx: {
                          '&.MuiMenu-list': {
                            maxHeight: 300,
                            overflow: 'scroll'
                          }
                        }
                      }
                    }}
                  >
                    {Object.values(ThemeColor).map((val, id) => (
                      <MenuItem
                        key={id}
                        value={val}
                        sx={{
                          '&.MuiMenuItem-root': {
                            background: val === values.themeColor ? '#E1F25C' : '',
                            marginTop: 10
                          }
                        }}
                      >
                        <Stack sx={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                          <Box sx={{ width: 32, height: 32, background: val, borderRadius: '50%' }}></Box>
                          <Title sx={{ fontSize: 16, fontWeight: 500, color: '#959595' }}>{val}</Title>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormItem>
              }
            />
            <FormLayout
              title1="Describe Your Project (100-500 Words)"
              title2="Please address the following questions in your description."
              childTitle={
                <Title mt={16} sx={{ fontSize: 16, fontWeight: 500, color: '#959595', lineHeight: '1.7' }}>
                  1. Provide a short blurb/intro of your project (within 400 characters).
                  <br />
                  {`2. How would you define your brand's identity and values? How do you envision your brand store`}
                  design reflecting these aspects?
                  <br />
                  3. What types of tangible collectibles do you plan to feature in your store?
                  <br />
                </Title>
              }
              childForm={
                <FormItem style={{ marginTop: 20 }} name="description">
                  <OutlinedInput value={values.description} placeholder="Project description" />
                </FormItem>
              }
            />
            <FormLayout
              title1="Website URL"
              childForm={
                <FormItem name={'website'}>
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
                      setFieldValue('chainId', target.value)
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
                <FormItem name={'whitepaperLink'}>
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
          <Title sx={{ marginTop: 15, color: '#959595', fontSize: 14, textAlign: 'center' }}>
            Bounce Office Will Reach Out To You For Next Step.
          </Title>
        </Box>
      )}
    </Formik>
  )
}
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
const FormUploadAdd = ({
  fileUrl,
  setFieldValue,
  formItemName,
  labelId,
  labelChild,
  labelSx
}: {
  fileUrl: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  formItemName: string
  labelId: string
  labelChild: React.ReactElement
  labelSx?: SxProps
}) => {
  return (
    <FormItem name={formItemName} fieldType="custom">
      <UploadItem
        inputId={labelId}
        value={{ fileUrl: fileUrl }}
        onChange={(file: IFile) => {
          setFieldValue(formItemName, file)
        }}
        accept={['image/jpeg', 'image/png', 'image/webp']}
        tips={'Please do not exceed a file size of 10MB'}
        limitSize={10}
        sx={{ display: 'none' }}
      />
      <UpLabelBox htmlFor={labelId} fileUrl={fileUrl} child={labelChild} labelSx={labelSx} />
    </FormItem>
  )
}
const AddFile = () => {
  return (
    <>
      <Title sx={{ fontSize: 14, color: '#000', fontWeight: 600 }}>Add file</Title>
      <AddCircleIcon />
    </>
  )
}
const UpLabelBox = ({
  htmlFor,
  fileUrl,
  child,
  labelSx
}: {
  htmlFor: string
  fileUrl: string
  child: React.ReactElement
  labelSx?: SxProps
}) => {
  return (
    <Box sx={{ display: 'block', cursor: 'pointer' }} component={'label'} htmlFor={htmlFor}>
      <Stack
        sx={{
          width: 227,
          height: 52,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          border: '1px solid #D7D6D9',
          borderRadius: 8,
          ...labelSx
        }}
      >
        {!fileUrl && child}
        {
          fileUrl && <Image src={fileUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          // <Box sx={{ width: '100%', height: '100%', background: `url(${fileUrl}) no-repeat` }}></Box>
        }
      </Stack>
    </Box>
  )
}
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
  gap: 50,
  '@media(max-width:600px)': {
    padding: '32px 16px'
  }
})
const SubmitComp = () => (
  <Box mt={48} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 54 }}>
    <Button
      type="submit"
      variant="contained"
      sx={{
        padding: '16px 40px',
        boxSizing: 'border-box',
        background: '#121212',
        '&:hover': { background: '#E1F25C', border: 'none', '&>p': { color: 'black' } }
      }}
    >
      <Title sx={{ fontSize: 16, fontWeight: 500, color: 'white' }}>Submit</Title>
    </Button>
  </Box>
)
export default TokenLockerForm
