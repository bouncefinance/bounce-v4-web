import { routes } from 'constants/routes'
import { IPrivatePadProp, IProjectInfo } from '../PrivatePadDataList'
import XrgbAvatar from '../avatar/xrgb.png'
import { Box, Link, Stack } from '@mui/material'
import { ReactComponent as Web } from 'assets/imgs/auction/round-icon-web.svg'
import { ReactComponent as Twitter } from 'assets/imgs/auction/round-icon-twitter.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/profile/links/discord.svg'
import Telegram from 'assets/imgs/common/Telegram.png'
const GithubSvg = (
  <svg
    height="40"
    aria-hidden="true"
    viewBox="0 0 16 16"
    version="1.1"
    width="40"
    data-view-component="true"
    className="octicon octicon-mark-github v-align-middle color-fg-default"
  >
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
  </svg>
)
const XRGBSocial = [
  <Link key={0} href="https://www.xrgb.xyz/" target="_blank">
    <Web />
  </Link>,
  <Link key={6} href="https://twitter.com/XRGB404" target="_blank">
    <Twitter />
  </Link>,
  <Link key={7} href="https://discord.gg/9zYEZwBY9H" target="_blank">
    <DiscordSVG />
  </Link>,
  <Link key={9} href="https://t.me/xrgbchain_office" target="_blank">
    <img src={Telegram} width={40} />
  </Link>,
  <Link key={8} href="https://github.com/XRGB" target="_blank">
    {GithubSvg}
  </Link>
]
const XRGBLPProjectInfo: IProjectInfo[] = [
  {
    title: 'What is XRGB?',
    info: [
      <Stack key={0}>
        <p>XRGB is dedicated to enhancing both the liquidity and the utility of assets within the BTC ecosystem.</p>
        <p>
          Our vision is to provide a comprehensive, one-stop service for users in the BTC ecosystem, facilitating
          seamless interactions and transactions, fostering a vibrant and integrated financial environment, and
          unlocking the full potential of digital assets within the Bitcoin framework.
        </p>
        <p>Core Features:</p>
        <ul>
          <li>Open-Source messaging protocol for every BTC layer 2</li>
          <li>Interoperable applications for BTC ecosystem</li>
          <li>Cross-Chain BRC-404 assets powered by RGB infrastracture</li>
        </ul>
        <p>XRGB comprises two principal elements: the protocol and the blockchain.</p>
        <p>
          The XRGB protocol serves as an interoperability framework specifically crafted for Bitcoin and ERC404 assets.
          Its primary objective is to augment the liquidity and efficiency of Bitcoin assets through decentralized
          message passing and a fluid transfer mechanism.
        </p>
        <p>
          On the other hand, the XRGB chain, built on the XRGB protocol, incorporates the advanced transactional privacy
          features of the RGB protocol. It aims to establish itself as the definitive layer2 solution for Bitcoin DeFi,
          emphasizing scalability and privacy. In doing so, it seeks to nurture a dynamic environment for asset
          liquidity.
        </p>
      </Stack>
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
        <p style={{ fontWeight: 500 }}>Total Supply = 210,000,000</p>
        <ul>
          <li>Public Sale: 5% TGE 100% across two platforms</li>
          <li>Private Sale: 2.5% TGE 0% 12 month linear vesting</li>
          <li>Community Incentive: 50% Distribute after mainnet</li>
          <li>Ecosystem: 17.5% TGE 10% 12 month linear vesting</li>
          <li>Marketing Reserve: 10% CEX listing, KOL payment and so on</li>
          <li>LP: 5% </li>
          <li>Team: 10% TGE 0% 24 month linear vesting</li>
        </ul>
        <div>
          <img width={'100%'} src="/imgs/xrgb-tokenomics.png" />
        </div>
        <p>
          Link:{' '}
          <Link color={'#000'} href="https://docs.xrgb.xyz/xrgb/xrgb-token" target="_blank">
            https://docs.xrgb.xyz/xrgb/xrgb-token
          </Link>
        </p>
      </Box>
    ]
  },
  {
    title: 'Roadmap',
    info: [
      <Stack key={0} sx={{ '& h5': { mb: 5 } }}>
        {/* <p>As depicted in the diagram, the SatoshiVM chain comprises three layers:</p> */}
        <div>
          <h4>2023 Q2 XRGB web wallet</h4>
          <p>Support social login, BTC, BRC20, RGB20, etc.</p>
        </div>
        <div>
          <h4>2024 Q1 XRGB Protocol</h4>
          <p>More assets supported: Ordinals, RGB21, SRC20, ARC20, etc</p>
        </div>
        <div>
          <h4>2024 Q2 XRGB Mainnet Launch</h4>
          <p>Android & IOS version</p>
        </div>
        <div>
          <h4>2024 Q3 XRGB Phone&Mobile Wallet</h4>
          <p>Integrate more DeFi, NFT, and naming protocols</p>
        </div>
        <div>
          <h4>2024 Q4 XRGB USB</h4>
          <p>XRGB universal star bridge connect Bitcoin ecosystem and other L1 blockchains</p>
        </div>
        <p>
          Link:{' '}
          <Link color={'#000'} href="https://docs.xrgb.xyz/xrgb/roadmaps" target="_blank">
            https://docs.xrgb.xyz/xrgb/roadmaps
          </Link>
        </p>
      </Stack>
    ]
  }
]
const XRGBRandomSelection: IPrivatePadProp = {
  backedId: 18832,
  keyId: 33,
  liveTimeStamp: {
    start: 1708430400000,
    end: 1708516800000
  },
  // hideUpcomingCountdown: true,
  poolTypeName: 'Fixed Price - Random Selection',
  img: 'https://images-v3.bounce.finance/833948ad4292b4bda411cc5cca82d168-1708070668.png',
  avatar: XrgbAvatar,
  title: 'XRGB Chain',
  chainId: 1,
  tokenName: '$XRGB',
  whitePaperLink: 'https://docs.xrgb.xyz/',
  upcomingLink: routes.thirdPart.XrgbRandomSelection,
  liveLink: routes.thirdPart.XrgbRandomSelection,
  projectInfo: XRGBLPProjectInfo,
  tokenMetrics: [],
  desc: `XRGB is dedicated to enhancing both the liquidity and the utility of assets within the BTC ecosystem.
  Our vision is to provide a comprehensive, one-stop service for users in the BTC ecosystem, facilitating seamless interactions and transactions, fostering a vibrant and integrated financial environment, and unlocking the full potential of digital assets within the Bitcoin framework.`,
  social: XRGBSocial,
  moreData: [
    { title: 'Token Name', content: '$XRGB' },
    { title: 'Token Price', content: '0.00001641 ETH' },
    { title: 'Token Amount', content: 'TBD' },
    { title: 'Blockchain', content: 'Ethereum' }
  ]
}
export default XRGBRandomSelection
