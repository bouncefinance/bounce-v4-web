import { Box, MenuItem, Stack, Typography } from '@mui/material'
import { ContainerBox, Title } from '../tokenlocker/tokenLocker'
import { Formik } from 'formik'
import { useActiveWeb3React } from '../../../../hooks'
import { ChainId, ChainList } from '../../../../constants/chain'
import { FormLayout, ToolBoxInput, ToolBoxSelect } from '../../components/tokenLockerForm'
import FormItem from '../../../../bounceComponents/common/FormItem'
import Image from '../../../../components/Image'
import { BoxSpaceBetween, SolidBtn } from '../disperse/disperse'
import { H3Black, SmallTextGray } from 'components/Text'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from '../../../../utils/auction'
import { useTokenMinter } from '../../../../hooks/useTokenMinter'
import { isAddress } from '@ethersproject/address'
import { show } from '@ebay/nice-modal-react'
import DialogTips from '../../../../bounceComponents/common/DialogTips'
import { useNavigate } from 'react-router-dom'
import { useShowLoginModal } from '../../../../state/users/hooks'
import { MINTER_CONTRACT_ADDRESSES } from '../../../../constants'
import { useSwitchNetwork } from '../../../../hooks/useSwitchNetwork'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'

interface IMinter {
  chainId: number
  name: string
  symbol: string
  decimals: number
  initial_supply: string
}

