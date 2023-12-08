import { Box, Pagination, Stack, Table, TableBody, TableContainer, Typography } from '@mui/material'
import { usePagination } from 'ahooks'
import { getAddressActivities } from 'api/account'
import { GetAddressActivitiesRes } from 'api/account/types'
import { PoolStatus } from 'api/pool/type'
import { IAuctionPoolsItems } from 'api/profile/type'
import StatusSelect from 'bounceComponents/account/PreAuctionTab/StatusSelect'
import ChainSelect from 'bounceComponents/common/ChainSelect'
import { ZERO_ADDRESS } from '../../constants'
import { CurrencyAmount, Currency } from 'constants/token'
import { useActiveWeb3React } from 'hooks'
import { useEffect, useState } from 'react'
import { Params } from 'ahooks/lib/usePagination/types'
import { getLabelById } from 'utils'
import Image from 'components/Image'
import { useOptionDatas } from 'state/configOptions/hooks'
import EmptyData from 'bounceComponents/common/EmptyData'
import { StyledTableCell, StyledTableRow } from 'bounceComponents/account/AuctionAddressTab/ActivitiesTab'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import DefaultAvatar from 'assets/images/default_avatar.png'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'

export default function WhitelistFarmTab() {
  const { account } = useActiveWeb3React()
  const navigate = useNavigate()
  const optionDatas = useOptionDatas()
  const [curChain, setCurChain] = useState(0)
  const [curPoolType, setCurPoolType] = useState<PoolStatus | 0>(0)
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
      refreshDeps: [account, curChain, curPoolType],
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

  return (
    <Stack sx={{}}>
      <Stack direction={'row'} spacing={20} justifyContent={'space-between'} alignItems={'center'}>
        <Typography fontSize={44} fontWeight={500} color={'#121212'}>
          Pre Auction Activity
        </Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={20}>
          <ChainSelect curChain={curChain} setCurChain={v => setCurChain(v || 0)} />
          <StatusSelect curPoolType={curPoolType} setCurPoolType={t => setCurPoolType(t)} />
        </Stack>
      </Stack>
      {loading ? (
        <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BounceAnime />
        </Box>
      ) : data && data?.list.length > 0 && !loading ? (
        <TableContainer sx={{ mt: 40, background: '#F6F6F3', borderRadius: '20px', padding: '40px 56px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px'
              }}
            >
              {data.list.map(record => (
                <StyledTableRow
                  onClick={() => {
                    navigate(routes.preAuction.activityDetail)
                  }}
                  key={record.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    '&:last-child td, &:last-child th': { border: 0 },
                    background: '#121212 !important',
                    borderRadius: '16px !important',
                    padding: '16px 24px'
                  }}
                >
                  <StyledTableCell sx={{ paddingLeft: '0 !important' }}>
                    <PoolStatusBox
                      showParticipantClaim={false}
                      status={PoolStatus.Live}
                      claimAt={1703908800}
                      openTime={1703900800}
                      closeTime={1703908800}
                    />
                    <Typography
                      sx={{
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: 20,
                        marginTop: 20
                      }}
                    >
                      Bounce x Bitcoin
                    </Typography>
                    <Typography
                      sx={{
                        color: '#959595',
                        fontSize: 12
                      }}
                    >
                      400 participants
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ '& img': { width: 150, height: 150, borderRadius: '50%' }, padding: '0 !important' }}
                  >
                    <Image src={DefaultAvatar} />
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
    </Stack>
  )
}
