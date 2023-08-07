import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import VerifiedIcon from '../VerifiedIcon'
import DefaultAvatarSVG from 'assets/imgs/profile/yellow_avatar.svg'
import { VerifyStatus } from 'api/profile/type'
import { useNavigate } from 'react-router-dom'

export type IAuctionHolderProps = {
  avatar: string
  name: string
  description: string
  href: string
  ifKyc: VerifyStatus
}

export const AuctionHolder: React.FC<IAuctionHolderProps> = ({ avatar, description, name, href, ifKyc }) => {
  console.log('🚀 ~ file: AuctionHolder.tsx:17 ~ ifKyc:', ifKyc)
  const navigate = useNavigate()
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={12}
      onClick={ev => {
        ev.preventDefault()
        navigate(href)
      }}
      sx={{
        px: 10,
        py: 6,
        mt: 20,
        bgcolor: 'var(--ps-gray-50)',
        borderRadius: 12,
        '&:hover': { bgcolor: 'var(--ps-gray-200)' }
      }}
    >
      <Avatar src={avatar || DefaultAvatarSVG} sx={{ width: 52, height: 52 }} />
      <Stack spacing={4}>
        <Stack direction={'row'} alignItems="center" spacing={8}>
          <Typography
            variant="h6"
            sx={{ width: 'fit-content', maxWidth: 200, textOverflow: 'ellipsis', overflow: 'hidden' }}
            noWrap
          >
            {name}
          </Typography>
          <VerifiedIcon ifKyc={ifKyc} />
        </Stack>

        <Typography
          variant="body2"
          color="var(--ps-gray-700)"
          display="-webkit-box"
          textOverflow={'ellipsis'}
          overflow="hidden"
          height={15}
          sx={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            wordBreak: 'break-all'
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default AuctionHolder
