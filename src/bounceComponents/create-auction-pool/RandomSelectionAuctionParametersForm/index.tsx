import { Button, Stack, Box, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { SetStateAction } from 'react'
import * as Yup from 'yup'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import BigNumber from 'bignumber.js'
import { show } from '@ebay/nice-modal-react'
import FakeOutlinedInput from '../FakeOutlinedInput'
import TokenDialog from '../TokenDialog'
import { ActionType, useAuctionInChain, useValuesDispatch, useValuesState } from '../ValuesProvider'
// import LogoSVG from 'assets/imgs/components/logo.svg'

import FormItem from 'bounceComponents/common/FormItem'
import Tooltip from 'bounceComponents/common/Tooltip'
import TokenImage from 'bounceComponents/common/TokenImage'
import { ChainId } from 'constants/chain'
import { useActiveWeb3React } from 'hooks'
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
  swapRatio: string
  winnerNumber: number | string
  ticketPrice: number | string
  maxParticipantAllowed: number | string
}

const RandomSelectionAuctionParametersForm = (): JSX.Element => {
  const { account } = useActiveWeb3React()
  const auctionInChainId = useAuctionInChain()
  const isSm = useBreakpoint('sm')
  const validationSchema = Yup.object({
    tokenToSymbol: Yup.string()
      .required('Token is required')
      .test(
        'DIFFERENT_TOKENS',
        'Please choose a different token',
        (_, context) => context.parent.tokenFromAddress !== context.parent.tokenToAddress
      ),
    swapRatio: Yup.number()
      .positive('Swap ratio must be positive')
      .typeError('Please input valid number')
      .test('DIGITS_LESS_THAN_6', 'Should be no more than 6 digits after point', value => {
        const _value = new BigNumber(value || 0).toFixed()
        return !_value || !String(_value).includes('.') || String(_value).split('.')[1]?.length <= 6
      })
      .required('Swap ratio is required'),
    ticketPrice: Yup.number()
      .positive('ticket price must be positive')
      .typeError('Please input valid number')
      .test('DIGITS_LESS_THAN_6', 'Should be no more than 6 digits after point', value => {
        const _value = new BigNumber(value || 0).toFixed()
        return !_value || !String(_value).includes('.') || String(_value).split('.')[1]?.length <= 6
      })
      .required('Swap ratio is required'),
    winnerNumber: Yup.number()
      .integer('Number of Winners must be an integer')
      .positive('Number of Winners must be positive')
      .typeError('Please input valid number')
      .required('Number of winners is required'),
    maxParticipantAllowed: Yup.number()
      .max(10000, 'max participant allowed must be less than or equal to 10000')
      .test(
        'MORE_THAN_WINNERS',
        'max participant allowed must be more than or equal to number of winners',
        (val, ctx) => {
          const winnerNumber = ctx.parent.winnerNumber
          if (val && Number(val) < Number(winnerNumber)) {
            return false
          }
          return true
        }
      )
      .integer('max participant allowed must be an integer')
      .positive('max participant allowed must be positive')
      .typeError('Please input valid number')
      .required('max participant allowed is required')
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
    winnerNumber: valuesState.winnerNumber || '0',
    ticketPrice: valuesState.ticketPrice || '0',
    maxParticipantAllowed: valuesState.maxParticipantAllowed || '0',
    swapRatio: valuesState.swapRatio || ''
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
    <Box sx={{ mt: 52, px: isSm ? 16 : 0 }}>
      <Typography sx={{ color: 'var(--ps-gray-700)' }}>Random Selection</Typography>
      <Typography sx={{ mt: 5, mb: 42 }} variant="h2">
        Auction Parameters
      </Typography>

      <Formik
        initialValues={internalInitialValues}
        onSubmit={values => {
          console.log('on submit123>>>', values)
          valuesDispatch({
            type: ActionType.CommitRandomSelectionAuctionParameters,
            payload: {
              tokenTo: {
                chainId: auctionInChainId,
                address: values.tokenToAddress,
                logoURI: values.tokenToLogoURI,
                symbol: values.tokenToSymbol,
                decimals: values.tokenToDecimals
              },
              ticketPrice: values.ticketPrice,
              winnerNumber: values.winnerNumber,
              maxParticipantAllowed: values.maxParticipantAllowed,
              swapRatio: values.swapRatio
            }
          })
        }}
        validationSchema={validationSchema}
      >
        {({ setValues, values, setFieldValue }) => {
          return (
            <Stack component={Form} spacing={32} noValidate>
              {/* <Alert severity="warning" sx={{ borderRadius: 20 }}>
                <Typography variant="body1">
                  Bounce protocol does not support inflationary and deflationary tokens.
                </Typography>
              </Alert> */}
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
              {/* Number Of Winners */}
              <Box>
                <Typography variant="h3" sx={{ fontSize: 16, mb: 8 }}>
                  Number Of Winners
                </Typography>
                <Stack direction="row" alignItems="center" spacing={15}>
                  <FormItem name="winnerNumber" placeholder="1" required sx={{ flex: 1 }}>
                    <NumberInput
                      value={values.winnerNumber + ''}
                      onUserInput={value => {
                        setFieldValue('winnerNumber', value)
                      }}
                    />
                  </FormItem>
                </Stack>
              </Box>
              {/* Token Per Ticket */}
              <Box>
                <Typography variant="h3" sx={{ fontSize: 16, mb: 8 }}>
                  Token Per Ticket
                </Typography>

                <Stack direction="row" alignItems="center" spacing={15}>
                  <Typography>1 Ticket =</Typography>

                  <FormItem name="swapRatio" placeholder="0.00" required sx={{ flex: 1 }}>
                    <NumberInput
                      value={values.swapRatio}
                      onUserInput={value => {
                        setFieldValue('swapRatio', value)
                      }}
                      endAdornment={
                        <>
                          <TokenImage alt={values.tokenFromSymbol} src={values.tokenFromLogoURI} size={24} />
                          <Typography sx={{ ml: 8 }}>{values.tokenFromSymbol}</Typography>
                        </>
                      }
                    />
                  </FormItem>
                </Stack>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '20px 0'
                  }}
                >
                  <Typography>Total amount of token for auction</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexFlow: 'row nowrap',
                      justifyContent: 'flex-end',
                      alignItems: 'center'
                    }}
                  >
                    <Typography sx={{ mr: 8 }}>
                      {values.winnerNumber && values.swapRatio
                        ? new BigNumber(values.winnerNumber).times(values.swapRatio).toString()
                        : '-'}
                    </Typography>
                    <TokenImage alt={values.tokenFromSymbol} src={values.tokenFromLogoURI} size={24} />
                    <Typography sx={{ ml: 8 }}>{values.tokenFromSymbol}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Ticket Price */}
              <Box>
                <Stack direction="row" spacing={8} sx={{ mb: 20 }}>
                  <Typography variant="h3" sx={{ fontSize: 16 }}>
                    Ticket Price
                  </Typography>
                  <Tooltip title="Ticket price is not price per unit token">
                    <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                  </Tooltip>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={15}>
                  <FormItem name="ticketPrice" placeholder="0.00" required sx={{ flex: 1 }}>
                    <NumberInput
                      value={values.ticketPrice + ''}
                      onUserInput={value => {
                        setFieldValue('ticketPrice', value)
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
                <Typography sx={{ margin: '20px 0' }}>Unit price of one token</Typography>
              </Box>

              {/* Max Participant Allowed */}
              <Box>
                <Stack direction="row" spacing={8} sx={{ mb: 20 }}>
                  <Typography variant="h3" sx={{ fontSize: 16 }}>
                    Max Participant Allowed (Max 10,000)
                  </Typography>
                  <Tooltip title="The maximum nubmer is 10.000 participants and must more than nunber of winners ">
                    <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                  </Tooltip>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={15}>
                  <FormItem name="maxParticipantAllowed" placeholder="1" required sx={{ flex: 1 }}>
                    <NumberInput
                      value={values.maxParticipantAllowed + ''}
                      onUserInput={value => {
                        setFieldValue('maxParticipantAllowed', value)
                      }}
                    />
                  </FormItem>
                </Stack>
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

export default RandomSelectionAuctionParametersForm
