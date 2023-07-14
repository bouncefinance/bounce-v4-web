import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  SxProps,
  Typography,
  styled
} from '@mui/material'
import FormItem from 'bounceComponents/common/FormItem'
import UploadItem from 'bounceComponents/common/UploadCard/UploadItem'
import { Field, Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { ChainId, ChainList } from 'constants/chain'
import Image from 'components/Image'
import { useActiveWeb3React } from 'hooks'
import MarkdownEditor from './components/markdownEditor'
import { AllocationStatus, AuctionType } from 'bounceComponents/create-auction-pool/types'
import TokenImage from 'bounceComponents/common/TokenImage'
import FakeOutlinedInput from 'bounceComponents/create-auction-pool/FakeOutlinedInput'
import { show } from '@ebay/nice-modal-react'
import TokenDialog from 'bounceComponents/create-auction-pool/TokenDialog'
import { Token } from 'bounceComponents/fixed-swap/type'
import NumberInput from 'bounceComponents/common/NumberInput'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import RadioGroupFormItem from 'bounceComponents/create-auction-pool/RadioGroupFormItem'
import Radio from 'bounceComponents/create-auction-pool/Radio'
const basicValidationSchema = yup.object({
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
  ProjectDescribe: yup
    .string()
    .required()
    .min(100, 'Describe your project (100-500 words)')
    .max(500, 'Describe your project (100-500 words)'),
  Tokenomics: yup.string(),
  WebsiteURL: yup.string().url().required(),
  Whitepaper: yup.string().url().required(),
  ProjectName: yup.string().required(),
  ProjectRoadmap: yup.string(),
  ChainId: yup.number().required(),
  ProjectLink: yup.object().shape({
    TwitterLink: yup
      .string()
      .url('TwitterLink must be a valid URL')
      .test('notEmpty', 'fill in at least one', (val, context) =>
        Object.keys(context.parent).some(key => !!context.parent[key])
      ),
    TelegramLink: yup
      .string()
      .url('TelegramLink must be a valid URL')
      .test('notEmpty', 'fill in at least one', (val, context) =>
        Object.keys(context.parent).some(key => !!context.parent[key])
      ),
    FacebookLink: yup
      .string()
      .url('FacebookLink must be a valid URL')
      .test('notEmpty', 'fill in at least one', (val, context) =>
        Object.keys(context.parent).some(key => !!context.parent[key])
      ),
    YoutubeLink: yup
      .string()
      .url('YoutubeLink must be a valid URL')
      .test('notEmpty', 'fill in at least one', (val, context) =>
        Object.keys(context.parent).some(key => !!context.parent[key])
      ),
    SubredditLink: yup
      .string()
      .url('SubredditLink must be a valid URL')
      .test('notEmpty', 'fill in at least one', (val, context) =>
        Object.keys(context.parent).some(key => !!context.parent[key])
      ),
    MediumLink: yup
      .string()
      .url('MediumLink must be a valid URL')
      .test('notEmpty', 'fill in at least one', (val, context) =>
        Object.keys(context.parent).some(key => !!context.parent[key])
      ),
    DiscordLink: yup
      .string()
      .url('DiscordLink must be a valid URL')
      .test('notEmpty', 'fill in at least one', (val, context) =>
        Object.keys(context.parent).some(key => !!context.parent[key])
      )
  })
})
const detailValidationSchema = yup.object({
  TokenLogo: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Token Logo'),
    id: yup.number()
  }),
  TokenName: yup.string().required(),
  ChainId: yup.number().required(),
  ContractAddress: yup.string().url().required(),
  ContractDecimalPlaces: yup.string().url().required(),
  Token: yup.object({
    tokenToAddress: yup.string().required(),
    tokenToSymbol: yup.string().required(),
    tokenToLogoURI: yup.string().required(),
    tokenToDecimals: yup.string().required()
  }),
  SwapRatio: yup.number().required(),
  TotalSupply: yup.number().required(),
  Time: yup.object({
    startTime: yup.date().required(),
    endTime: yup.date().required()
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
const TextInput = ({ title, name, placeholder }: { title: string; name: string; placeholder: string }) => {
  return (
    <Box>
      <Title sx={{ fontSize: 20 }} mb={16}>
        {title}
      </Title>
      <FormItem name={name}>
        <OutlinedInput placeholder={placeholder} />
      </FormItem>
    </Box>
  )
}
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
const BasicCard = () => {
  const { chainId } = useActiveWeb3React()
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

    ProjectLink: {
      WebsiteURL: '',
      Whitepaper: '',
      TwitterLink: '',
      TelegramLink: '',
      FacebookLink: '',
      YoutubeLink: '',
      SubredditLink: '',
      MediumLink: '',
      DiscordLink: ''
    },
    ProjectDescribe: '',
    Tokenomics: '',
    ProjectRoadmap: '',
    ProjectName: '',
    ChainId: chainId
  }
  const onSubmit = (values: any) => {
    console.log('submit')
    console.log(values)
  }

  return (
    <CardBox>
      <Formik
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={basicValidationSchema}
        initialValues={initBasicValue}
      >
        {({ values, setFieldValue, handleSubmit }) => {
          return (
            <Stack component={'form'} gap={24} onSubmit={handleSubmit}>
              <BaseBox>
                <Stack flexDirection={'column'} gap={32}>
                  <Box>
                    <Title mb={32}>Basic Information</Title>
                    <UploadLayout>
                      <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
                        <FormItem
                          name="ProjectPicture"
                          fieldType="custom"
                          style={{ display: values.ProjectPicture.fileUrl ? 'none' : 'block' }}
                        >
                          <UploadItem
                            inputId="ProjectPictureImg"
                            value={{ fileUrl: values.ProjectPicture.fileUrl }}
                            onChange={file => {
                              setFieldValue('ProjectPicture', file)
                            }}
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
                        </FormItem>
                        {values.ProjectPicture.fileUrl && <ImageBg url={values.ProjectPicture.fileUrl} />}
                        <UploadIntroduce title="Project Picture" />
                      </Stack>
                      <UploadBtn htmlFor="ProjectPictureImg">Upload</UploadBtn>
                    </UploadLayout>
                  </Box>

                  <Box>
                    <UploadLayout>
                      <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
                        <FormItem
                          name="ProjectLogo"
                          fieldType="custom"
                          style={{ display: values.ProjectLogo.fileUrl ? 'none' : 'block' }}
                        >
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
                        </FormItem>
                        {values.ProjectLogo.fileUrl && (
                          <ImageBg sx={{ width: 72, height: 72, borderRadius: 36 }} url={values.ProjectLogo.fileUrl} />
                        )}

                        <UploadIntroduce title="Project Logo" />
                      </Stack>
                      <UploadBtn htmlFor="ProjectLogoImg">Upload</UploadBtn>
                    </UploadLayout>
                  </Box>

                  <Box>
                    <UploadLayout>
                      <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
                        <FormItem
                          name="BannerBigPicture"
                          fieldType="custom"
                          style={{ display: values.BannerBigPicture.fileUrl ? 'none' : 'block' }}
                        >
                          <UploadItem
                            onChange={file => setFieldValue('BannerBigPicture', file)}
                            inputId={'BannerBigPicture'}
                            value={{ fileUrl: values.BannerBigPicture.fileUrl }}
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
                        </FormItem>
                        {values.BannerBigPicture.fileUrl && <ImageBg url={values.BannerBigPicture.fileUrl} />}

                        <UploadIntroduce title="banner" />
                      </Stack>
                      <UploadBtn htmlFor="BannerBigPicture">Upload</UploadBtn>
                    </UploadLayout>
                  </Box>

                  <TextInput name="ProjectName" title="Project Name" placeholder="Name of the project, eg. Bounce" />
                  <Box>
                    <Title>Describe your project (100-500 words)</Title>
                    <Title mt={5} sx={{ fontSize: 16, fontWeight: 500, color: '#626262' }}>
                      Please address the following questions in your description.
                    </Title>
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
                    <FormItem style={{ marginTop: 20 }} name="ProjectDescribe">
                      <MarkdownEditor
                        value={values.ProjectDescribe}
                        setEditorValue={value => setFieldValue('ProjectDescribe', value)}
                        placeholder="Project description"
                      />
                    </FormItem>
                  </Box>
                  <TextInput name="WebsiteURL" title="Website URL" placeholder="https://bitcoin.org" />
                  <Box>
                    <Title sx={{ fontSize: 20, fontWeight: 600, color: '#20201E' }}>Blockchain Platform</Title>
                    <Title sx={{ fontSize: 14, fontWeight: 500, color: '#626262', mt: 5, mb: 16 }}>
                      What platform is this project issued on?
                    </Title>
                    <FormItem>
                      <Select
                        value={values.ChainId}
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
                                background: values.ChainId === t.id ? '#E1F25C' : ''
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
                  </Box>

                  <TextInput
                    name="Whitepaper"
                    title="Whitepaper/Technical Documentation Link"
                    placeholder="https://bitcoin.org/bitcoin.pdf"
                  />
                  <Box>
                    <Stack flexDirection={'row'} gap={5}>
                      <Title sx={{ fontSize: 18, color: '#20201E' }}>Tokenomics </Title>
                      <Title sx={{ fontSize: 18, color: '#959595' }}>(Optional)</Title>
                    </Stack>
                    <FormItem style={{ marginTop: 15 }} name="Tokenomics">
                      <MarkdownEditor
                        value={values.Tokenomics}
                        setEditorValue={value => setFieldValue('Tokenomics', value)}
                        placeholder="Hello, nice to meet you ^^... My Name is Eleanor Pena. I work as an Comic Artist, Freelance Illustrator, and concepting Character Design. I can do drawing for personal or business. I started my career as an illustrator in 2018."
                      />
                    </FormItem>
                  </Box>
                  <Box>
                    <Stack flexDirection={'row'} gap={5}>
                      <Title sx={{ fontSize: 18, color: '#20201E' }}>Project Roadmap </Title>
                      <Title sx={{ fontSize: 18, color: '#959595' }}>(Optional)</Title>
                    </Stack>
                    <FormItem style={{ marginTop: 15 }} name="ProjectRoadmap">
                      <MarkdownEditor
                        value={values.ProjectRoadmap}
                        setEditorValue={value => setFieldValue('ProjectRoadmap', value)}
                        placeholder="Project description."
                      />
                    </FormItem>
                  </Box>
                </Stack>
              </BaseBox>

              <BaseBox>
                <Box mb={50}>
                  <Title sx={{ fontSize: 28 }}>Community Information</Title>
                  <Title sx={{ fontSize: 14, color: '#959595', fontWeight: 500 }}>* Fill in at least one</Title>
                </Box>
                <Stack flexDirection={'column'} gap={32}>
                  <TextInput
                    name="ProjectLink.TwitterLink"
                    title="Twitter Profile Link"
                    placeholder="eg. https://twitter.com/bounce_finance"
                  />
                  <TextInput
                    name="ProjectLink.TelegramLink"
                    title="Telegram Channel Link"
                    placeholder="eg. https://t.me/bounce_finance"
                  />
                  <TextInput
                    name="ProjectLink.FacebookLink"
                    title="Facebook Profile Link"
                    placeholder="eg. https://facebook.com/bounce_finance"
                  />
                  <TextInput
                    name="ProjectLink.YoutubeLink"
                    title="Youtube Channel Link"
                    placeholder="eg. https://www.youtube.com/c/bounce_finance"
                  />
                  <TextInput
                    name="ProjectLink.SubredditLink"
                    title="Subreddit Link"
                    placeholder="eg. https://www.reddit.com/r/bounce_finance"
                  />
                  <TextInput
                    name="ProjectLink.MediumLink"
                    title="Medium Url"
                    placeholder="eg. https://medium.com/bounce_finance"
                  />
                  <TextInput
                    name="ProjectLink.DiscordLink"
                    title="Discord Invitation Url"
                    placeholder="eg. https://medium.com/bounce_finance"
                  />
                </Stack>
              </BaseBox>

              {/* <BaseBox>
                <Stack flexDirection={'row'} gap={5}>
                  <Title sx={{ fontSize: 18, color: '#20201E' }}>Attachments</Title>
                  <Title sx={{ fontSize: 18, color: '#959595' }}>(Optional)</Title>
                </Stack>
                <DropFile />
              </BaseBox> */}
              <Box
                mt={48}
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 54 }}
              >
                <Button
                  variant="contained"
                  sx={{
                    padding: '16px 40px',
                    boxSizing: 'border-box',
                    background: '#121212',
                    '&:hover': { background: '#121212', border: 'none' }
                  }}
                >
                  <Title sx={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>Preview</Title>
                </Button>
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
            </Stack>
          )
        }}
      </Formik>
    </CardBox>
  )
}
const showTokenDialog = async ({
  chainId,
  enableEth = true,
  setFieldValue
}: {
  chainId: ChainId
  enableEth?: boolean
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}) => {
  const res = await show<Token>(TokenDialog, { chainId, enableEth })
  setFieldValue('Token', {
    tokenToAddress: res.address,
    tokenToSymbol: res.symbol,
    tokenToLogoURI: res.logoURI,
    tokenToDecimals: res.decimals
  })
}
const DetailCard = () => {
  const { chainId } = useActiveWeb3React()
  const initDetailValue = {
    TokenLogo: {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: ''
    },
    TokenName: '',
    ChainId: chainId,
    ContractAddress: '',
    ContractDecimalPlaces: '',
    AuctionType: 'fixed-price',
    Token: {
      tokenToAddress: '',
      tokenToSymbol: '',
      tokenToLogoURI: '',
      tokenToDecimals: ''
    },
    SwapRatio: '',
    TotalSupply: '',
    Time: {
      startTime: '',
      endTime: ''
    },
    allocationStatus: AllocationStatus.NoLimits
  }
  const onSubmit = () => {}

  return (
    <CardBox>
      <Formik initialValues={initDetailValue} validationSchema={detailValidationSchema} onSubmit={onSubmit}>
        {({ values, setFieldValue }) => {
          return (
            <Stack component={'form'} gap={24}>
              <BaseBox>
                <Title sx={{ color: '#20201E', fontSize: 28 }}>Token Information</Title>
                <Stack flexDirection={'column'} gap={32}>
                  <Box mt={64}>
                    <UploadLayout>
                      <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
                        <FormItem
                          name="TokenLogo"
                          fieldType="custom"
                          style={{ display: values.TokenLogo.fileUrl ? 'none' : 'block' }}
                        >
                          <UploadItem
                            onChange={file => setFieldValue('TokenLogo', file)}
                            inputId={'TokenLogo'}
                            value={{ fileUrl: values.TokenLogo.fileUrl }}
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
                        </FormItem>
                        {values.TokenLogo.fileUrl && <ImageBg url={values.TokenLogo.fileUrl} />}

                        <UploadIntroduce title="TokenLogo" />
                      </Stack>
                      <UploadBtn htmlFor="TokenLogo">Upload</UploadBtn>
                    </UploadLayout>
                  </Box>
                  <TextInput title="TokenName" name="TokenName" placeholder="Name of the project, eg. Bounce" />
                  <Box>
                    <Title sx={{ fontSize: 20, fontWeight: 600, color: '#20201E' }}>Blockchain Platform</Title>
                    <Title sx={{ fontSize: 14, fontWeight: 500, color: '#626262', mt: 5, mb: 16 }}>
                      What platform is this token issued on?
                    </Title>
                    <FormItem>
                      <Select
                        value={values.ChainId}
                        displayEmpty
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
                                <Title sx={{ fontSize: 14, color: '#959595', fontWeight: 500 }}>
                                  select asset platform
                                </Title>
                              )}
                            </Box>
                          )
                        }}
                      >
                        {ChainList.map(t => (
                          <MenuItem
                            key={t.id}
                            value={t.id}
                            selected={values.ChainId === t.id ? true : false}
                            sx={{
                              '&.Mui-selected': {
                                background: '#E1F25C'
                              }
                            }}
                          >
                            <Stack
                              sx={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 16
                              }}
                            >
                              <Image style={{ width: 25, height: 25 }} src={t.logo} />
                              <Title sx={{ fontSize: 16 }}>{t.name}</Title>
                            </Stack>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormItem>
                  </Box>

                  <TextInput title="Contract Address" name="ContractAddress" placeholder="Explorer Link" />
                  <TextInput name="ContractDecimalPlaces" placeholder="Explorer Link" title="Contract Decimal Places" />
                </Stack>
              </BaseBox>
              <BaseBox>
                <Title sx={{ color: '#20201E', marginBottom: 64 }}>launchpad information</Title>
                <Stack flexDirection={'column'} gap={32}>
                  <Box>
                    <Title mb={16} sx={{ color: '#20201E', fontSize: 20 }}>
                      Auction Type
                    </Title>
                    <FormItem>
                      <Select
                        value={values.AuctionType}
                        onChange={e => {
                          console.log(e.target.value)
                          setFieldValue('AuctionType', e.target.value)
                        }}
                        renderValue={selected => {
                          return <Title sx={{ fontSize: 16, color: '#20201E', fontWeight: 400 }}>{selected}</Title>
                        }}
                      >
                        {Object.values(AuctionType).map((value, index) => (
                          <MenuItem key={index} value={value}>
                            <Title
                              sx={{
                                fontSize: 16,
                                color: values.AuctionType === value ? '#2B51DA' : '#20201E',
                                fontWeight: 400
                              }}
                            >
                              {value}
                            </Title>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormItem>
                  </Box>
                  <Box>
                    <Title mb={16} sx={{ fontSize: 20 }}>
                      Funding Currency
                    </Title>
                    <FormItem
                      name="Token.tokenToSymbol"
                      label="Select Token"
                      required
                      sx={{ flex: 1 }}
                      startAdornment={
                        <TokenImage alt={values.Token.tokenToSymbol} src={values.Token.tokenToLogoURI} size={32} />
                      }
                    >
                      <FakeOutlinedInput
                        readOnly
                        onClick={() => showTokenDialog({ chainId: values.ChainId as ChainId, setFieldValue })}
                      />
                    </FormItem>
                  </Box>
                  <Box>
                    <Title mb={14} sx={{ fontSize: 20, color: '#20201E' }}>
                      Swap ratio
                    </Title>
                    <Stack
                      flexDirection={'row'}
                      sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 15 }}
                    >
                      <Title sx={{ fontSize: 20, color: '#171717' }}>
                        1 {!values.TokenName ? 'USDT' : values.TokenName} =
                      </Title>
                      {/* 小数点位数大于 精度时还没有报错？ */}
                      <FormItem placeholder="0.00" required sx={{ flex: 1 }}>
                        <NumberInput
                          value={values.SwapRatio}
                          onUserInput={value => setFieldValue('SwapRatio', value)}
                          endAdornment={
                            <>
                              <TokenImage
                                alt={values.Token.tokenToSymbol}
                                src={values.Token.tokenToLogoURI}
                                size={24}
                              />
                              <Typography sx={{ ml: 8 }}>{values.Token.tokenToSymbol}</Typography>
                            </>
                          }
                        />
                      </FormItem>
                    </Stack>
                  </Box>
                  <TextInput name="TotalSupply" title="Total Supply" placeholder="Enter  amount" />
                  <Box>
                    <Title mb={13} sx={{ fontSize: 20, fontWeight: 500, color: '#000' }}>
                      Time
                    </Title>
                    <Stack flexDirection={'row'}>
                      <Field
                        component={DateTimePickerFormItem}
                        name="startTime"
                        disablePast
                        maxDateTime={values.Time.endTime}
                        textField={{ sx: { flex: 1 } }}
                      />
                      <Field
                        component={DateTimePickerFormItem}
                        name="endTime"
                        disablePast
                        minDateTime={values.Time.startTime}
                        textField={{ sx: { flex: 1 } }}
                      />
                    </Stack>
                  </Box>
                  <Box>
                    <Title sx={{ color: '#20201E', fontSize: 20 }}>Allocation per wallet</Title>
                    <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="allocationStatus">
                      <FormControlLabel
                        value={AllocationStatus.NoLimits}
                        control={<Radio disableRipple />}
                        label="No Limits"
                      />
                      <FormControlLabel
                        value={AllocationStatus.Limited}
                        control={<Radio disableRipple />}
                        label="Limited"
                      />
                    </Field>
                    {values.allocationStatus === AllocationStatus.Limited && (
                      <FormItem name="allocationPerWallet" required sx={{ flex: 1 }}>
                        <OutlinedInput
                          sx={{ mt: 10 }}
                          endAdornment={
                            <>
                              <TokenImage
                                alt={values.Token.tokenToSymbol}
                                src={values.Token.tokenToLogoURI}
                                size={24}
                              />
                              <Typography sx={{ ml: 8 }}>{values.Token.tokenToSymbol}</Typography>
                            </>
                          }
                        />
                      </FormItem>
                    )}
                  </Box>
                </Stack>
              </BaseBox>
            </Stack>
          )
        }}
      </Formik>
    </CardBox>
  )
}
const CreateLaunchpad = () => {
  const [tabActive, setTabActive] = useState(1)
  const tabs = [['Basic Information', 'Promotional Display Before The Launchpad'], 'Launchpad Detail(Optional)']
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Box>
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
  padding: '0 82px'
})
const FooterBox = styled(Box)({
  width: '100%',
  maxWidth: '1296px',
  height: 72,
  margin: '72px auto 20px',
  borderTop: '1px solid #D7D6D9',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
  '& p': {
    color: 'rgba(18, 18, 18, 0.60)'
  }
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
