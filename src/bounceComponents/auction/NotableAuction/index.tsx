import { Box, Container, MenuItem, Select, Skeleton } from '@mui/material'
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
import AuctionCardFull from 'bounceComponents/common/AuctionCard/AuctionCardFull'

export const TokenSkeleton = () => {
  const [slidesPerView] = useResizeView()
  const isSm = useBreakpoint('sm')
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 12,
        flexDirection: 'row',
        overflowX: 'scroll',
        paddingLeft: isSm ? 16 : 0,
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      {Array.from(new Array(slidesPerView)).map((lodingItem, index) => (
        <Box display={'flex'} flexDirection={'column'} key={index} sx={{ flex: 1, minWidth: 293, minHeight: 415 }}>
          <Box
            height={400}
            sx={{
              bgcolor: 'var(--ps-white)',
              borderRadius: 20,
              padding: '16px',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box display="flex" width={'100%'} gap={20} sx={{ '& > span': { borderRadius: '12px' } }}>
              <Skeleton variant="rectangular" width={'15%'} height={24} />
              <Skeleton variant="rectangular" width={'25%'} height={24} />
              <Skeleton variant="rectangular" width={'60%'} height={24} />
            </Box>
            <Skeleton
              component={'div'}
              variant="rectangular"
              width={'50%'}
              height={24}
              sx={{ marginTop: '20px', borderRadius: '12px' }}
            />
            <Skeleton
              component={'div'}
              variant="rectangular"
              width={'100%'}
              height={24}
              sx={{ marginTop: '10px', borderRadius: '12px' }}
            />
            <Box mt={20} display={'flex'}>
              <Skeleton variant="circular" width={52} height={52} />
              <Box width={'calc(100% - 52px)'} sx={{ marginLeft: '10px' }}>
                <Skeleton variant="text" width={'20%'} />
                <Skeleton variant="text" width={'40%'} />
              </Box>
            </Box>
            <Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
            <Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
            <Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
            <Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
            <Skeleton variant="text" width={'100%'} sx={{ marginTop: '20px' }} height={20} />
          </Box>
        </Box>
      ))}
    </Box>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NotableAuction = ({ handleViewAll }: { handleViewAll?: () => void }) => {
  // const { handleViewAll } = props
  const optionDatas = useOptionDatas()
  const isSm = useBreakpoint('sm')
  const [auction, setAuction] = useState(0)
  const [chainFilter, setChainFilter] = useState<number>(0)
  const [slidesPerView] = useResizeView()
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
    <Box id={'NotableAuction'} sx={{ background: 'white', padding: '80px 0 100px' }}>
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
          <H4>Notable Auctions</H4>
          <Row gap={8}>
            <AuctionTypeSelect curPoolType={auction} setCurPoolType={setAuction} tokenType={BackedTokenType.TOKEN} />
            <Select
              sx={{
                width: [160, '200px'],
                height: '38px'
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
              overflowX: 'scroll',
              paddingLeft: '16px',
              '&::-webkit-scrollbar': {
                display: 'none'
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
            grayArrow
            hideArrow={isSm}
            swiperStyle={{
              spaceBetween: 20,
              // autoplay: isSm,
              slidesPerView: slidesPerView,
              loop: false
            }}
          >
            {data?.list?.map((fixedSwaptem: any, index: number) => (
              <SwiperSlide key={index}>
                <AuctionCardFull
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
