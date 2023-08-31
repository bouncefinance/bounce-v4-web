import {
  Box,
  Stack,
  styled,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
  FormControlLabel,
  FormLabel
} from '@mui/material'
import RadioGroupFormItem from 'bounceComponents/create-auction-pool/RadioGroupFormItem'
import Radio from 'bounceComponents/create-auction-pool/Radio'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'
import Switch, { SwitchProps } from '@mui/material/Switch'
import FormItem from 'bounceComponents/common/FormItem'
import Image from 'components/Image'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import React, { useEffect, useState, useCallback } from 'react'
import { ChainId } from 'constants/chain'
import { useActiveWeb3React } from 'hooks'
import { ChainList } from 'constants/chain'
import { useOptionDatas } from 'state/configOptions/hooks'
import { useShowLoginModal } from 'state/users/hooks'
import { ReactComponent as TipIcon } from 'assets/imgs/toolBox/tips.svg'
import Tooltip from 'bounceComponents/common/Tooltip'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { Moment } from 'moment'
import NumberInput from 'bounceComponents/common/NumberInput'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'

interface IFragmentReleaseTimes {
  startAt: Moment | null
  radio: string
  key?: number
}
const defaultFragmentRelease = {
  startAt: null,
  radio: ''
}
interface releaseItemParam {
  startAt: string
  radio: number | string
}
interface ISeller {
  tokenAddress: string
  anotherTokenAddress?: string
  anotherTokenChecked?: boolean
  chainId: ChainId
  tokanName: string
  tokenSymbol: string
  tokenDecimal: number
  balance: string
  title: string
  amount: string
  releaseType: IReleaseType
  startTime: Moment | null
  endTime: Moment | null
  delayUnlockingTime: Moment | null
  linearUnlockingStartTime: Moment | null
  linearUnlockingEndTime: Moment | null
  releaseDataArr: releaseItemParam[]
  fragmentReleaseTimes: []
  segmentAmount?: string
}
const sellerValidationSchema = yup.object({
  tokenAddress: yup.string().required('Token Address is a required'),
  anotherTokenAddress: yup.string().required('Token Address is a required'),
  chainId: yup.number().required()
})
export const ToolBoxSelect = styled(Select)(() => ({
  border: '0',
  borderRadius: '8px',
  background: '#F6F6F3',
  '.MuiSelect-outlined': {
    border: '0',
    padding: '16px !important'
  },
  '&:hover': {
    border: '0',
    background: '#F6F6F3'
  },
  '&.Mui-focused': {
    border: '0',
    background: '#F6F6F3'
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: '0'
  }
}))
export const ToolBoxInput = styled(OutlinedInput)(() => ({
  background: '#F6F6F3',
  border: '0',
  fieldset: {
    border: '0'
  },
  '&:hover': {
    border: '0'
  }
}))
export const LineCom = styled(Box)(() => ({
  width: '100%',
  height: '1px',
  background: '#D4D6CF',
  margin: '24px 0'
}))
const RowTextInfo = ({ label, value, line = true }: { label: string; value: string; line?: boolean }) => {
  return (
    <Stack
      direction={'row'}
      flexWrap={'nowrap'}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{
        height: '52px',
        borderBottom: line ? '1px solid #E8E9E4' : 'unset'
      }}
    >
      <Typography
        sx={{
          color: '#959595',
          fontFamily: `'Inter'`,
          fontSize: '16px'
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: '#000',
          fontFamily: `'Inter'`,
          fontSize: '16px'
        }}
      >
        {value}
      </Typography>
    </Stack>
  )
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
function LabelTitle({ children }: { children: any }) {
  return <FormLabel sx={{ fontWeight: 600, color: '#222223', mt: 10 }}>{children}</FormLabel>
}
const TokenLockerForm = () => {
  const showLoginModal = useShowLoginModal()
  const { chainId, account } = useActiveWeb3React()
  const optionDatas = useOptionDatas()

  useEffect(() => {
    !account && showLoginModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  const sellerValue: ISeller = {
    tokenAddress: '',
    chainId: chainId || ChainId.MAINNET,
    anotherTokenChecked: false,
    tokanName: '',
    tokenSymbol: '',
    tokenDecimal: 18,
    balance: '',
    title: '',
    amount: '',
    releaseType: IReleaseType.Cliff,
    startTime: null,
    endTime: null,
    delayUnlockingTime: null,
    linearUnlockingStartTime: null,
    linearUnlockingEndTime: null,
    fragmentReleaseTimes: [],
    releaseDataArr: [],
    segmentAmount: ''
  }

  const onSubmit = (value: ISeller) => {
    const chainInfoOptId = optionDatas?.chainInfoOpt?.find(chainInfo => chainInfo?.['ethChainId'] === value.chainId)
    console.log('chainInfoOptId?.id as ChainId>>>', chainInfoOptId?.id as ChainId)
  }
  return (
    // TODO: move LocalizationProvider to _app.tex
    <LocalizationProvider dateAdapter={AdapterMoment} localeText={{ start: 'Start time', end: 'End time' }}>
      <Formik
        enableReinitialize
        initialValues={sellerValue}
        validationSchema={sellerValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, setFieldValue, handleSubmit }) => (
          <Box
            component={'form'}
            sx={{
              borderRadius: '0 25px 25px 25px',
              background: '#fff',
              padding: '56px'
            }}
            onSubmit={handleSubmit}
          >
            <FormLayout
              childForm={
                <FormItem>
                  <ToolBoxSelect
                    variant="outlined"
                    value={values.chainId}
                    onChange={({ target }) => {
                      setFieldValue('chainId', target.value)
                    }}
                    placeholder={'Select chain'}
                    renderValue={selected => {
                      const currentChain = ChainList.find(item => item.id === selected)
                      return (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 16,
                            alignItems: 'center'
                          }}
                        >
                          {selected ? (
                            <>
                              <Image style={{ width: 32, height: 32 }} src={currentChain?.logo as string} />
                              <Stack>
                                <Typography
                                  component={'span'}
                                  sx={{
                                    color: '#959595',
                                    fontFamily: `'Inter'`,
                                    fontSize: 12
                                  }}
                                >
                                  Select Chain
                                </Typography>
                                <Title sx={{ fontSize: 14, color: '#121212' }}>{currentChain?.name}</Title>
                              </Stack>
                            </>
                          ) : (
                            <Title sx={{ fontSize: 14, color: '#959595', fontWeight: 500 }}>Select Chain</Title>
                          )}
                        </Box>
                      )
                    }}
                  >
                    {ChainList.map(t => (
                      <MenuItem
                        key={t.id}
                        value={t.id}
                        sx={{
                          '&.Mui-selected': {
                            background: values.chainId === t.id ? '#E1F25C' : ''
                          }
                        }}
                      >
                        <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                          <Image style={{ width: 25, height: 25 }} src={t.logo} />
                          <Title sx={{ fontSize: 16 }}>{t.name}</Title>
                        </Stack>
                      </MenuItem>
                    ))}
                  </ToolBoxSelect>
                </FormItem>
              }
            />
            <LineCom />
            <FormLayout
              title1="Token address"
              childForm={
                <FormItem name={'tokenAddress'}>
                  <ToolBoxInput placeholder={'Token Address'} />
                </FormItem>
              }
            />
            <FormLayout
              title1="Use another owner"
              isShowByChecked={true}
              checkedHandle={(value: boolean) => {
                setFieldValue('anotherTokenChecked', value)
              }}
              description={'The address you input here will be receive the tokens once they are unlocked'}
              childForm={
                <FormItem name={'anotherTokenAddress'}>
                  <ToolBoxInput placeholder={'Token Address'} />
                </FormItem>
              }
            />
            <LineCom />
            <RowTextInfo label={'Token name'} value={'Auction'} />
            <RowTextInfo label={'Token symbol'} value={'Auction'} />
            <RowTextInfo label={'Token decimal'} value={'18'} />
            <RowTextInfo label={'Balance'} value={'100,000,000'} line={false} />
            <LineCom />
            <FormLayout
              title1="Title"
              childForm={
                <FormItem name={'title'}>
                  <ToolBoxInput placeholder={'Please enter locker title'} />
                </FormItem>
              }
            />
            <FormLayout
              title1="Amount"
              childForm={
                <FormItem name={'amount'}>
                  <ToolBoxInput placeholder={'Please enter amount'} />
                </FormItem>
              }
            />
            <LineCom />
            <FormLayout
              title1={
                <>
                  <Title sx={{ color: '#20201E', fontSize: 20, lineHeight: '28px' }}>Locking model</Title>
                  <Tooltip title="Coming soon">
                    <TipIcon
                      style={{
                        cursor: 'pointer'
                      }}
                    />
                  </Tooltip>
                </>
              }
              childForm={
                <Field component={RadioGroupFormItem} row sx={{ mt: 10 }} name="releaseType">
                  <FormControlLabel value={IReleaseType.Cliff} control={<Radio />} label="Normal" />
                  <FormControlLabel value={IReleaseType.Linear} control={<Radio />} label="Linear" />
                  <FormControlLabel value={IReleaseType.Fragment} control={<Radio />} label="Stage" />
                </Field>
              }
            />
            {Number(values.releaseType) === IReleaseType.Instant ? (
              <LabelTitle>Participate in the auction to get tokens immediately</LabelTitle>
            ) : Number(values.releaseType) === IReleaseType.Cliff ? (
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
                setFragmentReleaseTimes={(val: IFragmentReleaseTimes[]) => setFieldValue('fragmentReleaseTimes', val)}
              />
            ) : (
              <LabelTitle>No unlocking method is set; tokens can be claimed after the specified end.</LabelTitle>
            )}
          </Box>
        )}
      </Formik>
    </LocalizationProvider>
  )
}
const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}))
export const FormLayout = ({
  title1,
  childForm,
  isShowByChecked,
  checkedHandle,
  description
}: {
  title1?: string | React.ReactNode
  isShowByChecked?: boolean
  checkedHandle?: (value: boolean) => void
  childForm: React.ReactElement
  description?: string
}) => {
  const [show, setShow] = useState(!isShowByChecked)
  return (
    <Stack sx={{ flexDirection: 'column', marginBottom: '24px' }}>
      <Stack mb={'12px'} sx={{ flexDirection: 'row' }} justifyContent={'flex-start'} alignItems={'center'} gap={'16px'}>
        {title1 && typeof title1 === 'string' ? (
          <Title sx={{ color: '#20201E', fontSize: 20, lineHeight: '28px' }}>{title1}</Title>
        ) : (
          title1
        )}
        {isShowByChecked && (
          <IOSSwitch
            onChange={() => {
              setShow(!show)
              checkedHandle && checkedHandle(!show)
            }}
            sx={{ m: 1 }}
            defaultChecked={false}
          />
        )}
      </Stack>
      {show && childForm}
      {show && description && (
        <Typography
          sx={{ marginTop: '8px', fontFamily: `'Inter'`, fontSize: '12px', textAlign: 'left', color: '#959595' }}
        >
          {description}
        </Typography>
      )}
    </Stack>
  )
}
const Title = styled(Typography)({
  fontFamily: 'Public Sans',
  fontSize: '28px',
  fontWeight: 600,
  lineHeight: '28px',
  letterSpacing: '-0.4px',
  textAlign: 'left',
  color: '#20201E'
})
export default TokenLockerForm
