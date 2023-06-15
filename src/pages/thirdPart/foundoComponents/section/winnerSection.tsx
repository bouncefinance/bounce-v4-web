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
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import moment from 'moment'
import { usePagination } from 'ahooks'
import { Params } from 'ahooks/lib/usePagination/types'
import NoData from 'bounceComponents/common/NoData'
// import { PoolEvent } from 'api/pool/type'
// import { formatNumber, removeRedundantZeroOfFloat } from 'utils/number'
import { formatNumber } from 'utils/number'
import { getWinnersList } from 'api/pool/index'
import { shortenAddress } from 'utils'
import { EnglishAuctionNFTPoolProp } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useEffect } from 'react'

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
export interface WinnerRowData {
  id: number
  requestor: string
  chainId: number
  poolId: string
  category: number
  event: string
  token0Symbol: string
  token0Amount: string
  token0Decimals: number
  token0Volume: string
  txHash: string
  blockTs: number
  regreted: boolean
  tokenId: string
  is721: number
  token1Amount: string
}
const WinnerList = ({ poolInfo }: { poolInfo: EnglishAuctionNFTPoolProp }) => {
  const { chainId } = useActiveWeb3React()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  const defaultIdeaPageSize = 12
  const {
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
        chainId: chainConfigInBackend?.id || 0
      })
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
  const handleSubmit = useCallback(() => {
    run({
      current: 1,
      pageSize: 10,
      poolId: poolInfo?.poolId,
      chainId: chainConfigInBackend?.id || 0
    })
  }, [chainConfigInBackend?.id, poolInfo?.poolId, run])
  useEffect(() => {
    handleSubmit()
  }, [handleSubmit])
  return (
    <Box sx={{ borderRadius: 20, px: 12, py: 20, bgcolor: '#000' }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: 20,
          width: '100%',
          textAlign: 'center',
          color: '#fff'
        }}
      >
        Current Winner
      </Typography>
      {winnersData && winnersData?.list && winnersData?.list.length > 0 && !loading ? (
        <>
          <TableContainer sx={{ mt: 20 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Rank</StyledTableCell>
                  <StyledTableCell>From</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Etherscan</StyledTableCell>
                  <StyledTableCell>Time</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {winnersData.list.map((record: WinnerRowData, index: number) => (
                  <StyledTableRow key={record.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell>
                      <Typography
                        style={{
                          color: '#F53030',
                          fontFamily: `'Sharp Grotesk DB Cyr Book 20'`,
                          fontWeight: 400,
                          fontSize: '12px',
                          textAlign: 'center'
                        }}
                      >
                        {index + 4}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>{shortenAddress(record.requestor)}</StyledTableCell>
                    <StyledTableCell>{`${formatNumber(record.token1Amount, {
                      unit: record.token0Decimals,
                      decimalPlaces: 6
                    })} ${record.token0Symbol}`}</StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{shortenAddress(record.txHash)}</Typography>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>{moment(record.blockTs * 1000).format('Y-M-D hh:mm')}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box sx={{ width: '100%' }}>
          <NoData />
        </Box>
      )}
    </Box>
  )
}

export default WinnerList
