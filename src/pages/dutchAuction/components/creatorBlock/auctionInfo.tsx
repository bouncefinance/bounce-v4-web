import { Box, Button, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
import PoolInfoItem from '../poolInfoItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { formatNumber } from 'utils/number'

import { shortenAddress } from 'utils'
import { addTokenToWallet } from 'utils/addTokenToWallet'
import { useActiveWeb3React } from 'hooks'
import CertifiedTokenImage from 'components/CertifiedTokenImage'
import useBreakpoint from 'hooks/useBreakpoint'
import { useState } from 'react'
const Title = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography sx={{ mb: 10, color: '#fff', fontFamily: `'Public Sans'`, fontSize: '14px', fontWeight: 600 }}>
    {children}
  </Typography>
)
export const RightText = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography sx={{ color: '#D7D6D9', fontFamily: `'Inter'`, fontSize: '13px', fontWeight: 400 }}>
    {children}
  </Typography>
)
const LeftBox = ({ poolInfo }: { poolInfo: any }): JSX.Element => {
  const { chainId } = useActiveWeb3React()
  const isMobile = useBreakpoint('lg')
  const [showMore, setShowMore] = useState<boolean>(false)
  const ticketPrice = poolInfo.maxAmount1PerWallet
    ? formatNumber(poolInfo.maxAmount1PerWallet, {
        unit: poolInfo.token0.decimals,
        decimalPlaces: poolInfo.token0.decimals
      })
    : undefined
  const amountTotal1 = poolInfo.amountTotal1
    ? formatNumber(poolInfo.amountTotal1, {
        unit: poolInfo.token1.decimals,
        decimalPlaces: poolInfo.token1.decimals
      })
    : undefined
  return (
    <>
      <Box sx={{ borderRadius: 20, bgcolor: '#20201E', px: 24, py: 24, flex: 1, height: 'fit-content' }} mb={12}>
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
                  width: 140,
                  height: 20
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
            <RightText>{poolInfo.maxAmount1PerWallet}</RightText>
          </PoolInfoItem>
          {showMore && (
            <>
              <PoolInfoItem title="Total available amount">
                <RightText>{`${amountTotal1}`}</RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Price decreasing rate">
                <RightText>2</RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Starting price (price ceiling)">
                <RightText>1 Auction = {`${ticketPrice} ${(poolInfo.token1.symbol + '').toUpperCase()}`}</RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Reserve price (price floor)">
                <RightText>1 Auction = {`${ticketPrice} ${(poolInfo.token1.symbol + '').toUpperCase()}`}</RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Pool duration">
                <RightText>01.01.2021 00:00 - 01.01.2021 00:00</RightText>
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
