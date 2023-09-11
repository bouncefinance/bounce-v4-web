import {
  Box,
  Button,
  Stack,
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
import { ContainerBox, Title } from '../tokenLocker'
import { H4 } from '../../../../components/Text'
import Search from '../../../../bounceComponents/common/Header/Search'
import BackButton from '../../../../bounceComponents/common/BackButton'
import Image from '../../../../components/Image'

export default function MyDisperse() {
  const dataList: any[] = [{}]
  // const dataList = useDisperseList()
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
          <H4>Select token</H4>
          <Search />
          <TableContainer sx={{ mt: 40 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Token</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Total value</StyledTableCell>
                  <StyledTableCell>Token type</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {dataList.map(record => (
                  <StyledTableRow
                    key={record.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': {
                        background: '#20201E'
                      }
                    }}
                  >
                    <StyledTableCell>
                      <Stack direction={'row'} gap={'8px'}>
                        <Image src={record.tokenSymbol} width="24px" />
                        <Typography>{record.tokenName}</Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>{record.amount}</StyledTableCell>
                    <StyledTableCell>{record.totalValue}</StyledTableCell>
                    <StyledTableCell>{record.tokenType}</StyledTableCell>
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
                        >
                          Lock
                        </Button>
                        <Button
                          sx={{
                            height: '37px',
                            lineHeight: '37px',
                            fontFamily: `'Public Sans'`,
                            fontSize: 14,
                            fontWeight: 600,
                            letterSpacing: '-0.28px',
                            marginLeft: '10px',
                            background: 'transparent',
                            borderRadius: '6px',
                            color: '#fff',
                            '&:hover': {
                              color: '#121212'
                            }
                          }}
                          variant={'outlined'}
                        >
                          Disperse
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
  borderColor: '#626262',
  [`&.${tableCellClasses.head}`]: {
    color: '#777E90',
    fontFamily: `'Inter'`,
    fontFize: 13,
    lineHeight: '18px',
    textTransform: 'capitalize',
    paddingTop: '16px',
    paddingBottom: '16px'
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#fff',
    fontSize: 14,
    fontFamily: `'Inter'`
  }
}))
const StyledTableRow = styled(TableRow)(() => ({
  cursor: 'pointer',
  '&:nth-of-type(even)': {
    'td:first-of-type': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8
    },
    'td:last-child': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8
    }
  },
  td: {
    border: 0
  }
}))
