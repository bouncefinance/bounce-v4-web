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
import { ParticipantStatus } from '../types'
import DateTimePickerFormItem from '../DateTimePickerFormItem'
import SwitchFormItem from '../SwitchFormItem'
import FormItem from 'bounceComponents/common/FormItem'
import Tooltip from 'bounceComponents/common/Tooltip'
import { isAddress } from 'utils'
// import { ChainId } from 'constants/chain'
import { useMemo } from 'react'
import { useQueryParams } from 'hooks/useQueryParams'
import useBreakpoint from 'hooks/useBreakpoint'
import NumberInput from 'bounceComponents/common/NumberInput'

interface MyFormValues {
  poolName: string
  startTime: Moment | null
  closeHour: string | undefined
  closeMinute: string | undefined
  delayUnlockingHour: string | undefined
  delayUnlockingMinute: string | undefined
  shouldDelayUnlocking: boolean
  creatorRatio: string
  prevBidderRatio: string
  lastBidderRatio: string
  enableReverse: boolean
  whitelist: string[]
  participantStatus: ParticipantStatus
}

export const MutantEnglishSettingsForm = ({
  hideDelayUnlocking,
  hideRefundable
}: {
  hideDelayUnlocking?: boolean
  hideRefundable?: boolean
}) => {
  const valuesState = useValuesState()
  const valuesDispatch = useValuesDispatch()
  // const auctionInChain = useAuctionInChain()
  const { launchPad } = useQueryParams()
  const isLaunchPad = useMemo(() => !!launchPad, [launchPad])
  const isSm = useBreakpoint('sm')
  const initialValues: MyFormValues = {
    poolName: valuesState.poolName,
    startTime: valuesState.startTime,
    closeHour: valuesState.closeHour,
    closeMinute: valuesState.closeMinute,
    delayUnlockingHour: valuesState.delayUnlockingHour,
    delayUnlockingMinute: valuesState.delayUnlockingMinute,
    shouldDelayUnlocking: valuesState.shouldDelayUnlocking,
    creatorRatio: valuesState.creatorRatio || '',
    prevBidderRatio: valuesState.prevBidderRatio || '',
    lastBidderRatio: valuesState.lastBidderRatio || '',
    enableReverse: !!valuesState.enableReverse,
    whitelist: valuesState.whitelist,
    participantStatus: valuesState.participantStatus
  }

  const validationSchema = Yup.object({
    poolName: Yup.string().max(30, 'Pool name should be less than 30 characters').required('Pool name is required'),
    startTime: Yup.date()
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time'),
    closeHour: Yup.string()
      .nullable(true)
      .matches(/^\d+$/, 'Invalid time')
      .test('LATER_THAN_START_TIME_AND_END_TIME', 'Please enter close time', (value, context) => {
        return context.parent.closeMinute || value
      }),
    closeMinute: Yup.string()
      .nullable(true)
      .matches(/^\d+$/, 'Invalid time')
      .test('LATER_THAN_START_TIME_AND_END_TIME', 'Please enter close time', (value, context) => {
        return context.parent.closeHour || value
      }),
    delayUnlockingHour: Yup.string().nullable(true).matches(/^\d+$/, 'Invalid time'),
    delayUnlockingMinute: Yup.string().nullable(true).matches(/^\d+$/, 'Invalid time'),
    creatorRatio: Yup.string(),
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
    participantStatus: Yup.string().oneOf(Object.values(ParticipantStatus), 'Invalid participant status')
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
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Box sx={{ mt: 52, px: isSm ? 16 : 0 }}>
        <Typography variant="h2">Advanced Settings</Typography>
        <Typography sx={{ color: 'var(--ps-gray-700)', mt: 5, mb: 42 }}>Mutant English Auction</Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async formValues => {
            valuesDispatch({
              type: ActionType.CommitAdvancedSettings,
              payload: {
                poolName: formValues.poolName,
                startTime: formValues.startTime,
                closeHour: formValues.closeHour,
                closeMinute: formValues.closeMinute,
                shouldDelayUnlocking: formValues.shouldDelayUnlocking,
                delayUnlockingHour: formValues.delayUnlockingHour,
                delayUnlockingMinute: formValues.delayUnlockingMinute,
                creatorRatio: formValues.creatorRatio,
                prevBidderRatio: formValues.prevBidderRatio,
                lastBidderRatio: formValues.lastBidderRatio,
                enableReverse: formValues.enableReverse,
                whitelist: formValues.whitelist,
                participantStatus: formValues.participantStatus
              }
            })
          }}
        >
          {({ values, setFieldValue, setValues, errors }) => {
            console.log('>>>> third form values: ', values)
            return (
              <Form>
                <FormItem label="Pool name" name="poolName">
                  <OutlinedInput />
                </FormItem>
                <Stack direction="row" sx={{ mt: 24, width: '100%' }} spacing={20}>
                  <Box width={'100%'}>
                    <Typography variant="h3" sx={{ fontSize: 16, mb: 10 }}>
                      Start Time
                    </Typography>
                    <Field
                      component={DateTimePickerFormItem}
                      name="startTime"
                      disablePast
                      textField={{ sx: { width: '100%' } }}
                    />
                  </Box>
                </Stack>

                {/* delay close time */}

                <Box mt={38}>
                  <Typography variant="h3" sx={{ fontSize: 16, mb: 10 }}>
                    Delay Closing Time
                  </Typography>
                  <Stack direction="row" sx={{ mt: 24, width: '100%' }} spacing={20}>
                    <FormItem name="closeHour" placeholder="0" sx={{ flex: 1 }}>
                      <NumberInput
                        placeholder="0"
                        value={values.closeHour}
                        onUserInput={value => {
                          setFieldValue('closeHour', value)
                        }}
                        endAdornment={
                          <>
                            <Typography sx={{ mr: 8 }}>Hours</Typography>
                          </>
                        }
                      />
                    </FormItem>
                    <FormItem name="closeMinute" placeholder="0" sx={{ flex: 1 }}>
                      <NumberInput
                        placeholder="0"
                        value={values.closeMinute}
                        onUserInput={value => {
                          setFieldValue('closeMinute', value)
                        }}
                        endAdornment={
                          <>
                            <Typography sx={{ mr: 8 }}>Minutes</Typography>
                          </>
                        }
                      />
                    </FormItem>
                  </Stack>
                </Box>

                {!hideDelayUnlocking && (
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

                    <Stack direction="row" sx={{ mt: 24, width: '100%' }} spacing={20}>
                      <FormItem name="delayUnlockingHour" placeholder="0" sx={{ flex: 1 }}>
                        <NumberInput
                          disabled={!values.shouldDelayUnlocking}
                          placeholder="0"
                          value={values.delayUnlockingHour}
                          onUserInput={value => {
                            setFieldValue('delayUnlockingHour', value)
                          }}
                          endAdornment={
                            <>
                              <Typography sx={{ mr: 8 }}>Hours</Typography>
                            </>
                          }
                        />
                      </FormItem>
                      <FormItem name="delayUnlockingMinute" placeholder="0" sx={{ flex: 1 }}>
                        <NumberInput
                          disabled={!values.shouldDelayUnlocking}
                          placeholder="0"
                          value={values.delayUnlockingMinute}
                          onUserInput={value => {
                            setFieldValue('delayUnlockingMinute', value)
                          }}
                          endAdornment={
                            <>
                              <Typography sx={{ mr: 8 }}>Minutes</Typography>
                            </>
                          }
                        />
                      </FormItem>
                    </Stack>
                  </Box>
                )}
                <Stack sx={{ mt: 24, width: '100%' }} spacing={20}>
                  <Stack width={'100%'} direction={'row'} alignItems={'center'} spacing={8}>
                    <Stack direction="row" alignItems="center" spacing={8}>
                      <Typography variant="h3" sx={{ fontSize: 16, width: 317 }}>
                        Creator distribution ratio =
                      </Typography>
                    </Stack>
                    <FormItem name="creatorRatio" required placeholder="0" sx={{ flex: 1, mt: 24 }}>
                      <NumberInput
                        placeholder="0"
                        value={values.creatorRatio}
                        onUserInput={value => {
                          setFieldValue('creatorRatio', value)
                        }}
                        endAdornment={
                          <>
                            <Typography sx={{ mr: 8 }}>%</Typography>
                          </>
                        }
                      />
                    </FormItem>
                  </Stack>
                  <Stack width={'100%'} direction={'row'} alignItems={'center'} spacing={8}>
                    <Typography variant="h3" sx={{ fontSize: 16, width: 317 }}>
                      Previous bidder distribution ratio =
                    </Typography>
                    <FormItem name="prevBidderRatio" required placeholder="0" sx={{ flex: 1, mt: 24 }}>
                      <NumberInput
                        placeholder="0"
                        value={values.prevBidderRatio}
                        onUserInput={value => {
                          setFieldValue('prevBidderRatio', value)
                        }}
                        endAdornment={
                          <>
                            <Typography sx={{ mr: 8 }}>%</Typography>
                          </>
                        }
                      />
                    </FormItem>
                  </Stack>
                  <Stack width={'100%'} direction={'row'} alignItems={'center'} spacing={8}>
                    <Typography variant="h3" sx={{ fontSize: 16, width: 317 }}>
                      Last bidder distribution ratio =
                    </Typography>
                    <FormItem name="lastBidderRatio" required placeholder="0" sx={{ flex: 1 }}>
                      <NumberInput
                        placeholder="0"
                        value={values.lastBidderRatio}
                        onUserInput={value => {
                          setFieldValue('lastBidderRatio', value)
                        }}
                        endAdornment={
                          <>
                            <Typography sx={{ mr: 8 }}>%</Typography>
                          </>
                        }
                      />
                    </FormItem>
                  </Stack>
                </Stack>
                {!hideRefundable && (
                  <Box sx={{ mt: 38, mb: 34 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Stack direction="row" alignItems="center" spacing={8} sx={{ mt: 40, mb: 20 }}>
                        <Typography variant="h3" sx={{ fontSize: 16 }}>
                          Refundable
                        </Typography>

                        <Tooltip title="Participants will have the option to regret their participation and get their fund back through reverse transaction before the pool is finished.">
                          <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                        </Tooltip>
                      </Stack>

                      {isLaunchPad && <Field component={SwitchFormItem} type="checkbox" name="enableReverse" />}
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
                  </Field>
                  <FormHelperText error={!!errors.participantStatus}>{errors.participantStatus}</FormHelperText>
                  <FormHelperText error={!!errors.whitelist}>{errors.whitelist}</FormHelperText>
                </Box>
                <Stack direction={isSm ? 'column' : 'row'} spacing={isSm ? 20 : 10} justifyContent="space-between">
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

export default MutantEnglishSettingsForm
