import { useMemo, useState } from 'react'
import { Button, Stack, Box, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { show } from '@ebay/nice-modal-react'
import { ActionType, useAuctionInChain, useValuesDispatch, useValuesState } from '../ValuesProvider'
import ShowNFTCard from 'bounceComponents/create-auction-pool/TokenERC1155InforationForm/components/NFTCard/ShowNFTCard'
import Token721Dialog from './components/Token721Dialog/index'
import { UserNFTCollection } from 'api/user/type'
import { useActiveWeb3React } from 'hooks'
import { ChainId } from 'constants/chain'
import ErrorIcon from '@mui/icons-material/Error'
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
    // tokenId: Yup.string().required('Token is required')
  })
  const auctionInChainId = useAuctionInChain()

  const values = useValuesState()
  const valuesDispatch = useValuesDispatch()

  const internalInitialValues: FormValues[] = useMemo(() => {
    return (
      values.nft721TokenFrom?.map(item => ({
        contractAddr: item.contractAddr || '',
        contractName: item.contractName || '',
        tokenId: item.tokenId || '',
        balance: item.balance || '',
        name: item.name || '',
        description: item.description || '',
        image: item.image || ''
      })) || []
    )
  }, [values.nft721TokenFrom])

  const { account } = useActiveWeb3React()
  const [resultNft, setResultNft] = useState<UserNFTCollection[]>(internalInitialValues)

  const showTokenDialog = (_: ChainId, setValues: (values: any, shouldValidate?: boolean) => void) => {
    show<UserNFTCollection[]>(Token721Dialog, { chainId: auctionInChainId, enableEth: false, maximumSelection: 10 })
      .then(res => {
        console.log('TokenDialog Resolved: ', res)
        setResultNft(res)
        setValues(res)
      })
      .catch(err => {
        console.log('TokenDialog Rejected: ', err)
      })
  }

  return (
    <Box sx={{ mt: 52 }}>
      <Box>
        <Typography sx={{ color: 'var(--ps-gray-700)' }}>English Auction</Typography>
        <Typography sx={{ mt: 5, mb: 24 }} variant="h2">
          Bundle NFTs for one auction
        </Typography>
        <Formik
          initialValues={internalInitialValues}
          onSubmit={values => {
            valuesDispatch({
              type: ActionType.CommitToken721Information,
              payload: {
                nft721TokenFrom: values
              }
            })
          }}
          validationSchema={validationSchema}
        >
          {({ setValues }) => {
            return (
              <Stack component={Form} spacing={20} noValidate>
                <Box
                  sx={{
                    height: 380,
                    overflowY: 'auto',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gap: 10
                  }}
                >
                  {resultNft.map((item, idx) => (
                    <ShowNFTCard
                      key={item.tokenId}
                      balance={item.balance}
                      name={item.name || item.contractName || ''}
                      tokenId={item.tokenId || ''}
                      image={item.image}
                      handleClear={() => {
                        const _list = [...resultNft]
                        _list.splice(idx, 1)
                        setResultNft(_list)
                        setValues(_list as FormValues[])
                      }}
                      boxH={220}
                      imgH={170}
                      style={{
                        width: '100%'
                      }}
                    />
                  ))}
                  {Array.from(new Array(10 - resultNft.length || 0)).map((_, index) => (
                    <EmptyCard
                      key={index + '_'}
                      disabled={index !== 0}
                      onClick={() => {
                        if (account && auctionInChainId) {
                          showTokenDialog(auctionInChainId, setValues)
                        }
                      }}
                    />
                  ))}
                </Box>
                <Stack direction="row" spacing={10} justifyContent="space-between" alignItems={'end'}>
                  <Box>
                    <Typography mb={10}>
                      {resultNft.length} <span style={{ color: '#C4C4C4' }}>/ 10</span>
                    </Typography>
                    <Button disabled variant="outlined" sx={{ fontSize: 12, height: 44 }}>
                      <ErrorIcon /> &nbsp; You can bundle up to 10 NFTs for one auction
                    </Button>
                  </Box>
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
                    <Button disabled={!resultNft.length} type="submit" variant="contained" sx={{ width: 140 }}>
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
