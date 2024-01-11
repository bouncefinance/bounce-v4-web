import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import moment, { Moment } from 'moment'
import FormItem from 'bounceComponents/common/FormItem'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'
import { STAKE_TOKEN_WITH_TIME_WEIGHT_CONTRACT_ADDRESSES } from 'constants/index'
import { Stack, Button, Box } from '@mui/material'
import { useActiveWeb3React } from 'hooks'
import { useEffect, useMemo, useState } from 'react'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useWalletModalToggle } from 'state/application/hooks'
import { ChainId } from 'constants/chain'
import { Currency } from 'constants/token'
import { CurrencyAmount } from 'constants/token'
import TokenInput from './components/tokenInput'
import NumberInput from 'bounceComponents/common/NumberInput'
import { useStakeTokenWithTimeWeightContract } from 'hooks/useContract'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { ApprovalState } from 'hooks/useApproveCallback'

interface MyFormValues {
  token0: string
  token0Quantity: string
  token1: string
  token1Quantity: string
  startTime: Moment | null
  endTime: Moment | null
  releaseTime: Moment | null
  duration: string
}

const SingleTokenPool = () => {
  const { account, chainId } = useActiveWeb3React()
  const [token0Currency, setToken0Currency] = useState<Currency>()
  const [token0Amount, setToken0Amount] = useState('')
  const [token0Raw, setToken0Raw] = useState('')
  const [token1Currency, setToken1Currency] = useState<Currency>()
  const [token1Amount, setToken1Amount] = useState('')
  const [token1Raw, setToken1Raw] = useState('')
  const [currencyAmount0, setCurrencyAmount0] = useState<CurrencyAmount | undefined>()
  const switchNetwork = useSwitchNetwork()
  const toggleWalletModal = useWalletModalToggle()
  const _chainId = ChainId.SEPOLIA
  const contract = useStakeTokenWithTimeWeightContract(_chainId)

  const [approvalState, approveCallback] = useApproveCallback(
    currencyAmount0,
    STAKE_TOKEN_WITH_TIME_WEIGHT_CONTRACT_ADDRESSES[_chainId]
  )
  useEffect(() => {
    if (token0Currency && token0Amount) {
      const currencyAmount = CurrencyAmount.fromAmount(token0Currency, token0Amount)
      setCurrencyAmount0(currencyAmount)
      if (currencyAmount) {
        setToken0Raw(currencyAmount.raw.toString())
      }
    } else {
      setCurrencyAmount0(undefined)
    }
  }, [token0Currency, token0Amount])
  useEffect(() => {
    if (token1Currency && token1Amount) {
      const currencyAmount = CurrencyAmount.fromAmount(token1Currency, token1Amount)
      if (currencyAmount) {
        setToken1Raw(currencyAmount.raw.toString())
      }
    }
  }, [token1Currency, token1Amount])

  const initialValues: MyFormValues = {
    token0: '',
    token1: '',
    token0Quantity: '',
    token1Quantity: '',
    startTime: null,
    endTime: null,
    releaseTime: null,
    duration: ''
  }

  const validationSchema = Yup.object({
    token0Quantity: Yup.number().required('Token0 amount is required'),
    token1Quantity: Yup.number().required('Token1 amount is required'),
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
    if (!account)
      return (
        <Button
          onClick={toggleWalletModal}
          sx={{ backgroundColor: 'rgba(225,242,92,1)', '&:hover': { backgroundColor: 'rgba(225,242,92,0.7)' } }}
        >
          Connect Wallet
        </Button>
      )
    if (chainId !== _chainId)
      return (
        <Button
          onClick={() => switchNetwork(_chainId)}
          sx={{ backgroundColor: 'rgba(225,242,92,1)', '&:hover': { backgroundColor: 'rgba(225,242,92,0.7)' } }}
        >
          Switch Network
        </Button>
      )

    if (approvalState !== ApprovalState.APPROVED) {
      if (approvalState === ApprovalState.PENDING) {
        return <Button disabled>Approving...</Button>
      }
      if (approvalState === ApprovalState.UNKNOWN) {
        return <Button disabled>Fill in token0 and quantity</Button>
      }
      if (approvalState === ApprovalState.NOT_APPROVED) {
        return (
          <Button
            onClick={approveCallback}
            sx={{ backgroundColor: 'rgba(225,242,92,1)', '&:hover': { backgroundColor: 'rgba(225,242,92,0.7)' } }}
          >
            Approve
          </Button>
        )
      }
    }
    return (
      <Button
        type="submit"
        sx={{ backgroundColor: 'rgba(225,242,92,1)', '&:hover': { backgroundColor: 'rgba(225,242,92,0.7)' } }}
      >
        submit
      </Button>
    )
  }, [_chainId, account, approvalState, approveCallback, chainId, switchNetwork, toggleWalletModal])

  const createPool = async (params: any) => {
    await contract?.create(params)
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 50 }}>
      <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (formValues: MyFormValues) => {
            const result = [
              formValues.token0,
              formValues.token1,
              token0Raw,
              token1Raw,
              moment(formValues.startTime).valueOf() / 1000,
              moment(formValues.endTime).valueOf() / 1000,
              moment(formValues.releaseTime).valueOf() / 1000,
              Number(formValues.duration)
            ]
            createPool(result)
          }}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <Box display={'flex'} flexDirection={'column'} gap={20}>
                  <TokenInput
                    name={'token0'}
                    label="Token0 Address"
                    setCurrency={value => {
                      setToken0Currency(value)
                    }}
                  />
                  <FormItem
                    name={'token0Quantity'}
                    label="Token0 Quantity"
                    onChange={(e: any) => {
                      setToken0Amount(e.target.value)
                    }}
                  >
                    <NumberInput
                      value={values.token0Quantity}
                      onUserInput={(value: string) => {
                        setFieldValue('token0Quantity', value)
                      }}
                    />
                  </FormItem>
                  <TokenInput
                    name={'token1'}
                    label="Token1 Address"
                    comparisonName={'token0'}
                    setCurrency={value => {
                      setToken1Currency(value)
                    }}
                  />
                  <FormItem
                    name={'token1Quantity'}
                    label="Token1 Quantity"
                    onChange={(e: any) => {
                      setToken1Amount(e.target.value)
                    }}
                  >
                    <NumberInput
                      value={values.token1Quantity}
                      onUserInput={(value: string) => {
                        setFieldValue('token1Quantity', value)
                      }}
                    />
                  </FormItem>
                  <Stack direction="column" width={'100%'} spacing={20}>
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
                        setFieldValue('releaseTime', endTime)
                        setFieldValue('duration', '1')
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
                    <NumberInput
                      value={values.duration}
                      onUserInput={(value: string) => {
                        setFieldValue('duration', value.replace(/[^\d]|^[0]/g, ''))
                      }}
                    />
                  </FormItem>
                  {ActionBtn}
                </Box>
              </Form>
            )
          }}
        </Formik>
      </LocalizationProvider>
    </Box>
  )
}

export default SingleTokenPool
