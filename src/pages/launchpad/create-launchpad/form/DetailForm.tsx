import {
  Box,
  MenuItem,
  Select,
  Stack,
  Typography,
  FormControlLabel,
  OutlinedInput,
  FormHelperText,
  SxProps,
  Chip
} from '@mui/material'
import {
  CardBox,
  BaseBox,
  Title,
  SubmitComp,
  GraySwitch,
  LabelTitle,
  FormLayout,
  FormUploadAdd,
  AddFile
} from './BaseComponent'
import { Field, Formik } from 'formik'
import FormItem from 'bounceComponents/common/FormItem'
import { useCallback, useMemo, useState } from 'react'
import Image from 'components/Image'
import { ChainId, ChainList } from 'constants/chain'
import RadioGroupFormItem from 'bounceComponents/create-auction-pool/RadioGroupFormItem'
import Radio from 'bounceComponents/create-auction-pool/Radio'
import Tooltip from 'bounceComponents/common/Tooltip'
import TokenImage from 'bounceComponents/common/TokenImage'
import FakeOutlinedInput from 'bounceComponents/create-auction-pool/FakeOutlinedInput'
import { AllocationStatus, IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { Moment } from 'moment'
import { show } from '@ebay/nice-modal-react'
import TokenDialog from 'bounceComponents/create-auction-pool/TokenDialog'
import { Token } from 'bounceComponents/fixed-swap/type'
import NumberInput from 'bounceComponents/common/NumberInput'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Body02 } from 'components/Text'
import useBreakpoint from 'hooks/useBreakpoint'
import { ReactComponent as YellowErrSVG } from 'assets/imgs/icon/yellow-err.svg'
import { poolSchema } from '../schema'
import { IFragmentReleaseTimes, IDetailInitValue } from '../type'
import { useActiveWeb3React } from 'hooks'
import { IUserLaunchpadInfo } from 'api/user/type'
import { PoolType } from 'api/pool/type'
import { useQueryParams } from 'hooks/useQueryParams'
enum PoolState {
  'CREATE' = 1,
  'MODIFY' = 2,
  'UP_CHAIN' = 3
}
const auctionType = [
  { label: 'Fixed Price', value: PoolType.FixedSwap },
  { label: 'Random Selection', value: PoolType.Lottery },
  { label: 'Dutch Auction', value: PoolType.DUTCH_AUCTION },
  { label: 'Fixed Swap NFT', value: PoolType.fixedSwapNft }
]
const defaultFragmentRelease = {
  startAt: null,
  radio: ''
}
function SetFragmentReleaseTime({
  releaseTimes,
  minDateTime,
  errors,
  setFragmentReleaseTimes
}: {
  setFragmentReleaseTimes: (val: IFragmentReleaseTimes[]) => void
  minDateTime: Moment | null
  releaseTimes: IFragmentReleaseTimes[]
  errors?: any
}) {
  const setItemValue = useCallback(
    (idx: number, _key: keyof IFragmentReleaseTimes, val: any) => {
      const ret = [...releaseTimes]
      ret[idx] = {
        ...ret[idx],
        [_key]: val
      }
      setFragmentReleaseTimes(ret)
    },
    [releaseTimes, setFragmentReleaseTimes]
  )

  const addOne = useCallback(() => {
    if (releaseTimes.length <= 29) {
      setFragmentReleaseTimes([...releaseTimes, { ...defaultFragmentRelease, key: Math.random() }])
    }
  }, [releaseTimes, setFragmentReleaseTimes])

  const removeOne = useCallback(
    (idx: number) => {
      if (idx < releaseTimes.length) {
        const ret = [...releaseTimes]
        ret.splice(idx, 1)
        setFragmentReleaseTimes(ret)
      }
    },
    [releaseTimes, setFragmentReleaseTimes]
  )

  return (
    <Stack spacing={5}>
      <Box display="grid" gap={10} gridTemplateColumns="60fr 30fr 20px">
        <LabelTitle>Release start time</LabelTitle>
        <LabelTitle>Release ratio</LabelTitle>
        <ControlPointIcon onClick={addOne} sx={{ cursor: 'pointer' }} />
      </Box>
      {releaseTimes.map((item, idx) => (
        <Box key={item.key || idx}>
          <Box>
            <Box display="grid" gap={10} gridTemplateColumns="60fr 30fr 20px">
              <Field
                component={DateTimePickerFormItem}
                disablePast
                name={`startAt[${item.key || idx}]`}
                value={item.startAt}
                onChange={(e: any) => {
                  setItemValue(idx, 'startAt', e)
                }}
                minDateTime={minDateTime}
                textField={{ sx: { width: '100%' } }}
              />
              <FormItem label="radio">
                <NumberInput
                  value={item.radio}
                  onBlur={() => {
                    setItemValue(idx, 'radio', Number(item.radio).toFixed(2))
                  }}
                  onUserInput={value => {
                    setItemValue(idx, 'radio', value.toString())
                  }}
                  endAdornment={<>%</>}
                />
              </FormItem>

              <RemoveCircleOutlineIcon
                sx={{ opacity: idx > 0 ? 1 : 0.5, cursor: 'pointer', alignSelf: 'center' }}
                onClick={() => idx > 0 && removeOne(idx)}
              />
            </Box>
            <Box display="grid" gap={10} gridTemplateColumns="60fr 30fr 20px">
              <FormHelperText error={!!errors?.length}>
                {typeof errors !== 'string' && errors?.[idx]?.startAt}
              </FormHelperText>
              <FormHelperText error={!!errors?.length}>
                {typeof errors !== 'string' && errors?.[idx]?.radio}
              </FormHelperText>
              <div />
            </Box>
          </Box>
        </Box>
      ))}
    </Stack>
  )
}
const showTokenDialog = async ({
  chainId,
  enableEth = true,
  setFieldValue
}: {
  chainId: ChainId
  enableEth?: boolean
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}) => {
  const res = await show<Token>(TokenDialog, { chainId, enableEth })
  setFieldValue('Token', {
    tokenToAddress: res.address,
    tokenToSymbol: res.symbol,
    tokenToLogoURI: res.logoURI,
    tokenToDecimals: res.decimals
  })
}
const DetailForm = ({ sx, launchpadInfo }: { sx?: SxProps; launchpadInfo: IUserLaunchpadInfo }) => {
  const { type = PoolState.CREATE, id } = useQueryParams()
  const { chainId } = useActiveWeb3React()

  const poolState = useMemo(() => {
    if (!launchpadInfo?.total) {
      return PoolState.CREATE
    }
    if (Number(type) === PoolState.MODIFY && !!id) {
      return PoolState.MODIFY
    }
    if (PoolState[Number(type)]) {
      return Number(type) as PoolState
    }
    return PoolState.CREATE
  }, [id, launchpadInfo?.total, type])
  const [curPoolId, setCurPoolId] = useState(
    poolState === PoolState.UP_CHAIN
      ? Number(id) || 0
      : poolState === PoolState.MODIFY
      ? Number(id) || 0
      : PoolState.CREATE
  )
  const { poolList, curPoolList } = useMemo<{ poolList: IDetailInitValue[]; curPoolList: IDetailInitValue }>(() => {
    const poolList: IDetailInitValue[] = []
    const defaultValue: IDetailInitValue = {
      id: 0,
      name: '',
      TokenLogo: '',
      TokenName: '',
      ChainId: chainId ?? ChainId.MAINNET,
      ContractAddress: '',
      ContractDecimalPlaces: 18,
      AuctionType: PoolType.FixedSwap,
      Token: {
        tokenToAddress: '',
        tokenToSymbol: '',
        tokenToLogoURI: '',
        tokenToDecimals: ''
      },
      SwapRatio: '',
      TotalSupply: '',
      startTime: null,
      endTime: null,
      allocationStatus: AllocationStatus.NoLimits,
      allocationPerWallet: '',
      releaseType: IReleaseType.Cliff,
      delayUnlockingTime: null,
      linearUnlockingStartTime: null,
      linearUnlockingEndTime: null,
      fragmentReleaseTimes: [],
      fragmentReleaseSize: '',
      isRefundable: true
    }
    if (!launchpadInfo?.total) {
      poolList.push(defaultValue)

      return { poolList, curPoolList: { ...defaultValue } as IDetailInitValue }
    }
    return poolList
  }, [chainId, launchpadInfo])

  const onSubmit = (value: IDetailInitValue) => {
    console.log('submitsubmitsubmitsubmitsubmit')
    console.log(value)
  }
  const isSm = useBreakpoint('sm')
  return (
    <CardBox sx={{ ...sx }}>
      <Formik enableReinitialize initialValues={curPoolList} validationSchema={poolSchema} onSubmit={onSubmit}>
        {({ values, setFieldValue, errors, handleSubmit }) => {
          return (
            <Stack component={'form'} gap={24} onSubmit={handleSubmit}>
              <BaseBox>
                <Title sx={{ color: '#20201E', fontSize: 28 }}>auction Round</Title>
                <Stack mt={20}>
                  {poolList.map(item => {
                    return (
                      <Chip
                        sx={{
                          width: 'max-content',
                          padding: 5
                        }}
                        key={item.id}
                        label={poolState === PoolState.CREATE ? 'new pool' : item.name}
                        variant={curPoolId === item.id ? 'outlined' : 'filled'}
                      />
                    )
                  })}
                </Stack>
              </BaseBox>
              <BaseBox>
                <Title sx={{ color: '#20201E', fontSize: 28 }}>Token Information</Title>
                <Stack flexDirection={'column'} gap={isSm ? 16 : 32}>
                  <FormLayout
                    sxStyle={{ marginTop: isSm ? 24 : 40 }}
                    title1="Token Logo"
                    childTitle={
                      <Body02 sx={{ fontSize: 12, color: '#626262' }}>{`(JPEG, PNG, WEBP Files, Size<10M)`}</Body02>
                    }
                    childForm={
                      <FormUploadAdd
                        fileUrl={values.TokenLogo}
                        formItemName="TokenLogo"
                        labelId="TokenLogo"
                        setFieldValue={setFieldValue}
                        labelChild={<AddFile />}
                      />
                    }
                  />
                  <FormLayout
                    title1="Token Name"
                    childForm={
                      <FormItem name={'TokenName'}>
                        <OutlinedInput placeholder="Name of the project, eg. Bounce" />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Blockchain Platform"
                    title2="What platform is this token issued on?"
                    childForm={
                      <FormItem name="ChainId">
                        <Select
                          value={values.ChainId}
                          displayEmpty
                          onChange={({ target }) => {
                            setFieldValue('ChainId', target.value)
                          }}
                          renderValue={selected => {
                            const currentChain = ChainList.find(item => item.id === selected)
                            return (
                              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                                {selected ? (
                                  <>
                                    <Image style={{ width: 25, height: 25 }} src={currentChain?.logo as string} />
                                    <Title sx={{ fontSize: 16 }}>{currentChain?.name}</Title>
                                  </>
                                ) : (
                                  <Title sx={{ fontSize: 14, color: '#959595', fontWeight: 500 }}>
                                    select asset platform
                                  </Title>
                                )}
                              </Box>
                            )
                          }}
                        >
                          {ChainList.map(t => (
                            <MenuItem
                              key={t.id}
                              value={t.id}
                              selected={values.ChainId === t.id ? true : false}
                              sx={{
                                '&.Mui-selected': {
                                  '& > .MuiStack-root > p': {
                                    color: '#2B51DA'
                                  }
                                }
                              }}
                            >
                              <Stack
                                sx={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 16
                                }}
                              >
                                <Image style={{ width: 25, height: 25 }} src={t.logo} />
                                <Title sx={{ fontSize: 16 }}>{t.name}</Title>
                              </Stack>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Contract Address"
                    childForm={
                      <FormItem name="ContractAddress">
                        <OutlinedInput placeholder="Explorer Link" />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Contract Decimal Places"
                    childForm={
                      <FormItem name="ContractDecimalPlaces">
                        <OutlinedInput placeholder="Explorer Link" />
                      </FormItem>
                    }
                  />
                </Stack>
              </BaseBox>

              <BaseBox>
                <Title sx={{ color: '#20201E' }}>launchpad information</Title>
                <Box my={40}>
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      gap: 8,
                      alignItems: 'center',
                      padding: '19px 20px 21px',
                      background: '#FFF8E8'
                    }}
                  >
                    <YellowErrSVG width={20} height={18} />
                    <Typography
                      sx={{
                        width: 'calc(100% - 20px - 8px)',
                        fontFamily: 'Inter',
                        color: '#171717',
                        fontSize: isSm ? 13 : 14,
                        fontWeight: 400
                      }}
                    >
                      This section is for pre auction information collection. You can change auction details after
                      submit
                    </Typography>
                  </Stack>
                </Box>
                <Stack flexDirection={'column'} gap={isSm ? 16 : 32}>
                  <FormLayout
                    title1="Auction Type"
                    childForm={
                      <FormItem name="AuctionType">
                        <Select
                          value={values.AuctionType}
                          onChange={e => {
                            setFieldValue('AuctionType', e.target.value)
                          }}
                          renderValue={selected => {
                            const auction = auctionType.find(item => item.value === selected)
                            return (
                              <Title sx={{ fontSize: 16, color: '#20201E', fontWeight: 500 }}>{auction?.label}</Title>
                            )
                          }}
                        >
                          {auctionType.map(value => (
                            <MenuItem key={value.value} value={value.value}>
                              <Typography
                                sx={{
                                  fontFamily: 'Inter',
                                  fontSize: 14,
                                  color: values.AuctionType === value.value ? '#2B51DA' : '#121212',
                                  fontWeight: 400
                                }}
                              >
                                {value.label}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormItem>
                    }
                  />

                  <FormLayout
                    title1="Funding Currency"
                    childForm={
                      <FormItem
                        name="Token.tokenToSymbol"
                        label="Select Token"
                        required
                        sx={{ flex: 1 }}
                        startAdornment={
                          <TokenImage alt={values.Token.tokenToSymbol} src={values.Token.tokenToLogoURI} size={32} />
                        }
                      >
                        <FakeOutlinedInput
                          readOnly
                          onClick={() => showTokenDialog({ chainId: values.ChainId as ChainId, setFieldValue })}
                        />
                      </FormItem>
                    }
                  />
                  <FormLayout
                    title1="Swap ratio"
                    childForm={
                      <Stack
                        flexDirection={'row'}
                        sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 15 }}
                      >
                        <Title sx={{ fontSize: 20, color: '#171717' }}>
                          1 {!values.TokenName ? 'USDT' : values.TokenName} =
                        </Title>
                        {/* 小数点位数大于 精度时还没有报错？ */}
                        <FormItem placeholder="0.00" sx={{ flex: 1 }} name="SwapRatio">
                          <NumberInput
                            value={values.SwapRatio}
                            onUserInput={value => setFieldValue('SwapRatio', value)}
                            endAdornment={
                              <>
                                <TokenImage
                                  alt={values.Token.tokenToSymbol}
                                  src={values.Token.tokenToLogoURI}
                                  size={24}
                                />
                                <Typography sx={{ ml: 8 }}>{values.Token.tokenToSymbol}</Typography>
                              </>
                            }
                          />
                        </FormItem>
                      </Stack>
                    }
                  />
                  <FormLayout
                    title1="Total Supply"
                    childForm={
                      <FormItem name="TotalSupply">
                        <OutlinedInput placeholder="Enter  amount" />
                      </FormItem>
                    }
                  />

                  <Box>
                    <Title mb={13} sx={{ fontSize: 20, fontWeight: 500, color: '#000' }}>
                      Time
                    </Title>
                    <Stack flexDirection={'row'}>
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
                  </Box>
                  <Box>
                    <Title sx={{ color: '#20201E', fontSize: 20 }}>Allocation per wallet</Title>
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
                      <FormItem name="allocationPerWallet" sx={{ flex: 1 }}>
                        <OutlinedInput
                          sx={{ mt: 10 }}
                          endAdornment={
                            <>
                              <TokenImage
                                alt={values.Token.tokenToSymbol}
                                src={values.Token.tokenToLogoURI}
                                size={24}
                              />
                              <Typography sx={{ ml: 8 }}>{values.Token.tokenToSymbol}</Typography>
                            </>
                          }
                        />
                      </FormItem>
                    )}
                  </Box>
                  <Box>
                    <Stack flexDirection={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Title sx={{ fontSize: 20, color: '#20201E' }}>Delay unlocking token</Title>
                      <FormControlLabel
                        checked={values.releaseType === 0}
                        onChange={() => setFieldValue('releaseType', values.releaseType ? 0 : 1)}
                        control={<GraySwitch defaultChecked />}
                        label=""
                      />
                    </Stack>
                    {values.releaseType > 0 && (
                      <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="releaseType">
                        <FormControlLabel
                          value={IReleaseType.Cliff}
                          control={<Radio disableRipple />}
                          label={
                            <Tooltip title="Set a date so traders can only claim tokens by that time.">
                              <span>Delay</span>
                            </Tooltip>
                          }
                        />
                        <FormControlLabel
                          value={IReleaseType.Linear}
                          control={<Radio disableRipple />}
                          label={
                            <Tooltip title="Set a start and end time to unlock tokens in a linear release method.">
                              <span>Linear</span>
                            </Tooltip>
                          }
                        />
                        <FormControlLabel
                          value={IReleaseType.Fragment}
                          control={<Radio disableRipple />}
                          label={
                            <Tooltip title="Set multiple time intervals and proportions for batch token releases">
                              <span>Staged</span>
                            </Tooltip>
                          }
                        />
                      </Field>
                    )}
                    {Number(values.releaseType) === IReleaseType.Cliff ? (
                      <Stack spacing={6}>
                        <LabelTitle>Unlocking Start Time</LabelTitle>
                        <Field
                          component={DateTimePickerFormItem}
                          disablePast
                          name="delayUnlockingTime"
                          minDateTime={values.endTime}
                          textField={{ sx: { width: '100%' } }}
                        />
                      </Stack>
                    ) : Number(values.releaseType) === IReleaseType.Linear ? (
                      <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={15}>
                        <Stack spacing={6}>
                          <LabelTitle>Start Time</LabelTitle>
                          <Field
                            component={DateTimePickerFormItem}
                            disablePast
                            name="linearUnlockingStartTime"
                            minDateTime={values.endTime}
                            textField={{ sx: { width: '100%' } }}
                          />
                        </Stack>

                        <Stack spacing={6}>
                          <LabelTitle>End Time</LabelTitle>
                          <Field
                            component={DateTimePickerFormItem}
                            disablePast
                            name="linearUnlockingEndTime"
                            minDateTime={values.linearUnlockingStartTime}
                            textField={{ sx: { width: '100%' } }}
                          />
                        </Stack>
                      </Box>
                    ) : Number(values.releaseType) === IReleaseType.Fragment ? (
                      <SetFragmentReleaseTime
                        minDateTime={values.endTime}
                        errors={errors.fragmentReleaseTimes}
                        releaseTimes={values.fragmentReleaseTimes}
                        setFragmentReleaseTimes={(val: IFragmentReleaseTimes[]) =>
                          setFieldValue('fragmentReleaseTimes', val)
                        }
                      />
                    ) : (
                      <LabelTitle>
                        No unlocking method is set; tokens can be claimed after the specified end.
                      </LabelTitle>
                    )}
                    <FormHelperText error={!!errors.fragmentReleaseSize}>{errors.fragmentReleaseSize}</FormHelperText>
                  </Box>
                  <Box>
                    <Stack flexDirection={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Title sx={{ fontSize: 20, color: '#20201E' }}>Refundable</Title>
                      <FormControlLabel
                        checked={values.isRefundable}
                        onChange={() => setFieldValue('isRefundable', !values.isRefundable)}
                        control={<GraySwitch defaultChecked />}
                        label=""
                      />
                    </Stack>
                    {values.isRefundable && values?.endTime && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1">Auction will be refundable before the end time</Typography>
                        <Box sx={{ borderRadius: 20, bgcolor: '#F5F5F5', color: '#908E96', px: 8, py: 4, ml: 6 }}>
                          Before {values.endTime.format('MMM D, YYYY hh:mm A')}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Stack>
              </BaseBox>
              <SubmitComp loading={false} isChange={true} />
            </Stack>
          )
        }}
      </Formik>
    </CardBox>
  )
}
export default DetailForm
