import {
  Box,
  MenuItem,
  Select,
  Stack,
  Typography,
  FormControlLabel,
  OutlinedInput,
  FormHelperText,
  SxProps
} from '@mui/material'
import { CardBox, BaseBox, Title, GraySwitch, LabelTitle, FormLayout, FormUploadAdd, AddFile } from './BaseComponent'
import { Field, FormikErrors } from 'formik'
import FormItem from 'bounceComponents/common/FormItem'
import { useCallback } from 'react'
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
import MarkdownEditor from 'pages/realWorldAuction/markdownEditor'
// import { detailValidationSchema } from '../schema'
import { IAuctionType, IFragmentReleaseTimes, IValues } from '../type'

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

                    // if (val > 100) {
                    //   setItemValue(idx, 'radio', '100')
                    // } else if (val < 0.01) {
                    //   setItemValue(idx, 'radio', '')
                    // } else {
                    //   setItemValue(idx, 'radio', val)
                    // }
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
const DetailForm = ({
  values,
  sx,
  setFieldValue,
  errors
}: {
  values: IValues
  sx?: SxProps
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  errors: FormikErrors<IValues>
}) => {
  const isSm = useBreakpoint('sm')
  return (
    <CardBox sx={{ ...sx }}>
      <BaseBox>
        <Title sx={{ color: '#20201E', fontSize: 28 }}>Token Information</Title>
        <Stack flexDirection={'column'} gap={isSm ? 16 : 32}>
          <FormLayout
            sxStyle={{ marginTop: isSm ? 24 : 40 }}
            title1="Token Logo"
            childTitle={<Body02 sx={{ fontSize: 12, color: '#626262' }}>{`(JPEG, PNG, WEBP Files, Size<10M)`}</Body02>}
            childForm={
              <FormUploadAdd
                fileUrl={values.pool.TokenLogo.fileUrl}
                formItemName="pool.TokenLogo"
                labelId="TokenLogo"
                setFieldValue={setFieldValue}
                labelChild={<AddFile />}
              />
            }
          />
          <FormLayout
            title1="Token Name"
            childForm={
              <FormItem name={'pool.TokenName'}>
                <OutlinedInput placeholder="Name of the project, eg. Bounce" />
              </FormItem>
            }
          />
          <FormLayout
            title1="Blockchain Platform"
            title2="What platform is this token issued on?"
            childForm={
              <FormItem name="pool.ChainId">
                <Select
                  value={values.pool.ChainId}
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
                          <Title sx={{ fontSize: 14, color: '#959595', fontWeight: 500 }}>select asset platform</Title>
                        )}
                      </Box>
                    )
                  }}
                >
                  {ChainList.map(t => (
                    <MenuItem
                      key={t.id}
                      value={t.id}
                      selected={values.pool.ChainId === t.id ? true : false}
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
              <FormItem name="pool.ContractAddress">
                <OutlinedInput placeholder="Explorer Link" />
              </FormItem>
            }
          />
          <FormLayout
            title1="Contract Decimal Places"
            childForm={
              <FormItem name="pool.ContractDecimalPlaces">
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
              This section is for pre auction information collection. You can change auction details after submit
            </Typography>
          </Stack>
        </Box>
        <Stack flexDirection={'column'} gap={isSm ? 16 : 32}>
          <FormLayout
            title1="Auction Type"
            childForm={
              <FormItem name="pool.AuctionType">
                <Select
                  value={values.pool.AuctionType}
                  onChange={e => {
                    setFieldValue('AuctionType', e.target.value)
                  }}
                  renderValue={selected => {
                    return <Title sx={{ fontSize: 16, color: '#20201E', fontWeight: 500 }}>{selected}</Title>
                  }}
                >
                  {Object.values(IAuctionType).map((value, index) => (
                    <MenuItem key={index} value={value}>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontSize: 14,
                          color: values.pool.AuctionType === value ? '#2B51DA' : '#121212',
                          fontWeight: 400
                        }}
                      >
                        {value}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormItem>
            }
          />
          {values.pool.AuctionType === IAuctionType.NONE && (
            <FormLayout
              title1="Customized needs"
              title2="We will contact you after receipt"
              childForm={
                <FormItem style={{ marginTop: 20 }} name="pool.CustomizedNeeds">
                  <MarkdownEditor
                    value={values.pool.CustomizedNeeds}
                    setEditorValue={value => setFieldValue('pool.CustomizedNeeds', value)}
                    placeholder="Customized needs description"
                  />
                </FormItem>
              }
            />
          )}
          <FormLayout
            title1="Funding Currency"
            childForm={
              <FormItem
                name="pool.Token.tokenToSymbol"
                label="Select Token"
                required
                sx={{ flex: 1 }}
                startAdornment={
                  <TokenImage alt={values.pool.Token.tokenToSymbol} src={values.pool.Token.tokenToLogoURI} size={32} />
                }
              >
                <FakeOutlinedInput
                  readOnly
                  onClick={() => showTokenDialog({ chainId: values.pool.ChainId as ChainId, setFieldValue })}
                />
              </FormItem>
            }
          />
          <FormLayout
            title1="Swap ratio"
            childForm={
              <Stack flexDirection={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 15 }}>
                <Title sx={{ fontSize: 20, color: '#171717' }}>
                  1 {!values.pool.TokenName ? 'USDT' : values.pool.TokenName} =
                </Title>
                {/* 小数点位数大于 精度时还没有报错？ */}
                <FormItem placeholder="0.00" sx={{ flex: 1 }} name="pool.SwapRatio">
                  <NumberInput
                    value={values.pool.SwapRatio}
                    onUserInput={value => setFieldValue('SwapRatio', value)}
                    endAdornment={
                      <>
                        <TokenImage
                          alt={values.pool.Token.tokenToSymbol}
                          src={values.pool.Token.tokenToLogoURI}
                          size={24}
                        />
                        <Typography sx={{ ml: 8 }}>{values.pool.Token.tokenToSymbol}</Typography>
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
              <FormItem name="pool.TotalSupply">
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
                name="pool.startTime"
                disablePast
                maxDateTime={values.pool.endTime}
                textField={{ sx: { flex: 1 } }}
              />
              <Field
                component={DateTimePickerFormItem}
                name="pool.endTime"
                disablePast
                minDateTime={values.pool.startTime}
                textField={{ sx: { flex: 1 } }}
              />
            </Stack>
          </Box>
          <Box>
            <Title sx={{ color: '#20201E', fontSize: 20 }}>Allocation per wallet</Title>
            <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="pool.allocationStatus">
              <FormControlLabel value={AllocationStatus.NoLimits} control={<Radio disableRipple />} label="No Limits" />
              <FormControlLabel value={AllocationStatus.Limited} control={<Radio disableRipple />} label="Limited" />
            </Field>
            {values.pool.allocationStatus === AllocationStatus.Limited && (
              <FormItem name="pool.allocationPerWallet" sx={{ flex: 1 }}>
                <OutlinedInput
                  sx={{ mt: 10 }}
                  endAdornment={
                    <>
                      <TokenImage
                        alt={values.pool.Token.tokenToSymbol}
                        src={values.pool.Token.tokenToLogoURI}
                        size={24}
                      />
                      <Typography sx={{ ml: 8 }}>{values.pool.Token.tokenToSymbol}</Typography>
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
                checked={values.pool.releaseType === 0}
                onChange={() => setFieldValue('pool.releaseType', values.pool.releaseType ? 0 : 1)}
                control={<GraySwitch defaultChecked />}
                label=""
              />
            </Stack>
            {values.pool.releaseType > 0 && (
              <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="pool.releaseType">
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
            {Number(values.pool.releaseType) === IReleaseType.Cliff ? (
              <Stack spacing={6}>
                <LabelTitle>Unlocking Start Time</LabelTitle>
                <Field
                  component={DateTimePickerFormItem}
                  disablePast
                  name="pool.delayUnlockingTime"
                  minDateTime={values.pool.endTime}
                  textField={{ sx: { width: '100%' } }}
                />
              </Stack>
            ) : Number(values.pool.releaseType) === IReleaseType.Linear ? (
              <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={15}>
                <Stack spacing={6}>
                  <LabelTitle>Start Time</LabelTitle>
                  <Field
                    component={DateTimePickerFormItem}
                    disablePast
                    name="pool.linearUnlockingStartTime"
                    minDateTime={values.pool.endTime}
                    textField={{ sx: { width: '100%' } }}
                  />
                </Stack>

                <Stack spacing={6}>
                  <LabelTitle>End Time</LabelTitle>
                  <Field
                    component={DateTimePickerFormItem}
                    disablePast
                    name="pool.linearUnlockingEndTime"
                    minDateTime={values.pool.linearUnlockingStartTime}
                    textField={{ sx: { width: '100%' } }}
                  />
                </Stack>
              </Box>
            ) : Number(values.pool.releaseType) === IReleaseType.Fragment ? (
              <SetFragmentReleaseTime
                minDateTime={values.pool.endTime}
                errors={errors.pool?.fragmentReleaseTimes}
                releaseTimes={values.pool.fragmentReleaseTimes}
                setFragmentReleaseTimes={(val: IFragmentReleaseTimes[]) =>
                  setFieldValue('pool.fragmentReleaseTimes', val)
                }
              />
            ) : (
              <LabelTitle>No unlocking method is set; tokens can be claimed after the specified end.</LabelTitle>
            )}
            <FormHelperText error={!!errors.pool?.fragmentReleaseSize}>
              {errors.pool?.fragmentReleaseSize}
            </FormHelperText>
          </Box>
          <Box>
            <Stack flexDirection={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Title sx={{ fontSize: 20, color: '#20201E' }}>Refundable</Title>
              <FormControlLabel
                checked={values.pool.isRefundable}
                onChange={() => setFieldValue('pool.isRefundable', !values.pool.isRefundable)}
                control={<GraySwitch defaultChecked />}
                label=""
              />
            </Stack>
            {values.pool.isRefundable && values.pool.endTime && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1">Auction will be refundable before the end time</Typography>
                <Box sx={{ borderRadius: 20, bgcolor: '#F5F5F5', color: '#908E96', px: 8, py: 4, ml: 6 }}>
                  Before {values.pool.endTime.format('MMM D, YYYY hh:mm A')}
                </Box>
              </Box>
            )}
          </Box>
        </Stack>
      </BaseBox>
    </CardBox>
  )
}
export default DetailForm
