import { Box, Stack, styled, Typography, Select, MenuItem, Grid, OutlinedInput, FormLabel, Button } from '@mui/material'
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
import moment, { Moment } from 'moment'
import { LoadingButton } from '@mui/lab'
import {
  TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES,
  TOOL_BOX_LINEAR_TOKEN_721_LOCKER_CONTRACT_ADDRESSES
} from 'constants/index'
import { isAddress } from 'web3-utils'
import { useErc721TokenDetail } from 'bounceHooks/toolbox/useTokenLocakCallback'
import { useDeployUniswapV2Timelock, useDeployUniswapV3Timelock, useApproveCallback } from 'hooks/useTokenTimelock'
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
import { useNavigate } from 'react-router-dom'
import { ApprovalState } from 'hooks/useApproveCallback'
import { useGetExchangeList } from 'hooks/useTokenTimelock'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
interface ISeller {
  tokenAddress: string
  anotherTokenAddress?: string
  anotherTokenChecked?: boolean
  chainId: ChainId
  version: VersionType
  exchangeId: string
  tokanName: string
  tokenSymbol: string
  tokenDecimal: number
  balance: string
  title: string
  amount: string
  delayUnlockingTime: Moment | null
  segmentAmount?: string
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
function LabelTitle({ children }: { children: any }) {
  return <FormLabel sx={{ fontWeight: 600, color: '#222223', mt: 10 }}>{children}</FormLabel>
}
export enum VersionType {
  'v2' = 0,
  'v3' = 1
}
const BidBlock = ({
  formValues,
  erc721TokenDeatail,
  errors,
  handleSubmit
}: {
  formValues: ISeller
  erc721TokenDeatail: TokenlockResponse
  errors: FormikErrors<ISeller>
  handleSubmit: () => void
}) => {
  const { account } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const isNeedToApprove = useMemo(() => {
    return erc721TokenDeatail?.allowance && Number(formValues.amount) > Number(erc721TokenDeatail?.allowance?.toExact())
  }, [erc721TokenDeatail?.allowance, formValues.amount])
  const lockAmount = useMemo(() => {
    return erc721TokenDeatail?.tokenCurrency && formValues.amount
      ? CurrencyAmount.fromAmount(erc721TokenDeatail?.tokenCurrency, formValues.amount)
      : undefined
  }, [erc721TokenDeatail?.tokenCurrency, formValues.amount])
  const contractAddress = useMemo(() => {
    return Number(formValues.version) === VersionType.v2
      ? TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES[formValues.chainId]
      : TOOL_BOX_LINEAR_TOKEN_721_LOCKER_CONTRACT_ADDRESSES[formValues.chainId]
  }, [formValues.chainId, formValues.version])
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
          text: `Approving use of ${erc721TokenDeatail?.tokenCurrency?.symbol} ...`,
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
          text: `Approve use of ${erc721TokenDeatail?.tokenCurrency?.symbol}`,
          run: toApprove
        }
      }
    }
    return {
      run: toApprove
    }
  }, [account, approvalState, toApprove, showLoginModal, erc721TokenDeatail?.tokenCurrency?.symbol])
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
const TokenLockerL2L3Form = () => {
  const showLoginModal = useShowLoginModal()
  const { account } = useActiveWeb3React()
  //   const optionDatas = useOptionDatas()
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [chainId, setChainId] = useState<ChainId>(ChainId.SEPOLIA)
  const [version, setVersion] = useState<VersionType>(VersionType.v2)
  const ChainSelectOption = ChainList.filter(item => {
    return TOOL_BOX_LINEAR_TOKEN_721_LOCKER_CONTRACT_ADDRESSES[item.id] !== ''
  })
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId)
  const { data: exchangeList } = useGetExchangeList(chainConfigInBackend?.id || 0, 2)
  const erc721TokenDeatail = useErc721TokenDetail(tokenAddress, chainId, version)
  useEffect(() => {
    !account && showLoginModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  const sellerValue: ISeller = {
    tokenAddress: '',
    chainId: ChainId.SEPOLIA,
    exchangeId: '',
    anotherTokenChecked: false,
    tokanName: '',
    tokenSymbol: '',
    version: VersionType.v2,
    tokenDecimal: 18,
    balance: '',
    title: '',
    amount: '',
    delayUnlockingTime: null,
    segmentAmount: ''
  }
  const lockV2Handle = useDeployUniswapV2Timelock(chainId)
  const lockV3Handle = useDeployUniswapV3Timelock(chainId)
  const nav = useNavigate()
  const onSubmit = async (value: ISeller) => {
    // nav(`/TokenToolBox/TokenLockerInfo/11155111/0xdd33aa294317da0b74e30e28364caae3b4232bcd30d16043ee85f1b04a9f98da`)
    showRequestConfirmDialog()
    try {
      const amoutAraw = erc721TokenDeatail?.tokenCurrency
        ? CurrencyAmount.fromAmount(erc721TokenDeatail.tokenCurrency, value.amount)
        : undefined
      const type = Number(value.version)
      switch (type) {
        case VersionType.v2:
          await lockV2Handle(
            value.title,
            value.tokenAddress,
            value.anotherTokenChecked && value.anotherTokenAddress ? value.anotherTokenAddress : account || '',
            amoutAraw,
            value?.delayUnlockingTime?.unix() + ''
          )
            .then(resp => {
              show(DialogTips, {
                iconType: 'success',
                againBtn: 'Check Detail',
                title: 'Congratulations!',
                content: 'You have successfully lock token',
                onAgain: () => {
                  nav(`/TokenToolBox/TokenLockerInfo/${chainId}/${resp.hash}`)
                }
              })
              hideDialogConfirmation()
            })
            .catch(() => {
              hideDialogConfirmation()
            })
          break
        case VersionType.v3:
          await lockV3Handle(
            value.title,
            value.tokenAddress,
            '',
            value.anotherTokenChecked && value.anotherTokenAddress ? value.anotherTokenAddress : account || '',
            value?.delayUnlockingTime?.unix() + ''
          )
            .then(resp => {
              show(DialogTips, {
                iconType: 'success',
                againBtn: 'Check Detail',
                title: 'Congratulations!',
                content: 'You have successfully lock token',
                onAgain: () => {
                  nav(`/TokenToolBox/TokenLockerInfo/${chainId}/${resp.hash}`)
                }
              })
              hideDialogConfirmation()
            })
            .catch(() => {
              hideDialogConfirmation()
            })
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
                    <Stack direction={'row'} justifyContent={'flex-start'} flexWrap={'nowrap'} gap={'12px'}>
                      <Button
                        sx={{
                          width: '120px',
                          height: '44px',
                          border: '1px solid #E1F25C',
                          background: values.version === VersionType.v2 ? '#E1F25C' : '#fff',
                          color: values.version === VersionType.v2 ? '#121212' : '#959595'
                        }}
                        onClick={() => {
                          setFieldValue('version', VersionType.v2)
                          setVersion(VersionType.v2)
                        }}
                      >
                        V2
                      </Button>
                      <Button
                        sx={{
                          width: '120px',
                          height: '44px',
                          border: '1px solid #E1F25C',
                          background: values.version === VersionType.v3 ? '#E1F25C' : '#fff',
                          color: values.version === VersionType.v3 ? '#121212' : '#959595'
                        }}
                        onClick={() => {
                          setFieldValue('version', VersionType.v3)
                          setVersion(VersionType.v3)
                        }}
                      >
                        V3
                      </Button>
                    </Stack>
                  </FormItem>
                }
              />
              <FormLayout
                childForm={
                  <FormItem>
                    <ToolBoxSelect
                      variant="outlined"
                      value={values.chainId}
                      onChange={({ target }) => {
                        setFieldValue('chainId', target.value)
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
                            <Image style={{ width: 25, height: 25 }} src={t.logo || ''} />
                            <Title sx={{ fontSize: 16 }}>{t.name}</Title>
                          </Stack>
                        </MenuItem>
                      ))}
                    </ToolBoxSelect>
                  </FormItem>
                }
              />
              <FormLayout
                childForm={
                  <FormItem>
                    <ToolBoxSelect
                      variant="outlined"
                      value={values.exchangeId}
                      onChange={({ target }) => {
                        setFieldValue('exchangeId', target.value)
                      }}
                      placeholder={'Select exchange'}
                      renderValue={selected => {
                        const currentChain = exchangeList?.find(item => item.id === selected)
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
                                    Select Exchange
                                  </Typography>
                                  <Title sx={{ fontSize: 14, color: '#121212' }}>{currentChain?.name}</Title>
                                </Stack>
                              </>
                            ) : (
                              <Title sx={{ fontSize: 14, color: '#959595', fontWeight: 500 }}>Select Exchange</Title>
                            )}
                          </Box>
                        )
                      }}
                    >
                      {Array.isArray(exchangeList) &&
                        exchangeList.map(t => (
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
                              <Image style={{ width: 25, height: 25 }} src={t?.logo || ''} />
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
              <RowTextInfo label={'Token name'} value={erc721TokenDeatail?.tokenCurrency?.name || '--'} />
              <RowTextInfo label={'Token symbol'} value={erc721TokenDeatail?.tokenCurrency?.symbol || '--'} />
              <RowTextInfo
                label={'Token decimal'}
                value={
                  erc721TokenDeatail?.tokenCurrency?.decimals ? erc721TokenDeatail?.tokenCurrency?.decimals + '' : '--'
                }
              />
              <RowTextInfo label={'Balance'} value={erc721TokenDeatail?.balance?.toExact() || '--'} />
              <RowTextInfo label={'Allowance'} value={erc721TokenDeatail?.allowance?.toExact() || '--'} line={false} />
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
                              erc721TokenDeatail &&
                              erc721TokenDeatail.balance &&
                              Number(filtered) > Number(erc721TokenDeatail.balance.toExact())
                            ) {
                              filtered = erc721TokenDeatail.balance.toExact()
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
                            setFieldValue('amount', erc721TokenDeatail.max)
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
              <BidBlock
                formValues={values}
                erc721TokenDeatail={erc721TokenDeatail}
                errors={errors}
                handleSubmit={() => {
                  handleSubmit()
                }}
              />
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
export default TokenLockerL2L3Form
