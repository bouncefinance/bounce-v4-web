import { Box, Typography } from '@mui/material'
import { DutchAuctionPoolProp } from 'api/pool/type'
import TokenImage from 'bounceComponents/common/TokenImage'
// import PersonSvg from 'assets/imgs/dipExchange/person.svg'
import successSvg from 'assets/imgs/dipExchange/success.png'
import TipSvg from 'assets/imgs/dipExchange/$.svg'
import { ReactComponent as ErrorSvg } from 'assets/imgs/dipExchange/error.svg'

import BigNumber from 'bignumber.js'
import ClaimBlock from './claimBlock'
import { useIsUserJoinedDutchPool } from 'bounceHooks/auction/useIsUserJoinedPool'
import { useIsMDDown } from 'themes/useTheme'

interface LabelItemParam {
  label: string
  value: string
  iconUrl?: string
  style?: React.CSSProperties
  labelStyle?: React.CSSProperties
  valueStyle?: React.CSSProperties
}
const LabelItem = ({ label, value, iconUrl, labelStyle, valueStyle, style }: LabelItemParam) => {
  return (
    <Box mb={'20px'} sx={{ ...style }}>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
        mb={'8px'}
      >
        <TokenImage
          src={iconUrl}
          size={16}
          style={{
            marginRight: '8px'
          }}
        ></TokenImage>
        <Typography
          sx={{
            color: '#959595',
            fontFamily: `'Inter'`,
            fontSize: '12px',
            ...labelStyle
          }}
        >
          {label}
        </Typography>
      </Box>
      <Typography
        sx={{
          color: '#D7D6D9',
          fontFamily: `'Public Sans'`,
          fontSize: '16px',
          fontWeight: 500,
          letterSpacing: '-0.32px',
          ...valueStyle
        }}
      >
        {value}
      </Typography>
    </Box>
  )
}
const FinalTokenclaim = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const isUserJoined = useIsUserJoinedDutchPool(poolInfo)
  const isMd = useIsMDDown()
  if (!isUserJoined) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '216px',
          borderRadius: '6px',
          background: '#1D1D29',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 16px'
        }}
        gap={'20px'}
      >
        <ErrorSvg />
        <Typography
          sx={{
            color: '#D7D6D9',
            fontFamily: `'Public Sans'`,
            fontSize: '16px',
            fontWeight: 500,
            textAlign: isMd ? 'center' : 'left'
          }}
        >
          you have not been involved in any purchases of {poolInfo.token0.symbol.toUpperCase()}
        </Typography>
      </Box>
    )
  }
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '6px',
        background: '#1D1D29',
        padding: '16px 24px 16px 16px',
        display: 'flex',
        flexFlow: isMd ? 'column nowrap' : 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}
      gap={'24px'}
    >
      <Box
        sx={{
          width: isMd ? '100%' : 'unset',
          flex: isMd ? 'unset' : 350,
          borderRadius: '6px',
          background: '#121219',
          padding: '16px',
          minHeight: isMd ? 'unset' : '300px'
        }}
      >
        <LabelItem
          iconUrl={poolInfo?.token1.largeUrl || poolInfo?.token1.smallUrl || poolInfo?.token1.thumbUrl}
          label={'Total  Committed'}
          value={poolInfo.currencySwappedTotal1?.toSignificant() + ' ' + poolInfo.token1.symbol.toUpperCase()}
        />
        <LabelItem
          iconUrl={TipSvg}
          label={'Final price'}
          value={
            poolInfo.currencyLowestBidPrice?.toSignificant() + ' ' + poolInfo.token1.symbol.toUpperCase() + ` per DGT`
          }
        />
      </Box>
      <Box
        sx={{
          width: isMd ? '100%' : 'unset',
          flex: isMd ? 'unset' : 317,
          padding: '16px 0'
        }}
      >
        <LabelItem
          iconUrl={successSvg}
          label={'Deducted DIP'}
          value={
            (poolInfo?.currencyLowestBidPrice?.toExact() && poolInfo?.participant.currencySwappedAmount1?.toExact()
              ? BigNumber(poolInfo?.currencyLowestBidPrice?.toExact())
                  .times(poolInfo?.participant.currencySwappedAmount1?.toExact())
                  .times('0.025')
                  .toFixed(6, BigNumber.ROUND_DOWN)
              : '0') +
            ' ' +
            poolInfo.token1.symbol.toUpperCase() +
            ` DIP`
          }
        />
        <LabelItem
          iconUrl={successSvg}
          label={'Remaining DIP'}
          value={
            (poolInfo?.currencyLowestBidPrice?.toExact() && poolInfo?.participant.currencySwappedAmount1?.toExact()
              ? BigNumber(poolInfo?.currencyLowestBidPrice?.toExact())
                  .times(poolInfo?.participant.currencySwappedAmount1?.toExact())
                  .toFixed(6, BigNumber.ROUND_DOWN)
              : '0') +
            ' ' +
            poolInfo.token1.symbol.toUpperCase() +
            ` DIP`
          }
        />
        <LabelItem
          style={{
            marginBottom: '30px'
          }}
          iconUrl={TipSvg}
          label={'Your final received'}
          value={poolInfo?.participant.currencySwappedAmount0?.toExact() + ' ' + poolInfo.token0.symbol.toUpperCase()}
        />
        <ClaimBlock poolInfo={poolInfo} />
      </Box>
    </Box>
  )
}
export default FinalTokenclaim
