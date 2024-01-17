/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Link,
  styled,
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper
} from '@mui/material'
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
import { ReactComponent as InstagramSvg } from 'assets/imgs/profile/links/instagram.svg'
import { ReactComponent as LinkinSvg } from 'assets/socialLinksIcon/linkin.svg'

import BlodeAvatar from './avatar/blade-icon.ico'
import EquilibriaAvatar from './avatar/equilibria-logo.png'
import poseiswapAvatar from './avatar/poseiswap.jpeg'
import typeltpAvatar from './avatar/typelt.png'
import LasmetAvatar from './avatar/lasmet-avatar.png'
import DeelanceAvatar from './avatar/deelance-avatar.jpg'
import OpenfabricaiAvatar from './avatar/openfabricai-avatar.jpg'
import LasMetaTokenomic from './imgs/LasMeta-Tokenomic.jpg'
import DeelanceTokenomics from './imgs/Deelance-Tokenomics.png'
import DeelanceInvestment from './imgs/deelance-investment.jpg'
import OpenfabricToken from './imgs/Openfabric-Token.png'
import DeelanceRevenue from './imgs/deelance-revenue.jpeg'
// import MetaBlox from './imgs/metablox.png'
// import MetaBloxAvatar from './avatar/metabloxAva.jpeg'
import DipImg from './imgs/dip-img.png'
import DipAvatar from './avatar/dip.jpg'
import SolaceImg from './imgs/solace.png'
import SolaceAvatar from './imgs/solace-na.png'
import CreateProtocolAvatar from './imgs/Create_Protocol_na.jpg'
import { ChainId } from 'constants/chain'
import { routes } from 'constants/routes'
import CreateProtocol from './imgs/CreateProtocol.png'
import CreateProtocolPage from './imgs/CreateProtocolPage.jpg'
// import Finceptor from './imgs/Finceptor.png'
import FinceptorAvatar from './imgs/Finceptor_Avatar.jpeg'
import MultibitContent1 from './imgs/multibit-content1.png'
import MultiBitAva from './imgs/multi-bit-ava.png'
import MultibitBanner from './imgs/multibit-banner.png'
import BitStableInfo from './imgs/BitStable-info.png'
import BitStableLogo from './imgs/Bitstabe-logo.png'
import DIDNa from './imgs/did-na.png'
// import GoDIDTokenomics from './imgs/GoDID-Tokenomics.png'
import AiMeetsBtcImg from './imgs/ai-meets-btc.jpg'
import AiMeetsBtsAvatar from './imgs/ai-meets-bts-avatar1.jpg'
import PORT3Tokenomics from './imgs/PORT3-Tokenomics.jpg'
import port3Investment from './imgs/port3Investment.jpg'
import Port3Logo from './imgs/port3Logo.png'
import LadderImg from './imgs/ladder.png'
import BitSwapImage1 from './imgs/BitSwap-image1.png'
import LadderImg1 from './imgs/ladder-img1.png'
import SatoshivmImg from './imgs/satoshivm.jpg'
import satoshiVmArchitecture from './imgs/satoshiVmArchitecture.jpeg'
export interface IProjectInfo {
  title: string
  info: (string | JSX.Element)[]
}
export interface IMultipleTokenInfo {
  title: string
  social: JSX.Element[]
}
export interface IPrivatePricesInfo {
  title: string | string[]
  value: (string | JSX.Element)[] | (string | JSX.Element)
}
export interface IOtherProject {
  title: string
  tabList: IProjectInfo[]
}
export interface IPrivatePadProp {
  hidden?: true
  backedId?: number
  keyId: number
  liveTimeStamp: {
    start: number
    end: number
  }
  showStartEnd?: true
  hideUpcomingCountdown?: true
  poolTypeName: string
  img: string
  pageInImg?: string
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
  privatePrices?: IPrivatePricesInfo[]
  isFAQ?: boolean
  poolTypeName2?: string
  otherProject?: IOtherProject[]
  multipleTokenInfo?: IMultipleTokenInfo
}

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
const participateProjectInfo: IProjectInfo = {
  title: 'How to Participate',
  info: [
    <a
      key={1}
      href="https://docs.bounce.finance/auction-user-guide/fixed-price-auction-guides/participate-in-a-fixed-price-auction"
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: 'underline', color: 'gray' }}
    >
      https://docs.bounce.finance/auction-user-guide/fixed-price-auction-guides/participate-in-a-fixed-price-auction
    </a>
  ]
}
const DipProjectInfo: IProjectInfo[] = [
  {
    title: 'What is DIP Exchange?',
    info: [
      'DIP Exchange is a decentralized perpetual exchange that aims to be the go-to platform for traders looking for a professional risk management environment and a fully decentralized governance mechanism. It offers a number of features that make it stand out from other decentralized exchanges, including:',
      <ul key={1}>
        <li>
          <strong>Strong ecosystem:</strong> DIP Exchange is built on top of the Base blockchain, which gives it access
          to a wide range of decentralized applications and services. This allows traders to easily access liquidity and
          other resources, such as price feeds and oracles.
        </li>
        <li>
          <strong>Full decentralization:</strong> DIP Exchange is fully decentralized, meaning that it is not subject to
          the control of any single entity. This makes it more resistant to censorship and gives traders more control
          over their funds.
        </li>
        <li>
          <strong>Fair governance: </strong> DIP Exchange is governed by a DAO, which is a decentralized autonomous
          organization. This means that the platform is controlled by its users, who can vote on proposals to change the
          platform's rules.
        </li>
        <li>
          <strong>Risk management for LP holders:</strong> DIP Exchange offers a number of features to help reduce the
          risk for liquidity providers. These features include different pools of Senior/Mezzanine/Junior Tranches,
          which offer different levels of risk and reward.
        </li>
        <li>
          <strong>High flexibility of leverage trading: </strong> DIP Exchange supports up to 50x leverage, which allows
          traders to magnify their profits or losses. This makes it a good platform for traders who are looking to take
          on more risk in order to potentially earn higher returns.
        </li>
        <li>
          <strong>Multiple benefits: </strong> DIP Exchange offers a number of benefits to its users, including
          liquidity rewards, DIP token rewards, and access to a variety of trading tools and features.
        </li>
        <li>
          <strong>Creation of Perpetual Liquidity Pools: </strong> DIP V2 aims to offer projects and liquidity providers
          to freely create liquidity pools with open interest limits.
        </li>
      </ul>,
      `Overall, DIP Exchange is a promising new decentralized exchange that offers a number of features that make it a good choice for traders who are looking for a professional risk management environment and a fully decentralized governance mechanism.`
    ]
  },
  // {
  //   title: 'DIP Rules',
  //   info: [
  //     <Stack flexDirection={'column'} gap={10} key={1}>
  //       <Typography sx={{ fontSize: 20, fontWeight: 800 }}>DIP ERC20 English Auction</Typography>
  //       <Typography>
  //         The ERC20 English Auction is a type of English auction optimized for ERC20. The creator can set the highest
  //         and lowest prices for the auction, and the auction will start at the lowest price, gradually increasing based
  //         on the number of auctioned tokens. The auction will not end until the sale is completed or the arrival time is
  //         reached.
  //       </Typography>
  //       <Typography mt={15}>DIP ERC20 English Auction details are as follows:</Typography>
  //       <ul style={{ marginTop: 10 }}>
  //         <li>Bid Asset: $USDT</li>
  //         <li>Starting Price (lowest prices): Preset by DIP DAO</li>
  //         <li>Highest Price: Preset by DIP DAO</li>
  //         <li>Auction Price: Current price of purchase (The earlier you participate, the lower the price)</li>
  //         <li>Auction Close: Within 24 hours or when token sold out.</li>
  //         <li>Distribution: Immediate after the closing of the auction, need to claim on Bounce</li>
  //       </ul>
  //     </Stack>
  //   ]
  // },
  {
    title: 'DGT Rules',
    info: [
      <Stack flexDirection={'column'} gap={10} key={1}>
        <Typography sx={{ fontSize: 20, fontWeight: 800 }}>DGT ERC20 Dutch Auction</Typography>
        <Typography>
          A Dutch Auction, also known as descending price auction, refers to a type of auction in which an auctioneer
          starts with a very high price, incrementally lowering the price until someone places a bid. The first bid wins
          the auction, assuming the price is above the reserve price, avoiding any bidding wars.
        </Typography>
        <Typography mt={15}>DGT ERC20 Dutch Auction details are as follows:</Typography>
        <ul style={{ marginTop: 10 }}>
          <li>Bid Asset: $DIP</li>
          <li>Starting Price: Preset by DIP DAO in DIP/DGT</li>
          <li>Floor Price: Preset by DIP DAO in DIP/DGT</li>
          <li>Clearing Price: Decreases linearly throughout the auction period.</li>
          <li>Auction Close: Within 24 hours or when token price reach the ceiling price.</li>
          <li>Distribution: Immediate after the closing of the auction at clearing price, need to claim on Bounce.</li>
          <li>Burn: If the auction ends successfully, $DIP will be burned by DIP DAO.</li>
          <li>
            Refund: If the last bidder's contribution exceed the ceiling price, it is fully refunded. If the last bidder
            enters an DIP amount larger than the amount sold, the unused DIP will be refunded.
          </li>
        </ul>
      </Stack>
    ]
  },
  participateProjectInfo
]
const DipTokenMetrics: IProjectInfo[] = [
  // {
  //   title: 'DIP Token',
  //   info: [
  //     <Box key={0} sx={{ display: 'flex', gap: 5, flexDirection: 'column' }}>
  //       <Typography>
  //         <strong>Token Name: </strong> DIP Token
  //       </Typography>
  //       <Typography>
  //         <strong>Token Ticker: </strong> DIP
  //       </Typography>
  //       <Typography>
  //         <strong>Total Supply: </strong> 1,000,000,000
  //       </Typography>
  //       <Typography>
  //         <strong>Token Release: </strong> TBA
  //       </Typography>
  //       <Typography>
  //         <strong>Contract Address: </strong> TBA
  //       </Typography>
  //       <Typography>
  //         DIP is the utility token and the backbone of DIP Exchange. DIP provides multiple benefits within the platform
  //         and can only be earned through LP staking and trading participation.
  //       </Typography>
  //     </Box>,
  //     <>
  //       <strong>Benefits of DIP</strong>
  //       <ul>
  //         <li>Stake to earn LP tokens. 10% of protocol revenue is rewarded to DIP stakers in LP tokens.</li>
  //         <li>Burn to get DGT tokens through weekly dutch auction process.</li>
  //         <li>Pay discounted fees in DIP and burn (TBD by DIP DAO)</li>
  //         <li>Collateralize and add liquidity to place trade positions (TBD by DIP DAO)</li>
  //       </ul>
  //     </>,
  //     <Box key={1} sx={{ '& a': { color: 'rgba(52,109,219,1.00)' } }}>
  //       <strong>How to earn DIP</strong>
  //       <ul key={1}>
  //         <li>
  //           Provide liquidity in any of the LP tokens, rewarding the highest yield to the portion with the highest risk
  //           (check
  //           <a href="https://app.dip.exchange/#/earn"> https://app.dip.exchange/#/earn </a>
  //           for further details).
  //         </li>
  //         <li>Participate in the referral programs and invite new traders to the platform.</li>
  //         <li>Trade frequently and win trading competitions.</li>
  //       </ul>
  //     </Box>,
  //     <>
  //       <strong>How to earn DIP</strong>
  //       <Box sx={{ '& .MuiTableCell-root': { color: 'white', borderDottom: 'rgb(227, 232, 237)' } }}>
  //         <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>Allocation</TableCell>
  //               <TableCell>Amount</TableCell>
  //               <TableCell>Percentage</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {[
  //               { Allocation: 'Liquidity Providers', Amount: '350,000,000', Percentage: '35%' },
  //               { Allocation: 'Trader Incentive', Amount: '350,000,000', Percentage: '35%' },
  //               { Allocation: 'DIP DAO', Amount: '100,000,000', Percentage: '10%' },
  //               { Allocation: 'Team', Amount: '190,000,000', Percentage: '19%' },
  //               { Allocation: 'Liquidity', Amount: '10,000,000', Percentage: '1%' }
  //             ].map(row => (
  //               <TableRow key={row.Allocation} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
  //                 <TableCell align="left">{row.Allocation}</TableCell>
  //                 <TableCell align="left">{row.Amount}</TableCell>
  //                 <TableCell align="left">{row.Percentage}</TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </Box>
  //     </>,
  //     <Box key={2} sx={{ '& a': { color: 'rgba(52,109,219,1.00)' } }}>
  //       <strong>DIP Distribution Schedule</strong>
  //       <ul key={1}>
  //         <li>
  //           <a href="https://dip-exchange.gitbook.io/dip/getting-started/how-to-start/for-lps">Liquidity Providers </a>
  //           Liquidity Providers are those that provide liquidity in DIP/FTM, Snr DLP, Mezz DLP and Jnr DLP. The
  //           allocation is distributed on a daily basis across 4 years as additional incentives to the portion of trading
  //           fees earned.
  //         </li>
  //         <li>
  //           <a href="https://dip-exchange.gitbook.io/dip/getting-started/how-to-start/for-traders">
  //             {' '}
  //             Trader Incentive{' '}
  //           </a>
  //           is budget set aside to incentivize traders who act as a counterparty to liquidity providers. Such reserves
  //           are expected to be spent through
  //           <a href="https://dip-exchange.gitbook.io/dip/fundamentals/roadmap/trade-mining-program">
  //             {' '}
  //             trade mining program
  //           </a>
  //           <a href="https://dip-exchange.gitbook.io/dip/fundamentals/roadmap/referral-system"> referral system </a>
  //           and
  //           <a href="https://dip-exchange.gitbook.io/dip/tokenomics/dip-token"> leaderboard</a>. The allocation is
  //           unlocked across 4 years with the budget controlled by the DIP DAO.
  //         </li>
  //         <li>
  //           <a href="https://dip-exchange.gitbook.io/dip/governance/dip-dao"> DIP DAO </a> is allocated to the
  //           <a href="https://dip-exchange.gitbook.io/dip/governance/dao-treasury"> DAO treasury </a>, set aside to
  //           insure the liquidity pools in the case of default. Its DIP allocation will be auctioned through
  //           <a href="https://dip-exchange.gitbook.io/dip/tokenomics/auctions/dip-fixed-price-auction">
  //             {' '}
  //             DIP Fixed-Price Auction{' '}
  //           </a>
  //           or sold to strategic investors who wish to take vested exposure in the DIP Ecosystem. All funds collected
  //           will be held in the DAO treasury and controlled by DGT stakers. The allocation is vested across 4 years on a
  //           daily basis.
  //         </li>
  //         <li>
  //           <a href="https://dip-exchange.gitbook.io/dip/fundamentals/core-team"> Team </a>allocation is set to
  //           incentivise core developers and supporters. DIP tokens are vested across 4 years on a monthly basis. Only
  //           the unlocked team allocation can be used to earn DGT.
  //         </li>
  //         <li>
  //           Liquidity is a small allocation set aside which is fully unlocked to provide sufficient liquidity from day
  //           1. The allocation will be fully unlocked and be provided as DIP/FTM LP on Spookyswap.
  //         </li>
  //       </ul>
  //     </Box>
  //   ]
  // },
  {
    title: 'DGT Token',
    info: [
      <Box key={0} sx={{ display: 'flex', gap: 5, flexDirection: 'column' }}>
        <Typography>
          <strong>Token Name: </strong> DIP Governance Token
        </Typography>
        <Typography>
          <strong>Token Ticker: </strong> DGT
        </Typography>
        <Typography>
          <strong>Total Supply: </strong> 1,000,000
        </Typography>
        <Typography>
          <strong>Token Release: </strong> TBA
        </Typography>
        <Typography>
          <strong>Contract Address: </strong> TBA
        </Typography>
        <Typography>
          DGT Token is a governance token that governs the
          <a href="https://dip-exchange.gitbook.io/dip/governance/dao-treasury"> DAO Treasury</a> . DIPʻs vision and
          motto is to make the DAO Treasury as transparent and fully controlled by the community.
        </Typography>
      </Box>,
      <Box key={1} sx={{ '& a': { color: 'rgba(52,109,219,1.00)' } }}>
        <strong>Benefits of DGT</strong>
        <ul>
          <li>Stake to earn LP tokens. 10% of protocol revenue is rewarded to DGT stakers in LP tokens.</li>
          <li>Voting for/against DAO proposals.</li>
          <li>
            Redeeming DGT for portion of the DAO Treasury on a fortnightly basis (burn DGT - get X% of the
            <a href="https://dip-exchange.gitbook.io/dip/governance/dao-treasury"> DAO Treasury </a>)
          </li>
        </ul>
      </Box>,
      <Box key={2} sx={{ '& a': { color: 'rgba(52,109,219,1.00)' } }}>
        <strong>How to earn DGT</strong>
        <ul>
          <li>
            <a href="https://dip-exchange.gitbook.io/dip/getting-started/how-to-start/for-dip-stakers"> Staking DIP </a>
            tokens in the DIP DAO.
          </li>
          <li>
            Participate in the <a href="https://dip-exchange.gitbook.io/dip/tokenomics/dgt-token"> DGT Auction </a>
            (burn DIP - get DGT)
          </li>
        </ul>
      </Box>,
      <>
        <strong>DGT Allocations</strong>
        <Box sx={{ '& .MuiTableCell-root': { color: 'white', borderDottom: 'rgb(227, 232, 237)' } }}>
          <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Allocation</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { Allocation: 'DIP Stakers', Amount: '750,000', Percentage: '75%' },
                { Allocation: 'Dutch Auction', Amount: '250,000', Percentage: '25%' }
              ].map(row => (
                <TableRow key={row.Allocation} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{row.Allocation}</TableCell>
                  <TableCell align="left">{row.Amount}</TableCell>
                  <TableCell align="left">{row.Percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </>,
      <Box key={3} sx={{ '& a': { color: 'rgba(52,109,219,1.00)' } }}>
        <strong>DGT Distribution Schedule</strong>
        <ul>
          <li>
            <a href="https://dip-exchange.gitbook.io/dip/getting-started/how-to-start/for-dip-stakers"> DIP Stakers </a>
            are rewarded DGT tokens on daily. DGT tokens are vested linearly across 4 years.
          </li>
          <li>
            <a href="https://dip-exchange.gitbook.io/dip/tokenomics/auctions/dgt-dutch-auction"> Dutch Auction </a> is
            conducted on a weekly basis where users - 4 years vesting, auctioned every week
          </li>
        </ul>
      </Box>
    ]
  },
  participateProjectInfo
]
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

export const Port3CapTable = () => {
  const tableData = [
    ['Kucoin (Lead)', 'EMURGO', 'DWF labs', '', 'Binance Labs'],
    ['Jump Crypto (Lead)', 'Adaverse', '', '', 'Aptos'],
    ['Galxe', 'metatech', '', '', 'MASK network'],
    ['Ankr', 'GALAXY REALM', '', '', 'Opside'],
    ['Mirror World', 'Automata Network', '', 'Huobi venture', 'Iotex'],
    ['Gametaverse', 'CSP DAO', '', 'PHD Capital', 'SpaceID'],
    ['Cogitent', 'gate labs', '', '', ''],
    ['Paramita Venture', 'evo invest', '', 'Zonff partners', ''],
    ['ViaBTC', 'bbs finance', '', 'Pontem', ''],
    ['Cryptonite', '', '', 'G20', ''],
    ['Lapin.digital', '', '', '', ''],
    ['Winkrypto', '', '', '', ''],
    ['block infinity', '', '', '', ''],
    ['Momentum6', '', '', '', ''],
    ['SNZ', '', '', '', '']
  ]
  return (
    <Box mt={20}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                '& .MuiTableCell-root': {
                  fontSize: 14,
                  fontWeight: 500,
                  padding: 8
                }
              }}
            >
              <TableCell>Invested 1st round</TableCell>
              <TableCell>Invested 2nd round</TableCell>
              <TableCell>Invested 3rd round</TableCell>
              <TableCell>Commitments</TableCell>
              <TableCell>Grants</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((arr, index) => (
              <TableRow
                key={index}
                sx={{
                  '& .MuiTableCell-root': {
                    padding: 8
                  }
                }}
              >
                {arr.map((text, i) => (
                  <TableCell key={i}>{text}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
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
    title: 'Pitch Deck',
    info: [
      <a
        key={1}
        style={{ textDecoration: 'underline' }}
        href="https://drive.google.com/file/d/1GxDTFbY_c1zC8H0mQREOQ2m4vU4G8YfO/view"
      >
        https://drive.google.com/file/d/1GxDTFbY_c1zC8H0mQREOQ2m4vU4G8YfO/view
      </a>
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
  },
  participateProjectInfo
]
export const PrivatePadCoinData: IPrivatePadProp = {
  keyId: 18,
  liveTimeStamp: {
    start: 1701230400000,
    end: 1701316800000
  },
  poolTypeName: 'Staking Auction',
  img: 'https://images-v3.bounce.finance/a01d5ff09f6faebd837acf62beaa9e29-1701055097.png',
  avatar: BitStableLogo,
  title: 'BitStable',
  chainId: 1,
  tokenName: '$BSSB',
  whitePaperLink: 'https://docs.bitstable.finance/',
  upcomingLink: '/launchpad/bitstable-staking',
  liveLink: '/launchpad/bitstable-staking',
  projectInfo: [
    {
      title: 'What is BitStable?',
      info: [
        <>
          The BitStable Protocol is the platform through which anyone, anywhere can generate the DAII stablecoin against
          bitcoin ecosystem collateral assets.
        </>
      ]
    },
    {
      title: 'How does BitStable work?',
      info: [
        <Box
          key={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            '&>div>em': { fontSize: 16 },
            '& em': {
              fontWeight: 600
            }
          }}
        >
          <Box>
            <em>BSSB Staking Rewards Explained</em>
            <ul>
              <li>
                <em>Staking Process: </em>Users stake DAII (a BRC20 token) to earn BSSB rewards.
              </li>
              <li>
                <em>Reward Structure:</em>A fixed daily reward of 0.1% is distributed for 365 days, based on the weight
                of each stake. Using BSSB can increase the weight of your staked DAII.
              </li>
            </ul>
          </Box>
          <Box>
            <em>Bridging and Token Conversion with MultiBit</em>
            <ul>
              <li>
                <em>DAII on Different Blockchains: </em> DAII minted on the Bitcoin blockchain can be converted to an
                ERC20 token on Ethereum.
              </li>
              <li>
                <em>Token Swapping:</em>DAII can be exchanged at a 1:1 ratio with stablecoins like USDC or USDT on the
                Ethereum network.
              </li>
              <li>
                <em>Partnership with MultiBit Bridge:</em>This enables cross-chain transfers between Bitcoin, Ethereum
                Virtual Machine (EVM) compatible networks, and other Layer 1 blockchains.
              </li>
              <li>
                <em>Redemption Process:</em>To retrieve collateral or USDT on Ethereum, users must redeem DAII on the
                BitStable platform, balancing out the original transaction.
              </li>
            </ul>
          </Box>
          <Box>
            <em>Overcollateralization and Liquidation Mechanics</em>
            <ul>
              <li>
                <em>Safe Overcollateralization Rate: </em> The BSSB protocol establishes a high overcollateralization
                rate to reduce liquidation risks, assuming a 50% ratio. This implies you receive DAII equal to 50% of
                your collateral's value.
              </li>
              <li>
                <em>Liquidation Plan:</em>Despite the high overcollateralization rate, a liquidation strategy is in
                place for safety, with the 'Health factor' serving as a reference metric.
              </li>
            </ul>
          </Box>
          <Box>
            <em>Stake and Liquidation Formula Example with ORDI</em>
            <ul>
              <li>
                <em>Calculating Overcollateralization for ORDI: </em> With an 80% ratio, the maximum DAII you can
                receive is 20% of the 'ORDI's value.
              </li>
              <li>
                <em>Health Factor Formula: </em>Health factor = [1 - (DAII value built / (ORDI quantity x Price)) + 0.2]
                x 100.
              </li>
              <li>
                <em>Example Calculations:</em>
                <ul>
                  <li>
                    If 1 ORDI = 100 USDT, staking it gets you 20 DAII. The Health factor is then calculated as 100.
                  </li>
                  <li>For building 10 DAII, the Health factor increases to 110.</li>
                  <li>If the ORDI price drops to 50 USDT, the Health factor decreases to 80.</li>
                  <li>A drop in ORDI price to 20 USDT brings the Health factor down to 20, triggering liquidation.</li>
                </ul>
                <img style={{ width: '100%', maxWidth: 600, margin: '0 auto', marginTop: 20 }} src={BitStableInfo} />
              </li>
            </ul>
          </Box>
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
          <ul>
            <li>Total Supply of $BSSB: 21,000,000</li>
            <li>Token Launch: 50% of Total Supply on Bounce Finance</li>
            <li>Total Raise Through Token Launch: 500,000 USDC</li>
            <li>Team Allocation: 5% (6-month lock and linear vesting for 15 months)</li>
            <li>Airdrop: 3.5%</li>
            <li>Staking Rewards: 36.5%</li>
            <li>LP: 5% (locked indefinitely)</li>
            <li>Total Supply of DAII: 1,000,000,000</li>
            <li>FDV=1,000,000 USDC</li>
          </ul>
        </Box>
      ]
    }
  ],
  tokenMetrics: [],
  desc: 'The BitStable Protocol is the platform through which anyone, anywhere can generate the DAII stablecoin against bitcoin ecosystem collateral assets.',
  social: [
    <Link key={0} href="https://bitstable.finance/" target="_blank">
      <Web />
    </Link>
  ],
  moreData: [
    { title: 'Token Name', content: '$BSSB' },
    // { title: 'Token Price', content: '0.0000233 ETH' },
    { title: 'Token Amount', content: '6,300,000' },
    { title: 'Blockchain', content: 'Ethereum' }
    // { title: 'Staking assets', content: '$AUCTION' }
  ]
}
export const PrivateStakeAuctionData: IPrivatePadProp = {
  keyId: 19,
  liveTimeStamp: {
    start: 1702645200000,
    end: 1702818000000
  },
  poolTypeName: 'Staking Auction',
  img: 'https://images-v3.bounce.finance/c704c4ef57b056a70039fe952a22bbd4-1702019109.png',
  avatar: DIDNa,
  title: 'GoDID',
  chainId: 1,
  tokenName: '$BDID',
  whitePaperLink: 'https://drive.google.com/file/d/1Iu3kLNxi97KkOqP1wz2-i2N_HBV0LRgn/view',
  upcomingLink: '/launchpad/godid-staking-auction',
  liveLink: '/launchpad/godid-staking-auction',
  projectInfo: [
    {
      title: 'What is GoDID?',
      info: [
        <Box
          key={1}
          sx={{
            '&>ul': { display: 'flex', flexDirection: 'column', gap: 10 },
            '&>ul>li>a': {
              color: 'gray',
              textDecoration: 'underline'
            }
          }}
        >
          <ul>
            <li>
              GoDID is a marketplace aggregator for decentralized identities(DIDs) that currently serves ENS, Space ID
              and Bitcoin Ordinals DIDs. It offers the most user-friendly and cost-effective ENS platform with diverse
              features, including the ENS module built using OpenSea’s Seaport contract. This module supports the full
              ENS lifecycle, encompassing search, registration, trading, and management.
            </li>
            <li>
              GoDID enhances the ENS user experience with various tools and leaderboards, such as Bid by Category,
              Premium Sniper, and cross-market listings. A standout feature is its comprehensive categorization system,
              featuring 144 distinct categories, which greatly facilitates user inquiries and trading activities. This
              focus on variety and practicality positions GoDID as a versatile and valuable resource in the
              decentralized identity market.
            </li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'What is BDID?',
      info: [
        <Box
          key={1}
          sx={{
            '&>ul': { display: 'flex', flexDirection: 'column', gap: 10 },
            '&>ul>li>a': {
              color: 'gray',
              textDecoration: 'underline'
            }
          }}
        >
          <ul>
            <li>
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>
              , incubated by{' '}
              <a href="https://godid.io/" target="_blank" rel="noreferrer">
                godid.io
              </a>{' '}
              , specializes in the registration, transaction, and management of Ordinals Decentralized Identifiers
              (DIDs). The platform is uniquely positioned to support a wide array of mainstream DIDs within the Ordinals
              ecosystem, such as .sats, .bitmap, .btc, among others.{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              is dedicated to carving out a niche as the most proficient and specialized platform in the Ordinals DIDs
              arena.
            </li>
            <li>
              As it looks toward the future,{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              plans to lead the development of innovative derivatives for the Ordinals DIDs ecosystem. This initiative
              aims to boost the circulation and value of Ordinals DIDs. Moreover,{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              is committed to bridging the gaps between various DID protocols on BTC Layer 2, enhancing the connectivity
              and synergy among different DIDs in the ecosystem. This approach underlines{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              ’s ambition to be at the forefront of innovation and integration in the field of decentralized digital
              identities.
            </li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'What are Ordinals DIDs?',
      info: [
        'Ordinals DIDs, similar yet distinct from ENS, are human-readable Decentralized Identifiers (DIDs) created using the Ordinals protocol on the Bitcoin blockchain. This protocol allows anyone to inscribe DIDs with a variety of suffixes like .sats, .bitmap, .btc, .x, .bitter, and .unisat. Setting them apart from ENS, Ordinals DIDs are fully decentralized, lacking centralized gatekeepers and not relying on smart contracts. Their records are permanently stored on the Bitcoin blockchain, underscoring their decentralized nature. This innovation presents a unique approach in the digital identity space, leveraging the robustness and security of the Bitcoin network.'
      ]
    },
    {
      title: 'Token Distribution',
      info: [
        <Box
          key={4}
          sx={{
            '& ul': {
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Total Supply: 500,000,000 $BDID</Typography>
          <ul>
            <li>
              $BDID Token Launch On Bounce: 80%
              <ul>
                <li>40% Auction Stake</li>
                <li>20% Auction Random Selection</li>
                <li>20% DAII Stake</li>
              </ul>
            </li>
            <li>Liquidity: 10%</li>
            <li>50-day Airdrop Mining (MUBI, BSSB, AUCTION, WBTC): 5%</li>
            <li>GoDID team (6-month lock followed by 12-month linear vesting ): 5%</li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'RoadMap',
      info: [
        <Box key={1} sx={{ '&>ul>li': { marginTop: 10 } }}>
          <ul>
            <li>
              2023Q4——Update of Ordinals DIDs Marketplace(v2.0) with multiple optimized functions like Categorizations,
              bulk Reg & Transaction; IDO & Token Airdrop
            </li>
            <li>2024Q1——Development of DID management system & DID airdrop management tools, and etc</li>
            <li>2024Q2——Development of multi-protocol DIDs management system on BTC L2, E.G. realm, etc</li>
            <li>2024Q3——Cross-chain of DIDs, cross-protocol resolution and multi-ecological Dapps compatibility</li>
            <li>2024Q4——R&D of DID’s underlying protocols</li>
            <li>2025 ——Interoperability and application of all major chains</li>
          </ul>
        </Box>
      ]
    }
  ],
  tokenMetrics: [],
  desc: 'GoDID is a marketplace aggregator for decentralized identities(DIDs) that currently serves ENS, Space ID and Bitcoin Ordinals DIDs.',
  social: [
    <Link key={0} href="https://godid.io/" target="_blank">
      <Web />
    </Link>,
    <Link key={2} href="https://discord.com/invite/C7HXkuxtPE" target="_blank">
      <DiscordSVG />
    </Link>,
    <Link key={6} href="https://twitter.com/godid_io" target="_blank">
      <Twitter />
    </Link>,
    <Link key={8} href="https://medium.com/@godid" target="_blank">
      <img src={Medium} width={40} />
    </Link>
  ],
  moreData: [
    { title: 'Token Name', content: '$BDID' },
    { title: 'Token Price', content: '0.00009375 AUCTION' },
    { title: 'Token Amount', content: '200,000,000' },
    { title: 'Blockchain', content: 'Ethereum' }
    // { title: 'Raise Auction Amount', content: '23530' }
  ]
}
export const PrivateStakeDaiiData: IPrivatePadProp = {
  keyId: 21,
  liveTimeStamp: {
    start: 1702645200000,
    end: 1702818000000
  },
  poolTypeName: 'Staking Auction',
  img: 'https://images-v3.bounce.finance/c704c4ef57b056a70039fe952a22bbd4-1702019109.png',
  avatar: DIDNa,
  title: 'GoDID',
  chainId: 1,
  tokenName: '$BDID',
  whitePaperLink: 'https://drive.google.com/file/d/1Iu3kLNxi97KkOqP1wz2-i2N_HBV0LRgn/view',
  upcomingLink: '/launchpad/godid-staking-daii',
  liveLink: '/launchpad/godid-staking-daii',
  projectInfo: [
    {
      title: 'What is GoDID?',
      info: [
        <Box
          key={1}
          sx={{
            '&>ul': { display: 'flex', flexDirection: 'column', gap: 10 },
            '&>ul>li>a': {
              color: 'gray',
              textDecoration: 'underline'
            }
          }}
        >
          <ul>
            <li>
              GoDID is a marketplace aggregator for decentralized identities(DIDs) that currently serves ENS, Space ID
              and Bitcoin Ordinals DIDs. It offers the most user-friendly and cost-effective ENS platform with diverse
              features, including the ENS module built using OpenSea’s Seaport contract. This module supports the full
              ENS lifecycle, encompassing search, registration, trading, and management.
            </li>
            <li>
              GoDID enhances the ENS user experience with various tools and leaderboards, such as Bid by Category,
              Premium Sniper, and cross-market listings. A standout feature is its comprehensive categorization system,
              featuring 144 distinct categories, which greatly facilitates user inquiries and trading activities. This
              focus on variety and practicality positions GoDID as a versatile and valuable resource in the
              decentralized identity market.
            </li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'What is BDID?',
      info: [
        <Box
          key={1}
          sx={{
            '&>ul': { display: 'flex', flexDirection: 'column', gap: 10 },
            '&>ul>li>a': {
              color: 'gray',
              textDecoration: 'underline'
            }
          }}
        >
          <ul>
            <li>
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>
              , incubated by{' '}
              <a href="https://godid.io/" target="_blank" rel="noreferrer">
                godid.io
              </a>{' '}
              , specializes in the registration, transaction, and management of Ordinals Decentralized Identifiers
              (DIDs). The platform is uniquely positioned to support a wide array of mainstream DIDs within the Ordinals
              ecosystem, such as .sats, .bitmap, .btc, among others.{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              is dedicated to carving out a niche as the most proficient and specialized platform in the Ordinals DIDs
              arena.
            </li>
            <li>
              As it looks toward the future,{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              plans to lead the development of innovative derivatives for the Ordinals DIDs ecosystem. This initiative
              aims to boost the circulation and value of Ordinals DIDs. Moreover,{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              is committed to bridging the gaps between various DID protocols on BTC Layer 2, enhancing the connectivity
              and synergy among different DIDs in the ecosystem. This approach underlines{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              ’s ambition to be at the forefront of innovation and integration in the field of decentralized digital
              identities.
            </li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'What are Ordinals DIDs?',
      info: [
        'Ordinals DIDs, similar yet distinct from ENS, are human-readable Decentralized Identifiers (DIDs) created using the Ordinals protocol on the Bitcoin blockchain. This protocol allows anyone to inscribe DIDs with a variety of suffixes like .sats, .bitmap, .btc, .x, .bitter, and .unisat. Setting them apart from ENS, Ordinals DIDs are fully decentralized, lacking centralized gatekeepers and not relying on smart contracts. Their records are permanently stored on the Bitcoin blockchain, underscoring their decentralized nature. This innovation presents a unique approach in the digital identity space, leveraging the robustness and security of the Bitcoin network.'
      ]
    },
    {
      title: 'Token Distribution',
      info: [
        <Box
          key={4}
          sx={{
            '& ul': {
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Total Supply: 500,000,000 $BDID</Typography>
          <ul>
            <li>
              $BDID Token Launch On Bounce: 80%
              <ul>
                <li>40% Auction Stake</li>
                <li>20% Auction Random Selection</li>
                <li>20% DAII Stake</li>
              </ul>
            </li>
            <li>Liquidity: 10%</li>
            <li>50-day Airdrop Mining (MUBI, BSSB, AUCTION, WBTC): 5%</li>
            <li>GoDID team (6-month lock followed by 12-month linear vesting ): 5%</li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'RoadMap',
      info: [
        <Box key={1} sx={{ '&>ul>li': { marginTop: 10 } }}>
          <ul>
            <li>
              2023Q4——Update of Ordinals DIDs Marketplace(v2.0) with multiple optimized functions like Categorizations,
              bulk Reg & Transaction; IDO & Token Airdrop
            </li>
            <li>2024Q1——Development of DID management system & DID airdrop management tools, and etc</li>
            <li>2024Q2——Development of multi-protocol DIDs management system on BTC L2, E.G. realm, etc</li>
            <li>2024Q3——Cross-chain of DIDs, cross-protocol resolution and multi-ecological Dapps compatibility</li>
            <li>2024Q4——R&D of DID’s underlying protocols</li>
            <li>2025 ——Interoperability and application of all major chains</li>
          </ul>
        </Box>
      ]
    }
  ],
  tokenMetrics: [],
  desc: 'GoDID is a marketplace aggregator for decentralized identities(DIDs) that currently serves ENS, Space ID and Bitcoin Ordinals DIDs.',
  social: [
    <Link key={0} href="https://godid.io/" target="_blank">
      <Web />
    </Link>,
    <Link key={2} href="https://discord.com/invite/C7HXkuxtPE" target="_blank">
      <DiscordSVG />
    </Link>,
    <Link key={6} href="https://twitter.com/godid_io" target="_blank">
      <Twitter />
    </Link>,
    <Link key={8} href="https://medium.com/@godid" target="_blank">
      <img src={Medium} width={40} />
    </Link>
  ],
  moreData: [
    { title: 'Token Name', content: '$BDID' },
    { title: 'Ticket Price', content: '0.0015 DAII / Ticket' },
    { title: 'Token Amount / Ticket', content: '100,000,000' },
    { title: 'Blockchain', content: 'Ethereum' }
  ]
}
const PrivateRandomGodidData = {
  keyId: 20,
  liveTimeStamp: {
    start: 1702645200000,
    end: 1702818000000
  },
  poolTypeName: 'Random Selection Auction',
  img: 'https://images-v3.bounce.finance/c704c4ef57b056a70039fe952a22bbd4-1702019109.png',
  avatar: DIDNa,
  title: 'GoDID',
  chainId: 1,
  tokenName: '$BDID',
  whitePaperLink: 'https://docsend.com/view/scmyn8e5frxtzumf',
  upcomingLink: routes.thirdPart.Did.pool,
  liveLink: routes.thirdPart.Did.pool,
  projectInfo: [
    {
      title: 'What is GoDID?',
      info: [
        <Box
          key={1}
          sx={{
            '&>ul': { display: 'flex', flexDirection: 'column', gap: 10 },
            '&>ul>li>a': {
              color: 'gray',
              textDecoration: 'underline'
            }
          }}
        >
          <ul>
            <li>
              GoDID is a marketplace aggregator for decentralized identities(DIDs) that currently serves ENS, Space ID
              and Bitcoin Ordinals DIDs. It offers the most user-friendly and cost-effective ENS platform with diverse
              features, including the ENS module built using OpenSea’s Seaport contract. This module supports the full
              ENS lifecycle, encompassing search, registration, trading, and management.
            </li>
            <li>
              GoDID enhances the ENS user experience with various tools and leaderboards, such as Bid by Category,
              Premium Sniper, and cross-market listings. A standout feature is its comprehensive categorization system,
              featuring 144 distinct categories, which greatly facilitates user inquiries and trading activities. This
              focus on variety and practicality positions GoDID as a versatile and valuable resource in the
              decentralized identity market.
            </li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'What is BDID?',
      info: [
        <Box
          key={1}
          sx={{
            '&>ul': { display: 'flex', flexDirection: 'column', gap: 10 },
            '&>ul>li>a': {
              color: 'gray',
              textDecoration: 'underline'
            }
          }}
        >
          <ul>
            <li>
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>
              , incubated by{' '}
              <a href="https://godid.io/" target="_blank" rel="noreferrer">
                godid.io
              </a>{' '}
              , specializes in the registration, transaction, and management of Ordinals Decentralized Identifiers
              (DIDs). The platform is uniquely positioned to support a wide array of mainstream DIDs within the Ordinals
              ecosystem, such as .sats, .bitmap, .btc, among others.{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              is dedicated to carving out a niche as the most proficient and specialized platform in the Ordinals DIDs
              arena.
            </li>
            <li>
              As it looks toward the future,{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              plans to lead the development of innovative derivatives for the Ordinals DIDs ecosystem. This initiative
              aims to boost the circulation and value of Ordinals DIDs. Moreover,{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              is committed to bridging the gaps between various DID protocols on BTC Layer 2, enhancing the connectivity
              and synergy among different DIDs in the ecosystem. This approach underlines{' '}
              <a href="https://bdid.io/en/marketplace/inscription" target="_blank" rel="noreferrer">
                Bdid.io
              </a>{' '}
              ’s ambition to be at the forefront of innovation and integration in the field of decentralized digital
              identities.
            </li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'What are Ordinals DIDs?',
      info: [
        'Ordinals DIDs, similar yet distinct from ENS, are human-readable Decentralized Identifiers (DIDs) created using the Ordinals protocol on the Bitcoin blockchain. This protocol allows anyone to inscribe DIDs with a variety of suffixes like .sats, .bitmap, .btc, .x, .bitter, and .unisat. Setting them apart from ENS, Ordinals DIDs are fully decentralized, lacking centralized gatekeepers and not relying on smart contracts. Their records are permanently stored on the Bitcoin blockchain, underscoring their decentralized nature. This innovation presents a unique approach in the digital identity space, leveraging the robustness and security of the Bitcoin network.'
      ]
    },
    {
      title: 'Token Distribution',
      info: [
        <Box
          key={4}
          sx={{
            '& ul': {
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Total Supply: 500,000,000 $BDID</Typography>
          <ul>
            <li>
              $BDID Token Launch On Bounce: 80%
              <ul>
                <li>40% Auction Stake</li>
                <li>20% Auction Random Selection</li>
                <li>20% DAII Stake</li>
              </ul>
            </li>
            <li>Liquidity: 10%</li>
            <li>50-day Airdrop Mining (MUBI, BSSB, AUCTION, WBTC): 5%</li>
            <li>GoDID team (6-month lock followed by 12-month linear vesting ): 5%</li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'RoadMap',
      info: [
        <Box key={1} sx={{ '&>ul>li': { marginTop: 10 } }}>
          <ul>
            <li>
              2023Q4——Update of Ordinals DIDs Marketplace(v2.0) with multiple optimized functions like Categorizations,
              bulk Reg & Transaction; IDO & Token Airdrop
            </li>
            <li>2024Q1——Development of DID management system & DID airdrop management tools, and etc</li>
            <li>2024Q2——Development of multi-protocol DIDs management system on BTC L2, E.G. realm, etc</li>
            <li>2024Q3——Cross-chain of DIDs, cross-protocol resolution and multi-ecological Dapps compatibility</li>
            <li>2024Q4——R&D of DID’s underlying protocols</li>
            <li>2025 ——Interoperability and application of all major chains</li>
          </ul>
        </Box>
      ]
    }
  ],
  tokenMetrics: [],
  desc: 'GoDID is a marketplace aggregator for decentralized identities(DIDs) that currently serves ENS, Space ID and Bitcoin Ordinals DIDs.',
  social: [
    <Link key={0} href="https://godid.io/" target="_blank">
      <Web />
    </Link>,
    <Link key={2} href="https://discord.com/invite/C7HXkuxtPE" target="_blank">
      <DiscordSVG />
    </Link>,
    <Link key={6} href="https://twitter.com/godid_io" target="_blank">
      <Twitter />
    </Link>,
    <Link key={8} href="https://medium.com/@godid" target="_blank">
      <img src={Medium} width={40} />
    </Link>
  ],
  moreData: [
    { title: 'Token Name', content: '$BDID' },
    { title: 'Ticket Price', content: '62.5 AUCTION / Ticket' },
    { title: 'Token Amount / Ticket', content: '666,666' },
    { title: 'Blockchain', content: 'Ethereum' }
  ]
}

const AiMeetsBtcRandomData: IPrivatePadProp = {
  keyId: 22,
  liveTimeStamp: {
    start: 1704513600000,
    end: 1704765600000
  },
  // hideUpcomingCountdown: true,
  poolTypeName: 'Random Selection',
  img: AiMeetsBtcImg,
  avatar: AiMeetsBtsAvatar,
  title: 'AI meets Bitcoin',
  chainId: 1,
  tokenName: 'AI_Meets_Bitcoin',
  // whitePaperLink: 'https://drive.google.com/file/d/1nl16sKppuS7CA4K_wSSjhrJ6i-OlTtT3/view?usp=sharing',
  upcomingLink: '/launchpad/ai-random',
  liveLink: '/launchpad/ai-random',
  projectInfo: [
    { title: 'What is AI meets Bitcoin?', info: ['AI meets Bitcoin'] },
    {
      title: 'Artist',
      info: [
        <Box key={1}>
          <ul>
            <li>
              A French doctor turned renowned NFT artist. Since 2021 Charlesai has been featured at MoCa Gallery, IHAM
              in Paris, and Art Basel Miami. His AI-infused landscapes have graced the first French physical NFT auction
              and Europe’s first AI art exhibit. He’s been interviewed by BFMTV, published in Beaux Arts 2022, and his
              work is used in top art schools globally.
            </li>
            <li>
              Chris Maestas, American artist/designer with roots in LA’s graffiti and skateboarding scene. His work,
              influenced by 90s subcultures, blends traditional methods with AI-assisted art. Exhibited at Art Basel, NY
              Times Square, and La Biennale di Venezia, Chris is a trendsetter in automotive design and a prominent
              figure in the Web3 art world.
            </li>
            <li>
              Italian digital artist mastering AI to craft vivid art. Since June 2022, his journey has blended
              surrealism, storytelling, and paradoxical worlds inspired by film, music, and myth. Featured in global
              exhibits from LA to Hong Kong, his unique ‘redrum’ perspective captivates collectors and fans alike,
              transcending language barriers with each creation.
            </li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'What’s Random Selection Auction',
      info: [
        <Box key={2}>
          <ul>
            <li>
              A random selection auction is a type of auction where, instead of the highest bid winning the auction, the
              winning bid is determined randomly, like a lottery. This type of auction is typically used in situations
              where the item being sold is highly desirable and there are many bidders who are willing to pay a high
              price for it.
            </li>
          </ul>
        </Box>
      ]
    }
  ],
  tokenMetrics: [],
  desc: `The "AI Meets Bitcoin" Auction features the first-ever AI-generated Ordinals NFT collection, with 450 exquisite artworks co-created by three top artists: Charlesai, 0009, and RedruM. This collection represents a pioneering fusion of artificial intelligence, art and the Bitcoin ecosystem. Each of the featured artworks gain a unique identity and narrative, permanently inscribed on the Bitcoin network, guaranteeing their endurance and legacy.`,
  social: [],
  moreData: [
    { title: 'Token Name', content: 'AI_Meets_Bitcoin' },
    { title: 'Token Type', content: 'ERC-721' },
    { title: 'NFT Amount', content: '400' },
    { title: 'Blockchain', content: 'Ethereum' }
  ]
}
export const AmmxAuctionData: IPrivatePadProp = {
  keyId: 25,
  liveTimeStamp: {
    start: 1703390400000,
    end: 1703736000000
  },
  poolTypeName: 'Staking Auction',
  img: LadderImg,
  avatar: LadderImg,
  title: 'Two Birds, One Stone ($AMMX)',
  chainId: 1,
  tokenName: '$AMMX',
  whitePaperLink: '',
  upcomingLink: routes.thirdPart.AmmxAuction,
  liveLink: routes.thirdPart.AmmxAuction,
  projectInfo: [
    {
      title: 'What is AMMX',
      info: [
        <Typography fontSize={16} key={1}>
          AMMX serves as the ecosystem token of BitSwap and Ladder, with these protocols dedicating 50% of their fee
          income to buy back AMMX.
        </Typography>
      ]
    },
    {
      title: 'Tokenomics',
      info: [
        <Box key={1} sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10, mt: 10 }, fontSize: 16 }}>
          <ul>
            <li>Total Supply: 2.1 Billion</li>

            <li>
              Public Sale: 50% of Total Supply on Bounce Finance
              <ul>
                <li>Total Raise Through Token Launch: 500,000 DAII + $500,000 value of $Auction</li>
              </ul>
            </li>
            <li>FDV: $2,000,000</li>
            <li>Team: 5% (locked for 6 months and linear vesting for 15 months)</li>
            <li>Airdrop Farming: 1.5% on Ladder and BitSwap, last for 30 days</li>
            <li>
              Liquidity Mining Pool: 7%
              <ul>
                <li>3.5% in Uniswap V3, AMMX-ETH</li>
                <li>3.5% in BitSwap, AMMX-DAII</li>
              </ul>
            </li>
            <li>
              Liquidity Mining: 36.5%, 0.1% daily for 365 days will be distributed daily dependent on weights. AMMX can
              be used to boost the weight farming rate.
              <ul>
                <li>AMMX-DAII</li>
                <li>AUCTION-DAII</li>
                <li>USDT-DAII</li>
                <li>BSSB-DAII</li>
                <li>MUBI-DAII</li>
              </ul>
            </li>
          </ul>
        </Box>
      ]
    }
  ],
  tokenMetrics: [],
  desc: 'AMMX serves as the ecosystem token of BitSwap and Ladder, with these protocols dedicating 50% of their fee income to buy back AMMX.',
  social: [],
  moreData: [
    { title: 'Token Name', content: '$AMMX' },
    { title: 'Token Price', content: '0.00002721 AUCTION' },
    { title: 'Token Amount', content: '472,500,000' },
    { title: 'Blockchain', content: 'Ethereum' }
  ],
  otherProject: [
    {
      title: 'BitSwap',
      tabList: [
        {
          title: 'Introduction',
          info: [
            <Box key={1}>
              <Typography sx={{ fontSize: 36, fontWeight: 600 }}>What is BitSwap?</Typography>
              <Typography mt={40}>
                BitSwap Protocol is the first cross-chain swap for BRC20 and Bitcoin Ecosystem, offering a seamless
                trading experience for BRC20 assets across diverse blockchains
              </Typography>
              <Typography mt={15}>
                As the premier liquidity hub for the Bitcoin ecosystem, we enable effortless and secure cross-chain
                transactions through collaboration with Multibit Bridge and DAII stablecoin. Our platform is dedicated
                to providing multi-chain users with easy access to the vast Bitcoin ecosystem, enhancing their trading
                journey with unparalleled convenience and efficiency.
              </Typography>
            </Box>
          ]
        },
        {
          title: 'How does BitSwap work?',
          info: [
            <Box key={1} sx={{ ol: { display: 'flex', flexDirection: 'column', gap: 10 } }}>
              <Typography sx={{ fontSize: 16 }}>
                By integrating with Multibit and BitStable, BitSwap could support cross-chain swap in three steps:
              </Typography>
              <ol>
                <li>{`ERC20 <–> DAII: users can swap any ERC20 token (ETH/USDT/etc..) to DAII on BitSwap. DAII is the first and largest original stablecoin in Bitcoin Ecosystem and BitSwap provides the best liquidity for DAII among multi-chains.`}</li>
                <li>{`DAII <–> bridged BRC20: BitSwap introduces DAII As A Service (DAAS) and fosters enhanced liquidity pairing DAII with other BRC20 assets. Users can swap DAII with any bridged BRC20 tokens on BitSwap. `}</li>
                <li>{`bridged BRC20 <–> BRC20: BitSwap integrates Multibit bridge’s innovation and enables users to transfer bridged BRC20 to Bitcoin seamlessly.`}</li>
              </ol>
              <Typography sx={{ fontSize: 16 }}>
                Bitcoin will provide full access and functionalities for the three steps above, and will integrate three
                steps into one-click trading in the near future.
              </Typography>
              <img style={{ width: '100%', marginTop: 10 }} src={BitSwapImage1} />
            </Box>
          ]
        },
        {
          title: 'Social Links',
          info: [
            <Stack
              key={1}
              flexDirection={'row'}
              gap={10}
              sx={{
                ul: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                },
                a: { color: 'gray', textDecoration: 'underline', fontSize: 16 },
                li: { fontSize: 16 }
              }}
            >
              <ul>
                <li>
                  Website: {` `}
                  <a href="https://bitswap.site/home" target="_blank" rel="noreferrer">
                    https://bitswap.site/home
                  </a>
                </li>
                <li>
                  Twitter:{` `}
                  <a href="https://t.me/BitSwap_BTC" target="_blank" rel="noreferrer">
                    https://twitter.com/Bitswap_BTC
                  </a>
                </li>
                <li>
                  Telegram:{` `}
                  <a href="https://t.me/BitSwap_BTC" target="_blank" rel="noreferrer">
                    https://t.me/BitSwap_BTC
                  </a>
                </li>
              </ul>
            </Stack>
          ]
        }
      ]
    },
    {
      title: 'Ladder',
      tabList: [
        {
          title: 'Introduction',
          info: [
            <Box key={1}>
              <Typography sx={{ fontSize: 36, fontWeight: 600 }}>What is Ladder Protocol?</Typography>
              <Stack gap={15} mt={40}>
                <Typography>
                  Ladder is a decentralized automated market maker (AMM) protocol that offers instant liquidity for
                  NFTs, supporting a wide range of standards including ERC-721, ERC-1155, ERC-3525, ERC-20, as well as
                  bridged BRC-20 tokens. Our platform enables users to seamlessly enter NFT trades (via liquidity
                  pools), eliminating the need for a peer-to-peer counterparty.
                </Typography>

                <Typography>
                  Focused on channelling liquidity where it's most needed, Ladder has established a leading position as
                  the go-to NFT AMM for GameFi assets. Now, we're at the forefront of innovating cross-chain NFT swap
                  functionality for the Bitcoin ecosystem.
                </Typography>
              </Stack>
            </Box>
          ]
        },
        {
          title: 'Advantages',
          info: [
            <Box key={1} sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10, fontSize: 16 } }}>
              <ul>
                <li>Instant liquidity: no need to list and wait for a buyer</li>
                <li>Low commissions: Up to 95% lower than traditional NFT marketplaces.</li>
                <li>Minimal slippage: negligible difference between the sell price set and the actual selling price</li>
                <li>
                  Convenient user journey: Ladder allows users to trade Ordinals in a similar way to ERC20 NFTs,
                  allowing more retail users to enter the Bitcoin ecosystem
                </li>
                <li>
                  Bringing liquidity to the Bitcoin ecosystem: Ladder is creating liquidity pools for the leading
                  Ordinals collections making the whole ecosystem more efficient for all the participants
                </li>
              </ul>
            </Box>
          ]
        },
        {
          title: 'How does Ladder work?',
          info: [
            <Stack
              key={1}
              flexDirection={'column'}
              gap={10}
              sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10 } }}
            >
              <Box>
                <Typography sx={{ fontSize: 16 }}>
                  Ladder is an AMM protocol for NFTs, which means that users buy from or sell into liquidity pools
                  instead of directly trading between themselves. If you're familiar with a decentralized exchange like
                  Uniswap, Ladder employs a similar concept but for NFTs. <br />
                  Now, with the collaboration with Multibit Bridge, Ladder has extended support for users to engage in
                  Ordinals in the BTC ecosystem. This significantly reduces the barriers for users to enjoy the
                  prosperous development of BTC Ordinals.
                </Typography>
                <Typography mt={40} sx={{ fontSize: 16 }}>
                  Here's how it works:
                </Typography>
                <ul>
                  <li>
                    Liquidity providers deposit NFTs and/or ETH (or an ERC20 token) into liquidity pools and specify a
                    starting price.
                  </li>
                  <li>
                    Users can then buy NFTs from or sell NFTs into these pools. Every time an item is bought or sold,
                    the price to buy or sell another item changes for the pool based on its bonding curve.
                  </li>
                  <li>At any time, liquidity providers can withdraw assets from the pool.</li>
                  <li>
                    First Cross-chain NFT swap for BTC ecosystem.
                    <Typography mt={10}>
                      By integrating with Multibit and BitStable, Ladder could support cross-chain swap in these steps:
                    </Typography>
                    <Typography
                      mt={10}
                    >{`Ordinals <–> Bridged Ordinals: Ladder integrates Multibit bridge’s innovation and allows users to freely convert between bridged Ordinals and BTC ecosystem Ordinals seamlessly.`}</Typography>
                    <Typography
                      mt={10}
                    >{`DAII <–> Bridged BRC20: DAII stands as the premier and largest stablecoin within the BTC ecosystem. Furthermore, BitSwap, a key ecosystem partner, ensures optimal liquidity for DAII across various chains. Users can conveniently invest in BTC Ordinals with reduced transaction fees on Ladder Protocol by engaging in swaps between the DAII and Bridged Ordinals assets, thereby securing enhanced returns.`}</Typography>
                  </li>
                </ul>
              </Box>
              <Box mt={10}>
                <img style={{ width: '100%', margin: '0 auto' }} src={LadderImg1} />
              </Box>
            </Stack>
          ]
        },
        {
          title: 'Social Links',
          info: [
            <Stack
              key={1}
              flexDirection={'row'}
              gap={10}
              sx={{
                ul: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                },
                a: { color: 'gray', textDecoration: 'underline', fontSize: 16 },
                li: { fontSize: 16 }
              }}
            >
              <ul>
                <li>
                  Website: {` `}
                  <a href="https://ladder.top/" target="_blank" rel="noreferrer">
                    https://ladder.top/
                  </a>
                </li>
                <li>
                  Linktree: {` `}
                  <a href="https://link3.to/ladder" target="_blank" rel="noreferrer">
                    https://link3.to/ladder
                  </a>
                </li>
                <li>
                  Twitter: {` `}
                  <a href="https://twitter.com/Ladder_NFT" target="_blank" rel="noreferrer">
                    https://twitter.com/Ladder_NFT
                  </a>
                </li>
                <li>
                  Discord: {` `}
                  <a href="https://twitter.com/Ladder_NFT" target="_blank" rel="noreferrer">
                    https://twitter.com/Ladder_NFT
                  </a>
                </li>
                <li>
                  Telegram: {` `}
                  <a href="https://t.me/LadderAMM" target="_blank" rel="noreferrer">
                    https://t.me/LadderAMM
                  </a>
                </li>
                <li>
                  Medium: {` `}
                  <a href="https://medium.com/@ladder_top " target="_blank" rel="noreferrer">
                    https://medium.com/@ladder_top
                  </a>
                </li>
              </ul>
            </Stack>
          ]
        }
      ]
    }
  ]
}
export const AmmxDaiiData: IPrivatePadProp = {
  keyId: 24,
  liveTimeStamp: {
    start: 1703390400000,
    end: 1703736000000
  },
  poolTypeName: 'Staking Auction',
  img: LadderImg,
  avatar: LadderImg,
  title: 'Two Birds, One Stone ($AMMX)',
  chainId: 1,
  tokenName: '$AMMX',
  whitePaperLink: '',
  upcomingLink: routes.thirdPart.AmmxDaii,
  liveLink: routes.thirdPart.AmmxDaii,
  projectInfo: [
    {
      title: 'What is AMMX',
      info: [
        <Typography fontSize={16} key={1}>
          AMMX serves as the ecosystem token of BitSwap and Ladder, with these protocols dedicating 50% of their fee
          income to buy back AMMX.
        </Typography>
      ]
    },
    {
      title: 'Tokenomics',
      info: [
        <Box key={1} sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10, mt: 10 }, fontSize: 16 }}>
          <ul>
            <li>Total Supply: 2.1 Billion</li>

            <li>
              Public Sale: 50% of Total Supply on Bounce Finance
              <ul>
                <li>Total Raise Through Token Launch: 500,000 DAII + $500,000 value of $Auction</li>
              </ul>
            </li>
            <li>FDV: $2,000,000</li>
            <li>Team: 5% (locked for 6 months and linear vesting for 15 months)</li>
            <li>Airdrop Farming: 1.5% on Ladder and BitSwap, last for 30 days</li>
            <li>
              Liquidity Mining Pool: 7%
              <ul>
                <li>3.5% in Uniswap V3, AMMX-ETH</li>
                <li>3.5% in BitSwap, AMMX-DAII</li>
              </ul>
            </li>
            <li>
              Liquidity Mining: 36.5%, 0.1% daily for 365 days will be distributed daily dependent on weights. AMMX can
              be used to boost the weight farming rate.
              <ul>
                <li>AMMX-DAII</li>
                <li>AUCTION-DAII</li>
                <li>USDT-DAII</li>
                <li>BSSB-DAII</li>
                <li>MUBI-DAII</li>
              </ul>
            </li>
          </ul>
        </Box>
      ]
    }
  ],
  tokenMetrics: [],
  desc: 'AMMX serves as the ecosystem token of BitSwap and Ladder, with these protocols dedicating 50% of their fee income to buy back AMMX.',
  social: [],
  moreData: [
    { title: 'Token Name', content: '$AMMX' },
    { title: 'Token Price', content: '0.00095 DAII' },
    { title: 'Token Amount', content: '472,500,000' },
    { title: 'Blockchain', content: 'Ethereum' }
  ],
  otherProject: [
    {
      title: 'BitSwap',
      tabList: [
        {
          title: 'Introduction',
          info: [
            <Box key={1}>
              <Typography sx={{ fontSize: 36, fontWeight: 600 }}>What is BitSwap?</Typography>
              <Typography mt={40}>
                BitSwap Protocol is the first cross-chain swap for BRC20 and Bitcoin Ecosystem, offering a seamless
                trading experience for BRC20 assets across diverse blockchains
              </Typography>
              <Typography mt={15}>
                As the premier liquidity hub for the Bitcoin ecosystem, we enable effortless and secure cross-chain
                transactions through collaboration with Multibit Bridge and DAII stablecoin. Our platform is dedicated
                to providing multi-chain users with easy access to the vast Bitcoin ecosystem, enhancing their trading
                journey with unparalleled convenience and efficiency.
              </Typography>
            </Box>
          ]
        },
        {
          title: 'How does BitSwap work?',
          info: [
            <Box key={1} sx={{ ol: { display: 'flex', flexDirection: 'column', gap: 10 } }}>
              <Typography sx={{ fontSize: 16 }}>
                By integrating with Multibit and BitStable, BitSwap could support cross-chain swap in three steps:
              </Typography>
              <ol>
                <li>{`ERC20 <–> DAII: users can swap any ERC20 token (ETH/USDT/etc..) to DAII on BitSwap. DAII is the first and largest original stablecoin in Bitcoin Ecosystem and BitSwap provides the best liquidity for DAII among multi-chains.`}</li>
                <li>{`DAII <–> bridged BRC20: BitSwap introduces DAII As A Service (DAAS) and fosters enhanced liquidity pairing DAII with other BRC20 assets. Users can swap DAII with any bridged BRC20 tokens on BitSwap. `}</li>
                <li>{`bridged BRC20 <–> BRC20: BitSwap integrates Multibit bridge’s innovation and enables users to transfer bridged BRC20 to Bitcoin seamlessly.`}</li>
              </ol>
              <Typography sx={{ fontSize: 16 }}>
                Bitcoin will provide full access and functionalities for the three steps above, and will integrate three
                steps into one-click trading in the near future.
              </Typography>
              <img style={{ width: '100%', marginTop: 10 }} src={BitSwapImage1} />
            </Box>
          ]
        },
        {
          title: 'Social Links',
          info: [
            <Stack
              key={1}
              flexDirection={'row'}
              gap={10}
              sx={{
                ul: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                },
                a: { color: 'gray', textDecoration: 'underline', fontSize: 16 },
                li: { fontSize: 16 }
              }}
            >
              <ul>
                <li>
                  Website: {` `}
                  <a href="https://bitswap.site/home" target="_blank" rel="noreferrer">
                    https://bitswap.site/home
                  </a>
                </li>
                <li>
                  Twitter:{` `}
                  <a href="https://t.me/BitSwap_BTC" target="_blank" rel="noreferrer">
                    https://twitter.com/Bitswap_BTC
                  </a>
                </li>
                <li>
                  Telegram:{` `}
                  <a href="https://t.me/BitSwap_BTC" target="_blank" rel="noreferrer">
                    https://t.me/BitSwap_BTC
                  </a>
                </li>
              </ul>
            </Stack>
          ]
        }
      ]
    },
    {
      title: 'Ladder',
      tabList: [
        {
          title: 'Introduction',
          info: [
            <Box key={1}>
              <Typography sx={{ fontSize: 36, fontWeight: 600 }}>What is Ladder Protocol?</Typography>
              <Stack gap={15} mt={40}>
                <Typography>
                  Ladder is a decentralized automated market maker (AMM) protocol that offers instant liquidity for
                  NFTs, supporting a wide range of standards including ERC-721, ERC-1155, ERC-3525, ERC-20, as well as
                  bridged BRC-20 tokens. Our platform enables users to seamlessly enter NFT trades (via liquidity
                  pools), eliminating the need for a peer-to-peer counterparty.
                </Typography>

                <Typography>
                  Focused on channelling liquidity where it's most needed, Ladder has established a leading position as
                  the go-to NFT AMM for GameFi assets. Now, we're at the forefront of innovating cross-chain NFT swap
                  functionality for the Bitcoin ecosystem.
                </Typography>
              </Stack>
            </Box>
          ]
        },
        {
          title: 'Advantages',
          info: [
            <Box key={1} sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10, fontSize: 16 } }}>
              <ul>
                <li>Instant liquidity: no need to list and wait for a buyer</li>
                <li>Low commissions: Up to 95% lower than traditional NFT marketplaces.</li>
                <li>Minimal slippage: negligible difference between the sell price set and the actual selling price</li>
                <li>
                  Convenient user journey: Ladder allows users to trade Ordinals in a similar way to ERC20 NFTs,
                  allowing more retail users to enter the Bitcoin ecosystem
                </li>
                <li>
                  Bringing liquidity to the Bitcoin ecosystem: Ladder is creating liquidity pools for the leading
                  Ordinals collections making the whole ecosystem more efficient for all the participants
                </li>
              </ul>
            </Box>
          ]
        },
        {
          title: 'How does Ladder work?',
          info: [
            <Stack
              key={1}
              flexDirection={'column'}
              gap={10}
              sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10 } }}
            >
              <Box>
                <Typography sx={{ fontSize: 16 }}>
                  Ladder is an AMM protocol for NFTs, which means that users buy from or sell into liquidity pools
                  instead of directly trading between themselves. If you're familiar with a decentralized exchange like
                  Uniswap, Ladder employs a similar concept but for NFTs.
                  <br /> Now, with the collaboration with Multibit Bridge, Ladder has extended support for users to
                  engage in Ordinals in the BTC ecosystem. This significantly reduces the barriers for users to enjoy
                  the prosperous development of BTC Ordinals.
                </Typography>
                <Typography mt={40} sx={{ fontSize: 16 }}>
                  Here's how it works:
                </Typography>
                <ul>
                  <li>
                    Liquidity providers deposit NFTs and/or ETH (or an ERC20 token) into liquidity pools and specify a
                    starting price.
                  </li>
                  <li>
                    Users can then buy NFTs from or sell NFTs into these pools. Every time an item is bought or sold,
                    the price to buy or sell another item changes for the pool based on its bonding curve.
                  </li>
                  <li>At any time, liquidity providers can withdraw assets from the pool.</li>
                  <li>
                    First Cross-chain NFT swap for BTC ecosystem.
                    <Typography mt={10}>
                      By integrating with Multibit and BitStable, Ladder could support cross-chain swap in these steps:
                    </Typography>
                    <Typography
                      mt={10}
                    >{`Ordinals <–> Bridged Ordinals: Ladder integrates Multibit bridge’s innovation and allows users to freely convert between bridged Ordinals and BTC ecosystem Ordinals seamlessly.`}</Typography>
                    <Typography
                      mt={10}
                    >{`DAII <–> Bridged BRC20: DAII stands as the premier and largest stablecoin within the BTC ecosystem. Furthermore, BitSwap, a key ecosystem partner, ensures optimal liquidity for DAII across various chains. Users can conveniently invest in BTC Ordinals with reduced transaction fees on Ladder Protocol by engaging in swaps between the DAII and Bridged Ordinals assets, thereby securing enhanced returns.`}</Typography>
                  </li>
                </ul>
              </Box>
              <Box mt={10}>
                <img style={{ width: '100%', margin: '0 auto' }} src={LadderImg1} />
              </Box>
            </Stack>
          ]
        },
        {
          title: 'Social Links',
          info: [
            <Stack
              key={1}
              flexDirection={'row'}
              gap={10}
              sx={{
                ul: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                },
                a: { color: 'gray', textDecoration: 'underline', fontSize: 16 },
                li: { fontSize: 16 }
              }}
            >
              <ul>
                <li>
                  Website: {` `}
                  <a href="https://ladder.top/" target="_blank" rel="noreferrer">
                    https://ladder.top/
                  </a>
                </li>
                <li>
                  Linktree: {` `}
                  <a href="https://link3.to/ladder" target="_blank" rel="noreferrer">
                    https://link3.to/ladder
                  </a>
                </li>
                <li>
                  Twitter: {` `}
                  <a href="https://twitter.com/Ladder_NFT" target="_blank" rel="noreferrer">
                    https://twitter.com/Ladder_NFT
                  </a>
                </li>
                <li>
                  Discord: {` `}
                  <a href="https://twitter.com/Ladder_NFT" target="_blank" rel="noreferrer">
                    https://twitter.com/Ladder_NFT
                  </a>
                </li>
                <li>
                  Telegram: {` `}
                  <a href="https://t.me/LadderAMM" target="_blank" rel="noreferrer">
                    https://t.me/LadderAMM
                  </a>
                </li>
                <li>
                  Medium: {` `}
                  <a href="https://medium.com/@ladder_top " target="_blank" rel="noreferrer">
                    https://medium.com/@ladder_top
                  </a>
                </li>
              </ul>
            </Stack>
          ]
        }
      ]
    }
  ]
}
const AmmxRandomData: IPrivatePadProp = {
  keyId: 26,
  backedId: 18685,
  liveTimeStamp: {
    start: 1703390400000,
    end: 1703736000000
  },
  poolTypeName: 'Random Selection Auction',
  img: LadderImg,
  avatar: LadderImg,
  title: 'Two Birds, One Stone ($AMMX)',
  chainId: 1,
  tokenName: '$AMMX',
  whitePaperLink: '',
  upcomingLink: routes.thirdPart.AmmxRandom,
  liveLink: routes.thirdPart.AmmxRandom,
  projectInfo: [
    {
      title: 'What is AMMX',
      info: [
        <Typography fontSize={16} key={1}>
          AMMX serves as the ecosystem token of BitSwap and Ladder, with these protocols dedicating 50% of their fee
          income to buy back AMMX.
        </Typography>
      ]
    },
    {
      title: 'Tokenomics',
      info: [
        <Box key={1} sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10, mt: 10 }, fontSize: 16 }}>
          <ul>
            <li>Total Supply: 2.1 Billion</li>

            <li>
              Public Sale: 50% of Total Supply on Bounce Finance
              <ul>
                <li>Total Raise Through Token Launch: 500,000 DAII + $500,000 value of $Auction</li>
              </ul>
            </li>
            <li>FDV: $2,000,000</li>
            <li>Team: 5% (locked for 6 months and linear vesting for 15 months)</li>
            <li>Airdrop Farming: 1.5% on Ladder and BitSwap, last for 30 days</li>
            <li>
              Liquidity Mining Pool: 7%
              <ul>
                <li>3.5% in Uniswap V3, AMMX-ETH</li>
                <li>3.5% in BitSwap, AMMX-DAII</li>
              </ul>
            </li>
            <li>
              Liquidity Mining: 36.5%, 0.1% daily for 365 days will be distributed daily dependent on weights. AMMX can
              be used to boost the weight farming rate.
              <ul>
                <li>AMMX-DAII</li>
                <li>AUCTION-DAII</li>
                <li>USDT-DAII</li>
                <li>BSSB-DAII</li>
                <li>MUBI-DAII</li>
              </ul>
            </li>
          </ul>
        </Box>
      ]
    }
  ],
  tokenMetrics: [],
  desc: 'AMMX serves as the ecosystem token of BitSwap and Ladder, with these protocols dedicating 50% of their fee income to buy back AMMX.',
  social: [],
  moreData: [
    { title: 'Token Name', content: '$AMMX' },
    { title: 'Ticket Price', content: '2,173 MUBI / Ticket' },
    { title: 'Token Amount / Ticket', content: '525,000' },
    { title: 'Blockchain', content: 'Ethereum' }
  ],
  otherProject: [
    {
      title: 'BitSwap',
      tabList: [
        {
          title: 'Introduction',
          info: [
            <Box key={1}>
              <Typography sx={{ fontSize: 36, fontWeight: 600 }}>What is BitSwap?</Typography>
              <Typography mt={40}>
                BitSwap Protocol is the first cross-chain swap for BRC20 and Bitcoin Ecosystem, offering a seamless
                trading experience for BRC20 assets across diverse blockchains
              </Typography>
              <Typography mt={15}>
                As the premier liquidity hub for the Bitcoin ecosystem, we enable effortless and secure cross-chain
                transactions through collaboration with Multibit Bridge and DAII stablecoin. Our platform is dedicated
                to providing multi-chain users with easy access to the vast Bitcoin ecosystem, enhancing their trading
                journey with unparalleled convenience and efficiency.
              </Typography>
            </Box>
          ]
        },
        {
          title: 'How does BitSwap work?',
          info: [
            <Box key={1} sx={{ ol: { display: 'flex', flexDirection: 'column', gap: 10 } }}>
              <Typography sx={{ fontSize: 16 }}>
                By integrating with Multibit and BitStable, BitSwap could support cross-chain swap in three steps:
              </Typography>
              <ol>
                <li>{`ERC20 <–> DAII: users can swap any ERC20 token (ETH/USDT/etc..) to DAII on BitSwap. DAII is the first and largest original stablecoin in Bitcoin Ecosystem and BitSwap provides the best liquidity for DAII among multi-chains.`}</li>
                <li>{`DAII <–> bridged BRC20: BitSwap introduces DAII As A Service (DAAS) and fosters enhanced liquidity pairing DAII with other BRC20 assets. Users can swap DAII with any bridged BRC20 tokens on BitSwap. `}</li>
                <li>{`bridged BRC20 <–> BRC20: BitSwap integrates Multibit bridge’s innovation and enables users to transfer bridged BRC20 to Bitcoin seamlessly.`}</li>
              </ol>
              <Typography sx={{ fontSize: 16 }}>
                Bitcoin will provide full access and functionalities for the three steps above, and will integrate three
                steps into one-click trading in the near future.
              </Typography>
              <img style={{ width: '100%', marginTop: 10 }} src={BitSwapImage1} />
            </Box>
          ]
        },
        {
          title: 'Social Links',
          info: [
            <Stack
              key={1}
              flexDirection={'row'}
              gap={10}
              sx={{
                ul: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                },
                a: { color: 'gray', textDecoration: 'underline', fontSize: 16 },
                li: { fontSize: 16 }
              }}
            >
              <ul>
                <li>
                  Website: {` `}
                  <a href="https://bitswap.site/home" target="_blank" rel="noreferrer">
                    https://bitswap.site/home
                  </a>
                </li>
                <li>
                  Twitter:{` `}
                  <a href="https://t.me/BitSwap_BTC" target="_blank" rel="noreferrer">
                    https://twitter.com/Bitswap_BTC
                  </a>
                </li>
                <li>
                  Telegram:{` `}
                  <a href="https://t.me/BitSwap_BTC" target="_blank" rel="noreferrer">
                    https://t.me/BitSwap_BTC
                  </a>
                </li>
              </ul>
            </Stack>
          ]
        }
      ]
    },
    {
      title: 'Ladder',
      tabList: [
        {
          title: 'Introduction',
          info: [
            <Box key={1}>
              <Typography sx={{ fontSize: 36, fontWeight: 600 }}>What is Ladder Protocol?</Typography>
              <Stack gap={15} mt={40}>
                <Typography>
                  Ladder is a decentralized automated market maker (AMM) protocol that offers instant liquidity for
                  NFTs, supporting a wide range of standards including ERC-721, ERC-1155, ERC-3525, ERC-20, as well as
                  bridged BRC-20 tokens. Our platform enables users to seamlessly enter NFT trades (via liquidity
                  pools), eliminating the need for a peer-to-peer counterparty.
                </Typography>

                <Typography>
                  Focused on channelling liquidity where it's most needed, Ladder has established a leading position as
                  the go-to NFT AMM for GameFi assets. Now, we're at the forefront of innovating cross-chain NFT swap
                  functionality for the Bitcoin ecosystem.
                </Typography>
              </Stack>
            </Box>
          ]
        },
        {
          title: 'Advantages',
          info: [
            <Box key={1} sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10, fontSize: 16 } }}>
              <ul>
                <li>Instant liquidity: no need to list and wait for a buyer</li>
                <li>Low commissions: Up to 95% lower than traditional NFT marketplaces.</li>
                <li>Minimal slippage: negligible difference between the sell price set and the actual selling price</li>
                <li>
                  Convenient user journey: Ladder allows users to trade Ordinals in a similar way to ERC20 NFTs,
                  allowing more retail users to enter the Bitcoin ecosystem
                </li>
                <li>
                  Bringing liquidity to the Bitcoin ecosystem: Ladder is creating liquidity pools for the leading
                  Ordinals collections making the whole ecosystem more efficient for all the participants
                </li>
              </ul>
            </Box>
          ]
        },
        {
          title: 'How does Ladder work?',
          info: [
            <Stack
              key={1}
              flexDirection={'column'}
              gap={10}
              sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10 } }}
            >
              <Box>
                <Typography sx={{ fontSize: 16 }}>
                  Ladder is an AMM protocol for NFTs, which means that users buy from or sell into liquidity pools
                  instead of directly trading between themselves. If you're familiar with a decentralized exchange like
                  Uniswap, Ladder employs a similar concept but for NFTs. <br /> Now, with the collaboration with
                  Multibit Bridge, Ladder has extended support for users to engage in Ordinals in the BTC ecosystem.
                  This significantly reduces the barriers for users to enjoy the prosperous development of BTC Ordinals.
                </Typography>
                <Typography mt={40} sx={{ fontSize: 16 }}>
                  Here's how it works:
                </Typography>
                <ul>
                  <li>
                    Liquidity providers deposit NFTs and/or ETH (or an ERC20 token) into liquidity pools and specify a
                    starting price.
                  </li>
                  <li>
                    Users can then buy NFTs from or sell NFTs into these pools. Every time an item is bought or sold,
                    the price to buy or sell another item changes for the pool based on its bonding curve.
                  </li>
                  <li>At any time, liquidity providers can withdraw assets from the pool.</li>
                  <li>
                    First Cross-chain NFT swap for BTC ecosystem.
                    <Typography mt={10}>
                      By integrating with Multibit and BitStable, Ladder could support cross-chain swap in these steps:
                    </Typography>
                    <Typography
                      mt={10}
                    >{`Ordinals <–> Bridged Ordinals: Ladder integrates Multibit bridge’s innovation and allows users to freely convert between bridged Ordinals and BTC ecosystem Ordinals seamlessly.`}</Typography>
                    <Typography
                      mt={10}
                    >{`DAII <–> Bridged BRC20: DAII stands as the premier and largest stablecoin within the BTC ecosystem. Furthermore, BitSwap, a key ecosystem partner, ensures optimal liquidity for DAII across various chains. Users can conveniently invest in BTC Ordinals with reduced transaction fees on Ladder Protocol by engaging in swaps between the DAII and Bridged Ordinals assets, thereby securing enhanced returns.`}</Typography>
                  </li>
                </ul>
              </Box>
              <Box mt={10}>
                <img style={{ width: '100%', margin: '0 auto' }} src={LadderImg1} />
              </Box>
            </Stack>
          ]
        },
        {
          title: 'Social Links',
          info: [
            <Stack
              key={1}
              flexDirection={'row'}
              gap={10}
              sx={{
                ul: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                },
                a: { color: 'gray', textDecoration: 'underline', fontSize: 16 },
                li: { fontSize: 16 }
              }}
            >
              <ul>
                <li>
                  Website: {` `}
                  <a href="https://ladder.top/" target="_blank" rel="noreferrer">
                    https://ladder.top/
                  </a>
                </li>
                <li>
                  Linktree: {` `}
                  <a href="https://link3.to/ladder" target="_blank" rel="noreferrer">
                    https://link3.to/ladder
                  </a>
                </li>
                <li>
                  Twitter: {` `}
                  <a href="https://twitter.com/Ladder_NFT" target="_blank" rel="noreferrer">
                    https://twitter.com/Ladder_NFT
                  </a>
                </li>
                <li>
                  Discord: {` `}
                  <a href="https://twitter.com/Ladder_NFT" target="_blank" rel="noreferrer">
                    https://twitter.com/Ladder_NFT
                  </a>
                </li>
                <li>
                  Telegram: {` `}
                  <a href="https://t.me/LadderAMM" target="_blank" rel="noreferrer">
                    https://t.me/LadderAMM
                  </a>
                </li>
                <li>
                  Medium: {` `}
                  <a href="https://medium.com/@ladder_top " target="_blank" rel="noreferrer">
                    https://medium.com/@ladder_top
                  </a>
                </li>
              </ul>
            </Stack>
          ]
        }
      ]
    }
  ]
}

export const Port3Data: IPrivatePadProp = {
  // hidden: true,
  keyId: 23,
  liveTimeStamp: {
    start: 1704636000000,
    end: 1704700800000
  },
  // hideUpcomingCountdown: true,
  poolTypeName: 'Staking Auction',
  img: 'https://images-v3.bounce.finance/e35da230f9eae5479dfe128f256055ec-1703137469.png',
  avatar: Port3Logo,
  title: 'Port3 Network',
  chainId: 1,
  tokenName: '$PORT3',
  whitePaperLink: 'https://docsend.com/view/rb64i7ejgbs6ufpn',
  upcomingLink: '/launchpad/port3',
  liveLink: '/launchpad/port3',
  projectInfo: [
    {
      title: 'What is Port3 Network?',
      info: [
        <Box key={1} sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10 } }}>
          <ul>
            <li>
              Port3 Network is a bridge between Web2 and Web3, led by Jump Crypto and Kucoin Ventures, with other
              investors including dozens of top tier institutions including EMURGO, Momentum6, SNZ, Adaverse and Gate
              Labs. Port3 Network is building a protocol to aggregate and standardize off-chain and on-chain data to
              build a universally accessible and powerful Social Data Layer that can be widely applied to various DApps.
              The founders of the team come from Bangkok, Zurich, Paris, Moscow, South Africa and Bucharest. Has worked
              for well-known companies and institutions such as Apple, UBS, JP Morgan, and Tencent.
            </li>
            <li>
              Currently we support 19 L1s and almost all EVMs. The total number of users exceeds 1.7M. It has more than
              4,200 partners including BNB Chain, Trader Joe, Conflux, etc. Received incubation from Binance Labs and
              BNB Chain and held the first Zero 2 Hero Hackathon with BNB Chain. Received grants and other support from
              BNB Chain, MASK, Aptos and other institutions.
            </li>
            <li>
              The main products that Port3 Network has completed so far are SoQuest and BQL. SoQuest is a task platform
              with DAU more than 30k. Leverage the rewards provided by cooperated projects to allow users to voluntarily
              provide their profiles across different platforms of Web2 and Web3, and provide our users with special
              benefits through user preferences and intents, including higher select rates in public sales, airdrop
              rewards from high-quality projects, and priority purchase of co-branded NFTs rights etc.
            </li>
            <li>
              Another major and latest product, BQL, as a Natural Language Processed On-Chain Workflow Executor,
              provides the possibility of intent-centeric protocols and infrastructure (Intent-Centric Layer) an open
              approach. Users do not need to search for cumbersome interactive tutorials but can perform complex
              on-chain interactions with one click. Even instructions edited in natural language can be compiled into
              standard paradigms of on-chain workflows and can be executed by EVM-compatible contracts. Currently BQL
              trading volume exceeded 120mln. Extensive support for other alt-chains will also be applied in the future.
            </li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'Tokenomics',
      info: [
        <Box key={1} sx={{ a: { textDecoration: 'underline', color: 'gray' }, img: { width: '100%', height: '100%' } }}>
          <img src={PORT3Tokenomics} />
        </Box>
      ]
    },
    {
      title: 'Advantages of the Project',
      info: [
        <Box key={1} sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10 } }}>
          <ul>
            {/* <li>
                Explain the unique selling points and advantages of your project compared to others in the market.
              </li> */}
            <li>
              The first ever Web3 social data layer & natural language processing on-chain workflow executor, it’s a
              risk free trading tool without the permission of private key needed nor custody. Port3 has yet exceeded
              1.7M users as well as over 140mil in trading volume.
            </li>
          </ul>
        </Box>
      ]
    },
    {
      title: 'Investment and Partners',
      info: [
        <Box
          key={1}
          sx={{
            ul: { display: 'flex', flexDirection: 'column', gap: 10, padding: 20 },
            a: { textDecoration: 'underline', color: 'gray', wordBreak: 'break-all' }
          }}
        >
          <ul>
            <li>
              <Typography sx={{ fontSize: 16 }}>investment:</Typography>
              {/* <Port3CapTable /> */}
              <img src={port3Investment} alt="" width="100%" />
            </li>
            <li>
              <Typography sx={{ fontSize: 16 }}>KOL, media partners & big brands:</Typography>
              <a href="https://soquest.xyz/spaces" target="_blank" rel="noreferrer">
                https://soquest.xyz/spaces
              </a>
            </li>
          </ul>
        </Box>
      ]
    }
  ],
  tokenMetrics: [],
  desc: 'Port3 Network is a bridge between Web2 and Web3, led by Jump Crypto and Kucoin Ventures, with other investors including dozens of top tier institutions including EMURGO, Momentum6, SNZ, Adaverse and Gate Labs.',
  social: [
    <Link key={0} href="https://port3.io/" target="_blank">
      <Web />
    </Link>,
    <Link key={4} href="https://t.me/port3network" target="_blank">
      <img src={Telegram} width={40} />
    </Link>,
    <Link key={5} href="https://t.me/Port3_Network" target="_blank">
      <img src={Telegram} width={40} />
    </Link>,
    // <Link
    //   key={5}
    //   sx={{ width: '43px !important', height: '43px !important' }}
    //   href="https://www.instagram.com/create.protocol/?hl=en"
    //   target="_blank"
    // >
    //   <InstagramSvg width={43} height={43} />
    // </Link>,
    <Link key={6} href="https://twitter.com/Port3Network" target="_blank">
      <Twitter />
    </Link>,
    <Link key={7} href="https://discord.com/invite/JV5gT5cGCk" target="_blank">
      <DiscordSVG />
    </Link>,
    <Link key={8} href="https://medium.com/@Port3" target="_blank">
      <img src={Medium} width={40} />
    </Link>
  ],
  moreData: [
    { title: 'Token Name', content: '$PORT3' },
    { title: 'Token Price', content: '0.05 USDT' },
    { title: 'Token Amount', content: '2,000,000' },
    { title: 'Blockchain', content: 'Ethereum' }
  ],
  privatePrices: [
    { title: 'sale price', value: '1 PORT3 = 0.05 USDT' },
    { title: 'token offered', value: '2,000,000 PORT3' }
  ]
}
const SatoshiVMLPProjectInfo: IProjectInfo[] = [
  {
    title: 'What is SatoshiVM?',
    info: [
      <Stack key={0}>
        <p>
          SatoshiVM is a decentralized Bitcoin ZK Rollup Layer 2 solution compatible with the Ethereum Virtual Machine
          (EVM) ecosystem, using native BTC as gas. SatoshiVM bridges the EVM ecosystem with Bitcoin, enabling the
          Bitcoin ecosystem to issue assets and develop applications.
        </p>
        <Box sx={{ ul: { display: 'flex', flexDirection: 'column', gap: 10 } }}>
          <h4>SatoshiVM possesses the following technological features:</h4>
          <ul>
            <li>
              ZK EVM: SatoshiVM is a versatile ZK Rollup that employs EVM for off-chain computations. This implies that
              users can interact with SatoshiVM in a manner similar to interacting with Ethereum, and developers can
              build on top of SatoshiVM just as they would on Ethereum.
            </li>
            <li>
              ZK Rollup: SatoshiVM utilizes Rollup technology to bundle multiple transactions into a single batch and
              validate them on the Bitcoin main network as a single transaction. This ensures the same level of security
              as the Bitcoin main network, guaranteeing data validity and availability.
            </li>
            <li>
              ZK Fraud Proofs: SatoshiVM utilizes technologies such as Taproot and Bitcoin Script to perform on-chain
              verification of contracts without altering the consensus rules of the Bitcoin network, thereby
              accomplishing the computation of fraud proofs.
            </li>
            <li>
              Data Availability: SatoshiVM must release transaction data on the Bitcoin main network, enabling anyone to
              verify the correctness of computations executed off the Bitcoin main network.
            </li>
            <li>
              BTC Native Gas: SatoshiVM employs native BTC as gas for the EVM. Similar to ETH OP Rollup / ZK Rollup
              Layer 2 solutions that use ETH as gas for Layer 2, SatoshiVM utilizes BTC as the gas for EVM transactions.
            </li>
          </ul>
        </Box>
      </Stack>
    ]
  },
  // {
  //   title: 'Tokenomics',
  //   info: [
  //     <Box
  //       key={1}
  //       sx={{
  //         ' &>ul': {
  //           display: 'flex',
  //           flexDirection: 'column',
  //           gap: 10
  //         }
  //       }}
  //     >
  //       <p style={{ fontWeight: 500 }}>Total Supply = 21M $SAVM</p>
  //       <ul>
  //         <li>50% liquidity & bootstrapping</li>
  //         <li>30%: Chain rewards</li>
  //         <li>15%: Rewards for contributors</li>
  //         <li>5%: Token Launch on Bounce</li>
  //       </ul>
  //     </Box>
  //   ]
  // },
  {
    title: 'SatoshiVM’s Architecture',
    info: [
      <Stack key={0} sx={{ '& h5': { mb: 5 } }}>
        <p>As depicted in the diagram, the SatoshiVM chain comprises three layers:</p>
        <img src={satoshiVmArchitecture} style={{ width: '100%', height: '100%' }} />
        <div>
          <h4>Settlement Layer</h4>
          <p>
            This layer provides data availability, ordering, and validation of proofs for the SatoshiVM chain. It allows
            users and dApps to send messages and assets between Bitcoin and SatoshiVM. Bitcoin serves as the settlement
            layer, and bridges and rollup scripts are deployed on the Bitcoin network.
          </p>
        </div>
        <div>
          <h4>Sequencing Layer</h4>
          <p>
            This layer consists of an execution node responsible for executing transactions submitted to the SatoshiVM
            sequencer and transactions submitted to the L1 bridge script, generating L2 blocks. It also includes a
            Rollup node that handles batched transactions, publishes transaction data and block information to Bitcoin
            to ensure data availability, and submits validity proofs to Bitcoin for finality.
          </p>
        </div>
        <div>
          <h4>Proving Layer</h4>
          <p>
            This layer comprises a coordinator, which assigns proof tasks to provers and relays the generated proofs to
            the Rollup node to complete finality verification on Bitcoin. It also includes a prover pool, responsible
            for generating validity proofs that verify the correctness of L2 transactions.
          </p>
        </div>
      </Stack>
    ]
  },
  {
    title: 'Roadmap',
    info: [
      <Stack key={0} sx={{ '& h5': { mb: 5 } }}>
        {/* <p>As depicted in the diagram, the SatoshiVM chain comprises three layers:</p> */}
        <div>
          <h4>Testnet 2024 Q1</h4>
          <p>✅ Testnet Launch</p>
          <p>✅ Blockchain Explorer Launch </p>

          <p>Bitcoin - SatoshiVM Bridge Release</p>
          <p>EVM - SatoshiVM Bridge Release</p>
        </div>
        <div>
          <h4>SatoshiVM Lite 2024 Q1</h4>

          <p>Yellow Paper Release</p>
          <p>SatoshiVM Lite Release</p>
          <p>Blockchain Explorer Launch</p>
          <p>Bitcoin - SatoshiVM Bridge Release </p>
          <p>EVM - SatoshiVM Bridge Release</p>
        </div>
      </Stack>
    ]
  }
]
export const SatoshiVMLPData: IPrivatePadProp = {
  backedId: 21469,
  keyId: 27,
  liveTimeStamp: {
    start: 1705536000000,
    end: 1705622400000
  },
  hideUpcomingCountdown: true,
  poolTypeName: 'Initial LP Offering',
  img: 'https://images-v3.bounce.finance/a3d14b59ccffc2b476938141e4cb0964-1704859678.png',
  avatar: SatoshivmImg,
  title: 'SatoshiVM',
  chainId: 1,
  tokenName: '$ETH',
  whitePaperLink: 'https://github.com/SatoshiVM/whitepaper',
  upcomingLink: routes.thirdPart.SatoshiVMLp,
  liveLink: routes.thirdPart.SatoshiVMLp,
  projectInfo: SatoshiVMLPProjectInfo,
  tokenMetrics: [],
  desc: 'SatoshiVM is a decentralized Bitcoin ZK Rollup Layer 2 solution compatible with the Ethereum Virtual Machine (EVM) ecosystem, using native BTC as gas. SatoshiVM bridges the EVM ecosystem with Bitcoin, enabling the Bitcoin ecosystem to issue assets and develop applications.',
  social: [
    <Link key={0} href="https://www.satoshivm.io" target="_blank">
      <Web />
    </Link>,
    <Link key={6} href="https://twitter.com/SatoshiVM" target="_blank">
      <Twitter />
    </Link>,
    <Link key={7} href="https://discord.gg/satoshivm" target="_blank">
      <DiscordSVG />
    </Link>,
    <Link key={8} href="https://github.com/SatoshiVM" target="_blank">
      {GithubSvg}
    </Link>
  ],
  moreData: [
    { title: 'Reward Token', content: `$ETH` },
    { title: 'Ticket Price', content: '9.30 AUCTION / Ticket' },
    { title: 'Reward Claim Time', content: 'Ervery Sunday' },
    { title: 'Blockchain', content: 'Ethereum' }
  ],
  privatePrices: [
    { title: 'Reward Token', value: `$ETH` },
    { title: 'Blockchain', value: 'Ethereum' }
  ]
}
export const SatoshiVMRandomData: IPrivatePadProp = {
  backedId: 21472,
  keyId: 28,
  liveTimeStamp: {
    start: 1705536000000,
    end: 1705622400000
  },
  hideUpcomingCountdown: true,
  poolTypeName: 'Random Selection',
  img: 'https://images-v3.bounce.finance/a3d14b59ccffc2b476938141e4cb0964-1704859678.png',
  avatar: SatoshivmImg,
  title: 'SatoshiVM',
  chainId: 1,
  tokenName: '$SAVM',
  whitePaperLink: 'https://github.com/SatoshiVM/whitepaper',
  upcomingLink: routes.thirdPart.SatoshiVMRandom,
  // upcomingLink: '',
  liveLink: routes.thirdPart.SatoshiVMRandom,
  // liveLink: '',
  projectInfo: SatoshiVMLPProjectInfo,
  tokenMetrics: [],
  desc: 'SatoshiVM is a decentralized Bitcoin ZK Rollup Layer 2 solution compatible with the Ethereum Virtual Machine (EVM) ecosystem, using native BTC as gas. SatoshiVM bridges the EVM ecosystem with Bitcoin, enabling the Bitcoin ecosystem to issue assets and develop applications.',
  social: [
    <Link key={0} href="https://www.satoshivm.io" target="_blank">
      <Web />
    </Link>,
    <Link key={6} href="https://twitter.com/SatoshiVM" target="_blank">
      <Twitter />
    </Link>,
    <Link key={7} href="https://discord.gg/satoshivm" target="_blank">
      <DiscordSVG />
    </Link>,
    <Link key={8} href="https://github.com/SatoshiVM" target="_blank">
      {GithubSvg}
    </Link>
  ],
  moreData: [
    { title: 'Token Name', content: '$SAVM' },
    { title: 'Ticket Price', content: '3.72 AUCTION / Ticket' },
    // { title: 'Ticket Price', content: 'TBD' },
    { title: 'Token Amount / Ticket', content: '420,000 SAVM' },
    { title: 'Blockchain', content: 'Ethereum' }
  ]
}
export const PrivatePadDataList: IPrivatePadProp[] = [
  // current privatePad max keyId is 28
  SatoshiVMLPData,
  SatoshiVMRandomData,
  AiMeetsBtcRandomData,
  Port3Data,
  AmmxAuctionData,
  AmmxDaiiData,
  AmmxRandomData,
  PrivateStakeAuctionData,
  PrivateStakeDaiiData,
  PrivateRandomGodidData,
  PrivatePadCoinData,
  {
    keyId: 17,
    backedId: 18606,
    liveTimeStamp: {
      start: 1701230400000,
      end: 1701316800000
    },
    poolTypeName: 'Fixed Price Auction',
    img: 'https://images-v3.bounce.finance/a01d5ff09f6faebd837acf62beaa9e29-1701055097.png',
    avatar: BitStableLogo,
    title: 'BitStable',
    chainId: 1,
    tokenName: '$BSSB',
    whitePaperLink: 'https://docs.bitstable.finance/',
    upcomingLink: '/launchpad/bitstable',
    liveLink: '/launchpad/bitstable',
    projectInfo: [
      {
        title: 'What is BitStable?',
        info: [
          <>
            The BitStable Protocol is the platform through which anyone, anywhere can generate the DAII stablecoin
            against bitcoin ecosystem collateral assets.
          </>
        ]
      },
      {
        title: 'How does BitStable work?',
        info: [
          <Box
            key={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              '&>div>em': { fontSize: 16 },
              '& em': {
                fontWeight: 600
              }
            }}
          >
            <Box>
              <em>BSSB Staking Rewards Explained</em>
              <ul>
                <li>
                  <em>Staking Process: </em>Users stake DAII (a BRC20 token) to earn BSSB rewards.
                </li>
                <li>
                  <em>Reward Structure:</em>A fixed daily reward of 0.1% is distributed for 365 days, based on the
                  weight of each stake. Using BSSB can increase the weight of your staked DAII.
                </li>
              </ul>
            </Box>
            <Box>
              <em>Bridging and Token Conversion with MultiBit</em>
              <ul>
                <li>
                  <em>DAII on Different Blockchains: </em> DAII minted on the Bitcoin blockchain can be converted to an
                  ERC20 token on Ethereum.
                </li>
                <li>
                  <em>Token Swapping:</em>DAII can be exchanged at a 1:1 ratio with stablecoins like USDC or USDT on the
                  Ethereum network.
                </li>
                <li>
                  <em>Partnership with MultiBit Bridge:</em>This enables cross-chain transfers between Bitcoin, Ethereum
                  Virtual Machine (EVM) compatible networks, and other Layer 1 blockchains.
                </li>
                <li>
                  <em>Redemption Process:</em>To retrieve collateral or USDT on Ethereum, users must redeem DAII on the
                  BitStable platform, balancing out the original transaction.
                </li>
              </ul>
            </Box>
            <Box>
              <em>Overcollateralization and Liquidation Mechanics</em>
              <ul>
                <li>
                  <em>Safe Overcollateralization Rate: </em> The BSSB protocol establishes a high overcollateralization
                  rate to reduce liquidation risks, assuming a 50% ratio. This implies you receive DAII equal to 50% of
                  your collateral's value.
                </li>
                <li>
                  <em>Liquidation Plan:</em>Despite the high overcollateralization rate, a liquidation strategy is in
                  place for safety, with the 'Health factor' serving as a reference metric.
                </li>
              </ul>
            </Box>
            <Box>
              <em>Stake and Liquidation Formula Example with ORDI</em>
              <ul>
                <li>
                  <em>Calculating Overcollateralization for ORDI: </em> With an 80% ratio, the maximum DAII you can
                  receive is 20% of the 'ORDI's value.
                </li>
                <li>
                  <em>Health Factor Formula: </em>Health factor = [1 - (DAII value built / (ORDI quantity x Price)) +
                  0.2] x 100.
                </li>
                <li>
                  <em>Example Calculations:</em>
                  <ul>
                    <li>
                      If 1 ORDI = 100 USDT, staking it gets you 20 DAII. The Health factor is then calculated as 100.
                    </li>
                    <li>For building 10 DAII, the Health factor increases to 110.</li>
                    <li>If the ORDI price drops to 50 USDT, the Health factor decreases to 80.</li>
                    <li>
                      A drop in ORDI price to 20 USDT brings the Health factor down to 20, triggering liquidation.
                    </li>
                  </ul>
                  <img style={{ width: '100%', maxWidth: 600, margin: '0 auto', marginTop: 20 }} src={BitStableInfo} />
                </li>
              </ul>
            </Box>
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
            <ul>
              <li>Total Supply of $BSSB: 21,000,000</li>
              <li>Token Launch: 50% of Total Supply on Bounce Finance</li>
              <li>Total Raise Through Token Launch: 500,000 USDC</li>
              <li>Team Allocation: 5% (6-month lock and linear vesting for 15 months)</li>
              <li>Airdrop: 3.5%</li>
              <li>Staking Rewards: 36.5%</li>
              <li>LP: 5% (locked indefinitely)</li>
              <li>Total Supply of DAII: 1,000,000,000</li>
              <li>FDV=1,000,000 USDC</li>
            </ul>
          </Box>
        ]
      }
    ],
    tokenMetrics: [],
    desc: 'The BitStable Protocol is the platform through which anyone, anywhere can generate the DAII stablecoin against bitcoin ecosystem collateral assets.',
    social: [
      <Link key={0} href="https://bitstable.finance/" target="_blank">
        <Web />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$BSSB' },
      { title: 'Token Price', content: '0.0000233 ETH' },
      { title: 'Token Amount', content: '4,200,000' },
      { title: 'Blockchain', content: 'Ethereum' }
    ]
  },
  {
    hidden: true,
    keyId: 15,
    backedId: 18555,
    liveTimeStamp: {
      start: 1697360400000,
      end: 1697965200000
    },
    // hideUpcomingCountdown: true,
    poolTypeName: 'Fixed Swap Auction',
    img: 'https://images-v3.bounce.finance/2e48f48ac5a9717b679ca051e8a43c8c-1697094683.png',
    pageInImg: 'https://images-v3.bounce.finance/2d282148ec8905a28b2157b7641e265a-1697122606.png',
    avatar: FinceptorAvatar,
    title: 'Finceptor',
    chainId: 56,
    tokenName: '$FINC',
    whitePaperLink: 'https://docs.finceptor.app/',
    upcomingLink: '/launchpad/finceptor',
    liveLink: '/launchpad/finceptor',
    projectInfo: [
      {
        title: 'What is Finceptor?',
        info: [
          <Typography key={1}>
            Finceptor is a DeFi liquidity protocol with a launchpad plug-in, enabling unlaunched and publicly traded
            tokens to build protocol-owned liquidity – solving DeFi 1.0’s mercenary liquidity problem. Liquidity Mining,
            providing token incentives to retail liquidity providers (LP), is highly expensive, unsustainable,
            mercenary, and rented. DeFi needs better liquidity management. We’re building a suite of first-in-the-market
            liquidity products enabling projects to bootstrap and grow their protocol-owned liquidity – liquidity vaults
            and bonds. Moreover, we also have our own launchpad plug-in strategically placed to attract top Web3
            projects and help them grow their liquidity.
          </Typography>,
          <Box
            key={2}
            sx={{
              '& ul li': { margin: '5px 0' },
              '&>ul>li': { marginTop: 15 },
              '& a': {
                textDecoration: 'underline',
                color: 'gray'
              }
            }}
          >
            <ul>
              <li>
                Product Suite
                <ul>
                  <li>
                    <strong> Liquidity Vault</strong> is an on-chain initial liquidity bootstrapping tool to build
                    protocol-owned liquidity for unlaunched tokens.
                  </li>
                  <li>
                    <strong>Bond</strong> is a structured protocol-owned liquidity growth and token liquidation tool for
                    publicly traded tokens.
                  </li>
                  <li>
                    <strong>Launchpad</strong> for a strategic token launch and sales arm.
                  </li>
                </ul>
              </li>
              <li>
                Features
                <ul>
                  <li>Social Allocations: Web3 Quest-based allocation distribution.</li>
                  <li>Credit Protocol: A in-protocol $USDT based credit system powered by $FCT token.</li>
                  <li>Liquidity 2.0: Protocol-owned liquidity via bonds.</li>
                  <li>Social/Web2 auth ( coming ).</li>
                </ul>
              </li>
              <li>
                Highlights
                <ul>
                  <li>
                    Accelerated by{' '}
                    <a
                      href="https://turktelekomventures.com.tr//girisimler/tt-pilot-girisimleri/finceptor/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Turk Telekom Ventures,{' '}
                    </a>
                    <a href="https://www.denizakvaryum.io/en/all-startups/finceptor" target="_blank" rel="noreferrer">
                      Neohub{' '}
                    </a>
                    and{' '}
                    <a
                      href="https://www.brinc.io/blog/brinc-announces-summer-2023-cohort-for-web3-focused-accelerator-programs/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Brinc VC
                    </a>
                    .
                  </li>
                  <li>
                    Mainnet live with $300k total volume financed on Avalanche and BNB Chain — $250k subscribed in under
                    120 hours and $50k subscribed in under 120 seconds (FCFS).
                  </li>
                  <li>+6,100 active KYC-verified users in 3 months.</li>
                  <li>+90,000 community in 3 months.</li>
                  <li>+250 curated KOLs with 50M reach.</li>
                  <li>+65 affiliate referral partners.</li>
                  <li>Battle-tested infrastructure with +10k unique testers and +100k transactions.</li>
                  <li>
                    Accelerated by{' '}
                    <a href="https://www.brinc.io/blockchain/" target="_blank" rel="noreferrer">
                      ZK Advancer S-23
                    </a>
                    , Brinc's Web3 accelerator backed by Animoca Brands.
                  </li>
                  <li>
                    Accelerated and received financial support{' '}
                    <a href="https://www.brinc.io/blockchain/" target="_blank" rel="noreferrer">
                      from{' '}
                    </a>
                    <a
                      href="https://www.f6s.com/polygon-hypernest-defi-accelerator-2023"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {' '}
                      Polygon Labs Hypernest DeFi
                    </a>
                    .
                  </li>
                  <li>
                    Incubated by <strong> Yapı Kredi</strong>, one of Turkey's largest private banks, in partnership
                    with Ava Labs.
                  </li>
                  <li>
                    Received financial and platform grants from <strong>Alchemy WAGBI</strong>, Microsoft for Startups,
                    Google for Web3 Startups, BNB Chain Kickstart, and Startup with Chainlink.
                  </li>
                  <li>Audited by Peckshield.</li>
                  <li>Market Making by Kairon Labs.</li>
                </ul>
              </li>
            </ul>
          </Box>
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
              }
            }}
          >
            <Typography>
              <strong>Public Round is Subject to Change</strong>
            </Typography>
            <a
              href="https://docs.google.com/spreadsheets/d/1_43S6DusKa_5C_AlWYsqJOCSVNesFnd73ekNG1aPLxw/edit#gid=290952973"
              target="_blank"
              rel="noreferrer"
            >
              https://docs.google.com/spreadsheets/d/1_43S6DusKa_5C_AlWYsqJOCSVNesFnd73ekNG1aPLxw/edit#gid=290952973
            </a>
          </Box>
        ]
      },
      {
        title: 'Investment and Partners',
        info: [
          <Box
            key={1}
            sx={{
              '& ul li': { margin: '10px 0' },
              '& a': {
                textDecoration: 'underline',
                color: 'gray'
              }
            }}
          >
            <ul>
              <li>
                {' '}
                <strong>Investors/Cap table: </strong> Brinc VC, Evox Capital, Keiretsu Forum, Q Angels, IBSS, and
                Hypernest DAO.
              </li>
              <li>
                <strong>Strategic partners/Supporters:</strong>
                <a href="https://twitter.com/BNBCHAIN/status/1698788021624263021?s=20" target="_blank" rel="noreferrer">
                  {' '}
                  BNB Chain{' '}
                </a>
                , Polygon, Neohub,{' '}
                <a
                  href="https://x.com/SpaceIDProtocol/status/1705886980146421766?s=20"
                  target="_blank"
                  rel="noreferrer"
                >
                  Space ID
                </a>{' '}
                , Chainlink Labs, Shardeum.
              </li>
            </ul>
          </Box>
        ]
      },
      {
        title: 'Contract Audit',
        info: [
          <Box key={1} sx={{ '& ul li': { margin: '5px 0' } }}>
            <ul>
              <li>
                Peckshield:{` `}
                <a
                  href="https://docs.finceptor.app/fundamentals/audit"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'underline' }}
                >
                  https://docs.finceptor.app/fundamentals/audit
                </a>
              </li>
            </ul>
          </Box>
        ]
      },
      participateProjectInfo
    ],
    tokenMetrics: [],
    desc: 'Finceptor is a multi-chain liquidity and community growth platform for unlaunched and publicly-traded tokens through liquidity vaults and DeFi bonds.',
    social: [
      <Link key={0} href="https://finceptor.app/" target="_blank">
        <Web />
      </Link>,
      <Link key={4} href="https://finceptorapp.medium.com/" target="_blank">
        <img src={Telegram} width={40} />
      </Link>,
      // <Link
      //   key={5}
      //   sx={{ width: '43px !important', height: '43px !important' }}
      //   href="https://www.instagram.com/create.protocol/?hl=en"
      //   target="_blank"
      // >
      //   <InstagramSvg width={43} height={43} />
      // </Link>,
      <Link key={6} href="https://twitter.com/FinceptorApp" target="_blank">
        <Twitter />
      </Link>,
      <Link key={7} href="https://discord.com/invite/finceptor" target="_blank">
        <DiscordSVG />
      </Link>,
      <Link key={8} href="https://finceptorapp.medium.com/" target="_blank">
        <img src={Medium} width={40} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$FINC' },
      { title: 'Token Price', content: '0.05 USDT' },
      { title: 'Token Amount', content: '1,000,000' },
      { title: 'Blockchain', content: 'BNB' }
    ]
  },
  {
    hidden: true,
    keyId: 13,
    liveTimeStamp: {
      start: 1690672533200000,
      end: 0
    },
    hideUpcomingCountdown: true,
    poolTypeName: 'Fixed Swap Auction',
    img: SolaceImg,
    avatar: SolaceAvatar,
    title: 'Solace',
    chainId: 1,
    tokenName: '$SGT',
    whitePaperLink: 'https://docs.solace.fi/solace-docs-v2/solace-protocol/introduction',
    upcomingLink: '/launchpad/solace',
    liveLink: '/launchpad/solace',
    projectInfo: [
      {
        title: 'What is Solace?',
        info: [
          'Solace is a DeFi protocol built on top of Ajna protocol. Solace introduces veTokenomics on a set of markets across Ajna, purposefully created to accept derivatives as collateral for borrowing ETH (or stablecoins). By implementing this integration, Solace Protocol encourages the influx of liquidity into derivatives lending markets, enabling enhanced risk ad yield strategies'
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
              }
            }}
          >
            <a href="https://docs.solace.fi/solace-docs-v2/sgt-token/sgt-and-vesgt">
              https://docs.solace.fi/solace-docs-v2/sgt-token/sgt-and-vesgt
            </a>
          </Box>
        ]
      },
      {
        title: 'Investment and Partners',
        info: [
          'Parataxis Capital, LD capital, Prycto, StableLab, Stake capital, Julien Bouteloup (StakeDAO), Sandeep Nailwal (Polygon), Illia Polosukhin (Near), Evgeny Yurtaev (Zerion), Alex Shevchenko (Aurora), Aleksander Larsen and Jeffrey Zirlin (Axie Infinity), Seth Ginns (Coinfund), Kiril Nikolov (Nexo) — investors; Preston van Loon (Offchain Labs), Cameron Dennis (Near), Gustav Arentoft (1Inch), Arjun Kalsy (Mantle) — advisors; Ajna — partner'
        ]
      },
      {
        title: 'Contract Audit',
        info: [
          <Box key={1} sx={{ '& ul li': { margin: '5px 0' } }}>
            <ul>
              <li>
                Code4rena in October; Ajna's contracts were audited by quantstamp, sherlock and code4rena
                <ul>
                  <li>
                    <a
                      href="https://github.com/ajna-finance/audits"
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: 'underline' }}
                    >
                      https://github.com/ajna-finance/audits
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </Box>
        ]
      },
      participateProjectInfo
    ],
    tokenMetrics: [],
    desc: 'Solace is a DeFi protocol built on top of Ajna protocol. Solace introduces veTokenomics on a set of markets across Ajna, purposefully created to accept derivatives as collateral for borrowing ETH (or stablecoins). By implementing this integration, Solace Protocol encourages the influx of liquidity into derivatives lending markets, enabling enhanced risk ad yield strategies.',
    social: [
      <Link key={0} href="http://solace.fi/" target="_blank">
        <Web />
      </Link>,
      <Link key={2} href="https://discord.com/invite/XKrQgwAjBa" target="_blank">
        <DiscordSVG />
      </Link>,
      <Link key={6} href="https://twitter.com/solacefi" target="_blank">
        <Twitter />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$SGT' },
      { title: 'Token Price', content: 'TBD' },
      { title: 'Token Amount', content: 'TBD' },
      { title: 'Blockchain', content: 'Ethereum' }
    ]
  },
  {
    backedId: 18578,
    keyId: 16,
    liveTimeStamp: {
      start: 1699761600000,
      end: 1700028000000
    },
    hideUpcomingCountdown: true,
    poolTypeName: 'Fixed Swap Auction',
    pageInImg: MultibitBanner,
    img: 'https://images-v3.bounce.finance/0aa4a14f2ae496f7dd3be777d5054453-1699525289.png',
    avatar: MultiBitAva,
    title: 'MultiBit Bridge',
    chainId: 1,
    tokenName: '$MUBI',
    whitePaperLink: '',
    upcomingLink: '/launchpad/multibit',
    liveLink: '/launchpad/multibit',
    projectInfo: [
      {
        title: 'What is MultiBit Bridge?',
        info: [
          <Box key={1}>
            MultiBit is the first-ever dual-sided bridge designed for easy cross-network transfers between BRC20 and
            ERC20 tokens. Through promoting unmatched liquidity for these tokens, MultiBit heightens cross-chain
            interoperability. Our mission is simple: to foster increased liquidity and accessibility for BRC and ERC
            tokens in a secure and user-friendly manner.
          </Box>
        ]
      },
      {
        title: 'How it all works',
        info: [
          <Box key={6}>
            MultiBit streamlines the token transfer process between Bitcoin's BRC20 and EVM networks. It begins with
            users transferring BRC20 tokens to a dedicated BRC20 address. Upon confirmation, these tokens are primed for
            minting on the EVM network. But MultiBit's uniqueness lies in its dual-sided bridge feature, enabling
            equally seamless transfers from EVM networks back to Bitcoin. With MultiBit, bridging and minting tokens for
            cross-chain transfers between Bitcoin and EVM networks is an effortless process.
            <div style={{ width: '100%', height: '100%', marginTop: 10 }}>
              <img src={MultibitContent1} style={{ width: '100%', height: '100%' }} />
            </div>
          </Box>
        ]
      },
      {
        title: 'Ecosystem',
        info: [
          <Box key={7}>
            <div>
              <strong>Ordinals AMM</strong>
              <ul>
                <li>
                  MultiBit's Ordinals Automated Market Maker (OAMM) is a decentralized exchange protocol designed
                  specifically for trading Ordinals ($ORDI) tokens. It leverages the principles of automated market
                  making to provide liquidity, enable seamless token swaps, and facilitate efficient price discovery for
                  $ORDI and other paired tokens.
                </li>
              </ul>
            </div>
            <div>
              <strong style={{ marginTop: 10 }}>Ordinals Farming</strong>
              <ul>
                <li>
                  MultiBit offers Farming Ordinals ($ORDI), an exciting opportunity for the BRC community to earn
                  additional $ORDI tokens by providing liquidity or staking preferred tokens in selected pools. The
                  farming process allows participants to contribute to the liquidity of the $ORDI ecosystem while being
                  rewarded for their contribution.
                </li>
              </ul>
            </div>
            <div>
              <strong style={{ marginTop: 10 }}>Ordinals Stablecoin</strong>
              <ul>
                <li>
                  Ordinals Stablecoin is backed by a specific ratio of Ordinals ($ORDI) tokens held as collateral. These
                  $ORDI tokens serve as a reserve to support the stability and value of the stablecoin. The
                  collateralization mechanism ensures that the value of the stablecoin remains pegged to a 1:1 ratio to
                  USDC.
                </li>
              </ul>
            </div>
          </Box>
        ]
      },
      {
        title: 'Distribution',
        info: [
          <Box key={3}>
            <Typography sx={{ textIndent: 20 }}>$400,000 USDC = Initial FDV (all available at launch)</Typography>
            <ul key={2}>
              <li>KOL Whitelist Sale (Same Price as Public Sale): 11.25%</li>
              <li>Public Sale: 78.75%</li>
              <li>5% DEX liquidity locked forever</li>
              <li>5% team 6 months lock then linear vesting for 2 years</li>
            </ul>
          </Box>
        ]
      },
      {
        title: 'Roadmap',
        info: [
          <Box key={3}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                November 2023: Token Generation Event (TGE): Multibit launches its native token through a TGE event,
                providing users with opportunities for participation and token acquisition.
              </li>
              <li>
                Q4 2023: Expanded Token Support: Multibit adds support for a wide range of BRC20 and ERC20 tokens,
                expanding its offering to allow users to bridge and interact with an increasing number of tokens.
              </li>
              <li>
                Q1 2024: Enhanced User Interface and Experience: Multibit focuses on improving its interface, making it
                more intuitive and user-friendly to enhance the overall experience for users.
              </li>
              <li>
                Q1 2024: Integration with Additional DeFi Protocols: Multibit integrates with more DeFi protocols,
                enabling users to leverage their bridged tokens for activities such as lending, borrowing, yield
                farming, and decentralized exchanges.
              </li>
              <li>
                Q1-Q2 2024: Partnerships and Collaborations: Multibit forms partnerships and collaborations with other
                blockchain projects, exchanges, and DeFi platforms to expand its reach, increase liquidity options, and
                foster interoperability.
              </li>
            </ul>
          </Box>
        ]
      },
      {
        title: 'Contract Audit',
        info: [
          <a href="https://github.com/multibit-repo/audit" key={5} target="_blank" rel="noreferrer">
            https://github.com/multibit-repo/audit
          </a>
        ]
      }
    ],
    tokenMetrics: [],
    desc: 'MultiBit is the first-ever dual-sided bridge designed for easy cross-network transfers between BRC20 and ERC20 tokens. Through promoting unmatched liquidity for these tokens, MultiBit heightens cross-chain interoperability. Our mission is simple: to foster increased liquidity and accessibility for BRC and ERC tokens in a secure and user-friendly manner.',
    social: [
      <Link key={0} href="https://multibit.exchange/" target="_blank">
        <Web />
      </Link>,
      <Link key={4} href="https://t.me/multibitprotocol" target="_blank">
        <img src={Telegram} width={40} />
      </Link>,
      <Link key={6} href="https://twitter.com/Multibit_Bridge" target="_blank">
        <Twitter />
      </Link>,
      <Link key={8} href="https://medium.com/@Multibit_Bridge" target="_blank">
        <img src={Medium} width={40} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$MUBI' },
      { title: 'Token Price', content: '0.00000022709 ETH' },
      { title: 'Token Amount', content: '387500000' },
      { title: 'Blockchain', content: 'Ethereum' }
    ]
  },
  {
    keyId: 11,
    liveTimeStamp: {
      start: 1698847200000,
      end: 1698933600000
    },
    backedId: 18569,
    hideUpcomingCountdown: true,
    poolTypeName: 'ERC20 English Auction',
    poolTypeName2: 'ERC20 Dutch Auction',
    img: DipImg,
    avatar: DipAvatar,
    title: 'DIP Exchange',
    chainId: 8453,
    tokenName: '$DIP',
    whitePaperLink: 'https://app.gitbook.com/o/nRZfswQcmwpKWJZsyU7w/home',
    upcomingLink: '/launchpad/dip_exchange',
    liveLink: '/launchpad/dip_exchange',
    projectInfo: DipProjectInfo,
    tokenMetrics: DipTokenMetrics,
    desc: 'DIP Exchange is a decentralized perpetual exchange that aims to be the go-to platform for traders looking for a professional risk management environment and a fully decentralized governance mechanism.',
    social: [
      <Link key={0} href="https://dip.exchange" target="_blank">
        <Web />
      </Link>,
      <Link key={1} href="https://twitter.com/DIP_Exchange" target="_blank">
        <Twitter />
      </Link>,
      <Link key={2} href="https://discord.gg/dip-exchange" target="_blank">
        <DiscordSVG />
      </Link>,
      <Link key={3} href="https://medium.com/dip-exchange" target="_blank">
        <img src={Medium} width={40} />
      </Link>,
      <Link key={4} href="https://t.me/dip_exchange" target="_blank">
        <img src={Telegram} width={40} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$DGT' },
      { title: 'Auction Method', content: 'Dutch Auction' },
      { title: 'Token Amount', content: '250,000' },
      { title: 'Blockchain', content: 'BASE' }
    ],
    privatePrices: [
      // {
      //   title: ['DIP Auction Method'],
      //   value: ['ERC20 English Auction']
      // },
      // {
      //   title: ['DIP Token Offered'],
      //   value: 'TBD $DIP'
      // },
      {
        title: ['DGT Token Offered'],
        value: '$DGP'
      },
      {
        title: ['DGT Auction Method'],
        value: 'ERC20 Dutch Auction'
      }
    ],
    isFAQ: true
  },
  // {
  //   keyId: 12,
  //   liveTimeStamp: {
  //     start: 16908668000000,
  //     end: 16908668000000
  //   },
  //   hideUpcomingCountdown: true,
  //   poolTypeName: 'Fixed Swap Auction',
  //   img: MetaBlox,
  //   avatar: MetaBloxAvatar,
  //   title: 'MetaBlox',
  //   chainId: 1,
  //   tokenName: '$MTBX',
  //   whitePaperLink: 'https://drive.google.com/file/d/1TqN0LbGkcOomz3hT-T38InSnJZV8GRrR/view',
  //   upcomingLink: '/launchpad/metablox',
  //   liveLink: '/launchpad/metablox',
  //   projectInfo: [
  //     {
  //       title: 'What is MetaBlox?',
  //       info: [
  //         'MetaBlox is building an omni chain and decentralized WiFi OpenRoaming network powered by the latest telecommunications and Web3 technologies. Through the integration of Decentralized Identifiers (DID) and WiFi, users can connect to WiFi networks without the hassle of passwords or usernames. Metablox is better than Helium because it uses innovative Mining Mechanism: Proof-of-Service and Proof-of-Validation to encourage service in polulated and crowded metro areas.',
  //         `MetaBlox offers access to 3,000,000 WiFi mining locations on Day 1, and aims to expand this network to 6,000,000 mining locations by 2025. As of Apr 2023, 2,500 miners was active. Metablox@ONE dapp is already the top 3 gas burners in Harmony One.
  //         MetaBlox is the only web3 project that was officially listed into WiFi Standard by the WBA(Wireless Broadband Alliance), together with Cisco, Google etc. By incentivizing WiFi and Cellular with web3, MetaBlox is leading the industry transformation, making global WiFi roaming a reality.`
  //       ]
  //     },
  //     {
  //       title: 'Investment and Partners',
  //       info: [
  //         <Box key={1}>
  //           <Typography sx={{ fontSize: 18, fontWidth: 700 }}>Seed Round:</Typography>
  //           <Typography mt={10}>
  //             MetaBlox has raised $3 million in funding from various prominent investors and institutions. These include
  //             Synergies, Collab+Currency, SNZ, Harmony ONE, Future Life, NFT Tech, Airswift, and Slope.
  //           </Typography>
  //         </Box>
  //       ]
  //     }
  //   ],
  //   tokenMetrics: [],
  //   desc: 'MetaBlox is building an omni chain and decentralized WiFi OpenRoaming network powered by the latest telecommunications and Web3 technologies. Through the integration of Decentralized Identifiers (DID) and WiFi, users can connect to WiFi networks without the hassle of passwords or usernames. Metablox is better than Helium because it uses innovative Mining Mechanism: Proof-of-Service and Proof-of-Validation to encourage service in polulated and crowded metro areas.',
  //   social: [
  //     <Link key={0} href="http://metablox.io/" target="_blank">
  //       <Web />
  //     </Link>,
  //     <Link key={2} href="https://discord.com/invite/metablox" target="_blank">
  //       <DiscordSVG />
  //     </Link>,
  //     <Link key={4} href="https://t.me/ChatonMetaBloxCommunity" target="_blank">
  //       <img src={Telegram} width={40} />
  //     </Link>,
  //     <Link key={6} href="https://twitter.com/metablox" target="_blank">
  //       <Twitter />
  //     </Link>
  //   ],
  //   moreData: [
  //     { title: 'Token Name', content: '$MTBX' },
  //     { title: 'Token Price', content: '0.03' },
  //     { title: 'Token Amount', content: 'TBD' },
  //     { title: 'Blockchain', content: 'Ethereum' }
  //   ]
  // },

  {
    keyId: 14,
    backedId: 18567,
    liveTimeStamp: {
      start: 1698066000000,
      end: 1698411600000
    },
    poolTypeName: 'Fixed Swap Auction',
    img: CreateProtocol,
    avatar: CreateProtocolAvatar,
    pageInImg: CreateProtocolPage,
    title: 'Create',
    chainId: 1,
    tokenName: '$CREATE',
    whitePaperLink: 'https://createprotocol.gitbook.io/create-protocol-whitepaper/',
    upcomingLink: '/launchpad/create_protocol',
    liveLink: '/launchpad/create_protocol',
    projectInfo: [
      {
        title: 'What is Create Protocol?',
        info: [
          <>
            Create Protocol is a complete stack that provides a number of protocols that are building blocks for Web 3.0
            applications. These protocols include: <br />
            ⚡️A decentralized identity system that allows users to control their own data and privacy. <br />
            ⚡️A creative object model that defines the data structure for digital assets. <br />
            ⚡️A cDapp composer that makes it easy to create and deploy decentralized applications. <br />
            ⚡️Deagi AI Attribution Engine that allows devs to integrate apps / learning models to the IP repository in
            a way where IP owners/creators have the control over use of their data and its economic incentivisation.
          </>
        ]
      },
      {
        title: 'Advantages',
        info: [
          <ul key={1} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <li>
              Chain agnostic interoperability: The Create Protocol allows applications to communicate with each other,
              regardless of the blockchain they are running on. This makes it possible to build truly cross-chain
              applications that can take advantage of the best features of each blockchain.
            </li>
            <li>
              Decentralized AI infrastructure: The Create Protocol uses decentralized AI technology to provide a more
              secure, reliable, and transparent platform for creators and users.
            </li>
            <li>
              Independent token: The $CREATE token is an independent token that can be used to pay for services, access
              features, and participate in governance. This gives users more control over their assets.
            </li>
            <li>
              Building blocks for Web 3.0 applications: The Create Protocol provides a number of protocols that are
              building blocks for Web 3.0 applications. This makes it easier for developers to build and deploy
              decentralized applications.
            </li>
            <li>
              The Create Protocol is the future of Web 3.0. It is the platform that will make it possible for creators
              and users to truly own their data and assets, and to build and use applications that are secure, reliable,
              and transparent.If you are a creator or a user who is looking for a more decentralized and secure way to
              create, share, and monetize content, then the Create Protocol is the platform for you.
            </li>
          </ul>
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
              }
            }}
          >
            <a href="https://drive.google.com/drive/folders/1Llx30IcVzp2W0sEyY7MMDbsurM0cR2yE?usp=sharing">
              https://drive.google.com/drive/folders/1Llx30IcVzp2W0sEyY7MMDbsurM0cR2yE?usp=sharing
            </a>
          </Box>
        ]
      },
      {
        title: 'Investment and Partners',
        info: [
          <ul key={1}>
            <li>
              Investors - Ice Capital ( UAE ) - <strong> Lead investor</strong>
            </li>
            <li>
              <p>
                Cogitent Ventures ( USA ) - <strong>Co Lead</strong>
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li>Snowy August Family Office - ( Miami )</li>
                <li>Stanford AI and Web3 club angels ( USA )</li>
                <li>Lalit Mangal CEO, Airmeet, previous startup acquired @ $200 mn ( India )</li>
                <li>
                  Hue Nguyen : Ex SEC USA + Official Advisor (USA)
                  <br />
                  Waqar Zaka : Blockchain Influencer, 5 million + followers ( Asia )
                </li>
                <li>Grant Gunderson : Draper’s Associate + Official Advisor ( San Fransisco )</li>
                <li>Kalyan Singh : Co-founder, Lumenci ( Austin )</li>
                <li>Abhimanyu Lamba : International Growth Lead, Canva ( Australia )</li>
                <li>Sayantan Biswas : Co-founder, UniAcco ( London )</li>
                <li>Aashish Jindal : Co-founder, GripInvest ( India )</li>
                <li>Sian Elizabeth : Sian Elizabeth Wellness ( London )</li>
                <li>Bharat Thakur : Creator - Royal Artist ( Dubai )</li>
              </ul>
            </li>
            <li>
              {/* <div>and many more.</div> */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li>KOL - Waqar Zaka Few Degen KOLs</li>
                <li>Media Partners - Edge of NFT</li>
                <li>Big Brands - Binance Polygon</li>
              </ul>
            </li>
          </ul>
        ]
      },
      participateProjectInfo
    ],
    tokenMetrics: [],
    desc: 'The Create Protocol is an AI-based Web 3.0 infrastructure designed to harness the true power of digital assets. It provides chain agnostic interoperability across Web 2.0 and Web 3.0, making it easier for developers and users to build and use applications that are secure, reliable, and transparent.',
    social: [
      <Link key={0} href="https://www.createprotocol.org/" target="_blank">
        <Web />
      </Link>,
      <Link key={4} href="https://t.me/CreateProtocolOfficial" target="_blank">
        <img src={Telegram} width={40} />
      </Link>,
      <Link
        key={5}
        sx={{ width: '43px !important', height: '43px !important' }}
        href="https://www.instagram.com/create.protocol/?hl=en"
        target="_blank"
      >
        <InstagramSvg width={43} height={43} />
      </Link>,
      <Link key={6} href="https://twitter.com/CreateProtocol" target="_blank">
        <Twitter />
      </Link>,
      <Link key={7} href="https://discord.com/invite/M2xcC2Cex5" target="_blank">
        <DiscordSVG />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$CREATE' },
      { title: 'Token Price', content: '0.00069 AUCTION' },
      { title: 'Token Amount', content: '7,200,000' },
      { title: 'Blockchain', content: 'Ethereum' }
    ]
  },
  {
    keyId: 9,
    backedId: 18317,
    liveTimeStamp: {
      start: 1689436800000,
      end: 1689609600000
    },
    poolTypeName: 'Fixed Swap Auction',
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
      <Link key={5} href="https://www.instagram.com/deelanceofficial/" target="_blank">
        <InstagramSvg width={40} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$DLANCE' },
      { title: 'Token Price', content: '0.029 USDT' },
      { title: 'Token Amount', content: '3,647,215' },
      { title: 'Blockchain', content: 'Ethereum' }
    ]
  },
  {
    keyId: 10,
    backedId: 18329,
    liveTimeStamp: {
      start: 1689436800000,
      end: 1689609600000
    },
    hideUpcomingCountdown: true,
    poolTypeName: 'Whitelist',
    img: Deelance,
    avatar: DeelanceAvatar,
    title: 'Deelance',
    chainId: 1,
    tokenName: '$DLANCE',
    whitePaperLink: 'https://docs.deelance.com/',
    upcomingLink: routes.thirdPart.DeelanceAuctionWhitelist,
    liveLink: routes.thirdPart.DeelanceAuctionWhitelist,
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
      <Link key={5} href="https://www.instagram.com/deelanceofficial/" target="_blank">
        <InstagramSvg width={40} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$DLANCE' },
      { title: 'Token Price', content: '0.026 USDT' },
      { title: 'Token Amount', content: '3,846,153' },
      { title: 'Blockchain', content: 'Ethereum' }
    ]
  },
  {
    hidden: true,
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
      },
      participateProjectInfo
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
    hidden: true,
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
      },
      participateProjectInfo
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
      <Link key={6} href="https://www.linkedin.com/company/lasmeta" target="_blank">
        <LinkinSvg />
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
      },
      participateProjectInfo
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
      <Link key={5} href="https://www.instagram.com/typeit_official/" target="_blank">
        <InstagramSvg width={40} height={40} />
      </Link>,
      <Link key={6} href=" https://www.linkedin.com/company/typeit-official" target="_blank">
        <LinkinSvg />
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
      },
      participateProjectInfo
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
      <Link key={5} href="https://www.instagram.com/typeit_official/" target="_blank">
        <InstagramSvg width={40} />
      </Link>,
      <Link key={6} href=" https://www.linkedin.com/company/typeit-official" target="_blank">
        <LinkinSvg />
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
      },
      participateProjectInfo
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
    hidden: true,
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
      },
      participateProjectInfo
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
      },
      participateProjectInfo
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
      },
      participateProjectInfo
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
      },
      participateProjectInfo
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
