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
  Chip,
  ButtonBase
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
import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'components/Image'
import { ChainId, ChainList } from 'constants/chain'
import RadioGroupFormItem from 'bounceComponents/create-auction-pool/RadioGroupFormItem'
import Radio from 'bounceComponents/create-auction-pool/Radio'
import Tooltip from 'bounceComponents/common/Tooltip'
import TokenImage from 'bounceComponents/common/TokenImage'
import FakeOutlinedInput from 'bounceComponents/create-auction-pool/FakeOutlinedInput'
import { AllocationStatus, IReleaseType } from 'bounceComponents/create-auction-pool/types'
import moment, { Moment } from 'moment'
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
import { IFragmentReleaseTimes, IDetailInitValue, ParticipantStatus, IPoolInfoParams, PoolStatus } from '../type'
import { useActiveWeb3React } from 'hooks'
import { ChainInfoOpt, IUserLaunchpadInfo } from 'api/user/type'
import { PoolType } from 'api/pool/type'
import { useQueryParams } from 'hooks/useQueryParams'
import { ReactComponent as BigAddIcon } from 'assets/imgs/icon/big-add.svg'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ImportWhitelistDialog from 'bounceComponents/create-auction-pool/ImportWhitelistDialog'
import { useRequest } from 'ahooks'
import { useOptionDatas } from 'state/configOptions/hooks'
import { updateLaunchpadPool } from 'api/user'
import useTokenList from 'bounceHooks/auction/useTokenList'
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
export const toDetailType = (values: IPoolInfoParams, chainInfoOpt: ChainInfoOpt[] | undefined) => {
  const poolInfo = {
    id: values.id,
    ChainId: chainInfoOpt?.find(i => values.chainId === i.id)?.ethChainId,
    TokenName: values.token0Name,
    AuctionType: values.category,
    name: values.name,
    projectPicture: values.picture1,
    projectMobilePicture: values.picture2,
    creator: values.creator,
    releaseType: values.releaseType,
    allocationStatus: Number(values.maxAmount1PerWallet) > 0 ? AllocationStatus.Limited : AllocationStatus.NoLimits,
    allocationPerWallet: Number(values.maxAmount1PerWallet) > 0 ? values.maxAmount1PerWallet : '',
    ContractAddress: values.token0,
    ContractDecimalPlaces: values.token0Decimals,
    TotalSupply: values.totalAmount0,
    Token: {
      address: values.token1,
      chainId: undefined
    },
    TokenLogo: values.token0Logo,
    SwapRatio: values.ratio,
    startTime: values.openAt ? moment(values.openAt) : null,
    endTime: values.closeAt ? moment(values.closeAt) : null,
    isRefundable: values.reverseEnabled,
    whitelist: values.whitelistAddresses,
    participantStatus: values.whitelistEnabled ? ParticipantStatus.Whitelist : ParticipantStatus.Public,
    status: values.status,
    delayUnlockingTime: null,
    linearUnlockingStartTime: null,
    linearUnlockingEndTime: null,
    fragmentReleaseTimes: [{ startAt: null, radio: '0' }]
  } as IDetailInitValue
  if (values.releaseType === IReleaseType.Cliff) {
    poolInfo.delayUnlockingTime = values.releaseData[0].startAt ? moment(values.releaseData[0].startAt) : null
  }
  if (values.releaseType === IReleaseType.Linear) {
    poolInfo.linearUnlockingStartTime = values.releaseData[0].startAt ? moment(values.releaseData[0].startAt) : null
    poolInfo.linearUnlockingEndTime = values.releaseData[0].endAtOrRatio
      ? moment(values.releaseData[0].endAtOrRatio)
      : null
  }
  if (values.releaseType === IReleaseType.Fragment) {
    const fragment = values.releaseData.map<IFragmentReleaseTimes>(item => ({
      startAt: item.startAt ? moment(item.startAt) : null,
      radio: `${item.endAtOrRatio}`
    }))
    poolInfo.fragmentReleaseTimes = fragment
  }
  return poolInfo
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
  setFieldValue('Token', res)
}
const showImportWhitelistDialog = (
  values: IDetailInitValue,
  setValues: (values: any, shouldValidate?: boolean) => void
) => {
  show(ImportWhitelistDialog, { whitelist: values.whitelist })
    .then(whitelist => {
      console.log('ImportWhitelistDialog Resolved: ', whitelist)

      setValues({
        ...values,
        whitelist
      })
    })
    .catch(err => {
      console.log('ImportWhitelistDialog Rejected: ', err)
    })
}
// Allocation Per Wallet
const DetailForm = ({
  getLaunchpadInfo,
  sx,
  launchpadInfo
}: {
  getLaunchpadInfo: () => void
  sx?: SxProps
  launchpadInfo: IUserLaunchpadInfo
}) => {
  const { type = PoolState.CREATE, id } = useQueryParams()
  const { chainId, account } = useActiveWeb3React()
  const poolState = useMemo(() => {
    if (!launchpadInfo?.total || !launchpadInfo?.list.find(item => item.id === Number(id))) {
      return PoolState.CREATE
    }
    if (Number(type) === PoolState.MODIFY && !!id) {
      return PoolState.MODIFY
    }
    if (PoolState[Number(type)]) {
      return Number(type) as PoolState
    }
    return PoolState.CREATE
  }, [id, launchpadInfo, type])
  const [curPoolId, setCurPoolId] = useState(
    poolState === PoolState.UP_CHAIN ? Number(id) || 0 : poolState === PoolState.MODIFY ? Number(id) || 0 : 0
  )
  useEffect(() => {
    const newCurPoolId =
      poolState === PoolState.UP_CHAIN ? Number(id) || 0 : poolState === PoolState.MODIFY ? Number(id) || 0 : 0
    setCurPoolId(newCurPoolId)
  }, [poolState, id])

  const { chainInfoOpt } = useOptionDatas()
  const { poolList, curPoolList } = useMemo<{ poolList: IDetailInitValue[]; curPoolList: IDetailInitValue }>(() => {
    let poolList: IDetailInitValue[] = []
    const defaultValue: IDetailInitValue = {
      id: 0,
      name: 'New Pool',
      projectPicture: '',
      projectMobilePicture: '',
      TokenLogo: '',
      TokenName: '',
      ChainId: chainId ?? ChainId.MAINNET,
      ContractAddress: '',
      ContractDecimalPlaces: 18,
      AuctionType: PoolType.FixedSwap,
      Token: {
        address: '',
        chainId: undefined,
        decimals: 18
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
      isRefundable: true,
      whitelist: [],
      participantStatus: ParticipantStatus.Public,
      status: PoolStatus.Init
    }
    if (launchpadInfo?.total) {
      const list: IDetailInitValue[] = launchpadInfo.list.map(item => {
        const poolInfo = toDetailType(item, chainInfoOpt)
        return poolInfo
      })
      poolList = poolList.concat(list)
    }
    if (!launchpadInfo?.total || curPoolId === 0) {
      poolList.push(defaultValue)
    }
    return { poolList, curPoolList: poolList.find(item => item.id === curPoolId) || defaultValue }
  }, [chainId, chainInfoOpt, curPoolId, launchpadInfo])

  const { tokenList } = useTokenList(curPoolList.ChainId, 2, '', true)
  const token1 = tokenList.find(item => item.address === curPoolList.Token.address)
  token1 && (curPoolList.Token = token1)
  const { loading, runAsync } = useRequest(
    (values: IDetailInitValue) => {
      const poolParams: IPoolInfoParams = {
        id: values.id,
        name: values.name,
        picture1: values.projectMobilePicture,
        picture2: values.projectPicture,
        creator: account,
        category: values.AuctionType,
        chainId: chainInfoOpt?.find(item => item.ethChainId === values.ChainId)?.id as number,
        releaseType: Number(values.releaseType),
        token0: values.ContractAddress,
        token0Decimals: Number(values.ContractDecimalPlaces),
        token0Logo: values.TokenLogo,
        token0Name: values.TokenName,
        token0Symbol: values.TokenName,
        totalAmount0: values.TotalSupply,
        token1: values.Token.address,
        ratio: values.SwapRatio,
        openAt: values.startTime?.valueOf(),
        closeAt: values.endTime?.valueOf(),
        reverseEnabled: values.isRefundable,
        whitelistEnabled: values.participantStatus === ParticipantStatus.Whitelist,
        whitelistAddresses: values.participantStatus === ParticipantStatus.Whitelist ? values.whitelist : [],
        status: PoolStatus.Init,
        releaseData: [{ startAt: 0, endAtOrRatio: 0 }]
      }
      if (values.allocationStatus === AllocationStatus.Limited) {
        poolParams['maxAmount1PerWallet'] = `${Number(values.allocationPerWallet)}`
      }
      const releaseType = Number(values.releaseType)
      if (releaseType !== IReleaseType.Instant) {
        if (releaseType === IReleaseType.Cliff) {
          poolParams.releaseData = [{ startAt: values.delayUnlockingTime?.valueOf() as number, endAtOrRatio: 0 }]
        }
        if (releaseType === IReleaseType.Linear) {
          poolParams.releaseData = [
            {
              startAt: values.linearUnlockingStartTime?.valueOf() as number,
              endAtOrRatio: values.linearUnlockingEndTime?.valueOf() as number
            }
          ]
        }
        if (releaseType === IReleaseType.Fragment) {
          let releaseData: { startAt: number; endAtOrRatio: number }[] = []
          values.fragmentReleaseTimes.forEach(item => {
            releaseData.push({
              startAt: item.startAt?.valueOf() as number,
              endAtOrRatio: Number(item.radio)
            })
          })
          releaseData = releaseData.sort((a, b) => {
            if (a.startAt < b.startAt) {
              return -1
            }
            if (a.startAt > b.startAt) {
              return 1
            }
            return 0
          })

          poolParams.releaseData = releaseData
        }
      }
      console.log('poolParams')
      console.log(poolParams)

      return updateLaunchpadPool(poolParams)
    },
    { manual: true }
  )
  const toUpdate = async (value: IDetailInitValue) => {
    const res = await runAsync(value)
    getLaunchpadInfo()
    return res
  }
  const onSubmit = async (value: IDetailInitValue) => {
    console.log('submit submit submit submit submit')
    console.log(value)
    await toUpdate(value)
  }
  const isSm = useBreakpoint('sm')
  return (
    <CardBox sx={{ ...sx }}>
      <Formik
        enableReinitialize
        initialValues={curPoolList}
        validationSchema={poolSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ values, setFieldValue, setValues, errors, handleSubmit }) => {
          return (
            <Stack component={'form'} gap={24} onSubmit={handleSubmit}>
              <BaseBox>
                <Title sx={{ color: '#20201E', fontSize: 28 }}>auction Round</Title>
                <Stack mt={20} sx={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
                  {poolList.map(item => {
                    return (
                      <Chip
                        sx={{
                          width: 'max-content',
                          padding: 5
                        }}
                        key={item.id}
                        label={item.name}
                        variant={curPoolId === item.id ? 'outlined' : 'filled'}
                        onClick={() => {
                          setCurPoolId(item.id)
                        }}
                      />
                    )
                  })}
                  {!poolList.find(item => !item.id) && <Chip label="Add New List" onClick={() => setCurPoolId(0)} />}
                </Stack>
              </BaseBox>
              <BaseBox>
                <Title sx={{ color: '#20201E', fontSize: 28 }}>Token Information</Title>
                <Stack flexDirection={'column'} mt={32} gap={isSm ? 16 : 32}>
                  <FormLayout
                    title1="Project Picture"
                    childTitle={
                      <Body02
                        sx={{ fontSize: 12, color: '#626262' }}
                      >{`(Please upload same picture with different size. JPEG, PNG, WEBP Files, Size<10M)`}</Body02>
                    }
                    childForm={
                      <Stack sx={{ flexDirection: isSm ? 'column' : 'row', gap: 16 }}>
                        <Stack sx={{ flexDirection: 'column', gap: 16, width: isSm ? '100%' : 260 }}>
                          <FormUploadAdd
                            formItemName="projectMobilePicture"
                            fileUrl={values?.projectMobilePicture}
                            setFieldValue={setFieldValue}
                            labelId="ProjectPictureSmallImg"
                            labelChild={<BigAddIcon />}
                            labelSx={{ width: '100%', height: 240, border: '1px dashed #D7D6D9' }}
                            firstTrigger={true}
                          />
                          <Body02 sx={{ fontSize: 12, color: '#626262' }}>{`Suggested size: 375px*290px`}</Body02>
                        </Stack>
                        <Stack sx={{ flexDirection: 'column', gap: 16, width: isSm ? '100%' : 400 }}>
                          <FormUploadAdd
                            formItemName="projectPicture"
                            fileUrl={values?.projectPicture}
                            setFieldValue={setFieldValue}
                            labelId="ProjectPictureBigImg"
                            labelChild={<BigAddIcon />}
                            labelSx={{ width: '100%', height: 240, border: '1px dashed #D7D6D9' }}
                            firstTrigger={true}
                          />
                          <Body02 sx={{ fontSize: 12, color: '#626262' }}>{`Suggested size: 1360px*600px`}</Body02>
                        </Stack>
                      </Stack>
                    }
                  />

                  <FormLayout
                    title1="Pool Name"
                    childForm={
                      <FormItem name={'name'}>
                        <OutlinedInput placeholder="Name of the project, eg. Bounce" />
                      </FormItem>
                    }
                  />
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
                        <OutlinedInput placeholder="Name of the token, eg. Bounce" />
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
                        name="Token.symbol"
                        label="Select Token"
                        required
                        sx={{ flex: 1 }}
                        startAdornment={<TokenImage alt={values.Token.symbol} src={values.Token.smallUrl} size={32} />}
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
                        <FormItem placeholder="0.00" sx={{ flex: 1 }} name="SwapRatio">
                          <NumberInput
                            value={values.SwapRatio}
                            onUserInput={value => setFieldValue('SwapRatio', value)}
                            endAdornment={
                              <>
                                <TokenImage alt={values.Token.symbol} src={values.Token.smallUrl} size={24} />
                                <Typography sx={{ ml: 8 }}>{values.Token.symbol}</Typography>
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
                              <TokenImage alt={values.Token.symbol} src={values.Token.smallUrl} size={24} />
                              <Typography sx={{ ml: 8 }}>{values.Token.symbol}</Typography>
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
                  <Box sx={{ mt: 38, mb: 34 }}>
                    <Stack direction="row" alignItems="center" spacing={8}>
                      <Typography variant="h3" sx={{ fontSize: 16 }}>
                        Participant
                      </Typography>

                      <Tooltip title="Once activated, only traders you put in this whitelist can join your auction.">
                        <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
                      </Tooltip>
                    </Stack>

                    <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="participantStatus">
                      <FormControlLabel
                        value={ParticipantStatus.Public}
                        control={<Radio disableRipple />}
                        label="Public"
                      />
                      <FormControlLabel
                        value={ParticipantStatus.Whitelist}
                        control={<Radio disableRipple />}
                        label="Whitelist"
                      />
                    </Field>
                    <FormHelperText error={!!errors.participantStatus}>{errors.participantStatus}</FormHelperText>
                    <FormHelperText error={!!errors.whitelist}>{errors.whitelist}</FormHelperText>
                  </Box>
                  <Stack
                    sx={{ flexDirection: { xs: 'column', md: 'row' } }}
                    spacing={10}
                    justifyContent="space-between"
                  >
                    <ButtonBase
                      sx={{ width: 'fit-content', textDecorationLine: 'underline', mr: 8 }}
                      disabled={values.participantStatus !== ParticipantStatus.Whitelist}
                      onClick={() => {
                        showImportWhitelistDialog(values, setValues)
                      }}
                    >
                      {values.participantStatus === ParticipantStatus.Whitelist && (
                        <Typography sx={{ color: 'var(--ps-gray-700)' }}>Import Whitelist</Typography>
                      )}
                    </ButtonBase>
                  </Stack>
                </Stack>
              </BaseBox>
              <SubmitComp toUpdate={toUpdate} values={values} errors={errors} loading={loading} isChange={true} />
            </Stack>
          )
        }}
      </Formik>
    </CardBox>
  )
}
export default DetailForm
