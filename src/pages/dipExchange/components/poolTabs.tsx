import { Box, Typography } from '@mui/material'
import { PoolsData } from './stageLine'
import { useMemo } from 'react'
import moment from 'moment'
import { useIsMDDown } from 'themes/useTheme'
export enum PoolIndexType {
  'DIP' = 0,
  'DGT' = 1,
  'NOTTIME' = 2
}
const PoolTabs = ({
  index,
  poolsData,
  poolType,
  setPoolType
}: {
  index: number
  poolsData: PoolsData
  poolType: number
  setPoolType: (type: PoolIndexType) => void
}) => {
  const isMd = useIsMDDown()
  const { list } = poolsData
  const currenData = useMemo(() => {
    return list[index]
  }, [index, list])
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1296px',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
    >
      {/* <Box
        className={
          new Date().valueOf() >= currenData.dip.startAt && new Date().valueOf() <= currenData.dip.closeAt
            ? 'active'
            : ''
        }
        sx={{
          minWidth: isMd ? '300px' : '360px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          cursor: 'pointer',
          padding: isMd ? '15px 16px' : '15px 28px',
          background: poolType === PoolIndexType.DIP ? '#121219' : '',
          '&.active:hover': {
            background: '#121219',
            border: '8px 8px 0 0 '
          }
        }}
        onClick={() => {
          setPoolType(PoolIndexType.DIP)
        }}
      >
        <Typography
          sx={{
            color: poolType === PoolIndexType.DIP ? '#4F5FFC' : '#626262',
            fontFamily: `'Public Sans'`,
            fontSize: isMd ? 16 : 20,
            fontWeight: 600
          }}
          mb={'4px'}
        >
          DIP Round
        </Typography>
        <Typography
          sx={{
            color: '#959595',
            fontFamily: `'Inter'`,
            fontSize: isMd ? 12 : 13
          }}
        >
          {moment(currenData.dip.startAt).format('YYYY-MM-DD HH:mm:ss')} To{' '}
          {moment(currenData.dip.closeAt).format('YYYY-MM-DD HH:mm:ss')}
        </Typography>
      </Box> */}
      <Box
        className={
          new Date().valueOf() >= currenData.dgt.startAt && new Date().valueOf() <= currenData.dgt.closeAt
            ? 'active'
            : ''
        }
        sx={{
          minWidth: isMd ? '300px' : '360px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          cursor: 'pointer',
          padding: isMd ? '15px 16px' : '15px 28px',
          background: poolType === PoolIndexType.DGT ? '#121219' : '',
          '&.active:hover': {
            background: '#121219',
            border: '8px 8px 0 0 '
          }
        }}
        onClick={() => {
          setPoolType(PoolIndexType.DGT)
        }}
      >
        <Typography
          sx={{
            color: poolType === PoolIndexType.DGT ? '#4F5FFC' : '#626262',
            fontFamily: `'Public Sans'`,
            fontSize: isMd ? 16 : 20,
            fontWeight: 600
          }}
          mb={'4px'}
        >
          DGT Round
        </Typography>
        <Typography
          sx={{
            color: '#959595',
            fontFamily: `'Inter'`,
            fontSize: isMd ? 12 : 13
          }}
        >
          {moment(currenData.dgt.startAt).format('YYYY-MM-DD HH:mm:ss')} To{' '}
          {moment(currenData.dgt.closeAt).format('YYYY-MM-DD HH:mm:ss')}
        </Typography>
      </Box>
    </Box>
  )
}
export default PoolTabs
