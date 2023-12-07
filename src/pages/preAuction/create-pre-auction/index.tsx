import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  MenuItem,
  Stack,
  Typography,
  Select,
  FormHelperText,
  TextField,
  InputAdornment
} from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormItem from 'bounceComponents/common/FormItem'
import RoundedContainer from 'bounceComponents/create-auction-pool/RoundedContainer'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { useQueryParams } from 'hooks/useQueryParams'
import { ChainId, ChainList, ChainListMap } from 'constants/chain'
import { useActiveWeb3React } from 'hooks'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { AuctionType, TokenType } from 'bounceComponents/create-auction-pool/types'
import { useAuctionConfigList } from 'hooks/useAuctionConfig'
import { useUserInfo, useShowLoginModal } from 'state/users/hooks'
import { useOptionDatas } from 'state/configOptions/hooks'
import Image from 'components/Image'
import useBreakpoint from 'hooks/useBreakpoint'
import { IS_TEST_ENV } from '../../../constants'

const validationSchema = Yup.object({
  // auctionType: Yup.string().required('Auction Type is required')
})

const initialValues = {
  // auctionType: 'fixed-price'
}

const CreatePreAuctionPage = () => {
  const navigate = useNavigate()
  const { redirect } = useQueryParams()
  const { account, chainId } = useActiveWeb3React()
  const { userId, userInfo } = useUserInfo()
  const showLoginModal = useShowLoginModal()
  const { chainInfoOpt } = useOptionDatas()
  const switchNetwork = useSwitchNetwork()
  const [curTokenType, setCurTokenType] = useState<TokenType | undefined>(TokenType.ERC20)
  const [curAuctionType, setCurAuctionType] = useState<AuctionType | undefined>(AuctionType.FIXED_PRICE)
  const [enabledTokenType, enabledAuctionType] = useAuctionConfigList(chainId || undefined, curTokenType)
  const isSm = useBreakpoint('sm')
  const handleCancel = () => {
    window.history.go(-1)
  }

  useEffect(() => {
    if (curTokenType && !enabledTokenType.includes(curTokenType)) {
      setCurTokenType(undefined)
    }
    if (curAuctionType && !enabledAuctionType.includes(curAuctionType)) {
      setCurAuctionType(undefined)
    }
  }, [curAuctionType, curTokenType, enabledAuctionType, enabledTokenType])

  const handleSubmit = () => {
    if (!curAuctionType || !curTokenType || !chainId) return
    navigate(`${routes.auction.createAuctionPool}/${curAuctionType}/${chainId}/${curTokenType}?redirect=${redirect}`)
  }

  const [addressFieldValue, setAddressFieldValue] = useState('')

  useEffect(() => {
    if (!account) {
      return setAddressFieldValue('')
    }

    setAddressFieldValue(account)
  }, [account])

  const menuList = useMemo(() => {
    const supportIds = chainInfoOpt?.map(i => i.ethChainId) || []
    return ChainList.filter(item => supportIds.includes(item.id)).map(item => (
      <MenuItem
        sx={{
          padding: '10px 15px'
        }}
        key={item.id}
        value={item.id}
      >
        <Box display={'flex'} alignItems="center">
          <Image width="20px" src={item.logo} />
          <Typography ml={10} fontSize={16}>
            {item.name}
          </Typography>
        </Box>
      </MenuItem>
    ))
  }, [chainInfoOpt])

  return (
    <section>
      <RoundedContainer maxWidth="md">
        <Stack alignItems="center">
          <Box
            sx={{
              py: 60,
              maxWidth: 540,
              '@media(max-width:600px)': {
                padding: '60px 16px 16px'
              }
            }}
          >
            <Typography variant="h1" sx={{ mb: 48, fontSize: isSm ? 28 : 36, whiteSpace: 'nowrap' }}>
              Create New Pre-Auction Activity
            </Typography>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
              <Stack component={Form} spacing={20}>
                <Typography variant="h3">Select Creation Type</Typography>

                <FormItem error={!account}>
                  <Select<ChainId>
                    value={chainId}
                    displayEmpty
                    onChange={event => {
                      if (account) {
                        switchNetwork(Number(event.target.value))
                      } else {
                        showLoginModal()
                      }
                    }}
                    renderValue={value => {
                      if (!value) {
                        return <em>Not Connected</em>
                      }
                      return (
                        <Box display={'flex'} alignItems="center">
                          <Image width="32px" src={value ? ChainListMap[value]?.logo || '' : ''} />
                          <Box ml={10}>
                            <Typography fontSize={12} color={'var(--ps-gray-700)'}>
                              Select Chain
                            </Typography>
                            <Typography>{chainId ? ChainListMap[chainId]?.name : ''}</Typography>
                          </Box>
                        </Box>
                      )
                    }}
                  >
                    {menuList}
                  </Select>
                  {!account && <FormHelperText error={!account}>Please connect to your wallet</FormHelperText>}
                </FormItem>

                <FormItem label="Token Type" required error={!curTokenType}>
                  <Select
                    disabled={!chainId}
                    value={curTokenType}
                    onChange={e => {
                      setCurTokenType(e.target.value as TokenType)
                    }}
                  >
                    {Object.values(TokenType).map(val => (
                      <MenuItem value={val} key={val} disabled={!enabledTokenType.includes(val)}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormItem>

                <FormItem label="Auction Type" required error={!curAuctionType}>
                  <Select
                    value={curAuctionType}
                    onChange={e => {
                      setCurAuctionType(e.target.value as AuctionType)
                    }}
                  >
                    {Object.values(AuctionType).map(val => (
                      <MenuItem value={val} key={val} disabled={!enabledAuctionType.includes(val)}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormItem>

                <TextField
                  label="Wallet for creation"
                  variant="outlined"
                  onClick={() => !account && showLoginModal()}
                  value={addressFieldValue}
                  inputProps={{ readOnly: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', columnGap: 10 }}
                        >
                          {account ? (
                            <Box
                              sx={{
                                px: 12,
                                py: 4,
                                height: 26,
                                color: '#2DAB50',
                                background: '#E4FFEC',
                                borderRadius: 20
                              }}
                            >
                              Linked √
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                px: 12,
                                py: 4,
                                height: 26,
                                color: '#F53030',
                                background: '#FFF4F5',
                                borderRadius: 20
                              }}
                            >
                              Not connected X
                            </Box>
                          )}
                        </Box>
                      </InputAdornment>
                    )
                  }}
                />

                <Typography sx={{ color: 'var(--ps-gray-700)', pt: 12, pb: 20 }}>
                  A fixed price auction, is a type of auction where the price for the assets being auctioned is
                  pre-determined and agreed upon by the auctioneer and participants. This type of auction is typically
                  used when the auctioneer has a specific value target for the assets being sold.
                </Typography>

                <Stack direction="row" spacing={10} justifyContent="end">
                  {/* && userInfo?.twitterName */}
                  {account && userId && userInfo?.email && (userInfo?.twitterName || IS_TEST_ENV) ? (
                    <>
                      <Button variant="outlined" sx={{ width: 140 }} onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained" sx={{ width: 140 }} disabled={!account}>
                        Next
                      </Button>
                    </>
                  ) : !userId ? (
                    <Button variant="contained" sx={{ width: 140 }} onClick={showLoginModal}>
                      Login
                    </Button>
                  ) : !userInfo?.email || (!userInfo?.twitterName && !IS_TEST_ENV) ? (
                    <Button
                      variant="contained"
                      sx={{ width: 300 }}
                      onClick={() => {
                        navigate(routes.account.myAccount)
                      }}
                    >
                      You need to bind your email and twitter first
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ width: 140 }}
                      onClick={() => {
                        showLoginModal()
                      }}
                    >
                      Connect
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Formik>
          </Box>
        </Stack>
      </RoundedContainer>
    </section>
  )
}

export default CreatePreAuctionPage
