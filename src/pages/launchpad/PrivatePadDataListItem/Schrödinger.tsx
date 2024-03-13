import { Box, Typography, Link } from '@mui/material'
import { IPrivatePadProp, IProjectInfo } from '../PrivatePadDataList'
import { routes } from 'constants/routes'
import { ReactComponent as Web } from 'assets/imgs/auction/round-icon-web.svg'
import { ReactComponent as Twitter } from 'assets/imgs/auction/round-icon-twitter.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/profile/links/discord.svg'
import Telegram from 'assets/imgs/common/Telegram.png'
import SchrodingerAvatar from '../avatar/Schrodinger.png'
const SchrödingerProjectInfo: IProjectInfo[] = [
  {
    title: 'What is Schrödinger?',
    info: [
      <Box key={1}>
        <Typography>
          {`  The Schrödinger's Cat Project transcends the limitations of static digital art. We integrate AI into NFTs,
            granting them dynamic behaviours and emergent properties. Imagine an NFT that evolves through community
            interaction. This creates a unique and engaging experience, where the fate of each NFT is perpetually in flux.`}
        </Typography>
        <Typography sx={{ marginTop: 15 }}>
          {`This is made possible by using an experimental ACS-404 on the aelf blockchain. We propose ACS-404 to be a
          token issuance standard that natively achieves the behaviour of digital assets like ERC-20, ERC-721, ERC-1155
          and ERC-404. The Schrödinger's Cat Project pushes the boundaries of what NFTs can be.`}
        </Typography>
      </Box>
    ]
  },
  {
    title: 'Tokenomics',
    info: [
      <Box
        key={1}
        sx={{
          ' &>ul': {
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }
        }}
      >
        <p style={{ fontWeight: 500 }}>Total Supply: 21,000,000</p>
        <ul>
          <li>IDO+IEO：1%</li>
          <li>Credit Mining：94%</li>
          <li>Team：2%</li>
          <li>Marketing：2%</li>
          <li>Airdrop：1%</li>
        </ul>
      </Box>
    ]
  },
  {
    title: 'Vision & Goals',
    info: [
      <Box
        key={1}
        sx={{
          ' &>ul': {
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          {`Existing token standards like ERC-20 (fungible) and ERC-721 (non-fungible) have limitations. ERC-20 lacks the
          unique identity of NFTs, while ERC-721's rigidity restricts fractional ownership and liquidity. We propose a
          novel idea inspired by (but surpassing) both the unofficial and experimental ERC-404 and Inscription.`}
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          This experimental ACS-404, with AI integration, on the aelf blockchain enables:
        </Typography>
        <ul>
          <li>Fractional ownership: Own portions of an NFT, unlocking liquidity and wider participation.</li>
          <li>Evolutionary gameplay: NFTs evolve based on AI algorithms and community interaction.</li>
          <li>
            Undo functionality: Change your mind? Revert actions like minting or evolving an NFT. We envision a future
            where NFTs are not just static art, but dynamic, interactive experiences that bridge the gap between art,
            gaming, and DeFi. This is our Meow-nopoly moment, and we invite you to join us in shaping the future of
            NFTs.
          </li>
        </ul>
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          We want to establish a functional, purposeful, and usable 404 function for the whole blockchain community. Our
          project aims to eventually create a platform for all creators to build their own AI-powered dynamic 404 NFT
          collection.
        </Typography>
      </Box>
    ]
  }
]
const SchrödingerSocial = [
  <Link key={0} href="https://home.schrodingernft.ai/" target="_blank">
    <Web />
  </Link>,
  <Link key={6} href="https://twitter.com/ProjSchrodinger" target="_blank">
    <Twitter />
  </Link>,
  <Link key={7} href="https://discord.com/invite/P8SuN7mzth" target="_blank">
    <DiscordSVG />
  </Link>,
  <Link key={4} href="https://t.me/projectschrodingercat" target="_blank">
    <img src={Telegram} width={40} />
  </Link>
]
const Schrödinger: IPrivatePadProp = {
  // backedId: 18744,
  keyId: 34,
  liveTimeStamp: {
    start: 1710720000000,
    end: 1710892800000
  },
  //   hideUpcomingCountdown: true,
  poolTypeName: 'Fixed-Price',
  img: 'https://images-v3.bounce.finance/ea3ceeceea28ce7e31d40a16b7b81352-1710218558.png',
  avatar: SchrodingerAvatar,
  title: 'Schrödinger',
  chainId: 1,
  tokenName: '$SGR',
  whitePaperLink: '',
  upcomingLink: routes.thirdPart.Schrödinger,
  liveLink: routes.thirdPart.Schrödinger,
  projectInfo: SchrödingerProjectInfo,
  tokenMetrics: [],
  desc: `The Schrödinger's Cat Project transcends the limitations of static digital art. We integrate AI into NFTs, granting them dynamic behaviours and emergent properties. Imagine an NFT that evolves through community interaction. This creates a unique and engaging experience, where the fate of each NFT is perpetually in flux.`,
  social: SchrödingerSocial,
  moreData: [
    { title: 'Token Name', content: '$SGR' },
    { title: 'Token Price', content: '0.5 USDT' },
    { title: 'Token Amount', content: 'TBD' },
    { title: 'Blockchain', content: 'Ethereum' }
  ]
}
export default Schrödinger
