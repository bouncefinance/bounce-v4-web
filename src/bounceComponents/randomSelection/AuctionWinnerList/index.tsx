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
  Typography,
  Pagination
} from '@mui/material'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
// import moment from 'moment'
import { usePagination } from 'ahooks'
import { Params } from 'ahooks/lib/usePagination/types'
import NoData from 'bounceComponents/common/NoData'
// import { PoolEvent } from 'api/pool/type'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
// import { formatNumber, removeRedundantZeroOfFloat } from 'utils/number'
import { formatNumber } from 'utils/number'
import { getWinnersList } from 'api/pool/index'
import { shortenAddress } from 'utils'
import { FixedSwapPoolProp } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useEffect, useState } from 'react'
const StyledTableCell = styled(TableCell)(() => ({
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

const StyledTableRow = styled(TableRow)(() => ({
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

const AuctionWinnerList = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }) => {
  const [curPage, setCurPage] = useState<number>(1)
  const { chainId } = useActiveWeb3React()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')

  const betAmound = formatNumber(poolInfo.maxAmount1PerWallet, {
    unit: poolInfo.token1.decimals,
    decimalPlaces: 6
  })
  const defaultIdeaPageSize = 12
  const {
    pagination: poolsPagination,
    data: winnersData,
    loading,
    run
  } = usePagination<any, Params>(
    async ({ current, pageSize, chainId, poolId }) => {
      if (!chainId && chainId !== 0) {
        return Promise.reject(new Error('No ChainId'))
      }
      const resp: any = await getWinnersList({
        offset: (current - 1) * pageSize,
        limit: pageSize,
        poolId,
        category: poolInfo.category,
        chainId: chainConfigInBackend?.id || 0
      })
      //   if (category === 1) {
      return {
        list: resp.data.list,
        total: resp.data.total
      }
    },
    {
      pollingInterval: 20000,
      defaultPageSize: defaultIdeaPageSize,
      debounceWait: 500
    }
  )
  const handlePageChange = (_: any, p: number) => {
    poolsPagination.changeCurrent(p)
    setCurPage(p)
  }
  const handleSubmit = useCallback(() => {
    run({
      current: curPage,
      pageSize: 12,
      poolId: poolInfo?.poolId,
      chainId: chainConfigInBackend?.id || 0
    })
  }, [chainConfigInBackend?.id, curPage, poolInfo?.poolId, run])
  useEffect(() => {
    handleSubmit()
  }, [handleSubmit])
  return (
    <Box sx={{ borderRadius: 20, px: 12, py: 20, bgcolor: '#fff' }}>
      <Typography variant="h2" sx={{ ml: 12 }}>
        Winner list
      </Typography>
      {winnersData && winnersData?.list && winnersData?.list.length > 0 && !loading ? (
        <>
          <TableContainer sx={{ mt: 20 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Event</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  {/* <StyledTableCell>Date</StyledTableCell> */}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {winnersData.list.map((record: any) => (
                  <StyledTableRow key={record.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell>
                      <Typography
                        style={{
                          color: '#F53030',
                          fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                          fontWeight: 400,
                          fontSize: '12px'
                        }}
                      >
                        Win
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>1 Ticket</StyledTableCell>
                    <StyledTableCell>{`${betAmound} ${poolInfo.token1.symbol}`}</StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{shortenAddress(record)}</Typography>
                        <CopyToClipboard text={record} />
                      </Box>
                    </StyledTableCell>
                    {/* <StyledTableCell>{moment(poolInfo.closeAt * 1000).format('Y/M/D HH:mm')}</StyledTableCell> */}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {winnersData?.total >= defaultIdeaPageSize && (
            <Box mt={58} display={'flex'} justifyContent={'center'}>
              <Pagination
                page={curPage}
                onChange={handlePageChange}
                count={Math.ceil(winnersData?.total / defaultIdeaPageSize) || 0}
                // variant="outlined"
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ width: '100%' }}>
          <NoData />
        </Box>
      )}
    </Box>
  )
}

export default AuctionWinnerList
