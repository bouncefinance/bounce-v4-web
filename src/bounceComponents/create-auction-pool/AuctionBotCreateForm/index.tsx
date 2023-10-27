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
  FormHelperText,
  Grid,
  IconButton,
  styled
} from '@mui/material'
import { SetStateAction } from 'react'
import {
  useUserInfo
  //  useRefreshUserInfoCallback
} from 'state/users/hooks'
import RadioGroupFormItem from 'bounceComponents/create-auction-pool/RadioGroupFormItem'
import Radio from 'bounceComponents/create-auction-pool/Radio'
// import { ReactComponent as Close } from 'assets/svg/close.svg'
import * as Yup from 'yup'
import { Form, Formik, Field } from 'formik'
import FormItem from 'bounceComponents/common/FormItem'
import {
  useCallback,
  useMemo,
  useState
  //  useCallback
} from 'react'
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
// import { BindTgTokenApiParams } from 'api/pool/type'
import { useNavigate } from 'react-router-dom'
// import { bindTgTokenApi } from 'api/pool'
import { routes } from 'constants/routes'
import { ReactComponent as TgLeft } from 'assets/svg/tg_left.svg'
import { ReactComponent as Return } from './svg/return.svg'
import { show } from '@ebay/nice-modal-react'
import TokenDialog from '../TokenDialog'
import { Token } from 'bounceComponents/fixed-swap/type'
import FakeOutlinedInput from '../FakeOutlinedInput'
import useBreakpoint from 'hooks/useBreakpoint'

const CusFormItem = styled(FormItem)`
  .MuiFormHelperText-root {
    color: red;
  }
`

