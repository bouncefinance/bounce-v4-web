import { Box, Container, MenuItem, Select } from '@mui/material'
import { H4 } from '../../../components/Text'
import { SlideProgress } from '../SlideProgress'
import { SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import { getPools } from '../../../api/market'
import { useOptionDatas } from '../../../state/configOptions/hooks'
import { CenterRow, Row } from '../../../components/Layout'
import AuctionTypeSelect from '../../common/AuctionTypeSelect'
import { BackedTokenType } from '../../../pages/account/MyTokenOrNFT'
import EmptyData from 'bounceComponents/common/EmptyData'
import useBreakpoint from '../../../hooks/useBreakpoint'
import useResizeView from 'utils/useResizeView'
import { TokenSkeleton } from '../NotableAuction/index'
import AuctionCardFull from 'bounceComponents/common/AuctionCard/AuctionCardFull'
interface Notable1155Props {
  handleViewAll?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const UpcomingAuction = (props: Notable1155Props) => {
  //   const { handleViewAll } = props
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
              <AuctionCardFull
                key={index}
                style={{ minWidth: '280px', gap: 20, boxSizing: 'border-box' }}
                auctionPoolItem={fixedSwaptem}
              />
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
                <AuctionCardFull
                  key={index}
                  style={{ minWidth: '280px', gap: 20, boxSizing: 'border-box' }}
                  auctionPoolItem={fixedSwaptem}
                />
              </SwiperSlide>
            ))}
          </SlideProgress>
        )}
        {/* <Box
          sx={{
            marginTop: '40px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center'
          }}
        >
          <Button
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
          </Button>
        </Box> */}
      </Container>
    </Box>
  )
}
