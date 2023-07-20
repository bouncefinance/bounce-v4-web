import { Box, Button, Link, Stack, styled } from '@mui/material'
import PopperCard from 'components/PopperCard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'

const StyledTextLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  color: 'var(--ps-black)',
  cursor: 'pointer',
  fontSize: 16,
  height: 44
})

const StyledButton = styled(Button)({
  display: 'block',
  width: '100%',
  padding: '12px 20px',
  textAlign: 'left',
  fontSize: 16,
  fontWeight: 500,
  backgroundColor: 'transparent'
})

const homeList = [
  { label: 'Home', href: routes.market.index },
  { label: 'Private Launchpad', href: routes.launchpad.index },
  { label: 'Token Auction', href: routes.tokenAuction.index },
  { label: 'NFT Auction', href: routes.nftAuction.index },
  { label: 'Real World Collectibles Auction', href: routes.realAuction.index },
  { label: 'Ads Auction', href: routes.adsAuction.index }
]

export default function Resources() {
  const navigate = useNavigate()
  return (
    <Stack spacing={50} direction={'row'} ml={80}>
      <PopperCard
        targetElement={
          <StyledTextLink>
            Auction
            <ExpandMoreIcon />
          </StyledTextLink>
        }
      >
        <Box width={240}>
          {homeList.map((item, key) => (
            <StyledButton key={key} onClick={() => navigate(item.href)}>
              {item.label}
            </StyledButton>
          ))}
        </Box>
      </PopperCard>
      <StyledTextLink target="_blank" href={process.env.REACT_APP_TOKEN_URL}>
        Token
      </StyledTextLink>
    </Stack>
  )
}
