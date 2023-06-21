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
    name: 'Whisky & Whiskey | Rare Finds from Scotland & Kentucky',
    time: '31 MAY-16 JUNE 2023 10:00 AM EDT',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/25b9495/2147483647/strip/true/crop/4639x2696+0+1358/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2F46%2F82%2F7bdb0bb7469e83fbaf17da8a375d%2F1845-bbo-09d-sothebys-sothebys-23-04-90510-cal.jpg',
    link: 'https://www.sothebys.com/en/buy/auction/2023/whisky-whiskey-rare-finds-from-scotland-kentucky?locale=en&lotFilter=AllLots',
    startTime: 1685541600,
    endTime: 1686924000,
    categories: 'Wines'
  },
  {
    name: 'Liquid jade:Moutai',
    time: '2-20 JUNE 2023 11:00 AM',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/6887d7d/2147483647/strip/true/crop/3000x1743+0+846/resize/487x283!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F46%2Fd8%2F392297844d548e7c65ad7c9ab24c%2Fcn0031-93-22a-calendar.jpg',
    link: 'https://www.sothebys.com/en/articles/liquid-jade-moutai-%E9%87%91%E6%A8%BD%E7%94%98%E9%9C%B2-%E8%B4%B5%E5%B7%9E%E8%8C%85%E5%8F%B0%E7%BD%91%E4%B8%8A%E4%B8%93%E5%9C%BA?locale=en',
    startTime: 1685718000,
    endTime: 1687273200,
    categories: 'Wines'
  },
  {
    name: 'A Life in Art: The Mallin Collection',
    time: '14 - 21 Jun 2023 10:00 AM EDT',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/0d8b911/2147483647/strip/true/crop/1995x1159+0+446/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2Fdf%2F46%2F0882155641d48de7fbcb80629587%2Fn11283-cc9hm-t2-02-a.jpg',
    link: 'https://www.sothebys.com/en/auction-catalogue/2023/a-life-in-art-the-mallin-collection-n11283?locale=en&s=intro',
    startTime: 1686751200,
    endTime: 1687356000,
    categories: 'Collectibles'
  },
  {
    name: "Collection Hélène Leloup, Le Journal d'une Pionnière, Vol. I",
    time: '21 JUNE 2023 5:00 PM CEST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/758b3e4/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2F94%2F2f%2F23041e854158a9254eb81f65aa8e%2Fpf2358-c69km-t1-11-calendar-6x7.jpg',
    link: 'https://www.sothebys.com/en/buy/auction/2023/collection-helene-leloup-journal-dune-pionniere?locale=en',
    startTime: 1687359600,
    endTime: 0,
    categories: 'Collectibles'
  },
  {
    name: 'Streets of Paris',
    time: '14-21 JUNE 2023 2:00 PM EDT',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/18bac71/2147483647/strip/true/crop/2844x1653+0+1168/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2F50%2F49%2Fc8cc1fbf4e3cad7d10ed014facb1%2Fn11301-ckv8k-t2-02.jpg',
    link: 'https://www.sothebys.com/en/auction-catalogue/2023/streets-of-paris?locale=en&s=intro',
    startTime: 1686765600,
    endTime: 1687370400,
    categories: 'Art'
  },
  {
    name: 'Une Collection à 360°',
    time: '22 JUNE 2023 2:00 PM CEST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/22dc02e/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2Fb3%2F6f%2Faf86362a4414876af11e89504368%2Fpf2356-600x700-calendar.jpg',
    link: 'https://www.sothebys.com/en/buy/auction/2023/une-collection-a-360?locale=en',
    startTime: 1687435200,
    endTime: 0,
    categories: 'Collectibles'
  },
  {
    name: 'Vanessa von Zitzewitz, Michael, Intimacy Behind Speed',
    time: '25 MAY-23 JUNE 2023',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/9de07c6/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Fc9%2F28%2F7dc6c3bd4761b6909596d4086b6c%2Fmonaco-calendar.jpg',
    link: 'https://www.sothebys.com/en/digital-catalogues/vanessa-von-zitzewitz-michael-intimacy-behind-speed?locale=en',
    startTime: 1685005200,
    endTime: 1687543200,
    categories: 'Art'
  },
  {
    name: 'Luxury Private Selling Exhibition',
    time: '25 JANUART -24 JUNE 2023',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/9f28b5f/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Fdf%2F97%2F0ea20a9147c1a3aa40fdd042a409%2Fdubai-selling-exhb-calendar.jpg',
    link: 'https://www.sothebys.com/en/digital-catalogues/luxury-private-selling-exhibition?locale=en',
    startTime: 1674453600,
    endTime: 1687602600,
    categories: 'Jewellery'
  },
  {
    name: 'Design 17/20: Silver and Gold Boxes',
    time: '21-27 JUNE 2023 2:00 PM CEST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/cee044b/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2Fb7%2Ff4%2F7bc561b04b3e9beb5fc3104fc1f1%2Fpf2303-calendar.jpg',
    link: 'https://www.sothebys.com/en/buy/auction/2023/design-17-20-silver-and-gold-boxes-2?locale=en',
    startTime: 1687348800,
    endTime: 0,
    categories: 'Jewellery'
  },
  {
    name: 'Fine Jewels & Watches: Cologne',
    time: '16-27 JUNE 2023 2:00 PM CEST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/30a0400/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F46%2F2e%2Fcdec3ce34e088cfd29fbe4ee8e61%2Fde2230-calendar.jpg',
    link: 'https://www.sothebys.com/en/buy/auction/2023/fine-jewels-watches-cologne?locale=en',
    startTime: 1686916800,
    endTime: 0,
    categories: 'Jewellery'
  },
  {
    name: 'The Now Evening Auction',
    time: '27 JUNE 2023 4:00 PM BST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/c190c04/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2F83%2Ffb%2F4e7e67f844cebce286e94297858a%2Fl23237-600x700-calendar-new.jpg',
    link: 'https://www.sothebys.com/en/auction-catalogue/2023/the-now-evening-auction-l23237?s=intro&locale=en',
    startTime: 1687881600,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'Modern and Contemporary Evening Auction, featuring Face to Face: A Celebration of Portraiture',
    time: '27 JUNE 2023 5:00 PM BST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/5d59af6/2147483647/strip/true/crop/600x349+0+0/resize/487x283!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F70%2F2e%2Fb77feb4140cd83082c16651ff4ac%2Fl23006-mod-ctp-eve-webbanners-v4-600x700.jpg',
    link: 'https://www.sothebys.com/en/auction-catalogue/2023/modern-and-contemporary-evening-auction-featuring-face-to-face-a-celebration-of-portraiture?s=intro&locale=en',
    startTime: 1687885200,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'Modern & Contemporary Day Auction',
    time: '28 JUNE 2023 10:30 AM BST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/cba2bbf/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2F06%2Fec%2Fae92817940018d9abb03e9cc930c%2F231312016-l23007modctpday-webbanners-600x700.jpg',
    link: 'https://www.sothebys.com/en/auction-catalogue/2023/modern-contemporary-day-auction-l23007?s=intro&locale=en',
    startTime: 1687948200,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'Classic Design: Furniture, Silver and Works of Art',
    time: '28 JUNE 2023 2:30 PM CEST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/dad070c/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2F65%2Fae%2Fbcb6a95945dda28416aa17768b74%2Fpf2311-calendar.jpg',
    link: 'https://www.sothebys.com/en/buy/auction/2023/classic-design?locale=en',
    startTime: 1687955400,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'Modern British Art',
    time: '28 JUNE 2023 2:30 PM BST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/610ed5f/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2F15%2Fad%2F4a87269344df87e40ee61bcf53cd%2Fl23140-600x700-calendar.jpg',
    link: 'https://www.sothebys.com/en/auction-catalogue/2023/modern-british-art-l23140?s=intro&locale=en',
    startTime: 1687962600,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'The Dream Team | Part I',
    time: '11 MAY-28 JUNE 2023 7:00 PM EDT',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/8196b51/2147483647/strip/true/crop/5081x2953+0+1524/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2F1f%2Fcf%2F866700c24e4f8df6270f01f80be8%2Fmrkt-cjdp6-t3-05.jpg',
    link: 'https://www.sothebys.com/en/digital-catalogues/the-dream-team-part-i?locale=en',
    startTime: 1683777600,
    endTime: 1687993200,
    categories: 'Fashion'
  },
  {
    name: 'Sports Memorabilia | Part II',
    time: '20-28 JUNE 2023 7:15 PM EDT',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/ca034f0/2147483647/strip/true/crop/3543x2059+0+742/resize/487x283!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2Fbb%2F56%2F2bc77eac4f81a198a27a83968ac9%2Fn11338-cpwjl-t1-01.jpg',
    link: 'https://www.sothebys.com/en/buy/auction/2023/sports-memorabilia-part-ii?locale=en&lotFilter=AllLots',
    startTime: 1687269600,
    endTime: 0,
    categories: 'Fashion'
  },
  {
    name: 'Design 17/20: Furniture and Works of Art',
    time: '23-29 JUNE 2023 2:00 PM CEST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/7f162f1/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Fde%2F8e%2Fb309bf4643c78990638ae3887dad%2Fpf2301-calendar.jpg',
    link: 'https://www.sothebys.com/en/buy/auction/2023/design-17-20-furniture-and-works-of-art?locale=en',
    startTime: 1687525200,
    endTime: 0,
    categories: 'Art'
  },
  {
    name: 'Prints & Multiples',
    time: '22-29 JUNE 2023 3:00 PM CEST',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/5313ef9/2147483647/strip/true/crop/600x349+0+176/resize/487x283!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F49%2F45%2F20adf45e46f5ad3a15ae9497eb01%2Fde2320-calendar.jpg',
    link: 'https://www.sothebys.com/en/auction-catalogue/2023/prints-multiples-de2320?s=intro&locale=en',
    startTime: 1687438800,
    endTime: 1688043600,
    categories: 'Art'
  },
  {
    name: 'The Immaculate Leroy Cellar | Flawless Provenance',
    time: '20-23 JUNE 2023 2:00 PM HKT',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/dbeed8b/2147483647/strip/true/crop/3000x1743+0+846/resize/487x283!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F09%2F58%2F1e5ab0484831a1b6cc83e7f2bfdd%2Fhk1309-s6-calendar.jpg',
    link: 'https://www.sothebys.com/en/buy/auction/2023/the-immaculate-leroy-cellar-flawless-provenance?locale=en&lotFilter=AllLots',
    startTime: 1687230000,
    endTime: 0,
    categories: 'Wines'
  },
  {
    name: 'Modern & Contemporary Art',
    time: '2 JULY 2023 3 PM',
    img: 'https://sothebys-com.brightspotcdn.com/dims4/default/3a00ffc/2147483647/strip/true/crop/3000x1743+0+846/resize/487x283!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Fa9%2F19%2Fd26a81ec458fb256640716cba4f4%2Fsg7028-cpbgf-02-calendar.jpg',
    link: 'https://www.sothebys.com/en/buy/auction/2023/modern-contemporary-art?locale=en&lotFilter=AllLots',
    startTime: 1688281200,
    endTime: 0,
    categories: 'Art'
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
          The physical auction supports the English auction mode. You are bidding for physically backed NFTs, and you
          can redeem them post-auction.
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
                      background: 'transparent',
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
