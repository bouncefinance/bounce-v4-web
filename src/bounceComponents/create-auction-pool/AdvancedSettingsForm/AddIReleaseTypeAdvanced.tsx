import { Formik, Form, Field } from 'formik'
import moment, { Moment } from 'moment'
import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { show } from '@ebay/nice-modal-react'
import * as Yup from 'yup'
import { ActionType, useValuesDispatch, useValuesState } from '../ValuesProvider'
import RadioGroupFormItem from '../RadioGroupFormItem'
import Radio from '../Radio'
import ImportWhitelistDialog from '../ImportWhitelistDialog'
import ImportWhitelistWithAmountDialog, { formatInput } from '../ImportWhitelistWithAmountDialog'
import { AuctionType, IReleaseData, IReleaseType, ParticipantStatus, PriceSegmentType } from '../types'
import DateTimePickerFormItem from '../DateTimePickerFormItem'
import FormItem from 'bounceComponents/common/FormItem'
import Tooltip from 'bounceComponents/common/Tooltip'
import { isAddress } from 'utils'
import { sortReleaseData } from 'hooks/useCreateFixedSwapPool'
import { useCallback, useState } from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import SwitchFormItem from '../SwitchFormItem'
import { useQueryParams } from 'hooks/useQueryParams'
import NumberInput from 'bounceComponents/common/NumberInput'

interface IFragmentReleaseTimes {
  startAt: Moment | null
  radio: string
  key?: number
}

interface MyFormValues {
  poolName: string
  startTime: Moment | null
  endTime: Moment | null
  delayUnlockingTime: moment.Moment | null
  linearUnlockingStartTime: moment.Moment | null
  linearUnlockingEndTime: moment.Moment | null
  fragmentReleaseTimes: IFragmentReleaseTimes[]
  releaseType: IReleaseType | 1000
  enableReverse: boolean
  releaseDataArr: IReleaseData[]
  whitelist: string[]
  segmentAmount: string | undefined
  participantStatus: ParticipantStatus
  fragmentReleaseSize?: string
  whitelistWithAmount?: string
}

const defaultFragmentRelease = {
  startAt: null,
  radio: ''
}

