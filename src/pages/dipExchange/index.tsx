import { Box, Link } from '@mui/material'
import { IPrivatePadProp } from 'pages/launchpad/PrivatePadDataList'
import { ProjectHead } from '../projectIntro'

import HeadBg from 'assets/imgs/dipExchange/head-bg.png'
import HeadInBg from 'assets/imgs/dipExchange/head-in-bg.png'
import { ReactComponent as Web } from 'assets/imgs/auction/round-icon-web.svg'
import { ReactComponent as Twitter } from 'assets/imgs/auction/round-icon-twitter.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/profile/links/discord.svg'
import Medium from 'assets/imgs/common/Medium.png'
import Telegram from 'assets/imgs/common/Telegram.png'

const defaultHeadData: IPrivatePadProp = {
  keyId: 6,
  liveTimeStamp: {
    start: 1687964400000,
    end: 1687964400000
  },
  poolTypeName: 'Fixed Swap Auction',
  img: HeadInBg,
  avatar: '',
  title: 'DIP Exchange',
  chainId: 56,
  tokenName: 'TYPE',
  whitePaperLink: 'https://app.gitbook.com/o/nRZfswQcmwpKWJZsyU7w/home',
  upcomingLink: '/launchpad/typeit',
  liveLink: '/launchpad/typeit',
  projectInfo: [
    {
      title: 'What is TypeIT_?',
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
      info: []
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
  ]
}
const DipExchange = () => {
  return (
    <Box>
      <Box sx={{ backgroundImage: `url(${HeadBg})`, backgroundSize: 'cover', pb: 50 }}>
        <ProjectHead item={defaultHeadData} />
      </Box>
    </Box>
  )
}
export default DipExchange
