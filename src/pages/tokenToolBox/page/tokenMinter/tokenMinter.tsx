import { Box, MenuItem, Stack, styled, Typography } from '@mui/material'
import { ContainerBox, Title } from '../tokenLocker'
import { Formik } from 'formik'
import { useActiveWeb3React } from '../../../../hooks'
import { ChainId, ChainList } from '../../../../constants/chain'
import { FormLayout, ToolBoxInput, ToolBoxSelect } from '../../components/tokenLockerForm'
import FormItem from '../../../../bounceComponents/common/FormItem'
import Image from '../../../../components/Image'
import DropZone from '../../../../bounceComponents/common/DropZone/DropZone'
import { SolidBtn } from '../disperse/disperse'
import { Body03, H3Black, H4, H5 } from 'components/Text'

interface IMinter {
  chainId: number
  type: string
  recipients: string
}

export default function TokenMinter() {
  const { chainId } = useActiveWeb3React()
  const minter: IMinter = {
    chainId: chainId || ChainId.MAINNET,
    type: 'chain',
    recipients: ''
  }
  return (
    <Box>
      <ContainerBox>
        <Formik initialValues={minter} onSubmit={() => {}}>
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
              <FormLayout
                childForm={
                  <FormItem name={'Token name'}>
                    <ToolBoxInput placeholder={'Token name'} />
                  </FormItem>
                }
              />
              <FormLayout
                childForm={
                  <FormItem name={'Token symbol'}>
                    <ToolBoxInput placeholder={'Token symbol'} />
                  </FormItem>
                }
              />
              <FormLayout
                childForm={
                  <FormItem name={'Total supply'}>
                    <ToolBoxInput placeholder={'Total supply'} />
                  </FormItem>
                }
              />
              <FormLayout
                childForm={
                  <FormItem name={'Token decimal'}>
                    <ToolBoxInput placeholder={'Token decimal'} />
                  </FormItem>
                }
              />
              <FormLayout
                childForm={
                  <FormItem name={'Token Image'}>
                    <Box>
                      <H5 sx={{ marginBottom: 10 }}>Token image</H5>
                      <DropZone getFile={file => {}} />
                      <FeeBox>
                        <H4>Fee 0</H4>
                        <Body03>+ 0.3% total supply</Body03>
                      </FeeBox>
                    </Box>
                  </FormItem>
                }
              />
              <FormLayout
                childForm={
                  <FormItem name={'Mint Button'}>
                    <SolidBtn
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

const FeeBox = styled(Box)`
  margin-top: 16px;
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  background: var(--yellow-15, rgba(225, 242, 92, 0.15));
`
