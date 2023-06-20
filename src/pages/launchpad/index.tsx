import React, { useState } from 'react'
import { Box, Container, MenuItem, Select, Stack, styled } from '@mui/material'
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
import FooterPc from '../../components/Footer/FooterPc'
import { PrivatePadDataList } from './PrivatePadDataList'

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
  /* padding: 80px 40px 100px; */
  width: 100%;
  background: #ffffff;
  border-radius: 30px 30px 0 0;
`

const PrivatePad: React.FC = () => {
  const optionDatas = useOptionDatas()
  const [auction, setAuction] = useState(0)
  const [chainFilter, setChainFilter] = useState<number>(0)

  return (
    <PrivatePadBg sx={{ padding: { xs: '80px 16px 100px', md: '80px 40px 100px' } }}>
      <Container>
        <CenterRow
          mb={54}
          width={'100%'}
          sx={{ maxWidth: 1320, margin: '0 auto', marginBottom: 54 }}
          justifyContent={'space-between'}
        >
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
      <Stack spacing={40}>
        {PrivatePadDataList.map(item => (
          <LaunchCardSocial key={item.keyId} data={item} />
        ))}
      </Stack>
      {/* <TokenCardFinish />
      <TokenCardLive />
      <TokenCardUpcoming />
      <TokenCard state={PoolStatus.Upcoming} /> */}
      {/* <Pagination /> */}
    </PrivatePadBg>
  )
}
