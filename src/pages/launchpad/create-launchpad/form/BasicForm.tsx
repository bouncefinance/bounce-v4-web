import { Box, MenuItem, Select, Stack } from '@mui/material'
import { CardBox, BaseBox, Title, TextInput, SubmitComp, FormUploadLayout } from './BaseComponent'
import { Formik } from 'formik'
import { useActiveWeb3React } from 'hooks'
import * as yup from 'yup'
import FormItem from 'bounceComponents/common/FormItem'

import MarkdownEditor from '../components/markdownEditor'
import Image from 'components/Image'
import { ChainList } from 'constants/chain'
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
const BasicForm = () => {
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
                    <FormUploadLayout
                      formItemName="ProjectPicture"
                      fileUrl={values.ProjectPicture.fileUrl}
                      setFieldValue={setFieldValue}
                      uploadTitle="Project Picture"
                      labelId="ProjectPictureImg"
                    />
                  </Box>

                  <Box>
                    <FormUploadLayout
                      formItemName="ProjectLogo"
                      fileUrl={values.ProjectLogo.fileUrl}
                      setFieldValue={setFieldValue}
                      uploadTitle="Project Logo"
                      labelId="ProjectLogoImg"
                      imgSx={{
                        width: 72,
                        height: 72
                      }}
                    />
                  </Box>

                  <Box>
                    <FormUploadLayout
                      formItemName="BannerBigPicture"
                      fileUrl={values.BannerBigPicture.fileUrl}
                      setFieldValue={setFieldValue}
                      uploadTitle="Banner"
                      labelId="BannerBigPicture"
                    />
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
              <SubmitComp />
            </Stack>
          )
        }}
      </Formik>
    </CardBox>
  )
}
export default BasicForm
