import { Box, MenuItem, Stack, Typography } from '@mui/material'
import { ContainerBox, Title } from '../tokenLocker'
import { Formik } from 'formik'
import { useActiveWeb3React } from '../../../../hooks'
import { ChainId, ChainList } from '../../../../constants/chain'
import { FormLayout, ToolBoxInput, ToolBoxSelect } from '../../components/tokenLockerForm'
import FormItem from '../../../../bounceComponents/common/FormItem'
import Image from '../../../../components/Image'
import { BoxSpaceBetween, SolidBtn } from '../disperse/disperse'
import { H3Black, SmallTextGray } from 'components/Text'
import { hideDialogConfirmation, showRequestConfirmDialog } from '../../../../utils/auction'
import { useTokenMinter } from '../../../../hooks/useTokenMinter'
import { useState } from 'react'
import { isAddress } from '@ethersproject/address'

interface IMinter {
  chainId: number
  name: string
  symbol: string
  decimals: string
  initial_supply: string
}

export default function TokenMinter() {
  const { chainId } = useActiveWeb3React()
  const [currentChain, setCurrentChain] = useState(chainId)
  const tokenMinter = useTokenMinter(currentChain as ChainId)
  const minter: IMinter = {
    chainId: chainId || ChainId.SEPOLIA,
    name: '',
    symbol: '',
    decimals: '',
    initial_supply: ''
  }

  const onSubmit = (value: IMinter) => {
    showRequestConfirmDialog()
    console.log('Mintervalue', value)
    try {
      tokenMinter(value.name, value.symbol, value.decimals ? value.decimals : '18', value.initial_supply).then(resp => {
        console.log('Minter', resp)
        hideDialogConfirmation()
      })
    } catch (e) {
      console.log('Minter', e)
      hideDialogConfirmation()
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
            return errors
          }}
        >
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
              <H3Black>Token Minter</H3Black>
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
                      {ChainList.filter(item => item.id === ChainId.SEPOLIA).map(t => (
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
                    <SmallTextGray mt={8}>18 reconmended</SmallTextGray>
                    <BoxSpaceBetween>
                      <SmallTextGray mt={8}>Total supply (including decimals - raw amount)</SmallTextGray>
                      <SmallTextGray mt={8}>10000000000000000000000</SmallTextGray>
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
              <FormLayout
                childForm={
                  <FormItem name={'Mint Button'}>
                    <SolidBtn
                      type={'submit'}
                      className={errors.name || errors.symbol || errors.initial_supply ? '' : 'active'}
                      style={{
                        width: '100%'
                      }}
                    >
                      Mint a new token
                    </SolidBtn>
                  </FormItem>
                }
              />
            </Box>
          )}
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
