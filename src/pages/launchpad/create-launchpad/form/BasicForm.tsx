import { Box, MenuItem, OutlinedInput, Select, Stack } from '@mui/material'
import { CardBox, BaseBox, Title, SubmitComp, FormLayout, FormUploadAdd, AddFile } from './BaseComponent'
import { Formik } from 'formik'
import FormItem from 'bounceComponents/common/FormItem'
import MarkdownEditor from '../components/markdownEditor'
import Image from 'components/Image'
import { ChainList } from 'constants/chain'
import { Body02 } from 'components/Text'
import { ReactComponent as BigAddIcon } from 'assets/imgs/icon/big-add.svg'
import useBreakpoint from 'hooks/useBreakpoint'
import { basicValidationSchema } from '../schema'
import { TinitBasicValue } from '../type'
const BasicForm = ({ initBasicValue }: { initBasicValue: TinitBasicValue }) => {
  const isSm = useBreakpoint('sm')
  // const {} = useFormikContext()
  // console.log('values')
  // console.log(values)
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
                        fileUrl={values.projectLogo.fileUrl}
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
                        formItemName="projectPicture"
                        fileUrl={values.projectPicture.fileUrl}
                        setFieldValue={setFieldValue}
                        labelId="projectPicture"
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
                            formItemName="banner"
                            fileUrl={values.banner.fileUrl}
                            setFieldValue={setFieldValue}
                            labelId="ProjectPictureBigImg"
                            labelChild={<BigAddIcon />}
                            labelSx={{ width: '100%', height: 240, border: '1px dashed #D7D6D9' }}
                          />
                          <Body02 sx={{ fontSize: 12, color: '#626262' }}>{`Suggested size: 375px*290px`}</Body02>
                        </Stack>
                        <Stack sx={{ flexDirection: 'column', gap: 16, width: isSm ? '100%' : 400 }}>
                          <FormUploadAdd
                            formItemName="projectMobilePicture"
                            fileUrl={values.projectMobilePicture.fileUrl}
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
                      <FormItem style={{ marginTop: 20 }} name="description">
                        <MarkdownEditor
                          value={values.description}
                          setEditorValue={value => setFieldValue('description', value)}
                          placeholder="Project description"
                        />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Website URL"
                    childForm={
                      <FormItem name={'website'}>
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
                              selected={values.chainId === t.id ? true : false}
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
                      <FormItem name={'whitepaperLink'}>
                        <OutlinedInput placeholder="https://bitcoin.org/bitcoin.pdf" />
                      </FormItem>
                    }
                  />

                  <Box>
                    <Stack flexDirection={'row'} gap={5}>
                      <Title sx={{ fontSize: 18, color: '#20201E' }}>Tokenomics </Title>
                      <Title sx={{ fontSize: 18, color: '#959595' }}>(Optional)</Title>
                    </Stack>
                    <FormItem style={{ marginTop: 15 }} name="tokennomics">
                      <MarkdownEditor
                        value={values.tokennomics}
                        setEditorValue={value => setFieldValue('tokennomics', value)}
                        placeholder="PHello, nice to meet you ^^... My Name is Eleanor Pena. I work as an Comic Artist, Freelance Illustrator, and concepting Character Design. I can do drawing for personal or business. I started my career as an illustrator in 2018."
                      />
                    </FormItem>
                  </Box>
                  <Box>
                    <Stack flexDirection={'row'} gap={5}>
                      <Title sx={{ fontSize: 18, color: '#20201E' }}>Project Roadmap </Title>
                      <Title sx={{ fontSize: 18, color: '#959595' }}>(Optional)</Title>
                    </Stack>
                    <FormItem style={{ marginTop: 15 }} name="roadmap">
                      <MarkdownEditor
                        value={values.roadmap}
                        setEditorValue={value => setFieldValue('roadmap', value)}
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
