import { Box, Table, TableBody, TableContainer, TableHead, Typography } from '@mui/material'
import moment from 'moment'

import NoData from 'bounceComponents/common/NoData'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { shortenAddress } from 'utils'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'
import {
  PoolEventTypography,
  StyledHistoryTableCell,
  StyledHistoryTableRow
} from 'bounceComponents/fixed-swap/ActionHistory'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { CurrencyAmount } from 'constants/token'

const ActionHistory = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const { data: list, loading: isGettingPoolHistory } = usePoolHistory(
    poolInfo?.chainId || 0,
    poolInfo?.poolId || '',
    poolInfo?.category,
    '',
    ['Swapped']
  )
  if (!list || (Array.isArray(list.list) && list.list.length === 0)) {
    return null
  }

  return (
    <Box sx={{ borderRadius: 20, px: 12, py: 20, bgcolor: '#fff' }}>
      <Typography variant="h2" sx={{ ml: 12 }}>
        Auction History
      </Typography>

      {list.list && list.list.length > 0 ? (
        <TableContainer sx={{ mt: 20 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledHistoryTableRow>
                <StyledHistoryTableCell>Event</StyledHistoryTableCell>
                <StyledHistoryTableCell>Amount</StyledHistoryTableCell>
                <StyledHistoryTableCell>Price</StyledHistoryTableCell>
                <StyledHistoryTableCell>Address</StyledHistoryTableCell>
                <StyledHistoryTableCell>Date</StyledHistoryTableCell>
              </StyledHistoryTableRow>
            </TableHead>
            <TableBody>
              {list.list.map(record => (
                <StyledHistoryTableRow key={record.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledHistoryTableCell>{PoolEventTypography[record.event]}</StyledHistoryTableCell>
                  <StyledHistoryTableCell>
                    {poolInfo.currencyAmountTotal0
                      ? CurrencyAmount.fromRawAmount(
                          poolInfo.currencyAmountTotal0.currency,
                          record.token0Amount || '0'
                        )?.toSignificant()
                      : '--'}
                    &nbsp;
                    {poolInfo.token0.symbol}
                  </StyledHistoryTableCell>
                  <StyledHistoryTableCell>
                    {poolInfo.currencyAmountEndPrice
                      ? CurrencyAmount.fromRawAmount(
                          poolInfo.currencyAmountEndPrice.currency,
                          record.token1Amount || '0'
                        )?.toSignificant()
                      : '--'}
                    &nbsp;
                    {poolInfo.token1.symbol}
                  </StyledHistoryTableCell>
                  <StyledHistoryTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>{shortenAddress(record.requestor)}</Typography>
                      <CopyToClipboard text={record.requestor} />
                    </Box>
                  </StyledHistoryTableCell>
                  <StyledHistoryTableCell>{moment(record.blockTs * 1000).format('Y/M/D HH:mm')}</StyledHistoryTableCell>
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
