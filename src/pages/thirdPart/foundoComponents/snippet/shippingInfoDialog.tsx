import { Box, Typography, Grid, styled, Input } from '@mui/material'
import CloseIcon from 'assets/imgs/thirdPart/foundoDetail/x.svg'
import { useIsSMDown } from 'themes/useTheme'
import { PlaceBidBtn } from './bidDialog'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormItem from 'bounceComponents/common/FormItem'
import { useCallback } from 'react'
import { poolWinnerInfoCommit } from 'api/fundo'
import { useSignMessage } from 'hooks/useWeb3Instance'
import { useActiveWeb3React } from 'hooks'
import { show } from '@ebay/nice-modal-react'
import DialogDarkTips from 'bounceComponents/common/DialogTips/DialogDarkTips'

const InputBox = styled(Input)(({ theme }) => ({
  height: '48px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  padding: '0 24px',
  color: '#fff',
  background: 'var(--ps-text-4)',
  borderRadius: '4px',
  '.inputEl': {
    background: 'none',
    outline: 'none',
    border: 'none',
    fontSize: 16,
    color: 'var(--ps-text-5)'
  },
  '.inputEl:focus': {
    border: 'none'
  },
  [theme.breakpoints.down('md')]: {
    '.inputEl': {
      fontSize: 14
    }
  }
}))

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  address1: string
  address2: string
  address3: string
  city: string
  region: string
  country: string
  postcode: string
}

const internalInitialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  address3: '',
  city: '',
  region: '',
  country: '',
  postcode: ''
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address1: Yup.string().required('Address line1 is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email().required('email is required')
})

interface FormItem {
  key: string
  placeholder: string
  grid: number
  mobileGrid: number
  option?: any
}
const BidDialog = ({ handleClose, submitCallback }: { handleClose: () => void; submitCallback?: () => void }) => {
  const isSm = useIsSMDown()
  const signMessage = useSignMessage()
  const { account } = useActiveWeb3React()

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (!account) return
      try {
        const message = 'Submit personal information'
        const signature = await signMessage(message)
        await poolWinnerInfoCommit({
          address: account,
          addressLine1: data.address1,
          addressLine2: data.address2,
          addressLine3: data.address3,
          city: data.city,
          country: data.country,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          PostCode: data.postcode,
          province: data.region,
          message,
          signature
        })
        handleClose && handleClose()
        submitCallback && submitCallback()
        show(DialogDarkTips, {
          iconType: 'success',
          againBtn: 'OK',
          title: 'Success',
          content: `You have successfully submit your shipping information.
          We will prepare your goods for you as soon as possible`
        })
      } catch (error) {}
    },
    [account, handleClose, signMessage, submitCallback]
  )

  const formConfig: FormItem[] = [
    {
      key: 'firstName',
      placeholder: 'First Name',
      grid: 12,
      mobileGrid: 12
    },
    {
      key: 'lastName',
      placeholder: 'Last Name',
      grid: 12,
      mobileGrid: 12
    },
    {
      key: 'email',
      placeholder: 'Email',
      grid: 6,
      mobileGrid: 12
    },
    {
      key: 'phone',
      placeholder: 'Phone Number',
      grid: 6,
      mobileGrid: 12
    },
    {
      key: 'address1',
      placeholder: 'Address line 1',
      grid: 12,
      mobileGrid: 12
    },
    {
      key: 'address2',
      placeholder: 'Address line 2 (optional)',
      grid: 12,
      mobileGrid: 12
    },
    {
      key: 'address3',
      placeholder: 'Address line 3 (optional)',
      grid: 12,
      mobileGrid: 12
    },
    {
      key: 'city',
      placeholder: 'Town/City',
      grid: 6,
      mobileGrid: 12
    },
    {
      key: 'region',
      placeholder: 'State/province/region',
      grid: 6,
      mobileGrid: 12
    },
    {
      key: 'country',
      placeholder: 'Country',
      grid: 6,
      mobileGrid: 12
    },
    {
      key: 'postcode',
      placeholder: 'Postcode/Zip',
      grid: 6,
      mobileGrid: 12
    }
  ]
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.7)'
        }}
        // onClick={() => {
        //   handleClose && handleClose()
        // }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          top: isSm ? '40px' : '50%',
          bottom: '40px',
          left: '50%',
          transform: isSm ? 'translate3D(-50%, 0, 0)' : 'translate3D(-50%, -50%, 0)',
          width: isSm ? 'calc(100% - 46px)' : '640px',
          minHeight: '540px',
          maxHeight: `calc(100vh - 80px)`,
          background: 'rgba(73, 73, 73, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(25px)',
          overflowY: 'auto',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '55px',
            padding: isSm ? '24px 24px 0' : '32px 48px 0'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontWeight: 700,
              fontSize: 18,
              color: '#fff',
              marginBottom: '40px'
            }}
          >
            shipping Information
          </Typography>
          <img
            src={CloseIcon}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              cursor: 'pointer'
            }}
            onClick={() => {
              handleClose && handleClose()
            }}
            alt=""
            srcSet=""
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            padding: isSm ? '24px' : '32px 48px 31px'
          }}
        >
          <Formik initialValues={internalInitialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <Grid container spacing={'16px'} mb={isSm ? '40px' : '24px'}>
                {formConfig.map((item, index) => {
                  return (
                    <Grid item xs={isSm ? item.mobileGrid : item.grid} key={index}>
                      <FormItem name={item.key}>
                        <InputBox type="text" placeholder={item.placeholder} />
                        {/* <input
                          type="text"
                          {...(register(item.key), item.option)}
                          className={'inputEl'}
                          placeholder={item.placeholder}
                        /> */}
                      </FormItem>
                    </Grid>
                  )
                })}
              </Grid>
              <PlaceBidBtn type="submit">Submit</PlaceBidBtn>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Box>
  )
}
export default BidDialog
