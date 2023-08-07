import { Box, MenuItem, OutlinedInput, Select, Stack } from '@mui/material'
import { CardBox, BaseBox, Title, SubmitComp, FormLayout, FormUploadAdd, AddFile } from './BaseComponent'
import { Formik } from 'formik'
import { useActiveWeb3React } from 'hooks'
import * as yup from 'yup'
import FormItem from 'bounceComponents/common/FormItem'

import MarkdownEditor from '../components/markdownEditor'
import Image from 'components/Image'
import { ChainId, ChainList } from 'constants/chain'
import { Body02 } from 'components/Text'
import { ReactComponent as BigAddIcon } from 'assets/imgs/icon/big-add.svg'
import useBreakpoint from 'hooks/useBreakpoint'
const basicValidationSchema = yup.object({
  ProjectPictureBig: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  }),
  ProjectPictureSmall: yup.object({
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
  const isSm = useBreakpoint('sm')
  const { chainId } = useActiveWeb3React()
  const initBasicValue = {
    ProjectPictureBig: {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: ''
    },
    ProjectPictureSmall: {
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
    ChainId: chainId ?? ChainId.MAINNET
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
                <Title mb={isSm ? 24 : 40}>Basic Information</Title>
                <Stack flexDirection={'column'} gap={isSm ? 16 : 32}>
                  <FormLayout
                    title1="Project Name"
                    childForm={
                      <FormItem name={'ProjectName'}>
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
                        formItemName="ProjectLogo"
                        fileUrl={values.ProjectLogo.fileUrl}
                        setFieldValue={setFieldValue}
                        labelId="ProjectLogoImg"
                        labelChild={<AddFile />}
                      />
                    }
                  />
                  <FormLayout
                    title1="banner"
                    childTitle={
                      <Body02 sx={{ fontSize: 12, color: '#626262' }}>{`(JPEG, PNG, WEBP Files, Size<10M)`}</Body02>
                    }
                    childForm={
                      <FormUploadAdd
                        formItemName="BannerBigPicture"
                        fileUrl={values.BannerBigPicture.fileUrl}
                        setFieldValue={setFieldValue}
                        labelId="BannerBigPicture"
                        labelChild={<BigAddIcon />}
                        labelSx={{ width: '100%', height: 240, border: '1px dashed #D7D6D9' }}
                      />
                    }
                  />
                  <FormLayout
                    title1="Project Picture"
                    childTitle={
                      <Body02
                        sx={{ fontSize: 12, color: '#626262' }}
                      >{`(Please upload same picture with different size. JPEG, PNG, WEBP Files, Size<10M)`}</Body02>
                    }
                    childForm={
                      <Stack sx={{ flexDirection: isSm ? 'column' : 'row', gap: 16 }}>
                        <Stack sx={{ flexDirection: 'column', gap: 16, width: isSm ? '100%' : 260 }}>
                          <FormUploadAdd
                            formItemName="ProjectPictureBig"
                            fileUrl={values.ProjectPictureBig.fileUrl}
                            setFieldValue={setFieldValue}
                            labelId="ProjectPictureBigImg"
                            labelChild={<BigAddIcon />}
                            labelSx={{ width: '100%', height: 240, border: '1px dashed #D7D6D9' }}
                          />
                          <Body02 sx={{ fontSize: 12, color: '#626262' }}>{`Suggested size: 375px*290px`}</Body02>
                        </Stack>
                        <Stack sx={{ flexDirection: 'column', gap: 16, width: isSm ? '100%' : 400 }}>
                          <FormUploadAdd
                            formItemName="ProjectPictureSmall"
                            fileUrl={values.ProjectPictureSmall.fileUrl}
                            setFieldValue={setFieldValue}
                            labelId="ProjectPictureSmallImg"
                            labelChild={<BigAddIcon />}
                            labelSx={{ width: '100%', height: 240, border: '1px dashed #D7D6D9' }}
                          />
                          <Body02 sx={{ fontSize: 12, color: '#626262' }}>{`Suggested size: 1360px*600px`}</Body02>
                        </Stack>
                      </Stack>
                    }
                  />
                  <FormLayout
                    title1="Describe Your Project (100-500 Words)"
                    title2="Please address the following questions in your description."
                    childTitle={
                      <Title mt={16} sx={{ fontSize: 14, fontWeight: 600, color: '#959595', lineHeight: '1.5' }}>
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
                      <FormItem name={'WebsiteURL'}>
                        <OutlinedInput placeholder="https://bitcoin.org" />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Blockchain Platform"
                    title2="What platform is this project issued on?"
                    childForm={
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
                                  <Title sx={{ fontSize: 14, color: '#959595', fontWeight: 500 }}>
                                    select platform
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
                                  '& > .MuiStack-root > p': {
                                    color: '#2B51DA'
                                  }
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
                      <FormItem name={'Whitepaper'}>
                        <OutlinedInput placeholder="https://bitcoin.org/bitcoin.pdf" />
                      </FormItem>
                    }
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
                        placeholder="PHello, nice to meet you ^^... My Name is Eleanor Pena. I work as an Comic Artist, Freelance Illustrator, and concepting Character Design. I can do drawing for personal or business. I started my career as an illustrator in 2018."
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
                  <FormLayout
                    title1="Twitter Profile Link"
                    childForm={
                      <FormItem name={'ProjectLink.TwitterLink'}>
                        <OutlinedInput placeholder="eg. https://twitter.com/bounce_finance" />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Telegram Channel Link"
                    childForm={
                      <FormItem name={'ProjectLink.TelegramLink'}>
                        <OutlinedInput placeholder="eg. https://t.me/bounce_finance" />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Facebook Profile Link"
                    childForm={
                      <FormItem name={'ProjectLink.FacebookLink'}>
                        <OutlinedInput placeholder="eg. https://facebook.com/bounce_finance" />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Youtube Channel Link"
                    childForm={
                      <FormItem name={'ProjectLink.YoutubeLink'}>
                        <OutlinedInput placeholder="eg. https://www.youtube.com/c/bounce_finance" />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Subreddit Link"
                    childForm={
                      <FormItem name={'ProjectLink.SubredditLink'}>
                        <OutlinedInput placeholder="eg. https://www.reddit.com/r/bounce_finance" />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Medium Url"
                    childForm={
                      <FormItem name={'ProjectLink.MediumLink'}>
                        <OutlinedInput placeholder="eg. https://medium.com/bounce_finance" />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Discord Invitation Url"
                    childForm={
                      <FormItem name={'ProjectLink.DiscordLink'}>
                        <OutlinedInput placeholder="eg. https://medium.com/bounce_finance" />
                      </FormItem>
                    }
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
