import React, { useState } from 'react'
import { Box, Container, Link, MenuItem, Pagination, Select, styled } from '@mui/material'
import HeaderTab from '../../bounceComponents/auction/HeaderTab'
import ArrowBanner from '../../bounceComponents/auction/ArrowBanner'
import { H2 } from '../../components/Text'
import { CenterColumn, CenterRow } from '../../components/Layout'
import AuctionTypeSelect from '../../bounceComponents/common/AuctionTypeSelect'
import { BackedTokenType } from '../account/MyTokenOrNFT'
import { useOptionDatas } from '../../state/configOptions/hooks'
import {
  // LaunchCardFinish,
  // LaunchCardLive,
  LaunchCardSocial
  // LaunchCardUpcoming
} from '../../bounceComponents/launchpad/LaunchCard'
// import {
//   TokenCard,
//   TokenCardFinish,
//   TokenCardLive,
//   TokenCardUpcoming
// } from '../../bounceComponents/launchpad/TokenCard'
// import { PoolStatus } from '../../api/pool/type'
import FooterPc from '../../components/Footer/FooterPc'
import BlodeDaoImg from 'assets/imgs/auction/1.png'
import PoseiSwapImg from 'assets/imgs/auction/3.png'
import { PoolStatus } from 'api/pool/type'
import { ReactComponent as Web } from 'assets/imgs/auction/round-icon-web.svg'
import { ReactComponent as Twitter } from 'assets/imgs/auction/round-icon-twitter.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/profile/links/discord.svg'
import Medium from 'assets/imgs/common/Medium.png'
import Telegram from 'assets/imgs/common/Telegram.png'
import { ReactComponent as TwitterWhite } from 'assets/socialLinksIcon/twitter.svg'

import BlodeAvatar from './avatar/BlodeAvatar.ico'
import poseiswapAvatar from './avatar/poseiswap.jpeg'

export const Launchpad: React.FC = () => {
  return (
    <Box>
      <HeaderTab />
      <Box mt={16}>
        <ArrowBanner type={'PrivateLaunchpad'} />
      </Box>
      <PrivatePad />
      <FooterPc />
    </Box>
  )
}

const PrivatePadBg = styled(CenterColumn)`
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 40px 100px;
  width: 100%;
  background: #ffffff;
  border-radius: 30px 30px 0 0;
`

export interface IProjectInfo {
  title: string
  info: string
}

export interface IPrivatePadProp {
  salePrice: string
  tokenOffered: string
  hardCapPerUser: string
  singleInitialInvestment: string
  img: string
  avatar: string
  title: string
  status: PoolStatus
  desc: string
  backendChainId: number
  projectInfo: IProjectInfo[]
  tokenMetrics: IProjectInfo[]
  social: JSX.Element[]
  link?: string
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

