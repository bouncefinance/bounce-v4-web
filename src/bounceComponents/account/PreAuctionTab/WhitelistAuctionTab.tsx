import { Box, Button, Pagination, Stack, Table, TableBody, TableContainer, TableHead, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import Search from './Search'
import { PoolStatus } from 'api/pool/type'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useActiveWeb3React } from 'hooks'
import { usePagination, useRequest } from 'ahooks'
import { IAuctionPoolsItems } from 'api/profile/type'
import { GetAddressActivitiesRes } from 'api/account/types'
import { getAddressActivities } from 'api/account'
import { getLabelById } from 'utils'
import { Currency, CurrencyAmount } from 'constants/token'
import { ZERO_ADDRESS } from '../../../constants'
import EmptyData from 'bounceComponents/common/EmptyData'
import { StyledTableCell, StyledTableRow } from '../AuctionAddressTab/ActivitiesTab'
import { Params } from 'ahooks/lib/usePagination/types'
import { useOptionDatas } from 'state/configOptions/hooks'
import moment from 'moment'
import { ReactComponent as IconEdit } from './edit.svg'
import { ReactComponent as IconDelete } from './delete.svg'
import { ReactComponent as AddSvg } from 'assets/imgs/user/add.svg'
import { show } from '@ebay/nice-modal-react'
import CreateWhitelistDialog from './Modals/CreateDialog'

export default function WhitelistAuctionTab() {
  const theme = useTheme()
  const { account } = useActiveWeb3React()
  const optionDatas = useOptionDatas()
  const [curChain] = useState(0)
  const [curPoolType] = useState<PoolStatus | 0>(0)
  const [searchText, setSearchText] = useState<string>('')

  const { runAsync: deleteItem } = useRequest(
    async () => {
      alert('delete item')
    },
    { manual: true }
  )

  const { pagination, data, loading } = usePagination<IAuctionPoolsItems<GetAddressActivitiesRes>, Params>(
    async ({ current, pageSize }) => {
      if (!account)
        return {
          total: 0,
          list: []
        }
      const resp = await getAddressActivities({
        offset: (current - 1) * pageSize,
        limit: pageSize,
        category: 0,
        chainId: curChain,
        address: account,
        tokenType: 1
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
      defaultPageSize: 10,
      ready: !!account,
      refreshDeps: [account, curChain, curPoolType, searchText],
      debounceWait: 100
    }
  )

  useEffect(() => {
    pagination.changeCurrent(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, curPoolType])

  const handlePageChange = (_: any, p: number) => {
    pagination.changeCurrent(p)
  }

  const showCreateDialog = () => {
    show(CreateWhitelistDialog, { whitelist: [] })
  }

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={20}>
        <Search searchText={searchText} setSearchText={setSearchText} placeholder="Search By Group Name" />
        <Button
          sx={{
            width: 176,
            height: 48,
            borderRadius: 50,
            border: 'none',
            background: '#F6F6F3',
            color: theme.palette.text.primary,
            '&:hover': {
              color: '#121212'
            }
          }}
          onClick={showCreateDialog}
          startIcon={<AddSvg />}
        >
          Create whitelist
        </Button>
      </Stack>
      {loading ? (
        <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BounceAnime />
        </Box>
      ) : data && data?.list.length > 0 && !loading ? (
        <TableContainer sx={{ mt: 40, background: '#F6F6F3', borderRadius: '20px', padding: '40px 56px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Group Name</StyledTableCell>
                <StyledTableCell>Total Address</StyledTableCell>
                <StyledTableCell>Detail</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell>Operation</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.list.map(record => (
                <StyledTableRow
                  key={record.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <StyledTableCell>#{record.poolId}</StyledTableCell>
                  <StyledTableCell>Token Fixed Price Auction</StyledTableCell>
                  <StyledTableCell>12</StyledTableCell>
                  <StyledTableCell>Detail</StyledTableCell>
                  <StyledTableCell>{moment(record.blockTs * 1000).format('Y/M/D hh:mm')}</StyledTableCell>
                  <StyledTableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        '& svg': {
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <IconEdit onClick={() => {}} />
                      <IconDelete onClick={deleteItem} />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Box mt={40} display={'flex'} justifyContent="center">
            <Pagination
              onChange={handlePageChange}
              page={pagination.current}
              sx={{ alignItems: 'end' }}
              count={Math.ceil((data?.total || 0) / 10)}
            />
          </Box>
        </TableContainer>
      ) : (
        <EmptyData />
      )}
    </Box>
  )
}
