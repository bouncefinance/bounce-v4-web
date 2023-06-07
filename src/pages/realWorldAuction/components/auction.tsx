import { Box, Typography, Button } from '@mui/material'
import Marketplace from './marketplace'
import { useRequest } from 'ahooks'
import P1Img from 'assets/imgs/realWorld/p1.png'
import { routes } from 'constants/routes'
import { Banner, SwiperSkeleton } from 'bounceComponents/auction/ArrowBanner'
import { ActionType, useValuesDispatch } from 'bounceComponents/real-world-collectibles/ValuesProvider'
import { useEffect } from 'react'
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
  useEffect(() => {
    valuesDispatch({
      type: ActionType.ClearParams,
      payload: {}
    })
    return () => {}
  }, [valuesDispatch])
  const {
    data: poolList,
    loading,
    run
  } = useRequest(async () => {
    await waitFun(500)
    const result = {
      types: 'Token',
      avatar: P1Img,
      url: routes.market.index,
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
  }, {})
  const handleSearch = () => {
    run()
  }

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
          padding: '80px 0 100px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            width: '700px',
            fontWeight: 600,
            fontSize: '28px',
            lineHeight: '30px'
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
              // background: 'var(--ps-yellow-1)',
              padding: '16px 20px'
            }}
          >
            Apply for auction
          </Button>
        </Box>
      </Box>
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
                poolList.list.map((item, index) => {
                  return <Banner key={index} banner={item}></Banner>
                })}
            </Box>
          )}
        </>
      </Marketplace>
    </Box>
  )
}
export default AuctionContent
