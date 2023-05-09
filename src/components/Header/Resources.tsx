import { Button, Link, styled } from '@mui/material'
import PopperCard from 'components/PopperCard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const StyledButton = styled(Button)({
  display: 'block',
  width: '100%',
  padding: '12px 20px',
  textAlign: 'left',
  fontSize: 16,
  fontWeight: 500,
  backgroundColor: 'transparent'
})

const linkList = [
  { label: 'Document', href: 'https://docs.bounce.finance/welcome-to-bounce-docs/welcome' },
  { label: 'Help Center', href: 'https://www.bounce.finance/FAQ' },
  { label: 'Bounce Token', href: 'https://www.bounce.finance/tools/token' },
  // { label: 'Token Authentication', href: '' },
  { label: 'SDKs&Plug-Ins', href: 'https://www.bounce.finance/sdkAndPlugins' },
  { label: 'Community', href: 'https://www.bounce.finance/joinCommunity' },
  // { label: 'Become a Partner', href: '' },
  {
    label: 'Contact Us',
    href: 'https://docs.google.com/forms/d/1DJxbqqfv6MnN5-kOwDGU-_DGpXDxbJJkUT2UqKgvbUs/viewform?edit_requested=true'
  }
]

export default function Resources() {
  return (
    <PopperCard
      targetElement={
        <Button
          sx={{
            width: 135,
            fontSize: 16,
            height: 44
          }}
          variant="outlined"
          color="secondary"
        >
          Resources
          <ExpandMoreIcon />
        </Button>
      }
    >
      <div>
        {linkList.map(item => (
          <Link key={item.label} underline="none" href={item.href} target="_blank">
            <StyledButton variant="text">{item.label}</StyledButton>
          </Link>
        ))}
      </div>
    </PopperCard>
  )
}
