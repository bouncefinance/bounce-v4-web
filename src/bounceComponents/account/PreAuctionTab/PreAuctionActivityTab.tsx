import {
  Box,
  Button,
  Pagination,
  Stack,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Typography,
  styled,
  useTheme
} from '@mui/material'
import Image from 'components/Image'
import { ReactComponent as AddSvg } from 'assets/imgs/user/add.svg'
import { useEffect, useState } from 'react'
import Search from './Search'
import ChainSelect from 'bounceComponents/common/ChainSelect'
import { PoolStatus } from 'api/pool/type'
import StatusSelect from './StatusSelect'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useActiveWeb3React } from 'hooks'
import { usePagination } from 'ahooks'
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
import DefaultAvatar from 'assets/images/default_avatar.png'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'

const CustomTab = styled(Box)({
  '& .MuiTabs-root': {
    border: '1px solid #E4E4E4',
    borderRadius: '100px',
    padding: '4px',
    '.MuiTabs-indicator': {
      display: 'none'
    },
    button: {
      textTransform: 'none'
    },
    '& .Mui-selected': {
      color: '#121212',
      background: '#E1F25C',
      borderRadius: '100px'
    }
  }
})

export default function PreAuctionActivityTab() {
  const theme = useTheme()
  const { account } = useActiveWeb3React()
  const optionDatas = useOptionDatas()
  const navigate = useNavigate()
  const [curChain, setCurChain] = useState(0)
  const [curTab, setCurTab] = useState(0)
  const [curPoolType, setCurPoolType] = useState<PoolStatus | 0>(0)
  const [searchText, setSearchText] = useState<string>('')

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

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <CustomTab>
          <Tabs onChange={(_e, val) => setCurTab(val)} value={curTab}>
            <Tab label="Participated" />
            <Tab label="Created" />
          </Tabs>
        </CustomTab>
        <Button
          sx={{
            width: 297,
            height: 48,
            borderRadius: 50,
            border: 'none',
            background: '#F6F6F3',
            color: theme.palette.text.primary,
            '&:hover': {
              color: '#121212'
            }
          }}
          onClick={() => navigate(routes.preAuction.createNewPreAuciton)}
          startIcon={<AddSvg />}
        >
          Create new Pre-Auction Activity
        </Button>
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={20}>
        <Search searchText={searchText} setSearchText={setSearchText} placeholder="Search" />
        <Stack direction={'row'} spacing={20}>
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
                  key={record.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
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
    </Box>
  )
}
