import { Box, Stack, Typography, styled } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import { useMemo, useState } from 'react'
import { HeadTitle, SubmitComp } from './form/BaseComponent'
import BasicForm from './form/BasicForm'
import DetailForm from './form/DetailForm'
import useBreakpoint from 'hooks/useBreakpoint'
import { ChainId } from 'constants/chain'
import { IDetailInitValue, IBasicInfoParams, IAuctionType, ICommunity, IValues } from './type'
import { useActiveWeb3React } from 'hooks'
import { AllocationStatus, IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { Formik } from 'formik'
import { createLaunchpadSchema } from './schema'
enum ITab {
  'Basic',
  'Detail'
}

const community: ICommunity[] = [
  { communityName: 'twitter', communityLink: '' },
  { communityName: 'telegram', communityLink: '' },
  { communityName: 'facebook', communityLink: '' },
  { communityName: 'youtube', communityLink: '' },
  { communityName: 'subreddit', communityLink: '' },
  { communityName: 'medium', communityLink: '' },
  { communityName: 'discord', communityLink: '' }
]
const CreateLaunchpad = () => {
  const { chainId } = useActiveWeb3React()

  // const initBasicValue = useMemo<IBasicInfoParams>(() => {
  //   const value = {
  //     id: 0,
  //     banner: {
  //       fileName: '',
  //       fileSize: 0,
  //       fileThumbnailUrl: '',
  //       fileType: '',
  //       fileUrl: ''
  //     },
  //     projectMobilePicture: {
  //       fileName: '',
  //       fileSize: 0,
  //       fileThumbnailUrl: '',
  //       fileType: '',
  //       fileUrl: ''
  //     },
  //     projectLogo: {
  //       fileName: '',
  //       fileSize: 0,
  //       fileThumbnailUrl: '',
  //       fileType: '',
  //       fileUrl: ''
  //     },
  //     projectPicture: {
  //       fileName: '',
  //       fileSize: 0,
  //       fileThumbnailUrl: '',
  //       fileType: '',
  //       fileUrl: ''
  //     },
  //     community: community,
  //     website: '',
  //     whitepaperLink: '',
  //     description: '',
  //     tokennomics: '',
  //     roadmap: '',
  //     projectName: '',
  //     chainId: chainId ?? ChainId.MAINNET,
  //     posts: ''
  //   }
  //   return value
  // }, [chainId])
  // const initDetailValue: IDetailInitValue = {
  //   TokenLogo: {
  //     fileName: '',
  //     fileSize: 0,
  //     fileThumbnailUrl: '',
  //     fileType: '',
  //     fileUrl: '',
  //     id: 0
  //   },
  //   TokenName: '',
  //   ChainId: chainId ?? ChainId.MAINNET,
  //   ContractAddress: '',
  //   ContractDecimalPlaces: '',
  //   AuctionType: IAuctionType.FIXED_PRICE_AUCTION,
  //   CustomizedNeeds: '',
  //   Token: {
  //     tokenToAddress: '',
  //     tokenToSymbol: '',
  //     tokenToLogoURI: '',
  //     tokenToDecimals: ''
  //   },
  //   SwapRatio: '',
  //   TotalSupply: '',
  //   startTime: null,
  //   endTime: null,
  //   allocationStatus: AllocationStatus.NoLimits,
  //   allocationPerWallet: '',
  //   releaseType: IReleaseType.Cliff,
  //   delayUnlockingTime: null,
  //   linearUnlockingStartTime: null,
  //   linearUnlockingEndTime: null,
  //   fragmentReleaseTimes: [],
  //   fragmentReleaseSize: '',
  //   isRefundable: true
  // }
  const initValue = useMemo<IValues>(() => {
    const basic: IBasicInfoParams = {
      id: 0,
      banner: {
        fileName: '',
        fileSize: 0,
        fileThumbnailUrl: '',
        fileType: '',
        fileUrl: ''
      },
      projectMobilePicture: {
        fileName: '',
        fileSize: 0,
        fileThumbnailUrl: '',
        fileType: '',
        fileUrl: ''
      },
      projectLogo: {
        fileName: '',
        fileSize: 0,
        fileThumbnailUrl: '',
        fileType: '',
        fileUrl: ''
      },
      projectPicture: {
        fileName: '',
        fileSize: 0,
        fileThumbnailUrl: '',
        fileType: '',
        fileUrl: ''
      },
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
    const pool: IDetailInitValue = {
      TokenLogo: {
        fileName: '',
        fileSize: 0,
        fileThumbnailUrl: '',
        fileType: '',
        fileUrl: '',
        id: 0
      },
      TokenName: '',
      ChainId: chainId ?? ChainId.MAINNET,
      ContractAddress: '',
      ContractDecimalPlaces: '',
      AuctionType: IAuctionType.FIXED_PRICE_AUCTION,
      CustomizedNeeds: '',
      Token: {
        tokenToAddress: '',
        tokenToSymbol: '',
        tokenToLogoURI: '',
        tokenToDecimals: ''
      },
      SwapRatio: '',
      TotalSupply: '',
      startTime: null,
      endTime: null,
      allocationStatus: AllocationStatus.NoLimits,
      allocationPerWallet: '',
      releaseType: IReleaseType.Cliff,
      delayUnlockingTime: null,
      linearUnlockingStartTime: null,
      linearUnlockingEndTime: null,
      fragmentReleaseTimes: [],
      fragmentReleaseSize: '',
      isRefundable: true
    }
    return { basic, pool }
  }, [chainId])

  const [tabActive, setTabActive] = useState(ITab.Basic)
  const tabs = [['Basic Information', 'Promotional Display Before The Launchpad'], 'Launchpad Detail(Optional)']
  const isSm = useBreakpoint('sm')
  const onSubmit = () => {
    console.log('ssss')
  }
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Box>
        <ContainerBox>
          <HeadTitle>Create Program</HeadTitle>
          <Stack sx={{ flexDirection: 'row', mt: isSm ? 32 : 48 }}>
            {tabs.map((t, i) => (
              <Tab onClick={() => setTabActive(i)} key={i} className={tabActive === i ? 'active' : ''}>
                {Array.isArray(t) ? (
                  <>
                    <TabTitle1>{t[0]}</TabTitle1>
                    {!isSm && <TabTitle2>{t[1]}</TabTitle2>}
                  </>
                ) : (
                  <TabTitle1>{t}</TabTitle1>
                )}
              </Tab>
            ))}
          </Stack>
          <Formik
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={createLaunchpadSchema}
            initialValues={initValue}
          >
            {({ values, setFieldValue, handleSubmit, errors }) => {
              return (
                <Box component={'form'} onSubmit={handleSubmit}>
                  <BasicForm
                    sx={{ display: tabActive === ITab.Basic ? 'block' : 'none' }}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                  <DetailForm
                    sx={{ display: tabActive === ITab.Detail ? 'block' : 'none' }}
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                  />
                  <SubmitComp loading={false} />
                </Box>
              )
            }}
          </Formik>
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
  padding: '0 82px',
  '@media(max-width:600px)': {
    padding: '0',
    margin: '40px auto'
  }
})
const FooterBox = styled(Box)({
  width: '100%',
  maxWidth: '1296px',
  paddingTop: 32,
  margin: '41px auto 20px',
  borderTop: '1px solid #D7D6D9',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
  '& p': {
    color: 'rgba(18, 18, 18, 0.60)'
  },
  '@media(max-width:600px)': {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    marginTop: 36
  }
})

const Tab = styled(Stack)({
  width: 'max-content',
  padding: '15px 28px',
  borderRadius: '8px 8px 0px 0px',
  cursor: 'pointer',
  '&.active': {
    background: '#FFF',
    cursor: 'inherit'
  },
  '@media(max-width:600px)': {
    padding: '12px 16px'
  }
})
const TabTitle1 = styled(Typography)({
  fontFamily: 'Public Sans',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '140%',
  letterSpacing: '-0.4px',
  textTransform: 'capitalize',
  color: '#121212',
  '@media(max-width:600px)': {
    fontSize: 14
  }
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

export default CreateLaunchpad
