import { Box, MenuItem, OutlinedInput, Select, Stack, SxProps } from '@mui/material'
import { BaseBox, Title, FormLayout, FormUploadAdd, AddFile, CardBox } from './BaseComponent'
// import { Formik } from 'formik'
import FormItem from 'bounceComponents/common/FormItem'
import MarkdownEditor from '../components/markdownEditor'
import Image from 'components/Image'
import { ChainId, ChainList } from 'constants/chain'
import { Body02 } from 'components/Text'
import { ReactComponent as BigAddIcon } from 'assets/imgs/icon/big-add.svg'
import useBreakpoint from 'hooks/useBreakpoint'
// import { basicValidationSchema } from '../schema'
import { IValues } from '../type'
// import { useState, useEffect } from 'react'
// import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
// import { show } from '@ebay/nice-modal-react'
// import DialogTips from 'bounceComponents/common/DialogTips'
// import { updateLaunchpadBasic } from 'api/user'
// import { useRequest } from 'ahooks'
import { IFile } from 'bounceComponents/common/Uploader'

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
  values,
  sx,
  setFieldValue
}: {
  values: IValues
  sx?: SxProps
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}) => {
  // 缓存了数据
  // const [curChaiId, setCurChaiId] = useState(initValue.chainId)
  // useEffect(() => {
  //   setCurChaiId(initValue.chainId)
  // }, [initValue])
  // const chainConfigInBackend = useChainConfigInBackend('ethChainId', curChaiId)

  const isSm = useBreakpoint('sm')
  // const submitBasic = async (values: IBasicInfoParams) => {
  //   const params: IBasicInfoParams = {
  //     ...values,
  //     chainId: chainConfigInBackend?.id as ChainId,
  //     banner: (values.banner as IFile).fileUrl,
  //     projectLogo: (values.projectLogo as IFile).fileUrl,
  //     projectMobilePicture: (values.projectMobilePicture as IFile).fileUrl,
  //     projectPicture: (values.projectPicture as IFile).fileUrl
  //   }

  //   return updateLaunchpadBasic(params)
  // }
  // const { loading, run } = useRequest(submitBasic, {
  //   manual: true,
  //   onSuccess(result, params) {
  //     console.log('result, params')
  //     console.log(result, params)
  //     show(DialogTips, {
  //       iconType: 'success',
  //       cancelBtn: 'confirm',
  //       title: 'Congratulations!',
  //       content: 'You have successfully submit, Please wait patiently for review.'
  //     })
  //   },
  //   onError() {
  //     show(DialogTips, {
  //       iconType: 'error',
  //       cancelBtn: 'confirm',
  //       title: 'Oops..',
  //       content: 'Something went wrong'
  //     })
  //   }
  // })
  // const onSubmit = (values: IBasicInfoParams) => {
  //   run(values)
  // }
  return (
    <CardBox sx={{ ...sx }}>
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
            childTitle={<Body02 sx={{ fontSize: 12, color: '#626262' }}>{`(JPEG, PNG, WEBP Files, Size<10M)`}</Body02>}
            childForm={
              <FormUploadAdd
                formItemName="projectLogo"
                fileUrl={(values.basic.projectLogo as IFile).fileUrl}
                setFieldValue={setFieldValue}
                labelId="ProjectLogoImg"
                labelChild={<AddFile />}
              />
            }
          />
          <FormLayout
            title1="banner"
            childTitle={<Body02 sx={{ fontSize: 12, color: '#626262' }}>{`(JPEG, PNG, WEBP Files, Size<10M)`}</Body02>}
            childForm={
              <FormUploadAdd
                formItemName="projectPicture"
                fileUrl={(values.basic.projectPicture as IFile).fileUrl}
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
                    fileUrl={(values.basic.banner as IFile).fileUrl}
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
                    fileUrl={(values.basic.projectMobilePicture as IFile).fileUrl}
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
                  value={values.basic.description}
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
                <Select<ChainId>
                  value={values.basic.chainId}
                  onChange={({ target }) => {
                    setFieldValue('chainId', target.value)
                    // console.log('target')
                    // console.log(target.value)

                    // setCurChaiId(target.value as ChainId)
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
                      selected={values.basic.chainId === t.id ? true : false}
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
                value={values.basic.tokennomics}
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
                value={values.basic.roadmap}
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

      {/* <BaseBox>
                  <Stack flexDirection={'row'} gap={5}>
                    <Title sx={{ fontSize: 18, color: '#20201E' }}>Attachments</Title>
                    <Title sx={{ fontSize: 18, color: '#959595' }}>(Optional)</Title>
                  </Stack>
                  <DropFile />
                </BaseBox> */}
      {/* <SubmitComp loading={loading} /> */}
    </CardBox>
  )
}
export default BasicForm
