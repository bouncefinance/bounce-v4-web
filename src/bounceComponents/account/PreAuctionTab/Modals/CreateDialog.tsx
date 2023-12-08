import { muiDialogV5, useModal, create } from '@ebay/nice-modal-react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button, OutlinedInput, Stack, Typography } from '@mui/material'
import FormItem from 'bounceComponents/common/FormItem'
import Dialog from 'bounceComponents/common/DialogBase'
import { isAddress } from 'utils'

interface FormValues {
  whitelist: string
}

const CreateWhitelistDialog = create<{ whitelist: string[] }>(({ whitelist }) => {
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
    whitelist: Yup.string()
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
  })

  const initialValues: FormValues = {
    whitelist: whitelist.join('\n') || ''
  }

  return (
    <Dialog
      title=" "
      titleStyle={{ padding: '20px 20px 20px 102px' }}
      contentStyle={{ width: '716px', padding: '0 40px 40px !important' }}
      {...muiDialogV5(modal)}
      onClose={handleReject}
    >
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={values => {
          handleResolve(values.whitelist)
        }}
      >
        {({ errors }) => {
          console.log('errors: ', errors)
          return (
            <Form>
              <Typography width={'100%'} textAlign={'center'} color={'#121212'} fontSize={28} fontWeight={600}>
                Create Whitelist
              </Typography>
              <Stack>
                <Typography color={'#20201E'} fontSize={20} fontWeight={600}>
                  Whitelist Name
                </Typography>
                <FormItem name="name">
                  <OutlinedInput
                    placeholder="Name of token,eg. Bitcoin"
                    sx={{ mt: 16, pt: '14px !important', pb: '20px !important' }}
                    fullWidth
                  />
                </FormItem>
              </Stack>
              <Stack>
                <Typography color={'#20201E'} fontSize={20} fontWeight={600}>
                  Detail
                </Typography>
                <FormItem name="detail">
                  <OutlinedInput
                    placeholder="Name of token,eg. Bitcoin"
                    sx={{ mt: 16, pt: '14px !important', pb: '20px !important' }}
                    fullWidth
                  />
                </FormItem>
              </Stack>
              <FormItem name="address">
                <OutlinedInput
                  placeholder="Enter addresses"
                  sx={{ mt: 16, pt: '14px !important', pb: '20px !important' }}
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={10}
                />
              </FormItem>
              <Stack>
                <Typography color={'#20201E'} fontSize={20} fontWeight={600}>
                  File
                </Typography>
                <FormItem name="file">
                  <OutlinedInput
                    placeholder="Name of token,eg. Bitcoin"
                    sx={{ mt: 16, pt: '14px !important', pb: '20px !important' }}
                    fullWidth
                  />
                </FormItem>
              </Stack>
              <Stack>
                <Typography color={'#20201E'} fontSize={20} fontWeight={600}>
                  Total Addresses
                </Typography>
                <Typography color={'#20201E'} fontSize={20} fontWeight={600}>
                  -
                </Typography>
              </Stack>
              <Stack
                mt={20}
                sx={{
                  '& button': {
                    width: '100%'
                  }
                }}
                direction="row"
                alignItems={'center'}
                justifyContent="space-between"
                spacing={10}
              >
                <Button variant="outlined" onClick={handleReject}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Confirm
                </Button>
              </Stack>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
})

export default CreateWhitelistDialog
