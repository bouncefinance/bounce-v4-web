import { Box, Stack, Typography } from '@mui/material'
import { ReactNode, useMemo } from 'react'
import { BigNumber } from 'bignumber.js'
import TokenImage from 'bounceComponents/common/TokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'

// import CoingeckoSVG from 'assets/imgs/chains/coingecko.svg'
// import ErrorSVG from 'assets/imgs/icon/error_outline.svg'
import { shortenAddress } from 'utils'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import ShowNFTCard from 'bounceComponents/create-auction-pool/TokenERC1155InforationForm/components/NFTCard/ShowNFTCard'
import { ChainListMap } from 'constants/chain'

const Title = ({ children }: { children: ReactNode }): JSX.Element => <Typography variant="h6">{children}</Typography>

const TopInfoBox = (): JSX.Element => {
  const { data: poolInfo } = useEnglishAuctionPoolInfo()

  const list = useMemo(() => {
    if (!poolInfo) return []
    const ids = poolInfo.tokenId.split(',')
    return ids.map(id => ({
      name: poolInfo.token0.symbol || `nft #${id}`,
      tokenId: id,
      image: poolInfo.token0.largeUrl
    }))
  }, [poolInfo])

  const isOneNft = useMemo(() => list.length === 1, [list.length])

  if (!poolInfo) return <></>

  return (
    <Box
      sx={{
        backgroundColor: '#EBEFFB',
        borderRadius: '20px',
        padding: 16,
        display: isOneNft ? 'grid' : 'block',
        gap: 20,
        gridTemplateColumns: isOneNft ? '340px 1fr' : 'unset'
      }}
    >
      <Box sx={{ overflowX: 'auto', width: isOneNft ? '100%' : '900px' }} padding={isOneNft ? '0' : '0 30px'}>
        <Box display={isOneNft ? 'contents' : 'inline-flex'} gap={10}>
          {list.map(item => (
            <ShowNFTCard
              key={item.tokenId}
              hideClose
              name={item.name}
              tokenId={item.tokenId}
              image={item.image}
              boxH={isOneNft ? 320 : 220}
              imgH={isOneNft ? 248 : 170}
              style={{
                width: isOneNft ? 248 : 170,
                maxWidth: '100%'
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ borderRadius: 20, bgcolor: 'transparent', py: 20, flex: 1, height: '100%' }}>
        <Box
          display={'grid'}
          alignContent={'space-between'}
          gridTemplateColumns={isOneNft ? '1fr' : '1fr 1fr'}
          justifyContent={'space-between'}
          gap={isOneNft ? 20 : 30}
          height={'100%'}
        >
          <Stack flex={1} spacing={10}>
            <Title>NFT Information</Title>
            <PoolInfoItem title="Token type">
              <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                <TokenImage src={ChainListMap[poolInfo.ethChainId]?.logo || ''} size={20} />
                <Typography>ERC721</Typography>
              </Stack>
            </PoolInfoItem>
            <PoolInfoItem title="Contract address" tip="Token Contract Address.">
              <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                <Typography>{shortenAddress(poolInfo.token0.address)}</Typography>
                <CopyToClipboard text={poolInfo.token0.address} />
              </Stack>
            </PoolInfoItem>
            <PoolInfoItem title="Token Amount">
              <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
                <Typography>1</Typography>
              </Stack>
            </PoolInfoItem>
          </Stack>

          <Stack flex={1} spacing={10}>
            <Title>Auction Information</Title>

            <PoolInfoItem title="Auction type">English Auction</PoolInfoItem>
            <PoolInfoItem title="Participant">{poolInfo.enableWhiteList ? 'Whitelist' : 'Public'}</PoolInfoItem>
            <PoolInfoItem title="Price per unit, $">
              {new BigNumber(poolInfo.poolPrice).decimalPlaces(6, BigNumber.ROUND_DOWN).toFormat()}
            </PoolInfoItem>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default TopInfoBox
