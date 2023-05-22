import { Box, Button, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
// import { BigNumber } from 'bignumber.js'
import Image from 'components/Image'
import PoolInfoItem from '../../PoolInfoItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
// import { formatNumber } from 'utils/number'

import CoingeckoSVG from 'assets/imgs/chains/coingecko.svg'
import ErrorSVG from 'assets/imgs/icon/error_outline.svg'
// import PoolProgress from 'bounceComponents/common/PoolProgress'
// import { AuctionProgressPrimaryColor } from 'constants/auction/color'
import { shortenAddress } from 'utils'
import { FixedSwapPoolProp } from 'api/pool/type'
import { addTokenToWallet } from 'utils/addTokenToWallet'
import { useActiveWeb3React } from 'hooks'

const Title = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography variant="h6" sx={{ mb: 10 }}>
    {children}
  </Typography>
)

const LeftBox = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }): JSX.Element => {
  const { chainId } = useActiveWeb3React()
  //   const swapedPercent =
  //     poolInfo?.curPlayer && poolInfo?.maxPlayere
  //       ? new BigNumber(poolInfo.curPlayer).div(poolInfo.maxPlayere).times(100).toNumber()
  //       : undefined

  //   const ticketPrice = poolInfo.maxAmount1PerWallet
  //     ? formatNumber(poolInfo.maxAmount1PerWallet, {
  //         unit: 18,
  //         decimalPlaces: poolInfo.token0.decimals
  //       })
  //     : undefined
  //   const singleShare = poolInfo.totalShare
  //     ? formatNumber(new BigNumber(poolInfo.amountTotal0).div(poolInfo.totalShare).toString(), {
  //         unit: 18,
  //         decimalPlaces: poolInfo.token0.decimals
  //       })
  //     : undefined
  return (
    <Box sx={{ borderRadius: 20, bgcolor: '#F5F5F5', px: 16, py: 36, flex: 1, height: 'fit-content' }}>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          gap: '39px'
        }}
      >
        <Box
          sx={{
            width: '50%',
            flex: 1
          }}
        >
          <Title>Token Information</Title>
          <PoolInfoItem
            sx={{
              marginBottom: '12px'
            }}
            title="Contract address"
            tip="Token Contract Address."
          >
            <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              {poolInfo.token0.coingeckoId ? (
                <Image src={CoingeckoSVG} width={20} height={20} alt="coingecko" />
              ) : (
                <Image src={ErrorSVG} width={20} height={20} alt="Dangerous" />
              )}

              <Typography>{shortenAddress(poolInfo.token0.address)}</Typography>

              <CopyToClipboard text={poolInfo.token0.address} />
            </Stack>
          </PoolInfoItem>

          <PoolInfoItem
            sx={{
              marginBottom: '12px'
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
                width: 140,
                height: 20
              }}
            >
              Add To Wallet
            </Button>
          )}
        </Box>
        <Box
          sx={{
            width: '50%',
            flex: 1
          }}
        >
          <Title>Auction Information</Title>
          <PoolInfoItem
            sx={{
              marginBottom: '12px'
            }}
            title="Auction type"
          >
            Random Selection
          </PoolInfoItem>
          <PoolInfoItem
            sx={{
              marginBottom: '12px'
            }}
            title="Participant"
          >
            {poolInfo.enableWhiteList ? 'Whitelist' : 'Public'}
          </PoolInfoItem>
          {/* <PoolInfoItem title="Number of winners">{poolInfo.totalShare}</PoolInfoItem>
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
          <PoolInfoItem title="Ticket Price">{`${ticketPrice} ${poolInfo.token1.symbol}`}</PoolInfoItem> */}
        </Box>
      </Box>
      {/* <Box>
        <PoolInfoItem title="Progress">
          <Box>
            <Typography component="span" sx={{ color: AuctionProgressPrimaryColor[poolInfo.status] }}>
              {poolInfo.curPlayer}
            </Typography>
            <Typography component="span">&nbsp;/ {poolInfo.maxPlayere}</Typography>
          </Box>
        </PoolInfoItem>
        <PoolProgress value={swapedPercent} sx={{ mt: 12 }} poolStatus={poolInfo.status} />
      </Box> */}
    </Box>
  )
}

export default LeftBox
