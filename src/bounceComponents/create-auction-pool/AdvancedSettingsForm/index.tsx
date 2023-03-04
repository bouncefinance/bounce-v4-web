import React from 'react'
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
  Typography,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import { useRouter } from 'next/router'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { show } from '@ebay/nice-modal-react'
import * as Yup from 'yup'
import { ActionType, useValuesDispatch, useValuesState } from '../ValuesProvider'
import RadioGroupFormItem from '../RadioGroupFormItem'
import Radio from '../Radio'
import ImportWhitelistDialog from '../ImportWhitelistDialog'
import { ParticipantStatus } from '../types'
import DateTimePickerFormItem from '../DateTimePickerFormItem'
import SwitchFormItem from '../SwitchFormItem'
import FormItem from '@/components/common/FormItem'
import { isAddress } from '@/utils/web3/address'
import Tooltip from '@/components/common/Tooltip'

interface MyFormValues {
  poolName: string
  startTime: Moment | null
  endTime: Moment | null
  shouldDelayUnlocking: boolean
  delayUnlockingTime: Moment | null
  whitelist: string[]
  participantStatus: ParticipantStatus
}

export const DateRangePickerDemo = () => {
  const router = useRouter()

  const valuesState = useValuesState()
  const valuesDispatch = useValuesDispatch()

  const initialValues: MyFormValues = {
    poolName: valuesState.poolName,
    startTime: valuesState.startTime,
    endTime: valuesState.endTime,
    shouldDelayUnlocking: valuesState.shouldDelayUnlocking,
    delayUnlockingTime: valuesState.delayUnlockingTime,
    whitelist: valuesState.whitelist,
    participantStatus: valuesState.participantStatus,
  }

  const validationSchema = Yup.object({
    poolName: Yup.string().max(30, 'Pool name should be less than 30 characters').required('Pool name is required'),
    startTime: Yup.date()
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('EARLIER_THAN_END_TIME', 'Please select a time earlier than end time', (value, context) => {
        return !context.parent.endTime.valueOf() || value.valueOf() < context.parent.endTime.valueOf()
      }),
    endTime: Yup.date()
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('LATER_THAN_START_TIME', 'Please select a time later than start time', (value, context) => {
        return !context.parent.startTime.valueOf() || value.valueOf() > context.parent.startTime.valueOf()
      }),
    delayUnlockingTime: Yup.date()
      .nullable(true)
      .when('shouldDelayUnlocking', {
        is: true,
        then: Yup.date()
          .min(moment(), 'Please select a time earlier than current time')
          .typeError('Please select a valid time')
          .test(
            'LATER_THAN_START_TIME_AND_END_TIME',
            'Please select a time later than start time and end time',
            (value, context) => {
              return (
                !context.parent.endTime.valueOf() ||
                !context.parent.startTime.valueOf() ||
                (value.valueOf() > context.parent.startTime.valueOf() &&
                  value.valueOf() > context.parent.endTime.valueOf())
              )
            },
          ),
      }),
    whitelist: Yup.array()
      .of(Yup.string())
      .test(
        'NOT_EMPTY_ARRAY',
        'Whitelist is required',
        (inputArray, context) =>
          context.parent.participantStatus !== ParticipantStatus.Whitelist ||
          (inputArray instanceof Array && inputArray.length > 0),
      )
      .test('VALID_ADDRESS_ARRAY', 'Please make sure all addresses are valid', (inputArray, context) => {
        return (
          context.parent.participantStatus !== ParticipantStatus.Whitelist ||
          (inputArray instanceof Array && inputArray.every((input) => isAddress(input)))
        )
      }),
    participantStatus: Yup.string().oneOf(Object.values(ParticipantStatus), 'Invalid participant status'),
  })

  const showImportWhitelistDialog = (
    values: MyFormValues,
    setValues: (values: any, shouldValidate?: boolean) => void,
  ) => {
    show(ImportWhitelistDialog, { whitelist: valuesState.whitelist })
      .then((whitelist: string[]) => {
        console.log('ImportWhitelistDialog Resolved: ', whitelist)
        valuesDispatch({
          type: ActionType.SetWhitelist,
          payload: {
            whitelist,
          },
        })
        setValues({
          ...values,
          whitelist,
        })
      })
      .catch((err) => {
        console.log('ImportWhitelistDialog Rejected: ', err)
      })
  }

  return (
    // TODO: move LocalizationProvider to _app.tex
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Box sx={{ mt: 52 }}>
        <Typography variant="h2">Advanced Settings</Typography>
        <Typography sx={{ color: 'var(--ps-gray-700)', mt: 5, mb: 42 }}>Fixed Price Auction</Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (formValues) => {
            valuesDispatch({
              type: ActionType.CommitAdvancedSettings,
              payload: {
                poolName: formValues.poolName,
                startTime: formValues.startTime,
                endTime: formValues.endTime,
                shouldDelayUnlocking: formValues.shouldDelayUnlocking,
                delayUnlockingTime: formValues.delayUnlockingTime,
                whitelist: formValues.whitelist,
                participantStatus: formValues.participantStatus,
              },
            })
          }}
        >
          {({ values, setValues, errors }) => {
            // console.log('>>>> form errros: ', errors)
            console.log('>>>> third form values: ', values)
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
                  />
                  <Field
                    component={DateTimePickerFormItem}
                    name="endTime"
                    disablePast
                    minDateTime={values.startTime}
                    textField={{ sx: { flex: 1 } }}
                  />
                </Stack>

                <Box sx={{ mt: 38 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 20 }}>
                    <Stack direction="row" alignItems="center" spacing={8}>
                      <Typography variant="h3" sx={{ fontSize: 16 }}>
                        Delay Unlocking Token
                      </Typography>

                      <Tooltip title="Set a date so traders can only claim tokens by that time.">
                        <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                      </Tooltip>
                    </Stack>

                    <Field component={SwitchFormItem} type="checkbox" name="shouldDelayUnlocking" />
                  </Box>

                  {/* TODO: disable when switch is off */}
                  <Field
                    readOnly={!values.shouldDelayUnlocking}
                    component={DateTimePickerFormItem}
                    disablePast
                    name="delayUnlockingTime"
                    minDateTime={values.endTime}
                    textField={{ sx: { width: '100%' } }}
                  />
                </Box>

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

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 32 }}>
                    <ButtonBase
                      sx={{ width: 'fit-content', textDecorationLine: 'underline', mr: 8 }}
                      disabled={values.participantStatus !== ParticipantStatus.Whitelist}
                      onClick={() => {
                        showImportWhitelistDialog(values, setValues)
                      }}
                    >
                      <Typography sx={{ color: 'var(--ps-gray-700)' }}>Import Whitelist</Typography>
                    </ButtonBase>
                  </Box>

                  <FormHelperText error={!!errors.whitelist}>{errors.whitelist}</FormHelperText>
                </Box>

                {/* <p>{values.whitelist}</p> */}

                <Box sx={{ mt: 38, mb: 34 }}>
                  <Stack direction="row" alignItems="center" spacing={8} sx={{ mt: 40, mb: 20 }}>
                    <Typography variant="h3" sx={{ fontSize: 16 }}>
                      Refundable
                    </Typography>

                    <Tooltip title="Creators will be able to claim the swapped tokens and remaining tokens after the refundable period.">
                      <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                    </Tooltip>
                  </Stack>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">Auction will be refundable before the end time</Typography>

                    {values?.endTime ? (
                      <Box sx={{ borderRadius: 20, bgcolor: '#F5F5F5', color: '#908E96', px: 8, py: 4, ml: 6 }}>
                        Before {values.endTime.format('MMM D, YYYY hh:mm A')}
                      </Box>
                    ) : null}
                  </Box>
                </Box>

                <Stack direction="row" spacing={10} justifyContent="end">
                  <Button
                    variant="outlined"
                    sx={{ width: 140 }}
                    onClick={() => {
                      router.back()
                    }}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" variant="contained" sx={{ width: 140 }}>
                    Next
                  </Button>
                </Stack>
              </Form>
            )
          }}
        </Formik>
      </Box>
    </LocalizationProvider>
  )
}

export default DateRangePickerDemo
