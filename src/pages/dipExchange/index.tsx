import { Box, Link, Typography, styled } from '@mui/material'
import { IPrivatePadProp } from 'pages/launchpad/PrivatePadDataList'
import { ProjectHead, Tabs } from '../projectIntro'

import HeadBg from 'assets/imgs/dipExchange/head-bg.png'
import HeadInBg from 'assets/imgs/dipExchange/head-in-bg.png'
import TabBg from 'assets/imgs/dipExchange/tab-bg.png'
import { ReactComponent as Web } from 'assets/imgs/auction/round-icon-web.svg'
import { ReactComponent as Twitter } from 'assets/imgs/auction/round-icon-twitter.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/profile/links/discord.svg'
import Medium from 'assets/imgs/common/Medium.png'
import Telegram from 'assets/imgs/common/Telegram.png'
import FooterPc from 'components/Footer/FooterPc'

const defaultHeadData: IPrivatePadProp = {
  keyId: 7,
  liveTimeStamp: {
    start: 1687964400000,
    end: 1687964400000
  },
  poolTypeName: 'ERC20 English Auction',
  img: HeadInBg,
  avatar: '',
  title: 'DIP Exchange',
  chainId: 250,
  tokenName: 'TYPE',
  whitePaperLink: 'https://app.gitbook.com/o/nRZfswQcmwpKWJZsyU7w/home',
  upcomingLink: '/launchpad/typeit',
  liveLink: '/launchpad/typeit',
  projectInfo: [
    {
      title: 'What is DIP Exchange?',
      info: [
        'BladeDAO is a decentralized on-chain game ecosystem built on zkSync Era by degens, for degens. The first medieval themed idle dungeon game, Legends of Valoria (LOV), featuring PvE and PvP gameplay, is set to release in late June.BladeDAO aims to build/publish a series of crypto games with on-chain elements and applied zero knowledge proofs to explore the new frontier of fun. We aim to use applied ZKP in 1) verifiable randomness; 2) hidden information; 3) scalability to create novel game mechanisms in a user- friendly way.We also designed a single governance token with sustainable DeFi mechanisms with a publisher token model in mind.'
      ]
    },
    {
      title: 'What is DIP Exchange tokenomics?',
      info: [
        'We are founded and backed by experienced leaders from Huobi, MEXC, TritiumDAO, and have received investments from MVentures, Gate Labs, BitMart Exchange, Cipholio Ventures, and many more!'
      ]
    },
    {
      title: 'What is DIP Exchange tokenomics?',
      info: []
    },
    {
      title: 'What is DIP Exchange tokenomics?',
      info: [
        'staged release:',
        '- TGE: 20%',
        '- 3-month interval: 26.6%',
        '- 3-month interval: 26.7%',
        '- 3-month interval: 26.7%'
      ]
    }
  ],
  tokenMetrics: [
    {
      title: 'What is DIP Exchange?',
      info: [
        'BladeDAO is a decentralized on-chain game ecosystem built on zkSync Era by degens, for degens. The first medieval themed idle dungeon game, Legends of Valoria (LOV), featuring PvE and PvP gameplay, is set to release in late June.BladeDAO aims to build/publish a series of crypto games with on-chain elements and applied zero knowledge proofs to explore the new frontier of fun. We aim to use applied ZKP in 1) verifiable randomness; 2) hidden information; 3) scalability to create novel game mechanisms in a user- friendly way.We also designed a single governance token with sustainable DeFi mechanisms with a publisher token model in mind.'
      ]
    },
    {
      title: 'What is DIP Exchange tokenomics?',
      info: [
        'We are founded and backed by experienced leaders from Huobi, MEXC, TritiumDAO, and have received investments from MVentures, Gate Labs, BitMart Exchange, Cipholio Ventures, and many more!'
      ]
    },
    {
      title: 'What is DIP Exchange tokenomics?',
      info: []
    },
    {
      title: 'What is DIP Exchange tokenomics?',
      info: [
        'staged release:',
        '- TGE: 20%',
        '- 3-month interval: 26.6%',
        '- 3-month interval: 26.7%',
        '- 3-month interval: 26.7%'
      ]
    }
  ],
  desc: 'Decentralized Perpetual Exchange.',
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
    </Link>
  ],
  moreData: [
    { title: 'Token Name', content: '$TYPE' },
    { title: 'Token Price', content: '0.05 USDT' },
    { title: 'Token Amount', content: '2,000,000' },
    { title: 'Blockchain', content: 'BNB Chain' }
  ],
  privatePrices: [
    {
      title: ['startingPrice'],
      value: [
        <Typography mb={8} sx={{ color: '#2B51DA', fontSize: 12 }} key={1}>
          It will increase according to the increase in sales volume
        </Typography>,
        '1 DIP = 0.002514 USDT'
      ]
    },
    {
      title: ['dipTokenOffered'],
      value: '420,000.0000 USDT'
    },
    {
      title: ['dgtTokenOffered'],
      value: '420,000.0000 USDT'
    },
    {
      title: ['hardCapPerUser'],
      value: '500,000 USDT=37.7100 USDT (≈15,000 USD)'
    }
  ],
  isFAQ: true
}
const DipExchange = () => {
  return (
    <Box sx={{ background: 'black' }}>
      <DipHeadBox>
        <ProjectHead item={defaultHeadData} isDark={true} />
      </DipHeadBox>
      <DipTabBox>
        <Tabs item={defaultHeadData} isDark={true} />
        <FooterPc isDark={true} />
      </DipTabBox>
    </Box>
  )
}
const DipHeadBox = styled(Box)({
  width: '100%',
  paddingBottom: 50,
  backgroundImage: `url(${HeadBg})`,
  backgroundSize: 'cover'
})
const DipTabBox = styled(Box)({
  width: '100%',
  marginTop: 4,
  backgroundImage: `url(${TabBg})`,
  backgroundSize: 'cover',
  padding: '36px 0 50px'
})
export default DipExchange
