import {
  Box,
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

export default function MyDisperse() {
  const { loading, data } = useDisperseList()
  console.log('MyDisperse-loading', loading)
  console.log('MyDisperse', data)
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
                  <StyledTableCell>Token</StyledTableCell>
                  <StyledTableCell>Disperse Amount</StyledTableCell>
                  <StyledTableCell>Total address</StyledTableCell>
                  {/*<StyledTableCell></StyledTableCell>*/}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data?.list.map((record: Disperse, idx: number) => (
                  <StyledTableRow key={record.id} className={idx % 2 == 0 ? 'odd' : ''}>
                    <StyledTableCell>
                      <Stack direction={'row'} gap={'8px'}>
                        {/*<Image src={record.logo} width="24px" />*/}
                        <Typography>{record.name}</Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>{record.amount}</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    {/*<StyledTableCell align={'right'}>*/}
                    {/*  <Stack*/}
                    {/*    direction={'row'}*/}
                    {/*    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}*/}
                    {/*  >*/}
                    {/*    <Button*/}
                    {/*      sx={{*/}
                    {/*        height: '37px',*/}
                    {/*        lineHeight: '37px',*/}
                    {/*        fontFamily: `'Public Sans'`,*/}
                    {/*        fontSize: 14,*/}
                    {/*        fontWeight: 600,*/}
                    {/*        letterSpacing: '-0.28px',*/}
                    {/*        borderRadius: '6px'*/}
                    {/*      }}*/}
                    {/*      variant={'contained'}*/}
                    {/*    >*/}
                    {/*      Detail*/}
                    {/*    </Button>*/}
                    {/*  </Stack>*/}
                    {/*</StyledTableCell>*/}
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
