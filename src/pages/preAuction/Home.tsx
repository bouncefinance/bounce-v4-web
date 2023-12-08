import { Box, Stack, SxProps, Theme, Typography } from '@mui/material'
import HeaderTab from 'bounceComponents/auction/HeaderTab'
import FooterPc from 'components/Footer/FooterPc'
import useBreakpoint from 'hooks/useBreakpoint'
import { useState } from 'react'
import { ReactComponent as IconList } from '../../assets/imgs/preAuctionActivity/list.svg'
import { ReactComponent as IconProof } from '../../assets/imgs/preAuctionActivity/proof.svg'
import { ReactComponent as IconAMA } from '../../assets/imgs/preAuctionActivity/ama.svg'
import WhitelistFarmTab from './WhitelistFarmTab'

const iconList = [<IconList key={0} />, <IconProof key={1} />, <IconAMA key={2} />]

enum TabListProp {
  'Whitelist_Farm' = 'Whitelist Farm',
  'Proof_Of_Contribution' = 'Proof Of Contribution',
  'AMA' = 'AMA'
}
const tabsList = [TabListProp.Whitelist_Farm, TabListProp.Proof_Of_Contribution, TabListProp.AMA]

export default function PreAuctionActivityHome({ sx }: { sx?: SxProps<Theme> | undefined }) {
  const [curTab, setCurTab] = useState(TabListProp.Whitelist_Farm)
  const isSm = useBreakpoint('sm')
  return (
    <>
      <HeaderTab />
      <Box
        sx={{
          padding: isSm ? '0' : '60px 72px 0',
          background: '#fff',
          ...sx
        }}
      >
        <Box>
          <Stack
            direction={'row'}
            sx={{
              borderBottom: '1px solid #e4e4e4'
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                overflowX: 'scroll',
                whiteSpace: 'nowrap',
                '&::-webkit-scrollbar': {}
              }}
            >
              {tabsList?.map((item, index) => {
                return (
                  <Typography
                    variant="h4"
                    onClick={() => setCurTab(item)}
                    key={item}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderBottom: curTab === item ? '2px solid #121212' : '2px solid transparent',
                      padding: isSm ? '12px 16px 16px' : '16px 32px 20px',
                      fontFamily: 'Inter',
                      cursor: 'pointer',
                      color: curTab === item ? '#121212' : '#959595',
                      '& svg path': {
                        fill: curTab === item ? '#121212' : '#959595',
                        fillOpacity: curTab === item ? 1 : 0.4
                      },
                      '& svg g': {
                        opacity: curTab === item ? 1 : 0.4
                      }
                    }}
                  >
                    {iconList[index]}
                    {item}
                  </Typography>
                )
              })}
            </Stack>
          </Stack>
          <Box
            padding={isSm ? '16px' : '60px 0'}
            sx={{
              background: '#fff',
              borderRadius: '10px',
              position: 'relative',
              padding: '20px'
            }}
          >
            <>
              {curTab === TabListProp.Whitelist_Farm && <WhitelistFarmTab />}
              {curTab === TabListProp.Proof_Of_Contribution && <>2</>}
              {curTab === TabListProp.AMA && <>3</>}
            </>
          </Box>
        </Box>
      </Box>
      <FooterPc />
    </>
  )
}
