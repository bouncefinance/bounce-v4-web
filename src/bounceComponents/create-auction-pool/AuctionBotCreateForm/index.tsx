import moment, { Moment } from 'moment'
import {
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@mui/material'
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
import { AllocationStatus, ParticipantStatus, TgBotActiveStep } from 'bounceComponents/create-auction-pool/types'
import { ChainId, ChainList, ChainListMap } from 'constants/chain'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useOptionDatas } from 'state/configOptions/hooks'
import { BigNumber } from 'bignumber.js'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import { useValuesDispatch, useValuesState, ActionType } from '../ValuesProvider'
// import { useCreateBotSwapPool } from 'hooks/useCreateBotSwapPool'
import { useUserInfo } from 'state/users/hooks'
import { IS_TEST_ENV } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'

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
  tokenFromAddress: string
  tokenToAddress: string
  swapRatio: string
  poolSize: string
  allocationStatus: AllocationStatus
  allocationPerWallet: string
  participantStatus: ParticipantStatus
  startTime: Moment | null
  endTime: Moment | null
  poolName: string
}

const AuctionBotCreateForm = (): JSX.Element => {
  const switchNetwork = useSwitchNetwork()
  const showLoginModal = useShowLoginModal()
  const { account, chainId } = useActiveWeb3React()
  const { chainInfoOpt } = useOptionDatas()
  const valuesDispatch = useValuesDispatch()
  const valuesState = useValuesState()
  // const createBotSwapPool = useCreateBotSwapPool()
  const navigate = useNavigate()
  const { userInfo, userId } = useUserInfo()

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

  const [filterInputValue] = useState<string>('')
  const debouncedFilterInputValue = useDebounce(filterInputValue, { wait: 400 })
  const { tokenList: tokenList } = useTokenList(chainId, 1, debouncedFilterInputValue, false)
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
  const fundingCurrencyMenuList = useMemo(() => {
    return fundingCurrency.map(item => (
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
  }, [fundingCurrency])

  const validationSchema = Yup.object({
    tokenFromAddress: Yup.string().required('Token is required'),
    tokenToAddress: Yup.string()
      .required('Funding Currency is required')
      .test('DIFFERENT_TOKENS', 'Please choose a different token', (_, context) => {
        return context.parent.tokenToAddress !== context.parent.tokenFromAddress
      }),
    swapRatio: Yup.number()
      .positive('Swap ratio must be positive')
      .typeError('Please input valid number')
      .test('DIGITS_LESS_THAN_6', 'Should be no more than 6 digits after point', value => {
        const _value = new BigNumber(value || 0).toFixed()
        return !_value || !String(_value).includes('.') || String(_value).split('.')[1]?.length <= 6
      })
      .required('Swap ratio is required'),
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
            'GREATER_THAN_TOTAL_SUPPLY',
            'Allocation per wallet cannnot be greater than total supply times swap ratio',
            (value, context) =>
              !context.parent.poolSize || !context.parent.swapRatio || (value || 0) <= context.parent.poolSize
          )
      }),
    participantStatus: Yup.string().oneOf(Object.values(ParticipantStatus), 'Invalid participantStatus status'),
    startTime: Yup.date()
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('EARLIER_THAN_END_TIME', 'Please select a time earlier than end time', (value, context) => {
        return !context.parent.endTime.valueOf() || (value?.valueOf() || 0) < context.parent.endTime.valueOf()
      }),
    endTime: Yup.date()
      .min(moment(), 'Please select a time earlier than current time')
      .typeError('Please select a valid time')
      .test('LATER_THAN_START_TIME', 'Please select a time later than start time', (value, context) => {
        return !context.parent.startTime.valueOf() || (value?.valueOf() || 0) > context.parent.startTime.valueOf()
      })
  })

  const internalInitialValues: FormValues = {
    tokenFromAddress: valuesState.tokenFrom.address,
    tokenToAddress: valuesState.tokenTo.address,
    swapRatio: valuesState.swapRatio,
    poolSize: valuesState.poolSize,
    allocationStatus: valuesState.allocationStatus,
    allocationPerWallet: valuesState.allocationPerWallet,
    participantStatus: valuesState.participantStatus,
    startTime: valuesState.startTime,
    endTime: valuesState.endTime,
    poolName: valuesState.poolName
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
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
                  valuesDispatch({
                    type: ActionType.CommitBotAuctionParameters,
                    payload: {
                      tokenFrom: {
                        address: values.tokenFromAddress,
                        decimals: tokenMap[values.tokenFromAddress].decimals,
                        symbol: tokenMap[values.tokenFromAddress].symbol,
                        logoURI: tokenMap[values.tokenFromAddress].logoURI,
                        chainId: tokenMap[values.tokenFromAddress].chainId
                      },
                      tokenTo: {
                        address: values.tokenToAddress,
                        decimals: fundingCurrencyMap[values.tokenToAddress].decimals,
                        symbol: fundingCurrencyMap[values.tokenToAddress].symbol,
                        logoURI: fundingCurrencyMap[values.tokenToAddress].logoURI,
                        chainId: fundingCurrencyMap[values.tokenToAddress].chainId
                      },
                      swapRatio: values.swapRatio,
                      poolSize: values.poolSize,
                      allocationStatus: values.allocationStatus,
                      allocationPerWallet: values.allocationPerWallet,
                      participantStatus: values.participantStatus,
                      startTime: values.startTime,
                      endTime: values.endTime,
                      poolName: 'BOT_POOL1',
                      auctionInChain: chainId
                      // tokenFormDecimal: tokenMap[values.tokenFromAddress].decimals,
                      // tokenToDecimal: fundingCurrencyMap[values.tokenToAddress].decimals
                    }
                  })
                  // setTimeout(createBotSwapPool, 3000)
                  valuesDispatch({
                    type: ActionType.SetTgBotActiveStep,
                    payload: {
                      tgBotActiveStep: TgBotActiveStep.COMFIRM
                    }
                  })
                }}
              >
                {({ values, handleChange }) => {
                  return (
                    <>
                      <FormItem error={!account}>
                        <Typography mb={13} sx={{ fontSize: 20, fontWeight: 600, color: '#20201E' }}>
                          Select Chain
                        </Typography>
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
                        <Box
                          sx={{
                            background: '#D4D6CF',
                            opacity: 0.7,
                            height: '1px',
                            width: '100%',
                            margin: '24px 0'
                          }}
                        ></Box>
                      </FormItem>
                      <Stack component={Form} spacing={20}>
                        <Stack>
                          <Typography mb={13} sx={{ fontSize: 20, fontWeight: 600, color: '#20201E' }}>
                            Token
                          </Typography>
                          <FormItem error={!account} name="tokenFromAddress" required>
                            <Select
                              value={values.tokenFromAddress}
                              onChange={handleChange}
                              onClick={() => !account && showLoginModal()}
                              name="tokenFromAddress"
                              displayEmpty
                              renderValue={() => {
                                return (
                                  <Box display={'flex'} alignItems="center">
                                    <Image
                                      width="32px"
                                      src={
                                        values.tokenFromAddress ? tokenMap[values.tokenFromAddress]?.logoURI || '' : ''
                                      }
                                    />
                                    <Box ml={10}>
                                      <Typography fontSize={12} color={'var(--ps-gray-700)'}>
                                        Select token
                                      </Typography>
                                      <Typography>{values ? tokenMap[values.tokenFromAddress]?.name : ''}</Typography>
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
                          <Typography mb={13} sx={{ fontSize: 20, fontWeight: 600, color: '#20201E' }}>
                            Funding Currency
                          </Typography>
                          <FormItem error={!account} name="tokenToAddress" required>
                            <Select
                              value={values.tokenToAddress}
                              onChange={handleChange}
                              onClick={() => !account && showLoginModal()}
                              name="tokenToAddress"
                              displayEmpty
                              renderValue={() => {
                                return (
                                  <Box display={'flex'} alignItems="center">
                                    <Image
                                      width="32px"
                                      src={
                                        values.tokenToAddress
                                          ? fundingCurrencyMap[values.tokenToAddress]?.logoURI || ''
                                          : ''
                                      }
                                    />
                                    <Box ml={10}>
                                      <Typography fontSize={12} color={'var(--ps-gray-700)'}>
                                        Funding Currency
                                      </Typography>
                                      <Typography>
                                        {values.tokenToAddress ? fundingCurrencyMap[values.tokenToAddress]?.name : ''}
                                      </Typography>
                                    </Box>
                                  </Box>
                                )
                              }}
                            >
                              {fundingCurrencyMenuList}
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
                          <Typography mb={13} sx={{ fontSize: 20, fontWeight: 600, color: '#20201E' }}>
                            Swap ratio
                          </Typography>
                          <Box display={'flex'}>
                            <Box display={'flex'} alignItems={'center'} width={'80px'} gap={5}>
                              <Typography>1</Typography>
                              <Typography noWrap width={'60px'}>
                                {tokenMap[values.tokenFromAddress]?.name}
                              </Typography>
                              <Typography mr="5px">=</Typography>
                            </Box>

                            <FormItem sx={{ width: '100%' }} error={!account} name="swapRatio" required>
                              <TextField
                                variant="outlined"
                                onClick={() => !account && showLoginModal()}
                                value={values.swapRatio}
                                inputProps={{ readOnly: false }}
                                InputProps={{
                                  endAdornment: (
                                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={3}>
                                      <TokenImage
                                        alt={values.tokenToAddress || fundingCurrencyMap[values.tokenToAddress]?.symbol}
                                        src={
                                          values.tokenToAddress || fundingCurrencyMap[values.tokenToAddress]?.logoURI
                                        }
                                        size={32}
                                      />
                                      {values.tokenToAddress ? fundingCurrencyMap[values.tokenToAddress]?.name : '-'}
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
                          <Typography variant="h3" sx={{ fontSize: 20 }}>
                            Total Supply
                          </Typography>
                          <FormItem error={!account} name="poolSize" required>
                            <TextField
                              sx={{ width: '100%' }}
                              variant="outlined"
                              onClick={() => !account && showLoginModal()}
                              value={values.poolSize}
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
                          <Typography variant="h3" sx={{ fontSize: 20 }}>
                            Time
                          </Typography>
                          <Box display={'flex'} gap={16}>
                            <Field
                              component={DateTimePickerFormItem}
                              name="startTime"
                              disablePast
                              maxDateTime={values.endTime}
                              textField={{ sx: { flex: 1 } }}
                            />
                            <Field
                              component={DateTimePickerFormItem}
                              name="endTime"
                              disablePast
                              minDateTime={values.startTime}
                              textField={{ sx: { flex: 1 } }}
                            />
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
                          <Typography mb={13} sx={{ fontSize: 20, fontWeight: 600, color: '#20201E' }}>
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
                            <FormItem error={!account} name="allocationPerWallet" required>
                              <TextField
                                sx={{ width: '100%' }}
                                variant="outlined"
                                onClick={() => !account && showLoginModal()}
                                value={values.allocationPerWallet}
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
                          <Typography mb={13} sx={{ fontSize: 20, fontWeight: 600, color: '#20201E' }}>
                            Participant
                          </Typography>
                          <FormItem name="participantStatus" error={!account}>
                            <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="participantStatus">
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
                        {/* <Button type="submit" variant="contained">
                          Deploy
                        </Button> */}

                        <Stack direction="row" spacing={10} justifyContent="end">
                          {/* && userInfo?.twitterName */}
                          {account && userId && userInfo?.email && (userInfo?.twitterName || IS_TEST_ENV) ? (
                            <>
                              <Button type="submit" variant="contained">
                                Deploy
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
                    </>
                  )
                }}
              </Formik>
            </Box>
          </Stack>
        </TwoColumnPanel>
      </LocalizationProvider>
    </>
  )
}

export default AuctionBotCreateForm
