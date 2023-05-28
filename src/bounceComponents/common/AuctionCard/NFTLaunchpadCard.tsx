import { Card, CardHeader, CardMedia, Chip, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AuctionStatus from './AuctionStatus'
import styles from './styles'
import { ReactComponent as NftTagSVG } from 'assets/imgs/components/nftTag.svg'
import { ReactComponent as ChainIconSVG } from 'assets/imgs/components/chainIcon.svg'

export type INFTLaunchpadCardProps = {
  poolId: string
  status: any
  dateStr?: string
  title: string
  tag: string
  chain: string
  price: string

  holder?: React.ReactNode
}

const NFTLaunchpadCard: React.FC<INFTLaunchpadCardProps> = ({
  status,
  chain,
  tag,
  dateStr,
  price,
  title,
  poolId,
  holder
}) => {
  return (
    <Card sx={styles.card} elevation={0} style={{ minWidth: 355, padding: 0 }}>
      <Box position={'relative'}>
        <Box position={'absolute'} width={'100%'} px={16} top={16} justifyContent="space-between" display={'flex'}>
          <Chip
            label={'#' + poolId}
            sx={{
              height: 24,
              fontSize: 12,
              bgcolor: 'var(--ps-white)',
              color: 'var(--ps-black)',
              border: '1px solid var(--ps-gray-50)'
            }}
          />
          <AuctionStatus status={status} dateStr={dateStr || ''} />
        </Box>
        <CardMedia component="img" alt="green iguana" height="204" image="/imgs/company/banner.png"></CardMedia>
      </Box>
      <Box p={'0 16px 16px'}>
        <CardHeader title={title} />
        <div>{holder}</div>
        <Stack
          direction={'row'}
          sx={{ pt: 22 }}
          display={'flex'}
          alignItems={'flex-end'}
          justifyContent={'space-between'}
        >
          <Typography variant="h2" fontSize={20}>
            {price}&nbsp;ETH
          </Typography>
          <Stack direction="row" spacing={10} sx={{ pt: 10 }}>
            <Chip
              label={tag}
              color="info"
              sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }}
              icon={<NftTagSVG />}
            />
            <Chip
              label={chain}
              color="info"
              sx={{ fontSize: 12, height: 24, color: 'var(--ps-gray-900)' }}
              icon={<ChainIconSVG />}
            />
          </Stack>
        </Stack>
      </Box>
    </Card>
  )
}

export default NFTLaunchpadCard