export default function TokenMinter() {
  const { chainId, account } = useActiveWeb3React()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  const switchChain = useSwitchNetwork()
  const nav = useNavigate()
  const tokenMinter = useTokenMinter(chainId as ChainId)
  const showLoginModal = useShowLoginModal()
  const ChainSelectOption = ChainList.filter(item => {
    return MINTER_CONTRACT_ADDRESSES[item.id] !== ''
  })
  const minter: IMinter = useMemo(() => {
    return {
      chainId: Number(chainId) as ChainId,
      name: '',
      symbol: '',
      decimals: 18,
      initial_supply: ''
    }
  }, [chainId])

  const onSubmit = async (value: IMinter) => {
    showRequestConfirmDialog()
    console.log('Mintervalue', value)
    try {
      const { hash, transactionReceipt } = await tokenMinter(
        value.name,
        value.symbol,
        value.decimals ? value.decimals.toString() : '18',
        value.initial_supply
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
            againBtn: 'Check Detail',
            title: 'Congratulations!',
            content: 'You have successfully mint a new token',
            onAgain: () => {
              nav(`/TokenToolBox/tokenMinterInfo/${chainConfigInBackend?.id}/${hash}`)
            }
          })
        })
        .catch()
    } catch (err: any) {
      hideDialogConfirmation()
      // show(DialogTips, {
      //   iconType: 'error',
      //   cancelBtn: 'Ok',
      //   title: 'Oops..',
      //   content:
      //     err === 'string'
      //       ? err
      //       : err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong'
      // })
    }
  }
  return (
    <Box>
      <ContainerBox>
        <Formik
          initialValues={minter}
          onSubmit={onSubmit}
          validate={values => {
            const errors: any = {}
            if (!values.name) {
              errors.name = 'Name must have at least 1 character'
            }
            if (!values.symbol) {
              errors.symbol = 'Token symbol must have at least 1 character'
            }
            if (!values.initial_supply) {
              errors.initial_supply = 'Token supply must have at least 1 token'
            }
            if (values.decimals < 1) {
              errors.decimals = 'Decimals can not less than 1'
            }
            return errors
          }}
        >
          {({ values, errors, setFieldValue, handleSubmit }) => {
            console.log('values, errors>>>', values, errors)
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
                <H3Black>Token Minter</H3Black>
                <FormLayout
                  childForm={
                    <FormItem name={'chainId'}>
                      <ToolBoxSelect
                        variant="outlined"
                        onChange={({ target }) => {
                          console.log('chainId change', target?.value)
                          setFieldValue('chainId', target?.value)
                          switchChain(Number(target?.value) as unknown as ChainId)
                        }}
                        placeholder={'Select chain'}
                        renderValue={selected => {
                          const currentChain = ChainList.find(item => Number(item.id) === Number(selected))
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
                                background: Number(values.chainId) === Number(t.id) ? '#E1F25C' : ''
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
                <FormLayout
                  childForm={
                    <FormItem name={'name'}>
                      <ToolBoxInput
                        value={values.name}
                        onChange={e => {
                          console.log('Minter-e', e)
                          if (isAddress(e.target.value)) {
                            setFieldValue('name', e.target.value)
                          }
                        }}
                        placeholder={'Token name'}
                      />
                    </FormItem>
                  }
                />
                <FormLayout
                  childForm={
                    <FormItem name={'symbol'}>
                      <ToolBoxInput
                        value={values.symbol}
                        onChange={e => setFieldValue('symbol', e.target.value)}
                        placeholder={'Token symbol'}
                      />
                    </FormItem>
                  }
                />
                <FormLayout
                  childForm={
                    <Box width={'100%'}>
                      <FormItem name={'initial_supply'}>
                        <ToolBoxInput
                          type={'number'}
                          style={{ width: '100%' }}
                          value={values.initial_supply}
                          onChange={e => setFieldValue('initial_supply', e.target.value)}
                          placeholder={'Total supply'}
                        />
                      </FormItem>
                      <SmallTextGray mt={8}>Total supply(excluding decimals e.g. 100 tokens)</SmallTextGray>
                    </Box>
                  }
                />
                <FormLayout
                  childForm={
                    <Box width={'100%'}>
                      <FormItem name={'decimals'}>
                        <ToolBoxInput
                          type={'number'}
                          value={values.decimals}
                          onChange={e => setFieldValue('decimals', e.target.value)}
                          placeholder={'Token decimal'}
                        />
                      </FormItem>
                      <SmallTextGray mt={8}>18 recommended</SmallTextGray>
                      <BoxSpaceBetween>
                        <SmallTextGray mt={8}>Total supply (including decimals - raw amount)</SmallTextGray>
                        <SmallTextGray mt={8}>
                          {values.initial_supply
                            ? new BigNumber(values.initial_supply).shiftedBy(values.decimals).toString()
                            : '--'}
                        </SmallTextGray>
                      </BoxSpaceBetween>
                    </Box>
                  }
                />
                {/*<FormLayout*/}
                {/*  childForm={*/}
                {/*    <FormItem name={'Token Image'}>*/}
                {/*      <Box>*/}
                {/*        <H5 sx={{ marginBottom: 10 }}>Token image</H5>*/}
                {/*        <DropZone getFile={file => {}} />*/}
                {/*        <FeeBox>*/}
                {/*          <H4>Fee 0</H4>*/}
                {/*          <Body03>+ 0.3% total supply</Body03>*/}
                {/*        </FeeBox>*/}
                {/*      </Box>*/}
                {/*    </FormItem>*/}
                {/*  }*/}
                {/*/>*/}
                {account ? (
                  <FormLayout
                    childForm={
                      <FormItem name={'Mint Button'}>
                        <SolidBtn
                          type={'submit'}
                          className={
                            errors.name || errors.symbol || errors.initial_supply || errors.decimals ? '' : 'active'
                          }
                          style={{
                            width: '100%'
                          }}
                        >
                          Mint a new token
                        </SolidBtn>
                      </FormItem>
                    }
                  />
                ) : (
                  <SolidBtn style={{ width: '100%' }} className={'active'} type={'button'} onClick={showLoginModal}>
                    Connect wallet
                  </SolidBtn>
                )}
              </Box>
            )
          }}
        </Formik>
      </ContainerBox>
    </Box>
  )
}

// const FeeBox = styled(Box)`
//   margin-top: 16px;
//   display: flex;
//   padding: 12px;
//   flex-direction: column;
//   align-items: center;
//   align-self: stretch;
//   border-radius: 8px;
//   background: var(--yellow-15, rgba(225, 242, 92, 0.15));
// `
