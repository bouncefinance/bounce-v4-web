import { Box, Typography, Link, styled } from '@mui/material'
import { useIsMDDown } from 'themes/useTheme'
import { ReactComponent as TwitterIcon } from 'assets/imgs/realworldShop/bounce/twitter.svg'
import { ReactComponent as DiscordIcon } from 'assets/imgs/realworldShop/bounce/discord.svg'
import { ReactComponent as TgIcon } from 'assets/imgs/realworldShop/bounce/tg.svg'

const SocialLink = styled(Link)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: '100px',
  border: '1px solid rgba(18, 18, 18, 0.20)',
  background: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: 80,
    height: 80
  }
}))
const KeepTouch = () => {
  const isMd = useIsMDDown()
  const socialLink = [
    {
      logo: <TwitterIcon />,
      link: 'https://twitter.com/zetablockchain'
    },
    {
      logo: <TgIcon />,
      link: 'https://t.me/zetachainofficial'
    },
    {
      logo: <DiscordIcon />,
      link: 'https://discord.com/invite/zetachain'
    }
  ]
  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: isMd ? 120 : 200
      }}
    >
      <Typography
        sx={{
          width: '100%',
          textAlign: 'center',
          color: '#20201E',
          fontVariantNumeric: 'lining-nums proportional-nums',
          fontFamily: `'Instrument Serif'`,
          fontSize: '40px',
          fontWeight: 400,
          textTransform: 'uppercase',
          marginBottom: isMd ? '40px' : '30px'
        }}
      >
        KEEP IN TOUCH
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {socialLink.map((item, index) => {
          if (!item.link) return <></>
          return (
            <SocialLink key={index} href={item.link} target={'_blank'}>
              {item.logo}
            </SocialLink>
          )
        })}
      </Box>
    </Box>
  )
}
export default KeepTouch
