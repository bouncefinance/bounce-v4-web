import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { useMemo } from 'react'
import { ActiveItem } from './stageLine'
import { useDutchPoolClaimable } from 'bounceHooks/auction/useDutchAuctionInfo'
interface DictionaryObj {
  [key: string]: string
}
const StageLineItem = ({ index, item, activeIndex }: { activeIndex: number; index: number; item: ActiveItem }) => {
  const { dip, dgt } = item
  const dicList: DictionaryObj = {
    '0': 'Frist',
    '1': 'Second',
    '2': 'Third',
    '3': 'Fourth',
    '4': 'Fifth',
    '5': 'Sixth',
    '6': 'Seventh',
    '7': 'Eighth',
    '8': 'Ninth',
    '9': 'Tenth'
  }
  const isClaimableDIP = useDutchPoolClaimable(Number(dip.id) || undefined)
  const isClaimableDGT = useDutchPoolClaimable(Number(dgt.id) || undefined)
  const isClaimAble = useMemo(() => {
    return (isClaimableDIP && isClaimableDIP.greaterThan('0')) || (isClaimableDGT && isClaimableDGT.greaterThan('0'))
  }, [isClaimableDGT, isClaimableDIP])
  const active = item.timaSteamp <= new Date().valueOf()
  return (
    <Box
      key={'stageLineBox' + index}
      sx={{
        flex: 1,
        minWidth: '162px',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        cursor: active ? 'pointer' : 'unset'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        mb={'12px'}
      >
        <Box
          sx={{
            fontFamily: `'Inter'`,
            fontSize: 12,
            fontWeight: 400,
            color: '#121212',
            background: active ? '#4F5FFC' : '#626262',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 20,
            height: 20
          }}
        >
          {index + 1}
        </Box>
        <Box
          sx={{
            flex: 1,
            height: 4,
            borderRadius: '4px',
            background: active ? '#4F5FFC' : '#626262'
          }}
        ></Box>
      </Box>
      <Typography
        sx={{
          fontFamily: `'Inter'`,
          fontSize: 12,
          fontWeight: 400,
          color: active ? '#4F5FFC' : '#626262'
        }}
        mb={'8px'}
      >
        {moment(item.timaSteamp).format('YYYY-MM-DD')}
      </Typography>
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontSize: 16,
          fontWeight: 500,
          color: active ? '#4F5FFC' : '#626262',
          textDecoration: activeIndex === index ? 'underline' : ''
        }}
        mb={'4px'}
      >
        {dicList[index + '']} Round
      </Typography>
      {active && isClaimAble && (
        <Typography
          sx={{
            fontFamily: `'Inter'`,
            fontSize: 12,
            fontWeight: 400,
            color: '#4F5FFC'
          }}
          mb={'4px'}
        >
          *Pending claim
        </Typography>
      )}
    </Box>
  )
}
export default StageLineItem
