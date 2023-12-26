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

import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { WithAnimation } from 'components/WithAnimation'

const Container = styled(Box)`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 80px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 0 16px;
  }
`
const Body = styled(Box)`
  width: 100%;
  max-width: 1296px;
  margin: 0 auto;
  padding: 64px 72px 16px;
  border-radius: 32px;
  background: #e1dfd4;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 24px 0px 0px 16px;
  }
`
const TableStyle = styled(Table)(() => ({
  '& .MuiTableBody-root>.MuiTableRow-root': {
    '&:nth-of-type(odd)': {
      '&>.MuiTableCell-root:nth-last-child': {
        backgroundColor: '#EDEAE4',
        borderRadius: 20
      }
    }
  }
}))
const TableHeadStyle = styled(TableHead)(() => ({
  '& .MuiTableRow-root>.MuiTableCell-root': {
    backgroundColor: '#e1dfd4',
    borderBottom: '1px solid #F5F5F5'
  }
}))
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  height: 52,
  [`&.${tableCellClasses.head}`]: {
    color: '#908E96',
    backgroundColor: '#FFFFFF',
    paddingTop: '4px',
    paddingBottom: '4px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12
    }
  },
  [theme.breakpoints.down('sm')]: {
    height: 40,
    padding: 10
  }
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#EDEAE4',

    'td:first-of-type': {
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20
    },
    'td:last-child': {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20
    }
  },
  td: {
    border: 0
  }
}))
const Title = styled(Typography)`
  color: var(--AI-dark-02, #4c483a);
  font-variant-numeric: lining-nums proportional-nums;

  /* AI/D/H4 */
  font-family: Cormorant SC;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 90%; /* 28.8px */
  text-transform: uppercase;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 18px;
  }
`
const AuctionWinnerList = () => {
  return (
    <Container>
      <Body>
        <WithAnimation>
          <Title mb={32}>Winner list</Title>
        </WithAnimation>
        <>
          <TableContainer sx={{ mt: 20, maxHeight: 440 }}>
            <TableStyle stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
              <TableHeadStyle>
                <StyledTableRow>
                  <StyledTableCell>Event</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Token#</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                </StyledTableRow>
              </TableHeadStyle>
              <TableBody>
                <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Typography
                      style={{
                        color: '#F53030',
                        fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                        fontWeight: 400,
                        fontSize: '12px'
                        // textAlign: 'center'
                      }}
                    >
                      Win
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>1 Ticket</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>1 Ticket</Typography>
                      <CopyToClipboard text={'record'} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                  <StyledTableCell>11</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </TableStyle>
          </TableContainer>
        </>
      </Body>
    </Container>
  )
}

export default AuctionWinnerList
