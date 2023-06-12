import { Box, Container, Stack, Typography } from '@mui/material'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import AuctionParticipatedTab from 'bounceComponents/account/AuctionAddressTab/ParticipatedTab'
import ActivitiesTab from 'bounceComponents/account/AuctionAddressTab/ActivitiesTab'
import { useState } from 'react'
import styles from './tabStyles'
import CurrentPoolStatus from 'bounceComponents/account/CurrentPoolStatus'
import useBreakpoint from '../../hooks/useBreakpoint'

enum TabListProp {
  'Auction_Created' = 'Auction Created',
  'Auction_Participated' = 'Auction Participated',
  'Auction_Collect' = 'Favorites Auctions',
  'Activities' = 'Activities'
}

const tabsList = [
  TabListProp.Auction_Created,
  TabListProp.Auction_Participated,
  TabListProp.Auction_Collect,
  TabListProp.Activities
]

// tokenType erc20:1 , erc1155:2
export enum BackedTokenType {
  TOKEN = 1,
  NFT = 2
}

export default function MyTokenOrNFT({ backedTokenType }: { backedTokenType: BackedTokenType }) {
  const [curTab, setCurTab] = useState(TabListProp.Auction_Created)
  const isSm = useBreakpoint('sm')

  return (
    <AccountLayout>
      <Box padding={isSm ? '0 0 80px' : '0 20px'}>
        <Container maxWidth="lg">
          <Typography padding="40px 20px 0" variant="h3" fontSize={isSm ? 22 : 30}>
            {backedTokenType === BackedTokenType.TOKEN ? 'My Token' : 'NFT Auction'}
          </Typography>

          <>
            <CurrentPoolStatus backedTokenType={backedTokenType} />
            <Box mt={40} mb={30}>
              <Stack direction={'row'} sx={styles.tabsBox}>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    overflowX: 'scroll',
                    whiteSpace: 'nowrap',
                    '&::-webkit-scrollbar': {
                      display: 'none'
                    }
                  }}
                >
                  {tabsList?.map(item => {
                    return (
                      <Typography
                        variant="h4"
                        onClick={() => setCurTab(item)}
                        key={item}
                        sx={{
                          ...styles.menu,
                          ...(curTab === item ? styles.menuActive : ({} as any)),
                          padding: isSm ? '12px 16px 36px' : '16px 32px 40px'
                        }}
                      >
                        {item}
                      </Typography>
                    )
                  })}
                </Stack>
              </Stack>

              <Box
                padding={isSm ? '16px' : '40px'}
                sx={{
                  background: '#F6F6F3',
                  borderRadius: '20px',
                  mt: -24,
                  position: 'relative'
                }}
              >
                <>
                  {curTab === TabListProp.Auction_Created && (
                    <AuctionParticipatedTab type="created" backedTokenType={backedTokenType} />
                  )}
                  {curTab === TabListProp.Auction_Participated && (
                    <AuctionParticipatedTab type="participated" backedTokenType={backedTokenType} />
                  )}
                  {curTab === TabListProp.Auction_Collect && (
                    <AuctionParticipatedTab type="collect" backedTokenType={backedTokenType} />
                  )}
                  {curTab === TabListProp.Activities && <ActivitiesTab backedTokenType={backedTokenType} />}
                </>
              </Box>
            </Box>
          </>
        </Container>
      </Box>
    </AccountLayout>
  )
}
