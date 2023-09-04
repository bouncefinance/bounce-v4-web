import { Box, MenuItem, Stack, styled, Typography } from '@mui/material'
import { ContainerBox, Title } from '../tokenLocker'
import { Formik } from 'formik'
import { ChainId, ChainList } from '../../../../constants/chain'
import Image from '../../../../components/Image'
import { FormLayout, LineCom, ToolBoxInput, ToolBoxSelect } from '../../components/tokenLockerForm'
import FormItem from '../../../../bounceComponents/common/FormItem'
import { Body01, GrayBody02, H4, SmallText } from '../../../../components/Text'
import DropZone from '../../../../bounceComponents/common/DropZone/DropZone'
import { useActiveWeb3React } from '../../../../hooks'
import Papa from 'papaparse'
import { useETHBalance } from '../../../../state/wallet/hooks'
import { useCallback, useState } from 'react'
import { ApprovalState, useApproveCallback } from '../../../../hooks/useApproveCallback'
import { CurrencyAmount } from '../../../../constants/token'
import { hideDialogConfirmation, showRequestApprovalDialog, showWaitingTxDialog } from '../../../../utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from '../../../../bounceComponents/common/DialogTips'

interface IDisperse {
  chainId: number
  type: string
  recipients: string
}

export default function Disperse() {
  const { chainId, account } = useActiveWeb3React()
  const [currentChain, setCurrentChain] = useState(chainId)
  const myBalance = useETHBalance(account, currentChain)
  const [approvalState, approveCallback] = useApproveCallback(
    myBalance ? CurrencyAmount.fromAmount(myBalance?.currency, myBalance?.toSignificant()) : undefined,
    '0x1506e699A53224e5cE1FdF7917f623D0a9Da5A64',
    true
  )
  const toApprove = useCallback(async () => {
    showRequestApprovalDialog()
    try {
      const { transactionReceipt } = await approveCallback()
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error(err)
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content:
          typeof err === 'string'
            ? err
            : err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toApprove
      })
    }
  }, [approveCallback])

  const onSubmit = (value: IDisperse) => {}
  const disperse: IDisperse = {
    chainId: chainId || ChainId.MAINNET,
    type: 'chain',
    recipients: ''
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
                            setCurrentChain(target.value as ChainId)
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
                      <GreenToolbox>
                        <SmallText>{myBalance?.toSignificant() || '-'}</SmallText>
                        <Box display={'flex'} alignItems={'center'} gap={8}>
                          <img src={myBalance?.currency?.logo} style={{ width: 28, height: 28 }} />
                          <SmallText>{myBalance?.currency?.symbol}</SmallText>
                        </Box>
                      </GreenToolbox>
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
                                setFieldValue('recipients', results.data.join('\n').replaceAll(',', ' '))
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
                            {values.recipients &&
                              values.recipients
                                .split('\n')
                                .filter(v => v.split(' ').length == 2)
                                .map(v => v.split(' '))
                                .map((v, idx) => {
                                  return (
                                    <BoxSpaceBetween key={idx}>
                                      <SmallText>{v[0]}</SmallText>
                                      <Body01>{v[1]}ETH</Body01>
                                    </BoxSpaceBetween>
                                  )
                                })}
                            <BoxSpaceBetween mt={30}>
                              <SmallText>Your balance</SmallText>
                              <Body01>
                                {myBalance?.toSignificant()}
                                {myBalance?.currency?.symbol}
                              </Body01>
                            </BoxSpaceBetween>
                            <BoxSpaceBetween>
                              <SmallText>Remaining</SmallText>
                              <Body01>
                                {myBalance &&
                                  Number(myBalance?.toSignificant()) -
                                    values.recipients
                                      .split('\n')
                                      .filter(v => v.split(' ').length == 2 && Number(v.split(' ')[1]))
                                      .map(v => Number(v.split(' ')[1]))
                                      .reduce((sum, current) => sum + current, 0)}
                                {myBalance?.currency?.symbol}
                              </Body01>
                            </BoxSpaceBetween>
                          </ConfirmDetailBox>
                        </ConfirmBox>
                      </Box>
                    </FormItem>
                  }
                />
                <BoxSpaceBetween gap={10}>
                  <LineBtn onClick={() => {}}>
                    {(() => {
                      switch (approvalState) {
                        case ApprovalState.APPROVED:
                          return 'APPROVED'
                        case ApprovalState.UNKNOWN:
                        case ApprovalState.NOT_APPROVED:
                          return 'APPROVE'
                        case ApprovalState.PENDING:
                          return 'PENDING...'
                      }
                    })()}
                  </LineBtn>
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
const GreenToolbox = styled(Box)`
  display: flex;
  padding: 14px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
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
export const BoxSpaceBetween = styled(Box)`
  display: flex;
  justify-content: space-between;
`
export const LineBtn = styled(`button`)`
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
export const SolidBtn = styled(`button`)`
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
