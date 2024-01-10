import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import moment, { Moment } from 'moment'
import FormItem from 'bounceComponents/common/FormItem'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'
import { Stack, Button, OutlinedInput } from '@mui/material'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useWalletModalToggle } from 'state/application/hooks'
import { ChainId } from 'constants/chain'

interface MyFormValues {
  startTime: Moment | null
  endTime: Moment | null
  releaseTime: Moment | null
  duration: number
}

const SingleTokenPool = () => {
  const { account, chainId } = useActiveWeb3React()
  const switchNetwork = useSwitchNetwork()
  const toggleWalletModal = useWalletModalToggle()
  const _chainId = ChainId.SEPOLIA
  const initialValues: MyFormValues = {
    startTime: null,
    endTime: null,
    releaseTime: null,
    duration: 1
  }

  const validationSchema = Yup.object({
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
    releaseTime: Yup.date()
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('LATER_THAN_START_TIME', 'Please select a time later than end time', (value, context) => {
        return !context.parent.endTime.valueOf() || (value?.valueOf() || 0) >= context.parent.endTime.valueOf()
      }),
    duration: Yup.number().required('Duration is required')
  })

  const ActionBtn = useMemo(() => {
    if (!account) return <Button onClick={toggleWalletModal}>Connect Wallet</Button>
    if (chainId !== _chainId) return <Button onClick={() => switchNetwork(_chainId)}>Switch Network</Button>
    // if (approvalState !== ApprovalState.APPROVED) {
    //   if (approvalState === ApprovalState.PENDING) {
    //     return <Button disabled>Approving...</Button>
    //   }
    //   if (approvalState === ApprovalState.UNKNOWN) {
    //     return <Button disabled>Loading...</Button>
    //   }
    //   if (approvalState === ApprovalState.NOT_APPROVED) {
    //     return <Button onClick={approveCallback}>Approve</Button>
    //   }
    // }
    return <Button type="submit">submit</Button>
  }, [_chainId, account, chainId, switchNetwork, toggleWalletModal])
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async formValues => {
          console.log(formValues)
          // valuesDispatch({
          //   startTime: formValues.startTime,
          //   endTime: formValues.endTime
          // })
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Stack direction="column" sx={{ mt: 24, width: '100%' }} spacing={20}>
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
                  name="releaseTime"
                  disablePast
                  minDateTime={values.endTime}
                  onChange={(releaseTime: Moment) => {
                    setFieldValue('releaseTime', releaseTime)
                  }}
                />
              </Stack>
              <FormItem name={'duration'} label="Duration">
                <OutlinedInput placeholder={''} type="number" />
              </FormItem>
              {ActionBtn}
            </Form>
          )
        }}
      </Formik>
    </LocalizationProvider>
  )
}

export default SingleTokenPool
