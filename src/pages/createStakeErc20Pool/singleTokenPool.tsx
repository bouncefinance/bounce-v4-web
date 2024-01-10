import { Box } from '@mui/material'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import moment, { Moment } from 'moment'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'

interface MyFormValues {
  openAt: Moment | null
  closeAt: Moment | null
  releaseAt: Moment | null
}

const SingleTokenPool = () => {
  const initialValues: MyFormValues = {
    openAt: null,
    closeAt: null,
    releaseAt: null
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
    releaseAt: Yup.date()
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('LATER_THAN_START_TIME', 'Please select a time later than start time', (value, context) => {
        return !context.parent.endTime.valueOf() || (value?.valueOf() || 0) > context.parent.endTime.valueOf()
      })
  })
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async formValues => {
          console.log(formValues)
          // valuesDispatch({
          //   openAt: formValues.openAt,
          //   closeAt: formValues.closeAt
          // })
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Field
                component={DateTimePickerFormItem}
                name="openAt"
                disablePast
                maxDateTime={values.closeAt}
                textField={{ sx: { flex: 1 } }}
                onChange={(openAt: Moment) => {
                  setFieldValue('openAt', openAt)
                }}
              />

              <Field
                component={DateTimePickerFormItem}
                name="closeAt"
                disablePast
                minDateTime={values.openAt}
                textField={{ sx: { flex: 1 } }}
                onChange={(closeAt: Moment) => {
                  setFieldValue('closeAt', closeAt)
                }}
              />

              <Field
                component={DateTimePickerFormItem}
                name="releaseAt"
                disablePast
                minDateTime={values.closeAt}
                textField={{ sx: { flex: 1 } }}
                onChange={(releaseAt: Moment) => {
                  setFieldValue('releaseAt', releaseAt)
                }}
              />
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default SingleTokenPool
