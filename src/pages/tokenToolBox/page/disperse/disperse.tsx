import { Box, MenuItem, Stack, styled, Typography } from '@mui/material'
import { ContainerBox, Title } from '../tokenlocker/tokenLocker'
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
import { useCallback, useMemo, useState } from 'react'
import { CurrencyAmount } from '../../../../constants/token'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from '../../../../utils/auction'
import { useDisperseEther, useDisperseToken } from '../../../../hooks/useDisperse'
import { isAddress } from '@ethersproject/address'
import { useErc20TokenDetail } from '../../../../bounceHooks/toolbox/useDisperseCallback'
import { show } from '@ebay/nice-modal-react'
import DialogTips from '../../../../bounceComponents/common/DialogTips'
import { ApprovalState, useApproveCallback } from '../../../../hooks/useApproveCallback'
import { useShowLoginModal } from '../../../../state/users/hooks'
import JSBI from 'jsbi'
import { DISPERSE_CONTRACT_ADDRESSES } from '../../../../constants'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../../constants/routes'
import { useSwitchNetwork } from '../../../../hooks/useSwitchNetwork'

interface IDisperse {
  chainId: number
  type: string
  recipients: string
  tokenAddress: string
}

export default function Disperse() {
  const { chainId, account } = useActiveWeb3React()
  console.log('chainId', chainId)
  const switchChain = useSwitchNetwork()
  const nav = useNavigate()
  // const [currentChain, setCurrentChain] = useState(chainId)
  const params = new URLSearchParams(location.search)
  const disperseType = params.get('disperseType')
  const tokenAddrIn = params.get('tokenAddr')
  const [tokenAddr, setTokenAddr] = useState(tokenAddrIn || '')
  const myChainBalance = useETHBalance(account, chainId)
  const { balance } = useErc20TokenDetail(tokenAddr, chainId || ChainId.SEPOLIA)
  const disperseEther = useDisperseEther(chainId as ChainId)
  const disperseToken = useDisperseToken()
  const showLoginModal = useShowLoginModal()
  const [needApprove, setNeedApprove] = useState('0')
  const [approvalState, approveCallback] = useApproveCallback(
    balance ? CurrencyAmount.fromRawAmount(balance?.currency, needApprove) : undefined,
    DISPERSE_CONTRACT_ADDRESSES[chainId || ChainId.SEPOLIA],
    true
  )
  const ChainSelectOption = ChainList.filter(item => {
    return DISPERSE_CONTRACT_ADDRESSES[item.id] !== ''
  })
  const toDisperseEther = useCallback(
    async (recipients: string[], values: string[]) => {
      showRequestConfirmDialog()
      try {
        if (myChainBalance) {
          const amount = values.map(v => Number(v)).reduce((sum, current) => sum + current, 0)
          const { transactionReceipt } = await disperseEther(
            CurrencyAmount.fromAmount(myChainBalance?.currency, amount)?.raw.toString() || '',
            recipients,
            values.map(v => CurrencyAmount.fromAmount(myChainBalance?.currency, v)?.raw.toString() || '')
          )
          const ret = new Promise((resolve, rpt) => {
            showWaitingTxDialog(() => {
              hideDialogConfirmation()
              rpt()
            })
            transactionReceipt.then((curReceipt: any) => {
              resolve(curReceipt)
            })
          })
          ret
            .then(() => {
              hideDialogConfirmation()
              show(DialogTips, {
                iconType: 'success',
                againBtn: 'View History',
                title: 'Congratulations!',
                content: 'You have successfully disperse Eth',
                onAgain: () => {
                  nav(routes.tokenToolBox.myDisperse)
                }
              })
            })
            .catch()
        }
      } catch (err: any) {
        console.log('disperse', err)
        hideDialogConfirmation()
        show(DialogTips, {
          iconType: 'error',
          againBtn: 'Try Again',
          cancelBtn: 'Cancel',
          title: 'Oops..',
          content:
            err === 'string'
              ? err
              : err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
          onAgain: toDisperseEther
        })
      }
    },
    [disperseEther, myChainBalance]
  )
  const toDisperseToken = useCallback(
    async (token: string, recipients: string[], values: string[]) => {
      showRequestConfirmDialog()
      try {
        if (myChainBalance) {
          const { transactionReceipt } = await disperseToken(
            token,
            recipients,
            values.map(v => CurrencyAmount.fromAmount(myChainBalance?.currency, v)?.raw.toString() || '')
          )
          const ret = new Promise((resolve, rpt) => {
            showWaitingTxDialog(() => {
              hideDialogConfirmation()
              rpt()
            })
            transactionReceipt.then((curReceipt: any) => {
              resolve(curReceipt)
            })
          })
          ret
            .then(() => {
              hideDialogConfirmation()
              show(DialogTips, {
                iconType: 'success',
                againBtn: 'View History',
                title: 'Congratulations!',
                content: 'You have successfully disperse Token',
                onAgain: () => {
                  nav(routes.tokenToolBox.myDisperse)
                }
              })
            })
            .catch()
        }
      } catch (err: any) {
        hideDialogConfirmation()
        show(DialogTips, {
          iconType: 'error',
          againBtn: 'Try Again',
          cancelBtn: 'Cancel',
          title: 'Oops..',
          content:
            err === 'string'
              ? err
              : err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
          onAgain: toDisperseToken
        })
      }
    },
    [disperseToken, myChainBalance]
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
        .catch(error => {
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
        })
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

  const confirmBtn: {
    disabled?: boolean
    loading?: boolean
    text?: string
    run?: () => void
  } = useMemo(() => {
    if (!account) {
      return {
        text: 'Connect wallet',
        run: showLoginModal
      }
    }
    if (approvalState !== ApprovalState.APPROVED) {
      if (approvalState === ApprovalState.PENDING) {
        return {
          text: `Approving use of token...`,
          loading: true
        }
      }
      if (approvalState === ApprovalState.UNKNOWN) {
        return {
          text: 'Approve use of token',
          loading: false
        }
      }
      if (approvalState === ApprovalState.NOT_APPROVED) {
        return {
          text: `Approve use of token`,
          run: toApprove
        }
      }
    }
    return {
      text: 'Approved'
    }
  }, [account, approvalState, toApprove, showLoginModal])
  const onSubmit = (value: IDisperse) => {
    console.log('disperse', 'onSubmit')
    const recipients: string[] = []
    const amount: string[] = []
    formatInput(value.recipients).forEach(v => {
      recipients.push(v[0])
      amount.push(v[1])
    })
    if (value.type == 'token') {
      console.log('disperse', 'onSubmit-token')
      toDisperseToken(value.tokenAddress, recipients, amount)
    } else {
      console.log('disperse', 'onSubmit-eth')
      toDisperseEther(recipients, amount)
    }
  }
  const disperse: IDisperse = {
    chainId: Number(chainId as ChainId),
    type: disperseType || 'chain',
    recipients: '',
    tokenAddress: tokenAddrIn || ''
  }

  function formatInput(input: string) {
    const regexNumber = /\b\d+(\.\d+)?\b/g
    return input
      .split('\n')
      .filter(v => v.length > 42)
      .filter(v => isAddress(v.substring(0, 42)))
      .filter(v => v.substring(42).match(regexNumber)) // contain number
      .map(v => [v.substring(0, 42), v.substring(42).match(regexNumber)![0]])
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
          <Desc
            sx={{
              cursor: 'pointer',
              borderBottom: '1px solid #121212'
            }}
            onClick={() => nav(routes.tokenToolBox.myDisperse)}
          >
            View history
          </Desc>
        </SubTitle>
        <Formik initialValues={disperse} onSubmit={onSubmit}>
          {({ values, errors, setFieldValue, handleSubmit }) => {
            setTokenAddr(values.tokenAddress)
            const currentBalance: CurrencyAmount = values.type == 'chain' ? myChainBalance : balance
            const amount = formatInput(values.recipients)
              .map(v => Number(v[1]))
              .reduce((sum, current) => sum + current, 0)
              .toFixed(10)
            const currencyAmount = CurrencyAmount.fromAmount(currentBalance?.currency, amount)
            const validAmount =
              currentBalance && currencyAmount && JSBI.lessThan(currencyAmount.raw, currentBalance.raw)
            if (!validAmount) {
              errors.recipients = 'Amount of disperse is bigger than your balance'
            }
            setNeedApprove(currencyAmount?.raw.toString() || '0')
            return (
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
                            type={'button'}
                            className={values.type == 'chain' ? 'active' : ''}
                            onClick={() => {
                              setFieldValue('type', 'chain')
                            }}
                          >
                            ETH
                          </Tab>
                          <Tab
                            type={'button'}
                            className={values.type == 'token' ? 'active' : ''}
                            onClick={() => {
                              setFieldValue('type', 'token')
                            }}
                          >
                            ERC20
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
                              switchChain(target.value as unknown as ChainId)
                            }}
                            placeholder={'Select chain'}
                            renderValue={selected => {
                              console.log('chainId-selected', selected)
                              console.log('chainId-selected-value', values.chainId)
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
                            {ChainSelectOption.map(t => (
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
                          <ToolBoxInput value={values.tokenAddress} placeholder={'Token Address'} />
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
                          <SmallText>{currentBalance?.toSignificant() || '-'}</SmallText>
                          {values.type == 'chain' && (
                            <Box display={'flex'} alignItems={'center'} gap={8}>
                              <img src={myChainBalance?.currency?.logo} style={{ width: 28, height: 28 }} />
                              <SmallText>{myChainBalance?.currency?.symbol}</SmallText>
                            </Box>
                          )}
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
                                complete: function (results: any) {
                                  setFieldValue('recipients', results.data.join('\n').replaceAll(',', ' '))
                                }
                              })
                            }}
                          />
                          <GrayBody02>
                            We accept documents in the form of CSV files. The size limit document is 10MB
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
                                formatInput(values.recipients).map((v, idx) => {
                                  return (
                                    <BoxSpaceBetween
                                      key={idx}
                                      sx={{
                                        alignItems: 'center'
                                      }}
                                    >
                                      <Body01>{v[0]}</Body01>
                                      <div
                                        style={{
                                          margin: '0 12px',
                                          background: '#121212',
                                          height: '1px',
                                          width: '100%'
                                        }}
                                      ></div>
                                      <Body01 sx={{ whiteSpace: 'nowrap' }}>
                                        {v[1]} {currentBalance?.currency.symbol}
                                      </Body01>
                                    </BoxSpaceBetween>
                                  )
                                })}
                              <BoxSpaceBetween mt={30}>
                                <SmallText>Total</SmallText>
                                <Box display={'flex'}>
                                  <Body01>{currencyAmount?.toExact()}</Body01>
                                  <Body01 ml={8}> {currentBalance?.currency?.symbol}</Body01>
                                </Box>
                              </BoxSpaceBetween>
                              <BoxSpaceBetween>
                                <SmallText>Remaining</SmallText>
                                <Box display={'flex'}>
                                  {validAmount ? (
                                    <Body01>{currentBalance.subtract(currencyAmount).toSignificant()}</Body01>
                                  ) : currencyAmount ? (
                                    <Body01 sx={{ color: '#FD3333' }}>{`-${currencyAmount
                                      ?.subtract(currentBalance)
                                      .toSignificant()}`}</Body01>
                                  ) : (
                                    ''
                                  )}
                                  <Body01 ml={8}>{currentBalance?.currency?.symbol}</Body01>
                                </Box>
                              </BoxSpaceBetween>
                            </ConfirmDetailBox>
                          </ConfirmBox>
                        </Box>
                      </FormItem>
                    }
                  />
                  <BoxSpaceBetween gap={10}>
                    {values.type == 'token' && approvalState != ApprovalState.APPROVED && (
                      <LineBtn type="button" onClick={confirmBtn.run}>
                        {confirmBtn.text}
                      </LineBtn>
                    )}
                    {values.type == 'chain' && !account && (
                      <LineBtn type="button" onClick={showLoginModal}>
                        Connect wallet
                      </LineBtn>
                    )}
                    <SolidBtn
                      type="submit"
                      className={formatInput(values.recipients).length > 0 && validAmount ? 'active' : ''}
                    >
                      {formatInput(values.recipients).length > 0
                        ? validAmount
                          ? 'Disperse' + (values.type == 'token' ? ' token' : '')
                          : 'Insufficient balance'
                        : 'Please input token address'}
                    </SolidBtn>
                  </BoxSpaceBetween>
                </Box>
              </Box>
            )
          }}
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