const TwoColumnPanel = ({ children }: { children: JSX.Element }) => {
  const isMobile = useBreakpoint('md')

  if (isMobile) {
    return (
      <Box width={'100%'} padding={16} display={'flex'} justifyContent={'center'}>
        <Box
          sx={{
            width: '100%',
            borderRadius: '16px',
            background: '#fff',
            padding: '24px 16px'
          }}
        >
          {children}
        </Box>
      </Box>
    )
  }

  return (
    <Box width={'100%'} mt={24} mb={68} height={'552px'} display={'flex'} justifyContent={'center'}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          maxWidth: '544px',
          background: 'var(--yellow, #E1F25C)',
          borderRadius: '24px 0 0 24px'
        }}
      >
        <TgLeft />
      </Box>
      <Box
        sx={{
          width: '100%',
          borderRadius: '0 24px 24px 0',
          background: '#fff',
          padding: '56px 0px 0'
        }}
      >
        <Box
          sx={{
            minWidth: '600px',
            padding: '0 56px 0',
            height: '100%',
            overflowY: 'scroll'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

interface FormValues {
  tokenFromAddress: string
  tokenToAddress: string
  tokenFromSymbol: string
  tokenFromLogoURI?: string
  tokenFromDecimals: string
  tokenToSymbol: string
  tokenToLogoURI?: string
  tokenToDecimals: string | number
  swapRatio: string
  poolSize: string
  allocationStatus: AllocationStatus
  allocationPerWallet: string
  participantStatus: ParticipantStatus
  startTime: Moment | null
  endTime: Moment | null
  poolName: string
}

const AuctionBotCreateForm = ({ type }: { type: 'Guide' | 'Create' }): JSX.Element => {
  const isMobile = useBreakpoint('md')
  const { userInfo } = useUserInfo()
  const switchNetwork = useSwitchNetwork()
  const showLoginModal = useShowLoginModal()
  const { account, chainId } = useActiveWeb3React()
  const { chainInfoOpt } = useOptionDatas()
  const valuesDispatch = useValuesDispatch()
  const valuesState = useValuesState()
  const navigate = useNavigate()

  const getChainName = useCallback(
    (chain_id: number | undefined) => {
      if (!chain_id) return null
      return chainInfoOpt?.find(chainInfo => chainInfo?.['ethChainId'] === chain_id)
    },
    [chainInfoOpt]
  )

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
  console.log('fundingCurrency', fundingCurrency)

  const tokenMap = useMemo(() => {
    return _.keyBy(tokenList, 'address')
  }, [tokenList])

  const validationSchema = Yup.object({
    poolName: Yup.string().max(30, 'Pool name should be less than 30 characters').required('Pool name is required'),
    tokenFromSymbol: Yup.string().required('Token is required'),
    tokenFromAddress: Yup.string().required('Token is required'),
    tokenToSymbol: Yup.string()
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
    tokenFromSymbol: valuesState.tokenFrom.symbol || '',
    tokenFromDecimals: String(valuesState.tokenFrom.decimals || ''),
    tokenFromLogoURI: valuesState.tokenFrom.logoURI || '',
    tokenToAddress: valuesState.tokenTo.address,
    tokenToSymbol: valuesState.tokenTo.symbol || '',
    tokenToDecimals: String(valuesState.tokenTo.decimals || ''),
    tokenToLogoURI: valuesState.tokenTo.logoURI || '',
    swapRatio: valuesState.swapRatio,
    poolSize: valuesState.poolSize,
    allocationStatus: valuesState.allocationStatus || AllocationStatus.NoLimits,
    allocationPerWallet: valuesState.allocationPerWallet,
    participantStatus: valuesState.participantStatus || ParticipantStatus.Public,
    startTime: valuesState.startTime,
    endTime: valuesState.endTime,
    poolName: valuesState.poolName
  }

  const returnHome = useCallback(() => {
    navigate(routes.telegramBot.home)
  }, [navigate])

  const skipTo = useCallback(() => {
    navigate(routes.telegramBot.home)
  }, [navigate])

  const showTokenDialog = (
    chainId: ChainId,
    values: FormValues,
    setValues: (values: any, shouldValidate?: boolean) => void
  ) => {
    show<Token>(TokenDialog, { chainId, action: 1 })
      .then(res => {
        console.log('TokenDialog Resolved: ', res)
        setValues({
          ...values,
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

  const showTokenToDialog = (
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

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <TwoColumnPanel>
        <Stack pb={56}>
          <Stack borderRadius={20}>
            <Stack
              mb={32}
              direction={isMobile ? undefined : 'row'}
              justifyContent={'space-between'}
              alignItems={isMobile ? undefined : 'center'}
            >
              <Stack gap={12} direction={'row'} alignItems={'center'}>
                {type === 'Create' && (
                  <IconButton onClick={() => returnHome()}>
                    <Return />
                  </IconButton>
                )}
                <Typography fontFamily={'Public Sans'} fontSize={16} fontWeight={500} color={'#121212'}>
                  API token
                </Typography>
              </Stack>
              <Box display={'flex'} alignItems={'center'} gap={16}>
                <Typography noWrap fontFamily={'Inter'} fontSize={14} fontWeight={400} color={'#121212'}>
                  {userInfo?.tg_token}
                </Typography>
                {/* <IconButton>
                    <Close onClick={() => removeTokenApi()} />
                  </IconButton> */}
              </Box>
            </Stack>
          </Stack>
          <Box
            sx={{
              borderRadius: '20px',
              overflowY: 'scroll',
              background: '#F6F6F3',
              padding: '30px'
            }}
          >
            <Typography
              fontFamily={'Public Sans'}
              textAlign={'center'}
              fontSize={isMobile ? 16 : 20}
              fontWeight={600}
              color={'#20201E'}
              letterSpacing={'-0.32px'}
            >
              Create an auction for your telegram bot
            </Typography>

            <Formik
              initialValues={internalInitialValues}
              validationSchema={validationSchema}
              onSubmit={values => {
                window.scrollTo(0, 0)
                valuesDispatch({
                  type: ActionType.CommitBotAuctionParameters,
                  payload: {
                    tokenFrom: {
                      address: values.tokenFromAddress,
                      decimals: values.tokenFromDecimals,
                      symbol: values.tokenFromSymbol,
                      logoURI: values.tokenFromLogoURI,
                      chainId: getChainName(chainId)?.ethChainId
                    },
                    tokenTo: {
                      address: values.tokenToAddress,
                      decimals: values.tokenToDecimals,
                      symbol: values.tokenToSymbol,
                      logoURI: values.tokenToLogoURI,
                      chainId: getChainName(chainId)?.ethChainId
                    },
                    swapRatio: values.swapRatio,
                    poolSize: values.poolSize,
                    allocationStatus: values.allocationStatus,
                    allocationPerWallet: values.allocationPerWallet,
                    participantStatus: values.participantStatus,
                    startTime: values.startTime,
                    endTime: values.endTime,
                    poolName: values.poolName,
                    auctionInChain: chainId
                  }
                })
                valuesDispatch({
                  type: ActionType.SetTgBotActiveStep,
                  payload: {
                    tgBotActiveStep: TgBotActiveStep.COMFIRM
                  }
                })
              }}
            >
              {({ values, setValues, errors }) => {
                return (
                  <>
                    <Stack mt={40}>
                      <Typography mb={12} sx={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: '#20201E' }}>
                        Title
                      </Typography>
                      <CusFormItem sx={{ width: '100%' }} error={!account} name="poolName" required>
                        <TextField
                          placeholder="pool name"
                          variant="outlined"
                          onClick={() => !account && showLoginModal()}
                          value={values.poolName}
                          inputProps={{ readOnly: false }}
                        />
                      </CusFormItem>
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
                    <FormItem error={!account}>
                      <Typography mb={13} sx={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: '#20201E' }}>
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
                        <Typography sx={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: '#20201E' }}>
                          Token
                        </Typography>
                      </Stack>
                      <Stack>
                        <FormItem
                          name="tokenFromAddress"
                          label="Select a token"
                          required
                          startAdornment={
                            <TokenImage alt={values.tokenFromSymbol} src={values.tokenFromLogoURI} size={32} />
                          }
                        >
                          <FakeOutlinedInput
                            readOnly
                            onClick={() => {
                              if (account && chainId) {
                                if (getChainName(chainId)) {
                                  showTokenDialog(getChainName(chainId)?.ethChainId || 1, values, setValues)
                                }
                              }
                            }}
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
                        <Typography mb={13} sx={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: '#20201E' }}>
                          Funding Currency
                        </Typography>
                        <FormItem
                          name="tokenToSymbol"
                          label="Select Token"
                          required
                          sx={{ flex: 1 }}
                          startAdornment={
                            <TokenImage alt={values.tokenToSymbol} src={values.tokenToLogoURI} size={32} />
                          }
                        >
                          <FakeOutlinedInput
                            // disabled
                            readOnly
                            onClick={() => {
                              if (account && chainId) {
                                showTokenToDialog(getChainName(chainId)?.ethChainId || 1, values, setValues)
                              }
                            }}
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
                        <Typography mb={13} sx={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: '#20201E' }}>
                          Swap ratio
                        </Typography>
                        <Box display={'flex'}>
                          <Box height={55} display={'flex'} alignItems={'center'} gap={5}>
                            <Typography>1</Typography>
                            <Typography noWrap>
                              {tokenMap[values.tokenFromAddress] ? (
                                tokenMap[values.tokenFromAddress]?.name
                              ) : (
                                <TokenImage
                                  alt={tokenMap[values.tokenFromAddress]?.symbol}
                                  src={tokenMap[values.tokenFromAddress]?.smallUrl}
                                  size={32}
                                />
                              )}
                            </Typography>
                            <Typography mr="5px">=</Typography>
                          </Box>

                          <CusFormItem sx={{ width: '100%' }} error={!account} name="swapRatio" required>
                            <TextField
                              variant="outlined"
                              onClick={() => !account && showLoginModal()}
                              value={values.swapRatio}
                              inputProps={{ readOnly: false }}
                              InputProps={{
                                endAdornment: (
                                  <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={3}>
                                    <TokenImage alt={values.tokenToSymbol} src={values.tokenToLogoURI} size={32} />
                                    {values.tokenToSymbol ? values.tokenToSymbol : '-'}
                                  </Box>
                                )
                              }}
                            />
                          </CusFormItem>
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
                        <Typography mb={13} sx={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: '#20201E' }}>
                          {`Auction Amount `}
                          {tokenMap[values.tokenFromAddress] ? tokenMap[values.tokenFromAddress]?.name : '-'}
                        </Typography>
                        <CusFormItem error={!account} name="poolSize">
                          <TextField
                            sx={{ width: '100%' }}
                            variant="outlined"
                            onClick={() => !account && showLoginModal()}
                            value={values.poolSize}
                            inputProps={{ readOnly: false }}
                          />
                        </CusFormItem>
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
                        <Typography mb={13} sx={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: '#20201E' }}>
                          Time
                        </Typography>
                        <Stack direction={isMobile ? 'column' : 'row'} gap={16}>
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
                        </Stack>
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
                        <Typography mb={13} sx={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: '#20201E' }}>
                          Allocation per wallet
                        </Typography>
                        <CusFormItem name="allocationStatus" error={!account}>
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
                        </CusFormItem>
                        {values.allocationStatus === AllocationStatus.Limited && (
                          <CusFormItem error={!account} name="allocationPerWallet" required>
                            <TextField
                              sx={{ width: '100%' }}
                              variant="outlined"
                              onClick={() => !account && showLoginModal()}
                              value={values.allocationPerWallet}
                              inputProps={{ readOnly: false }}
                              InputProps={{
                                endAdornment: (
                                  <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={3}>
                                    <TokenImage alt={values.tokenToSymbol} src={values.tokenToLogoURI} size={32} />
                                    {values.tokenToSymbol ? values.tokenToSymbol : '-'}
                                  </Box>
                                )
                              }}
                            />
                          </CusFormItem>
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
                        <Typography mb={13} sx={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: '#20201E' }}>
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
                              label="Credentials"
                            />
                          </Field>
                        </FormItem>
                        <FormHelperText error={!!errors.participantStatus}>{errors.participantStatus}</FormHelperText>
                        {values.participantStatus === ParticipantStatus.Whitelist ? (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '60px',
                              width: '100%',
                              background: '#E8E9E4',
                              borderRadius: '8px',
                              color: 'var(--grey-03, var(--grey-03, #959595))',
                              leadingTrim: 'both',
                              textEdge: 'cap',
                              fontFamily: 'Inter',
                              fontSize: '14px',
                              marginBottom: '20px'
                            }}
                          >
                            Group members
                          </Box>
                        ) : (
                          <Box sx={{ marginBottom: '20px' }}></Box>
                        )}
                      </Stack>
                      {/* <Grid container spacing={10}>
                          <Grid item xs={6}>
                            <Button
                              sx={{
                                width: '100%'
                              }}
                              type="submit"
                              variant="outlined"
                              onClick={() => skipTo()}
                            >
                              skip
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              sx={{
                                width: '100%'
                              }}
                              type="submit"
                              variant="contained"
                            >
                              Deploy
                            </Button>
                          </Grid>
                        </Grid> */}
                      {type === 'Guide' && (
                        <Grid container spacing={10}>
                          <Grid item xs={6}>
                            <Button
                              sx={{
                                width: '100%'
                              }}
                              variant="outlined"
                              onClick={() => {
                                valuesDispatch({
                                  type: ActionType.SetTgBotActiveStep,
                                  payload: {
                                    tgBotActiveStep: TgBotActiveStep.GUIDEFORM
                                  }
                                })
                                skipTo()
                              }}
                            >
                              skip
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              sx={{
                                width: '100%'
                              }}
                              type="submit"
                              variant="contained"
                              color="secondary"
                            >
                              Deploy
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                      {type === 'Create' && (
                        <Button color="secondary" type="submit" variant="contained">
                          Save
                        </Button>
                      )}

                      {/* <Stack direction="row" spacing={10} justifyContent="end">
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
                        </Stack> */}
                    </Stack>
                  </>
                )
              }}
            </Formik>
          </Box>
        </Stack>
      </TwoColumnPanel>
    </LocalizationProvider>
  )
}

export default AuctionBotCreateForm
