import { Box, Button, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
import PoolInfoItem from '../poolInfoItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'

import { shortenAddress } from 'utils'
import { addTokenToWallet } from 'utils/addTokenToWallet'
import { useActiveWeb3React } from 'hooks'
import CertifiedTokenImage from 'components/CertifiedTokenImage'
import useBreakpoint from 'hooks/useBreakpoint'
import { useState, useMemo } from 'react'
import { DutchAuctionPoolProp } from 'api/pool/type'
import moment from 'moment'
const Title = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography sx={{ mb: 10, color: '#fff', fontFamily: `'Inter'`, fontSize: '14px', fontWeight: 600 }}>
    {children}
  </Typography>
)
export const RightText = ({ children, style }: { children: ReactNode; style?: React.CSSProperties }): JSX.Element => (
  <Typography sx={{ color: '#D7D6D9', fontFamily: `'Inter'`, fontSize: '13px', fontWeight: 400, ...style }}>
    {children}
  </Typography>
)
const LeftBox = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }): JSX.Element => {
  const { chainId } = useActiveWeb3React()
  const isMobile = useBreakpoint('lg')
  const [showMore, setShowMore] = useState<boolean>(false)
  const maxAmount0PerWalletText = useMemo(() => {
    const currencyMaxAmount0PerWallet = poolInfo.currencyMaxAmount0PerWallet?.toSignificant()
    if (Number(currencyMaxAmount0PerWallet) > 0) {
      return currencyMaxAmount0PerWallet + ' ' + poolInfo?.token0?.symbol.toUpperCase()
    } else {
      return 'No Limit'
    }
  }, [poolInfo.currencyMaxAmount0PerWallet, poolInfo.token0.symbol])
  return (
    <>
      <Box
        sx={{ borderRadius: 20, bgcolor: '#20201E', px: 24, py: 24, flex: 1, height: 'fit-content' }}
        mb={12}
        mt={30}
      >
        <Stack spacing={36} display={isMobile ? 'block' : 'flex'}>
          <Stack spacing={10}>
            <Title>Token Information</Title>
            <PoolInfoItem title="Contract address" tip="Token Contract Address.">
              <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                <CertifiedTokenImage
                  address={poolInfo.token0.address}
                  coingeckoId={poolInfo.token0.coingeckoId}
                  ethChainId={poolInfo.ethChainId}
                  backedChainId={poolInfo.chainId}
                />
                <RightText>{shortenAddress(poolInfo.token0.address)}</RightText>
                <CopyToClipboard text={poolInfo.token0.address} />
              </Stack>
            </PoolInfoItem>
            <PoolInfoItem title="Token symbol">
              <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                <TokenImage src={poolInfo.token0.largeUrl} alt={poolInfo.token0.symbol} size={20} />
                <RightText>{poolInfo.token0.symbol}</RightText>
              </Stack>
            </PoolInfoItem>
            {chainId === poolInfo.ethChainId && (
              <Button
                variant="outlined"
                onClick={() =>
                  addTokenToWallet(poolInfo.token0.address, poolInfo.token0.symbol, poolInfo.token0.decimals)
                }
                sx={{
                  width: isMobile ? '100%' : 140,
                  height: isMobile ? 30 : 20
                }}
              >
                Add To Wallet
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ borderRadius: 20, bgcolor: '#20201E', px: 24, py: 24, flex: 1, height: 'fit-content' }}>
        <Stack spacing={10}>
          <Title>Auction Information</Title>
          <PoolInfoItem title="Auction type">
            <RightText>Dutch Auction</RightText>
          </PoolInfoItem>
          <PoolInfoItem title="Participant">
            <RightText>{poolInfo.enableWhiteList ? 'Whitelist' : 'Public'}</RightText>
          </PoolInfoItem>
          <PoolInfoItem title="Allocation per wallet">
            {/* TODO need to add new param to fit maxAmount1PerWallet for dutchAuction  */}
            <RightText>{maxAmount0PerWalletText}</RightText>
          </PoolInfoItem>
          {showMore && (
            <>
              <PoolInfoItem title="Total available amount">
                <RightText>{`${poolInfo.currencyAmountTotal0?.toSignificant()}`}</RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Price decreasing rate">
                <RightText>
                  {poolInfo.currencyLowestBidPrice?.toSignificant() + ' '}
                  {`${poolInfo.token1.symbol.toUpperCase()}`}
                </RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Starting price (price ceiling)">
                <RightText>
                  1 {`${poolInfo.token0.symbol.toUpperCase()}`} ={' '}
                  {`${poolInfo.highestPrice?.toSignificant(18)} ${(poolInfo.token1.symbol + '').toUpperCase()}`}
                </RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Reserve price (price floor)">
                <RightText>
                  1 {`${poolInfo.token0.symbol.toUpperCase()}`} ={' '}
                  {`${poolInfo.lowestPrice?.toSignificant(18)} ${(poolInfo.token1.symbol + '').toUpperCase()}`}
                </RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Pool duration">
                <RightText>
                  {poolInfo.openAt ? moment(poolInfo.openAt * 1000).format('YYYY-MM-DD HH:mm') : '--'} -{' '}
                  {poolInfo.closeAt ? moment(poolInfo.closeAt * 1000).format('YYYY-MM-DD HH:mm') : '--'}
                </RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Pool times">
                <RightText>{poolInfo.times}</RightText>
              </PoolInfoItem>
            </>
          )}
          <Typography
            sx={{
              color: '#2B51DA',
              cursor: 'pointer'
            }}
            onClick={() => {
              const result = !showMore
              setShowMore(result)
            }}
          >
            {showMore ? '- Less' : '+ More'}
          </Typography>
        </Stack>
      </Box>
    </>
  )
}

export default LeftBox
