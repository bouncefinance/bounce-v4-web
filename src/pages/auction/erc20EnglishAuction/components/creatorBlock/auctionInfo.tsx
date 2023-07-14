import { Box, Button, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'
import TokenImage from 'bounceComponents/common/TokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { shortenAddress } from 'utils'
import { addTokenToWallet } from 'utils/addTokenToWallet'
import { useActiveWeb3React } from 'hooks'
import CertifiedTokenImage from 'components/CertifiedTokenImage'
import useBreakpoint from 'hooks/useBreakpoint'
import { useState } from 'react'
import moment from 'moment'
import { useErc20EnglishAuctionPoolInfo } from '../../ValuesProvider'
import PoolInfoItem from 'pages/auction/dutchAuction/components/poolInfoItem'
const Title = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography sx={{ mb: 10, color: '#fff', fontFamily: `'Public Sans'`, fontSize: '14px', fontWeight: 600 }}>
    {children}
  </Typography>
)
export const RightText = ({ children, style }: { children: ReactNode; style?: React.CSSProperties }): JSX.Element => (
  <Typography sx={{ color: '#D7D6D9', fontFamily: `'Inter'`, fontSize: '13px', fontWeight: 400, ...style }}>
    {children}
  </Typography>
)
const LeftBox = (): JSX.Element => {
  const { data: poolInfo } = useErc20EnglishAuctionPoolInfo()
  const { chainId } = useActiveWeb3React()
  const isMobile = useBreakpoint('lg')
  const [showMore, setShowMore] = useState<boolean>(false)

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
            <PoolInfoItem title="Contract Address" tip="Token Contract Address.">
              <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                <CertifiedTokenImage
                  address={poolInfo?.token0.address || ''}
                  coingeckoId={poolInfo?.token0.coingeckoId || ''}
                  ethChainId={poolInfo?.ethChainId}
                  backedChainId={poolInfo?.chainId}
                />
                <RightText>{shortenAddress(poolInfo?.contract || '')}</RightText>
                <CopyToClipboard text={poolInfo?.contract || ''} />
              </Stack>
            </PoolInfoItem>
            <PoolInfoItem title="Token Symbol">
              <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                <TokenImage src={poolInfo?.token0.largeUrl} alt={poolInfo?.token0.symbol} size={20} />
                <RightText>{poolInfo?.token0.symbol}</RightText>
              </Stack>
            </PoolInfoItem>
            {chainId === poolInfo?.ethChainId && (
              <Button
                variant="outlined"
                onClick={() =>
                  poolInfo &&
                  addTokenToWallet(poolInfo?.token0.address, poolInfo?.token0.symbol, poolInfo?.token0.decimals)
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
          <PoolInfoItem title="Auction Type">
            <RightText>Erc20 English Auction</RightText>
          </PoolInfoItem>
          <PoolInfoItem title="Participant">
            <RightText>{poolInfo?.enableWhiteList ? 'Whitelist' : 'Public'}</RightText>
          </PoolInfoItem>
          <PoolInfoItem title="Allocation Per Wallet">
            <RightText>
              {!poolInfo?.currencyMaxAmount1PerWallet?.equalTo('0')
                ? poolInfo?.currencyMaxAmount1PerWallet?.toSignificant() + ' ' + poolInfo?.token1.symbol
                : 'No Limit'}
            </RightText>
          </PoolInfoItem>
          {showMore && (
            <>
              <PoolInfoItem title="Total Available Amount">
                <RightText>{`${poolInfo?.currencyAmountTotal0?.toSignificant()}`}</RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Starting Price (price floor)">
                <RightText>
                  1 {`${poolInfo?.token0.symbol}`} ={' '}
                  {`${poolInfo?.currencyAmountStartPrice?.toSignificant()} ${(
                    poolInfo?.token1.symbol + ''
                  ).toUpperCase()}`}
                </RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Ending Price (price ceiling)">
                <RightText>
                  1 {`${poolInfo?.token0.symbol}`} ={' '}
                  {`${poolInfo?.currencyAmountEndPrice?.toSignificant()} ${(
                    poolInfo?.token1.symbol + ''
                  ).toUpperCase()}`}
                </RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Pool Duration">
                <RightText>
                  {poolInfo?.openAt ? moment(poolInfo?.openAt * 1000).format('YYYY-MM-DD HH:mm') : '--'} -{' '}
                  {poolInfo?.closeAt ? moment(poolInfo?.closeAt * 1000).format('YYYY-MM-DD HH:mm') : '--'}
                </RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Pool Stage">
                <RightText>{poolInfo?.fragments}</RightText>
              </PoolInfoItem>
              <PoolInfoItem title="Increasing Ratio">
                <RightText>
                  {poolInfo?.fragments ? `${((1 / Number(poolInfo.fragments)) * 100).toFixed(2)}%` : 0}
                </RightText>
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
