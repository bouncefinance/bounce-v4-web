import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import * as Yup from 'yup'
import { Formik, Field, FormikErrors } from 'formik'
import { Moment } from 'moment'
import FormItem from 'bounceComponents/common/FormItem'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'
import { Stack, Box, Button } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { Currency, CurrencyAmount } from 'constants/token'
import TokenInput from './components/tokenInput'
import NumberInput from 'bounceComponents/common/NumberInput'
import moment from 'moment'
import { useActiveWeb3React } from 'hooks'
import { useShowLoginModal } from 'state/users/hooks'
import _ from 'lodash'
import { useDebounceFn } from 'ahooks'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useTransactionModalWrapper } from 'hooks/useTransactionModalWrapper'
import { ChainId } from 'constants/chain'
import { STAKE_MULTI_TOKEN_CONTRACT_ADDRESSES } from 'constants/index'
import { useRandomSelectionMultiTokenContract } from 'hooks/useContract'

interface IParam {
  token0: string
  amountTotal0: string
  quoteAmountTotal1: string
  startTime: Moment | null
  endTime: Moment | null
  releaseTime: Moment | null
  releaseDuration: number
  token1s: string[]
  amount1s: string[]
}

const initParams: IParam = {
  token0: '0x5c58eC0b4A18aFB85f9D6B02FE3e6454f988436E',
  amountTotal0: '10',
  quoteAmountTotal1: '1000',
  startTime: null,
  endTime: null,
  releaseTime: null,
  releaseDuration: 1,
  token1s: [
    '0xc390E699b38F14dB884C635bbf843f7B135113ad',
    '0x21C3ac8c6E5079936A59fF01639c37F36CE5ed9E',
    '0xB5D1924aD11D90ED1caaCE7C8792E8B5F6171C7E',
    '0xe5260f95BCDe8E2727eaE13f6B17039E910c43F7',
    '0xb575400Da99E13e2d1a2B21115290Ae669e361f0'
  ],
  amount1s: ['500', '200', '1000', '10000', '50']
}

