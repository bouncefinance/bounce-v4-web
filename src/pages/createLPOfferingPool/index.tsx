import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import * as Yup from 'yup'
import { Formik, Form, Field, FormikErrors } from 'formik'
import moment, { Moment } from 'moment'
import FormItem from 'bounceComponents/common/FormItem'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'
import { STAKE_TOKEN_WITH_TIME_WEIGHT_CONTRACT_ADDRESSES } from 'constants/index'
import { Stack, Button, Box, OutlinedInput } from '@mui/material'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useEffect, useState } from 'react'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useWalletModalToggle } from 'state/application/hooks'
import { ChainId } from 'constants/chain'
import { Currency } from 'constants/token'
import { CurrencyAmount } from 'constants/token'
import TokenInput from './components/tokenInput'
import NumberInput from 'bounceComponents/common/NumberInput'
import { useRandomSelectionLPContract } from 'hooks/useContract'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { ApprovalState } from 'hooks/useApproveCallback'
import { useTransactionModalWrapper } from 'hooks/useTransactionModalWrapper'
import { NULL_BYTES } from 'constants/index'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import { getWhitelistMerkleTreeRoot, getPoolBurningCreationSignature } from 'api/pool'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'

interface MyFormValues {
  name: string
  token0: string
  token1: string
  amount1PerWallet: string
  openAt: Moment | null
  closeAt: Moment | null
  claimAt: Moment | null
  maxPlayer: string
  nShare: string
  whitelistRoot: string
}
const initialValues: MyFormValues = {
  name: '',
  token0: '',
  token1: '',
  amount1PerWallet: '',
  openAt: null,
  closeAt: null,
  claimAt: null,
  maxPlayer: '',
  nShare: '',
  whitelistRoot: ''
}

