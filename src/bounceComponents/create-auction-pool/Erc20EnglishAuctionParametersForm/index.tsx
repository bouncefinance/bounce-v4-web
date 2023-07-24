import { Button, Stack, OutlinedInput, Box, Typography, FormControlLabel, Alert } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { SetStateAction } from 'react'
import * as Yup from 'yup'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { show } from '@ebay/nice-modal-react'
import { AllocationStatus } from '../types'
import FakeOutlinedInput from '../FakeOutlinedInput'
import TokenDialog from '../TokenDialog'
import {
  ActionType,
  useAuctionERC20Currency,
  useAuctionInChain,
  useValuesDispatch,
  useValuesState
} from '../ValuesProvider'
import Radio from '../Radio'
import RadioGroupFormItem from '../RadioGroupFormItem'
import { BigNumber } from 'bignumber.js'
// import LogoSVG from 'assets/imgs/components/logo.svg'

import FormItem from 'bounceComponents/common/FormItem'
import Tooltip from 'bounceComponents/common/Tooltip'
import TokenImage from 'bounceComponents/common/TokenImage'
import { ChainId } from 'constants/chain'
import { useActiveWeb3React } from 'hooks'
import { CurrencyAmount } from 'constants/token'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { ZERO } from 'constants/token/constants'
import { Token } from 'bounceComponents/fixed-swap/type'
import NumberInput from 'bounceComponents/common/NumberInput'
import useBreakpoint from 'hooks/useBreakpoint'

interface FormValues {
  tokenFromAddress: string
  tokenFromSymbol: string
  tokenFromLogoURI?: string
  tokenFromDecimals: string
  tokenToAddress: string
  tokenToSymbol: string
  tokenToLogoURI?: string
  tokenToDecimals: string | number
  startPrice: string
  endPrice: string
  segments: string
  poolSize: string
  allocationStatus: AllocationStatus
  allocationPerWallet: string
}

