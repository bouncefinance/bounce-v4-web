import { Formik, Form, Field } from 'formik'
import moment, { Moment } from 'moment'
import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  FormHelperText,
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
import { AuctionType, IReleaseData, IReleaseType, ParticipantStatus, PriceSegmentType } from '../types'
import DateTimePickerFormItem from '../DateTimePickerFormItem'
import FormItem from 'bounceComponents/common/FormItem'
import Tooltip from 'bounceComponents/common/Tooltip'
import { isAddress } from 'utils'
import NumberInput from 'bounceComponents/common/NumberInput'

interface MyFormValues {
  poolName: string
  startTime: Moment | null
  endTime: Moment | null
  delayUnlockingTime: moment.Moment | null
  releaseType: IReleaseType | 1000
  releaseDataArr: IReleaseData[]
  whitelist: string[]
  participantStatus: ParticipantStatus
  winnerNumber: number
  maxParticipantAllowed: number
}
// const useValuesDispatch = () => {
//   const context = useContext(ValuesDispatchContext)
//   if (!context) {
//     throw new Error('useValuesDispatch must be used within ValuesDispatchContext')
//   }
//   return context
// }

export const AddLpReleaseTypeAdvanced = () => {
  const valuesState = useValuesState()
  const valuesDispatch = useValuesDispatch()

  const initialValues: MyFormValues = {
    poolName: valuesState.poolName,
    startTime: valuesState.startTime,
    endTime: valuesState.endTime,
    releaseType: valuesState.releaseType,
    delayUnlockingTime: valuesState.delayUnlockingTime,
    releaseDataArr: valuesState.releaseDataArr,
    whitelist: valuesState.whitelist,
    participantStatus: valuesState.participantStatus,
    winnerNumber: valuesState.winnerNumber || 1,
    maxParticipantAllowed: valuesState.maxParticipantAllowed || 1
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
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('LATER_THAN_START_TIME', 'Please select a time later than endTime time', (value, context) => {
        return !context.parent.endTime.valueOf() || (value?.valueOf() || 0) >= context.parent.endTime.valueOf()
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
    participantStatus: Yup.string().oneOf(Object.values(ParticipantStatus), 'Invalid participant status'),
    maxParticipantAllowed: Yup.number()
      .required('MaxParticipantAllowed is required')
      .test('Number_TO_ZERO', 'MaxParticipantAllowed must be more than 0', value => {
        return value !== 0
      }),
    winnerNumber: Yup.number()
      .required('WinnerNumber is required')
      .test('Number_TO_ZERO', 'WinnerNumber must be more than 0', value => {
        return value !== 0
      })
  })

  const showImportWhitelistDialog = (
    values: MyFormValues,
    setValues: (values: any, shouldValidate?: boolean) => void
  ) => {
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
            console.log(formValues)

            const releaseDataArr: IReleaseData[] = []
            valuesDispatch({
              type: ActionType.CommitLpAdvancedSettings,
              payload: {
                poolName: formValues.poolName,
                startTime: formValues.startTime,
                endTime: formValues.endTime,
                releaseType: Number(formValues.releaseType),
                releaseDataArr: releaseDataArr,
                delayUnlockingTime: formValues.delayUnlockingTime,
                whitelist: formValues.whitelist,
                participantStatus: formValues.participantStatus,
                winnerNumber: formValues.winnerNumber,
                maxParticipantAllowed: formValues.maxParticipantAllowed
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
                <Stack direction="column" sx={{ mt: 24, width: '100%' }} spacing={24}>
                  <Field
                    component={DateTimePickerFormItem}
                    name="startTime"
                    disablePast
                    maxDateTime={values.endTime}
                    onChange={(startTime: Moment) => {
                      setFieldValue('startTime', startTime)
                    }}
                  />

                  <Field
                    component={DateTimePickerFormItem}
                    name="endTime"
                    disablePast
                    minDateTime={values.startTime}
                    onChange={(endTime: Moment) => {
                      setFieldValue('endTime', endTime)
                    }}
                  />
                  <Field
                    component={DateTimePickerFormItem}
                    name="delayUnlockingTime"
                    disablePast
                    minDateTime={values.endTime}
                    onChange={(delayUnlockingTime: Moment) => {
                      setFieldValue('delayUnlockingTime', delayUnlockingTime)
                    }}
                  />
                </Stack>
                <FormItem name={'maxParticipantAllowed'} label="Max Participant Allowed" sx={{ mt: 24 }}>
                  <NumberInput
                    value={values.maxParticipantAllowed.toString()}
                    onUserInput={(value: string) => {
                      setFieldValue('maxParticipantAllowed', Number(value.replace(/[^\d]|^[0]/g, '')))
                    }}
                  />
                </FormItem>
                <FormItem name={'winnerNumber'} label="Number Of Winners" sx={{ mt: 24 }}>
                  <NumberInput
                    value={values.winnerNumber.toString()}
                    onUserInput={(value: string) => {
                      setFieldValue('winnerNumber', Number(value.replace(/[^\d]|^[0]/g, '')))
                    }}
                  />
                </FormItem>
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
                  </Field>
                  <FormHelperText error={!!errors.participantStatus}>{errors.participantStatus}</FormHelperText>
                  <FormHelperText error={!!errors.whitelist}>{errors.whitelist}</FormHelperText>
                </Box>
                <Stack sx={{ flexDirection: { xs: 'column', md: 'row' } }} spacing={10} justifyContent="space-between">
                  <ButtonBase
                    sx={{ width: 'fit-content', textDecorationLine: 'underline', mr: 8 }}
                    disabled={values.participantStatus !== ParticipantStatus.Whitelist}
                    onClick={() => {
                      showImportWhitelistDialog(values, setValues)
                    }}
                  >
                    {values.participantStatus === ParticipantStatus.Whitelist && (
                      <Typography sx={{ color: 'var(--ps-gray-700)' }}>Import Whitelist</Typography>
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

export default AddLpReleaseTypeAdvanced
