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
import moment from 'moment'

import NoData from 'bounceComponents/common/NoData'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'
import { PoolEvent, PoolType } from 'api/pool/type'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { formatNumber, removeRedundantZeroOfFloat } from 'utils/number'
import { shortenAddress } from 'utils'

export const StyledHistoryTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#908E96',
    backgroundColor: '#FFFFFF',
    paddingTop: '4px',
    paddingBottom: '4px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

export const StyledHistoryTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F5F5F5',

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

const SaleTypography = <Typography sx={theme => ({ color: theme.palette.success.main })}>Sale</Typography>
const CreatorClaimedTypography = (
  <Typography sx={theme => ({ color: theme.palette.success.main })}>CreatorClaimed</Typography>
)
const BidTypography = <Typography sx={theme => ({ color: theme.palette.success.main })}>Bid</Typography>
const BetTypography = <Typography sx={theme => ({ color: theme.palette.success.main })}>Bet</Typography>
const RegretTypography = <Typography sx={theme => ({ color: theme.palette.error.main })}>Regret</Typography>

export const PoolEventTypography: Record<PoolEvent, JSX.Element> = {
  Swapped: SaleTypography,
  Reversed: RegretTypography,
  CreatorClaimed: CreatorClaimedTypography,
  Bid: BidTypography,
  Bet: BetTypography
}

const ActionHistory = ({
  noTitle = false,
  children,
  backedChainId,
  poolId,
  category
}: {
  noTitle?: boolean
  children?: React.ReactNode
  backedChainId: number
  poolId: string
  category: PoolType
}) => {
  const { data, loading: isGettingPoolHistory } = usePoolHistory(backedChainId, poolId, category)

  return (
    <Box sx={{ borderRadius: 20, px: 12, py: 20, bgcolor: '#fff' }}>
      {!noTitle && (
        <Typography variant="h2" sx={{ ml: 12 }}>
          Auction History
        </Typography>
      )}

      {data && data?.list.length > 0 ? (
        <TableContainer sx={{ mt: 20 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledHistoryTableRow>
                <StyledHistoryTableCell>Event</StyledHistoryTableCell>
                <StyledHistoryTableCell>Amount</StyledHistoryTableCell>
                <StyledHistoryTableCell>Address</StyledHistoryTableCell>
                <StyledHistoryTableCell>Date</StyledHistoryTableCell>
              </StyledHistoryTableRow>
            </TableHead>
            <TableBody>
              {data.list.map(record => (
                <StyledHistoryTableRow key={record.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledHistoryTableCell>{PoolEventTypography[record.event]}</StyledHistoryTableCell>
                  <StyledHistoryTableCell>
                    {removeRedundantZeroOfFloat(
                      formatNumber(record.token0Amount, { unit: record.token0Decimals, decimalPlaces: 4 })
                    )}
                    &nbsp;
                    {record.token0Symbol}
                  </StyledHistoryTableCell>
                  <StyledHistoryTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>{shortenAddress(record.requestor)}</Typography>
                      <CopyToClipboard text={record.requestor} />
                    </Box>
                  </StyledHistoryTableCell>
                  <StyledHistoryTableCell>
                    {moment(record.blockTs * 1000).format('Y/M/D hh:mm A')}
                  </StyledHistoryTableCell>
                </StyledHistoryTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : !isGettingPoolHistory ? (
        <Box sx={{ width: '100%' }}>{children ? children : <NoData />}</Box>
      ) : null}
    </Box>
  )
}

export default ActionHistory
