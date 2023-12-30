import { Box, useTheme, Button } from '@mui/material'
import { HideOnMobile } from 'themes/index'
import { ReactComponent as Medium } from 'assets/socialLinksIcon/medium.svg'
import { ReactComponent as Twitter } from 'assets/socialLinksIcon/twitter.svg'
import { ReactComponent as Telegram } from 'assets/socialLinksIcon/telegram.svg'
import { ExternalLink } from 'themes/components'

export default function Footer() {
  const theme = useTheme()
  return (
    <HideOnMobile>
      <footer
        style={{
          height: theme.height.footer
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          width="100%"
          padding="9px 60px 28px"
          gap="40px"
          sx={{
            '& svg': {
              fill: theme => theme.palette.primary.main
            }
          }}
        >
          <Button variant="text">
            <ExternalLink href="">
              <Medium />
            </ExternalLink>
          </Button>
          <Button variant="text">
            <ExternalLink href="">
              <Twitter />
            </ExternalLink>
          </Button>
          <Button variant="text">
            <ExternalLink href="">
              <Telegram />
            </ExternalLink>
          </Button>
        </Box>
      </footer>
    </HideOnMobile>
  )
}
