import * as yup from 'yup'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { AllocationStatus, IReleaseType } from '../../../bounceComponents/create-auction-pool/types'
import { isAddress } from 'utils'
import { ParticipantStatus } from './type'
export const basicSchema = yup.object({
  banner: yup.string().required('Please upload your banner'),
  projectLogo: yup.string().required('Please upload your project logo'),
  description: yup
    .string()
    .required('description is a required field')
    .min(100, 'Describe your project (100-500 words)')
    .max(500, 'Describe your project (100-500 words)'),
  tokennomics: yup.string(),
  website: yup.string().url().required('website is a required field'),
  whitepaperLink: yup.string().url().required('website is a required field'),
  projectName: yup.string().required('Project Name is a required field').max(30, 'Within 30 characters'),
  roadmap: yup.string(),
  chainId: yup.number().required('chainId is a required field'),
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
export const poolSchema = yup.object({
  name: yup.string(),
  TokenLogo: yup.string(),
  TokenName: yup.string().max(10, 'Within 10 characters'),
  projectMobilePicture: yup.string().required('Please upload your project mobile picture'),
  projectPicture: yup.string().required('Please upload your project picture'),
  ChainId: yup.number(),
  ContractAddress: yup
    .string()
    .test('address', 'Please enter the correct contract address!', val => (!val ? true : !!isAddress(val))),
  ContractDecimalPlaces: yup.number(),
  AuctionType: yup.string(),
  Token: yup.object({
    tokenToAddress: yup.string(),
    tokenToSymbol: yup.string(),
    tokenToLogoURI: yup.string(),
    tokenToDecimals: yup.string()
  }),
  SwapRatio: yup
    .number()
    .positive('Swap ratio must be positive')
    .typeError('Please input valid number')
    .test('DIGITS_LESS_THAN_6', 'Should be no more than 6 digits after point', value => {
      const _value = new BigNumber(value || 0).toFixed()
      return !_value || !String(_value).includes('.') || String(_value).split('.')[1]?.length <= 6
    }),
  TotalSupply: yup.number().positive('Total Supply must be positive'),
  startTime: yup
    .date()
    .nullable()
    // .min(new Date(new Date().toDateString()), 'Please select a time earlier than current time')
    .min(moment(), 'Please select a time earlier than current time')
    .typeError('Please select a valid time')
    .test('EARLIER_THAN_END_TIME', 'Please select a time earlier than end time', (value: any, context: any) => {
      return !value
        ? true
        : !context.parent.endTime.valueOf() || (value?.valueOf() || 0) < context.parent.endTime.valueOf()
    }),
  endTime: yup
    .date()
    .nullable()
    .min(moment(), 'Please select a time earlier than current time')
    .typeError('Please select a valid time')
    .test('LATER_THAN_START_TIME', 'Please select a time later than start time', (value: any, context: any) => {
      return !value
        ? true
        : !context.parent.startTime.valueOf() || (value?.valueOf() || 0) > context.parent.startTime.valueOf()
    }),
  allocationStatus: yup.string().oneOf(Object.values(AllocationStatus)),
  allocationPerWallet: yup
    .number()
    .nullable()
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
            !context.parent.amountTotal0 ||
            (value || 0) <= context.parent.amountTotal0 * context.parent.SwapRatio
        )
    }),
  delayUnlockingTime: yup.date().nullable(true),
  linearUnlockingStartTime: yup
    .date()
    .nullable(true)
    .when('releaseType', {
      is: (val: any) => Number(val) === IReleaseType.Linear,
      then: yup
        .date()
        .nullable()
        .typeError('Please select a valid time')
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
          .nullable()
          .typeError('Please select a valid time')
          .test({
            name: 'check-fragmentReleaseTimes',
            test: (input, context) => {
              if (moment(input) < moment()) {
                return context.createError({ message: 'Please select a time earlier than current time' })
              }
              return true
            }
          }),
        radio: yup.string()
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
  isRefundable: yup.boolean(),
  whitelist: yup
    .array()
    .of(yup.string())
    .test(
      'NOT_EMPTY_ARRAY',
      'Whitelist is required',
      (inputArray, context) =>
        context.parent.participantStatus !== ParticipantStatus.Whitelist ||
        (inputArray instanceof Array && inputArray.length > 0)
    )
    .test('VALID_ADDRESS_ARRAY', 'Please make sure all addresses are valid', (inputArray, context) => {
      return (
        context.parent.participantStatus !== ParticipantStatus.Whitelist ||
        (inputArray instanceof Array && inputArray.every(input => isAddress(input)))
      )
    }),
  participantStatus: yup.string().oneOf(Object.values(ParticipantStatus), 'Invalid participant status')
})
export const poolStrictSchema = yup.object({
  TokenLogo: yup.string().required('Please upload your Token Logo'),
  TokenName: yup.string().required('Token Name is a required field'),
  projectMobilePicture: yup.string().required('Please upload your project mobile picture'),
  projectPicture: yup.string().required('Please upload your project picture'),
  ChainId: yup.number().required('ChainId is a required field'),
  ContractAddress: yup
    .string()
    .required('Contract Address is a required field')
    .test('address', 'Please enter the correct contract address!', val => !!isAddress(val)),
  ContractDecimalPlaces: yup.number().required('Contract Decimal Places is a required field'),
  AuctionType: yup.string().required(),
  Token: yup.object({
    address: yup.string().required(),
    symbol: yup.string().required('Funding Currency is a required field'),
    logoURI: yup.string(),
    decimals: yup.number().required()
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
      return (
        // context.parent.endTime &&
        !context.parent.endTime?.valueOf() || (value?.valueOf() || 0) < context.parent.endTime?.valueOf()
      )
    }),
  endTime: yup
    .date()
    .min(moment(), 'Please select a time earlier than current time')
    .typeError('Please select a valid time')
    .test('LATER_THAN_START_TIME', 'Please select a time later than start time', (value: any, context: any) => {
      return (
        context.parent.startTime &&
        (!context.parent.startTime.valueOf() || (value?.valueOf() || 0) > context.parent.startTime.valueOf())
      )
    }),
  allocationStatus: yup.string().oneOf(Object.values(AllocationStatus)),
  allocationPerWallet: yup
    .number()
    .transform(value => (Number.isNaN(value) ? null : value))
    .nullable()
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
            !context.parent.amountTotal0 ||
            !context.parent.SwapRatio ||
            (value || 0) <= context.parent.amountTotal0 * context.parent.SwapRatio
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
                !context.parent.linearUnlockingStartTime?.valueOf() ||
                (input?.valueOf() || 0) > context.parent.linearUnlockingStartTime?.valueOf()
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
