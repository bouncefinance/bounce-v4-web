import { Stack } from '@mui/material'

import SocialMediaButton from './SocialMediaButton'

import { ReactComponent as TwitterSVG } from 'assets/imgs/auction/twitter.svg'
import { ReactComponent as InstagramSVG } from 'assets/imgs/auction/instagram.svg'
import { ReactComponent as WebsiteSVG } from 'assets/imgs/auction/website.svg'
import { ReactComponent as LinkedinSVG } from 'assets/imgs/auction/linkedin.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/auction/discord.svg'
import { ReactComponent as GithubSVG } from 'assets/imgs/auction/github.svg'
import { ReactComponent as EmailSVG } from 'assets/imgs/auction/email.svg'
import { isSocialUrl } from 'utils'

export interface SocialMediaButtonGroupProps {
  email?: string
  shouldShowEmailButton?: boolean
  twitter?: string
  instagram?: string
  website?: string
  linkedin?: string
  github?: string
  discord?: string
  style?: React.CSSProperties
}

const SocialMediaButtonGroup = ({
  email,
  shouldShowEmailButton,
  twitter,
  instagram,
  website,
  linkedin,
  discord,
  style,
  github
}: SocialMediaButtonGroupProps) => {
  return (
    <Stack spacing={8} direction="row" sx={{ mt: 20, ...style }}>
      {email && shouldShowEmailButton ? (
        <SocialMediaButton href={`mailto:${email}`}>
          <EmailSVG />
        </SocialMediaButton>
      ) : null}

      {twitter && (
        <SocialMediaButton href={isSocialUrl('twitter', twitter) ? twitter : `https://twitter.com/${twitter}`}>
          <TwitterSVG />
        </SocialMediaButton>
      )}
      {instagram && (
        <SocialMediaButton href={instagram}>
          <InstagramSVG />
        </SocialMediaButton>
      )}
      {website && (
        <SocialMediaButton href={website}>
          <WebsiteSVG />
        </SocialMediaButton>
      )}
      {linkedin && (
        <SocialMediaButton href={linkedin}>
          <LinkedinSVG />
        </SocialMediaButton>
      )}
      {discord && (
        <SocialMediaButton href={discord}>
          <DiscordSVG />
        </SocialMediaButton>
      )}
      {github && (
        <SocialMediaButton href={github}>
          <GithubSVG />
        </SocialMediaButton>
      )}
    </Stack>
  )
}

export default SocialMediaButtonGroup
