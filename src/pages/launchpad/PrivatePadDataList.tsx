import { Box, Link, styled, Stack, Typography } from '@mui/material'
import { ReactComponent as Web } from 'assets/imgs/auction/round-icon-web.svg'
import { ReactComponent as Twitter } from 'assets/imgs/auction/round-icon-twitter.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/profile/links/discord.svg'
import Medium from 'assets/imgs/common/Medium.png'
import Telegram from 'assets/imgs/common/Telegram.png'
import Deelance from 'assets/imgs/auction/deelance.png'
import LasMeta from 'assets/imgs/auction/LasMeta.png'
import Openfabric from 'assets/imgs/auction/openfabric.png'
import { ReactComponent as TwitterWhite } from 'assets/socialLinksIcon/twitter.svg'
import { ReactComponent as WebWhite } from 'assets/socialLinksIcon/website.svg'
import { ReactComponent as DiscordSvg } from 'assets/socialLinksIcon/Discord.svg'
import { ReactComponent as TgSvg } from 'assets/socialLinksIcon/Tg.svg'
import { ReactComponent as InstagramSvg } from 'assets/socialLinksIcon/instagram-dashboard.svg'
import { ReactComponent as LinkinSvg } from 'assets/socialLinksIcon/linkin.svg'

import BlodeAvatar from './avatar/blade-icon.ico'
import EquilibriaAvatar from './avatar/equilibria-logo.png'
import poseiswapAvatar from './avatar/poseiswap.jpeg'
import typeltpAvatar from './avatar/typelt.png'
import LasmetAvatar from './avatar/lasmet-avatar.png'
import DeelanceAvatar from './avatar/deelance-avatar.jpg'
import OpenfabricaiAvatar from './avatar/openfabricai-avatar.jpg'
import LasMetaTokenomic from './imgs/LasMeta-Tokenomic.png'
import DeelanceTokenomics from './imgs/Deelance-Tokenomics.png'
import DeelanceInvestment from './imgs/deelance-investment.jpg'
import OpenfabricToken from './imgs/Openfabric-Token.png'
import DeelanceRevenue from './imgs/deelance-revenue.jpeg'
import { ChainId } from 'constants/chain'

export interface IProjectInfo {
  title: string
  info: (string | JSX.Element)[]
}

export interface IPrivatePadProp {
  keyId: number
  liveTimeStamp: {
    start: number
    end: number
  }
  showStartEnd?: true
  poolTypeName: string
  img: string
  avatar: string
  title: string
  // status: PoolStatus
  desc: string
  chainId: ChainId
  whitePaperLink?: string
  tokenName: string
  projectInfo: IProjectInfo[]
  tokenMetrics: IProjectInfo[]
  social: JSX.Element[]
  detailSocial?: JSX.Element[]
  upcomingLink?: string
  liveLink?: string
  moreData: {
    title: string
    content: string
  }[]
}

const SocialBg = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 1px solid rgba(18, 18, 18, 0.2);
  border-radius: 18px;
`

const SvgTwitterBlue = styled(SocialBg)`
  svg {
    fill: #0697f8;
    opacity: 1;
  }
