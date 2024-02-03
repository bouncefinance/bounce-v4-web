import { muiDialogV5, useModal, create } from '@ebay/nice-modal-react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Button, OutlinedInput, Typography } from '@mui/material'
import FormItem from 'bounceComponents/common/FormItem'
import Dialog from 'bounceComponents/common/DialogBase'
import { isAddress } from 'utils'

interface FormValues {
  whitelistWithAmount: string
}
const regular = /([a-zA-Z0-9]+)\s*:\s*(\d+)\s*,?/g
const ImportWhitelistWithAmountDialog = create<{ whitelistWithAmount: string[] }>(({ whitelistWithAmount }) => {
  const keyValuePairs = []
  for (let i = 0; i < whitelistWithAmount.length; i += 2) {
    const key = whitelistWithAmount[i]
    const value = whitelistWithAmount[i + 1]
    keyValuePairs.push(`${key}:${value}`)
  }

  const modal = useModal()

  const handleResolve = (whitelistWithAmount: string) => {
    modal.resolve(whitelistWithAmount ? whitelistWithAmount.split(regular).filter(Boolean) : [])
    modal.hide()
  }
  const handleReject = () => {
    modal.reject(new Error('Rejected'))
    modal.hide()
  }

  const validationSchema = Yup.object({
    whitelistWithAmount: Yup.string()
      .test(
        'VALID_FORMAT',
        'Please enter the correct format, such as address: amount',
        addressInput => !addressInput || regular.test(addressInput.trim())
      )
      .test(
        'VALID_ADDRESS_ARRAY',
        'Please make sure all addresses are valid',
        addressInput =>
          !addressInput ||
          addressInput
            .trim()
            .split(/[\n,]/g)
            .every(input => isAddress(input))
      )
      .test({
        name: 'DIFFERENT_ADDRESSES',
        test: (addressInput, ctx) => {
          if (!addressInput) return true
          const ads = addressInput.split(/[\n,]/g)
          for (const item of ads) {
            if (ads.filter(i => item.toLowerCase() === i.toLowerCase()).length > 1) {
              return ctx.createError({ message: `Address Repeat: ${item}` })
            }
          }
          return true
        }
      })
    // .test(
    //   'NOT_GRATER_THAN_300_ADDRESSES',
    //   'Only allow addresses up to 300',
    //   addressInput => !addressInput || addressInput.split(/[\n,]/g).length <= 300
    // )
  })
  console.log('validationSchema', validationSchema)

  const initialValues: FormValues = {
    whitelistWithAmount: keyValuePairs.join(',')
  }

  return (
    <Dialog title="Import whitelist with amount" {...muiDialogV5(modal)} onClose={handleReject}>
      <Typography variant="h4" sx={{ fontSize: { xs: 14, md: 16 } }}>
        Enter one address and amount per line.{' '}
      </Typography>
      <Formik
        // validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={values => {
          handleResolve(values.whitelistWithAmount)
        }}
      >
        {({ errors }) => {
          console.log('errors: ', errors)
          return (
            <Form>
              <FormItem name="whitelistWithAmount">
                <OutlinedInput
                  placeholder="Enter addresses: amount,"
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

export default ImportWhitelistWithAmountDialog
