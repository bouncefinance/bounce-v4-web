import { Box, Button, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { BigNumber } from 'bignumber.js'
import PoolInfoItem from '../PoolInfoItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'

import PoolProgress from 'bounceComponents/common/PoolProgress'
import { AuctionProgressPrimaryColor } from 'constants/auction/color'
import { shortenAddress } from 'utils'
import { FixedSwapPoolProp } from 'api/pool/type'
import { addTokenToWallet } from 'utils/addTokenToWallet'
import { useActiveWeb3React } from 'hooks'
import CertifiedTokenImage from 'components/CertifiedTokenImage'

const Title = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography variant="h6" sx={{ mb: 10 }}>
    {children}
  </Typography>
)

const LeftBox = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }): JSX.Element => {
  const { chainId } = useActiveWeb3React()
  const swapedPercent = poolInfo?.currencySwappedAmount0
    ? new BigNumber(poolInfo.currencySwappedAmount0.raw.toString()).div(poolInfo.amountTotal0).times(100).toNumber()
    : undefined

  return (
    <Box sx={{ borderRadius: 20, bgcolor: '#F5F5F5', px: 16, py: 36, flex: 1, height: 'fit-content' }}>
      <Stack spacing={36}>
        <Stack spacing={10}>
          <Title>Token Information</Title>

          <PoolInfoItem title="Contract Address" tip="Token Contract Address.">
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

          <PoolInfoItem title="Token Symbol">
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
                width: 140,
                height: 20
              }}
            >
              Add To Wallet
            </Button>
          )}
        </Stack>

        <Stack spacing={10}>
          <Title>Auction Information</Title>

          <PoolInfoItem title="Auction Type">Fixed-Price</PoolInfoItem>
          <PoolInfoItem title="Participant">{poolInfo.enableWhiteList ? 'Whitelist' : 'Public'}</PoolInfoItem>
          <PoolInfoItem title="Allocation per Wallet">
            {poolInfo.currencyMaxAmount1PerWallet.greaterThan('0')
              ? poolInfo.currencyMaxAmount1PerWallet.toSignificant() + ' ' + poolInfo.token1.symbol
              : 'No Limit'}
          </PoolInfoItem>
          <PoolInfoItem title="Total available Amount">
            {poolInfo.currencyAmountTotal0.toSignificant()} {poolInfo.token0.symbol}
          </PoolInfoItem>
          <PoolInfoItem title="Price per unit, $">
            {new BigNumber(poolInfo.poolPrice).decimalPlaces(6, BigNumber.ROUND_DOWN).toFormat()}
          </PoolInfoItem>
        </Stack>

        <Box>
          <PoolInfoItem title="Progress">
            <Box>
              <Typography component="span" sx={{ color: AuctionProgressPrimaryColor[poolInfo.status] }}>
                {poolInfo.currencySwappedAmount0.toSignificant()} {poolInfo.token0.symbol}
              </Typography>
              <Typography component="span">
                &nbsp;/ {poolInfo.currencyAmountTotal0.toSignificant()} {poolInfo.token0.symbol}
              </Typography>
            </Box>
          </PoolInfoItem>

          <PoolProgress value={swapedPercent} sx={{ mt: 12 }} poolStatus={poolInfo.status} />
        </Box>
      </Stack>
    </Box>
  )
}

export default LeftBox
