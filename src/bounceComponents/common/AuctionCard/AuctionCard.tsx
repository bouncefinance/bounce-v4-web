import { Card, CardHeader, Chip, Stack } from '@mui/material'
import React from 'react'
import Image from 'components/Image'
import { AuctionProgress, IAuctionProgressProps } from './AuctionProgress'
import styles from './styles'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { PoolStatus } from 'api/pool/type'
import { ChainId, ChainListMap } from 'constants/chain'
import { Body04 } from 'components/Text'
export type IAuctionCardProps = {
  poolId: string
  status: PoolStatus
  dateStr: number
  title: string
  holder?: React.ReactNode
  progress?: Omit<IAuctionProgressProps, 'status'>
  listItems?: React.ReactNode
  claimAt: number
  closeAt: number
  categoryName: string
  // isMe?: boolean
  // creatorClaimed?: boolean
  // participantClaimed?: boolean
  // isCreator?: boolean
  showCreatorClaim?: boolean | undefined
  showParticipantClaim?: boolean | undefined
  whiteList: string
  chainId: number
  style?: React.CSSProperties | undefined
}

export const AuctionCard: React.FC<IAuctionCardProps> = ({
  status,
  dateStr,
  title,
  poolId,
  closeAt,
  holder,
  categoryName,
  whiteList,
  showCreatorClaim,
  showParticipantClaim,
  chainId,
  progress,
  listItems,
  style,
  claimAt
}) => {
  const chainConfigInBackend = useChainConfigInBackend('id', chainId)

  return (
    <Card
      sx={{
        ...styles.card,
        '@media(max-width:380px)': { width: 'calc(100vw - 16px - 50px)', minWidth: '0 !important' }
      }}
      elevation={0}
      style={{
        minWidth: 355,
        cursor: 'pointer',
        ...style
      }}
    >
      <Stack direction="row" justifyContent="space-between" spacing={6} alignItems={'center'}>
        <Body04>#{poolId}</Body04>
        <Stack
          direction="row"
          spacing={6}
          height={24}
          alignItems={'center'}
          sx={{ '& > div > span': { fontFamily: 'Inter', fontSize: 12 } }}
        >
          <PoolStatusBox
            showCreatorClaim={showCreatorClaim}
            showParticipantClaim={showParticipantClaim}
            claimAt={claimAt}
            status={status}
            closeTime={closeAt}
            openTime={dateStr}
          />
        </Stack>
      </Stack>
      <CardHeader title={title} />
      <Stack direction="row" spacing={10} sx={{ pt: 10 }}>
        <Chip label={categoryName} color="info" sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }} />
        <Chip label={whiteList} color="info" sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }} />
        <Chip
          icon={
            <Image
              src={
                chainConfigInBackend?.ethChainId
                  ? ChainListMap?.[chainConfigInBackend.ethChainId as ChainId]?.logo || ''
                  : ''
              }
              width={12}
              height={12}
              alt={chainConfigInBackend?.shortName}
            />
          }
          label={
            chainConfigInBackend?.ethChainId
              ? ChainListMap?.[chainConfigInBackend.ethChainId as ChainId]?.name || ''
              : '-'
          }
          color="info"
          sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }}
        />
      </Stack>
      <div>{holder}</div>
      {progress && <AuctionProgress status={status} {...progress} />}
      <Stack spacing={12} sx={{ pt: 20, px: 0, m: 0, whiteSpace: 'nowrap' }} component="ul">
        {listItems}
      </Stack>
    </Card>
  )
}

export default AuctionCard
