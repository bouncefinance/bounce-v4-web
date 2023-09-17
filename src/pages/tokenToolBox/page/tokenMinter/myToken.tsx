import {
  Box,
  Button,
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
import { ContainerBox, Title } from '../tokenlocker/tokenLocker'
import BackButton from '../../../../bounceComponents/common/BackButton'
import { Stack } from '@mui/system'
import { useTokenList } from '../../../../bounceHooks/toolbox/useTokenInfo'
import { TokenInfo } from '../../../../api/toolbox/type'
import { routes } from '../../../../constants/routes'
import { useOptionDatas } from '../../../../state/configOptions/hooks'
import { Currency, CurrencyAmount } from '../../../../constants/token'
import { ChainId } from '../../../../constants/chain'
import { useActiveWeb3React } from '../../../../hooks'

export default function MyToken() {
  const optionDatas = useOptionDatas()
  const { account } = useActiveWeb3React()
  const { data } = useTokenList(account)

  function getChainName(chain_id: number) {
    return optionDatas.chainInfoOpt?.find(chainInfo => chainInfo?.['ethChainId'] === chain_id)
  }

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
            My Token
          </Title>
          <TableContainer sx={{ mt: 40 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Token</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Chain</StyledTableCell>
                  <StyledTableCell>Balance</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data?.list.map((record: TokenInfo, idx: number) => (
                  <StyledTableRow key={record.id} className={idx % 2 == 0 ? 'odd' : ''}>
                    <StyledTableCell>
                      <Stack direction={'row'} gap={'8px'}>
                        <img src={record.small_url} width="24px" />
                        <Typography>{record.name}</Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>{record.token}</StyledTableCell>
                    <StyledTableCell>{getChainName(Number(record.chain_id))?.chainName}</StyledTableCell>
                    <StyledTableCell>
                      {CurrencyAmount.fromRawAmount(
                        new Currency(
                          getChainName(Number(record.chain_id))?.id || ChainId.SEPOLIA,
                          record.contract,
                          record.decimals
                        ),
                        record.supply
                      )?.toSignificant()}
                    </StyledTableCell>
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
                          href={routes.tokenToolBox.tokenMinterInfo + `/${record.chain_id}/${record.hash}`}
                        >
                          Detail
                        </Button>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
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