const SingleTokenPool = () => {
  const { account, chainId } = useActiveWeb3React()
  const [token1Currency, setToken1Currency] = useState<Currency>()
  const [token1Amount, setToken1Amount] = useState('')
  const [token1Raw, setToken1Raw] = useState('')
  const [currencyAmount1, setCurrencyAmount1] = useState<CurrencyAmount | undefined>()
  const switchNetwork = useSwitchNetwork()
  const toggleWalletModal = useWalletModalToggle()
  const _chainId = ChainId.SEPOLIA
  const contract = useRandomSelectionLPContract(undefined, _chainId)
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', _chainId || 5)

  const [approvalState, approveCallback] = useApproveCallback(
    currencyAmount1,
    STAKE_TOKEN_WITH_TIME_WEIGHT_CONTRACT_ADDRESSES[_chainId]
  )
  const approveCallbackFn = useTransactionModalWrapper(approveCallback as any)
  useEffect(() => {
    if (token1Currency && token1Amount) {
      const currencyAmount = CurrencyAmount.fromAmount(token1Currency, token1Amount)
      setCurrencyAmount1(currencyAmount)
      if (currencyAmount) {
        setToken1Raw(currencyAmount.raw.toString())
      }
    }
  }, [token1Currency, token1Amount])

  const validationSchema = Yup.object({
    amount1PerWallet: Yup.number()
      .required('Token1 quantity is required')
      .test('EQUAL_TO_ZERO', 'Quantity must be more than 0', value => {
        return value !== 0
      }),
    openAt: Yup.date()
      // .min(new Date(new Date().toDateString()), 'Please select a time earlier than current time')
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('EARLIER_THAN_END_TIME', 'Please select a time earlier than end time', (value, context) => {
        return !context.parent.closeAt.valueOf() || (value?.valueOf() || 0) < context.parent.closeAt.valueOf()
      }),
    closeAt: Yup.date()
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('LATER_THAN_START_TIME', 'Please select a time later than start time', (value, context) => {
        return !context.parent.openAt.valueOf() || (value?.valueOf() || 0) > context.parent.openAt.valueOf()
      }),
    claimAt: Yup.date()
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('LATER_THAN_START_TIME', 'Please select a time later than end time', (value, context) => {
        return !context.parent.closeAt.valueOf() || (value?.valueOf() || 0) >= context.parent.closeAt.valueOf()
      }),
    maxPlayer: Yup.number().required('MaxPlayer is required'),
    nShare: Yup.number().required('NShare is required')
  })

  const ActionBtn = useCallback(
    ({ errors }: { errors: FormikErrors<MyFormValues> }) => {
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

      if (Object.keys(errors).length) {
        return (
          <Button
            disabled
            sx={{ backgroundColor: 'rgba(225,242,92,1)', '&:hover': { backgroundColor: 'rgba(225,242,92,0.7)' } }}
          >
            Incorrect input
          </Button>
        )
      }
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
              onClick={approveCallbackFn}
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
    },
    [_chainId, account, approvalState, approveCallbackFn, chainId, switchNetwork, toggleWalletModal]
  )

  const createPool = async (formValues: MyFormValues) => {
    console.log(formValues)
    if (!formValues) {
      return Promise.reject('no data')
    }
    if (!account) {
      return Promise.reject('no account')
    }
    if (!contract) {
      return Promise.reject('no contract')
    }
    if (!chainConfigInBackend) {
      return Promise.reject('no chainConfigInBackend')
    }
    let merkleroot = ''

    if (formValues.whitelistRoot && formValues.whitelistRoot.split(',').length > 0) {
      const whitelistParams: GetWhitelistMerkleTreeRootParams = {
        addresses: formValues.whitelistRoot.split(','),
        category: PoolType.LOTTERY_BURNING,
        chainId: chainConfigInBackend.id
      }
      const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
      merkleroot = data.merkleroot
    }
    merkleroot = merkleroot || NULL_BYTES
    const signatureParams = {
      amountMin1: '',
      amountTotal0: '0',
      // amountTotal1: token1Raw,
      category: 11,
      chainId: chainConfigInBackend.id,
      claimAt: moment(formValues.claimAt).valueOf() / 1000,
      closeAt: moment(formValues.closeAt).valueOf() / 1000,
      creator: account,
      maxAmount1PerWallet: token1Raw,
      merkleroot: '',
      maxPlayer: Number(formValues.maxPlayer),
      name: formValues.name,
      openAt: moment(formValues.openAt).valueOf() / 1000,
      token0: formValues.token0,
      token1: formValues.token1,
      totalShare: Number(formValues.nShare),
      releaseType: IReleaseType.Cliff,
      releaseData: [
        {
          startAt: moment(formValues.openAt).valueOf() / 1000,
          endAtOrRatio: 0
        }
      ]
    }
    const {
      data: { id, expiredTime, signature }
    } = await getPoolBurningCreationSignature(signatureParams)
    formValues.amount1PerWallet = token1Raw
    const result = {
      name: formValues.name,
      token0: formValues.token0,
      token1: formValues.token1,
      amount1PerWallet: token1Raw,
      openAt: moment(formValues.openAt).valueOf() / 1000,
      closeAt: moment(formValues.closeAt).valueOf() / 1000,
      claimAt: moment(formValues.claimAt).valueOf() / 1000,
      maxPlayer: Number(formValues.maxPlayer),
      nShare: Number(formValues.nShare),
      whitelistRoot: merkleroot
    }
    console.log('formValues', result)
    const _body = { ...result }
    const arg = [id, _body, false, expiredTime, signature]
    try {
      console.log('pool id', id, arg)
      const data = await contract.createV2(...arg)
      localStorage.setItem('LP_OFFERING_POOL_ID', JSON.stringify(id))
      console.log(data)
      return data
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  const createPoolFn = useTransactionModalWrapper(createPool as any, {
    successTipsText: 'You have successfully claimed.'
  })
  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 50 }}>
      <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(formValues: MyFormValues) => {
            createPoolFn(formValues)
          }}
        >
          {({ values, setFieldValue, errors }) => {
            return (
              <Form>
                <Box display={'flex'} flexDirection={'column'} gap={20}>
                  <FormItem name={'name'} label="Pool name">
                    <OutlinedInput placeholder={''} />
                  </FormItem>
                  <TokenInput
                    name={'token0'}
                    label="Token0 Address"
                    setCurrency={value => {
                      console.log(value)
                    }}
                  />
                  <TokenInput
                    name={'token1'}
                    label="Token1 Address"
                    comparisonName={'token0'}
                    setCurrency={value => {
                      setToken1Currency(value)
                    }}
                  />
                  <FormItem
                    name={'amount1PerWallet'}
                    label="Token1 Quantity"
                    onChange={(e: any) => {
                      setToken1Amount(e.target.value)
                    }}
                  >
                    <NumberInput
                      value={values.amount1PerWallet}
                      onUserInput={(value: string) => {
                        setFieldValue('amount1PerWallet', value)
                      }}
                    />
                  </FormItem>
                  <Stack direction="column" width={'100%'} spacing={20}>
                    <Field
                      disabled={false}
                      component={DateTimePickerFormItem}
                      name="openAt"
                      disablePast
                      maxDateTime={values.closeAt}
                      onChange={(openAt: Moment) => {
                        setFieldValue('openAt', openAt)
                      }}
                    />
                    <Field
                      disabled={false}
                      component={DateTimePickerFormItem}
                      name="closeAt"
                      disablePast
                      minDateTime={values.openAt}
                      onChange={(closeAt: Moment) => {
                        setFieldValue('closeAt', closeAt)
                        setFieldValue('claimAt', closeAt)
                      }}
                    />
                    <Field
                      disabled={false}
                      component={DateTimePickerFormItem}
                      name="claimAt"
                      disablePast
                      minDateTime={values.closeAt}
                      onChange={(claimAt: Moment) => {
                        setFieldValue('claimAt', claimAt)
                      }}
                    />
                  </Stack>
                  <FormItem name={'maxPlayer'} label="Max Participant Allowed">
                    <NumberInput
                      value={values.maxPlayer}
                      onUserInput={(value: string) => {
                        setFieldValue('maxPlayer', value.replace(/[^\d]|^[0]/g, ''))
                      }}
                    />
                  </FormItem>
                  <FormItem name={'nShare'} label="Number Of Winners">
                    <NumberInput
                      value={values.nShare}
                      onUserInput={(value: string) => {
                        setFieldValue('nShare', value.replace(/[^\d]|^[0]/g, ''))
                      }}
                    />
                  </FormItem>
                  <FormItem name={'WhitelistRoot'} label="whitelistRoot">
                    <OutlinedInput placeholder={''} />
                  </FormItem>
                  <ActionBtn errors={errors} />
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
