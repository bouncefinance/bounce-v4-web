import { Box, Typography } from '@mui/material'
import BackIcon from 'assets/imgs/thirdPart/foundoDetail/back.svg'
import { useNavigate } from 'react-router-dom'
import CenterSeciont from '../centerSection'
import { ChainListMap } from 'constants/chain'
import { useIsSMDown } from 'themes/useTheme'
import { MutantEnglishAuctionNFTPoolProp } from 'api/pool/type'

const Header = ({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp | undefined }) => {
  const navigate = useNavigate()
  const isSm = useIsSMDown()
  return (
    <CenterSeciont
      style={{
        maxWidth: '100vw',
        minHeight: 'auto',
        justifyContent: 'space-between',
        paddingTop: isSm ? 24 : 40,
        paddingBottom: isSm ? 24 : 40,
        height: 'auto',
        background: '#000'
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
            fontSize: isSm ? 14 : 16,
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
            fontSize: isSm ? 14 : 16,
            color: '#fff',
            marginRight: isSm ? '16px' : '32px'
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
              width: isSm ? '16px' : '20px',
              height: isSm ? '16px' : '20px',
              marginRight: '6px'
            }}
            alt=""
            srcSet=""
          />
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 500,
              fontSize: isSm ? '14px' : 16,
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
