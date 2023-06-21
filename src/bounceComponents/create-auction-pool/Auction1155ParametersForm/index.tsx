import { Button, Stack, OutlinedInput, Box, Typography, FormControlLabel } from '@mui/material'

import { Field, Form, Formik } from 'formik'
import { SetStateAction } from 'react'
import * as Yup from 'yup'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { show } from '@ebay/nice-modal-react'

import ShowNFTCard from '../TokenERC1155InforationForm/components/NFTCard/ShowNFTCard'
import { AllocationStatus } from '../types'
import FakeOutlinedInput from '../FakeOutlinedInput'
import TokenDialog from '../TokenDialog'
import { ActionType, useAuctionInChain, useValuesDispatch, useValuesState } from '../ValuesProvider'
import Radio from '../Radio'
import RadioGroupFormItem from '../RadioGroupFormItem'
import FormItem from 'bounceComponents/common/FormItem'
import Tooltip from 'bounceComponents/common/Tooltip'
import TokenImage from 'bounceComponents/common/TokenImage'
import EmptyNFTIcon from 'bounceComponents/create-auction-pool/TokenERC1155InforationForm/components/NFTCard/emptyNFTIcon.png'
import { ChainId } from 'constants/chain'
import { Token } from 'bounceComponents/fixed-swap/type'
import { useActiveWeb3React } from 'hooks'
import { useERC1155Balance } from 'hooks/useNFTTokenBalance'

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
  poolSize: string
  allocationStatus: AllocationStatus
  allocationPerWallet: string
}
const toFixed = (x: number) => {
  if (Math.abs(x) < 1.0) {
    const e = parseInt(`${x}`.split('e-')[1])
    if (e) {
      x *= Math.pow(10, e - 1)
      return '0.' + new Array(e).join('0') + `${x}`.substring(2)
    }
  } else {
    let e = parseInt(`${x}`.split('+')[1])
    if (e > 20) {
      e -= 20
      x /= Math.pow(10, e)
      return x + new Array(e + 1).join('0')
    }
  }
  return x
}
const Auction1155ParametersForm = (): JSX.Element => {
  const valuesState = useValuesState()
  const valuesDispatch = useValuesDispatch()
  const auctionChainId = useAuctionInChain()
  const { account } = useActiveWeb3React()
  const balance1155 = useERC1155Balance(
    valuesState.nftTokenFrom.contractAddr,
    account || undefined,
    valuesState.nftTokenFrom.tokenId,
    auctionChainId
  )

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
      .required('Swap ratio is required')
      .test('NO_MORE_6_DIGITS', 'Should be no more than 6 digits after point', value => {
        const strArr = String(toFixed(value || 0)).split('.')
        if (strArr.length === 2 && strArr[1].length > 6) return false
        return true
      }),
    poolSize: Yup.number()
      .integer()
      // .typeError('Please input valid number')
      // .positive('Swap ratio must be positive')
      .required('Amount is required')
      .test('NOT_ZERO', 'Pool size must be greater than 0', value => {
        if (Number(value) <= 0) return false
        return true
      })
      .test(
        'POOL_SIZE_LESS_THAN_BALANCE',
        'Pool size cannot be greater than your balance',
        value => !value || !!(balance1155 && Number(value) <= Number(balance1155.toString()))
      ),
    allocationStatus: Yup.string().oneOf(Object.values(AllocationStatus)),
    allocationPerWallet: Yup.number()
      .when('allocationStatus', {
        is: AllocationStatus.Limited,
        then: Yup.number()
          .integer()
          .typeError('Please input valid number')
          .required('Allocation per wallet is required')
      })
      .when('allocationStatus', {
        is: AllocationStatus.Limited,
        then: Yup.number()
          .integer()
          .typeError('Please input valid number')
          .test(
            'GREATER_THAN_POOL_SIZE',
            'Allocation per wallet cannnot be greater than pool size times swap ratio',
            (value, context) =>
              !context.parent.poolSize || !context.parent.swapRatio || (value || 0) <= context.parent.poolSize
          )
      })
  })

  const internalInitialValues: FormValues = {
    tokenFromAddress: valuesState.nftTokenFrom.contractAddr || '',
    tokenFromSymbol: valuesState.nftTokenFrom.contractName || '',
    tokenFromLogoURI: valuesState.nftTokenFrom.image || '',
    tokenFromDecimals: '',
    tokenToAddress: valuesState.tokenTo.address || '',
    tokenToSymbol: valuesState.tokenTo.symbol || '',
    tokenToLogoURI: valuesState.tokenTo.logoURI || '',
    tokenToDecimals: String(valuesState.tokenTo.decimals || ''),
    swapRatio: valuesState.swapRatio || '0.00',
    poolSize: valuesState.poolSize || '',
    allocationStatus: valuesState.allocationStatus || AllocationStatus.NoLimits,
    allocationPerWallet: valuesState.allocationPerWallet || ''
  }

  const showTokenDialog = (
    chainId: ChainId,
    values: FormValues,
    setValues: (values: SetStateAction<FormValues>, shouldValidate?: boolean) => void
  ) => {
    show<Token>(TokenDialog, { enableEth: true, chainId: auctionChainId })
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
    <Box sx={{ mt: 52, px: { xs: 16, md: 0 } }}>
      <Typography variant="h2">Auction Parameters</Typography>
      <Typography sx={{ color: 'var(--ps-gray-700)', mt: 5, mb: 42 }}>Fixed Swap Auction</Typography>
      <Formik
        initialValues={internalInitialValues}
        onSubmit={values => {
          console.log('on submit', values)
          valuesDispatch({
            type: ActionType.CommitAuctionParameters,
            payload: {
              tokenTo: {
                address: values.tokenToAddress,
                logoURI: values.tokenToLogoURI,
                symbol: values.tokenToSymbol,
                decimals: values.tokenToDecimals
              },
              swapRatio: values.swapRatio,
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
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                flexDirection: { xs: 'column', md: 'row' }
              }}
            >
              <ShowNFTCard
                balance={valuesState.nftTokenFrom.balance}
                name={valuesState.nftTokenFrom.name || valuesState.nftTokenFrom.contractName || ''}
                tokenId={valuesState.nftTokenFrom.tokenId || ''}
                image={valuesState.nftTokenFrom.image}
                hideClose={true}
              />
              <Box
                sx={{
                  flex: 1,
                  marginLeft: { xs: 0, md: 50 },
                  marginTop: { xs: 20, md: 0 }
                }}
              >
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
                      <Tooltip title="Please do not select deflationary or inflationary token.">
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
                          disabled
                          onClick={() => {
                            if (account) {
                              showTokenDialog(auctionChainId, values, setValues)
                            }
                          }}
                        />
                      </FormItem>
                    </Stack>
                  </Box>

                  {/* Swap Ratio */}
                  <Box>
                    <Stack direction="row" spacing={8} sx={{ mb: 20 }}>
                      <Typography variant="h3" sx={{ fontSize: 16 }}>
                        Unit Price
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={15}>
                      <FormItem name="swapRatio" placeholder="0.00" required sx={{ flex: 1 }}>
                        <OutlinedInput
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

                  {/* Pool Size */}
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 8 }}>
                      <Stack direction="row" spacing={8}>
                        <Typography variant="h3" sx={{ fontSize: 16 }}>
                          Amount
                        </Typography>

                        <Tooltip title="The amount of NFTs that you want to put in for auction.">
                          <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                        </Tooltip>
                      </Stack>

                      <Typography>Balance: {`${balance1155 || '-'} ${values.tokenFromSymbol}`}</Typography>
                    </Stack>

                    <FormItem name="poolSize" placeholder="0.00" required sx={{ flex: 1 }}>
                      <OutlinedInput
                        endAdornment={
                          <>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ mr: 20, minWidth: 60 }}
                              disabled={!balance1155}
                              onClick={() => {
                                setFieldValue('poolSize', balance1155 || '0')
                              }}
                            >
                              Max
                            </Button>
                            <TokenImage
                              alt={'nft collection'}
                              src={valuesState.nftTokenFrom.image || EmptyNFTIcon}
                              size={24}
                            />
                            <Typography sx={{ ml: 8 }}>{valuesState.nftTokenFrom.contractName}</Typography>
                            {/* <TokenImage alt={values.tokenFromSymbol} src={values.tokenFromLogoURI} size={24} />
                            <Typography sx={{ ml: 8 }}>{values.tokenFromSymbol}</Typography> */}
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

                      <Tooltip title="You can set a maximum allocation per wallet to prevent monopoly activities during the auction progress.">
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
                    {values.allocationStatus === AllocationStatus.Limited && (
                      <FormItem name="allocationPerWallet" required sx={{ flex: 1 }}>
                        <OutlinedInput
                          sx={{ mt: 10 }}
                          // disabled={values.allocationStatus === AllocationStatus.NoLimits}
                          endAdornment={
                            <>
                              {/* <TokenImage alt={values.tokenToSymbol} src={values.tokenToLogoURI} size={24} />
                            <Typography sx={{ ml: 8 }}>{values.tokenToSymbol}</Typography> */}
                              <TokenImage
                                alt={'nft collection'}
                                src={valuesState.nftTokenFrom.image || EmptyNFTIcon}
                                size={24}
                              />
                              <Typography sx={{ ml: 8 }}>{valuesState.nftTokenFrom.contractName}</Typography>
                            </>
                          }
                        />
                      </FormItem>
                    )}
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
              </Box>
            </Box>
          )
        }}
      </Formik>
    </Box>
  )
}

export default Auction1155ParametersForm
