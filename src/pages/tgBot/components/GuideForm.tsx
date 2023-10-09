import HeaderTab from 'bounceComponents/auction/HeaderTab'
import FooterPc from 'components/Footer/FooterPc'
import { Box, Stack, Typography, Select, MenuItem, Button, TextField, FormControlLabel, Radio } from '@mui/material'
import RadioGroupFormItem from 'bounceComponents/create-auction-pool/RadioGroupFormItem'
import { ReactComponent as Close } from 'assets/svg/close.svg'
import * as Yup from 'yup'
import { Form, Formik, Field } from 'formik'
import FormItem from 'bounceComponents/common/FormItem'
import { useMemo, useState } from 'react'
import Image from 'components/Image'
import useTokenList from 'bounceHooks/auction/useTokenList'
import { useActiveWeb3React } from 'hooks'
import { useDebounce } from 'ahooks'
import _ from 'lodash'
import { useShowLoginModal } from 'state/users/hooks'
import TokenImage from 'bounceComponents/common/TokenImage'
import { AllocationStatus, ParticipantStatus } from 'bounceComponents/create-auction-pool/types'

const TwoColumnPanel = ({ children }: { children: JSX.Element }) => {
  return (
    <Box mt={'24px'} mb={'60px'} display={'flex'} justifyContent={'center'}>
      <Box
        sx={{
          flex: 1,
          maxWidth: '544px',
          background: 'var(--yellow, #E1F25C)',
          borderRadius: '24px 0 0 24px'
        }}
      ></Box>
      <Box
        overflow={'hidden'}
        sx={{
          borderRadius: '0 24px 24px 0',
          background: '#fff'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

interface FormValues {
  tokenAddress: string
  fundingCurrencyAddress: string
  swapRatio: number
  totalSupply: number
  allocationStatus: AllocationStatus
  limit: number
  participant: ParticipantStatus
}

const internalInitialValues: FormValues = {
  tokenAddress: '',
  fundingCurrencyAddress: '',
  swapRatio: 0,
  totalSupply: 0,
  allocationStatus: AllocationStatus.NoLimits,
  limit: 0,
  participant: ParticipantStatus.Public
}

const GuideForm = (): JSX.Element => {
  const showLoginModal = useShowLoginModal()
  const { account, chainId } = useActiveWeb3React()
  const [filterInputValue] = useState<string>('')
  const debouncedFilterInputValue = useDebounce(filterInputValue, { wait: 400 })
  const { tokenList: tokenList } = useTokenList(chainId, 1, debouncedFilterInputValue, true)
  const { tokenList: fundingCurrency } = useTokenList(chainId, 2, debouncedFilterInputValue, true)
  const tokenMap = useMemo(() => {
    return _.keyBy(tokenList, 'address')
  }, [tokenList])
  const fundingCurrencyMap = useMemo(() => {
    return _.keyBy(fundingCurrency, 'address')
  }, [fundingCurrency])
  const tokenMenuList = useMemo(() => {
    return tokenList.map(item => (
      <MenuItem
        sx={{
          padding: '10px 15px'
        }}
        key={item.address}
        value={item.address}
      >
        <Box display={'flex'} alignItems="center">
          <Image width="20px" src={item.logoURI || ''} />
          <Typography ml={10} fontSize={16}>
            {item.name}
          </Typography>
        </Box>
      </MenuItem>
    ))
  }, [tokenList])

  const validationSchema = Yup.object({
    tokenAddress: Yup.string().required('Token is required'),
    fundingCurrencyAddress: Yup.string().required('Token is required')
  })
  return (
    <>
      <HeaderTab />
      <TwoColumnPanel>
        <Stack padding={56}>
          <Stack borderRadius={20} padding={56}>
            <Box mb={32} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Box gap={12} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Box sx={{ background: 'red' }} height={40} width={40} borderRadius={'50%'}></Box>
                <Typography fontWeight={500} color={'#121212'}>
                  API token
                </Typography>
              </Box>
              <Box display={'flex'} gap={16}>
                <Typography
                  component={Box}
                  sx={{
                    textTransform: 'capitalize',
                    fontFamily: 'Public Sans',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  width={418}
                  fontSize={14}
                  fontWeight={500}
                  color={'#121212'}
                >
                  https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx5...
                </Typography>
                <Close />
              </Box>
            </Box>
          </Stack>
          <Box
            sx={{
              borderRadius: '20px',
              overflowY: 'scroll',
              background: '#F6F6F3',
              padding: '30px'
            }}
          >
            <Formik
              initialValues={internalInitialValues}
              validationSchema={validationSchema}
              onSubmit={values => {
                console.log('values>>>', values)
              }}
            >
              {({ values, handleChange }) => {
                return (
                  <Stack component={Form} spacing={20}>
                    <Stack>
                      <Typography variant="h3" sx={{ fontSize: 16 }}>
                        Token
                      </Typography>
                      <FormItem error={!account} name="tokenAddress" required>
                        <Select
                          value={values.tokenAddress}
                          onChange={handleChange}
                          name="tokenAddress"
                          displayEmpty
                          renderValue={() => {
                            return (
                              <Box display={'flex'} alignItems="center">
                                <Image
                                  width="32px"
                                  src={values.tokenAddress ? tokenMap[values.tokenAddress]?.logoURI || '' : ''}
                                />
                                <Box ml={10}>
                                  <Typography fontSize={12} color={'var(--ps-gray-700)'}>
                                    Select token
                                  </Typography>
                                  <Typography>{values ? tokenMap[values.tokenAddress]?.name : ''}</Typography>
                                </Box>
                              </Box>
                            )
                          }}
                        >
                          {tokenMenuList}
                        </Select>
                      </FormItem>
                      <Box
                        sx={{
                          background: '#D4D6CF',
                          opacity: 0.7,
                          height: '1px',
                          width: '100%',
                          margin: '24px 0'
                        }}
                      ></Box>
                    </Stack>
                    <Stack>
                      <Typography variant="h3" sx={{ fontSize: 16 }}>
                        Funding Currency
                      </Typography>
                      <FormItem error={!account} name="fundingCurrencyAddress" required>
                        <Select
                          value={values.fundingCurrencyAddress}
                          onChange={handleChange}
                          name="fundingCurrencyAddress"
                          displayEmpty
                          renderValue={() => {
                            return (
                              <Box display={'flex'} alignItems="center">
                                <Image
                                  width="32px"
                                  src={
                                    values.fundingCurrencyAddress
                                      ? fundingCurrencyMap[values.fundingCurrencyAddress]?.logoURI || ''
                                      : ''
                                  }
                                />
                                <Box ml={10}>
                                  <Typography fontSize={12} color={'var(--ps-gray-700)'}>
                                    Funding Currency
                                  </Typography>
                                  <Typography>
                                    {values.fundingCurrencyAddress
                                      ? fundingCurrencyMap[values.fundingCurrencyAddress]?.name
                                      : ''}
                                  </Typography>
                                </Box>
                              </Box>
                            )
                          }}
                        >
                          {tokenMenuList}
                        </Select>
                      </FormItem>
                      <Box
                        sx={{
                          background: '#D4D6CF',
                          opacity: 0.7,
                          height: '1px',
                          width: '100%',
                          margin: '24px 0'
                        }}
                      ></Box>
                    </Stack>
                    <Stack>
                      <Typography variant="h3" sx={{ fontSize: 16 }}>
                        Swap ratio
                      </Typography>
                      <Box display={'flex'} alignItems={'center'}>
                        <Typography>
                          {values.tokenAddress ? (
                            ' 1 ' + tokenMap[values.tokenAddress]?.name + ' = '
                          ) : (
                            <TokenImage
                              alt={values.tokenAddress || tokenMap[values.tokenAddress]?.symbol}
                              src={values.tokenAddress || tokenMap[values.tokenAddress]?.logoURI}
                              size={32}
                            />
                          )}
                        </Typography>
                        <FormItem error={!account} name="swapRatio" required>
                          <TextField
                            sx={{ width: '100%' }}
                            variant="outlined"
                            onClick={() => !account && showLoginModal()}
                            value={values.swapRatio}
                            inputProps={{ readOnly: false }}
                            InputProps={{
                              endAdornment: (
                                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={3}>
                                  <TokenImage
                                    alt={
                                      values.fundingCurrencyAddress ||
                                      fundingCurrencyMap[values.fundingCurrencyAddress]?.symbol
                                    }
                                    src={
                                      values.fundingCurrencyAddress ||
                                      fundingCurrencyMap[values.fundingCurrencyAddress]?.logoURI
                                    }
                                    size={32}
                                  />
                                  {values.fundingCurrencyAddress
                                    ? fundingCurrencyMap[values.fundingCurrencyAddress]?.name
                                    : '-'}
                                </Box>
                              )
                            }}
                          />
                        </FormItem>
                      </Box>
                      <Box
                        sx={{
                          background: '#D4D6CF',
                          opacity: 0.7,
                          height: '1px',
                          width: '100%',
                          margin: '24px 0'
                        }}
                      ></Box>
                    </Stack>
                    <Stack>
                      <Typography variant="h3" sx={{ fontSize: 16 }}>
                        Total Supply
                      </Typography>
                      <FormItem error={!account} name="totalSupply" required>
                        <TextField
                          sx={{ width: '100%' }}
                          variant="outlined"
                          onClick={() => !account && showLoginModal()}
                          value={values.totalSupply}
                          inputProps={{ readOnly: false }}
                        />
                      </FormItem>
                      <Box
                        sx={{
                          background: '#D4D6CF',
                          opacity: 0.7,
                          height: '1px',
                          width: '100%',
                          margin: '24px 0'
                        }}
                      ></Box>
                    </Stack>
                    <Stack>
                      <Typography mb={13} sx={{ fontSize: 20, fontWeight: 500, color: '#000' }}>
                        Allocation per wallet
                      </Typography>
                      <FormItem name="allocationStatus" error={!account}>
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
                      </FormItem>
                      {values.allocationStatus === AllocationStatus.Limited && (
                        <FormItem error={!account} name="limit" required>
                          <TextField
                            sx={{ width: '100%' }}
                            variant="outlined"
                            onClick={() => !account && showLoginModal()}
                            value={values.limit}
                            inputProps={{ readOnly: false }}
                          />
                        </FormItem>
                      )}
                      <Box
                        sx={{
                          background: '#D4D6CF',
                          opacity: 0.7,
                          height: '1px',
                          width: '100%',
                          margin: '24px 0'
                        }}
                      ></Box>
                    </Stack>
                    <Stack>
                      <Typography mb={13} sx={{ fontSize: 20, fontWeight: 500, color: '#000' }}>
                        Participant
                      </Typography>
                      <FormItem name="participant" error={!account}>
                        <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="participant">
                          <FormControlLabel
                            value={ParticipantStatus.Public}
                            control={<Radio disableRipple />}
                            label="Public"
                          />
                          <FormControlLabel
                            value={ParticipantStatus.Whitelist}
                            control={<Radio disableRipple />}
                            label="Condition"
                          />
                        </Field>
                      </FormItem>
                      <Box
                        sx={{
                          background: '#D4D6CF',
                          opacity: 0.7,
                          height: '1px',
                          width: '100%',
                          margin: '24px 0'
                        }}
                      ></Box>
                    </Stack>
                    <Button type="submit" variant="contained">
                      Deploy
                    </Button>
                  </Stack>
                )
              }}
            </Formik>
          </Box>
        </Stack>
      </TwoColumnPanel>
      <FooterPc />
    </>
  )
}

export default GuideForm
