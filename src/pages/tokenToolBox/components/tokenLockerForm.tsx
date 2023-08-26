import { Box, Stack, styled, Typography, Select, MenuItem, OutlinedInput, FormControlLabel } from '@mui/material'
import RadioGroupFormItem from 'bounceComponents/create-auction-pool/RadioGroupFormItem'
import Radio from 'bounceComponents/create-auction-pool/Radio'
import DateTimePickerFormItem from 'bounceComponents/create-auction-pool/DateTimePickerFormItem'
import Switch, { SwitchProps } from '@mui/material/Switch'
import FormItem from 'bounceComponents/common/FormItem'
import Image from 'components/Image'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import React, { useEffect, useState } from 'react'
import { ChainId } from 'constants/chain'
import { useActiveWeb3React } from 'hooks'
import { ChainList } from 'constants/chain'
import { useOptionDatas } from 'state/configOptions/hooks'
import { useShowLoginModal } from 'state/users/hooks'
import { ReactComponent as TipIcon } from 'assets/imgs/toolBox/tips.svg'
import Tooltip from 'bounceComponents/common/Tooltip'
import moment, { Moment } from 'moment'

enum LockTypeParams {
  'normal' = 0,
  'linear' = 1,
  'stage' = 2
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
  releaseType: LockTypeParams
  startTime: string
  endTime: string
  delayUnlockingTime: string
  linearUnlockingStartTime: string
  linearUnlockingEndTime: string
  releaseDataArr: releaseItemParam[]
}
const sellerValidationSchema = yup.object({
  tokenAddress: yup.string().required('Token Address is a required'),
  anotherTokenAddress: yup.string().required('Token Address is a required'),
  chainId: yup.number().required()
})
const ToolBoxSelect = styled(Select)(() => ({
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
const ToolBoxInput = styled(OutlinedInput)(() => ({
  background: '#F6F6F3',
  border: '0',
  fieldset: {
    border: '0'
  },
  '&:hover': {
    border: '0'
  }
}))
const LineCom = styled(Box)(() => ({
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
    releaseType: LockTypeParams.normal
  }

  const onSubmit = (value: ISeller) => {
    const chainInfoOptId = optionDatas?.chainInfoOpt?.find(chainInfo => chainInfo?.['ethChainId'] === value.chainId)
    console.log('chainInfoOptId?.id as ChainId>>>', chainInfoOptId?.id as ChainId)
  }
  return (
    <Formik
      enableReinitialize
      initialValues={sellerValue}
      validationSchema={sellerValidationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleSubmit }) => (
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
                <FormControlLabel value={LockTypeParams.normal} control={<Radio />} label="Normal" />
                <FormControlLabel value={LockTypeParams.linear} control={<Radio />} label="Linear" />
                <FormControlLabel value={LockTypeParams.stage} control={<Radio />} label="Stage" />
              </Field>
            }
          />
          {Number(values.releaseType) === LockTypeParams.normal && (
            <FormLayout
              title1="Lock until(UTC time)"
              childForm={
                <Field
                  component={DateTimePickerFormItem}
                  name="startTime"
                  disablePast
                  maxDateTime={values.endTime}
                  textField={{ sx: { flex: 1 } }}
                  onChange={(startTime: Moment) => {
                    setFieldValue('startTime', startTime)
                    if (
                      valuesState.auctionType === AuctionType.DUTCH_AUCTION &&
                      valuesState.priceSegmentType === PriceSegmentType.Staged &&
                      values.startTime &&
                      moment.isMoment(startTime) &&
                      values.endTime
                    ) {
                      const endTime = resetEndTime(startTime, valuesState.endTime, valuesState.segmentAmount)
                      setFieldValue('endTime', endTime)
                    }
                  }}
                />
              }
            />
          )}
        </Box>
      )}
    </Formik>
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
const FormLayout = ({
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