const validationSchema = Yup.object({
  amountTotal0: Yup.string()
    .required('amountTotal0 is required')
    .test('amountTotal0 gt 0', 'Please select a time earlier than end time', (value: any) => {
      return Number(value) > 0
    }),
  quoteAmountTotal1: Yup.string()
    .required('quoteAmountTotal1 is required')
    .test('quoteAmountTotal1 gt 0', 'Please select a time earlier than end time', (value: any) => {
      return Number(value) > 0
    }),
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
  releaseDuration: Yup.number()
    .required('releaseDuration is required')
    .test('releaseDuration gt 0', 'Please select a time earlier than end time', (value: any) => {
      return Number(value) > 0
    }),
  amount1s: Yup.array().test('amount1s gt 0', 'Please select a time earlier than end time', (value: any) => {
    return value.every((i: any) => Number(i) > 0)
  })
})
const MultipleTokenPools = () => {
  const [formValue, setFormValue] = useState<IParam>(initParams)
  const { account, chainId } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const [token0Currency, setToken0Currency] = useState<Currency | undefined>()
  const [token1Currencys, setToken1Currencys] = useState<(Currency | null)[]>([null, null, null, null, null])

  const quoteAmount = CurrencyAmount.fromAmount(Currency.getNativeCurrency(), formValue.quoteAmountTotal1)
  const token1CurrencyAomunts = useMemo(() => {
    if (token1Currencys.some(i => !i)) return undefined
    return token1Currencys.map((c, i) => CurrencyAmount.fromAmount(c as Currency, formValue.amount1s[i]))
  }, [formValue.amount1s, token1Currencys])

  const token1Aomunts = useMemo(() => {
    if (!token1CurrencyAomunts || token1CurrencyAomunts.some(i => !i)) return undefined

    return token1CurrencyAomunts.map(i => quoteAmount?.div(i as CurrencyAmount).raw.toString())
  }, [quoteAmount, token1CurrencyAomunts])
  const contractAddress = STAKE_MULTI_TOKEN_CONTRACT_ADDRESSES[chainId || ChainId.MAINNET]

  const token0Amount = useMemo(() => {
    if (!token0Currency || !Number(formValue.amountTotal0)) {
      return undefined
    }
    return CurrencyAmount.fromAmount(token0Currency, formValue.amountTotal0)
  }, [formValue.amountTotal0, token0Currency])

  const contract = useRandomSelectionMultiTokenContract(contractAddress, chainId || ChainId.MAINNET)
  const [approvalState, approveCallback] = useApproveCallback(token0Amount, contractAddress)
  const approveFn = useTransactionModalWrapper(approveCallback as any, { isApprove: true })
  const { run: debounceChangeValue } = useDebounceFn(
    (values: IParam, errors: FormikErrors<IParam>) => {
      console.log('debounceChangeValue')
      if (!Object.keys(errors).length && !_.eq(formValue, values)) {
        setFormValue(values)
      }
    },
    { wait: 500 }
  )
  const create = useCallback(async () => {
    if (!contract || !token0Amount || !quoteAmount || !token1Aomunts) {
      return
    }
    const openAt = formValue.startTime?.valueOf() || 0
    const closeAt = formValue.endTime?.valueOf() || 0
    const releaseAt = formValue.releaseTime?.valueOf() || 0
    const token1Adds = token1Currencys.map(i => i?.address)
    const params = [
      token0Amount.currency.address,
      token0Amount.raw.toString(),
      quoteAmount.raw.toString(),
      openAt,
      closeAt,
      releaseAt,
      formValue.releaseDuration,
      token1Adds,
      token1Aomunts
    ]
    console.log('params', params)

    await contract.create(params)
  }, [
    contract,
    formValue.endTime,
    formValue.releaseDuration,
    formValue.releaseTime,
    formValue.startTime,
    quoteAmount,
    token0Amount,
    token1Aomunts,
    token1Currencys
  ])
  const onSubmit = () => {
    create()
  }
  const ActionBtn = useCallback(
    ({ errors }: { errors: FormikErrors<IParam> }) => {
      if (!account) {
        return <Button onClick={showLoginModal}>Login</Button>
      }
      if (Object.keys(errors).length > 0) {
        return <Button disabled>Incorrect Input</Button>
      }

      if (approvalState === ApprovalState.PENDING) {
        return <Button disabled>Approval PENDING</Button>
      }
      if (approvalState !== ApprovalState.APPROVED) {
        return <Button onClick={approveFn}>Approve</Button>
      }

      return <Button type="submit">submit</Button>
    },
    [account, approvalState, approveFn, showLoginModal]
  )
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Formik initialValues={initParams} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ values, setFieldValue, handleSubmit, errors }) => {
          debounceChangeValue(values, errors)
          return (
            <Box
              component={'form'}
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                maxWidth: 1000,
                width: '100%',
                margin: '0 auto',
                mt: 50
              }}
            >
              <TokenInput name={'token0'} label="token0 address" setCurrency={v => setToken0Currency(v)} />

              <FormItem name={'amountTotal0'} label="total amount0 ">
                <NumberInput onUserInput={v => setFieldValue('amountTotal0', v)} />
              </FormItem>

              <FormItem name={'quoteAmountTotal1'} label="quoteAmountTotal1">
                <NumberInput onUserInput={v => setFieldValue('quoteAmountTotal1', v)} />
              </FormItem>

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

              <FormItem name={'releaseDuration'} label="releaseDuration">
                <NumberInput onUserInput={v => setFieldValue('releaseDuration', v)} />
              </FormItem>
              <>
                {values['token1s'].map((address, index) => (
                  <Stack flexDirection={'row'} gap={20} key={index}>
                    <Box width={'70%'}>
                      <TokenInput
                        name={`token1s[${index}]`}
                        label="token1s"
                        value={values['token1s'][index]}
                        setCurrency={v => {
                          if (
                            v &&
                            v.address.toLocaleLowerCase() !== token1Currencys[index]?.address.toLocaleLowerCase()
                          ) {
                            const newCurArr = [...token1Currencys]
                            newCurArr.splice(index, 1, v)
                            setToken1Currencys(newCurArr)
                            setFieldValue(`token1s[${index}]`, v.address)
                          }
                        }}
                      />
                    </Box>

                    <Box width={'30%'}>
                      <FormItem name={`amount1s[${index}]`} label="amount1s">
                        <NumberInput onUserInput={v => setFieldValue(`amount1s[${index}]`, v)} />
                      </FormItem>
                    </Box>
                  </Stack>
                ))}
                <Button
                  onClick={() => {
                    setFieldValue('token1s', [...values.token1s, ''])
                    setFieldValue('amount1s', [...values.amount1s, ''])
                  }}
                >
                  add
                </Button>
              </>

              <ActionBtn errors={errors} />
            </Box>
          )
        }}
      </Formik>
    </LocalizationProvider>
  )
}

export default MultipleTokenPools
