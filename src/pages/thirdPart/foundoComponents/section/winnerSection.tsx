import {
  Box,
  Link,
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
// import { PoolEvent } from 'api/pool/type'
// import { formatNumber, removeRedundantZeroOfFloat } from 'utils/number'
import { formatNumber } from 'utils/number'
import { getEtherscanLink, shortenAddress } from 'utils'
import { MutantEnglishAuctionNFTPoolProp } from 'api/pool/type'
import TopThreeWinner from '../snippet/topThreeWinner'
import { useIsSMDown } from 'themes/useTheme'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: 'rgba(255,255,255, 0.4)',
    backgroundColor: '#000',
    paddingTop: '24px',
    paddingBottom: '24px',
    border: 'none',
    textAlign: 'left'
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: 'left',
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#000'
  },
  td: {
    fontFamily: `'Public Sans'`,
    color: '#fff',
    fontSize: '14px',
    borderBottom: `1px solid rgba(255, 255, 255, 0.2)`,
    textAlign: 'left'
  }
}))

const WinnerList = ({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) => {
  const isSm = useIsSMDown()
  const { data } = usePoolHistory(poolInfo.chainId, poolInfo.poolId, poolInfo.category, '', ['Bid'])
  const defaultIdeaPageSize = 12

  const winnersData = data?.list.slice(0, defaultIdeaPageSize) || []

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
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
      {/* {winnersData && winnersData?.list && winnersData?.list.length > 0 && !loading ? ( */}
      {winnersData.length > 0 ? (
        <>
          <TopThreeWinner list={winnersData.slice(0, 3)} poolInfo={poolInfo}></TopThreeWinner>
          {winnersData.length > 1 && (
            <TableContainer sx={{ mt: 20 }}>
              <Table sx={{ minWidth: isSm ? '100%' : 650 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Rank</StyledTableCell>
                    <StyledTableCell>From</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                    {!isSm && (
                      <>
                        <StyledTableCell>Hash</StyledTableCell>
                        <StyledTableCell
                          style={{
                            textAlign: 'right'
                          }}
                        >
                          Time
                        </StyledTableCell>
                      </>
                    )}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {winnersData.slice(1, defaultIdeaPageSize).map((record, index: number) => (
                    <StyledTableRow key={record.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <StyledTableCell>
                        <Typography>{index + 2}</Typography>
                      </StyledTableCell>
                      <StyledTableCell>{shortenAddress(record.requestor)}</StyledTableCell>
                      <StyledTableCell>{`${formatNumber(record.token1Amount || '0', {
                        unit: poolInfo.token1.decimals,
                        decimalPlaces: 6
                      })} ${poolInfo.token1.symbol}`}</StyledTableCell>
                      {!isSm && (
                        <>
                          <StyledTableCell>
                            <Link
                              target="_blank"
                              href={getEtherscanLink(poolInfo.ethChainId, record.txHash, 'transaction')}
                              sx={{ display: 'flex', alignItems: 'center' }}
                            >
                              {`${record.txHash.substring(0, 6)}...${record.txHash.substring(
                                record.txHash.length - 4
                              )}`}
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell
                            style={{
                              textAlign: 'right'
                            }}
                          >
                            {moment(record.blockTs * 1000).format('Y-M-D hh:mm')}
                          </StyledTableCell>
                        </>
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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

export default WinnerList
