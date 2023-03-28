import {
  Box,
  MenuItem,
  Pagination,
  Select,
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

import NoData from 'bounceComponents/common/NoData'
import { PoolEvent } from 'api/pool/type'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { getLabelById, shortenAddress } from 'utils'
import { useOptionDatas } from 'state/configOptions/hooks'
import { useState } from 'react'
import FormItem from 'bounceComponents/common/FormItem'
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

const SaleTypography = <Typography sx={theme => ({ color: theme.palette.success.main })}>Sale</Typography>
const RegretTypography = <Typography sx={theme => ({ color: theme.palette.error.main })}>Regret</Typography>

const PoolEventTypography: Record<PoolEvent, JSX.Element> = {
  Swapped: SaleTypography,
  Reversed: RegretTypography
}

const defaultPageSize = 10

const ActivitiesTab = () => {
  const optionDatas = useOptionDatas()
  const [curChain, setCurChain] = useState(0)
  const { account } = useActiveWeb3React()

  const { pagination, data, loading } = usePagination<IAuctionPoolsItems<GetAddressActivitiesRes>, Params>(
    async ({ current, pageSize }) => {
      if (!account)
        return {
          total: 0,
          list: []
        }
      const category = 1
      const resp = await getAddressActivities({
        offset: (current - 1) * pageSize,
        limit: pageSize,
        category,
        chainId: curChain,
        address: account
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
      refreshDeps: [account, curChain],
      debounceWait: 100
    }
  )

  const handlePageChange = (_: any, p: number) => {
    pagination.changeCurrent(p)
  }

  return (
    <Box>
      <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
        <Stack spacing={10} direction="row">
          <FormItem name="chain" label="Chain" sx={{ width: 190 }}>
            <Select value={curChain} onChange={e => setCurChain(Number(e.target?.value) || 0)}>
              <MenuItem key={0} value={0}>
                All Chains
              </MenuItem>
              {optionDatas?.chainInfoOpt?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.chainName}
                </MenuItem>
              ))}
            </Select>
          </FormItem>
        </Stack>
      </Box>
      {loading ? (
        <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BounceAnime />
        </Box>
      ) : data && data?.list.length > 0 && !loading ? (
        <TableContainer sx={{ mt: 20 }}>
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
                  <StyledTableCell>Token Fixed Price Auction</StyledTableCell>
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
        <Box sx={{ width: '100%' }}>
          <NoData />
        </Box>
      )}
    </Box>
  )
}

export default ActivitiesTab