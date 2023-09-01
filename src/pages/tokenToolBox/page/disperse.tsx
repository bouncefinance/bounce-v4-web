import { Box, MenuItem, Stack, styled, Typography } from '@mui/material'
import { ContainerBox, Title } from './tokenLocker'
import { Formik } from 'formik'
import { ChainId, ChainList } from '../../../constants/chain'
import Image from '../../../components/Image'
import { FormLayout, LineCom, ToolBoxInput, ToolBoxSelect } from '../components/tokenLockerForm'
import FormItem from '../../../bounceComponents/common/FormItem'
import { Body01, GrayBody02, H4, SmallText } from '../../../components/Text'
import DropZone from '../../../bounceComponents/common/DropZone/DropZone'
import { useActiveWeb3React } from '../../../hooks'
import Papa from 'papaparse'

interface IDisperse {
  chainId: number
  type: string
  recipients: string
  recipientsList: string[][]
}

export default function Disperse() {
  const { chainId } = useActiveWeb3React()
  const onSubmit = (value: IDisperse) => {}
  const disperse: IDisperse = {
    chainId: chainId || ChainId.MAINNET,
    type: 'chain',
    recipients: '',
    recipientsList: []
  }

  return (
    <Box>
      <ContainerBox>
        <Title
          sx={{
            marginBottom: '48px'
          }}
        >
          Disperse
        </Title>
        <SubTitle>
          <Desc>Verb distribute ether or tokens to multiple addresses</Desc>
          <Desc>View history</Desc>
        </SubTitle>
        <Formik initialValues={disperse} onSubmit={onSubmit}>
          {({ values, errors, setFieldValue, handleSubmit }) => (
            <Box
              component={'form'}
              sx={{
                borderRadius: '25px',
                background: '#fff',
                padding: '56px'
              }}
              onSubmit={handleSubmit}
            >
              <Box
                sx={{
                  borderRadius: '20px',
                  padding: '30px',
                  border: '1px solid var(--grey-05, #E8E9E4)'
                }}
              >
                <FormLayout
                  childForm={
                    <FormItem sx={{ width: '30%' }}>
                      <Box display={'flex'} gap={10}>
                        <Tab
                          className={values.type == 'chain' ? 'active' : ''}
                          onClick={() => {
                            setFieldValue('type', 'chain')
                          }}
                        >
                          Chain
                        </Tab>
                        <Tab
                          className={values.type == 'token' ? 'active' : ''}
                          onClick={() => {
                            setFieldValue('type', 'token')
                          }}
                        >
                          Token
                        </Tab>
                      </Box>
                    </FormItem>
                  }
                />
                {values.type == 'chain' && (
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
                )}
                {values.type == 'token' && (
                  <FormLayout
                    title1="Token address"
                    childForm={
                      <FormItem name={'tokenAddress'}>
                        <ToolBoxInput placeholder={'Token Address'} />
                      </FormItem>
                    }
                  />
                )}
                <LineCom />
                <FormLayout
                  title1="You have"
                  childForm={
                    <FormItem name={'balance'}>
                      <GreenToolbox placeholder={'0.0'} />
                    </FormItem>
                  }
                />
                <LineCom />
                <FormLayout
                  title1="Recipients and amounts"
                  childForm={
                    <FormItem name={'Recipients'}>
                      <Box display={'flex'} flexDirection="column">
                        <GrayBody02>
                          Enter one address and amount in Token on each line. supports any format.
                        </GrayBody02>
                        <ToolBoxInput
                          multiline={true}
                          sx={{ minHeight: '200px', marginTop: 20, marginBottom: 12, alignItems: 'flex-start' }}
                          value={values.recipients}
                          onChange={event => {
                            setFieldValue('recipients', event.target.value)
                          }}
                        />
                        <DropZone
                          getFile={file => {
                            Papa.parse(file, {
                              skipEmptyLines: true,
                              complete: function (results) {
                                setFieldValue('recipients', results.data.join('\n'))
                                setFieldValue('recipientsList', results.data)
                              }
                            })
                          }}
                        />
                        <GrayBody02>
                          We accept documents in the form of CSV, EXCEL,or PDF files. The size limit document is 10MB
                        </GrayBody02>
                        <ConfirmBox>
                          <H4>Confirm</H4>
                          <ConfirmDetailBox>
                            <BoxSpaceBetween>
                              <SmallText>Address</SmallText>
                              <SmallText>Amount</SmallText>
                            </BoxSpaceBetween>
                            <LineCom />
                            {values.recipientsList &&
                              values.recipientsList
                                .filter(v => v.length == 2)
                                .map((v, idx) => {
                                  return (
                                    <BoxSpaceBetween key={idx}>
                                      <SmallText>{v[0]}</SmallText>
                                      <Body01>{v[1]}ETH</Body01>
                                    </BoxSpaceBetween>
                                  )
                                })}
                            <BoxSpaceBetween>
                              <SmallText>Your balance</SmallText>
                              <Body01>ETH</Body01>
                            </BoxSpaceBetween>
                            <BoxSpaceBetween>
                              <SmallText>Remaining</SmallText>
                              <Body01>ETH</Body01>
                            </BoxSpaceBetween>
                          </ConfirmDetailBox>
                        </ConfirmBox>
                      </Box>
                    </FormItem>
                  }
                />
                <BoxSpaceBetween gap={10}>
                  <LineBtn>Approve</LineBtn>
                  <SolidBtn>Disperse token</SolidBtn>
                </BoxSpaceBetween>
              </Box>
            </Box>
          )}
        </Formik>
      </ContainerBox>
    </Box>
  )
}
const SubTitle = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 54px;
`
const Desc = styled(Typography)`
  color: #626262;
`
const GreenToolbox = styled(ToolBoxInput)`
  background: var(--yellow, #e1f25c);
`
const ConfirmBox = styled(Box)`
  border-radius: 16px;
  margin-top: 32px;
  padding: 24px;
  background: var(--grey-06, #f6f6f3);
`
const ConfirmDetailBox = styled(Box)`
  padding: 24px;
  border-radius: 16px;
  margin-top: 16px;
  background: var(--white-100, #fff);
`
const BoxSpaceBetween = styled(Box)`
  display: flex;
  justify-content: space-between;
`
const LineBtn = styled(`button`)`
  display: flex;
  padding: 20px 40px;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-radius: 8px;
  border: 1px solid var(--black-100, #121212);
  background: var(--white-100, #fff);

  &.hover {
    cursor: pointer;
  }
`
const SolidBtn = styled(`button`)`
  display: flex;
  padding: 20px 40px;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-radius: 8px;
  background: var(--gray-04, #d7d6d9);
  border: transparent;

  &.hover {
    cursor: pointer;
  }

  &.active {
    border-radius: 8px;
    background: var(--black-100, #121212);
    color: white;
  }
`

const Tab = styled(SolidBtn)`
  padding: 10px 20px;
`
