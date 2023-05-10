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

export interface IPrivatePadProp {
  img: string
  avatar: string
  title: string
  status: PoolStatus
  desc: string
  social: JSX.Element[]
  moreData: {
    title: string
    content: string
  }[]
}

const PrivatePad: React.FC = () => {
  const optionDatas = useOptionDatas()
  const [auction, setAuction] = useState(0)
  const [chainFilter, setChainFilter] = useState<number>(0)

  const list: IPrivatePadProp[] = [
    {
      img: BlodeDaoImg,
      avatar: BlodeAvatar,
      title: 'BladeDAO',
      status: PoolStatus.Upcoming,
      desc: 'BladeDAO is a decentralized on-chain game ecosystem built on zkSync Era by degens, for degens. The first medieval themed idle dungeon game, Legends of Valoria (LOV), featuring PvE and PvP gameplay, is set to release in late June.',
      social: [
        <Link key={0} href="https://www.bladedao.games/" target="_blank">
          <Web />
        </Link>,
        <Link key={1} href="https://twitter.com/blade_dao" target="_blank">
          <Twitter />
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
      status: PoolStatus.Upcoming,
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
      {list.map(item => (
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
