import { Card, CardHeader, Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import { useCountDown } from 'ahooks'
import moment from 'moment'
import Image from 'next/image'
import { AuctionProgress, IAuctionProgressProps } from './AuctionProgress'
import styles from './styles'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { PoolStatus } from 'api/pool/type'
import { CHAIN_ICONS } from '@/constants/web3/chains'

export type IAuctionCardProps = {
  poolId: string
  status: PoolStatus
  dateStr: number
  title: string
  holder?: React.ReactNode
  progress?: Omit<IAuctionProgressProps, 'status'>
  listItems?: React.ReactNode
  claimAt?: number
  closeAt?: number
  categoryName: string
  isMe?: boolean
  creatorClaimed?: boolean
  participantClaimed?: boolean
  isCreator?: boolean
  whiteList: string
  chainId: number
}

export const AuctionCard: React.FC<IAuctionCardProps> = ({
  status,
  dateStr,
  title,
  poolId,
  closeAt,
  holder,
  categoryName,
  isMe,
  whiteList,
  creatorClaimed,
  participantClaimed,
  isCreator,
  chainId,
  progress,
  listItems,
  claimAt
}) => {
  const chainConfigInBackend = useChainConfigInBackend('id', chainId)
  const [, { days, hours, minutes, seconds }] = useCountDown({ targetDate: claimAt * 1000 })

  const showClaim = () => {
    if (
      (isCreator && !creatorClaimed) ||
      (!isCreator && closeAt === claimAt && !participantClaimed) ||
      (!isCreator && claimAt > closeAt && claimAt < moment().unix() && !participantClaimed)
    ) {
      return (
        <Typography variant="body1" component="span">
          Need to claim token
        </Typography>
      )
    }
    if (!isCreator && closeAt < claimAt && moment().unix() < claimAt) {
      return (
        <Typography variant="body1" component="span">
          Start to claim &nbsp;in {days}d : {hours}h : {minutes}m : {seconds}s
        </Typography>
      )
    }

    return null
  }

  return (
    <Card sx={styles.card} elevation={0} style={{ minWidth: 355, cursor: 'pointer' }}>
      <Stack direction="row" justifyContent="space-between" spacing={6} alignItems={'center'}>
        <Typography>#{poolId}</Typography>
        <Stack direction="row" spacing={6} height={24} alignItems={'center'}>
          {isMe &&
          status === 4 &&
          ((isCreator && !creatorClaimed) ||
            (!isCreator && closeAt === claimAt && !participantClaimed) ||
            (!isCreator && claimAt > closeAt && claimAt < moment().unix() && !participantClaimed) ||
            (!isCreator && closeAt < claimAt && moment().unix() < claimAt)) ? (
            <Chip
              label={showClaim()}
              sx={{ height: 24, fontSize: 12, bgcolor: 'var(--ps-black)', color: 'var(--ps-white)' }}
            />
          ) : null}
          <PoolStatusBox status={status} closeTime={closeAt} openTime={dateStr} />
        </Stack>
      </Stack>
      <CardHeader title={title} />
      <Stack direction="row" spacing={10} sx={{ pt: 10 }}>
        <Chip label={categoryName} color="info" sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }} />
        <Chip label={whiteList} color="info" sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }} />
        <Chip
          icon={
            <Image
              src={CHAIN_ICONS?.[chainConfigInBackend?.ethChainId]}
              width={12}
              height={12}
              alt={chainConfigInBackend?.shortName}
            />
          }
          label={chainConfigInBackend?.shortName}
          color="info"
          sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }}
        />
      </Stack>
      <div>{holder}</div>
      {progress && <AuctionProgress status={status} {...progress} />}
      <Stack spacing={12} sx={{ pt: 20, px: 0, m: 0 }} component="ul">
        {listItems}
      </Stack>
    </Card>
  )
}

export default AuctionCard
