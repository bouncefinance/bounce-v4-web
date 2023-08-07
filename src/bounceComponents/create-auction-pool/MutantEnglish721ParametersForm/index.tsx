import { Button, Stack, Box, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { SetStateAction, useMemo } from 'react'
import * as Yup from 'yup'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { show } from '@ebay/nice-modal-react'
import ShowNFTCard from '../TokenERC1155InforationForm/components/NFTCard/ShowNFTCard'
import FakeOutlinedInput from '../FakeOutlinedInput'
import TokenDialog from '../TokenDialog'
import { ActionType, useAuctionInChain, useValuesDispatch, useValuesState } from '../ValuesProvider'
import FormItem from 'bounceComponents/common/FormItem'
import Tooltip from 'bounceComponents/common/Tooltip'
import TokenImage from 'bounceComponents/common/TokenImage'
import { Token } from 'bounceComponents/fixed-swap/type'
import { useActiveWeb3React } from 'hooks'
import BigNumber from 'bignumber.js'
import { ChainId } from 'constants/chain'
import NumberInput from 'bounceComponents/common/NumberInput'

interface FormValues {
  tokenToAddress: string
  tokenToSymbol: string
  tokenToLogoURI?: string
  tokenToDecimals: string | number
  priceFloor: string
  amountMinIncr1: string
}

const MutantEnglish721ParametersForm = (): JSX.Element => {
  const valuesState = useValuesState()
  console.log('🚀 ~ file: index.tsx:31 ~ MutantEnglish721ParametersForm ~ valuesState:', valuesState)
  const valuesDispatch = useValuesDispatch()
  const auctionChainId = useAuctionInChain()
  const { account } = useActiveWeb3React()

  const internalInitialValues: FormValues = {
    tokenToAddress: valuesState.tokenTo.address || '',
    tokenToSymbol: valuesState.tokenTo.symbol || '',
    tokenToLogoURI: valuesState.tokenTo.logoURI || '',
    tokenToDecimals: String(valuesState.tokenTo.decimals || ''),
    priceFloor: valuesState.priceFloor || '',
    amountMinIncr1: valuesState.amountMinIncr1 || ''
  }

  const validationSchema = Yup.object({
    tokenToSymbol: Yup.string().required('Funding currency is required'),
    priceFloor: Yup.string()
      .required('Price floor is required')
      .test('PRICE_FLOOR_CHECK', 'Price floor is required', value => !!value && new BigNumber(value).gt(0))
      .test('DIGITS_LESS_THAN_6', 'Should be no more than 6 digits after point', value => {
        const _value = new BigNumber(value || 0).toFixed()
        return !_value || !String(_value).includes('.') || String(_value).split('.')[1]?.length <= 6
      }),
    amountMinIncr1: Yup.string()
      .required('The minimum increase ratio is required')
      .test('range', 'Value must be between 1 and 100', value => {
        const numValue = parseFloat(value || '')
        return numValue >= 1 && numValue <= 100
      })
      .test('decimal', 'Invalid decimal format', value => {
        return /^(\d*\.?\d+|\d+\.?\d*)$/.test(value || '')
      })
      .test('decimal-places', 'Value must have at most 2 decimal places', value => {
        if (value && value.toString().split('.')[1]) {
          return value.toString().split('.')[1].length <= 2
        }
        return true
      })
  })

  const showTokenDialog = (
    chainId: ChainId,
    values: FormValues,
    setValues: (values: SetStateAction<FormValues>, shouldValidate?: boolean) => void
  ) => {
    show<Token>(TokenDialog, { enableEth: true, chainId, action: 2 })
      .then(res => {
        console.log('TokenDialog Resolved: ', res)
        setValues({
          ...values,
          tokenToAddress: res.address,
          tokenToSymbol: res.symbol?.toLocaleUpperCase() || '',
          tokenToLogoURI: decodeURIComponent(res.smallUrl || ''),
          tokenToDecimals: res.decimals
        })
      })
      .catch(err => {
        console.log('TokenDialog Rejected: ', err)
      })
  }

  const isOneNft = useMemo(() => valuesState.nft721TokenFrom.length === 1, [valuesState.nft721TokenFrom.length])

  return (
    <Box sx={{ mt: 52 }}>
      <Typography sx={{ color: 'var(--ps-gray-700)' }}>Mutant English Auction</Typography>
      <Typography variant="h2" sx={{ mt: 5, mb: 42 }}>
        Auction Parameters
      </Typography>
      <Formik
        initialValues={internalInitialValues}
        onSubmit={values => {
          console.log('on submit', values)
          const priceFloor = new BigNumber(values.priceFloor)
          if (!priceFloor.gt(0)) {
            return
          }
          valuesDispatch({
            type: ActionType.CommitAuctionParameters,
            payload: {
              tokenTo: {
                address: values.tokenToAddress,
                logoURI: values.tokenToLogoURI,
                symbol: values.tokenToSymbol,
                decimals: values.tokenToDecimals
              },
              priceFloor: values.priceFloor,
              amountMinIncr1: values.amountMinIncr1
            }
          })
        }}
        validationSchema={validationSchema}
      >
        {({ setValues, values, setFieldValue }) => {
          return (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: isOneNft ? '220px 1fr' : '1fr',
                gap: 50
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontSize: 16, mb: 8, display: 'flex', alignItems: 'flex-start' }}>
                  Auction Assets ({valuesState.nft721TokenFrom.length})
                  <Tooltip
                    title={
                      'If you choose multiple NFTs, it will be considered as a combination and will be auctioned together.'
                    }
                  >
                    <HelpOutlineIcon sx={{ ml: 4, color: '#878A8E' }} />
                  </Tooltip>
                </Typography>
                <Box display={'grid'} gridTemplateColumns={'1fr 1fr 1fr 1fr'} gap={10}>
                  {valuesState.nft721TokenFrom.map(item => (
                    <ShowNFTCard
                      hideClose
                      key={item.tokenId}
                      balance={item.balance}
                      name={item.name || item.contractName || ''}
                      tokenId={item.tokenId || ''}
                      image={item.image}
                      boxH={isOneNft ? 286 : 220}
                      imgH={isOneNft ? 220 : 170}
                      style={{
                        width: isOneNft ? 220 : '100%',
                        maxWidth: '100%'
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Stack component={Form} spacing={32} noValidate>
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

                  <Box>
                    <Typography variant="h3" sx={{ fontSize: 16, mb: 8 }}>
                      Price Floor (Bundle Price)
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={15}>
                      <FormItem name="priceFloor" placeholder="0.00" required sx={{ flex: 1 }}>
                        <NumberInput
                          placeholder="0.00"
                          value={values.priceFloor}
                          onUserInput={value => {
                            setFieldValue('priceFloor', value)
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

                  <Box>
                    <Typography variant="h3" sx={{ fontSize: 16, mb: 8 }}>
                      The minimum increase ratio
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={15}>
                      <FormItem name="amountMinIncr1" placeholder="0.00" required sx={{ flex: 1 }}>
                        <NumberInput
                          placeholder="0.00"
                          value={values.amountMinIncr1}
                          onUserInput={value => {
                            setFieldValue('amountMinIncr1', value)
                          }}
                          endAdornment={
                            <>
                              <Typography sx={{ mr: 8 }}>%</Typography>
                              <TokenImage alt={values.tokenToSymbol} src={values.tokenToLogoURI} size={24} />
                              <Typography sx={{ ml: 8 }}>{values.tokenToSymbol}</Typography>
                            </>
                          }
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
              </Box>
            </Box>
          )
        }}
      </Formik>
    </Box>
  )
}

export default MutantEnglish721ParametersForm
