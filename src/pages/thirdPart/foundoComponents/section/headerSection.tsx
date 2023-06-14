import { Box, Typography } from '@mui/material'
import BackIcon from 'assets/imgs/thirdPart/foundoDetail/back.svg'
import { useNavigate } from 'react-router-dom'
import CenterSeciont from '../centerSection'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import { ChainListMap } from 'constants/chain'
const Header = () => {
  const navigate = useNavigate()
  const { data: poolInfo } = useEnglishAuctionPoolInfo()

  return (
    <CenterSeciont
      style={{
        maxWidth: '100vw',
        justifyContent: 'space-between',
        height: '104px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => {
          navigate(-1)
        }}
      >
        <img
          src={BackIcon}
          style={{
            width: '12px',
            height: '12px',
            marginRight: '12px'
          }}
          alt=""
        />
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 500,
            fontSize: 16,
            color: '#fff'
          }}
        >
          Back
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-end',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 500,
            fontSize: 16,
            color: '#fff',
            marginRight: '32px'
          }}
        >
          #{poolInfo?.poolId || ' --'}
        </Typography>
        <Box
          sx={{
            height: '32px',
            padding: '0 12px',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-end',
            alignItems: 'center',
            cursor: 'pointer',
            background: '#20201E',
            borderRadius: '100px'
          }}
        >
          <img
            src={poolInfo?.ethChainId ? ChainListMap[poolInfo.ethChainId]?.logo : undefined}
            style={{
              width: '20px',
              height: '20px',
              marginRight: '6px'
            }}
            alt=""
            srcSet=""
          />
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 500,
              fontSize: 16,
              color: '#fff'
            }}
          >
            {poolInfo?.ethChainId ? ChainListMap[poolInfo.ethChainId]?.name : undefined}
          </Typography>
        </Box>
      </Box>
    </CenterSeciont>
  )
}
export default Header
