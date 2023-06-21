import { Box, Typography, Grid, styled } from '@mui/material'
import CloseIcon from 'assets/imgs/thirdPart/foundoDetail/x.svg'
import { useForm } from 'react-hook-form'
import { useIsSMDown } from 'themes/useTheme'
import { PlaceBidBtn } from './bidDialog'
const InputBox = styled(Box)(({ theme }) => ({
  height: '48px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  padding: '0 24px',
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
interface FormItem {
  key: string
  placeholder: string
  grid: number
  mobileGrid: number
  option?: any
}
const BidDialog = ({ handleClose, submitCallback }: { handleClose: () => void; submitCallback?: () => void }) => {
  const isSm = useIsSMDown()
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
    submitCallback && submitCallback()
  }
  const formConfig: FormItem[] = [
    {
      key: 'firstName',
      placeholder: 'First Name',
      grid: 12,
      mobileGrid: 12,
      option: { required: true }
    },
    {
      key: 'lastName',
      placeholder: 'Last Name',
      grid: 12,
      mobileGrid: 12,
      option: { required: true }
    },
    {
      key: 'email',
      placeholder: 'Email',
      grid: 6,
      mobileGrid: 12,
      option: { required: true }
    },
    {
      key: 'phone',
      placeholder: 'Phone Number',
      grid: 6,
      mobileGrid: 12,
      option: { required: true }
    },
    {
      key: 'address1',
      placeholder: 'Address line 1',
      grid: 12,
      mobileGrid: 12,
      option: { required: true }
    },
    {
      key: 'address2',
      placeholder: 'Address line 2 (optional)',
      grid: 12,
      mobileGrid: 12,
      option: { required: false }
    },
    {
      key: 'address3',
      placeholder: 'Address line 3 (optional)',
      grid: 12,
      mobileGrid: 12,
      option: { required: false }
    },
    {
      key: 'city',
      placeholder: 'Town/City',
      grid: 6,
      mobileGrid: 12,
      option: { required: true }
    },
    {
      key: 'region',
      placeholder: 'State/province/region',
      grid: 6,
      mobileGrid: 12,
      option: { required: true }
    },
    {
      key: 'country',
      placeholder: 'Country',
      grid: 6,
      mobileGrid: 12,
      option: { required: true }
    },
    {
      key: 'postcode',
      placeholder: 'Postcode/Zip',
      grid: 6,
      mobileGrid: 12,
      option: { required: true }
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
        onClick={() => {
          handleClose && handleClose()
        }}
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
              fontFamily: `'Public Sans'`,
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={'16px'} mb={isSm ? '40px' : '24px'}>
              {formConfig.map((item, index) => {
                return (
                  <Grid item xs={isSm ? item.mobileGrid : item.grid} key={index}>
                    <InputBox>
                      <input
                        type="text"
                        {...(register(item.key), item.option)}
                        className={'inputEl'}
                        placeholder={item.placeholder}
                      />
                    </InputBox>
                  </Grid>
                )
              })}
            </Grid>
            <PlaceBidBtn type="submit">Submit</PlaceBidBtn>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
export default BidDialog
