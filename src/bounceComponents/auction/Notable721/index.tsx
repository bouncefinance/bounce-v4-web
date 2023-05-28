import { H4 } from '../../../components/Text'
import { Box, Button, Container, Grid, MenuItem, Select, Skeleton } from '@mui/material'
import { useState } from 'react'
import { SlideProgress } from '../SlideProgress'
import { routes } from '../../../constants/routes'
import { getLabelById } from '../../../utils'
import { NFTCard } from '../../../pages/market/nftAuctionPool'
import { useOptionDatas } from '../../../state/configOptions/hooks'
import { useRequest } from 'ahooks'
import { getPools } from '../../../api/market'
import { FixedSwapPool } from '../../../api/pool/type'
import { SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import { CenterRow, Row } from '../../../components/Layout'
import AuctionTypeSelect from '../../common/AuctionTypeSelect'
import { BackedTokenType } from '../../../pages/account/MyTokenOrNFT'
import EmptyData from 'bounceComponents/common/EmptyData'

interface Notable721Props {
  handleViewAll?: () => void
}

export const Notable721 = (props: Notable721Props) => {
  const { handleViewAll } = props
  const optionDatas = useOptionDatas()
  const [auction, setAuction] = useState(0)
  const [chainFilter, setChainFilter] = useState<number>(0)
  const { data, loading } = useRequest(
    async () => {
      const resp = await getPools({
        offset: 0,
        limit: 4,
        category: auction,
        chainId: chainFilter,
        creatorAddress: '',
        creatorName: '',
        orderBy: 'openTs',
        poolId: '',
        isERC721: true,
        poolName: '',
        tokenType: 2, // erc20:1, nft:2
        token0Address: ''
      })
      return {
        list: resp.data.fixedSwapNftList.list,
        total: resp.data.fixedSwapNftList.total
      }
    },
    {
      refreshDeps: [auction, chainFilter]
    }
  )
  const SkeletonCard = () => {
    return (
      <Box display={'flex'} flexWrap={'nowrap'} gap={60}>
        {Array.from(new Array(4)).map((lodingItem, index) => (
          <Box
            key={index}
            width="309px"
            sx={{
              padding: '12px',
              background: '#fff',
              boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.08)',
              borderRadius: '24px'
            }}
          >
            <Box width="309px" height={236} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
              <Box display="flex" gap={40}>
                <Skeleton component={'div'} variant="circular" width={32} height={32} />
                <Box width={'100%'}>
                  <Skeleton variant="text" width={'20%'} sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" width={'40%'} sx={{ fontSize: '1rem' }} />
                </Box>
              </Box>
              <Box>
                <Box display="flex" gap={10} sx={{ '& > div': { borderRadius: '15px' } }}>
                  <Skeleton component={'div'} variant="rectangular" width={'80%'} height={30} />
                  {/* <Skeleton component={'div'} variant="rectangular" width={'30%'} height={30} /> */}
                </Box>
                <Box display="flex" gap={10} mt={10} sx={{ '& > div': { borderRadius: '15px' } }}>
                  <Skeleton component={'div'} variant="rectangular" width={'20%'} height={30} />
                  <Skeleton component={'div'} variant="rectangular" width={'20%'} height={30} />
                  <Skeleton component={'div'} variant="rectangular" width={'20%'} height={30} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ margin: '16px 12px 22px' }}>
              <Skeleton width={'90%'} />
              <Box display="flex" justifyContent={'space-between'} sx={{ marginTop: '10px' }}>
                <Skeleton width={'40%'} height={30} />
                <Skeleton
                  component={'div'}
                  variant="rectangular"
                  width={'30%'}
                  height={30}
                  sx={{ borderRadius: '15px' }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    )
  }
  return (
    <Box sx={{ padding: '80px 0 100px' }}>
      <Container>
        <CenterRow mb={33} justifyContent={'space-between'}>
          <H4>ERC721</H4>
          <Row gap={8}>
            <AuctionTypeSelect curPoolType={auction} setCurPoolType={setAuction} tokenType={BackedTokenType.NFT} />
            <Select
              sx={{
                width: '200px',
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
          <SkeletonCard />
        ) : data?.list?.length === 0 ? (
          <Box>
            <EmptyData />
          </Box>
        ) : (
          <SlideProgress
            swiperStyle={{
              spaceBetween: 20,
              slidesPerView: 4,
              loop: false
            }}
          >
            {data
              ? data.list.map((item: FixedSwapPool, idx: number) => (
                  <SwiperSlide key={idx}>
                    <Box style={{ width: '309px' }}>
                      <Link
                        to={routes.auction.fixedSwapNft
                          .replace(
                            ':chainShortName',
                            getLabelById(item.chainId, 'shortName', optionDatas?.chainInfoOpt || [])
                          )
                          .replace(':poolId', item.poolId)}
                      >
                        <NFTCard nft={item} hiddenStatus={true} />
                      </Link>
                    </Box>
                  </SwiperSlide>
                ))
              : []}
          </SlideProgress>
        )}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '40px 0 0'
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
        </Box>
      </Container>
    </Box>
  )
}
