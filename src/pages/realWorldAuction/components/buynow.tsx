import { Box, Typography, Grid, Pagination } from '@mui/material'
import Marketplace from './marketplace'
import MarketplaceMobile from './marketplaceMobile'
import { usePagination } from 'ahooks'
import PoolCardSkeleton from './poolCardSkeleton'
import { waitFun, AuctionFilterKey, FilterSearchConfig } from './auction'
import { useState, useEffect } from 'react'
import PoolCard from './poolCard'
import { Params } from 'ahooks/lib/usePagination/types'
import { ActionType, useValuesDispatch, useValuesState } from 'bounceComponents/real-world-collectibles/ValuesProvider'
import { useIsSMDown } from 'themes/useTheme'
const defaultPageSize = 12
import { BannerType } from './banner'
import EmptyData from 'bounceComponents/common/EmptyData'
import { marketList } from './auction'
export const filterConfig: FilterSearchConfig[] = [
  {
    // select type return one of values
    type: 'select',
    label: 'Categories',
    key: AuctionFilterKey.categories,
    values: ['Watches', 'Sneakers', 'Electronics', 'Fashion', 'Cards', 'Casascius', 'Collectibles'],
    value: ''
  }
  //   {
  //     // range type return type、max、min, like ['SOL', 100, 0]
  //     type: 'range',
  //     key: AuctionFilterKey.range,
  //     label: 'Price range',
  //     values: ['SOL'],
  //     value: '',
  //     max: '',
  //     min: ''
  //   }
]
export interface PoolItemParams {
  bgImg: string
  title: string
  subTitle: string
  price: string
  tips: string
}
const BuynowContent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const values = useValuesState()
  const valuesDispatch = useValuesDispatch()
  const isSm = useIsSMDown()

  const {
    pagination: poolsPagination,
    data: poolList,
    loading,
    run
  } = usePagination<any, Params>(
    async ({ current, pageSize = defaultPageSize }) => {
      await waitFun(500)
      let searchResult: BannerType[] = [...marketList]
      if (values.keyword) {
        searchResult = marketList.filter(item => {
          return item.name.indexOf(values.keyword) > -1
        })
      }
      if (values.status) {
        const nowTime = new Date().getTime()
        if (values.status === 'Upcoming') {
          searchResult = marketList.filter(item => {
            return Number(item.startTime) * 1000 > nowTime
          })
        } else if (values.status === 'Past auction') {
          searchResult = marketList.filter(item => {
            return Number(item.endTime) * 1000 <= nowTime
          })
        } else if (values.status === 'Live auction') {
          searchResult = marketList.filter(item => {
            return Number(item.startTime) * 1000 <= nowTime && Number(item.endTime) * 1000 > nowTime
          })
        }
      }
      if (values.categories) {
        searchResult = marketList.filter(item => {
          return values.categories === item.categories
        })
      }
      const result = searchResult.slice((current - 1) * pageSize, current * pageSize)
      setTimeout(() => {
        document
          .getElementById('Marketplace')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      })
      return {
        list: result,
        total: searchResult.length
      }
    },
    {
      manual: true,
      defaultPageSize
    }
  )
  const handlePageChange = (_: any, p: number) => {
    poolsPagination.changeCurrent(p)
  }
  const handleSearch = () => {
    run({ current: 1, pageSize: defaultPageSize })
  }
  useEffect(() => {
    valuesDispatch({
      type: ActionType.ClearParams,
      payload: {}
    })
    setTimeout(() => {
      run({ current: 1, pageSize: defaultPageSize })
    })
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        background: '#fff',
        padding: '0 0 20px'
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
        <Marketplace
          poolLength={poolList?.total || 0}
          handleSearch={handleSearch}
          filterConfig={filterConfig}
          handleSetOpen={setIsOpen}
        >
          <>
            {loading ? (
              <Grid container spacing={{ xs: 10, xl: 20 }}>
                <Grid item xs={12} sm={12} md={6} lg={isOpen ? 4 : 3} xl={isOpen ? 4 : 3}>
                  <PoolCardSkeleton />
                </Grid>
              </Grid>
            ) : poolList?.total === 0 ? (
              <EmptyData isLight={true} />
            ) : (
              <Grid container spacing={{ xs: 10, xl: 20 }}>
                {poolList &&
                  poolList?.list &&
                  poolList.list.map((item: BannerType, index: number) => {
                    return (
                      <Grid item lg={isOpen ? 4 : 3} xl={isOpen ? 4 : 3} key={index}>
                        <PoolCard item={item} key={index} />
                      </Grid>
                    )
                  })}
              </Grid>
            )}
            {poolList?.total >= defaultPageSize && (
              <Box mt={58} display={'flex'} justifyContent={'center'}>
                <Pagination
                  page={poolsPagination.current}
                  onChange={handlePageChange}
                  count={Math.ceil(poolList?.total / defaultPageSize) || 0}
                  variant="outlined"
                  siblingCount={0}
                  sx={{
                    '.MuiPagination-ul li button': {
                      color: '#fff',
                      border: '1px solid var(--ps-text-3)'
                    },
                    '.MuiPagination-ul>li:not(:first-of-type):not(:last-child) .MuiPaginationItem-root': {
                      border: 0,
                      color: '#fff',
                      fontFamily: `'Inter'`,
                      fontWight: 400,
                      fontSize: 16,
                      background: 'var(--ps-text-2)',
                      '&.Mui-selected': {
                        color: 'var(--ps-text-3)',
                        background: 'var(--ps-yellow-1)'
                      },
                      '&:hover': {
                        backgroundColor: 'var(--ps-text-1)',
                        color: '#fff'
                      }
                    },
                    alignItems: 'end'
                  }}
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
                <Grid item xs={12} sm={12} md={6} lg={isOpen ? 4 : 3} xl={isOpen ? 4 : 3}>
                  <PoolCardSkeleton />
                </Grid>
              </Grid>
            ) : poolList?.total === 0 ? (
              <EmptyData isLight={true} />
            ) : (
              <Grid container spacing={{ xs: 10, xl: 20 }}>
                {poolList &&
                  poolList?.list &&
                  poolList.list.map((item: BannerType, index: number) => {
                    return (
                      <Grid item xs={12} sm={12} md={6} lg={isOpen ? 4 : 3} xl={isOpen ? 4 : 3} key={index}>
                        <PoolCard item={item} key={index} />
                      </Grid>
                    )
                  })}
              </Grid>
            )}
            {poolList?.total >= defaultPageSize && (
              <Box mt={58} display={'flex'} justifyContent={'center'}>
                <Pagination
                  page={poolsPagination.current}
                  onChange={handlePageChange}
                  count={Math.ceil(poolList?.total / defaultPageSize) || 0}
                  variant="outlined"
                  siblingCount={0}
                  sx={{
                    '.MuiPagination-ul li button': {
                      color: '#fff',
                      border: '1px solid var(--ps-text-3)'
                    },
                    '.MuiPagination-ul>li:not(:first-of-type):not(:last-child) .MuiPaginationItem-root': {
                      border: 0,
                      color: '#fff',
                      fontFamily: `'Inter'`,
                      fontWight: 400,
                      fontSize: 16,
                      background: 'var(--ps-text-2)',
                      '&.Mui-selected': {
                        color: 'var(--ps-text-3)',
                        background: 'var(--ps-yellow-1)'
                      },
                      '&:hover': {
                        backgroundColor: 'var(--ps-text-1)',
                        color: '#fff'
                      }
                    },
                    alignItems: 'end'
                  }}
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
