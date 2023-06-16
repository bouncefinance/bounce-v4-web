import { Box, Typography, Button } from '@mui/material'
// import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import { BannerType } from './banner'

const PoolCard = ({ item }: { item: BannerType }) => {
  const navigate = useNavigate()
  const handleClick = (url: string) => {
    if (!url) return
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      window.open(url, '_blank')
    } else {
      navigate(url)
    }
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '370px',
        background: `#FFFFFF`,
        borderRadius: `24px`,
        overflow: 'hidden',
        cursor: 'pointer'
      }}
      onClick={() => {
        handleClick(item.link)
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '252px',
          background: `url(${item.img}) no-repeat top center / auto 100%`,
          backgroundColor: '#000'
        }}
      >
        {/* <Typography
          sx={{
            position: 'absolute',
            width: '100%',
            padding: '0 25px',
            bottom: '16px',
            left: 0,
            fontFamily: `'Inter'`,
            fontWeight: 400,
            fontSize: 12,
            color: '#fff',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            background: `rgba(18, 18, 18, 0.2)`,
            backdropFilter: `blur(5px)`
          }}
        >
          NFT issued by 4K Alpha Vault
        </Typography> */}
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          padding: '12px 16px 16px',
          background: '#fff'
        }}
      >
        <Typography
          sx={{
            width: '100%',
            fontFamily: `'Public Sans'`,
            fontWeight: 500,
            fontSize: 16,
            color: '#000',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            marginBottom: '4px'
          }}
        >
          {item.name}
        </Typography>
        <Typography
          sx={{
            width: '100%',
            fontFamily: `'Inter'`,
            fontWeight: 400,
            fontSize: 12,
            color: 'var(--ps-text-6)',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            marginBottom: '8px'
          }}
        >
          Real World Collectibles | {'Top bid'} | {'ON VIEW'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            component={'span'}
            sx={{
              flex: 1,
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: 20,
              color: 'var(--ps-text-3)',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {/* {item.price} */}
          </Typography>
          <Button
            variant="contained"
            // href={AuctionList[currentIndex].checkAllLink}
            sx={{
              height: '37px',
              lineHeight: '37px',
              borderRadius: '6px'
              // background: 'var(--ps-yellow-1)',
            }}
            // onClick={e => {
            //   e.stopPropagation()
            //   navigate(routes.market.index)
            // }}
          >
            Buy Now
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
export default PoolCard
