import { Box, Container, MenuItem, Select, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { H4 } from '../../../components/Text'
import { SlideProgress } from '../SlideProgress'
import { SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import { getPools } from '../../../api/market'
import { routes } from '../../../constants/routes'
import { getLabelById, shortenAddress } from '../../../utils'
import AuctionCard, { AuctionHolder, AuctionListItem } from '../../common/AuctionCard'
import { useOptionDatas } from '../../../state/configOptions/hooks'
import { Stack } from '@mui/system'
import TokenImage from '../../common/TokenImage'
import CopyToClipboard from '../../common/CopyToClipboard'
import { PoolType } from '../../../api/pool/type'
import { BigNumber } from 'bignumber.js'
import { CenterRow, Row } from '../../../components/Layout'
import AuctionTypeSelect from '../../common/AuctionTypeSelect'
import { BackedTokenType } from '../../../pages/account/MyTokenOrNFT'
import EmptyData from 'bounceComponents/common/EmptyData'
import CertifiedTokenImage from 'components/CertifiedTokenImage'
import getAuctionPoolLink from 'utils/auction/getAuctionPoolRouteLink'
import { poolTypeText } from 'pages/market/pools'
import useBreakpoint from '../../../hooks/useBreakpoint'
import useResizeView from 'utils/useResizeView'
import { TokenSkeleton } from '../NotableAuction/index'
interface Notable1155Props {
  handleViewAll?: () => void
}

const AuctionItem = ({ fixedSwaptem, optionDatas }: { fixedSwaptem: any; optionDatas: any }) => {
  return (
    fixedSwaptem && (
      <Link to={getAuctionPoolLink(fixedSwaptem.id, fixedSwaptem.category, fixedSwaptem.chainId, fixedSwaptem.poolId)}>
        <AuctionCard
          style={{ minWidth: '280px', gap: 20, boxSizing: 'border-box' }}
          poolId={fixedSwaptem.poolId}
          title={fixedSwaptem.name}
          status={fixedSwaptem.status}
          claimAt={fixedSwaptem.claimAt}
          closeAt={fixedSwaptem.closeAt}
          dateStr={fixedSwaptem.status == 1 ? fixedSwaptem.openAt : fixedSwaptem.closeAt}
          holder={
            <AuctionHolder
              href={`${routes.profile.summary}?id=${fixedSwaptem.creatorUserInfo?.userId}`}
              avatar={fixedSwaptem.creatorUserInfo?.avatar}
              name={fixedSwaptem.creatorUserInfo?.name}
              description={
                fixedSwaptem.creatorUserInfo?.publicRole?.length > 0
                  ? fixedSwaptem.creatorUserInfo?.publicRole?.map((item: any, index: number) => {
                      return (
                        getLabelById(item, 'role', optionDatas?.publicRoleOpt) +
                        `${index !== fixedSwaptem.creatorUserInfo?.publicRole?.length - 1 ? ', ' : ''}`
                      )
                    })
                  : 'Individual account'
              }
              isVerify={fixedSwaptem.creatorUserInfo?.isVerify}
            />
          }
          progress={{
            symbol: fixedSwaptem.token0.symbol?.toUpperCase(),
            decimals: fixedSwaptem.token0.decimals,
            sold: fixedSwaptem.swappedAmount0,
            supply: fixedSwaptem.amountTotal0
          }}
          listItems={
            <>
              <AuctionListItem
                label="Token symbol"
                value={
                  <Stack direction="row" alignItems="center" spacing={4}>
                    <TokenImage src={fixedSwaptem.token0.largeUrl} alt={fixedSwaptem.token0.symbol} size={20} />
                    <span>{fixedSwaptem.token0.symbol.toUpperCase()}</span>
                  </Stack>
                }
              />
              <AuctionListItem
                label="Contract address"
                value={
                  <Stack direction="row" alignItems="center" spacing={4}>
                    <CertifiedTokenImage
                      address={fixedSwaptem.token0.address}
                      coingeckoId={fixedSwaptem.token0.coingeckoId}
                      ethChainId={fixedSwaptem.ethChainId}
                      backedChainId={fixedSwaptem.chainId}
                    />
                    <span>{shortenAddress(fixedSwaptem.token0.address)}</span>
                    <CopyToClipboard text={fixedSwaptem.token0.address} />
                  </Stack>
                }
              />
              <AuctionListItem
                label="Fixed price ratio"
                value={
                  <Stack direction="row" spacing={8}>
                    <Typography fontSize={12}>1</Typography>
                    <Typography fontSize={12}>
                      {fixedSwaptem.token0.symbol.toUpperCase()} ={' '}
                      {new BigNumber(fixedSwaptem.ratio).decimalPlaces(6, BigNumber.ROUND_DOWN).toFormat()}
                    </Typography>
                    <Typography fontSize={12}>{fixedSwaptem.token1.symbol.toUpperCase()}</Typography>
                  </Stack>
                }
              />
              <AuctionListItem
                label="Price,$"
                value={
                  <span>{new BigNumber(fixedSwaptem.poolPrice).decimalPlaces(6, BigNumber.ROUND_DOWN).toFormat()}</span>
                }
              />
            </>
          }
          categoryName={poolTypeText[fixedSwaptem.category as PoolType]}
          whiteList={fixedSwaptem.enableWhiteList ? 'Whitelist' : 'Public'}
          chainId={fixedSwaptem.chainId}
        />
      </Link>
    )
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const UpcomingAuction = (props: Notable1155Props) => {
  // const { handleViewAll } = props
  const optionDatas = useOptionDatas()
  const [auction, setAuction] = useState(0)
  const [chainFilter, setChainFilter] = useState<number>(0)
  const [slidesPerView] = useResizeView()
  const isSm = useBreakpoint('sm')

  const { data, loading } = useRequest(
    async () => {
      const resp = await getPools({
        offset: 0,
        limit: 10,
        category: auction,
        tokenType: 1, // erc20:1, nft:2
        chainId: chainFilter,
        creatorAddress: '',
        creatorName: '',
        orderBy: '',
        poolId: '',
        poolName: '',
        poolStatusFrontend: 'upcoming',
        token0Address: ''
      })
      return {
        list: resp.data.fixedSwapList.list,
        total: resp.data.fixedSwapList.total
      }
    },
    {
      refreshDeps: [auction, chainFilter]
    }
  )
  return (
    <Box sx={{ padding: '80px 0 100px' }}>
      <Container>
        <CenterRow
          mb={33}
          justifyContent={'space-between'}
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            padding: ['0 16px', 'inherit'],
            gap: [20, 'inherit']
          }}
        >
          <H4>Upcoming Auctions</H4>
          <Row gap={8}>
            <AuctionTypeSelect
              noBorder={true}
              curPoolType={auction}
              setCurPoolType={setAuction}
              tokenType={BackedTokenType.TOKEN}
            />
            <Select
              sx={{
                width: [160, '200px'],
                height: '38px',
                fieldset: {
                  border: 0
                }
              }}
              value={chainFilter}
              onChange={e => setChainFilter(Number(e.target.value))}
            >
              <MenuItem key={0} value={0}>
                All Chains
              </MenuItem>
              {optionDatas?.chainInfoOpt?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.chainName}
                </MenuItem>
              ))}
            </Select>
          </Row>
        </CenterRow>
        {loading ? (
          <TokenSkeleton />
        ) : data?.list?.length === 0 ? (
          <Box>
            <EmptyData />
          </Box>
        ) : isSm ? (
          <Box
            sx={{
              display: 'flex',
              gap: 12,
              flexDirection: 'row',
              overflowX: 'auto',
              paddingLeft: '16px',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              '&>a>div>ul>li': {
                whiteSpace: 'nowrap'
              }
            }}
          >
            {data?.list?.map((fixedSwaptem: any, index: number) => (
              <AuctionItem fixedSwaptem={fixedSwaptem} optionDatas={optionDatas} key={index} />
            ))}
          </Box>
        ) : (
          <SlideProgress
            hideArrow={isSm}
            swiperStyle={{
              spaceBetween: 20,
              slidesPerView: slidesPerView,
              loop: false
            }}
          >
            {data?.list?.map((fixedSwaptem: any, index: number) => (
              <SwiperSlide key={index}>
                <AuctionItem fixedSwaptem={fixedSwaptem} optionDatas={optionDatas} />
              </SwiperSlide>
            ))}
          </SlideProgress>
        )}

        <Box
          sx={{
            marginTop: '40px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center'
          }}
        >
          {/* <Button
            onClick={() => {
              handleViewAll && handleViewAll()
            }}
            variant="contained"
            // href={AuctionList[currentIndex].checkAllLink}
            sx={{
              // background: 'var(--ps-yellow-1)',
              padding: '16px 20px'
            }}
          >
            View all auctions
          </Button> */}
        </Box>
      </Container>
    </Box>
  )
}
