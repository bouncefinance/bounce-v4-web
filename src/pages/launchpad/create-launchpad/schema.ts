import * as yup from 'yup'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { AllocationStatus, IReleaseType } from '../../../bounceComponents/create-auction-pool/types'

const basicSchema = yup.object({
  banner: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  }),
  projectMobilePicture: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  }),
  projectLogo: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  }),
  projectPicture: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  }),
  description: yup
    .string()
    .required()
    .min(100, 'Describe your project (100-500 words)')
    .max(500, 'Describe your project (100-500 words)'),
  tokennomics: yup.string(),
  website: yup.string().url().required(),
  whitepaperLink: yup.string().url().required(),
  projectName: yup.string().required(),
  roadmap: yup.string(),
  chainId: yup.number().required(),
  community: yup.array().of(
    yup
      .object({
        communityLink: yup
          .string()
          .url('twitter link must be a valid URL')
          .test('notEmpty', 'fill in at least one', (val, context: any) => {
            return context.from[1].value.community.some((item: any) => item.communityLink)
          })
      })
      .concat(
        yup.object({
          communityLink: yup
            .string()
            .url('telegram link must be a valid URL')
            .test('notEmpty', 'fill in at least one', (val, context: any) => {
              return context.from[1].value.community.some((item: any) => item.communityLink)
            })
        })
      )
      .concat(
        yup.object({
          communityLink: yup
            .string()
            .url('facebook link must be a valid URL')
            .test('notEmpty', 'fill in at least one', (val, context: any) => {
              return context.from[1].value.community.some((item: any) => item.communityLink)
            })
        })
      )
      .concat(
        yup.object({
          communityLink: yup
            .string()
            .url('youtube link must be a valid URL')
            .test('notEmpty', 'fill in at least one', (val, context: any) => {
              return context.from[1].value.community.some((item: any) => item.communityLink)
            })
        })
      )
      .concat(
        yup.object({
          communityLink: yup
            .string()
            .url('subreddit link must be a valid URL')
            .test('notEmpty', 'fill in at least one', (val, context: any) => {
              return context.from[1].value.community.some((item: any) => item.communityLink)
            })
        })
      )
      .concat(
        yup.object({
          communityLink: yup
            .string()
            .url('medium link must be a valid URL')
            .test('notEmpty', 'fill in at least one', (val, context: any) => {
              return context.from[1].value.community.some((item: any) => item.communityLink)
            })
        })
      )
      .concat(
        yup.object({
          communityLink: yup
            .string()
            .url('discord link must be a valid URL')
            .test('notEmpty', 'fill in at least one', (val, context: any) => {
              return context.from[1].value.community.some((item: any) => item.communityLink)
            })
        })
      )
  )
})
const poolSchema = yup.object({
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
  ContractAddress: yup.string().required(),
  ContractDecimalPlaces: yup.number().required(),
  AuctionType: yup.string().required(),

  Token: yup.object({
    tokenToAddress: yup.string().required(),
    tokenToSymbol: yup.string().required('Funding Currency is a required field'),
    tokenToLogoURI: yup.string(),
    tokenToDecimals: yup.string().required()
  }),
  SwapRatio: yup
    .number()
    .positive('Swap ratio must be positive')
    .typeError('Please input valid number')
    .test('DIGITS_LESS_THAN_6', 'Should be no more than 6 digits after point', value => {
      const _value = new BigNumber(value || 0).toFixed()
      return !_value || !String(_value).includes('.') || String(_value).split('.')[1]?.length <= 6
    })
    .required('Swap ratio is required'),
  TotalSupply: yup.number().positive('Total Supply must be positive').required('Total Supply is required'),
  startTime: yup
    .date()
    // .min(new Date(new Date().toDateString()), 'Please select a time earlier than current time')
    .min(moment(), 'Please select a time earlier than current time')
    .typeError('Please select a valid time')
    .test('EARLIER_THAN_END_TIME', 'Please select a time earlier than end time', (value: any, context: any) => {
      return !context.parent.endTime.valueOf() || (value?.valueOf() || 0) < context.parent.endTime.valueOf()
    }),
  endTime: yup
    .date()
    .min(moment(), 'Please select a time earlier than current time')
    .typeError('Please select a valid time')
    .test('LATER_THAN_START_TIME', 'Please select a time later than start time', (value: any, context: any) => {
      return !context.parent.startTime.valueOf() || (value?.valueOf() || 0) > context.parent.startTime.valueOf()
    }),
  allocationStatus: yup.string().oneOf(Object.values(AllocationStatus)),
  allocationPerWallet: yup
    .number()
    .when('allocationStatus', {
      is: AllocationStatus.Limited,
      then: yup
        .number()
        .typeError('Please input valid number')
        .positive('Allocation per wallet must be positive')
        .test('DIGITS_LESS_THAN_6', 'Should be no more than 6 digits after point', value => {
          const _value = new BigNumber(value || 0).toFixed()
          return !_value || !String(_value).includes('.') || String(_value).split('.')[1]?.length <= 6
        })
        .required('Allocation per wallet is required')
    })
    .when('allocationStatus', {
      is: AllocationStatus.Limited,
      then: yup
        .number()
        .typeError('Please input valid number')
        .test(
          'GREATER_THAN_POOL_SIZE',
          'Allocation per wallet cannot be greater than pool size times swap ratio',
          (value, context) =>
            !context.parent.poolSize ||
            !context.parent.swapRatio ||
            (value || 0) <= context.parent.poolSize * context.parent.swapRatio
        )
    }),
  delayUnlockingTime: yup
    .date()
    .nullable(true)
    .when('releaseType', {
      is: (val: any) => Number(val) === IReleaseType.Cliff,
      then: yup
        .date()
        .typeError('Please select a valid time')
        .required('Please select a valid time')
        .test({
          name: 'check-delayUnlockingTime',
          test: (input, context) => {
            if (moment(input) < moment()) {
              return context.createError({ message: 'Please select a time earlier than current time' })
            }
            if (
              !(
                !context.parent.endTime?.valueOf() ||
                !context.parent.startTime?.valueOf() ||
                ((input?.valueOf() || 0) >= context.parent.startTime?.valueOf() &&
                  (input?.valueOf() || 0) >= context.parent.endTime?.valueOf())
              )
            ) {
              return context.createError({ message: 'Please select a time later than start time and end time' })
            }
            return true
          }
        })
    }),
  linearUnlockingStartTime: yup
    .date()
    .nullable(true)
    .when('releaseType', {
      is: (val: any) => Number(val) === IReleaseType.Linear,
      then: yup
        .date()
        .typeError('Please select a valid time')
        .required('Please select a valid time')
        .test({
          name: 'check-linearUnlockingStartTime',
          test: (input, context) => {
            if (moment(input) < moment()) {
              return context.createError({ message: 'Please select a time earlier than current time' })
            }
            if (
              !(
                !context.parent.endTime.valueOf() ||
                !context.parent.startTime.valueOf() ||
                ((input?.valueOf() || 0) >= context.parent.startTime.valueOf() &&
                  (input?.valueOf() || 0) >= context.parent.endTime.valueOf())
              )
            ) {
              return context.createError({ message: 'Please select a time later than start time and end time' })
            }
            return true
          }
        })
    }),
  linearUnlockingEndTime: yup
    .date()
    .nullable(true)
    .when('releaseType', {
      is: (val: any) => Number(val) === IReleaseType.Linear,
      then: yup
        .date()
        .typeError('Please select a valid time')
        .required('Please select a valid time')
        .test({
          name: 'check-linearUnlockingEndTime',
          test: (input, context) => {
            if (moment(input) < moment()) {
              return context.createError({ message: 'Please select a time earlier than current time' })
            }
            if (
              !(
                !context.parent.linearUnlockingStartTime.valueOf() ||
                (input?.valueOf() || 0) > context.parent.linearUnlockingStartTime.valueOf()
              )
            ) {
              return context.createError({ message: 'Please select a time later than linear unlocking end time' })
            }
            return true
          }
        })
    }),
  fragmentReleaseTimes: yup.array().when('releaseType', {
    is: (val: any) => Number(val) === IReleaseType.Fragment,
    then: yup.array().of(
      yup.object().shape({
        startAt: yup
          .date()
          .typeError('Please select a valid time')
          .required('Please select a valid time')
          .test({
            name: 'check-fragmentReleaseTimes',
            test: (input, context) => {
              if (moment(input) < moment()) {
                return context.createError({ message: 'Please select a time earlier than current time' })
              }
              return true
            }
          }),
        radio: yup.string().required('Must enter the release ratio')
      })
    )
  }),
  fragmentReleaseSize: yup.string().when('releaseType', {
    is: (val: any) => Number(val) === IReleaseType.Fragment,
    then: yup.string().test('TEST_FRAGMENT_TOTAL', 'Release ratio must add up to 100%', (_, context) => {
      const endTime = context.parent.endTime?.valueOf() || 0
      for (const item of context.parent.fragmentReleaseTimes) {
        if (endTime && item.startAt && (item.startAt?.valueOf() || 0) < endTime) {
          return context.createError({ message: 'Please select a time earlier than end time' })
        }
      }
      return (
        context.parent.fragmentReleaseTimes
          .map((item: { radio: string }) => item.radio)
          .reduce((a: any, b: any) => (Number(a) || 0) + (Number(b) || 0), [0]) === 100
      )
    })
  }),
  isRefundable: yup.boolean()
})
export const createLaunchpadSchema = yup.object({
  basic: basicSchema,
  pool: poolSchema
})
