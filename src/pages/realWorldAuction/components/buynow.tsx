import { Box, Typography, Grid, Pagination } from '@mui/material'
import Marketplace from './marketplace'
import MarketplaceMobile from './marketplaceMobile'
import { usePagination } from 'ahooks'
import P2Img from 'assets/imgs/realWorld/p2.png'
import PoolCardSkeleton from './poolCardSkeleton'
import { waitFun, AuctionFilterKey, FilterSearchConfig } from './auction'
import { useState, useEffect } from 'react'
import PoolCard from './poolCard'
import { Params } from 'ahooks/lib/usePagination/types'
import { ActionType, useValuesDispatch } from 'bounceComponents/real-world-collectibles/ValuesProvider'
import { useIsSMDown } from 'themes/useTheme'

export const filterConfig: FilterSearchConfig[] = [
  {
    // select type return one of values
    type: 'select',
    label: 'Categories',
    key: AuctionFilterKey.categories,
    values: ['Watches', 'Sneakers', 'Electronics', 'Fashion', 'Cards', 'Casascius', 'Collectibles'],
    value: ''
  },
  {
    // range type return type、max、min, like ['SOL', 100, 0]
    type: 'range',
    key: AuctionFilterKey.range,
    label: 'Price range',
    values: ['SOL'],
    value: '',
    max: '',
    min: ''
  }
]
export interface PoolItemParams {
  bgImg: string
  title: string
  subTitle: string
  price: string
  tips: string
}
const BuynowContent = () => {
  const [setOpen, setSetOpen] = useState(false)
  const valuesDispatch = useValuesDispatch()
  const isSm = useIsSMDown()
  useEffect(() => {
    valuesDispatch({
      type: ActionType.ClearParams,
      payload: {}
    })
    return () => {}
  }, [valuesDispatch])
  const {
    pagination: poolsPagination,
    data: poolList,
    loading,
    run
  } = usePagination<any, Params>(
    async () => {
      await waitFun(500)
      const result: PoolItemParams = {
        bgImg: P2Img,
        title: 'John Ross Key',
        subTitle: 'A Country Garden | Late 19th Century | Oil o...',
        price: '23.00 BNB',
        tips: 'NFT issued by 4K Alpha Vault'
      }
      return {
        list: [result],
        total: 1
      }
    },
    {
      manual: true,
      defaultPageSize: 10
    }
  )
  const handlePageChange = (_: any, p: number) => {
    poolsPagination.changeCurrent(p)
  }
  const handleSearch = () => {
    run({ current: 1, pageSize: 10 })
  }
  useEffect(() => {
    run({ current: 1, pageSize: 10 })
    return () => {}
  }, [run])
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        background: '#fff'
      }}
      mb={144}
    >
      <Box
        sx={{
          width: '100%',
          padding: isSm ? '68px 24px 76px' : '80px 0 80px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            width: isSm ? '100%' : '700px',
            fontWeight: 600,
            fontSize: isSm ? '20px' : '28px',
            lineHeight: '30px',
            textAlign: 'center'
          }}
        >
          You can buy Now or go to the details page to make an offer. You are buying for a physical backed NFTs and you
          can redeem it post deal done.
        </Typography>
      </Box>
      {!isSm && (
        <Marketplace handleSearch={handleSearch} filterConfig={filterConfig} handleSetOpen={setSetOpen}>
          <>
            {loading ? (
              <Grid container spacing={{ xs: 10, xl: 20 }}>
                <Grid item xs={12} sm={12} md={6} lg={setOpen ? 4 : 3} xl={setOpen ? 4 : 3}>
                  <PoolCardSkeleton />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={{ xs: 10, xl: 20 }}>
                {poolList &&
                  poolList?.list &&
                  poolList.list.map((item: PoolItemParams, index: number) => {
                    return (
                      <Grid item xs={12} sm={12} md={6} lg={setOpen ? 4 : 3} xl={setOpen ? 4 : 3} key={index}>
                        <PoolCard item={item} key={index} />
                      </Grid>
                    )
                  })}
              </Grid>
            )}
            {poolList?.total >= 0 && (
              <Box mt={58} display={'flex'} justifyContent={'center'}>
                <Pagination
                  onChange={handlePageChange}
                  count={Math.ceil(poolList?.total / 10) || 0}
                  variant="outlined"
                  siblingCount={0}
                />
              </Box>
            )}
          </>
        </Marketplace>
      )}
      {isSm && (
        <MarketplaceMobile handleSearch={handleSearch} filterConfig={filterConfig}>
          <>
            {loading ? (
              <Grid container spacing={{ xs: 10, xl: 20 }}>
                <Grid item xs={12} sm={12} md={6} lg={setOpen ? 4 : 3} xl={setOpen ? 4 : 3}>
                  <PoolCardSkeleton />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={{ xs: 10, xl: 20 }}>
                {poolList &&
                  poolList?.list &&
                  poolList.list.map((item: PoolItemParams, index: number) => {
                    return (
                      <Grid item xs={12} sm={12} md={6} lg={setOpen ? 4 : 3} xl={setOpen ? 4 : 3} key={index}>
                        <PoolCard item={item} key={index} />
                      </Grid>
                    )
                  })}
              </Grid>
            )}
            {poolList?.total >= 0 && (
              <Box mt={58} display={'flex'} justifyContent={'center'}>
                <Pagination
                  onChange={handlePageChange}
                  count={Math.ceil(poolList?.total / 10) || 0}
                  variant="outlined"
                  siblingCount={0}
                />
              </Box>
            )}
          </>
        </MarketplaceMobile>
      )}
    </Box>
  )
}
export default BuynowContent
