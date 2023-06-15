import { Box, Table, TableBody, TableContainer, TableHead, Typography } from '@mui/material'
import moment from 'moment'

import NoData from 'bounceComponents/common/NoData'
import { PoolType } from 'api/pool/type'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { shortenAddress } from 'utils'
import { removeRedundantZeroOfFloat } from 'utils/number'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'
import {
  PoolEventTypography,
  StyledHistoryTableCell,
  StyledHistoryTableRow
} from 'bounceComponents/fixed-swap/ActionHistory'
import { useMemo } from 'react'

const ActionHistory = ({
  backedChainId,
  poolId,
  category
}: {
  backedChainId: number
  poolId: string
  category: PoolType
}) => {
  const { data, loading: isGettingPoolHistory } = usePoolHistory(backedChainId, poolId, category)
  const list = useMemo(() => {
    if (!data) return undefined
    return data.list.filter(item => item.event === 'Bid') || []
  }, [data])

  return (
    <Box sx={{ borderRadius: 20, px: 12, py: 20, bgcolor: '#fff' }}>
      <Typography variant="h2" sx={{ ml: 12 }}>
        Auction History
      </Typography>

      {list && list.length > 0 ? (
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
              {list.map(record => (
                <StyledHistoryTableRow key={record.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledHistoryTableCell>{PoolEventTypography[record.event]}</StyledHistoryTableCell>
                  <StyledHistoryTableCell>
                    {removeRedundantZeroOfFloat(record.token0Amount)}
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
        <Box sx={{ width: '100%' }}>
          <NoData />
        </Box>
      ) : null}
    </Box>
  )
}

export default ActionHistory