  svg {
    fill: #0697f8;
    opacity: 1;
  }
`
export const PrivatePadList: IPrivatePadProp[] = [
  {
    img: BlodeDaoImg,
    avatar: BlodeAvatar,
    title: 'BladeDAO',
    status: PoolStatus.Upcoming,
    backendChainId: 280,
    salePrice: '1 GMT = 0.00002514 BNB',
    tokenOffered: '420,000,000.0000 GMT',
    hardCapPerUser: '1,500,000 GMT=37.7100 BNB (≈15,000 USD)',
    singleInitialInvestment: '0.1 BNB',
    link: '/projectIntro',
    projectInfo: [
      {
        title: 'What is BladeDAO?',
        info: 'BladeDAO is a decentralized on-chain game ecosystem built on zkSync Era by degens, for degens. The first medieval themed idle dungeon game, Legends of Valoria (LOV), featuring PvE and PvP gameplay, is set to release in late June.BladeDAO aims to build/publish a series of crypto games with on-chain elements and applied zero knowledge proofs to explore the new frontier of fun. We aim to use applied ZKP in 1) verifiable randomness; 2) hidden information; 3) scalability to create novel game mechanisms in a user- friendly way.We also designed a single governance token with sustainable DeFi mechanisms with a publisher token model in mind.'
      },
      {
        title: 'What is $BLADE tokenomics?',
        info: 'The $BLADE tokenomics borrow from the positive ecosystem circulation like $vecrv, where $BLADE will serve as the utility token to boost yield stream for each crypto game published on BladeDAO.On the other hand, NFT royalty and NFT AMM fee in each game will be captured by BladeDAO. This part of the income will go to the $veblade token holders as dividends. Additionally, $veblade token holders will enjoy preferred whitelists and airdrops for future game launches.We’d expect $bladewar to happen with top games in the ecosystem, each bidding for more $veblade power to direct more token emission reward into their games. In turn, $veblade token holders enjoy a tax-like return on all in-game economic activities.'
      },
      {
        title: 'Is BladeDAO’s Team Anon or Public?',
        info: 'Mixed'
      }
    ],
    tokenMetrics: [
      {
        title: 'Key Features and Highlights',
        info: 'The Ondo Finance Protocol (“Ondo”) is an open and decentralized investment bank. Ondo enables and facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs, institutional and retail.Ondo is based upon three core principles:Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI) for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters (capital supply) to provide liquidity for their native token, users can easily trade these tokens in decentralized exchanges.Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum without incentives.Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating DeFi protocols and repackaging their exposures using traditional finance techniques.'
      }
    ],
    desc: 'BladeDAO is a decentralized on-chain game ecosystem built on zkSync Era by degens, for degens. The first medieval themed idle dungeon game, Legends of Valoria (LOV), featuring PvE and PvP gameplay, is set to release in late June.',
    // desc: '',
    social: [
      <Link key={1} href="https://twitter.com/blade_dao" target="_blank">
        <SocialBg>
          <TwitterWhite />
        </SocialBg>
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$BLADE' },
      { title: 'Token Price', content: 'TBD' },
      { title: 'Token Amount', content: 'TBD' },
      { title: 'Blockchain', content: 'zkSync Era' }
    ]
  },
  {
    img: PoseiSwapImg,
    avatar: poseiswapAvatar,
    title: 'PoseiSwap',
    backendChainId: 12,
    status: PoolStatus.Upcoming,
    salePrice: '1 GMT = 0.00002514 BNB',
    tokenOffered: '420,000,000.0000 GMT',
    hardCapPerUser: '1,500,000 GMT=37.7100 BNB (≈15,000 USD)',
    singleInitialInvestment: '0.1 BNB',
    projectInfo: [
      {
        title: '',
        info: ''
      }
    ],
    tokenMetrics: [
      {
        title: 'Token Metrics',
        info: 'The Ondo Finance Protocol (“Ondo”) is an open and decentralized investment bank. Ondo enables and facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs, institutional and retail.Ondo is based upon three core principles:Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI) for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters (capital supply) to provide liquidity for their native token, users can easily trade these tokens in decentralized exchanges.Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum without incentives.Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating DeFi protocols and repackaging their exposures using traditional finance techniques.'
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
      { title: 'Token Price', content: 'TBD' },
      { title: 'Token Amount', content: 'TBD' },
      { title: 'Blockchain', content: 'BNB Chain' }
    ]
  }
]

const PrivatePad: React.FC = () => {
  const optionDatas = useOptionDatas()
  const [auction, setAuction] = useState(0)
  const [chainFilter, setChainFilter] = useState<number>(0)

  return (
    <PrivatePadBg>
      <Container>
        <CenterRow mb={54} width={'100%'} justifyContent={'space-between'}>
          <H2>Private launchpad</H2>
          <CenterRow gap={8} display={'none !important'}>
            <AuctionTypeSelect curPoolType={auction} setCurPoolType={setAuction} tokenType={BackedTokenType.TOKEN} />
            <Select
              sx={{
                width: '200px',
                height: '38px'
              }}
              value={chainFilter}
              onChange={e => setChainFilter(Number(e.target.value))}
            >
              <MenuItem key={0} value={0}>
                All Chains
              </MenuItem>
              {optionDatas?.chainInfoOpt?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.chainName}
                </MenuItem>
              ))}
            </Select>
          </CenterRow>
        </CenterRow>
      </Container>
      {/* <LaunchCardFinish />
      <LaunchCardLive />
      <LaunchCardUpcoming /> */}
      {PrivatePadList.map(item => (
        <LaunchCardSocial key={item.title} data={item} />
      ))}
      {/* <TokenCardFinish />
      <TokenCardLive />
      <TokenCardUpcoming />
      <TokenCard state={PoolStatus.Upcoming} /> */}
      <Pagination />
    </PrivatePadBg>
  )
}
