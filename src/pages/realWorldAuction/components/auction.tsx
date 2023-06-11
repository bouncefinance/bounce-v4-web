import { Box, Typography, Button, Pagination } from '@mui/material'
import Marketplace from './marketplace'
import MarketplaceMobile from './marketplaceMobile'
import { usePagination } from 'ahooks'
import { Params } from 'ahooks/lib/usePagination/types'
import P1Img from 'assets/imgs/realWorld/p1.png'
import { routes } from 'constants/routes'
import { Banner, SwiperSkeleton } from 'bounceComponents/auction/ArrowBanner'
import { ActionType, useValuesDispatch } from 'bounceComponents/real-world-collectibles/ValuesProvider'
import { useEffect } from 'react'
import { useIsSMDown } from 'themes/useTheme'
import AuctionCard from './auctionCard'
import UpcomingAuction from './upcomingAuction'
export enum AuctionFilterKey {
  categories = 'categories',
  status = 'status',
  range = 'range',
  min = 'min',
  max = 'max'
}
export interface FilterSearchConfig {
  type: string
  label: string
  values: string[]
  value: string
  max?: string
  min?: string
  key: AuctionFilterKey
}

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
    type: 'select',
    label: 'Status',
    key: AuctionFilterKey.status,
    values: ['Live auction', 'Past auction', 'Upcoming'],
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
export function waitFun(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}
const AuctionContent = () => {
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
      const result = {
        types: 'Token',
        avatar: P1Img,
        url: routes.fundo.home,
        name: 'NFT issued by 4K Alpha Vault',
        openAt: 1686343871,
        category: 1,
        chainId: 0,
        token0: '',
        tokenAmount0: ''
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
        background: '#fff',
        padding: ' 0 0 20px'
      }}
      mb={144}
    >
      <Box
        sx={{
          width: '100%',
          padding: isSm ? '68px 24px 76px' : '80px 0 100px',
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
          The physical auction supports the English auction mode. You are bidding for a physical backed NFTs and you can
          redeem it post auction
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            marginTop: '40px'
          }}
        >
          <Button
            href={
              'https://docs.google.com/forms/d/e/1FAIpQLSdW1PZ-PoL-eiTi7a1ZmWEA4XImdlh1TUlktwKuoM-AFsFsrw/viewform?usp=sf_link'
            }
            target={'_blank'}
            variant="contained"
            sx={{
              height: isSm ? '42px' : '52px',
              // background: 'var(--ps-yellow-1)',
              padding: '16px 20px',
              fontSize: isSm ? '14px' : '16px'
            }}
          >
            Apply for auction
          </Button>
        </Box>
      </Box>
      <UpcomingAuction></UpcomingAuction>
      {!isSm && (
        <Marketplace handleSearch={handleSearch} filterConfig={filterConfig}>
          <>
            {loading ? (
              <SwiperSkeleton />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  justifyContent: 'flex-start'
                }}
                gap={'24px'}
              >
                {poolList &&
                  poolList?.list &&
                  poolList.list.map((item: any, index: number) => {
                    return <Banner key={index} banner={item}></Banner>
                  })}
              </Box>
            )}
            {poolList?.total >= 10 && (
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
              <SwiperSkeleton />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  justifyContent: 'flex-start'
                }}
                gap={'24px'}
              >
                {poolList &&
                  poolList?.list &&
                  poolList.list.map((item: any, index: number) => {
                    return <AuctionCard key={index} banner={item}></AuctionCard>
                  })}
              </Box>
            )}
            {poolList?.total >= 10 && (
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
export default AuctionContent
