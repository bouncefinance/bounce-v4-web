import { Box, Typography, Link } from '@mui/material'
import Weave1 from '../imgs/Weave1.png'
import Weave2 from '../imgs/Weave2.png'
import Weave3 from '../imgs/Weave3.png'
import { IPrivatePadProp, IProjectInfo } from '../PrivatePadDataList'
import { routes } from 'constants/routes'
import { ReactComponent as Web } from 'assets/imgs/auction/round-icon-web.svg'
import { ReactComponent as Twitter } from 'assets/imgs/auction/round-icon-twitter.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/profile/links/discord.svg'
const Weave6ProjectInfo: IProjectInfo[] = [
  {
    title: 'What is Weave6?',
    info: [
      <Box key={1}>
        <Typography>
          Weave6 is an omnichain asset trading infrastructure that incorporates an indexer, marketplace, and launchpad
          to form a one-stop access for dApps and users to launch, mint, and trade omnichain assets (NFT&Inscription).
        </Typography>
        <Typography sx={{ marginTop: 15 }}>
          By leveraging the cross-chain and Omnichain standard infrastructure, users on Weave6 can manage their
          multi-chain assets with a chain-agnostic, seamless experience. dApps on Weave6 can launch their Omnichain NFT
          and inscription assets with cross-chain interoperability.
        </Typography>
      </Box>
    ]
  },
  {
    title: 'Highlight Features of Weave6',
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
          MultiChain Trading and Launching Platforms for Omnichain Assets:
        </Typography>
        <ul>
          <li>
            Officially supported by ZetaChain, Weave6 is the first and, currently, the only platform for trading and
            launching omnichain assets (NFTs and Inscriptions) on ZetaChain.
          </li>
          <li>
            Multi-Chain Compatibility: Weave6 already supports trading and launching for EVM, Solana, and Ordinals NFTs
            and Inscriptions. It is also collaborating with ZetaChain to establish a standard for launching Omnichain
            assets.
          </li>
          <li>The Weave6 platform boasts over 30,000 trading users.</li>
        </ul>
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          Focus on BTC Ecosystem Assets, Aligned with ZetaChain’s Technical Roadmap:
        </Typography>
        <ul>
          <li>Developing the first-ever decentralized indexer for BTC ecosystem assets.</li>
          <li>
            Building an open protocol standard to facilitate cross-chain transfers of BTC ecosystem and NFT assets.
          </li>
        </ul>
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          ZetaChain: The Vanguard of Cross-Chain Messaging and Omnichain Standards:
        </Typography>
        <Typography sx={{ marginTop: 15, marginBottom: 15 }}>
          Already listed on OKX and Coinbase, ZetaChain is known for its unique cross-chain messaging system and
          Omnichain Standard. ZetaChain represents a more integrated and native approach to cross-chain functionality,
          designed to be inherently interoperable across multiple blockchains. It enables native cross-chain
          interoperability, meaning assets can exist and be recognized on multiple chains without the need for
          transferring or locking/unlocking. This allows for the seamless transfer and management of assets across
          various chains.
        </Typography>
        <img style={{ width: '100%', height: '100%' }} src={Weave1} />
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
        <p style={{ fontWeight: 500 }}>Total Supply = 1,000,000,000</p>
        <ul>
          <li>Seed: 2%</li>
          <li>Private SaleA: 3%</li>
          <li>Private SaleB: 5%</li>
          <li>Public Sale: 10%</li>
          <li>Liquidity: 5%</li>
          <li>Partnerships: 10%</li>
          <li>Reserves: 50%</li>
          <li>Team: 15%</li>
        </ul>
        <img style={{ width: '100%', height: '100%' }} src={Weave2} />
      </Box>
    ]
  },
  {
    title: 'Roadmap',
    info: [
      <Box key={1}>
        <img style={{ width: '100%', height: '100%' }} src={Weave3} />
      </Box>
    ]
  }
  // {
  //   title: 'Investment and Partners',
  //   info: [
  //     <Box key={1}>
  //       <Typography>
  //         Investors: ZetaChain, Zhen Cao: Partner of Republic crypto, Xi Li: Managing partner of LD Capital, Qinwen:
  //         Council member of polkadot & web3 foundation, Lucia Zhang: Partner of Arcanum Capital
  //       </Typography>
  //       <Typography>Partners: ZetaChain, Inception, Dao Maker, Chain GPT, Poolz.Finance,</Typography>
  //       <Typography>Partners: ZetaChain, Inception, Dao Maker, Chain GPT, Poolz.Finance,</Typography>
  //     </Box>
  //   ]
  // }
]
const Weave6Social = [
  <Link key={0} href="https://www.weave6.com/" target="_blank">
    <Web />
  </Link>,
  <Link key={6} href="https://twitter.com/weave6official" target="_blank">
    <Twitter />
  </Link>,
  <Link key={7} href="https://discord.com/invite/3xE2tumaeE" target="_blank">
    <DiscordSVG />
  </Link>
]
const Weave6FixedSwapData: IPrivatePadProp = {
  // backedId: 18744,
  keyId: 31,
  liveTimeStamp: {
    start: 1708574400000,
    end: 1708747200
  },
  hideUpcomingCountdown: true,
  poolTypeName: 'Fixed Price - Whitelist',
  img: 'https://images-v3.bounce.finance/419abe7450671fc9159b9c293d9dae56-1708506572.png',
  avatar: 'https://images-v3.bounce.finance/419abe7450671fc9159b9c293d9dae56-1708506572.png',
  title: 'Weave6',
  chainId: 1,
  tokenName: '$WX',
  whitePaperLink: 'https://docsend.com/view/tjr9cvfdf67czawy',
  upcomingLink: routes.thirdPart.WeaveFixedSwap,
  liveLink: routes.thirdPart.WeaveFixedSwap,
  projectInfo: Weave6ProjectInfo,
  tokenMetrics: [],
  desc: 'Weave6 is an omnichain asset trading infrastructure that incorporates an indexer, marketplace, and launchpad to form a one-stop access for dApps and users to launch, mint, and trade omnichain assets (NFT&Inscription).',
  social: Weave6Social,
  moreData: [
    { title: 'Token Name', content: '$WX' },
    { title: 'Token Price', content: '0.015 USDT' },
    { title: 'Token Amount', content: '6666666.7' },
    { title: 'Blockchain', content: 'Ethereum' }
  ]
}
export default Weave6FixedSwapData
