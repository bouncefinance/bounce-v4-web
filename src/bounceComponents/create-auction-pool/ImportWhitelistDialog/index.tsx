import { muiDialogV5, useModal, create } from '@ebay/nice-modal-react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Button, OutlinedInput, Typography } from '@mui/material'
import FormItem from 'bounceComponents/common/FormItem'
import Dialog from 'bounceComponents/common/DialogBase'
import { isAddress } from 'utils'

interface FormValues {
  whitelist: string
}

const ImportWhitelistDialog = create<{ whitelist: string[] }>(({ whitelist }) => {
  console.log('>>>> initial whitelist: ', whitelist)

  const modal = useModal()

  const handleResolve = (whitelist: string) => {
    modal.resolve(whitelist ? whitelist.trim().split(/[\n,]/g) : [])
    modal.hide()
  }
  const handleReject = () => {
    modal.reject(new Error('Rejected'))
    modal.hide()
  }

  const validationSchema = Yup.object({
    whitelist: Yup.string().test(
      'VALID_ADDRESS_ARRAY',
      'Please make sure all addresses are valid',
      addressInput =>
        !addressInput ||
        addressInput
          .trim()
          .split(/[\n,]/g)
          .every(input => isAddress(input))
    )
    // .test(
    //   'NOT_GRATER_THAN_300_ADDRESSES',
    //   'Only allow addresses up to 300',
    //   addressInput => !addressInput || addressInput.split(/[\n,]/g).length <= 300
    // )
  })

  const initialValues: FormValues = {
    whitelist: whitelist.join('\n') || ''
  }

  return (
    <Dialog title="Import whitelist" {...muiDialogV5(modal)} onClose={handleReject}>
      <Typography variant="h4">Enter one address on each line. </Typography>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={values => {
          console.log('whitelist values: ', values)
          handleResolve(values.whitelist)
        }}
      >
        {({ errors }) => {
          console.log('errors: ', errors)
          return (
            <Form>
              <FormItem name="whitelist">
                <OutlinedInput
                  placeholder="Enter addresses"
                  sx={{ mt: 16, pt: '14px !important', pb: '20px !important' }}
                  minRows={4}
                  maxRows={14}
                  multiline
                  fullWidth
                />
                {/* <OutlinedInput /> */}
              </FormItem>

              <Button type="submit" variant="contained" fullWidth sx={{ mt: 32 }}>
                Save
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
})

export default ImportWhitelistDialog
