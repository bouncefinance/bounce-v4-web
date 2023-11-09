import { Box, Button, Link, styled } from '@mui/material'
import PopperCard from 'components/PopperCard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const StyledButton = styled(Button)({
  display: 'block',
  width: '100%',
  padding: '12px 20px',
  textAlign: 'left',
  fontSize: 16,
  fontWeight: 500,
  backgroundColor: 'transparent',
  '&:hover': {
    borderRadius: '100px'
  }
})

const linkList = [
  { label: 'Document', href: 'https://docs.bounce.finance/welcome-to-bounce-docs/welcome' },
  { label: 'Help Center', href: 'https://www.bounce.finance/FAQ' },
  { label: 'Bounce Token', href: 'https://token.bounce.finance/staking' },
  // { label: 'Token Authentication', href: '' },
  { label: 'SDKs&Plug-Ins', href: 'https://www.bounce.finance/sdkAndPlugins' },
  { label: 'Community', href: 'https://www.bounce.finance/joinCommunity' },
  // { label: 'Become a Partner', href: '' },
  {
    label: 'Contact Us',
    href: 'https://docs.google.com/forms/d/1DJxbqqfv6MnN5-kOwDGU-_DGpXDxbJJkUT2UqKgvbUs/viewform?edit_requested=true'
  }
]

export default function Resources({ opacity }: { opacity: number }) {
  return (
    <PopperCard
      sx={{ borderRadius: 20 }}
      targetElement={
        <Button
          sx={{
            width: 135,
            fontSize: 14,
            height: 44,
            borderRadius: 60,
            // border: opacity >= 0.65 ? '1px solid var(--ps-gray-20)' : '1px solid transparent',
            background: opacity >= 0.65 ? '#F6F6F3' : '#F6F6F315',
            color: opacity >= 0.65 ? undefined : '#ffffff',
            '&:hover': {
              color: '#121212'
            }
          }}
          // variant="outlined"
          color="secondary"
        >
          Resources
          <ExpandMoreIcon />
        </Button>
      }
    >
      <Box width={180}>
        {linkList.map(item => (
          <Link key={item.label} underline="none" href={item.href} target="_blank">
            <StyledButton variant="text">{item.label}</StyledButton>
          </Link>
        ))}
      </Box>
    </PopperCard>
  )
}