export const AddIReleaseTypeAdvanced = ({
  showInstantRelease = true,
  hideRefundable
}: {
  showInstantRelease?: boolean
  hideRefundable?: boolean
}) => {
  const valuesState = useValuesState()
  const valuesDispatch = useValuesDispatch()
  const { launchPad } = useQueryParams()
  const [showSwitchLaunchpad, setShowSwitchLaunchpad] = useState(!!launchPad)
  const resetEndTime = useCallback((startTime: Moment | null, endTime: Moment | null, stage: string | undefined) => {
    if (!startTime || !endTime || !stage) return moment(null)
    const duration = endTime.valueOf() - startTime.valueOf()
    const segment = Number(stage) * 1000
    const val = duration % segment
    let _integer = endTime.valueOf() - val
    if (val > 50000) {
      _integer = _integer + segment
    }
    return moment(_integer)
  }, [])

  const initialValues: MyFormValues = {
    poolName: valuesState.poolName,
    startTime: valuesState.startTime,
    endTime: valuesState.endTime,
    releaseType: valuesState.releaseType,
    delayUnlockingTime: valuesState.delayUnlockingTime,
    linearUnlockingStartTime: valuesState.releaseDataArr?.[0]?.startAt || null,
    linearUnlockingEndTime: valuesState.releaseDataArr?.[0]?.endAt || null,
    fragmentReleaseTimes: valuesState.releaseDataArr.length
      ? valuesState.releaseDataArr.map(item => ({
          startAt: item.startAt,
          radio: item.ratio || ''
        }))
      : [defaultFragmentRelease],
    releaseDataArr: valuesState.releaseDataArr,
    whitelist: valuesState.whitelist,
    segmentAmount: valuesState.segmentAmount,
    enableReverse: !!valuesState.enableReverse,
    participantStatus: valuesState.participantStatus,
    whitelistWithAmount: ''
  }

  const validationSchema = Yup.object({
    poolName: Yup.string().max(30, 'Pool name should be less than 30 characters').required('Pool name is required'),
    startTime: Yup.date()
      // .min(new Date(new Date().toDateString()), 'Please select a time earlier than current time')
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('EARLIER_THAN_END_TIME', 'Please select a time earlier than end time', (value, context) => {
        return !context.parent.endTime.valueOf() || (value?.valueOf() || 0) < context.parent.endTime.valueOf()
      }),
    endTime: Yup.date()
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('LATER_THAN_START_TIME', 'Please select a time later than start time', (value, context) => {
        return !context.parent.startTime.valueOf() || (value?.valueOf() || 0) > context.parent.startTime.valueOf()
      }),
    delayUnlockingTime: Yup.date()
      .nullable(true)
      .when('releaseType', {
        is: (val: any) => Number(val) === IReleaseType.Cliff,
        then: Yup.date()
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
    linearUnlockingStartTime: Yup.date()
      .nullable(true)
      .when('releaseType', {
        is: (val: any) => Number(val) === IReleaseType.Linear,
        then: Yup.date()
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
    linearUnlockingEndTime: Yup.date()
      .nullable(true)
      .when('releaseType', {
        is: (val: any) => Number(val) === IReleaseType.Linear,
        then: Yup.date()
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
    fragmentReleaseTimes: Yup.array().when('releaseType', {
      is: (val: any) => Number(val) === IReleaseType.Fragment,
      then: Yup.array().of(
        Yup.object().shape({
          startAt: Yup.date()
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
          radio: Yup.string().required('Must enter the release ratio')
        })
      )
    }),
    fragmentReleaseSize: Yup.string().when('releaseType', {
      is: (val: any) => Number(val) === IReleaseType.Fragment,
      then: Yup.string().test('TEST_FRAGMENT_TOTAL', 'Release ratio must add up to 100%', (_, context) => {
        const endTime = context.parent.endTime?.valueOf() || 0
        for (const item of context.parent.fragmentReleaseTimes) {
          if (Number(item.radio) === 0) {
            return context.createError({ message: 'Release ratio must more than 0' })
          }
          if (endTime && item.startAt && (item.startAt?.valueOf() || 0) < endTime) {
            return context.createError({ message: 'Please select a time later than end time' })
          }
        }
        return (
          context.parent.fragmentReleaseTimes
            .map((item: { radio: string }) => item.radio)
            .reduce((a: any, b: any) => (Number(a) || 0) + (Number(b) || 0), [0]) === 100
        )
      })
    }),
    whitelist: Yup.array()
      .of(Yup.string())
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
    whitelistWithAmount: Yup.string().test(
      'NOT_EMPTY_AMOUNT_ARRAY',
      'whitelistWithAmount is required',
      (inputValue, context) =>
        context.parent.participantStatus !== ParticipantStatus.WhitelistWithAmount ||
        formatInput(inputValue || '')[2].length > 0
    ),
    participantStatus: Yup.string().oneOf(Object.values(ParticipantStatus), 'Invalid participant status')
  })

  const showImportWhitelistDialog = (
    values: MyFormValues,
    setValues: (values: any, shouldValidate?: boolean) => void
  ) => {
    if (values.participantStatus === ParticipantStatus.Whitelist) {
      show(ImportWhitelistDialog, { whitelist: valuesState.whitelist })
        .then(whitelist => {
          console.log('ImportWhitelistDialog Resolved: ', whitelist)
          valuesDispatch({
            type: ActionType.SetWhitelist,
            payload: {
              whitelist
            }
          })
          setValues({
            ...values,
            whitelist
          })
        })
        .catch(err => {
          console.log('ImportWhitelistDialog Rejected: ', err)
        })
    } else if (values.participantStatus === ParticipantStatus.WhitelistWithAmount) {
      show(ImportWhitelistWithAmountDialog, { whitelistWithAmount: valuesState.whitelistWithAmount })
        .then(whitelistWithAmount => {
          console.log('ImportWhitelistDialog Resolved2222: ', whitelistWithAmount)
          valuesDispatch({
            type: ActionType.SetWhitelistWithAmount,
            payload: {
              whitelistWithAmount
            }
          })
          setValues({
            ...values,
            whitelistWithAmount
          })
        })
        .catch(err => {
          console.log('ImportWhitelistDialog Rejected: ', err)
        })
    }
  }

  return (
    // TODO: move LocalizationProvider to _app.tex
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Box sx={{ mt: 52, px: { xs: 16, md: 0 } }}>
        <Typography variant="h2">Advanced Settings</Typography>
        <Typography sx={{ color: 'var(--ps-gray-700)', mt: 5, mb: 42 }}>
          {valuesState.auctionType || 'Fixed Price Auction'}
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async formValues => {
            let releaseDataArr: IReleaseData[] = []
            if (Number(formValues.releaseType) === IReleaseType.Linear) {
              releaseDataArr = [
                { startAt: formValues.linearUnlockingStartTime, endAt: formValues.linearUnlockingEndTime }
              ]
            } else if (Number(formValues.releaseType) === IReleaseType.Fragment) {
              releaseDataArr = formValues.fragmentReleaseTimes.map(item => ({
                startAt: item.startAt,
                ratio: item.radio
              }))
              releaseDataArr = sortReleaseData(releaseDataArr)
            }

            valuesDispatch({
              type: ActionType.CommitAdvancedSettings,
              payload: {
                poolName: formValues.poolName,
                startTime: formValues.startTime,
                endTime: formValues.endTime,
                releaseType: Number(formValues.releaseType),
                releaseDataArr: releaseDataArr,
                delayUnlockingTime: formValues.delayUnlockingTime,
                whitelist: formValues.whitelist,
                enableReverse: formValues.enableReverse,
                participantStatus: formValues.participantStatus,
                shouldDelayUnlocking: Number(formValues.releaseType) === IReleaseType.Cliff ? true : false
              }
            })
          }}
        >
          {({ values, setValues, errors, setFieldValue }) => {
            return (
              <Form>
                <FormItem label="Pool name" name="poolName">
                  <OutlinedInput />
                </FormItem>

                <Stack direction="row" sx={{ mt: 24, width: '100%' }} spacing={20}>
                  <Field
                    component={DateTimePickerFormItem}
                    name="startTime"
                    disablePast
                    maxDateTime={values.endTime}
                    textField={{ sx: { flex: 1 } }}
                    onChange={(startTime: Moment) => {
                      setFieldValue('startTime', startTime)
                      if (
                        valuesState.auctionType === AuctionType.DUTCH_AUCTION &&
                        valuesState.priceSegmentType === PriceSegmentType.Staged &&
                        values.startTime &&
                        moment.isMoment(startTime) &&
                        values.endTime
                      ) {
                        const endTime = resetEndTime(startTime, valuesState.endTime, valuesState.segmentAmount)
                        setFieldValue('endTime', endTime)
                      }
                    }}
                  />

                  <Field
                    component={DateTimePickerFormItem}
                    name="endTime"
                    disablePast
                    minDateTime={values.startTime}
                    textField={{ sx: { flex: 1 } }}
                    onChange={(res: Moment) => {
                      let endTime = null
                      if (
                        valuesState.auctionType === AuctionType.DUTCH_AUCTION &&
                        valuesState.priceSegmentType === PriceSegmentType.Staged &&
                        values.startTime &&
                        valuesState.segmentAmount
                      ) {
                        endTime = resetEndTime(values.startTime, res, valuesState.segmentAmount)
                      } else endTime = res
                      setFieldValue('endTime', endTime)
                    }}
                  />
                </Stack>
                {valuesState.auctionType === AuctionType.DUTCH_AUCTION &&
                  valuesState.priceSegmentType === PriceSegmentType.Staged && (
                    <Typography sx={{ mt: 12, color: '#212121' }}>
                      <span style={{ opacity: 0.5 }}>
                        *After setting up staged mode, there is a difference between the block time and the current
                        actual time, ending time after correction is{' '}
                      </span>
                      <span style={{ fontWeight: 700, color: '#171717' }}>
                        {values?.endTime?.format('MMM D, YYYY HH:mm:ss') || ''}
                      </span>
                    </Typography>
                  )}
                <Box sx={{ mt: 38 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 20 }}>
                    <Stack direction="row" alignItems="center" spacing={8}>
                      <Typography variant="h3" sx={{ fontSize: 16 }}>
                        Unlocking Token Type
                      </Typography>

                      <Tooltip title="Implement an unlocking method that allows traders to claim tokens only after a specific time.">
                        <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                      </Tooltip>
                    </Stack>
                  </Box>

                  <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="releaseType">
                    {showInstantRelease && (
                      <FormControlLabel
                        value={IReleaseType.Instant}
                        control={<Radio disableRipple />}
                        label={<span>Instant</span>}
                      />
                    )}
                    <FormControlLabel
                      value={IReleaseType.Cliff}
                      control={<Radio disableRipple />}
                      label={
                        <Tooltip title="Set a date so traders can only claim tokens by that time.">
                          <span>Delay</span>
                        </Tooltip>
                      }
                    />
                    <FormControlLabel
                      value={IReleaseType.Linear}
                      control={<Radio disableRipple />}
                      label={
                        <Tooltip title="Set a start and end time to unlock tokens in a linear release method.">
                          <span>Linear</span>
                        </Tooltip>
                      }
                    />
                    <FormControlLabel
                      value={IReleaseType.Fragment}
                      control={<Radio disableRipple />}
                      label={
                        <Tooltip title="Set multiple time intervals and proportions for batch token releases">
                          <span>Staged</span>
                        </Tooltip>
                      }
                    />
                  </Field>

                  {Number(values.releaseType) === IReleaseType.Instant ? (
                    <LabelTitle>Participate in the auction to get tokens immediately</LabelTitle>
                  ) : Number(values.releaseType) === IReleaseType.Cliff ? (
                    <Stack spacing={6}>
                      <LabelTitle>Unlocking Start Time</LabelTitle>
                      <Field
                        component={DateTimePickerFormItem}
                        disablePast
                        name="delayUnlockingTime"
                        minDateTime={values.endTime}
                        textField={{ sx: { width: '100%' } }}
                      />
                    </Stack>
                  ) : Number(values.releaseType) === IReleaseType.Linear ? (
                    <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={15}>
                      <Stack spacing={6}>
                        <LabelTitle>Start Time</LabelTitle>
                        <Field
                          component={DateTimePickerFormItem}
                          disablePast
                          name="linearUnlockingStartTime"
                          minDateTime={values.endTime}
                          textField={{ sx: { width: '100%' } }}
                        />
                      </Stack>

                      <Stack spacing={6}>
                        <LabelTitle>End Time</LabelTitle>
                        <Field
                          component={DateTimePickerFormItem}
                          disablePast
                          name="linearUnlockingEndTime"
                          minDateTime={values.linearUnlockingStartTime}
                          textField={{ sx: { width: '100%' } }}
                        />
                      </Stack>
                    </Box>
                  ) : Number(values.releaseType) === IReleaseType.Fragment ? (
                    <SetFragmentReleaseTime
                      minDateTime={values.endTime}
                      errors={errors.fragmentReleaseTimes}
                      releaseTimes={values.fragmentReleaseTimes}
                      setFragmentReleaseTimes={(val: IFragmentReleaseTimes[]) =>
                        setFieldValue('fragmentReleaseTimes', val)
                      }
                    />
                  ) : (
                    <LabelTitle>No unlocking method is set; tokens can be claimed after the specified end.</LabelTitle>
                  )}

                  <FormHelperText error={!!errors.fragmentReleaseSize}>{errors.fragmentReleaseSize}</FormHelperText>
                </Box>

                {!hideRefundable && Number(values.releaseType) !== IReleaseType.Instant && (
                  <Box sx={{ mt: 38, mb: 34 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Stack direction="row" alignItems="center" spacing={8}>
                        <Typography variant="h3" sx={{ fontSize: 16 }}>
                          Refundable
                        </Typography>

                        <Tooltip
                          title={
                            <Typography>
                              Participants will have the option to regret their participation and get their fund back
                              through reverse transaction before the pool is{' '}
                              <span onDoubleClick={() => setShowSwitchLaunchpad(true)}>finished.</span>
                            </Typography>
                          }
                        >
                          <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                        </Tooltip>
                      </Stack>

                      {showSwitchLaunchpad && <Field component={SwitchFormItem} type="checkbox" name="enableReverse" />}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1">Auction will be refundable before the end time</Typography>

                      {values?.endTime ? (
                        <Box sx={{ borderRadius: 20, bgcolor: '#F5F5F5', color: '#908E96', px: 8, py: 4, ml: 6 }}>
                          Before {values.endTime.format('MMM D, YYYY hh:mm A')}
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                )}

                <Box sx={{ mt: 38, mb: 34 }}>
                  <Stack direction="row" alignItems="center" spacing={8}>
                    <Typography variant="h3" sx={{ fontSize: 16 }}>
                      Participant
                    </Typography>

                    <Tooltip title="Once activated, only traders you put in this whitelist can join your auction.">
                      <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                    </Tooltip>
                  </Stack>

                  <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="participantStatus">
                    <FormControlLabel
                      value={ParticipantStatus.Public}
                      control={<Radio disableRipple />}
                      label="Public"
                    />

                    <FormControlLabel
                      value={ParticipantStatus.Whitelist}
                      control={<Radio disableRipple />}
                      label="Whitelist"
                    />
                    <FormControlLabel
                      value={ParticipantStatus.WhitelistWithAmount}
                      control={<Radio disableRipple />}
                      label="whitelistWithAmount"
                    />
                  </Field>
                  <FormHelperText error={!!errors.participantStatus}>{errors.participantStatus}</FormHelperText>
                  <FormHelperText error={!!errors.whitelist}>{errors.whitelist}</FormHelperText>
                  <FormHelperText error={!!errors.whitelistWithAmount}>{errors.whitelistWithAmount}</FormHelperText>
                </Box>
                <Stack sx={{ flexDirection: { xs: 'column', md: 'row' } }} spacing={10} justifyContent="space-between">
                  <ButtonBase
                    sx={{ width: 'fit-content', textDecorationLine: 'underline', mr: 8 }}
                    disabled={values.participantStatus === ParticipantStatus.Public}
                    onClick={() => {
                      showImportWhitelistDialog(values, setValues)
                    }}
                  >
                    {values.participantStatus === ParticipantStatus.Whitelist && (
                      <Typography sx={{ color: 'var(--ps-gray-700)' }}>Import Whitelist</Typography>
                    )}
                    {values.participantStatus === ParticipantStatus.WhitelistWithAmount && (
                      <Typography sx={{ color: 'var(--ps-gray-700)' }}>Import Whitelist and Amount</Typography>
                    )}
                  </ButtonBase>
                  <Box>
                    <Button
                      variant="outlined"
                      sx={{ width: 140, marginRight: '15px' }}
                      onClick={() => {
                        history.back()
                      }}
                    >
                      Cancel
                    </Button>

                    <Button type="submit" variant="contained" sx={{ width: 140 }}>
                      Next
                    </Button>
                  </Box>
                </Stack>
              </Form>
            )
          }}
        </Formik>
      </Box>
    </LocalizationProvider>
  )
}

export default AddIReleaseTypeAdvanced

function SetFragmentReleaseTime({
  releaseTimes,
  minDateTime,
  errors,
  setFragmentReleaseTimes
}: {
  setFragmentReleaseTimes: (val: IFragmentReleaseTimes[]) => void
  minDateTime: Moment | null
  releaseTimes: IFragmentReleaseTimes[]
  errors?: any
}) {
  const setItemValue = useCallback(
    (idx: number, _key: keyof IFragmentReleaseTimes, val: any) => {
      const ret = [...releaseTimes]
      ret[idx] = {
        ...ret[idx],
        [_key]: val
      }
      setFragmentReleaseTimes(ret)
    },
    [releaseTimes, setFragmentReleaseTimes]
  )

  const addOne = useCallback(() => {
    if (releaseTimes.length <= 39) {
      setFragmentReleaseTimes([...releaseTimes, { ...defaultFragmentRelease, key: Math.random() }])
    }
  }, [releaseTimes, setFragmentReleaseTimes])

  const removeOne = useCallback(
    (idx: number) => {
      if (idx < releaseTimes.length) {
        const ret = [...releaseTimes]
        ret.splice(idx, 1)
        setFragmentReleaseTimes(ret)
      }
    },
    [releaseTimes, setFragmentReleaseTimes]
  )

  return (
    <Stack spacing={5}>
      <Box display="grid" gap={10} gridTemplateColumns="60fr 30fr 20px">
        <LabelTitle>Release start time</LabelTitle>
        <LabelTitle>Release ratio</LabelTitle>
        <ControlPointIcon onClick={addOne} sx={{ cursor: 'pointer' }} />
      </Box>
      {releaseTimes.map((item, idx) => (
        <Box key={item.key || idx}>
          <Box>
            <Box display="grid" gap={10} gridTemplateColumns="60fr 30fr 20px">
              <Field
                component={DateTimePickerFormItem}
                disablePast
                name={`startAt[${item.key || idx}]`}
                value={item.startAt}
                onChange={(e: any) => {
                  setItemValue(idx, 'startAt', e)
                }}
                minDateTime={minDateTime}
                textField={{ sx: { width: '100%' } }}
              />
              <FormItem label="radio">
                <NumberInput
                  value={item.radio}
                  onBlur={() => {
                    setItemValue(idx, 'radio', Number(item.radio).toFixed(2))
                  }}
                  onUserInput={value => {
                    setItemValue(idx, 'radio', value.toString())

                    // if (val > 100) {
                    //   setItemValue(idx, 'radio', '100')
                    // } else if (val < 0.01) {
                    //   setItemValue(idx, 'radio', '')
                    // } else {
                    //   setItemValue(idx, 'radio', val)
                    // }
                  }}
                  endAdornment={<>%</>}
                />
              </FormItem>

              <RemoveCircleOutlineIcon
                sx={{ opacity: idx > 0 ? 1 : 0.5, cursor: 'pointer', alignSelf: 'center' }}
                onClick={() => idx > 0 && removeOne(idx)}
              />
            </Box>
            <Box display="grid" gap={10} gridTemplateColumns="60fr 30fr 20px">
              <FormHelperText error={!!errors?.length}>
                {typeof errors !== 'string' && errors?.[idx]?.startAt}
              </FormHelperText>
              <FormHelperText error={!!errors?.length}>
                {typeof errors !== 'string' && errors?.[idx]?.radio}
              </FormHelperText>
              <div />
            </Box>
          </Box>
        </Box>
      ))}
    </Stack>
  )
}

function LabelTitle({ children }: { children: any }) {
  return <FormLabel sx={{ fontWeight: 600, color: '#222223', mt: 10 }}>{children}</FormLabel>
}
