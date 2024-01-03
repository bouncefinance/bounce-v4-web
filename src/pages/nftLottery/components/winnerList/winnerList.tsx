import {
  Box,
  Pagination,
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
import { usePagination } from 'ahooks'
import { Params } from 'ahooks/lib/usePagination/types'
import { getWinnersList } from 'api/pool'
import { RandomSelectionNFTProps } from 'api/pool/type'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import NoData from 'bounceComponents/common/NoData'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { WithAnimation } from 'components/WithAnimation'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useEffect } from 'react'
import { shortenAddress } from 'utils'

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
const AuctionWinnerList = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  const { chainId } = useActiveWeb3React()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  const defaultIdeaPageSize = 8
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
      let resp: any
      try {
        resp = await getWinnersList({
          offset: (current - 1) * pageSize,
          limit: pageSize,
          poolId,
          chainId: chainConfigInBackend?.id || 0,
          category: 10
        })
      } catch (error) {
        console.log('error', error)
      }

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
  }
  const handleSubmit = useCallback(() => {
    run({
      current: 1,
      pageSize: defaultIdeaPageSize,
      poolId: poolInfo?.poolId,
      chainId: chainConfigInBackend?.id || 0,
      category: 10
    })
  }, [chainConfigInBackend?.id, poolInfo?.poolId, run])
  useEffect(() => {
    handleSubmit()
  }, [handleSubmit])
  return (
    <Container>
      <Body>
        <WithAnimation>
          <Title mb={32}>Winner list</Title>
        </WithAnimation>
        {winnersData && winnersData?.list && winnersData?.list.length > 0 && !loading ? (
          <>
            <TableContainer sx={{ mt: 20, maxHeight: 440 }}>
              <TableStyle stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
                <TableHeadStyle>
                  <StyledTableRow>
                    <StyledTableCell width="25%">Event</StyledTableCell>
                    <StyledTableCell width="25%">Amount</StyledTableCell>
                    <StyledTableCell width="25%">Price</StyledTableCell>
                    {/* <StyledTableCell>Token#</StyledTableCell> */}
                    <StyledTableCell width="25%">Address</StyledTableCell>
                    {/* <StyledTableCell>Date</StyledTableCell> */}
                  </StyledTableRow>
                </TableHeadStyle>
                <TableBody>
                  {winnersData.list.map((record: any) => (
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
                      <StyledTableCell>10 USD</StyledTableCell>
                      {/* <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography>1 Ticket</Typography>
                          <CopyToClipboard text={'record'} />
                        </Box>
                      </StyledTableCell> */}
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography>{shortenAddress(record)}</Typography>
                          <CopyToClipboard text={record} />
                        </Box>
                      </StyledTableCell>
                      {/* <StyledTableCell>{moment(poolInfo.closeAt * 1000).format('Y/M/D hh:mm')}</StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </TableStyle>
            </TableContainer>

            {winnersData?.total >= defaultIdeaPageSize && (
              <Box mt={58} display={'flex'} justifyContent={'center'}>
                <Pagination
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
      </Body>
    </Container>
  )
}

export default AuctionWinnerList
