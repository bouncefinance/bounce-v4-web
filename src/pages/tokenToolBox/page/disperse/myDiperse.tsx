import {
  Box,
  Button,
  Pagination,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useDisperseList } from '../../../../bounceHooks/toolbox/useDisperseCallback'
import { ContainerBox, Title } from '../tokenlocker/tokenLocker'
import BackButton from '../../../../bounceComponents/common/BackButton'
import { Stack } from '@mui/system'
import { Disperse } from '../../../../api/toolbox/type'
import { ChainId } from '../../../../constants/chain'
import { useOptionDatas } from '../../../../state/configOptions/hooks'
import { Currency, CurrencyAmount } from '../../../../constants/token'
import { getEtherscanLink } from '../../../../utils'
import { useShowLoginModal } from '../../../../state/users/hooks'
import { useEffect, useState } from 'react'
import { useActiveWeb3React } from '../../../../hooks'

export default function MyDisperse() {
  const defaultPageSize = 10
  const [curPage, setCurPage] = useState(1)
  const optionDatas = useOptionDatas()
  console.log('optionDatas', optionDatas)
  const { loading, data } = useDisperseList(curPage, defaultPageSize)
  const { account } = useActiveWeb3React()

  function getChainName(chain_id: number) {
    return optionDatas.chainInfoOpt?.find(chainInfo => chainInfo?.['id'] === chain_id)
  }

  const showLoginModal = useShowLoginModal()
  useEffect(() => {
    !account && showLoginModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  console.log('MyDisperse-loading', loading)
  return (
    <Box>
      <ContainerBox>
        <BackButton />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '25px',
            background: '#fff',
            padding: '56px'
          }}
        >
          <Title
            sx={{
              alignSelf: 'center',
              marginBottom: '48px'
            }}
          >
            My Disperse
          </Title>
          {/*<H4>Select token</H4>*/}
          {/*<Search />*/}
          <TableContainer sx={{ mt: 40 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Token/Chain</StyledTableCell>
                  <StyledTableCell>Disperse Amount</StyledTableCell>
                  <StyledTableCell>Total address</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data?.list.map((record: Disperse, idx: number) => (
                  <StyledTableRow key={record.id} className={idx % 2 == 0 ? 'odd' : ''}>
                    <StyledTableCell>
                      <Stack direction={'row'} gap={'8px'}>
                        {/*<Image src={record.logo} width="24px" />*/}
                        <Typography>{record.name || getChainName(record.chain_id)?.chainName}</Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>
                      {CurrencyAmount.fromRawAmount(
                        new Currency(
                          getChainName(Number(record.chain_id))?.id || ChainId.SEPOLIA,
                          record.contract,
                          record.decimals
                        ),
                        record.amount
                      )?.toSignificant()}
                    </StyledTableCell>
                    <StyledTableCell>{record.total_count}</StyledTableCell>
                    <StyledTableCell align={'right'}>
                      <Stack
                        direction={'row'}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                      >
                        <Button
                          sx={{
                            height: '37px',
                            lineHeight: '37px',
                            fontFamily: `'Public Sans'`,
                            fontSize: 14,
                            fontWeight: 600,
                            letterSpacing: '-0.28px',
                            borderRadius: '6px'
                          }}
                          variant={'contained'}
                          onClick={() => {
                            window.open(
                              getEtherscanLink(
                                getChainName(record.chain_id)?.ethChainId || ChainId.SEPOLIA,
                                record.hash,
                                'transaction'
                              ),
                              '_blank'
                            )
                          }}
                        >
                          Detail
                        </Button>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <Box mt={40} display={'flex'} justifyContent="center">
              <Pagination
                onChange={(_, p) => setCurPage(p)}
                page={curPage}
                count={Math.ceil((data?.total || 0) / (defaultPageSize || 0))}
              />
            </Box>{' '}
          </TableContainer>
        </Box>
      </ContainerBox>
    </Box>
  )
}
const StyledTableCell = styled(TableCell)(() => ({
  border: 'transparent',
  [`&.${tableCellClasses.head}`]: {
    color: '#777E90',
    fontFamily: `'Inter'`,
    fontFize: 13,
    lineHeight: '18px',
    textTransform: 'capitalize',
    borderBottom: '1px solid #e8e9e4',
    paddingTop: '16px',
    paddingBottom: '16px'
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#121212',
    fontSize: 14,
    fontFamily: `'Inter'`
  }
}))
const StyledTableRow = styled(TableRow)`
  &.odd {
    background: #f6f6f3;
    border-radius: 8px;
  }
`
