import { Box, Typography, Button, Pagination } from '@mui/material'
import Marketplace from './marketplace'
import MarketplaceMobile from './marketplaceMobile'
import { usePagination } from 'ahooks'
import { Params } from 'ahooks/lib/usePagination/types'
import P1Img from 'assets/imgs/realWorld/p1.png'
import { routes } from 'constants/routes'
import { Banner, SwiperSkeleton } from './banner'
import { ActionType, useValuesDispatch, useValuesState } from 'bounceComponents/real-world-collectibles/ValuesProvider'
import { useEffect } from 'react'
import { useIsSMDown } from 'themes/useTheme'
import AuctionCard from './auctionCard'
// import UpcomingAuction from './upcomingAuction'
import { BannerType } from './banner'
import EmptyData from 'bounceComponents/common/EmptyData'
export const marketList: BannerType[] = [
  {
    categories: 'Collectibles',
    name: 'The 1st Sabotage Hi Top Studio Pr...',
    time: '--',
    img: P1Img,
    link: routes.fundo.home,
    startTime: 1687622400,
    endTime: ''
  },
  {
    categories: 'Fashion',
    name: 'Handbags Online: The New York Edit',
    time: '30 MAY 10AM - 12 JUN 10AM EDT',
    img: 'https://www.christies.com/img/SaleImages/NYR-22070-05302023-1.jpg',
    link: 'https://onlineonly.christies.com/s/handbags-online-new-york-edit/lots/3361',
    startTime: 1685419200,
    endTime: 1686542400
  },
  {
    categories: 'Wines',
    name: 'Fine and Rare Wines Online: Featuring the Time Capsule Collection of Undisturbed Legends of the Côte d’Or',
    time: '31 MAY 7AM - 13 JUN 7AM PDT',
    img: 'https://www.christies.com/img/SaleImages/LAW-22064-05312023-1.jpg',
    link: 'https://onlineonly.christies.com/s/fine-rare-wines-online-time-capsule-collection-undisturbed-legends/lots/3358',
    startTime: 1685516400,
    endTime: 1686639600
  },
  {
    categories: 'Art',
    name: 'Modern British Art Selling Exhibition',
    time: '3 - 14 JUNE',
    img: 'https://www.christies.com/img/eventimages/PrivateSalesExhibiti-1-20230602111457.jpg',
    link: 'https://www.christies.com/private-sales/exhibitions/modern-british-art-selling-exhibition-d3310f3e-a9ff-4e94-aca6-acf1d40c9043/overview',
    startTime: 1685721600,
    endTime: 1686672000
  },
  {
    categories: 'Art',
    name: 'The Ann and Gordon Getty Collection: Temple of Wings',
    time: '14 JUNE 10:00 AM EDT',
    img: 'https://www.christies.com/img/SaleImages/NYR-22125-06142023-1.jpg',
    link: 'https://www.christies.com/en/auction/the-ann-and-gordon-getty-collection-temple-of-wings-30129/',
    startTime: 1686744000,
    endTime: 0
  },
  {
    categories: 'Art',
    name: "Art d'Asie",
    time: '14 JUNE 10:30 AM CEST ',
    img: 'https://www.christies.com/img/SaleImages/PAR-22151-06142023-1.jpg',
    link: 'https://www.christies.com/en/auction/art-d-asie-30188/',
    startTime: 1686731400,
    endTime: 0
  },
  {
    categories: 'Art',
    name: 'The Ann and Gordon Getty Collection: Aesthetic Decoration from Temple of Wings',
    time: '31 MAY 10AM - 15 JUN 10AM EDT',
    img: 'https://www.christies.com/img/SaleImages/NYR-21107-05312023-1.jpg',
    link: 'https://onlineonly.christies.com/s/ann-gordon-getty-collection-aesthetic-decoration-temple-wings/lots/3441',
    startTime: 1685534400,
    endTime: 1686830400
  },
  {
    categories: 'Art',
    name: 'The Ann and Gordon Getty Collection: Early Modern Design from Temple of Wings',
    time: '31 MAY 10AM - 15 JUN 2PM EDT',
    img: 'https://www.christies.com/img/SaleImages/NYR-21108-05312023-1.jpg',
    link: 'https://onlineonly.christies.com/s/ann-gordon-getty-collection-early-modern-design-temple-wings/lots/3432',
    startTime: 1685534400,
    endTime: 1686852000
  },
  {
    categories: 'Jewellery',
    name: 'Jewels Online: The London Edit',
    time: '2 JUN 11AM - 15 JUN 11AM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-21938-06022023-1.jpg',
    link: 'https://onlineonly.christies.com/s/jewels-online-london-edit/lots/3306',
    startTime: 1686852000,
    endTime: 1686823200
  },
  {
    categories: 'Art',
    name: 'Maîtres Anciens : Peintures - Sculptures',
    time: '15 JUNE 03:00 PM CEST',
    img: 'https://www.christies.com/img/SaleImages/PAR-20692-06152023-1.jpg',
    link: 'https://www.christies.com/en/auction/ma-tres-anciens-peintures-sculptures-29472/',
    startTime: 1686834000,
    endTime: 0
  },
  {
    categories: 'Art',
    name: 'The Bruce M. Lisman Collection of Important American Literature: Part One',
    time: '15 JUNE 10:00 AM EDT',
    img: 'https://www.christies.com/img/SaleImages/NYR-22474-06152023-1.jpg',
    link: 'https://www.christies.com/en/auction/the-bruce-m-lisman-collection-of-important-american-literature-part-one-30193/',
    startTime: 1686830400,
    endTime: 0
  },
  {
    categories: 'Art',
    name: 'Maîtres Anciens : Peintures – Sculptures, Online',
    time: '1 JUN 10AM - 16 JUN 2PM CEST',
    img: 'https://www.christies.com/img/SaleImages/PAR-22155-06012023-1.jpg',
    link: 'https://onlineonly.christies.com/s/maitres-anciens-peintures-sculptures-online/lots/3424',
    startTime: 1685606400,
    endTime: 1686916800
  },
  {
    categories: 'Collectibles',
    name: 'The Bruce M. Lisman Collection of Important American Literature: Part Two',
    time: '2 JUN 10AM - 16 JUN 12PM EDT',
    img: 'https://www.christies.com/img/SaleImages/NYR-22475-06022023-1.jpg',
    link: 'https://onlineonly.christies.com/s/bruce-m-lisman-collection-important-american-literature-part-two/lots/3428',
    startTime: 1685707200,
    endTime: 1686844800
  },
  {
    categories: 'Art',
    name: 'The Magnificent Library of Norman Bobins: Part One, American Color',
    time: '16 JUNE 10:00 AM EDT',
    img: 'https://www.christies.com/img/SaleImages/NYR-22547-06162023-1.jpg',
    link: 'https://www.christies.com/en/auction/the-magnificent-library-of-norman-bobins-part-one-american-color-30220/',
    startTime: 1686916800,
    endTime: 0
  },
  {
    categories: 'Art',
    name: 'Art of Asia',
    time: '6 JUN 10AM - 20 JUN 2PM CEST',
    img: 'https://www.christies.com/img/SaleImages/PAR-22045-06062023-1.jpg',
    link: 'https://onlineonly.christies.com/s/art-asia/lots/3355',
    startTime: 1686038400,
    endTime: 1687262400
  },
  {
    categories: 'Wines',
    name: 'The Two Continents Collection - The Private Cellar of Irwin Kotovsky Online: Part II',
    time: '8 JUN 10AM - 21 JUN 11AM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-21935-06082023-1.jpg',
    link: 'https://onlineonly.christies.com/s/two-continents-collection-private-cellar-irwin-kotovsky-online-part-ii/lots/3305',
    startTime: 1686214800,
    endTime: 1687341600
  },
  {
    categories: 'Collectibles',
    name: 'Joaillerie Paris',
    time: '9 JUN 10AM - 21 JUN 2PM CEST',
    img: 'https://www.christies.com/img/SaleImages/PAR-22153-06092023-1.jpg',
    link: 'https://onlineonly.christies.com/s/joaillerie-paris/lots/3410',
    startTime: 1686297600,
    endTime: 1687348800
  },
  {
    categories: 'Fashion',
    name: 'The Two Continents Collection - The Private Spirits Collection Of Irwin Kotovsky Online: Part III',
    time: '8 JUN 12PM - 22 JUN 12PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-22636-06082023-1.jpg',
    link: 'https://onlineonly.christies.com/s/two-continents-collection-private-spirits-collection-irwin-kotovsky/lots/3454',
    startTime: 1686222000,
    endTime: 1687431600
  },
  {
    categories: 'Art',
    name: "Arts d'Afrique, d'Océanie et des Amériques",
    time: '22 JUNE 04:00 PM CEST',
    img: 'https://www.christies.com/img/SaleImages/PAR-22147-06222023-1.jpg',
    link: 'https://www.christies.com/en/auction/arts-d-afrique-d-oc-anie-et-des-am-riques-30187/',
    startTime: 1687442400,
    endTime: 0
  },
  {
    categories: 'Fashion',
    name: 'Inside the Orange Box: Part III',
    time: '13 JUNE 02:00 PM - 27 JUNE 02:00 PM CEST',
    img: 'https://www.christies.com/img/SaleImages/AMS-22528-06132023-1.jpg',
    link: 'https://www.christies.com/en/auction/inside-the-orange-box-part-iii-22528-ams/',
    startTime: 1686657600,
    endTime: 1687867200
  },
  {
    categories: 'Art',
    name: '20th/21st Century: London Evening Sale',
    time: '28 JUNE 02:00 PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-21886-06282023-1.jpg',
    link: 'https://www.christies.com/en/auction/20th-21st-century-london-evening-sale-21886-cks/',
    startTime: 1687957200,
    endTime: 0
  },
  {
    categories: 'Art',
    name: 'The Collection of Donna Summer',
    time: '15 JUN 10AM - 29 JUN 10AM EDT',
    img: 'https://www.christies.com/img/SaleImages/NYR-21005-06152023-1.jpg',
    link: 'https://onlineonly.christies.com/s/collection-donna-summer/lots/3486',
    startTime: 1686830400,
    endTime: 1688040000
  },
  {
    categories: 'Art',
    name: 'Post-War and Contemporary Art Day Sale',
    time: '29 JUNE 01:00 PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-21887-06292023-1.jpg',
    link: 'https://www.christies.com/en/auction/post-war-and-contemporary-art-day-sale-21887-cks/',
    startTime: 1688040000,
    endTime: 0
  },
  {
    name: 'Impressionist and Modern Art Day and Works on Paper Sale',
    time: '30 JUNE 01:00 PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-21888-06302023-1.jpg',
    link: 'https://www.christies.com/en/auction/impressionist-and-modern-art-day-and-works-on-paper-sale-21888-cks/',
    startTime: 1688126400,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'Old Master and British Drawings and Watercolours',
    time: '4 JULY 02:30 PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-21459-07042023-1.jpg',
    link: 'https://www.christies.com/en/auction/old-master-and-british-drawings-and-watercolours-21459-cks/',
    startTime: 1688477400,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'First Open: Post-War and Contemporary Art Online',
    time: '21 JUNE 12:00 PM - 5 JULY 12:00 PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-22001-06212023-1.jpg',
    link: 'https://www.christies.com/en/auction/first-open-post-war-and-contemporary-art-online-22001-cks/',
    startTime: 1687345200,
    endTime: 1688554800,
    categories: 'Art'
  },
  {
    name: 'Livres rares et Manuscrits',
    time: '22 JUNE 12:00 PM - 5 JULY 01:00 PM CEST',
    img: 'https://www.christies.com/img/SaleImages/PAR-22529-06222023-1.jpg',
    link: 'https://www.christies.com/en/auction/livres-rares-et-manuscrits-22529-par/',
    startTime: 1687428000,
    endTime: 1688554800,
    categories: 'Collectibles'
  },
  {
    name: 'Antiquities',
    time: '5 JULY 01:00 PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-21909-07052023-1.jpg',
    link: 'https://www.christies.com/en/auction/antiquities-29962/',
    startTime: 1688558400,
    endTime: 0,
    categories: 'Collectibles'
  },
  {
    name: 'The Exceptional Sale',
    time: '6 JULY 12:00 PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-21436-07062023-1.jpg',
    link: 'https://www.christies.com/en/auction/the-exceptional-sale-21436-cks/',
    startTime: 1688641200,
    endTime: 0,
    categories: 'Collectibles'
  },
  {
    name: 'Remastered: Old Masters from the Collection of J.E. Safra',
    time: '6 JULY 04:30 PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-22308-07062023-1.jpg',
    link: 'https://www.christies.com/en/auction/remastered-old-masters-from-the-collection-of-j-e-safra-22308-cks/',
    startTime: 1688655600,
    endTime: 0,
    categories: 'Collectibles'
  },
  {
    name: 'Old Masters Part I',
    time: '6 JULY 02:30 PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-20683-07062023-1.jpg',
    link: 'https://www.christies.com/en/auction/old-masters-part-i-20683-cks/',
    startTime: 1688650200,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'Old Masters Part II',
    time: '7 JULY 10:30 AM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-20684-07072023-1.jpg',
    link: 'https://www.christies.com/en/auction/old-masters-part-ii-20684-cks/',
    startTime: 1688722200,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'Valuable Books and Manuscripts',
    time: '12 JULY 10:30 AM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-21952-07122023-1.jpg',
    link: 'https://www.christies.com/en/auction/valuable-books-and-manuscripts-21952-cks/',
    startTime: 1689154200,
    endTime: 0,
    categories: 'Collectibles'
  },
  {
    name: 'The Magnificent Library of Norman Bobins: Part Two, The Colourful World',
    time: '13 JULY 10:00 AM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-22621-07132023-1.jpg',
    link: 'https://www.christies.com/en/auction/the-magnificent-library-of-norman-bobins-part-two-the-colourful-world-22621-cks/',
    startTime: 1689238800,
    endTime: 0,
    categories: 'Collectibles'
  },
  {
    name: 'British and European Art',
    time: '13 JULY 02:00 PM BST',
    img: 'https://www.christies.com/img/SaleImages/CKS-21954-07132023-1.jpg',
    link: 'https://www.christies.com/en/auction/british-and-european-art-21954-cks/',
    startTime: 1689253200,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'First Open | Post-War & Contemporary Art',
    time: '7 JULY 10:00 AM - 18 JULY 10:00 AM EDT',
    img: 'https://www.christies.com/img/SaleImages/NYR-21597-07072023-1.jpg',
    link: 'https://www.christies.com/en/auction/first-open-post-war-contemporary-art-21597-nyr/',
    startTime: 1686139200,
    endTime: 1687089600,
    categories: 'Collectibles'
  },
  {
    name: 'Contemporary Edition',
    time: '7 JULY 10:00 AM - 19 JULY 10:00 AM EDT ',
    img: 'https://www.christies.com/img/SaleImages/NYR-22047-07072023-1.jpg',
    link: 'https://www.christies.com/en/auction/contemporary-edition-22047-nyr/',
    startTime: 1686139200,
    endTime: 1687176000,
    categories: 'Art'
  },
  {
    name: 'Photographs',
    time: '19 SEPTEMBER 10:00 AM - 4 OCTOBER 10:00 AM EDT ',
    img: 'https://www.christies.com/img/SaleImages/NYR-21968-09192023-1.jpg',
    link: 'https://www.christies.com/en/auction/photographs-21968-nyr/',
    startTime: 1695124800,
    endTime: 1696420800,
    categories: 'Collectibles'
  },
  {
    name: 'Madonna x Meisel - The SEX Photographs',
    time: '6 OCTOBER 02:00 PM EDT',
    img: 'https://www.christies.com/img/SaleImages/NYR-22700-10062023-1.jpg',
    link: 'https://www.christies.com/en/auction/madonna-x-meisel-the-sex-photographs-22700-nyr/',
    startTime: 1696615200,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'Made in Holland',
    time: '26 SEPTEMBER 02:00 PM - 10 OCTOBER 02:00 PM CEST',
    img: 'https://www.christies.com/img/SaleImages/AMS-21640-09262023-1.jpg',
    link: 'https://www.christies.com/en/auction/made-in-holland-21640-ams/',
    startTime: 1695729600,
    endTime: 1696939200,
    categories: 'Collectibles'
  }
]
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
    values: [
      'Watches',
      'Sneakers',
      'Electronics',
      'Fashion',
      'Cards',
      'Casascius',
      'Collectibles',
      'Wines',
      'Art',
      'Jewellery'
    ],
    value: ''
  },
  {
    type: 'select',
    label: 'Status',
    key: AuctionFilterKey.status,
    values: ['Live auction', 'Past auction', 'Upcoming'],
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
export function waitFun(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}
const defaultPageSize = 10
const AuctionContent = () => {
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
          return item.name.toLocaleLowerCase().indexOf(values.keyword.toLocaleLowerCase()) > -1
        })
      }
      if (values.categories) {
        searchResult = marketList.filter(item => {
          return item.categories?.includes(values.categories)
        })
      }
      if (values.status) {
        const nowTime = new Date().getTime()
        if (values.status === 'Upcoming') {
          searchResult = marketList.filter(item => {
            return Number(item.startTime) * 1000 >= nowTime
          })
          searchResult.map(item => {
            item.status = 'Upcoming'
          })
        } else if (values.status === 'Past auction') {
          searchResult = marketList.filter(item => {
            return item.endTime && Number(item.endTime) * 1000 <= nowTime
          })
          searchResult.map(item => {
            item.status = 'Past auction'
          })
        } else if (values.status === 'Live auction') {
          searchResult = marketList.filter(item => {
            if (item.startTime && item.endTime) {
              return Number(item.startTime) * 1000 <= nowTime && Number(item.endTime) * 1000 > nowTime
            } else {
              return false
            }
          })
          searchResult.map(item => {
            item.status = 'Live auction'
          })
        }
      }
      if (values.categories) {
        searchResult = marketList.filter(item => {
          return values.categories === item.categories
        })
      }
      const result = searchResult.slice((current - 1) * pageSize, current * pageSize)
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
    setTimeout(() => {
      document.getElementById('Marketplace')?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }, 0)
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
      {/* <UpcomingAuction></UpcomingAuction> */}
      {!isSm && (
        <Marketplace poolLength={poolList?.total || 0} handleSearch={handleSearch} filterConfig={filterConfig}>
          <>
            {loading ? (
              <SwiperSkeleton />
            ) : poolList?.total === 0 ? (
              <EmptyData isLight={true} />
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
                  poolList.list.map((item: BannerType, index: number) => {
                    return <Banner key={index} banner={item}></Banner>
                  })}
              </Box>
            )}
            {poolList?.total >= 10 && (
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
              <SwiperSkeleton />
            ) : poolList?.total === 0 ? (
              <EmptyData isLight={true} />
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
                  poolList.list.map((item: BannerType, index: number) => {
                    return <AuctionCard key={index} banner={item}></AuctionCard>
                  })}
              </Box>
            )}
            {poolList?.total >= 1 && (
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
export default AuctionContent
