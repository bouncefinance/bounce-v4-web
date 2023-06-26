import { Box, Link, styled, Stack, Typography } from '@mui/material'
import { ReactComponent as Web } from 'assets/imgs/auction/round-icon-web.svg'
import { ReactComponent as Twitter } from 'assets/imgs/auction/round-icon-twitter.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/profile/links/discord.svg'
import Medium from 'assets/imgs/common/Medium.png'
import Telegram from 'assets/imgs/common/Telegram.png'
import { ReactComponent as TwitterWhite } from 'assets/socialLinksIcon/twitter.svg'
import { ReactComponent as WebWhite } from 'assets/socialLinksIcon/website.svg'
import { ReactComponent as DiscordSvg } from 'assets/socialLinksIcon/Discord.svg'
import { ReactComponent as TgSvg } from 'assets/socialLinksIcon/Tg.svg'
import { ReactComponent as InstagramSvg } from 'assets/socialLinksIcon/instagram-dashboard.svg'
import { ReactComponent as LinkinSvg } from 'assets/socialLinksIcon/linkin.svg'
import BlodeAvatar from './avatar/blade-icon.ico'
import EquilibriaAvatar from './avatar/equilibria-logo.png'
import poseiswapAvatar from './avatar/poseiswap.jpeg'
import typeltpAvatar from './avatar/typelt.jpeg'
import { ChainId } from 'constants/chain'
import Image from 'components/Image'
import TypeitSheet from './imgs/typeot-data-sheet.png'
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
const TypeitInfo: { [key: string]: any } = {
  Investors: '10.00%',
  Partner: '2.00%',
  Team: '14.00%',
  'Airdrop & Events': '1.00%',
  Liquidity: '5.00%',
  IEO: '3.00%',
  Reserve: '15.00%',
  T2E: '50.00%'
}
export const PrivatePadDataList: IPrivatePadProp[] = [
  {
    keyId: 6,
    liveTimeStamp: {
      start: 1687964400000,
      end: 1687964400000
    },
    poolTypeName: 'Fixed Swap Auction',
    img: 'https://images-v3.bounce.finance/6e179a231f6330d284676a0ec1ab3359-1687746437.png',
    avatar: typeltpAvatar,
    title: 'TypeIt',
    chainId: 56,
    tokenName: 'TYPE',
    whitePaperLink: 'https://app.gitbook.com/o/nRZfswQcmwpKWJZsyU7w/home',
    upcomingLink: '/launchpad/typeit',
    liveLink: '/launchpad/typeit',
    projectInfo: [
      {
        title: 'What is TypeIt?',
        info: ['The First Ever Web3 Keyboard for Gamefi users and Web2 users.']
      },
      {
        title: 'Investment and Partners',
        info: [
          'We are founded and backed by experienced leaders from Huobi, MEXC, TritiumDAO, and have received investments from MVentures, Gate Labs, BitMart Exchange, Cipholio Ventures, and many more!'
        ]
      },
      {
        title: 'Tokenomics',
        info: [
          <Stack key={1} sx={{ flexDirection: { xs: 'column', lg: 'row' } }}>
            <Box sx={{ margin: '0 auto', mr: { xs: 'auto', lg: 30 }, mb: { xs: 20, lg: 0 } }}>
              {Object.keys(TypeitInfo).map((t, i) => (
                <Stack key={i} flexDirection={'row'} mt={10}>
                  <Typography sx={{ minWidth: 140, fontSize: 16 }}> {t} </Typography> :
                  <Typography pl={10} sx={{ fontSize: 14 }}>
                    {TypeitInfo[t]}
                  </Typography>
                </Stack>
              ))}
            </Box>
            <Box sx={{ width: '100%', maxWidth: 500 }}>
              <Image src={TypeitSheet} style={{ width: '100%', objectFit: 'cover' }} />
            </Box>
          </Stack>
        ]
      },
      {
        title: 'Methods of Token Unlocking',
        info: [
          'staged release:',
          '- TGE: 20%',
          '- 3-month interval: 26.6%',
          '- 3-month interval: 26.7%',
          '- 3-month interval: 26.7%'
        ]
      }
    ],
    tokenMetrics: [],
    desc: 'Typelt is the first project to introduce thetype-to-earn" concept. It is opening up a new opportunity in the Web3 world, bringing the earning aspect to this simple day-to-day activity.',
    social: [
      <Link key={0} href="https://www.typeit.cool/" target="_blank">
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
        <InstagramSvg width={43} height={43} />
      </Link>,
      <Link key={6} href="https://www.linkedin.com/company/typeit-official" target="_blank">
        <LinkinSvg width={41} height={41} />
      </Link>
    ],
    moreData: [
      { title: 'Token Name', content: '$TYPE' },
      { title: 'Token Price', content: '0.05 USDT' },
      { title: 'Token Amount', content: '2,000,000' },
      { title: 'Blockchain', content: 'BNB Chain' }
    ]
  },
  {
    keyId: 2,
    liveTimeStamp: {
      start: 1687046400000,
      end: 1687478400000
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
          'The Ondo Finance Protocol (“Ondo”) is an open and decentralized investment bank. Ondo enables and facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs, institutional and retail.Ondo is based upon three core principles:Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI) for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters (capital supply) to provide liquidity for their native token, users can easily trade these tokens in decentralized exchanges.Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum without incentives.Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating DeFi protocols and repackaging their exposures using traditional finance techniques.'
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
          'The Ondo Finance Protocol (“Ondo”) is an open and decentralized investment bank. Ondo enables and facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs, institutional and retail.Ondo is based upon three core principles:Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI) for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters (capital supply) to provide liquidity for their native token, users can easily trade these tokens in decentralized exchanges.Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum without incentives.Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating DeFi protocols and repackaging their exposures using traditional finance techniques.'
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
          'The Ondo Finance Protocol (“Ondo”) is an open and decentralized investment bank. Ondo enables and facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs, institutional and retail.Ondo is based upon three core principles:Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI) for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters (capital supply) to provide liquidity for their native token, users can easily trade these tokens in decentralized exchanges.Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum without incentives.Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating DeFi protocols and repackaging their exposures using traditional finance techniques.'
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
          'The Ondo Finance Protocol (“Ondo”) is an open and decentralized investment bank. Ondo enables and facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs, institutional and retail.Ondo is based upon three core principles:Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI) for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters (capital supply) to provide liquidity for their native token, users can easily trade these tokens in decentralized exchanges.Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum without incentives.Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating DeFi protocols and repackaging their exposures using traditional finance techniques.'
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
