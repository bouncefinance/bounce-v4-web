import { useState } from 'react'
import { Button, Stack, Box, Typography, ButtonBase } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { show } from '@ebay/nice-modal-react'
import { ActionType, useAuctionInChain, useValuesDispatch, useValuesState } from '../ValuesProvider'
import ShowNFTCard from './components/NFTCard/ShowNFTCard'
import TokenDialog from './components/TokenDialog/index'
import { UserNFTCollection } from 'api/user/type'
// import { ReactComponent as ChainIcon } from 'assets/imgs/auction/chain.svg'
import { useActiveWeb3React } from 'hooks'
import { ChainId } from 'constants/chain'
import { getEtherscanLink } from 'utils'
// import { ReactComponent as ChainLightIcon } from 'assets/imgs/auction/chain-light.svg'
import EmptyCard from 'bounceComponents/create-auction-pool/TokenERC1155InforationForm/components/NFTCard/EmptyCard'

interface FormValues {
  contractAddr: string
  contractName: string
  tokenId: string
  balance: string
  name: string
  description: string
  image: string
}

const TokenInformationForm = (): JSX.Element => {
  // const [chainTypeTitle, setChainTypeTitle] = useState('')
  const validationSchema = Yup.object({
    tokenId: Yup.string().required('Token is required')
  })
  const auctionInChainId = useAuctionInChain()

  const values = useValuesState()
  const valuesDispatch = useValuesDispatch()

  const internalInitialValues: FormValues = {
    contractAddr: values.nftTokenFrom.contractAddr || '',
    contractName: values.nftTokenFrom.contractName || '',
    tokenId: values.nftTokenFrom.tokenId || '',
    balance: values.nftTokenFrom.balance || '',
    name: values.nftTokenFrom.name || '',
    description: values.nftTokenFrom.description || '',
    image: values.nftTokenFrom.image || ''
  }

  const { account } = useActiveWeb3React()
  const [resultNft, setResultNft] = useState<UserNFTCollection | null>(null)

  const showTokenDialog = (_: ChainId, setValues: (values: any, shouldValidate?: boolean) => void) => {
    show<UserNFTCollection>(TokenDialog, { chainId: auctionInChainId, enableEth: false })
      .then(res => {
        console.log('TokenDialog Resolved: ', res)
        const { contractAddr, contractName, tokenId, balance, name, description, image } = res
        setResultNft(res)
        setValues({
          contractAddr,
          contractName,
          tokenId,
          balance,
          name,
          description,
          image
        })
      })
      .catch(err => {
        console.log('TokenDialog Rejected: ', err)
      })
  }

  return (
    <Box sx={{ mt: 52, px: { xs: 16, md: 0 } }}>
      <Box>
        <Typography sx={{ color: 'var(--ps-gray-700)' }}>Fixed Swap Auction</Typography>
        <Typography sx={{ mt: 5, mb: 54 }} variant="h2">
          Please select ERC-1155 NFT
        </Typography>
        <Formik
          initialValues={internalInitialValues}
          onSubmit={values => {
            valuesDispatch({
              type: ActionType.CommitToken1155Information,
              payload: {
                nftTokenFrom: {
                  contractAddr: values.contractAddr,
                  contractName: values.contractName,
                  tokenId: values.tokenId,
                  balance: values.balance,
                  name: values.name,
                  description: values.description,
                  image: values.image
                }
              }
            })
          }}
          validationSchema={validationSchema}
        >
          {({ setValues, values }) => {
            return (
              <Stack component={Form} spacing={20} noValidate>
                {resultNft ? (
                  <ShowNFTCard
                    balance={resultNft.balance}
                    name={resultNft.name || resultNft.contractName || ''}
                    tokenId={resultNft.tokenId || ''}
                    image={resultNft.image}
                    handleClear={() => {
                      setResultNft(null)
                    }}
                    style={{
                      marginBottom: '65px'
                    }}
                  />
                ) : (
                  <EmptyCard
                    width={220}
                    height={286}
                    onClick={() => {
                      if (account && auctionInChainId) {
                        showTokenDialog(auctionInChainId, setValues)
                      }
                    }}
                  ></EmptyCard>
                )}
                <Stack sx={{ flexDirection: { xs: 'column', md: 'row' } }} spacing={10} justifyContent="space-between">
                  <ButtonBase sx={{ width: 'fit-content', textDecorationLine: 'underline' }} disabled={!values.tokenId}>
                    <a
                      href={getEtherscanLink(auctionInChainId, values.contractAddr, 'token')}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Typography sx={{ color: 'var(--ps-gray-700)' }}>View on explorer</Typography>
                    </a>
                  </ButtonBase>
                  <Box>
                    <Button
                      variant="outlined"
                      sx={{ width: 140, marginRight: '15px' }}
                      onClick={() => {
                        history.back()
                      }}
                    >
                      Cancel
                    </Button>
                    <Button disabled={!resultNft} type="submit" variant="contained" sx={{ width: 140 }}>
                      Next
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            )
          }}
        </Formik>
      </Box>
    </Box>
  )
}

export default TokenInformationForm
