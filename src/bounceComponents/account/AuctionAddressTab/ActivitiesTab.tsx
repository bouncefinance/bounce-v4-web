import {
  Box,
  Pagination,
  Stack,
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
import { PoolType } from 'api/pool/type'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { getLabelById, shortenAddress } from 'utils'
import { useOptionDatas } from 'state/configOptions/hooks'
import { useEffect, useState } from 'react'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { usePagination } from 'ahooks'
import { getAddressActivities } from 'api/account'
import { useActiveWeb3React } from 'hooks'
import { IAuctionPoolsItems } from 'api/profile/type'
import { Params } from 'ahooks/lib/usePagination/types'
import { GetAddressActivitiesRes } from 'api/account/types'
import { ChainListMap } from 'constants/chain'
import Image from 'components/Image'
import { Currency, CurrencyAmount } from 'constants/token'
import { ZERO_ADDRESS } from '../../../constants'
import AuctionTypeSelect from 'bounceComponents/common/AuctionTypeSelect'
import { BackedTokenType } from 'pages/account/MyTokenOrNFT'
import ChainSelect from 'bounceComponents/common/ChainSelect'
import EmptyData from 'bounceComponents/common/EmptyData'
import { PoolEventTypography } from 'bounceComponents/fixed-swap/ActionHistory'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#908E96',
    paddingTop: '4px',
    paddingBottom: '4px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#fff',

    'td:first-of-type': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8
    },
    'td:last-child': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8
    }
  },
  td: {
    border: 0
  }
}))

const defaultPageSize = 10

const ActivitiesTab = ({ backedTokenType }: { backedTokenType: BackedTokenType }) => {
  const optionDatas = useOptionDatas()
  const [curChain, setCurChain] = useState(0)
  const { account } = useActiveWeb3React()
  const [curPoolType, setCurPoolType] = useState<PoolType | 0>(0)

  const { pagination, data, loading } = usePagination<IAuctionPoolsItems<GetAddressActivitiesRes>, Params>(
    async ({ current, pageSize }) => {
      if (!account)
        return {
          total: 0,
          list: []
        }
      const category = curPoolType
      const resp = await getAddressActivities({
        offset: (current - 1) * pageSize,
        limit: pageSize,
        category,
        chainId: curChain,
        address: account,
        tokenType: backedTokenType
      })
      return {
        list: resp.data.list.map(i => {
          const ethChainId = getLabelById(i.chainId, 'ethChainId', optionDatas?.chainInfoOpt || [])
          return {
            ...i,
            ethChainId,
            currency0Amount: CurrencyAmount.fromRawAmount(
              new Currency(ethChainId, ZERO_ADDRESS, i.token0Decimals, i.token0Symbol),
              i.token0Amount
            )
          }
        }),
        total: resp.data.total
      }
    },
    {
      defaultPageSize,
      ready: !!account,
      refreshDeps: [account, curChain, curPoolType, backedTokenType],
      debounceWait: 100
    }
  )

  useEffect(() => {
    pagination.changeCurrent(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, curPoolType, curPoolType, backedTokenType])

  const handlePageChange = (_: any, p: number) => {
    pagination.changeCurrent(p)
  }

  return (
    <Box>
      <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
        <Stack spacing={10} direction="row">
          <ChainSelect curChain={curChain} setCurChain={v => setCurChain(v || 0)} />
          <AuctionTypeSelect
            tokenType={backedTokenType}
            curPoolType={curPoolType}
            setCurPoolType={t => setCurPoolType(t)}
          />
        </Stack>
      </Box>
      {loading ? (
        <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BounceAnime />
        </Box>
      ) : data && data?.list.length > 0 && !loading ? (
        <TableContainer sx={{ mt: 40 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Chain</StyledTableCell>
                <StyledTableCell>Pool ID</StyledTableCell>
                <StyledTableCell>Auction Type</StyledTableCell>
                <StyledTableCell>Event</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.list.map(record => (
                <StyledTableRow key={record.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>
                    <Image src={record.ethChainId ? ChainListMap[record.ethChainId]?.logo || '' : ''} width="24px" />
                  </StyledTableCell>
                  <StyledTableCell>#{record.poolId}</StyledTableCell>
                  <StyledTableCell>
                    {record.category === PoolType.fixedSwapNft
                      ? 'NFT Fixed Price Auction'
                      : record.category === PoolType.Lottery
                      ? 'Random Selection'
                      : 'Token Fixed Price Auction'}
                  </StyledTableCell>
                  <StyledTableCell>{PoolEventTypography[record.event]}</StyledTableCell>
                  <StyledTableCell>
                    {record.currency0Amount?.toSignificant(6)}
                    &nbsp;
                    {record.token0Symbol}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>{shortenAddress(record.requestor)}</Typography>
                      <CopyToClipboard text={record.requestor} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>{moment(record.blockTs * 1000).format('Y/M/D hh:mm A')}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Box mt={40} display={'flex'} justifyContent="center">
            <Pagination
              onChange={handlePageChange}
              sx={{ '.MuiPagination-ul li button': { border: '1px solid' }, alignItems: 'end' }}
              count={Math.ceil((data?.total || 0) / (defaultPageSize || 0))}
            />
          </Box>
        </TableContainer>
      ) : (
        <EmptyData />
      )}
    </Box>
  )
}

export default ActivitiesTab
