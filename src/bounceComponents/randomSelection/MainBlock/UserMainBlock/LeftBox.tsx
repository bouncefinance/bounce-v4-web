import { Box, Button, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
// import { BigNumber } from 'bignumber.js'
import TokenImage from 'bounceComponents/common/TokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
// import { formatNumber } from 'utils/number'

// import PoolProgress from 'bounceComponents/common/PoolProgress'
import { AuctionProgressPrimaryColor } from 'constants/auction/color'
import { shortenAddress } from 'utils'
import { FixedSwapPoolProp } from 'api/pool/type'
import { addTokenToWallet } from 'utils/addTokenToWallet'
import { useActiveWeb3React } from 'hooks'
import CertifiedTokenImage from 'components/CertifiedTokenImage'
import useBreakpoint from '../../../../hooks/useBreakpoint'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import BigNumber from 'bignumber.js'
import { formatNumber } from 'utils/number'

const Title = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography variant="h6" sx={{ mb: 10 }}>
    {children}
  </Typography>
)

const boxSx = { borderRadius: 20, bgcolor: '#F5F5F5', px: 16, py: 36, flex: 1, height: 'fit-content' }

const LeftBox = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }): JSX.Element => {
  const { chainId } = useActiveWeb3React()
  const isMobile = useBreakpoint('md')
  // const swapedPercent =
  //   poolInfo?.curPlayer && poolInfo?.maxPlayere
  //     ? new BigNumber(poolInfo.curPlayer).div(poolInfo.maxPlayere).times(100).toNumber()
  //     : undefined

  const ticketPrice = poolInfo.maxAmount1PerWallet
    ? formatNumber(poolInfo.maxAmount1PerWallet, {
        unit: poolInfo.token1.decimals
      })
    : undefined
  const singleShare = poolInfo.totalShare
    ? formatNumber(new BigNumber(poolInfo.amountTotal0).div(poolInfo.totalShare).toString(), {
        unit: poolInfo.token0.decimals,
        decimalPlaces: poolInfo.token0.decimals
      })
    : undefined
  return (
    <Box>
      <Stack spacing={24}>
        <Box sx={boxSx}>
          <Title>Token Information</Title>
          <PoolInfoItem
            sx={{
              marginBottom: '6px'
            }}
            title="Contract address"
            tip="Token Contract Address."
          >
            <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              <CertifiedTokenImage
                address={poolInfo.token0.address}
                coingeckoId={poolInfo.token0.coingeckoId}
                ethChainId={poolInfo.ethChainId}
                backedChainId={poolInfo.chainId}
              />

              <Typography>{shortenAddress(poolInfo.token0.address)}</Typography>

              <CopyToClipboard text={poolInfo.token0.address} />
            </Stack>
          </PoolInfoItem>

          <PoolInfoItem
            sx={{
              marginBottom: '6px'
            }}
            title="Token symbol"
          >
            <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              <TokenImage src={poolInfo.token0.largeUrl} alt={poolInfo.token0.symbol} size={20} />
              <Typography>{poolInfo.token0.symbol}</Typography>
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
        </Box>
        <Box sx={boxSx}>
          <Title>Auction Information</Title>
          <Stack spacing={6}>
            <PoolInfoItem
              // sx={{
              //   marginBottom: '12px'
              // }}
              title="Auction type"
            >
              Random Selection
            </PoolInfoItem>
            <PoolInfoItem
              // sx={{
              //   marginBottom: '12px'
              // }}
              title="Participant"
            >
              {poolInfo.enableWhiteList ? 'Whitelist' : 'Public'}
            </PoolInfoItem>
            <PoolInfoItem title="Number of winners">{poolInfo.totalShare}</PoolInfoItem>
            <PoolInfoItem title="Token per ticket">{`${singleShare} ${poolInfo.token0.symbol}`}</PoolInfoItem>
            <PoolInfoItem title="Total amount of token">
              {`${
                poolInfo.amountTotal0
                  ? formatNumber(new BigNumber(poolInfo.amountTotal0).toString(), {
                      unit: poolInfo.token0.decimals,
                      decimalPlaces: poolInfo.token0.decimals
                    })
                  : undefined
              } ${poolInfo.token0.symbol}`}
            </PoolInfoItem>
            <PoolInfoItem title="Ticket Price">{`${ticketPrice} ${poolInfo.token1.symbol}`}</PoolInfoItem>
            <Box>
              <PoolInfoItem title="Progress">
                <Box>
                  <Typography component="span" sx={{ color: AuctionProgressPrimaryColor[poolInfo.status] }}>
                    {poolInfo.curPlayer}
                  </Typography>
                  <Typography component="span">&nbsp;/ {poolInfo.maxPlayere}</Typography>
                </Box>
              </PoolInfoItem>
              {/* <PoolProgress value={swapedPercent} sx={{ mt: 12 }} poolStatus={poolInfo.status} /> */}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default LeftBox
