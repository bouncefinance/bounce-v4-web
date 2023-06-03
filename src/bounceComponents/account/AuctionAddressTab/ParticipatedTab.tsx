import { Box, Button, Grid, MenuItem, Pagination, Select, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { usePagination } from 'ahooks'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import AuctionCardFull from 'bounceComponents/common/AuctionCard/AuctionCardFull'
import { Params } from 'ahooks/lib/usePagination/types'
import { IAuctionPoolsItems } from 'api/profile/type'
import { FixedSwapPool, PoolType } from 'api/pool/type'
import { getUserPoolsTokenCollect, getUserPoolsTokenCreated, getUserPoolsTokenParticipant } from 'api/account'
import { DashboardQueryType } from 'api/account/types'
import { useActiveWeb3React } from 'hooks'
import AuctionTypeSelect from 'bounceComponents/common/AuctionTypeSelect'
import { NFTCard } from 'pages/market/nftAuctionPool'
import { routes } from 'constants/routes'
import { BackedTokenType } from 'pages/account/MyTokenOrNFT'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import ChainSelect from 'bounceComponents/common/ChainSelect'
import EmptyData from 'bounceComponents/common/EmptyData'
import getAuctionPoolLink from 'utils/auction/getAuctionPoolRouteLink'

const defaultPageSize = 6

type IType = 'created' | 'collect' | 'participated'

export default function ParticipatedTab({
  backedTokenType,
  type = 'created'
}: {
  backedTokenType: BackedTokenType
  type?: IType
}) {
  const [curChain, setCurChain] = useState(0)
  const [queryType, setQueryType] = useState<DashboardQueryType | 0>(0)
  const { account } = useActiveWeb3React()
  const [curPoolType, setCurPoolType] = useState<PoolType | 0>(0)
  const navigate = useNavigate()

  const {
    pagination,
    data: auctionPoolData,
    loading
  } = usePagination<IAuctionPoolsItems<FixedSwapPool>, Params>(
    async ({ current, pageSize }) => {
      if (!account)
        return {
          total: 0,
          list: []
        }
      const category = curPoolType
      const func =
        type === 'created'
          ? getUserPoolsTokenCreated
          : type === 'participated'
          ? getUserPoolsTokenParticipant
          : getUserPoolsTokenCollect
      const resp: any = await func({
        offset: (current - 1) * pageSize,
        limit: pageSize,
        category,
        address: account,
        chainId: curChain,
        queryType,
        tokenType: backedTokenType
      })
      if (backedTokenType === BackedTokenType.TOKEN) {
        return {
          list: resp.data.fixedSwapList.list,
          total: resp.data.fixedSwapList.total
        }
      }

      return {
        list: resp.data.fixedSwapNftList.list,
        total: resp.data.fixedSwapNftList.total
      }
    },
    {
      defaultPageSize,
      ready: !!account,
      refreshDeps: [account, curChain, curPoolType, queryType, backedTokenType],
      debounceWait: 100
    }
  )

  useEffect(() => {
    pagination.changeCurrent(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, curPoolType, queryType, backedTokenType])

  const handlePageChange = (_: any, p: number) => {
    pagination.changeCurrent(p)
  }

  return (
    <Box>
      <Box display={'flex'} alignItems="center" justifyContent={'space-between'}>
        <Stack spacing={10} direction="row">
          <ChainSelect curChain={curChain} setCurChain={v => setCurChain(v || 0)} />
          <Select
            value={queryType}
            sx={{ width: 200, height: 38 }}
            onChange={e => setQueryType(Number(e.target?.value) || 0)}
          >
            <MenuItem key={0} value={0}>
              All
            </MenuItem>
            <MenuItem key={1} value={DashboardQueryType.ongoing}>
              ongoing
            </MenuItem>
            <MenuItem key={2} value={DashboardQueryType.claim}>
              claim
            </MenuItem>
          </Select>
          <AuctionTypeSelect
            tokenType={backedTokenType}
            curPoolType={curPoolType}
            setCurPoolType={t => setCurPoolType(t)}
          />
        </Stack>

        {type === 'created' && (
          <Button
            sx={{ height: 44 }}
            variant="contained"
            color="secondary"
            onClick={() => navigate(routes.auction.createAuctionPool)}
          >
            <Add /> Create a pool
          </Button>
        )}
      </Box>

      {loading ? (
        <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BounceAnime />
        </Box>
      ) : !auctionPoolData?.total || auctionPoolData?.total === 0 ? (
        <EmptyData
          title={`Hasn’t ${
            type === 'created' ? 'created' : type === 'participated' ? 'participated' : 'collect'
          } Auction`}
          prompt="Go and explore auctions."
        />
      ) : (
        <Box mt={40}>
          {auctionPoolData && auctionPoolData?.total > 0 && (
            <Grid container spacing={{ xs: 10, xl: 18 }}>
              {auctionPoolData?.list?.map((auctionPoolItem, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={index}>
                  {auctionPoolItem.tokenType === BackedTokenType.TOKEN ? (
                    <AuctionCardFull auctionPoolItem={auctionPoolItem} />
                  ) : (
                    <Box
                      component={'a'}
                      href={getAuctionPoolLink(
                        auctionPoolItem.category,
                        auctionPoolItem.chainId,
                        auctionPoolItem.poolId
                      )}
                    >
                      <NFTCard nft={auctionPoolItem} hiddenStatus={true} />
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      <Box mt={40} display={'flex'} justifyContent="center">
        <Pagination
          onChange={handlePageChange}
          sx={{ '.MuiPagination-ul li button': { border: '1px solid' }, alignItems: 'end' }}
          count={Math.ceil((auctionPoolData?.total || 0) / (defaultPageSize || 0))}
        />
      </Box>
    </Box>
  )
}
