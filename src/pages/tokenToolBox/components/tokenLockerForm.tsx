import {
  Box,
  Stack,
  styled,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  OutlinedInput,
  FormControlLabel,
  FormLabel,
  Button
} from '@mui/material'
import RadioGroupFormItem from 'bounceComponents/create-auction-pool/RadioGroupFormItem'
import Radio from 'bounceComponents/create-auction-pool/Radio'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'
import Switch, { SwitchProps } from '@mui/material/Switch'
import FormItem from 'bounceComponents/common/FormItem'
import Image from 'components/Image'
import * as yup from 'yup'
import { Formik, Field, Form, FormikErrors } from 'formik'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { ChainId } from 'constants/chain'
import { useActiveWeb3React } from 'hooks'
import { ChainList } from 'constants/chain'
// import { useOptionDatas } from 'state/configOptions/hooks'
import { useShowLoginModal } from 'state/users/hooks'
import { ReactComponent as TipIcon } from 'assets/imgs/toolBox/tips.svg'
import Tooltip from 'bounceComponents/common/Tooltip'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import moment, { Moment } from 'moment'
import NumberInput from 'bounceComponents/common/NumberInput'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { LoadingButton } from '@mui/lab'
import {
  TOOL_BOX_LINEAR_TOKEN_LOCKER_CONTRACT_ADDRESSES,
  TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES
} from 'constants/index'
import { isAddress } from 'web3-utils'
import { useErc20TokenDetail } from 'bounceHooks/toolbox/useTokenLocakCallback'
import {
  useTokenTimelock,
  useApproveCallback,
  useTokenTimeStagelock,
  useTokenTimeLinearlock
} from 'hooks/useTokenTimelock'
import { TokenlockResponse } from 'bounceHooks/toolbox/useTokenLocakCallback'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from 'utils/auction'
import { CurrencyAmount } from 'constants/token'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useNavigate, useLocation } from 'react-router-dom'
import { ApprovalState } from 'hooks/useApproveCallback'
import BigNumber from 'bignumber.js'
import queryString from 'query-string'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
interface IFragmentReleaseTimes {
  startAt: Moment | null
  radio: string
  key?: number
}
const defaultFragmentRelease = {
  startAt: null,
  radio: ''
}
interface releaseItemParam {
  startAt: string
  radio: number | string
}
interface ISeller {
  tokenAddress: string
  anotherTokenAddress?: string
  anotherTokenChecked?: boolean
  chainId: ChainId
  tokanName: string
  tokenSymbol: string
  tokenDecimal: number
  balance: string
  title: string
  amount: string
  releaseType: IReleaseType
  delayUnlockingTime: Moment | null
  linearUnlockingStartTime: Moment | null
  linearUnlockingEndTime: Moment | null
  releaseDataArr: releaseItemParam[]
  fragmentReleaseTimes: IFragmentReleaseTimes[]
  segmentAmount?: string
  fragmentReleaseSize?: string
}
export const AddBtn = styled(Button)(() => ({
  height: 44,
  width: 137,
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#121212',
  color: '#fff',
  '.text': {
    fontFamily: `'Public Sans'`,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '24px',
    marginLeft: '8px'
  },
  '&:hover': {
    background: '#121212'
  }
}))
const sellerValidationSchema = yup.object({
  tokenAddress: yup
    .string()
    .required('Token Address is a required')
    .test('is-address', 'Please input a valid token address', function (value) {
      return isAddress(value || '')
    }),
  anotherTokenAddress: yup
    .string()
    .test('is-address', 'Please input a valid address', function (value) {
      const anotherTokenChecked = this.parent.anotherTokenChecked
      if (anotherTokenChecked && !isAddress(value || '')) {
        return false
      }
      return true
    })
    .test('is-another-token', 'Token Address is a required', function (value) {
      // 根据表单的当前内容进行自定义校验
      const anotherTokenChecked = this.parent.anotherTokenChecked
      if (anotherTokenChecked && !value) {
        return false
      }
      return true
    }),
  title: yup.string().required('Title is a required'),
  amount: yup.number().typeError('Please input valid number').required('Amount is a required'),
  delayUnlockingTime: yup
    .date()
    .nullable(true)
    .when('releaseType', {
      is: (val: any) => Number(val) === IReleaseType.Cliff,
      then: yup
        .date()
        .typeError('Please select a valid time')
        .required('Please select a valid time')
        .test({
          name: 'check-delayUnlockingTime',
          test: (input, context) => {
            if (moment(input) < moment()) {
              return context.createError({ message: 'Please select a time earlier than current time' })
            }
            return true
          }
        })
    }),
  linearUnlockingStartTime: yup
    .date()
    .nullable(true)
    .when('releaseType', {
      is: (val: any) => Number(val) === IReleaseType.Linear,
      then: yup
        .date()
        .typeError('Please select a valid time')
        .required('Please select a valid time')
        .test({
          name: 'check-linearUnlockingStartTime',
          test: (input, context) => {
            if (moment(input) < moment()) {
              return context.createError({ message: 'Please select a time earlier than current time' })
            }
            return true
          }
        })
    }),
  linearUnlockingEndTime: yup
    .date()
    .nullable(true)
    .when('releaseType', {
      is: (val: any) => Number(val) === IReleaseType.Linear,
      then: yup
        .date()
        .typeError('Please select a valid time')
        .required('Please select a valid time')
        .test({
          name: 'check-linearUnlockingEndTime',
          test: (input, context) => {
            if (moment(input) < moment()) {
              return context.createError({ message: 'Please select a time earlier than current time' })
            }
            if (
              !(
                !context.parent.linearUnlockingStartTime.valueOf() ||
                (input?.valueOf() || 0) > context.parent.linearUnlockingStartTime.valueOf()
              )
            ) {
              return context.createError({ message: 'Please select a time later than linear unlocking end time' })
            }
            return true
          }
        })
    }),
  fragmentReleaseTimes: yup.array().when('releaseType', {
    is: (val: any) => Number(val) === IReleaseType.Fragment,
    then: yup.array().of(
      yup.object().shape({
        startAt: yup
          .date()
          .typeError('Please select a valid time')
          .required('Please select a valid time')
          .test({
            name: 'check-fragmentReleaseTimes',
            test: (input, context) => {
              if (moment(input) < moment()) {
                return context.createError({ message: 'Please select a time earlier than current time' })
              }
              return true
            }
          }),
        radio: yup.string().required('Must enter the release ratio')
      })
    )
  }),
  fragmentReleaseSize: yup.string().when('releaseType', {
    is: (val: any) => Number(val) === IReleaseType.Fragment,
    then: yup.string().test('TEST_FRAGMENT_TOTAL', 'Release ratio must add up to 100%', (_, context) => {
      const endTime = context.parent.endTime?.valueOf() || 0
      for (const item of context.parent.fragmentReleaseTimes) {
        if (Number(item.radio) === 0) {
          return context.createError({ message: 'Release ratio must more than 0' })
        }
        if (endTime && item.startAt && (item.startAt?.valueOf() || 0) < endTime) {
          return context.createError({ message: 'Please select a time later than end time' })
        }
      }
      return (
        context.parent.fragmentReleaseTimes
          .map((item: { radio: string }) => item.radio)
          .reduce((a: any, b: any) => (Number(a) || 0) + (Number(b) || 0), [0]) === 100
      )
    })
  })
})
export const ToolBoxSelect = styled(Select)(() => ({
  border: '0',
  borderRadius: '8px',
  background: '#F6F6F3',
  '.MuiSelect-outlined': {
    border: '0',
    padding: '16px !important'
  },
  '&:hover': {
    border: '0',
    background: '#F6F6F3'
  },
  '&.Mui-focused': {
    border: '0',
    background: '#F6F6F3'
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: '0'
  }
}))
export const ToolBoxInput = styled(OutlinedInput)(() => ({
  background: '#F6F6F3',
  border: '0',
  fieldset: {
    border: '0'
  },
  '&:hover': {
    border: '0'
  }
}))
export const LineCom = styled(Box)(() => ({
  width: '100%',
  height: '1px',
  background: '#D4D6CF',
  margin: '24px 0'
}))
const RowTextInfo = ({ label, value, line = true }: { label: string; value: string; line?: boolean }) => {
  return (
    <Stack
      direction={'row'}
      flexWrap={'nowrap'}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{
        height: '52px',
        borderBottom: line ? '1px solid #E8E9E4' : 'unset'
      }}
    >
      <Typography
        sx={{
          color: '#959595',
          fontFamily: `'Inter'`,
          fontSize: '16px'
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: '#000',
          fontFamily: `'Inter'`,
          fontSize: '16px'
        }}
      >
        {value}
      </Typography>
    </Stack>
  )
}
function SetFragmentReleaseTime({
  releaseTimes,
  minDateTime,
  errors,
  sizeError,
  setFragmentReleaseTimes
}: {
  setFragmentReleaseTimes: (val: IFragmentReleaseTimes[]) => void
  minDateTime: Moment | null
  releaseTimes: IFragmentReleaseTimes[]
  errors?: any
  sizeError?: any
}) {
  const setItemValue = useCallback(
    (idx: number, _key: keyof IFragmentReleaseTimes, val: any) => {
      const ret = [...releaseTimes]
      ret[idx] = {
        ...ret[idx],
        [_key]: val
      }
      setFragmentReleaseTimes(ret)
    },
    [releaseTimes, setFragmentReleaseTimes]
  )

  const addOne = useCallback(() => {
    if (releaseTimes.length <= 29) {
      setFragmentReleaseTimes([...releaseTimes, { ...defaultFragmentRelease, key: Math.random() }])
    }
  }, [releaseTimes, setFragmentReleaseTimes])

  const removeOne = useCallback(
    (idx: number) => {
      if (idx < releaseTimes.length) {
        const ret = [...releaseTimes]
        ret.splice(idx, 1)
        setFragmentReleaseTimes(ret)
      }
    },
    [releaseTimes, setFragmentReleaseTimes]
  )

  return (
    <Stack spacing={5}>
      <Box display="grid" gap={10} gridTemplateColumns="60fr 30fr 20px">
        <LabelTitle>Release start time (UTC time)</LabelTitle>
        <LabelTitle>Release ratio</LabelTitle>
      </Box>
      {releaseTimes.map((item, idx) => (
        <Box key={item.key || idx}>
          <Box>
            <Box display="grid" gap={10} gridTemplateColumns="60fr 30fr 20px">
              <Field
                component={DateTimePickerFormItem}
                disablePast
                name={`startAt[${item.key || idx}]`}
                value={item.startAt}
                onChange={(e: any) => {
                  setItemValue(idx, 'startAt', e)
                }}
                minDateTime={minDateTime}
                textField={{ sx: { width: '100%' } }}
              />
              <FormItem label="radio">
                <NumberInput
                  value={item.radio}
                  onBlur={() => {
                    setItemValue(idx, 'radio', Number(item.radio).toFixed(2))
                  }}
                  onUserInput={value => {
                    setItemValue(idx, 'radio', value.toString())

                    // if (val > 100) {
                    //   setItemValue(idx, 'radio', '100')
                    // } else if (val < 0.01) {
                    //   setItemValue(idx, 'radio', '')
                    // } else {
                    //   setItemValue(idx, 'radio', val)
                    // }
                  }}
                  endAdornment={<>%</>}
                />
              </FormItem>

              <RemoveCircleOutlineIcon
                sx={{ opacity: idx > 0 ? 1 : 0.5, cursor: 'pointer', alignSelf: 'center' }}
                onClick={() => idx > 0 && removeOne(idx)}
              />
            </Box>
            <Box display="grid" gap={10} gridTemplateColumns="60fr 30fr 20px">
              <FormHelperText error={!!errors?.length}>
                {typeof errors !== 'string' && errors?.[idx]?.startAt}
              </FormHelperText>
              <FormHelperText error={!!errors?.length}>
                {typeof errors !== 'string' && errors?.[idx]?.radio}
              </FormHelperText>
            </Box>
          </Box>
        </Box>
      ))}
      <FormHelperText error={!!sizeError}>{sizeError}</FormHelperText>
      <AddBtn onClick={addOne}>
        <ControlPointIcon onClick={addOne} sx={{ cursor: 'pointer' }} />
        <Typography component={'span'} className={'text'}>
          Add Stage
        </Typography>
      </AddBtn>
    </Stack>
  )
}
function LabelTitle({ children }: { children: any }) {
  return <FormLabel sx={{ fontWeight: 600, color: '#222223', mt: 10 }}>{children}</FormLabel>
}
const BidBlock = ({
  formValues,
  erc20TokenDeatail,
  errors,
  handleSubmit
}: {
  formValues: ISeller
  erc20TokenDeatail: TokenlockResponse
  errors: FormikErrors<ISeller>
  handleSubmit: () => void
}) => {
  const { account } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const isNeedToApprove = useMemo(() => {
    return erc20TokenDeatail?.allowance && Number(formValues.amount) > Number(erc20TokenDeatail?.allowance?.toExact())
  }, [erc20TokenDeatail?.allowance, formValues.amount])
  const lockAmount = useMemo(() => {
    return erc20TokenDeatail?.tokenCurrency && formValues.amount
      ? CurrencyAmount.fromAmount(erc20TokenDeatail?.tokenCurrency, formValues.amount)
      : undefined
  }, [erc20TokenDeatail?.tokenCurrency, formValues.amount])
  const contractAddress = useMemo(() => {
    return Number(formValues.releaseType) === IReleaseType.Linear
      ? TOOL_BOX_LINEAR_TOKEN_LOCKER_CONTRACT_ADDRESSES[formValues.chainId]
      : TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES[formValues.chainId]
  }, [formValues.chainId, formValues.releaseType])
  const [approvalState, approveCallback] = useApproveCallback(lockAmount, contractAddress, true)
  const toApprove = useCallback(async () => {
    showRequestApprovalDialog()
    try {
      const { transactionReceipt } = await approveCallback()
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error(err)
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: typeof err === 'string' ? err : err?.error?.message || err?.message || 'Something went wrong',
        onAgain: toApprove
      })
    }
  }, [approveCallback])
  const approveBtn: {
    disabled?: boolean
    loading?: boolean
    text?: string
    run?: () => void
  } = useMemo(() => {
    if (!account) {
      return {
        text: 'Connect wallet',
        run: showLoginModal
      }
    }
    if (approvalState !== ApprovalState.APPROVED) {
      if (approvalState === ApprovalState.PENDING) {
        return {
          text: `Approving use of ${erc20TokenDeatail?.tokenCurrency?.symbol} ...`,
          loading: true
        }
      }
      if (approvalState === ApprovalState.UNKNOWN) {
        return {
          text: 'Loading...',
          loading: true
        }
      }
      if (approvalState === ApprovalState.NOT_APPROVED) {
        return {
          text: `Approve use of ${erc20TokenDeatail?.tokenCurrency?.symbol}`,
          run: toApprove
        }
      }
    }
    return {
      run: toApprove
    }
  }, [account, approvalState, toApprove, showLoginModal, erc20TokenDeatail?.tokenCurrency?.symbol])
  return (
    <FormLayout
      childForm={
        <Stack gap={'32px'} mt={'24px'}>
          <Grid container spacing={{ xs: 10, xl: 18 }} justifyContent={'center'}>
            {isNeedToApprove && (
              <Grid item xs={6}>
                <LoadingButton
                  sx={{
                    width: '100%',
                    border: '1px solid #121212',
                    '&:hover': {
                      background: '#121212',
                      color: '#fff'
                    }
                  }}
                  loading={approveBtn.loading}
                  onClick={() => {
                    approveBtn.run && approveBtn.run()
                  }}
                >
                  {approveBtn.text}
                </LoadingButton>
              </Grid>
            )}

            <Grid item xs={6}>
              <LoadingButton
                sx={{
                  width: '100%',
                  background: '#121212',
                  color: '#fff',
                  '&:hover': {
                    background: '#121212',
                    color: '#fff'
                  }
                }}
                disabled={isNeedToApprove || JSON.stringify(errors) !== '{}'}
                onClick={() => {
                  handleSubmit && handleSubmit()
                }}
              >
                Lock
              </LoadingButton>
            </Grid>
          </Grid>
        </Stack>
      }
    />
  )
}
const TokenLockerForm = () => {
  const switchChain = useSwitchNetwork()
  const showLoginModal = useShowLoginModal()
  const { account, chainId: CurrenChainId } = useActiveWeb3React()
  const nav = useNavigate()
  //   const optionDatas = useOptionDatas()
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [chainId, setChainId] = useState<ChainId>(Number(CurrenChainId) as ChainId)
  const [releaseType, setReleaseType] = useState<IReleaseType>(IReleaseType.Cliff)
  const ChainSelectOption = ChainList.filter(item => {
    return TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES[item.id] !== ''
  })
  const erc20TokenDeatail = useErc20TokenDetail(tokenAddress, chainId, releaseType)
  const isCurrentChainEqualChainOfPool = useMemo(() => {
    return chainId === CurrenChainId
  }, [chainId, CurrenChainId])
  useEffect(() => {
    !account && showLoginModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  const sellerValue: ISeller = useMemo(() => {
    return {
      tokenAddress: '',
      chainId: Number(CurrenChainId) as ChainId,
      anotherTokenChecked: false,
      tokanName: '',
      tokenSymbol: '',
      tokenDecimal: 18,
      balance: '',
      title: '',
      amount: '',
      releaseType: IReleaseType.Cliff,
      delayUnlockingTime: null,
      linearUnlockingStartTime: null,
      linearUnlockingEndTime: null,
      fragmentReleaseTimes: [],
      releaseDataArr: [],
      segmentAmount: '',
      fragmentReleaseSize: ''
    }
  }, [CurrenChainId])
  const location = useLocation()
  useEffect(() => {
    const queryParams = queryString.parse(location.search)
    if (queryParams?.chain && Object.values(ChainId).includes(Number(queryParams?.chain) || '')) {
      const chainId = Number(queryParams?.chain) as unknown as ChainId
      setChainId(Number(chainId))
      sellerValue.chainId = chainId
    }
    if (queryParams?.tokenAddr) {
      setTokenAddress(queryParams?.tokenAddr + '')
      sellerValue.tokenAddress = queryParams?.tokenAddr + ''
    }
    console.log('queryParams>>>', queryParams)
    return () => {}
  }, [location.search, sellerValue])
  const lockHandle = useTokenTimelock(chainId)
  const toLockHandle = useCallback(
    async (
      title: string,
      tokenAddress: string,
      accountAddress: string,
      amount: CurrencyAmount | undefined,
      releaseTime: string
    ) => {
      showRequestApprovalDialog()
      try {
        const { transactionReceipt, hash } = await lockHandle(title, tokenAddress, accountAddress, amount, releaseTime)
        const ret = new Promise((resolve, rpt) => {
          showWaitingTxDialog(() => {
            hideDialogConfirmation()
            rpt()
          })
          transactionReceipt.then(curReceipt => {
            resolve(curReceipt)
            show(DialogTips, {
              iconType: 'success',
              againBtn: 'Check Detail',
              title: 'Congratulations!',
              content: 'You have successfully lock token',
              onAgain: () => {
                nav(`/TokenToolBox/TokenLockerInfo/${chainId}/${hash}`)
              }
            })
          })
        })
        ret
          .then(() => {
            hideDialogConfirmation()
          })
          .catch()
      } catch (error) {
        const err: any = error
        console.error(err)
        hideDialogConfirmation()
        show(DialogTips, {
          iconType: 'error',
          againBtn: 'Try Again',
          cancelBtn: 'Cancel',
          title: 'Oops..',
          content: typeof err === 'string' ? err : err?.error?.message || err?.message || 'Something went wrong',
          onAgain: toLockHandle
        })
      }
    },
    [chainId, lockHandle, nav]
  )
  const lockStageHandle = useTokenTimeStagelock(chainId)
  const toLockStageHandle = useCallback(
    async (
      title: string,
      tokenAddress: string,
      accountAddress: string,
      amount: CurrencyAmount | undefined,
      releaseTime: string[][]
    ) => {
      showRequestApprovalDialog()
      try {
        const { transactionReceipt, hash } = await lockStageHandle(
          title,
          tokenAddress,
          accountAddress,
          amount,
          releaseTime
        )
        const ret = new Promise((resolve, rpt) => {
          showWaitingTxDialog(() => {
            hideDialogConfirmation()
            rpt()
          })
          transactionReceipt.then(curReceipt => {
            resolve(curReceipt)
            show(DialogTips, {
              iconType: 'success',
              againBtn: 'Check Detail',
              title: 'Congratulations!',
              content: 'You have successfully lock token',
              onAgain: () => {
                nav(`/TokenToolBox/TokenLockerInfo/${chainId}/${hash}`)
              }
            })
          })
        })
        ret
          .then(() => {
            hideDialogConfirmation()
          })
          .catch()
      } catch (error) {
        const err: any = error
        console.error(err)
        hideDialogConfirmation()
        show(DialogTips, {
          iconType: 'error',
          againBtn: 'Try Again',
          cancelBtn: 'Cancel',
          title: 'Oops..',
          content: typeof err === 'string' ? err : err?.error?.message || err?.message || 'Something went wrong',
          onAgain: toLockStageHandle
        })
      }
    },
    [chainId, lockStageHandle, nav]
  )
  const lockLinearHandle = useTokenTimeLinearlock(chainId)
  const toLockLinearHandle = useCallback(
    async (
      title: string,
      tokenAddress: string,
      accountAddress: string,
      startAt: string,
      duration: string,
      amount: CurrencyAmount | undefined
    ) => {
      showRequestApprovalDialog()
      try {
        const { transactionReceipt, hash } = await lockLinearHandle(
          title,
          tokenAddress,
          accountAddress,
          startAt,
          duration,
          amount
        )
        const ret = new Promise((resolve, rpt) => {
          showWaitingTxDialog(() => {
            hideDialogConfirmation()
            rpt()
          })
          transactionReceipt.then(curReceipt => {
            resolve(curReceipt)
            show(DialogTips, {
              iconType: 'success',
              againBtn: 'Check Detail',
              title: 'Congratulations!',
              content: 'You have successfully lock token',
              onAgain: () => {
                nav(`/TokenToolBox/TokenLockerInfo/${chainId}/${hash}`)
              }
            })
          })
        })
        ret
          .then(() => {
            hideDialogConfirmation()
          })
          .catch()
      } catch (error) {
        const err: any = error
        console.error(err)
        hideDialogConfirmation()
        show(DialogTips, {
          iconType: 'error',
          againBtn: 'Try Again',
          cancelBtn: 'Cancel',
          title: 'Oops..',
          content: typeof err === 'string' ? err : err?.error?.message || err?.message || 'Something went wrong',
          onAgain: toLockLinearHandle
        })
      }
    },
    [lockLinearHandle, nav, chainId]
  )
  const onSubmit = async (value: ISeller) => {
    // nav(`/TokenToolBox/TokenLockerInfo/11155111/0xdd33aa294317da0b74e30e28364caae3b4232bcd30d16043ee85f1b04a9f98da`)
    showRequestConfirmDialog()
    try {
      const amoutAraw = erc20TokenDeatail?.tokenCurrency
        ? CurrencyAmount.fromAmount(erc20TokenDeatail.tokenCurrency, value.amount)
        : undefined
      const type = Number(value.releaseType)
      switch (type) {
        case IReleaseType.Cliff:
          toLockHandle(
            value.title,
            value.tokenAddress,
            value.anotherTokenChecked && value.anotherTokenAddress ? value.anotherTokenAddress : account || '',
            amoutAraw,
            value?.delayUnlockingTime?.unix() + ''
          )
          break
        case IReleaseType.Fragment:
          const releaseTimeAndRadio = value?.fragmentReleaseTimes
            .sort((a, b) => {
              if (a.startAt === null || b.startAt === null) {
                if (a.startAt === null && b.startAt === null) {
                  return 0
                } else if (a.startAt === null) {
                  return 1
                } else {
                  return -1
                }
              }
              return a.startAt.diff(b.startAt)
            })
            .map(item => {
              return [item?.startAt?.unix() + '', BigNumber(item.radio).times('0.01').times(1e18).toString()]
            })
          toLockStageHandle(
            value.title,
            value.tokenAddress,
            value.anotherTokenChecked && value.anotherTokenAddress ? value.anotherTokenAddress : account || '',
            amoutAraw,
            releaseTimeAndRadio
          )
          break
        case IReleaseType.Linear:
          toLockLinearHandle(
            value.title,
            value.tokenAddress,
            value.anotherTokenChecked && value.anotherTokenAddress ? value.anotherTokenAddress : account || '',
            value.linearUnlockingStartTime?.unix() + '',
            value.linearUnlockingStartTime?.diff(value.linearUnlockingEndTime, 'seconds') + '', // duration, endTime - startTime
            amoutAraw
          )
          break
      }
    } catch (e) {
      hideDialogConfirmation()
    }
  }
  return (
    // TODO: move LocalizationProvider to _app.tex
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Formik
        enableReinitialize
        initialValues={sellerValue}
        validationSchema={sellerValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, setFieldValue, handleSubmit }) => {
          console.log('values>>>', values)
          // update hook params
          setChainId(values.chainId)
          setTokenAddress(values.tokenAddress)
          setReleaseType(Number(values.releaseType))
          return (
            <Form
              style={{
                borderRadius: '0 25px 25px 25px',
                background: '#fff',
                padding: '56px'
              }}
              onSubmit={handleSubmit}
            >
              <FormLayout
                childForm={
                  <FormItem>
                    <ToolBoxSelect
                      variant="outlined"
                      value={values.chainId}
                      onChange={({ target }) => {
                        setFieldValue('chainId', target.value)
                        switchChain(target.value as unknown as ChainId)
                      }}
                      placeholder={'Select chain'}
                      renderValue={selected => {
                        const currentChain = ChainSelectOption.find(item => item.id === selected)
                        return (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 16,
                              alignItems: 'center'
                            }}
                          >
                            {selected ? (
                              <>
                                <Image style={{ width: 32, height: 32 }} src={currentChain?.logo as string} />
                                <Stack>
                                  <Typography
                                    component={'span'}
                                    sx={{
                                      color: '#959595',
                                      fontFamily: `'Inter'`,
                                      fontSize: 12
                                    }}
                                  >
                                    Select Chain
                                  </Typography>
                                  <Title sx={{ fontSize: 14, color: '#121212' }}>{currentChain?.name}</Title>
                                </Stack>
                              </>
                            ) : (
                              <Title sx={{ fontSize: 14, color: '#959595', fontWeight: 500 }}>Select Chain</Title>
                            )}
                          </Box>
                        )
                      }}
                    >
                      {ChainSelectOption.map(t => (
                        <MenuItem
                          key={t.id}
                          value={t.id}
                          sx={{
                            '&.Mui-selected': {
                              background: values.chainId === t.id ? '#E1F25C' : ''
                            }
                          }}
                        >
                          <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                            <Image style={{ width: 25, height: 25 }} src={t.logo} />
                            <Title sx={{ fontSize: 16 }}>{t.name}</Title>
                          </Stack>
                        </MenuItem>
                      ))}
                    </ToolBoxSelect>
                  </FormItem>
                }
              />
              <LineCom />
              <FormLayout
                title1="Token address"
                childForm={
                  <FormItem name={'tokenAddress'}>
                    <ToolBoxInput
                      sx={{
                        color: '#121212'
                      }}
                      value={values.tokenAddress}
                      onChange={e => {
                        if (isAddress(e.target.value)) {
                          setFieldValue('tokenAddress', e.target.value)
                        }
                      }}
                      placeholder={'Token Address'}
                    />
                  </FormItem>
                }
              />
              <FormLayout
                title1="Use another owner"
                isShowByChecked={true}
                checkedHandle={(value: boolean) => {
                  setFieldValue('anotherTokenChecked', value)
                }}
                description={'The address you input here will be receive the tokens once they are unlocked'}
                childForm={
                  <FormItem name={'anotherTokenAddress'}>
                    <ToolBoxInput placeholder={'Token Address'} />
                  </FormItem>
                }
              />
              <LineCom />
              <RowTextInfo label={'Token name'} value={erc20TokenDeatail?.tokenCurrency?.name || '--'} />
              <RowTextInfo label={'Token symbol'} value={erc20TokenDeatail?.tokenCurrency?.symbol || '--'} />
              <RowTextInfo
                label={'Token decimal'}
                value={
                  erc20TokenDeatail?.tokenCurrency?.decimals ? erc20TokenDeatail?.tokenCurrency?.decimals + '' : '--'
                }
              />
              <RowTextInfo label={'Balance'} value={erc20TokenDeatail?.balance?.toExact() || '--'} />
              <RowTextInfo label={'Allowance'} value={erc20TokenDeatail?.allowance?.toExact() || '--'} line={false} />
              <LineCom />
              <FormLayout
                title1="Title"
                childForm={
                  <FormItem name={'title'}>
                    <ToolBoxInput placeholder={'Please enter locker title'} />
                  </FormItem>
                }
              />
              <FormLayout
                title1="Amount"
                childForm={
                  <>
                    <FormItem
                      name={'amount'}
                      sx={{
                        position: 'relative'
                      }}
                    >
                      <>
                        <ToolBoxInput
                          placeholder={'Please enter amount'}
                          value={values.amount}
                          sx={{
                            paddingRight: '100px'
                          }}
                          onChange={e => {
                            const value = e.target.value
                            let filtered = value.replace(/[^0-9.]/g, '').replace(/(\.\d{8})[\d.]+/g, '$1')
                            if (filtered.startsWith('.')) {
                              filtered = '0' + filtered
                            }
                            const decimalIndex = filtered.indexOf('.')
                            if (decimalIndex !== -1) {
                              filtered =
                                filtered.slice(0, decimalIndex + 1) +
                                filtered.slice(decimalIndex + 1).replace(/\./g, '')
                            }
                            if (
                              erc20TokenDeatail &&
                              erc20TokenDeatail.balance &&
                              Number(filtered) > Number(erc20TokenDeatail.balance.toExact())
                            ) {
                              filtered = erc20TokenDeatail.balance.toExact()
                            }
                            setFieldValue('amount', filtered)
                          }}
                        />
                        {/* max btn */}
                        <Box
                          sx={{
                            width: '60px',
                            height: '40px',
                            position: 'absolute',
                            top: '50%',
                            right: 34,
                            transform: 'translate3D(0, -50%, 0)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '.max': {
                              color: '#121212',
                              lineHeight: '20px',
                              borderBottom: '2px solid #121212'
                            },
                            '&:hover': {
                              background: '#121212',
                              borderRadius: '8px',
                              '.max': {
                                color: '#fff',
                                lineHeight: '20px',
                                borderBottom: '2px solid #121212'
                              }
                            }
                          }}
                          onClick={() => {
                            setFieldValue('amount', erc20TokenDeatail.max)
                          }}
                        >
                          <Typography className={'max'}>Max</Typography>
                        </Box>
                      </>
                    </FormItem>
                  </>
                }
              />
              <LineCom />
              <FormLayout
                title1={
                  <>
                    <Title sx={{ color: '#20201E', fontSize: 20, lineHeight: '28px' }}>Locking model</Title>
                    <Tooltip title="Coming soon">
                      <TipIcon
                        style={{
                          cursor: 'pointer'
                        }}
                      />
                    </Tooltip>
                  </>
                }
                childForm={
                  <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="releaseType">
                    <FormControlLabel value={IReleaseType.Cliff} control={<Radio />} label="Normal" />
                    <FormControlLabel value={IReleaseType.Linear} control={<Radio />} label="Linear" />
                    <FormControlLabel value={IReleaseType.Fragment} control={<Radio />} label="Stage" />
                  </Field>
                }
              />
              {Number(values.releaseType) === IReleaseType.Instant ? (
                <LabelTitle>Participate in the auction to get tokens immediately</LabelTitle>
              ) : Number(values.releaseType) === IReleaseType.Cliff ? (
                <Stack spacing={6}>
                  <LabelTitle>Unlocking Start Time</LabelTitle>
                  <Field
                    component={DateTimePickerFormItem}
                    disablePast
                    name="delayUnlockingTime"
                    minDateTime={moment()}
                    textField={{ sx: { width: '100%' } }}
                  />
                </Stack>
              ) : Number(values.releaseType) === IReleaseType.Linear ? (
                <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={15}>
                  <Stack spacing={6}>
                    <LabelTitle>Start Time</LabelTitle>
                    <Field
                      component={DateTimePickerFormItem}
                      disablePast
                      name="linearUnlockingStartTime"
                      minDateTime={moment()}
                      maxDateTime={values.linearUnlockingEndTime}
                      textField={{ sx: { width: '100%' } }}
                    />
                  </Stack>

                  <Stack spacing={6}>
                    <LabelTitle>End Time</LabelTitle>
                    <Field
                      component={DateTimePickerFormItem}
                      disablePast
                      name="linearUnlockingEndTime"
                      minDateTime={values.linearUnlockingStartTime}
                      textField={{ sx: { width: '100%' } }}
                    />
                  </Stack>
                </Box>
              ) : Number(values.releaseType) === IReleaseType.Fragment ? (
                <SetFragmentReleaseTime
                  minDateTime={moment()}
                  errors={errors.fragmentReleaseTimes}
                  sizeError={errors.fragmentReleaseSize}
                  releaseTimes={values.fragmentReleaseTimes}
                  setFragmentReleaseTimes={(val: IFragmentReleaseTimes[]) => setFieldValue('fragmentReleaseTimes', val)}
                />
              ) : (
                <LabelTitle>No unlocking method is set; tokens can be claimed after the specified end.</LabelTitle>
              )}
              {isCurrentChainEqualChainOfPool && (
                <BidBlock
                  formValues={values}
                  erc20TokenDeatail={erc20TokenDeatail}
                  errors={errors}
                  handleSubmit={() => {
                    handleSubmit()
                  }}
                />
              )}
              {!isCurrentChainEqualChainOfPool && <SwitchNetworkButton targetChain={values.chainId} />}
            </Form>
          )
        }}
      </Formik>
    </LocalizationProvider>
  )
}
const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}))
export const FormLayout = ({
  title1,
  childForm,
  isShowByChecked,
  checkedHandle,
  description
}: {
  title1?: string | React.ReactNode
  isShowByChecked?: boolean
  checkedHandle?: (value: boolean) => void
  childForm: React.ReactElement
  description?: string
}) => {
  const [show, setShow] = useState(!isShowByChecked)
  return (
    <Stack sx={{ flexDirection: 'column', marginBottom: '24px' }}>
      <Stack mb={'12px'} sx={{ flexDirection: 'row' }} justifyContent={'flex-start'} alignItems={'center'} gap={'16px'}>
        {title1 && typeof title1 === 'string' ? (
          <Title sx={{ color: '#20201E', fontSize: 20, lineHeight: '28px' }}>{title1}</Title>
        ) : (
          title1
        )}
        {isShowByChecked && (
          <IOSSwitch
            onChange={() => {
              setShow(!show)
              checkedHandle && checkedHandle(!show)
            }}
            sx={{ m: 1 }}
            defaultChecked={false}
          />
        )}
      </Stack>
      {show && childForm}
      {show && description && (
        <Typography
          sx={{ marginTop: '8px', fontFamily: `'Inter'`, fontSize: '12px', textAlign: 'left', color: '#959595' }}
        >
          {description}
        </Typography>
      )}
    </Stack>
  )
}
const Title = styled(Typography)({
  fontFamily: 'Public Sans',
  fontSize: '28px',
  fontWeight: 600,
  lineHeight: '28px',
  letterSpacing: '-0.4px',
  textAlign: 'left',
  color: '#20201E'
})
export default TokenLockerForm
