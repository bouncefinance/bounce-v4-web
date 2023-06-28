import { Box, Typography } from '@mui/material'

import UserActionBox2 from '../../ActionBox/UserActionBox2'
import BottomBox from './BottomBox'
import Alert from './Alert'
import NFTDefaultIcon from 'bounceComponents/create-auction-pool/TokenERC1155InforationForm/components/NFTCard/emptyNFTIcon.png'
import useNftGoApi from 'bounceHooks/auction/useNftInfoByNftGo'
import { FixedSwapNFTPoolProp } from 'api/pool/type'
import useBreakpoint from '../../../../hooks/useBreakpoint'

export interface NftCardParams {
  nft: FixedSwapNFTPoolProp
  suspicious?: boolean // Is it not tradeable on OpenSea?
}
export const NftCard = (props: NftCardParams) => {
  const { name, symbol, largeUrl, smallUrl, thumbUrl } = props.nft?.token0
  const { swappedAmount0, amountTotal0, tokenId } = props.nft
  const { suspicious } = props
  const isMobile = useBreakpoint('lg')
  const formatPrice = (num: number) => {
    return String(num)
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev
      })
  }
  return (
    <Box
      sx={{
        width: isMobile ? 'auto' : 368,
        padding: '24px',
        border: suspicious ? '1px solid #F53030' : '1px solid rgba(23, 23, 23, 0.1)',
        borderRadius: '20px'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: isMobile ? '100%' : '320px',
          height: isMobile ? '220px' : '320px',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '10px',
          textAlign: 'center'
        }}
      >
        <picture>
          <img
            src={largeUrl || thumbUrl || smallUrl || NFTDefaultIcon}
            style={{
              width: isMobile ? '220px' : '320px',
              height: isMobile ? '220px' : '320px',
              borderRadius: '10px'
            }}
            alt="nft"
            srcSet=""
          />
        </picture>
        {suspicious && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)`,
              backdropFilter: `blur(7.5px)`
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate3D(-50%, -50%, 0)',
                width: 261,
                height: 53,
                border: '3px solid rgba(255, 255, 255, 0.6)',
                borderRadius: '4px',
                fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: '53px',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center'
              }}
            >
              Incorrect address
            </Box>
          </Box>
        )}
      </Box>

      <Typography
        sx={{
          fontFamily: 'Sharp Grotesk DB Cyr Book 20',
          fontWeight: 400,
          fontSize: '14px',
          width: '100%',
          height: '20px',
          lineHeight: '20px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: '#171717',
          marginBottom: '4px'
        }}
      >
        {name?.toUpperCase() || symbol?.toUpperCase()}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Sharp Grotesk DB Cyr Book 20',
          fontWeight: 400,
          fontSize: '14px',
          height: '20px',
          lineHeight: '20px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: '#171717',
          marginBottom: '10px'
        }}
      >
        ID:{tokenId || ' --'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          component={'span'}
          sx={{
            fontFamily: 'Sharp Grotesk DB Cyr Book 20',
            fontWeight: 400,
            fontSize: '14px',
            height: '18px',
            lineHeight: '18px',
            color: '#908E96',
            marginRight: '10px'
          }}
        >
          NFT Sold
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Sharp Grotesk DB Cyr Book 20',
            fontWeight: 400,
            fontSize: '14px',
            height: '20px',
            lineHeight: '20px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: '#171717',
            marginBottom: '10px'
          }}
        >
          {`${formatPrice(Number(swappedAmount0))} /  ${formatPrice(Number(amountTotal0))}`}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '6px',
          background: '#F5F5F5',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: `${Number(swappedAmount0) / Number(amountTotal0)}`,
            height: '6px',
            background: '#2663FF',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        ></Box>
      </Box>
    </Box>
  )
}

export interface FixedSwapPoolParams {
  poolInfo: FixedSwapNFTPoolProp
  getPoolInfo?: () => void
}
const UserMainBlock = (props: FixedSwapPoolParams): JSX.Element => {
  const { poolInfo } = props
  const nftGoInfo = useNftGoApi(poolInfo?.contract, poolInfo?.tokenId)
  return (
    <Box
      sx={{ borderRadius: 20, px: 24, py: 20, bgcolor: '#fff', display: 'flex', flexDirection: 'column', rowGap: 12 }}
    >
      <Alert poolInfo={poolInfo} />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, columnGap: 65, marginBottom: 30 }}>
        {/* <UserActionBox /> */}
        <NftCard nft={poolInfo} suspicious={!!nftGoInfo?.data?.suspicious} />
        <UserActionBox2 poolInfo={poolInfo} />
      </Box>
      <BottomBox poolInfo={poolInfo} />
    </Box>
  )
}

export default UserMainBlock
