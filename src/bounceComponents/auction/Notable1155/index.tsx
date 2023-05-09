import { H3, H4 } from '../../../components/Text'
import { Box, Container, Grid, MenuItem, Select, Skeleton } from '@mui/material'
import React, { useState } from 'react'
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

export const Notable1155: React.FC = () => {
  const optionDatas = useOptionDatas()
  const [auction, setAuction] = useState(0)
  const [chainFilter, setChainFilter] = useState<number>(0)
  const { data, loading } = useRequest(
    async () => {
      const resp = await getPools({
        offset: 0,
        limit: 10,
        category: auction,
        chainId: chainFilter,
        creatorAddress: '',
        creatorName: '',
        isERC721: false,
        orderBy: 'openTs',
        poolId: '',
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
  return (
    <Box sx={{ background: 'white', padding: '80px 0 100px' }}>
      <Container>
        <H3 justifyContent={'center'}>Notable Auctions</H3>
        <CenterRow mb={33} justifyContent={'space-between'} mt={40}>
          <H4>ERC1155</H4>
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
          <Grid container spacing={18}>
            {Array.from(new Array(4)).map((lodingItem, index) => (
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={index}>
                <Skeleton
                  key={index}
                  variant="rounded"
                  height={400}
                  sx={{ bgcolor: 'var(--ps-gray-30)', borderRadius: 20 }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <SlideProgress
            grayArrow
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
      </Container>
    </Box>
  )
}