`

const TypeitInfo3: { [key: string]: any } = {
  'Whitelist Round': {
    '- Time': '6/28/2023 3PM UTC ~ 6/30/2023 3PM UTC',
    '- Auction Type': 'Fixed-Price',
    'Auction (First Come First Serve)': {
      '- Token Name': '$TYPE',
      '- Blockchain Network': 'BNB Chain',
      '- Price': '$0.04 USDT per $TYPE',
      '- Total Token Supply': '200,000 $TYPE',
      '- Token Release Timeline': {
        '6/30/2023 4PM UTC': '20 %',
        '9/30/2023 4PM UTC': '26.6 %',
        '12/31/2023 4PM UTC': '26.7 %',
        '3/31/2024 4PM UTC': '26.7 %'
      }
    }
  },
  'Public Round': {
    '- Time': '6/28/2023 3PM UTC ~ 6/30/2023 3PM UTC',
    '- Auction Type': 'Fixed-Price',
    'Auction(First Come First Serve)': {
      'Token Name': '$TYPE',
      'Blockchain Network': 'BNB Chain',
      Price: '$0.05 USDT per $TYPE',
      'Maximum Allocation Per Wallet': 'NO LIMIT',
      'Total Token Supply': '1,800,000 $TYPE',
      'Token Release Timeline': {
        '6/30/2023 4PM UTC': '20 %',
        '9/30/2023 4PM UTC': '26.6 %',
        '12/31/2023 4PM UTC': '26.7 %',
        '3/31/2024 4PM UTC': '26.7 %'
      }
    }
  }
}
const TypeitInfo4: { [key: string]: any } = {
  Tokens: {
    $TCOIN: 'This point-like system allows users to earn points, incentivizing their typing activity.',
    '$WORD (mining token)':
      'This token has a total supply of 1 billion, though additional details are yet to be announced.',
    '$TYPE (governance token)': 'This token also has a total supply of 1 billion.'
  },
  'Token Allocation': [
    '- 50% (500 million) for Type to Earn, released over 60 months.',
    '- 10% (100 million) for investment institutions, locked for 3 months, and then released over 25 months.',
    '- 2% (20 million) for IEO, 20% at TGE, 2 month cliff, 4 months linear.',
    '- 14% (140 million) for the team, locked for 6 months, then released linearly over 60 months.',
    '- 1% (10 million) for airdrops and activities, released linearly over 60 months.',
    '- 2.5% (25 million) for partners and advisors, released linearly over 24 months.',
    '- 15% (150 million) for treasury and reserves, released linearly over 60 months.',
    '- 5% (50 million) for liquidity, released linearly over 60 months.',
    '- 0.5% (5 million) for IDO, 20% TGE, released quarterly for the next 9 months.'
  ],
  context:
    'With this allocation, it is estimated that approximately 35.37 million tokens will be available for trading after initial circulation. Given the estimated valuation of $50 million USD, the token price after initial circulation is expected to be around $1-2, assuming the entry of additional exchanges or institutions.'
}
const TypeitInfo5 = {
  arr1: [
    'TypeIt! is transforming the mobile typing experience by seamlessly integrating economic systems and gameplay elements into a traditional keyboard. Users can earn tokens by simply typing with different keyboard skins influencing their earnings.',
    "A standout feature of TypeIt is its fully encrypted decentralized messaging, ensuring users have complete ownership and control over their data. Security concerns are addressed with the option to disable clipboard access and switch to the system's default keyboard when needed.",
    "TypeIt stands out with its ability to create a revenue stream for users. By using the app's keyboard in their daily mobile phone usage, users can earn tokens and participate in the project's economic ecosystem.",
    "Here's how it works: Each keyboard theme is represented as a Non-Fungible Token (NFT), and users earn token rewards by typing with specific skins. NFTs can be upgraded to unlock greater rewards. TCOIN serves as the current output, acting as points within the system."
  ],
  arr2: [
    '1. Infrastructure Stage: Focuses on finalizing technology, establishing partnerships, and setting up systems. Users earn one TCOIN per day based on the number of mystery boxes and their typing activity.',
    '2. Genesis Mining Stage: Mystery boxes are converted into NFTs with unique qualities and attributes. TCOIN becomes important, serving as a placeholder for governance tokens. Users can upgrade and consume using TCOIN, which can later be used to produce blue boxes and mine governance tokens.',
    '3. Formal Stage: Both red and blue boxes are activated, providing users with strategic choices. They can hatch blue boxes, sell them, trade WORD on the first line, or mine TYPE on the blue line. Specifics such as NFT attributes, token burning mechanisms, and cooldown times will be revealed during this stage.'
  ],
  context:
    "Each stage of TypeIt represents a distinct phase, offering diverse opportunities for users to engage and potentially earn rewards. Don't miss the future of mobile typing with TypeIt!"
}

const renderObjectTree = (obj: { [key: string]: any | [key: string] }): JSX.Element[] => {
  const elements = []
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'object') {
      const innerElements = renderObjectTree(value)
      const innerElement = (
        <Box key={key}>
          {innerElements.map((element, index) => (
            <Box key={index}>{element}</Box>
          ))}
        </Box>
      )
      elements.push(
        <Box key={key} mt={20}>
          <Typography sx={{ fontSize: 18, fontWeight: Object.keys(TypeitInfo3).includes(key) ? 700 : 400 }}>
            {key} :{' '}
          </Typography>{' '}
          {innerElement}
        </Box>
      )
    } else {
      elements.push(
        <Stack key={key} flexDirection={'row'} mt={5}>
          <Typography sx={{ width: { xs: 140, sm: 220 }, fontSize: 16, flex: 'none' }}>{key}</Typography>:
          <Typography sx={{ fontSize: 15 }} pl={10}>
            {value}
          </Typography>
        </Stack>
      )
    }
  }

  return elements
}
const renderProjectInfo = (obj: { [key: string]: any }): JSX.Element[] => {
  const elArr = obj.map((item: string, index: number) => (
    <Typography sx={{ fontSize: 15 }} mt={10} key={index}>
      {item}
    </Typography>
  ))
  return elArr
}
const DeelanceProjectInfo: IProjectInfo[] = [
  {
    title: 'What is Deelance?',
    info: [
      <ul key={1}>
        <li>
          DeeLance is the first decentralized platform revolutionizing how freelancers connect with potential employers
          in Metaverse.
        </li>
        <li style={{ marginTop: 10 }}>
          {`What makes DeeLance stand out is The Metaverse, NFT marketplace, recruitment, and seamless freelancing
          platform creating the ultimate ecosystem for users. At the core of DeeLance's groundbreaking approach is
          the tokenization of freelance work products into NFTs, allowing for a secure and reliable transfer of work
          ownership to recruiters.`}
        </li>
      </ul>
    ]
  },
  {
    title: 'Tokenomics',
    info: [
      <a
        key={1}
        href="https://docs.google.com/spreadsheets/d/17Wg76MgwYPP7klRu6TvIgsWoi0WJbv-j/edit?usp=sharing&ouid=116090532882611450634&rtpof=true&sd=true"
      >
        https://docs.google.com/spreadsheets/d/17Wg76MgwYPP7klRu6TvIgsWoi0WJbv-j/edit?usp=sharing&ouid=116090532882611450634&rtpof=true&sd=true
      </a>,
      <img key={2} src={DeelanceTokenomics} style={{ width: '100%', height: '100%' }} />
    ]
  },
  {
    title: 'Token utility and Revenue Model',
    info: [
      <Box key={1} sx={{ '& img': { width: '100%', height: '100%' }, '& ol': { margin: '10px 0' } }}>
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Token Utility</Typography>
          <Typography>DeeLance products in line:</Typography>
          <ol>
            <li>Metaverse</li>
            <li>Freelancing platform</li>
            <li>NFT marketplace</li>
            <li>Job portal</li>
          </ol>
          <Typography>
            With $DLANCE tokens users can buy NFT subscriptions to unlock premium features in app and unlock premium
            experience in Metaverse, pay Platform fees, buy land and advertisement etc.
          </Typography>
          <ol>
            <li>purchase offices and land in the Metaverse</li>
            <li>unlock premium features.</li>
            <li>Hold To Secure Your Whitelist spot.</li>
            <li>Get To Deal In NFT Marketplace</li>
            <li>Mint, buy, and sell NFTs with $DLANCE</li>
            <li>Pay for transaction fees in the NFT marketplace.</li>
            <li>Get To Unlock Metaverse VIP Experience</li>
            <li>Purchase premium virtual land and office space in the Metaverse.</li>
            <li>Lease office space in the Metaverse.</li>
            <li>Advertise / Display ads in Metaverse. (Billboard advertisement for brand awareness)</li>
          </ol>
        </Box>
        <Box mt={30}>
          <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Revenue Model</Typography>
          <img src={DeelanceRevenue} />
        </Box>
      </Box>
    ]
  },
  {
    title: 'What are your projects key competitive advantages?',
    info: [
      <Box key={1}>
        <Typography>
          DeeLance can differentiate itself from other freelance platforms by offering several key competitive
          advantages:
        </Typography>
        <ol>
          <li>
            Comprehensive NFT Integration: DeeLance’s integration of NFTs provides a unique competitive advantage. By
            leveraging blockchain technology, DeeLance ensures transparent ownership and authenticity of digital assets
            created by freelancers. This feature enhances intellectual property protection and offers potential
            monetization opportunities for freelancers in the growing NFT market.
          </li>
          <li>
            Metaverse Integration: DeeLance stands out by integrating with the metaverse, creating a dynamic and
            immersive environment for freelancers and clients. This integration allows for interactive portfolio
            showcases, virtual collaboration spaces, and networking opportunities, providing a cutting-edge experience
            that sets DeeLance apart from traditional freelance platforms.
          </li>
          <li>
            Trust and Security: DeeLance prioritizes trust and security by implementing a robust verification process
            for freelancers and a secure escrow system for payment transactions. By ensuring that freelancers are
            qualified professionals and protecting both parties from fraudulent activities, DeeLance builds a reputation
            as a reliable and secure platform.
          </li>
          <li>
            Global Talent Pool: DeeLance embraces a global perspective by connecting freelancers and clients from around
            the world. Clients benefit from a diverse pool of talented professionals, enabling access to a wide range of
            skills, expertise, and cultural perspectives. This global talent pool expands project possibilities and
            enriches the overall freelance experience.
          </li>
        </ol>
        <Typography>
          By leveraging these competitive advantages, DeeLance can position itself as an innovative, secure, and
          forward-thinking platform that meets the evolving needs of freelancers and clients in the digital age.
        </Typography>
      </Box>
    ]
  },
  {
    title: 'Investment and Partners',
    info: [
      <Box key={1}>
        <Typography key={0} sx={{ fontSize: 16, fontWeight: 600 }}>
          Investment
        </Typography>
        <Box mt={15} key={1} sx={{ '&>a': { textDecoration: 'underline' } }}>
          <a href="https://twitter.com/Bitgertventures/status/1662410519842521089?s=20">
            https://twitter.com/Bitgertventures/status/1662410519842521089?s=20
          </a>
          <Typography mt={10}>
            Bitgert Ventures made a strategic investment of 💰$1.12M USD in @deelance_com, the leading freelance
            platform!
          </Typography>
        </Box>
      </Box>,
      <Box key={2}>
        <Typography mb={15} key={2} sx={{ fontSize: 16, fontWeight: 600 }}>
          Strategic Partnerships
        </Typography>
        <img key={3} src={DeelanceInvestment} />
      </Box>
    ]
  }
]
export const PrivatePadDataList: IPrivatePadProp[] = [
  {
    keyId: 10,
    liveTimeStamp: {
      start: 1696780800000,
      end: 0
    },
    poolTypeName: 'Fixed Swap Auction',
    img: LasMeta,
    avatar: LasmetAvatar,
    title: 'LasMeta',
    chainId: 1,
    tokenName: '$LASM',
    whitePaperLink: 'https://lasmeta.io/Whitepaper-en.pdf',
    upcomingLink: '/launchpad/lasmeta',
    liveLink: '/launchpad/lasmeta',
    projectInfo: [
      {
        title: 'What is LasMeta?',
        info: [
          'LasMeta is an AI-powered "Virtual Reality" Poker Gaming Metaverse that merges blockchain technology, Polygon Network, and Unreal Engine 5 to deliver an unmatched and free-to-play gaming experience. By leveraging the power of NFTs, utility token, and the immersive Metaverse, we are transforming the gaming landscape. LasMeta, empowers players to truly own their in-game assets, participate in vibrant player-driven economies, and shape their own destinies within a dynamic virtual world.'
        ]
      },
      {
        title: 'Tokenomics',
        info: [
          <a
            style={{ textDecoration: 'underline' }}
            key={1}
            href="https://drive.google.com/file/d/1FsZpbdcxWAVtoQR8-PR2frE74AFpc8Xr/view"
          >
            https://drive.google.com/file/d/1FsZpbdcxWAVtoQR8-PR2frE74AFpc8Xr/view
          </a>,
          <img style={{ width: '100%', height: '100%' }} key={1} src={LasMetaTokenomic} />
        ]
      },
      {
        title: 'Investment and Partners',
        info: [
          <ul key={2}>
            <li>
              2 years ago, we received an equity investment worth $600,000. Since then, the only funding we acquired was
              an ICO round worth $80,000. In the upcoming days, we plan to open another Private round and an ICO round.
              Additionally, we have started investment discussions with 5-6 venture capital firms and an individual
              listed on Forbes U30. Over the past 2 years, we faced significant challenges as investors showed little
              interest in game projects, and this continues to pose a difficulty for us. With investment and grant
              support, we aim to accelerate our game development.
            </li>
            <li style={{ marginTop: 10 }}>
              Our most well-known partners include Gate.io exchange, GateChain, and GateNFT. Moreover, we have a
              collaboration with Chainlink, and they have invited us to participate in SmartCon 2023 in Barcelona,
              provided our demo is ready.
            </li>
            <li style={{ marginTop: 10 }}>Our Estonian partner is Ready Player Me Avatar Infrastructure.</li>
            <li style={{ marginTop: 10 }}>
              Apart from that, we have reputable partners for on/off-ramp and other infrastructure operations such as
              BitKeep Wallet, XP Network, Connext Network, XY Finance, Lossless, as well as Gamestarter, Kommunitas,
              NFTb, TruePNL, Poolz, and several others.
            </li>
            <li style={{ marginTop: 10 }}>
              Additionally, we have over 20 promising metaverse hub partners, and in total, we have more than 60 global
              partners.
            </li>
          </ul>
        ]
      }
    ],
    tokenMetrics: [],
    desc: 'LasMeta is an AI-powered "Virtual Reality" Poker Gaming Metaverse that merges blockchain technology, Polygon Network, and Unreal Engine 5 to deliver an unmatched and free-to-play gaming experience. By leveraging the power of NFTs, utility token, and the immersive Metaverse, we are transforming the gaming landscape. LasMeta, empowers players to truly own their in-game assets, participate in vibrant player-driven economies, and shape their own destinies within a dynamic virtual world.',
    social: [
      <Link key={0} href="https://lasmeta.io/" target="_blank">
        <Web />
      </Link>,
      <Link key={2} href="https://discord.gg/lasmetagdc" target="_blank">
        <DiscordSVG />
      </Link>,
      <Link key={3} href="https://lasmetaio.medium.com/" target="_blank">
        <img src={Medium} width={40} />
      </Link>,
      <Link key={4} href="https://t.me/lasmetaio_announcements" target="_blank">
        <img src={Telegram} width={40} />
      </Link>,
      <Link key={5} href="https://twitter.com/Lasmetaio" target="_blank">
        <Twitter />
      </Link>,
      <Link
        key={6}
        sx={{ width: '41.5px!important', height: '41.5px!important' }}
        href="https://www.linkedin.com/company/lasmeta"
        target="_blank"
      >
        <LinkinSvg width={41.5} height={41.5} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$LASM' },
      { title: 'Token Price', content: '0.045 ' },
      { title: 'Token Amount', content: 'TBD' },
      { title: 'Blockchain', content: 'Ethereum' }
    ]
  },
  {
    keyId: 9,
    liveTimeStamp: {
      start: 1689350400000,
      end: 0
    },
    poolTypeName: '',
    img: Deelance,
    avatar: DeelanceAvatar,
    title: 'Deelance',
    chainId: 1,
    tokenName: '$DLANCE',
    whitePaperLink: 'https://docs.deelance.com/',
    upcomingLink: '/launchpad/deelance',
    liveLink: '/launchpad/deelance',
    projectInfo: DeelanceProjectInfo,
    tokenMetrics: [],
    desc: 'DeeLance is the first decentralized platform revolutionizing how freelancers connect with potential employers in Metaverse.',
    social: [
      <Link key={0} href="https://deelance.com/en" target="_blank">
        <Web />
      </Link>,
      <Link key={2} href="https://discord.gg/vhH3Sbt9NQ" target="_blank">
        <DiscordSVG />
      </Link>,
      <Link key={3} href="https://medium.com/@deeLance" target="_blank">
        <img src={Medium} width={40} />
      </Link>,
      <Link key={4} href="https://t.me/deelance_com" target="_blank">
        <img src={Telegram} width={40} />
      </Link>,
      <Link
        key={5}
        sx={{ width: '43px !important', height: '43px !important' }}
        href="https://www.instagram.com/deelanceofficial/"
        target="_blank"
      >
        <InstagramSvg width={43} height={43} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$DLANCE' },
      { title: 'Token Price', content: '0.029' },
      { title: 'Token Amount', content: '1,800,000' },
      { title: 'Blockchain', content: 'Ethereum' }
    ]
  },
  {
    keyId: 8,
    liveTimeStamp: {
      start: 1693324800000,
      end: 0
    },
    poolTypeName: 'Fixed Swap Auction',
    img: Openfabric,
    avatar: OpenfabricaiAvatar,
    title: 'Openfabric AI',
    chainId: 1,
    tokenName: '$TBD',
    whitePaperLink: 'https://openfabric.ai/resource/openfabric-whitepaper.pdf',
    upcomingLink: '/launchpad/openfabric',
    liveLink: '/launchpad/openfabric',
    projectInfo: [
      {
        title: 'What is Openfabric AI?',
        info: [
          'Openfabric AI is a decentralized Layer 1 AI protocol for building and connecting AI applications where we have harnessed the power of blockchain, advanced cryptography, and novel infrastructure to create a new foundation for AI-Apps. In our ecosystem, everyone has quick, easy, low-cost, and hassle-free access to powerful AIs.'
        ]
      },
      {
        title: 'Tokenomics',
        info: [
          <Box
            key={1}
            sx={{
              '& a': {
                textDecoration: 'underline'
              },
              '& img': {
                width: '100%',
                height: '100%',
                marginTop: 10
              }
            }}
          >
            <a href="https://docs.google.com/spreadsheets/d/1XCmm4HOIk9h7_lzdMIN8PJ-MEtCpF9-SQyLo66I8aas/edit#gid=0">
              https://docs.google.com/spreadsheets/d/1XCmm4HOIk9h7_lzdMIN8PJ-MEtCpF9-SQyLo66I8aas/edit#gid=0
            </a>
            <img src={OpenfabricToken} />
          </Box>
        ]
      },
      {
        title: 'Investment and Partners',
        info: [
          <Box
            key={1}
            sx={{
              '& a': {
                textDecoration: 'underline',
                display: 'block',
                marginTop: 10
              }
            }}
          >
            <a href="https://openfabric.ai/#openfabric-investors">https://openfabric.ai/#openfabric-investors</a>
            <a href="https://openfabric.ai/#openfabric-partners">https://openfabric.ai/#openfabric-partners</a>
          </Box>
        ]
      }
    ],
    tokenMetrics: [],
    desc: 'Openfabric AI is a decentralized Layer 1 AI protocol for building and connecting AI applications where we have harnessed the power of blockchain, advanced cryptography, and novel infrastructure to create a new foundation for AI-Apps. In our ecosystem, everyone has quick, easy, low-cost, and hassle-free access to powerful AIs.',
    social: [
      <Link key={0} href="https://openfabric.ai/" target="_blank">
        <Web />
      </Link>,
      <Link key={1} href="https://twitter.com/openfabricai" target="_blank">
        <Twitter />
      </Link>,
      <Link key={2} href="https://discord.com/invite/VHS92QWaX3" target="_blank">
        <DiscordSVG />
      </Link>,
      <Link key={4} href="https://t.me/OpenFabricAI" target="_blank">
        <img src={Telegram} width={40} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$TBD' },
      { title: 'Token Price', content: '0.06 USDT' },
      { title: 'Token Amount', content: 'TBD' },
      { title: 'Blockchain', content: 'Ethereum' }
    ]
  },
  {
    keyId: 6,
    liveTimeStamp: {
      start: 1687964400000,
      end: 1688137200000
    },
    poolTypeName: 'Fixed Swap Auction',
    img: 'https://images-v3.bounce.finance/6e179a231f6330d284676a0ec1ab3359-1687746437.png',
    avatar: typeltpAvatar,
    title: 'TypeIt',
    chainId: 56,
    tokenName: 'TYPE',
    whitePaperLink: 'https://typeit.gitbook.io/web3keyboard/whitepaper/executive-summary',
    upcomingLink: '/launchpad/typeit/707',
    liveLink: '/launchpad/typeit/707',
    projectInfo: [
      {
        title: 'What is TypeIt?',
        info: [
          'TypeIt revolutionizes the mobile typing experience as the first-ever Web3 mobile keyboard built on BNB Chain. With TypeIt, users can passively earn income through day-to-day typing, becoming part of the Web3 development trend. Offering NFT keyboard skins and immersive GameFi and Socialfi scenarios, TypeIt integrates privacy measures by encrypting and locally storing user data, ensuring utmost security.',
          'As the vital bridge connecting the Web3 and Web2 worlds, TypeIt extends beyond a mere input method, empowering users to actively participate in the digital economy. Founded and supported by experienced leaders from Huobi, MEXC, TritiumDAO, and backed by significant investments from industry giants like MVentures, Gate Labs, BitMart Exchange, and Cipholio Ventures, TypeIt is seeking investment partners to join their IEO round and contribute to scaling the product.'
        ]
      },
      {
        title: 'Investment and Partners',
        info: [
          'We are founded and backed by experienced leaders from Huobi, MEXC, TritiumDAO, and have received investments from MVentures, Gate Labs, BitMart Exchange, Cipholio Ventures, and many more!'
        ]
      },
      { title: 'TypeIt IDO Details', info: renderObjectTree(TypeitInfo3) },
      {
        title: 'TypeIt Tokenomics',
        info: [
          <Box key={1}>{renderObjectTree(TypeitInfo4.Tokens)}</Box>,
          <Typography key={'h3'} variant="h4">
            Allocation
            {renderProjectInfo(TypeitInfo4['Token Allocation'] as string[])}
          </Typography>,
          TypeitInfo4.context
        ]
      },
      {
        title: 'What makes TypeIt unique',
        info: [
          <Box key={'box1'}>{renderProjectInfo(TypeitInfo5.arr1)}</Box>,
          <Box key={'box2'}>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              Participating in the TypeIt project involves different stages:
            </Typography>
          </Box>,
          <Box key={'box3'}>
            {renderProjectInfo(TypeitInfo5.arr2)}{' '}
            <Typography key={4} sx={{ fontSize: 15 }} mt={10}>
              {TypeitInfo5.context}
            </Typography>
          </Box>
        ]
      }
    ],
    tokenMetrics: [],
    desc: 'Typelt is the first project to introduce the "type-to-earn" concept. It is opening up a new opportunity in the Web3 world, bringing the earning aspect to this simple day-to-day activity.',
    social: [
      <Link key={0} href="https://www.typeit.net/" target="_blank">
        <Web />
      </Link>,
      <Link key={1} href="https://twitter.com/typeit_" target="_blank">
        <Twitter />
      </Link>,
      <Link key={2} href="https://discord.com/invite/typeit" target="_blank">
        <DiscordSVG />
      </Link>,
      <Link key={3} href="https://medium.com/typeit" target="_blank">
        <img src={Medium} width={40} />
      </Link>,
      <Link key={4} href="https://t.me/Typeit_Official" target="_blank">
        <img src={Telegram} width={40} />
      </Link>,
      <Link
        key={5}
        sx={{ width: '43px !important', height: '43px !important' }}
        href="https://www.instagram.com/typeit_official/"
        target="_blank"
      >
        <InstagramSvg width={43} height={43} />
      </Link>,
      <Link
        key={6}
        sx={{ width: '41.5px!important', height: '41.5px!important' }}
        href=" https://www.linkedin.com/company/typeit-official"
        target="_blank"
      >
        <LinkinSvg width={41.5} height={41.5} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$TYPE' },
      { title: 'Token Price', content: '0.05 USDT' },
      { title: 'Token Amount', content: '1,800,000' },
      { title: 'Blockchain', content: 'BNB Chain' }
    ]
  },
  {
    keyId: 7,
    liveTimeStamp: {
      start: 1687964400000,
      end: 1688137200000
    },
    poolTypeName: 'Whitelist',
    img: 'https://images-v3.bounce.finance/6e179a231f6330d284676a0ec1ab3359-1687746437.png',
    avatar: typeltpAvatar,
    title: 'TypeIt',
    chainId: 56,
    tokenName: 'TYPE',
    whitePaperLink: 'https://typeit.gitbook.io/web3keyboard/whitepaper/executive-summary',
    upcomingLink: '/launchpad/typeit/whitelist/708',
    liveLink: '/launchpad/typeit/whitelist/708',
    projectInfo: [
      {
        title: 'What is TypeIt?',
        info: [
          'TypeIt revolutionizes the mobile typing experience as the first-ever Web3 mobile keyboard built on BNB Chain. With TypeIt, users can passively earn income through day-to-day typing, becoming part of the Web3 development trend. Offering NFT keyboard skins and immersive GameFi and Socialfi scenarios, TypeIt integrates privacy measures by encrypting and locally storing user data, ensuring utmost security.',
          'As the vital bridge connecting the Web3 and Web2 worlds, TypeIt extends beyond a mere input method, empowering users to actively participate in the digital economy. Founded and supported by experienced leaders from Huobi, MEXC, TritiumDAO, and backed by significant investments from industry giants like MVentures, Gate Labs, BitMart Exchange, and Cipholio Ventures, TypeIt is seeking investment partners to join their IEO round and contribute to scaling the product.'
        ]
      },
      {
        title: 'Investment and Partners',
        info: [
          'We are founded and backed by experienced leaders from Huobi, MEXC, TritiumDAO, and have received investments from MVentures, Gate Labs, BitMart Exchange, Cipholio Ventures, and many more!'
        ]
      },
      { title: 'TypeIt IDO Details', info: renderObjectTree(TypeitInfo3) },
      {
        title: 'TypeIt Tokenomics',
        info: [
          <Box key={1}>{renderObjectTree(TypeitInfo4.Tokens)}</Box>,
          <Typography key={'h3'} variant="h4">
            Allocation
            {renderProjectInfo(TypeitInfo4['Token Allocation'] as string[])}
          </Typography>,
          TypeitInfo4.context
        ]
      },
      {
        title: 'What makes TypeIt unique',
        info: [
          <Box key={'box1'}>{renderProjectInfo(TypeitInfo5.arr1)}</Box>,
          <Box key={'box2'}>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              Participating in the TypeIt project involves different stages:
            </Typography>
          </Box>,
          <Box key={'box3'}>
            {renderProjectInfo(TypeitInfo5.arr2)}{' '}
            <Typography key={4} sx={{ fontSize: 15 }} mt={10}>
              {TypeitInfo5.context}
            </Typography>
          </Box>
        ]
      }
    ],
    tokenMetrics: [],
    desc: 'Typelt is the first project to introduce the "type-to-earn" concept. It is opening up a new opportunity in the Web3 world, bringing the earning aspect to this simple day-to-day activity.',
    social: [
      <Link key={0} href="https://www.typeit.net/" target="_blank">
        <Web />
      </Link>,
      <Link key={1} href="https://twitter.com/typeit_" target="_blank">
        <Twitter />
      </Link>,
      <Link key={2} href="https://discord.com/invite/typeit" target="_blank">
        <DiscordSVG />
      </Link>,
      <Link key={3} href="https://medium.com/typeit" target="_blank">
        <img src={Medium} width={40} />
      </Link>,
      <Link key={4} href="https://t.me/Typeit_Official" target="_blank">
        <img src={Telegram} width={40} />
      </Link>,
      <Link
        key={5}
        sx={{ width: '43px !important', height: '43px !important' }}
        href="https://www.instagram.com/typeit_official/"
        target="_blank"
      >
        <InstagramSvg width={43} height={43} />
      </Link>,
      <Link
        key={6}
        sx={{ width: '41.5px!important', height: '41.5px!important' }}
        href=" https://www.linkedin.com/company/typeit-official"
        target="_blank"
      >
        <LinkinSvg width={41.5} height={41.5} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$TYPE' },
      { title: 'Token Price', content: '0.04 USDT' },
      { title: 'Token Amount', content: '200,000' },
      { title: 'Blockchain', content: 'BNB Chain' }
    ]
  },
  {
    keyId: 2,
    liveTimeStamp: {
      start: 1687046400000,
      // end: 1687478400000
      end: 0
    },
    poolTypeName: 'Fixed Swap Auction',
    img: 'https://images-v3.bounce.finance/46364b6b9429913d86d24cb30e638685-1683799254.png',
    avatar: poseiswapAvatar,
    title: 'PoseiSwap',
    chainId: 56,
    tokenName: 'POSE',
    whitePaperLink: 'https://drive.google.com/file/d/1EUO7rl5E3MHgdZOgcuz5A65QtIEtHe-Y/view?usp=sharing',
    // upcomingLink: routes.thirdPart.digitalAssetsOffering,
    upcomingLink: '/launchpad/poseiswap/auction/690',
    liveLink: '/launchpad/poseiswap/auction/690',
    projectInfo: [
      {
        title: 'What is PoseiSwap?',
        info: [
          'PoseiSwap, the first decentralized exchange (DEX) on the Nautilus Chain (Zebec Protocol), provides an efficient and secure platform for cryptocurrency trading. Its key features include quick, cost-effective transactions, and privacy thanks to the scalable L3 Nautilus Chain, addressing high gas fees and network congestion prevalent in other DEXs.'
        ]
      },
      {
        title: 'Methods of Token Unlocking',
        info: [
          'Unlock Node:',
          '- 45 days cliff, 5.00% unlock',
          '- 5 month linear vesting. (1.00% monthly)',
          '- 18 month linear vesting. (5.00% monthly).'
        ]
      }
    ],
    tokenMetrics: [
      {
        title: 'Token Metrics',
        info: [
          'The Ondo Finance Protocol ("Ondo") is an open and decentralized investment bank. Ondo enables and facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs, institutional and retail.Ondo is based upon three core principles:Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI) for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters (capital supply) to provide liquidity for their native token, users can easily trade these tokens in decentralized exchanges.Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum without incentives.Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating DeFi protocols and repackaging their exposures using traditional finance techniques.'
        ]
      }
    ],
    desc: 'PoseiSwap, the first decentralized exchange (DEX) on the Nautilus Chain (Zebec Protocol), provides an efficient and secure platform for cryptocurrency trading. Its key features include quick, cost-effective transactions, and privacy thanks to the scalable L3 Nautilus Chain, addressing high gas fees and network congestion prevalent in other DEXs.',
    social: [
      <Link key={0} href="https://www.poseiswap.xyz/" target="_blank">
        <Web />
      </Link>,
      <Link key={1} href="https://twitter.com/poseiswap" target="_blank">
        <Twitter />
      </Link>,
      <Link key={2} href="https://discord.com/invite/rWdHnb45UG" target="_blank">
        <DiscordSVG />
      </Link>,
      <Link key={3} href="https://poseiswap.medium.com/" target="_blank">
        <img src={Medium} width={40} />
      </Link>,
      <Link key={4} href="https://t.me/PoseiSwapChat" target="_blank">
        <img src={Telegram} width={40} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$POSE' },
      { title: 'Token Price', content: '$0.309933' },
      { title: 'Token Amount', content: '1,000,000' },
      { title: 'Blockchain', content: 'BNB Chain' }
    ]
  },
  {
    keyId: 5,
    liveTimeStamp: {
      start: 1687348800000,
      end: 1687521600000
    },
    poolTypeName: 'Fixed Swap Auction',
    img: 'https://images-v3.bounce.finance/e097cd7f48215b693bd71cc09cb469d7-1687233034.png',
    avatar: 'https://images-v3.bounce.finance/1b4c8022876d83267d6f9144f24f39d5-1686719746.jpeg',
    title: 'Omega',
    chainId: 324,
    tokenName: 'OMG',
    upcomingLink: '/launchpad/omega/auction/674',
    liveLink: '/launchpad/omega/auction/674',
    projectInfo: [
      {
        title: 'What is Omega [PRJCT]?',
        info: [
          <span key={0}>
            Omega is building a real-yield multi level system. With OMG and veOMG people can earn double reward USDT and
            ETH. Our nontradeable veOMG people can earn double reward and participate in our dao decision making. We
            inplemented NFT boosted staking into our ecosystem so people can boost their earnings. Know more in details
            here:{' '}
            <Link color={'inherit'} href="https://omegaprjc.gitbook.io/omega-prjct/" target="_blank">
              https://omegaprjc.gitbook.io/omega-prjct/
            </Link>
          </span>
        ]
      },
      {
        title: 'Tokenomics',
        info: [
          <Link key={0} color={'inherit'} href="https://omegaprjc.gitbook.io/omg/ecosystem/tokenomics" target="_blank">
            <img
              style={{ maxWidth: '100%' }}
              src={
                'https://3670209456-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F2pJ8R2p6YaBhs9uCWGPN%2Fuploads%2FB6G5HIAFLVskmeQfFoVg%2F45%25 Public sale (1).png?alt=media&token=3d808374-d6d6-4282-8d88-831a0edef574'
              }
            />
          </Link>
        ]
      },
      {
        title: 'Roadmap',
        info: [
          <Link
            sx={{
              display: 'inline-block',
              backgroundColor: '#333'
            }}
            key={0}
            color={'inherit'}
            href="https://omegaprjc.gitbook.io/omg/ecosystem/roadmap"
            target="_blank"
          >
            <img
              style={{ maxWidth: '100%' }}
              src={
                'https://3670209456-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F2pJ8R2p6YaBhs9uCWGPN%2Fuploads%2Fmx8w3ErHGzd5nZJHoz8m%2FBrown Geometric Product Launch Flowchart Diagram Mind Map (2).png?alt=media&token=c3bf991f-39ea-4e73-b512-f6df8a440b91'
              }
            />
          </Link>
        ]
      }
    ],
    tokenMetrics: [],
    desc: 'Omega is building a real-yield multi level system. With OMG and veOMG people can earn double reward USDT and ETH. Our nontradeable veOMG people can earn double reward and participate in our dao decision making. We inplemented NFT boosted staking into our ecosystem so people can boost their earnings.',
    whitePaperLink: 'https://omegaprjc.gitbook.io/omega-prjct/',
    social: [
      <Link key={0} href="https://www.omegaprjct.com/" target="_blank">
        <Web />
      </Link>,
      <Link key={1} href="https://twitter.com/OmegaPrjct" target="_blank">
        <Twitter />
      </Link>,
      <Link key={2} href="https://discord.gg/AXhFE7267S" target="_blank">
        <DiscordSVG />
      </Link>,
      // <Link key={3} href="https://poseiswap.medium.com/" target="_blank">
      //   <img src={Medium} width={40} />
      // </Link>,
      <Link key={4} href="https://t.me/omgprjct " target="_blank">
        <img src={Telegram} width={40} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$OMG' },
      { title: 'Token Price', content: '0.000013ETH' },
      { title: 'Token Amount', content: '4,500,000' },
      { title: 'Blockchain', content: 'zkSync Era' }
    ]
  },
  {
    keyId: 1,
    liveTimeStamp: {
      start: 1684908000000,
      end: 1685080800000
    },
    poolTypeName: 'Playable Auction',
    showStartEnd: true,
    img: 'https://images-v3.bounce.finance/d784fb0ad9c334c6780034699cb9a239-1684479810.png',
    avatar: EquilibriaAvatar,
    title: 'Equilibria',
    // status: PoolStatus.Upcoming,
    chainId: 42161,
    tokenName: 'EQB',
    // upcomingLink: routes.game.equilibriaIndex,
    // liveLink: routes.game.equilibriaIndex,
    projectInfo: [
      {
        title: 'what is BladeDao?',
        info: [
          'BladeDAO is a decentralized on-chain game ecosystem built on zkSync Era by degens, for degens. The first medieval themed idle dungeon game, Legends of Valoria (LOV), featuring PvE and PvP gameplay, is set to release in late June.',
          'BladeDAO aims to build/publish a series of crypto games with on-chain elements and applied zero knowledge proofs to explore the new frontier of fun. We aim to use applied ZKP in 1) verifiable randomness; 2) hidden information; 3) scalability to create novel game mechanisms in a user- friendly way.'
        ]
      },
      {
        title: 'what is $BLADE tokennomics?',
        info: [
          'The $BLADE tokenomics borrow from the positive ecosystem circulation like $vecrv, where $BLADE will serve as the utility token to boost yield stream for each crypto game published on BladeDAO. $veblade token holders enjoy a tax-like return on all in-game economic activities.'
        ]
      },
      {
        title: 'Is BladeDAO’s Team Anon or Public?',
        info: [
          'The team comes from a variety of backgrounds of game developer, defi builder, smart contract developer, economic research, crypto media and zkp researcher.',
          'The founder 0xBrawler previously built a crypto media company in Asia, and served as advisor for a few crypto game studios in the region. The team has plans to dox themselves overtime.'
        ]
      },
      {
        title: 'What about Investment and Partners?',
        info: [
          'The team raised a small round from angel investors and degen groups for game development and working capital.'
        ]
      }
    ],
    tokenMetrics: [
      {
        title: 'Key Features and Highlights',
        info: [
          'The Ondo Finance Protocol ("Ondo") is an open and decentralized investment bank. Ondo enables and facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs, institutional and retail.Ondo is based upon three core principles:Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI) for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters (capital supply) to provide liquidity for their native token, users can easily trade these tokens in decentralized exchanges.Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum without incentives.Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating DeFi protocols and repackaging their exposures using traditional finance techniques.'
        ]
      }
    ],
    desc: 'Equilibria Finance is designed exclusively for $PENDLE holders and liquidity providers, offering an easy-to-use platform to maximize your profits. It leverages the veToken/boosted yield model adopted by Pendle Finance to provide a boosted yield for LPs and extra reward to PENDLE holders with a tokenized version of vePENDLE, ePENDLE.',
    // desc: '',
    social: [
      <Link key={1} href="https://equilibria.fi" target="_blank">
        <Web />
      </Link>,
      <Link key={2} href="https://t.me/+PYCzlXH93sU3YWFl" target="_blank">
        <img src={Telegram} width={40} />
      </Link>,
      <Link key={3} href="https://twitter.com/Equilibriafi" target="_blank">
        <Twitter />
      </Link>,
      <Link key={4} href="https://discord.gg/5xDyEEPNyU" target="_blank">
        <DiscordSVG />
      </Link>
    ],
    detailSocial: [
      <Link key={1} href="https://equilibria.fi" target="_blank">
        <SocialBg>
          <WebWhite />
        </SocialBg>
      </Link>,
      <Link key={2} href="ttps://t.me/+PYCzlXH93sU3YWFl" target="_blank">
        <SocialBg>
          <TgSvg />
        </SocialBg>
      </Link>,
      <Link key={3} href="https://twitter.com/Equilibriafi" target="_blank">
        <SvgTwitterBlue>
          <TwitterWhite />
        </SvgTwitterBlue>
      </Link>,
      <Link key={4} href="https://discord.gg/5xDyEEPNyU" target="_blank">
        <SocialBg>
          <DiscordSvg />
        </SocialBg>
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$EQB' },
      { title: 'Token Price', content: '0.2 USDC' },
      { title: 'Total Value', content: '10000 USDC' },
      { title: 'Blockchain', content: 'Arbitrum' }
    ]
  },
  {
    keyId: 3,
    liveTimeStamp: {
      start: 1684814400000,
      end: 1684900800000
    },
    showStartEnd: true,
    poolTypeName: 'Fixed Swap Auction',
    img: 'https://images-v3.bounce.finance/141976585869e842d9b8e17f21ec7037-1683799247.png',
    avatar: BlodeAvatar,
    title: 'BladeDAO',
    chainId: 324,
    tokenName: 'BLADE',
    // upcomingLink: routes.launchpad.bladeDao,
    // liveLink: routes.launchpad.bladeDao,
    projectInfo: [
      {
        title: 'what is BladeDao?',
        info: [
          'BladeDAO is a decentralized on-chain game ecosystem built on zkSync Era by degens, for degens. The first medieval themed idle dungeon game, Legends of Valoria (LOV), featuring PvE and PvP gameplay, is set to release in late June.',
          'BladeDAO aims to build/publish a series of crypto games with on-chain elements and applied zero knowledge proofs to explore the new frontier of fun. We aim to use applied ZKP in 1) verifiable randomness; 2) hidden information; 3) scalability to create novel game mechanisms in a user- friendly way.'
        ]
      },
      {
        title: 'what is $BLADE tokennomics?',
        info: [
          'The $BLADE tokenomics borrow from the positive ecosystem circulation like $vecrv, where $BLADE will serve as the utility token to boost yield stream for each crypto game published on BladeDAO. $veblade token holders enjoy a tax-like return on all in-game economic activities.'
        ]
      },
      {
        title: 'Is BladeDAO’s Team Anon or Public?',
        info: [
          'The team comes from a variety of backgrounds of game developer, defi builder, smart contract developer, economic research, crypto media and zkp researcher.',
          'The founder 0xBrawler previously built a crypto media company in Asia, and served as advisor for a few crypto game studios in the region. The team has plans to dox themselves overtime.'
        ]
      },
      {
        title: 'What about Investment and Partners?',
        info: [
          'The team raised a small round from angel investors and degen groups for game development and working capital.'
        ]
      }
    ],
    tokenMetrics: [
      {
        title: 'Key Features and Highlights',
        info: [
          'The Ondo Finance Protocol ("Ondo") is an open and decentralized investment bank. Ondo enables and facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs, institutional and retail.Ondo is based upon three core principles:Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI) for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters (capital supply) to provide liquidity for their native token, users can easily trade these tokens in decentralized exchanges.Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum without incentives.Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating DeFi protocols and repackaging their exposures using traditional finance techniques.'
        ]
      }
    ],
    desc: 'BladeDAO is a decentralized on-chain game ecosystem built on zkSync Era by degens, for degens. The first medieval themed idle dungeon game, Legends of Valoria (LOV), featuring PvE and PvP gameplay, is set to release in late June.',
    // desc: '',
    social: [
      <Link key={1} href="https://www.bladedao.games/" target="_blank">
        <Web />
      </Link>,
      <Link key={2} href="https://t.me/bladedao_real" target="_blank">
        <img src={Telegram} width={40} />
      </Link>,
      <Link key={3} href="https://twitter.com/blade_dao" target="_blank">
        <Twitter />
      </Link>,
      <Link key={4} href="https://discord.gg/BladeDAO" target="_blank">
        <DiscordSVG />
      </Link>
    ],
    detailSocial: [
      <Link key={1} href="https://www.bladedao.games/" target="_blank">
        <SocialBg>
          <WebWhite />
        </SocialBg>
      </Link>,
      <Link key={2} href="https://t.me/bladedao_real" target="_blank">
        <SocialBg>
          <TgSvg />
        </SocialBg>
      </Link>,
      <Link key={3} href="https://twitter.com/blade_dao" target="_blank">
        <SvgTwitterBlue>
          <TwitterWhite />
        </SvgTwitterBlue>
      </Link>,
      <Link key={4} href="https://discord.gg/BladeDAO" target="_blank">
        <SocialBg>
          <DiscordSvg />
        </SocialBg>
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$BLADE' },
      { title: 'Token Price', content: '0.000833 ETH' },
      { title: 'Total Value', content: '350ETH' },
      { title: 'Blockchain', content: 'zkSync Era' }
    ]
  },
  {
    keyId: 4,
    liveTimeStamp: {
      start: 1684679400000,
      end: 1684807200000
    },
    showStartEnd: true,
    poolTypeName: 'Playable Auction',
    img: 'https://images-v3.bounce.finance/141976585869e842d9b8e17f21ec7037-1683799247.png',
    avatar: BlodeAvatar,
    title: 'BladeDAO',
    chainId: 324,
    tokenName: 'BLADE',
    // upcomingLink: routes.game.bladeDaoIndex,
    // liveLink: routes.game.bladeDaoIndex,
    projectInfo: [
      {
        title: 'what is BladeDao?',
        info: [
          'BladeDAO is a decentralized on-chain game ecosystem built on zkSync Era by degens, for degens. The first medieval themed idle dungeon game, Legends of Valoria (LOV), featuring PvE and PvP gameplay, is set to release in late June.',
          'BladeDAO aims to build/publish a series of crypto games with on-chain elements and applied zero knowledge proofs to explore the new frontier of fun. We aim to use applied ZKP in 1) verifiable randomness; 2) hidden information; 3) scalability to create novel game mechanisms in a user- friendly way.'
        ]
      },
      {
        title: 'what is $BLADE tokennomics?',
        info: [
          'The $BLADE tokenomics borrow from the positive ecosystem circulation like $vecrv, where $BLADE will serve as the utility token to boost yield stream for each crypto game published on BladeDAO. $veblade token holders enjoy a tax-like return on all in-game economic activities.'
        ]
      },
      {
        title: 'Is BladeDAO’s Team Anon or Public?',
        info: [
          'The team comes from a variety of backgrounds of game developer, defi builder, smart contract developer, economic research, crypto media and zkp researcher.',
          'The founder 0xBrawler previously built a crypto media company in Asia, and served as advisor for a few crypto game studios in the region. The team has plans to dox themselves overtime.'
        ]
      },
      {
        title: 'What about Investment and Partners?',
        info: [
          'The team raised a small round from angel investors and degen groups for game development and working capital.'
        ]
      }
    ],
    tokenMetrics: [
      {
        title: 'Key Features and Highlights',
        info: [
          'The Ondo Finance Protocol ("Ondo") is an open and decentralized investment bank. Ondo enables and facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs, institutional and retail.Ondo is based upon three core principles:Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI) for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters (capital supply) to provide liquidity for their native token, users can easily trade these tokens in decentralized exchanges.Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum without incentives.Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating DeFi protocols and repackaging their exposures using traditional finance techniques.'
        ]
      }
    ],
    desc: 'BladeDAO is a decentralized on-chain game ecosystem built on zkSync Era by degens, for degens. The first medieval themed idle dungeon game, Legends of Valoria (LOV), featuring PvE and PvP gameplay, is set to release in late June.',
    // desc: '',
    social: [
      <Link key={1} href="https://www.bladedao.games/" target="_blank">
        <Web />
      </Link>,
      <Link key={2} href="https://t.me/bladedao_real" target="_blank">
        <img src={Telegram} width={40} />
      </Link>,
      <Link key={3} href="https://twitter.com/blade_dao" target="_blank">
        <Twitter />
      </Link>,
      <Link key={4} href="https://discord.gg/BladeDAO" target="_blank">
        <DiscordSVG />
      </Link>
    ],
    detailSocial: [
      <Link key={1} href="https://www.bladedao.games/" target="_blank">
        <SocialBg>
          <WebWhite />
        </SocialBg>
      </Link>,
      <Link key={2} href="https://t.me/bladedao_real" target="_blank">
        <SocialBg>
          <TgSvg />
        </SocialBg>
      </Link>,
      <Link key={3} href="https://twitter.com/blade_dao" target="_blank">
        <SvgTwitterBlue>
          <TwitterWhite />
        </SvgTwitterBlue>
      </Link>,
      <Link key={4} href="https://discord.gg/BladeDAO" target="_blank">
        <SocialBg>
          <DiscordSvg />
        </SocialBg>
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$BLADE' },
      { title: 'Token Price', content: '0.000833 ETH' },
      { title: 'Total Value', content: '150ETH' },
      { title: 'Blockchain', content: 'zkSync Era' }
    ]
  }
]
