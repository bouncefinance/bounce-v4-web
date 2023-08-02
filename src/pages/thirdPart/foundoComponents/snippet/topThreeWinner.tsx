import { Box, Typography } from '@mui/material'
import HeadImg from 'assets/imgs/thirdPart/foundoDetail/head.png'
import { shortenAddress } from 'utils'
import { RowLabel } from '../snippet/bidAction'
import TokenImage from 'bounceComponents/common/TokenImage'
import EthIcon from 'assets/imgs/thirdPart/foundoDetail/chart.png'
import { formatNumber } from 'utils/number'
import { useIsSMDown } from 'themes/useTheme'
import moment from 'moment'
import { MutantEnglishAuctionNFTPoolProp, PoolHistory } from 'api/pool/type'

const TopThreeWinner = ({ list, poolInfo }: { list: PoolHistory[]; poolInfo: MutantEnglishAuctionNFTPoolProp }) => {
  const isSm = useIsSMDown()
  const ItemEl = ({ data, index, style }: { data: PoolHistory; index: number; style?: React.CSSProperties }) => {
    return (
      <Box
        sx={{
          position: 'absolute',
          boxSizing: 'border-box',
          top: '50%',
          left: '50%',
          transform: 'translate3D(-50%, -50%, 0)',
          width: '220px',
          heihgt: '323px',
          overflow: 'hidden',
          borderRadius: '8px',
          background: '#20201E',
          backdropFilter: 'blur(5px)',
          cursor: 'pointer',
          ...style
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 229,
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          gap={'24px'}
        >
          <Typography
            sx={{
              width: '100%',
              color: '#fff',
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: 36,
              lineHeight: '26px',
              textAlign: 'center'
            }}
          >
            0{index}
          </Typography>
          <img
            src={data.avatar || HeadImg}
            style={{
              display: 'block',
              width: '90px',
              height: '90px',
              margin: '0 auto 0'
            }}
            alt=""
          />
          <Typography
            sx={{
              width: '100%',
              color: '#fff',
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: 14,
              lineHeight: '21px',
              textAlign: 'center'
            }}
          >
            {shortenAddress(data.requestor)}
          </Typography>
        </Box>
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            height: '94px',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          gap={'8px'}
        >
          <RowLabel
            style={{
              justifyContent: 'flex-end'
            }}
          >
            <TokenImage
              size={20}
              style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                marginRight: '8px'
              }}
              src={poolInfo.token1.smallUrl || EthIcon}
              alt=""
              srcSet=""
            />
            <Typography className="value" style={{ fontSize: 20, lineHeight: '28px' }}>
              {`${formatNumber(data.token1Amount || '0', {
                unit: poolInfo.token1.decimals,
                decimalPlaces: 6
              })} ${poolInfo.token1.symbol}`}
            </Typography>
          </RowLabel>
          <Typography className="value" style={{ fontSize: 12, lineHeight: '18px', color: 'var(--ps-text-1)' }}>
            {moment(data.blockTs * 1000).format('Y-M-D hh:mm')}
          </Typography>
        </Box>
      </Box>
    )
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: list.length === 0 ? '0' : '323px',
        overflow: 'hidden',
        margin: '40px 0'
      }}
    >
      {list && list.length >= 1 && (
        <ItemEl
          key={1}
          style={{
            zIndex: 3,
            borderRadius: '8px',
            transform: isSm ? 'translate3D(-50%, -50%, 0) scale(0.8)' : 'translate3D(-50%, -50%, 0) scale(1)'
          }}
          index={1}
          data={list[0]}
        />
      )}
      {list && list.length >= 2 && (
        <ItemEl
          key={2}
          style={{
            zIndex: 2,
            left: isSm ? '-5%' : '50%',
            transform: isSm ? 'translate3D(0, -49%, 0) scale(0.7)' : 'translate3D(-100%, -47%, 0) scale(0.8)',
            opacity: '0.5'
          }}
          index={2}
          data={list[1]}
        />
      )}
      {list && list.length >= 3 && (
        <ItemEl
          key={3}
          style={{
            zIndex: 1,
            left: isSm ? 'unset' : '50%',
            right: isSm ? '-5%' : 'unset',
            transform: isSm ? 'translate3D(0, -49%, 0) scale(0.7)' : 'translate3D(0, -47%, 0) scale(0.8)',
            opacity: '0.5'
          }}
          index={3}
          data={list[2]}
        />
      )}
    </Box>
  )
}
export default TopThreeWinner
