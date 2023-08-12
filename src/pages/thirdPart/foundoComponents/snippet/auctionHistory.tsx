import { Box, Stack, Table, TableBody, TableContainer, TableHead, Typography, styled } from '@mui/material'
import moment from 'moment'
import NoData from 'bounceComponents/common/NoData'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { getEtherscanLink, shortenAddress, shortenHash } from 'utils'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'
import { StyledHistoryTableCell, StyledHistoryTableRow } from 'bounceComponents/fixed-swap/ActionHistory'
import { MutantEnglishAuctionNFTPoolProp, PoolHistory } from 'api/pool/type'
import DefaultAvatar from 'assets/imgs/realWorld/defaultHeadIgm.png'
import { CurrencyAmount } from 'constants/token'
import { useMemo } from 'react'

const StatsBoard = styled(Stack)(({ theme }) => ({
  width: 320,
  marginTop: 80,
  padding: '24px 0',
  textAlign: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  backgroundColor: '#20201e',
  whiteSpace: 'normal',
  '& p': {
    width: '100%',
    wordBreak: 'break-all',
    fontSize: 20,
    padding: '0 20px',
    color: '#959595'
  },
  '& p:first-child': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.20)',
    paddingBottom: 24
  },
  '& p:last-child': {
    color: '#D7D6D9',
    paddingTop: 24,
    fontSize: 36
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: 60
  }
}))

const ActionHistory = ({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) => {
  const totalReward = useMemo(() => {
    if (!poolInfo.distributeRatios.prevBidderRatio) return
    return poolInfo.extraAmount1?.multiply(poolInfo.distributeRatios.prevBidderRatio).toFixed(6)
  }, [poolInfo.distributeRatios.prevBidderRatio, poolInfo.extraAmount1])

  const { data: list, loading: isGettingPoolHistory } = usePoolHistory(
    poolInfo?.chainId || 0,
    poolInfo?.poolId || '',
    poolInfo?.category,
    '',
    ['Bid']
  )

  if (!list || (Array.isArray(list.list) && list.list.length === 0)) {
    return null
  }

  return (
    <Stack
      direction={'row'}
      sx={{
        borderRadius: 20,
        padding: { xs: 0, sm: '12px 20px' },
        bgcolor: 'transparent',
        margin: { xs: '0px auto', sm: '120px auto' },
        width: { sm: 1296, xs: 'inherit' },
        maxWidth: '100%',
        justifyContent: 'space-between',
        flexWrap: { xs: 'wrap', sm: 'unset' }
      }}
    >
      <Stack sx={{ width: { xs: '100%', sm: 'unset' } }}>
        <Typography variant="h2" width={320} sx={{ fontSize: { xs: 16, sm: 36 }, color: '#fff', mt: 16 }}>
          Auction History
        </Typography>
        <StatsBoard>
          <Typography>Total Bid Times</Typography>
          <Typography>{list.total}</Typography>
        </StatsBoard>
        <StatsBoard sx={{ marginTop: 32 }}>
          <Typography>Total Bidder Reward</Typography>
          <Typography>
            {totalReward}
            {poolInfo.token1.symbol}
          </Typography>
        </StatsBoard>
      </Stack>

      {list.list && list.list.length > 0 ? (
        <TableContainer sx={{ mt: 30, maxWidth: { xs: '100vw', sm: 763 } }}>
          <Table sx={{ minWidth: { xs: '100%', sm: 650 } }} aria-label="simple table">
            <TableHead>
              <StyledHistoryTableRow
                sx={{ '& th': { backgroundColor: 'transparent !important', color: '#fff', borderBottom: 0 } }}
              >
                <StyledHistoryTableCell>From</StyledHistoryTableCell>
                <StyledHistoryTableCell>Bid Price</StyledHistoryTableCell>
                <StyledHistoryTableCell>Bid Reward</StyledHistoryTableCell>
                <StyledHistoryTableCell>Hash</StyledHistoryTableCell>
                <StyledHistoryTableCell>Time</StyledHistoryTableCell>
              </StyledHistoryTableRow>
            </TableHead>
            <TableBody>
              {list.list.map((record: PoolHistory) => (
                <StyledHistoryTableRow
                  key={record.id}
                  sx={{
                    '&:nth-of-type(even) td': { borderRadius: '0 !important' },
                    '&:last-child td, &:last-child th': { border: 0 },
                    borderBottom: '1px solid rgba(255, 255, 255, 0.20)',
                    backgroundColor: '#fff !important'
                  }}
                >
                  <StyledHistoryTableCell sx={{ backgroundColor: '#121212', color: '#fff' }}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <img
                        src={record.avatar || DefaultAvatar}
                        style={{
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          marginRight: '12px'
                        }}
                        alt=""
                        srcSet=""
                      />
                      {shortenAddress(record.requestor)}
                    </Stack>
                  </StyledHistoryTableCell>
                  <StyledHistoryTableCell sx={{ backgroundColor: '#121212', color: '#fff' }}>
                    {poolInfo.currencyAmountMin1
                      ? CurrencyAmount.fromRawAmount(
                          poolInfo.currencyAmountMin1?.currency,
                          record.token1Amount || '0'
                        )?.toSignificant()
                      : '--'}
                    &nbsp;
                    {poolInfo.token1.symbol}
                  </StyledHistoryTableCell>
                  <StyledHistoryTableCell sx={{ backgroundColor: '#121212', color: '#fff' }}>
                    {poolInfo.currencyAmountMin1
                      ? CurrencyAmount.fromRawAmount(
                          poolInfo.currencyAmountMin1.currency,
                          record.prevBidderReward || '0'
                        )?.toSignificant()
                      : '--'}
                    &nbsp;
                    {poolInfo.token1.symbol}
                  </StyledHistoryTableCell>
                  <StyledHistoryTableCell sx={{ backgroundColor: '#121212', color: '#fff' }}>
                    <Box>
                      <a
                        style={{ display: 'flex', alignItems: 'center' }}
                        href={getEtherscanLink(poolInfo.ethChainId, record.txHash, 'transaction')}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Typography>{shortenHash(record.txHash)}</Typography>
                        <CopyToClipboard text={record.txHash} />
                      </a>
                    </Box>
                  </StyledHistoryTableCell>
                  <StyledHistoryTableCell sx={{ backgroundColor: '#121212', color: '#fff' }}>
                    {moment(record.blockTs * 1000).format('Y/M/D HH:mm')}
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
    </Stack>
  )
}

export default ActionHistory
