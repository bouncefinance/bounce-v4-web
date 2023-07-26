import { Button, Stack, Box, Typography, ButtonBase } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { show } from '@ebay/nice-modal-react'
import TokenDialog from '../TokenDialog'
import FakeOutlinedInput from '../FakeOutlinedInput'
import { ActionType, useAuctionInChain, useValuesDispatch, useValuesState } from '../ValuesProvider'
import FormItem from 'bounceComponents/common/FormItem'
// import ErrorSVG from 'assets/imgs/icon/error_filled.svg'
import TokenImage from 'bounceComponents/common/TokenImage'
import { useActiveWeb3React } from 'hooks'
import { ChainId } from 'constants/chain'
import { getEtherscanLink } from 'utils'
import { Token } from 'bounceComponents/fixed-swap/type'
import useBreakpoint from 'hooks/useBreakpoint'

interface FormValues {
  tokenFromAddress: string
  tokenFromSymbol: string
  tokenFromLogoURI?: string
  tokenFromDecimals: string | number
}

const TokenInformationForm = ({ title }: { title?: string }): JSX.Element => {
  const validationSchema = Yup.object({
    tokenFromSymbol: Yup.string().required('Token is required')
  })

  const values = useValuesState()
  const valuesDispatch = useValuesDispatch()

  const internalInitialValues: FormValues = {
    tokenFromAddress: values.tokenFrom.address || '',
    tokenFromSymbol: values.tokenFrom.symbol || '',
    tokenFromLogoURI: values.tokenFrom.logoURI || '',
    tokenFromDecimals: values.tokenFrom.decimals || ''
  }

  const { account } = useActiveWeb3React()
  const auctionInChainId = useAuctionInChain()
  const isSm = useBreakpoint('sm')
  const showTokenDialog = (chainId: ChainId, setValues: (values: any, shouldValidate?: boolean) => void) => {
    show<Token>(TokenDialog, { chainId, action: 1 })
      .then(res => {
        console.log('TokenDialog Resolved: ', res)
        setValues({
          tokenFromAddress: res.address,
          tokenFromSymbol: res.symbol,
          tokenFromLogoURI: decodeURIComponent(res.smallUrl || ''),
          tokenFromDecimals: res.decimals
        })
      })
      .catch(err => {
        console.log('TokenDialog Rejected: ', err)
      })
  }

  return (
    <Box sx={{ mt: 52, padding: isSm ? '0 16px' : 'auto' }}>
      <Typography variant="h2">Token Information</Typography>
      <Typography sx={{ color: 'var(--ps-gray-700)', mt: 5, mb: 42 }}>
        {title ? title : 'Fixed Swap Auction'}
      </Typography>
      <Formik
        initialValues={internalInitialValues}
        onSubmit={values => {
          valuesDispatch({
            type: ActionType.CommitTokenImformation,
            payload: {
              tokenFrom: {
                chainId: auctionInChainId,
                address: values.tokenFromAddress,
                logoURI: values.tokenFromLogoURI,
                symbol: values.tokenFromSymbol,
                decimals: values.tokenFromDecimals
              }
            }
          })
        }}
        validationSchema={validationSchema}
      >
        {({ setValues, values }) => {
          return (
            <Stack component={Form} spacing={20} noValidate>
              <FormItem
                name="tokenFromSymbol"
                label="Select a token"
                required
                startAdornment={<TokenImage alt={values.tokenFromSymbol} src={values.tokenFromLogoURI} size={32} />}
              >
                <FakeOutlinedInput
                  readOnly
                  onClick={() => {
                    if (account && auctionInChainId) {
                      showTokenDialog(auctionInChainId, setValues)
                    }
                  }}
                />
              </FormItem>

              <FormItem name="tokenFromAddress" label="Token Contract address">
                <FakeOutlinedInput disabled />
              </FormItem>

              <FormItem name="tokenFromDecimals" label="Token decimal">
                <FakeOutlinedInput disabled />
              </FormItem>

              <ButtonBase
                sx={{ width: 'fit-content', textDecorationLine: 'underline' }}
                disabled={!values.tokenFromAddress}
              >
                <a
                  href={
                    auctionInChainId ? getEtherscanLink(auctionInChainId, values.tokenFromAddress, 'token') : undefined
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {auctionInChainId && values.tokenFromAddress && (
                    <Typography sx={{ color: 'var(--ps-gray-700)' }}>View on explorer</Typography>
                  )}
                </a>
              </ButtonBase>

              <Stack direction="row" spacing={10} justifyContent="end">
                <Button
                  variant="outlined"
                  sx={{ width: 140 }}
                  onClick={() => {
                    window.history.go(-1)
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

export default TokenInformationForm