const Erc20EnglishAuctionParametersForm = (): JSX.Element => {
  const { account } = useActiveWeb3React()
  const auctionInChainId = useAuctionInChain()
  const { currencyFrom } = useAuctionERC20Currency()
  const balance = useCurrencyBalance(account || undefined, currencyFrom, auctionInChainId)
  const isSm = useBreakpoint('sm')
  const validationSchema = Yup.object({
    tokenToSymbol: Yup.string()
      .required('Token is required')
      .test(
        'DIFFERENT_TOKENS',
        'Please choose a different token',
        (_, context) => context.parent.tokenFromAddress !== context.parent.tokenToAddress
      ),
    endPrice: Yup.number()
      .typeError('Please input valid number')
      .required('Final price is required')
      .test('minValue', "Final price can't be smaller than start price", function (value) {
        const { startPrice } = this.parent
        if (value && startPrice) {
          return value > startPrice
        }
        return true
      })
      .test('Ditgits_Validation', 'Price must be greater than 0', value => {
        return Number(value) > 0
      }),
    startPrice: Yup.number()
      .typeError('Please input valid number')
      .required('Start price is required')
      .test('minValue', "Start price can't be greater than final price", function (value) {
        const { endPrice } = this.parent
        if (value && endPrice) {
          return value < endPrice
        }
        return true
      })
      .test('Ditgits_Validation', 'Price must be greater than 0', value => {
        return Number(value) > 0
      }),
    segments: Yup.number()
      .typeError('Please input valid number')
      .required('Auction price segment is required')
      .max(100000, 'The segment maximum is 100,000')
      .test('Ditgits_Validation', 'The decreasing time must be an integer greater than 1', value => {
        return Number.isInteger(value) && Number(value) > 1
      }),
    poolSize: Yup.number()
      .positive('Amount must be positive')
      .typeError('Please input valid number')
      .required('Amount is required')
      .test('DIGITS_LESS_THAN_6', 'Should be no more than 6 digits after point', value => {
        const _value = new BigNumber(value || 0).toFixed()
        return !_value || !String(_value).includes('.') || String(_value).split('.')[1]?.length <= 6
      })
      .test(
        'POOL_SIZE_LESS_THAN_BALANCE',
        'Pool size cannot be greater than your balance',
        value =>
          !value || (balance ? !balance.lessThan(CurrencyAmount.fromAmount(balance.currency, value) || ZERO) : false)
      ),
    allocationStatus: Yup.string().oneOf(Object.values(AllocationStatus)),
    allocationPerWallet: Yup.number()
      .when('allocationStatus', {
        is: AllocationStatus.Limited,
        then: Yup.number()
          .typeError('Please input valid number')
          .positive('Allocation per wallet must be positive')
          .test('DIGITS_LESS_THAN_6', 'Should be no more than 6 digits after point', value => {
            const _value = new BigNumber(value || 0).toFixed()
            return !_value || !String(_value).includes('.') || String(_value).split('.')[1]?.length <= 6
          })
          .required('Allocation per wallet is required')
      })
      .when('allocationStatus', {
        is: AllocationStatus.Limited,
        then: Yup.number()
          .typeError('Please input valid number')
          .test(
            'GREATER_THAN_POOL_SIZE',
            'Allocation per wallet cannot be greater than pool size times swap ratio',
            (value, context) =>
              !context.parent.poolSize ||
              !context.parent.swapRatio ||
              (value || 0) <= context.parent.poolSize * context.parent.swapRatio
          )
      })
  })

  const valuesState = useValuesState()
  const valuesDispatch = useValuesDispatch()

  const internalInitialValues: FormValues = {
    tokenFromAddress: valuesState.tokenFrom.address || '',
    tokenFromSymbol: valuesState.tokenFrom.symbol || '',
    tokenFromLogoURI: valuesState.tokenFrom.logoURI || '',
    tokenFromDecimals: String(valuesState.tokenFrom.decimals || ''),
    tokenToAddress: valuesState.tokenTo.address || '',
    tokenToSymbol: valuesState.tokenTo.symbol || '',
    tokenToLogoURI: valuesState.tokenTo.logoURI || '',
    tokenToDecimals: String(valuesState.tokenTo.decimals || ''),
    startPrice: valuesState.startPrice || '',
    endPrice: valuesState.endPrice || '',
    segments: valuesState.segmentAmount || '',
    poolSize: valuesState.poolSize || '',
    allocationStatus: valuesState.allocationStatus || AllocationStatus.NoLimits,
    allocationPerWallet: valuesState.allocationPerWallet || ''
  }

  const showTokenDialog = (
    chainId: ChainId,
    values: FormValues,
    setValues: (values: SetStateAction<FormValues>, shouldValidate?: boolean) => void
  ) => {
    show<Token>(TokenDialog, { enableEth: true, chainId })
      .then(res => {
        console.log('TokenDialog Resolved: ', res)
        setValues({
          ...values,
          tokenToAddress: res.address,
          tokenToSymbol: res.symbol || '',
          tokenToLogoURI: res.logoURI,
          tokenToDecimals: res.decimals
        })
      })
      .catch(err => {
        console.log('TokenDialog Rejected: ', err)
      })
  }

  return (
    <Box sx={{ mt: 52, px: isSm ? 16 : '0' }}>
      <Typography variant="h2">Auction Parameters</Typography>
      <Typography sx={{ color: 'var(--ps-gray-700)', mt: 5, mb: 42 }}>{valuesState.auctionType}</Typography>

      <Formik
        initialValues={internalInitialValues}
        onSubmit={values => {
          console.log('on submit')
          valuesDispatch({
            type: ActionType.CommitAuctionParameters,
            payload: {
              tokenTo: {
                chainId: auctionInChainId,
                address: values.tokenToAddress,
                logoURI: values.tokenToLogoURI,
                symbol: values.tokenToSymbol,
                decimals: values.tokenToDecimals
              },
              startPrice: values.startPrice,
              endPrice: values.endPrice,
              segmentAmount: values.segments,
              poolSize: values.poolSize,
              allocationPerWallet: values.allocationPerWallet,
              allocationStatus: values.allocationStatus
            }
          })
        }}
        validationSchema={validationSchema}
      >
        {({ setValues, values, setFieldValue }) => {
          return (
            <Stack component={Form} spacing={32} noValidate>
              <Alert severity="warning" sx={{ borderRadius: 20 }}>
                <Typography variant="body1">
                  Bounce protocol does not support inflationary and deflationary tokens.
                </Typography>
              </Alert>

              {/* Token to */}
              <Box>
                <Stack direction="row" spacing={8} sx={{ mb: 20 }}>
                  <Typography variant="h3" sx={{ fontSize: 16 }}>
                    Funding Currency
                  </Typography>

                  <Tooltip title="Please do not select deflationary or inflationary token ">
                    <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                  </Tooltip>
                </Stack>

                <Stack spacing={20} direction="row" sx={{ width: '100%' }}>
                  <FormItem
                    name="tokenToSymbol"
                    label="Select Token"
                    required
                    sx={{ flex: 1 }}
                    startAdornment={<TokenImage alt={values.tokenToSymbol} src={values.tokenToLogoURI} size={32} />}
                  >
                    <FakeOutlinedInput
                      // disabled
                      readOnly
                      onClick={() => {
                        if (account && auctionInChainId) {
                          showTokenDialog(auctionInChainId, values, setValues)
                        }
                      }}
                    />
                  </FormItem>
                </Stack>
              </Box>
              {/* Starting price */}
              <Box>
                <Stack direction="row" spacing={8}>
                  <Typography variant="h3" sx={{ fontSize: 16, mb: 8 }}>
                    Starting price(price floor)
                  </Typography>
                  <Tooltip title="The amount of tokens that you want to put in for auction">
                    <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                  </Tooltip>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={15}>
                  <Typography>1 {values.tokenFromSymbol} =</Typography>

                  <FormItem name="startPrice" placeholder="0.00" required sx={{ flex: 1 }}>
                    <NumberInput
                      value={values.startPrice}
                      onUserInput={value => {
                        setFieldValue('startPrice', value)
                      }}
                      endAdornment={
                        <>
                          <TokenImage alt={values.tokenToSymbol} src={values.tokenToLogoURI} size={24} />
                          <Typography sx={{ ml: 8 }}>{values.tokenToSymbol}</Typography>
                        </>
                      }
                    />
                  </FormItem>
                </Stack>
              </Box>

              {/* Reserve Price */}
              <Box>
                <Stack direction="row" spacing={8}>
                  <Typography variant="h3" sx={{ fontSize: 16, mb: 8 }}>
                    Final price(price ceiling)
                  </Typography>
                  <Tooltip title="The amount of tokens that you want to put in for auction">
                    <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                  </Tooltip>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={15}>
                  <Typography>1 {values.tokenFromSymbol} =</Typography>

                  <FormItem name="endPrice" placeholder="0.00" required sx={{ flex: 1 }}>
                    <NumberInput
                      value={values.endPrice}
                      onUserInput={value => {
                        setFieldValue('endPrice', value)
                      }}
                      endAdornment={
                        <>
                          <TokenImage alt={values.tokenToSymbol} src={values.tokenToLogoURI} size={24} />
                          <Typography sx={{ ml: 8 }}>{values.tokenToSymbol}</Typography>
                        </>
                      }
                    />
                  </FormItem>
                </Stack>
              </Box>

              {/* Auction Segment */}
              <Box>
                <Typography variant="h3" sx={{ fontSize: 16, mb: 8 }}>
                  Auciton Price Segments
                </Typography>

                <Stack direction="row" alignItems="center" spacing={15}>
                  <FormItem name="segments" placeholder="1" required sx={{ flex: 1 }}>
                    <NumberInput
                      value={values.segments}
                      onUserInput={value => {
                        setFieldValue('segments', value)
                      }}
                    />
                  </FormItem>
                </Stack>
              </Box>

              {/* Swap Ratio */}
              {/* <Box>
                <Typography variant="h3" sx={{ fontSize: 16, mb: 8 }}>
                  Swap Ratio
                </Typography>

                <Stack direction="row" alignItems="center" spacing={15}>
                  <Typography>1 {values.tokenFromSymbol} =</Typography>

                  <FormItem name="swapRatio" placeholder="0.00" required sx={{ flex: 1 }}>
                    <NumberInput
                      value={values.swapRatio}
                      onUserInput={value => {
                        setFieldValue('swapRatio', value)
                      }}
                      endAdornment={
                        <>
                          <TokenImage alt={values.tokenToSymbol} src={values.tokenToLogoURI} size={24} />
                          <Typography sx={{ ml: 8 }}>{values.tokenToSymbol}</Typography>
                        </>
                      }
                    />
                  </FormItem>
                </Stack>
              </Box> */}

              {/* Pool Size */}
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 8 }}>
                  <Stack direction="row" spacing={8}>
                    <Typography variant="h3" sx={{ fontSize: 16 }}>
                      Amount
                    </Typography>

                    <Tooltip title="The amount of tokens that you want to put in for auction">
                      <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                    </Tooltip>
                  </Stack>

                  {values.tokenFromSymbol && <Typography>Balance: {balance?.toSignificant() || '-'}</Typography>}
                </Stack>

                <FormItem name="poolSize" placeholder="0.00" required sx={{ flex: 1 }}>
                  <NumberInput
                    value={values.poolSize}
                    onUserInput={value => {
                      setFieldValue('poolSize', value)
                    }}
                    endAdornment={
                      <>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ mr: 20, minWidth: 60 }}
                          disabled={!balance}
                          onClick={() => {
                            setFieldValue('poolSize', balance?.toSignificant(64, { groupSeparator: '' }))
                          }}
                        >
                          Max
                        </Button>
                        <TokenImage alt={values.tokenFromSymbol} src={values.tokenFromLogoURI} size={24} />
                        <Typography sx={{ ml: 8 }}>{values.tokenFromSymbol}</Typography>
                      </>
                    }
                  />
                </FormItem>
              </Box>

              {/* Allocation per Wallet */}
              <Box>
                <Stack direction="row" spacing={8}>
                  <Typography variant="h3" sx={{ fontSize: 16 }}>
                    Allocation per Wallet
                  </Typography>

                  <Tooltip title="You can set a maximum allocation per wallet to prevent monopoly activities during the token swap.">
                    <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                  </Tooltip>
                </Stack>

                <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="allocationStatus">
                  <FormControlLabel
                    value={AllocationStatus.NoLimits}
                    control={<Radio disableRipple />}
                    label="No Limits"
                  />
                  <FormControlLabel
                    value={AllocationStatus.Limited}
                    control={<Radio disableRipple />}
                    label="Limited"
                  />
                </Field>

                <FormItem name="allocationPerWallet" required sx={{ flex: 1 }}>
                  <OutlinedInput
                    sx={{ mt: 10 }}
                    disabled={values.allocationStatus === AllocationStatus.NoLimits}
                    endAdornment={
                      <>
                        <TokenImage alt={values.tokenToSymbol} src={values.tokenToLogoURI} size={24} />
                        <Typography sx={{ ml: 8 }}>{values.tokenToSymbol}</Typography>
                      </>
                    }
                  />
                </FormItem>
              </Box>

              <Stack direction="row" spacing={10} justifyContent="end">
                <Button
                  variant="outlined"
                  sx={{ width: 140 }}
                  onClick={() => {
                    window.history.back()
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit" variant="contained" sx={{ width: 140 }}>
                  Next
                </Button>
              </Stack>
            </Stack>
          )
        }}
      </Formik>
    </Box>
  )
}

export default Erc20EnglishAuctionParametersForm
