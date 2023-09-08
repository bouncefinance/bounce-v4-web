import { Box, MenuItem, OutlinedInput, Select, Stack, SxProps } from '@mui/material'
import { CardBox, BaseBox, Title, SubmitComp, FormLayout, FormUploadAdd, AddFile } from './BaseComponent'
import { Formik } from 'formik'
import FormItem from 'bounceComponents/common/FormItem'
import MarkdownEditor from '../components/markdownEditor'
import Image from 'components/Image'
import { ChainId, ChainList } from 'constants/chain'
import { Body02 } from 'components/Text'
import { ReactComponent as BigAddIcon } from 'assets/imgs/icon/big-add.svg'
import useBreakpoint from 'hooks/useBreakpoint'
import { basicSchema } from '../schema'
import { IBasicInfoParams, ICommunity } from '../type'
import { useActiveWeb3React } from 'hooks'
import { IUserLaunchpadInfo } from 'api/user/type'
import { updateLaunchpadBasic } from 'api/user'
import { show } from '@ebay/nice-modal-react'
import { useMemo } from 'react'
import { isEqual } from 'lodash'
import { useRequest } from 'ahooks'
import DialogDarkTips from 'bounceComponents/common/DialogTips/DialogDarkTips'
import { useOptionDatas } from 'state/configOptions/hooks'
import { CreTab } from '..'
const community: ICommunity[] = [
  { communityName: 'twitter', communityLink: '' },
  { communityName: 'telegram', communityLink: '' },
  { communityName: 'facebook', communityLink: '' },
  { communityName: 'youtube', communityLink: '' },
  { communityName: 'subreddit', communityLink: '' },
  { communityName: 'medium', communityLink: '' },
  { communityName: 'discord', communityLink: '' }
]
const communityInfo = [
  { title: 'Twitter Profile Link', placeholder: 'eg. https://twitter.com/bounce_finance' },
  { title: 'Telegram Channel Link', placeholder: 'eg. https://t.me/bounce_finance' },
  { title: 'Facebook Profile Link', placeholder: 'eg. https://facebook.com/bounce_finance' },
  { title: 'Youtube Channel Link', placeholder: 'eg. https://www.youtube.com/c/bounce_finance' },
  { title: 'Subreddit Link', placeholder: 'eg. https://www.reddit.com/r/bounce_finance' },
  { title: 'Medium Url', placeholder: 'eg. https://medium.com/bounce_finance' },
  { title: 'Discord Invitation Url', placeholder: 'eg. https://medium.com/bounce_finance' }
]
const BasicForm = ({
  getLaunchpadInfo,
  sx,
  launchpadInfo,
  first,
  setTab
}: {
  getLaunchpadInfo: () => void
  sx?: SxProps
  launchpadInfo: IUserLaunchpadInfo
  first: boolean
  setTab: (c: CreTab) => void
}) => {
  const { chainId } = useActiveWeb3React()
  const isSm = useBreakpoint('sm')
  const { loading, runAsync } = useRequest(
    (values: IBasicInfoParams) => {
      return updateLaunchpadBasic(values)
    },
    { manual: true }
  )
  const optionsDatas = useOptionDatas()

  const initValue = useMemo(() => {
    let defaultValue: IBasicInfoParams = {
      id: 0,
      banner: '',
      projectLogo: '',
      community: community,
      website: '',
      whitepaperLink: '',
      description: '',
      tokennomics: '',
      roadmap: '',
      projectName: '',
      chainId: chainId ?? ChainId.MAINNET,
      posts: ''
    }
    if (launchpadInfo && launchpadInfo.basicInfo) {
      defaultValue = { ...launchpadInfo.basicInfo }
      defaultValue.chainId = ChainId.MAINNET
      if (optionsDatas && optionsDatas.chainInfoOpt) {
        const network = optionsDatas.chainInfoOpt?.find(item => item.id === launchpadInfo.basicInfo.chainId)
        if (network) {
          defaultValue.chainId = network.ethChainId as number
        }
      }
    }

    return defaultValue
  }, [chainId, launchpadInfo, optionsDatas])

  const onSubmit = async (values: IBasicInfoParams) => {
    const body = { ...values }
    body.chainId = optionsDatas.chainInfoOpt?.find(item => item.ethChainId === body.chainId)?.id as number
    try {
      await runAsync(body)
      await getLaunchpadInfo()
      show(DialogDarkTips, {
        iconType: 'success',
        title: 'Сongratulations!',
        content: 'You have successfully submit, Please wait patiently for review.',
        cancelBtn: 'Confirm',
        againBtn: 'Go Pool Info',
        PaperProps: {
          sx: {
            '&.MuiPaper-root': {
              '& .MuiButtonBase-root': {
                backgroundColor: '#121212',
                color: '#fff'
              },
              backgroundColor: '#fff',
              '& svg path': {
                stroke: '#171717'
              },
              '& .MuiDialogContent-root h2': {
                color: '#121212'
              }
            }
          }
        },
        onAgain: () => {
          setTab(CreTab.POOL)
        }
      })
    } catch (error) {
      show(DialogDarkTips, {
        iconType: 'error',
        title: 'Сongratulations!',
        content: 'Save failed.',
        cancelBtn: 'Continue filling in',
        PaperProps: {
          sx: {
            '&.MuiPaper-root': {
              '& .MuiButtonBase-root': {
                backgroundColor: '#121212',
                color: '#fff'
              },
              backgroundColor: '#fff',
              '& svg path': {
                stroke: '#171717'
              },
              '& .MuiDialogContent-root h2': {
                color: '#121212'
              }
            }
          }
        },
        onCancel: () => {},
        onClose: () => {}
      })
    }
  }

  return (
    <CardBox sx={{ ...sx }}>
      <Formik onSubmit={onSubmit} enableReinitialize validationSchema={basicSchema} initialValues={initValue}>
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
                        fileUrl={values.projectLogo}
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
                        formItemName="banner"
                        fileUrl={values.banner}
                        setFieldValue={setFieldValue}
                        labelId="banner"
                        labelChild={<BigAddIcon />}
                        labelSx={{ width: '100%', height: 240, border: '1px dashed #D7D6D9' }}
                      />
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
                  {communityInfo.map((item, index) => (
                    <FormLayout
                      key={index}
                      title1={item.title}
                      childForm={
                        <FormItem name={`community[${index}].communityLink`}>
                          <OutlinedInput placeholder={item.placeholder} />
                        </FormItem>
                      }
                    />
                  ))}
                </Stack>
              </BaseBox>
              <SubmitComp isShowPreview={false} loading={loading} isChange={first || !isEqual(values, initValue)} />
            </Stack>
          )
        }}
      </Formik>
    </CardBox>
  )
}
export default BasicForm
