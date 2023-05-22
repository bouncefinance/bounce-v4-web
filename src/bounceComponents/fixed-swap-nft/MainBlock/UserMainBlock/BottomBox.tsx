import { Box, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { BigNumber } from 'bignumber.js'
import TokenImage from 'bounceComponents/common/TokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'

// import CoingeckoSVG from 'assets/imgs/chains/coingecko.svg'
// import ErrorSVG from 'assets/imgs/icon/error_outline.svg'
import DefaultNftIcon from 'bounceComponents/create-auction-pool/TokenERC1155InforationForm/components/NFTCard/emptyCollectionIcon.png'
import { FixedSwapNFTPoolProp } from 'api/pool/type'
import { shortenAddress } from 'utils'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'

const Title = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography variant="h6" sx={{ mb: 10 }}>
    {children}
  </Typography>
)

const BottomBox = ({ poolInfo }: { poolInfo: FixedSwapNFTPoolProp }): JSX.Element => {
  const formatedMaxAmount1PerWallet =
    poolInfo?.maxAmount1PerWallet &&
    poolInfo.maxAmount1PerWallet !== '0' &&
    poolInfo.maxAmount1PerWallet !== poolInfo.amountTotal0
      ? `${poolInfo.maxAmount1PerWallet} NFT`
      : 'No'
  return (
    <Box sx={{ borderRadius: 20, bgcolor: '#F5F5F5', px: 16, py: 36, flex: 1, height: 'fit-content' }}>
      <Stack direction={'row'} spacing={36}>
        <Stack flex={1} spacing={10}>
          <Title>Token Information</Title>
          <PoolInfoItem title="Contract address" tip="Token Contract Address.">
            <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              {/* poolInfo.token0.coingeckoId only work on erc20,so hidden below code */}
              {/* {poolInfo.token0.coingeckoId ? (
                <Image src={CoingeckoSVG} width={20} height={20} alt="coingecko" />
              ) : (
                <Image src={ErrorSVG} width={20} height={20} alt="Dangerous" />
              )} */}

              <Typography>{shortenAddress(poolInfo.token0.address)}</Typography>

              <CopyToClipboard text={poolInfo.token0.address} />
            </Stack>
          </PoolInfoItem>

          <PoolInfoItem title="Token symbol">
            <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              <TokenImage
                src={poolInfo.token0.largeUrl || poolInfo.token0.smallUrl || poolInfo.token0.thumbUrl || DefaultNftIcon}
                alt={poolInfo.token0.symbol}
                size={20}
              />
              <Typography>{poolInfo.token0.symbol || '-'}</Typography>
            </Stack>
          </PoolInfoItem>
        </Stack>

        <Stack flex={1} spacing={10}>
          <Title>Auction Information</Title>

          <PoolInfoItem title="Auction type">Fixed Price Auction</PoolInfoItem>
          <PoolInfoItem title="Participant">{poolInfo.enableWhiteList ? 'Whitelist' : 'Public'}</PoolInfoItem>
          <PoolInfoItem title="Allocation per Wallet">{formatedMaxAmount1PerWallet}</PoolInfoItem>
          <PoolInfoItem title="Total available Amount">
            {poolInfo.amountTotal0} {poolInfo.token0.symbol}
          </PoolInfoItem>
          <PoolInfoItem title="Price per unit, $">
            {new BigNumber(poolInfo.poolPrice).decimalPlaces(6, BigNumber.ROUND_DOWN).toFormat()}
          </PoolInfoItem>
        </Stack>
      </Stack>
    </Box>
  )
}

export default BottomBox
