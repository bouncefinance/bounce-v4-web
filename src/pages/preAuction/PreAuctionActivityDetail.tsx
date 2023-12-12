import {
  Accordion,
  AccordionDetails,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Drawer,
  Stack,
  Typography,
  styled,
  useTheme
} from '@mui/material'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import AuctionDescription from 'bounceComponents/fixed-swap/CreatorInfoCard/AuctionDescription'
import HeadImg from 'assets/imgs/thirdPart/foundoDetail/head.png'
import { useState } from 'react'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { ReactComponent as IconClose } from './close.svg'
// import usePoolInfo from 'bounceHooks/auction/usePoolInfo'

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#fff' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

export default function PreAuctionActivityDetail() {
  // const { data: poolInfo } = usePoolInfo()
  const list = {
    participants: [
      {
        id: 0,
        name: 'user0',
        avatar: HeadImg
      },
      {
        id: 1,
        name: 'user1',
        avatar: HeadImg
      },
      {
        id: 2,
        name: 'user2',
        avatar: HeadImg
      },
      {
        id: 3,
        name: 'user3',
        avatar: HeadImg
      },
      {
        id: 4,
        name: 'user4',
        avatar: HeadImg
      },
      {
        id: 5,
        name: 'user5',
        avatar: HeadImg
      }
    ],
    activities: [
      {
        name: 'Users with 200 loyalty points in Season 3 of Galxe Community Space',
        eligible: 0,
        type: 'EVM_ADDRESS',
        details:
          'Users that have collected 200 loyalty points in Season 3 of the Galxe Community Space.\n\nThis credential is updated every Monday, at 2 PM UTC.',
        id: 339656727046299648
      },
      {
        name: 'GalxeDAO - Tweet Retweeters - Tweet 1717070586923323770',
        eligible: 0,
        type: 'TWITTER',
        details: "GalxeDAO's [Tweet](https://twitter.com/GalxeDAO/status/1717070586923323770) retweeters",
        id: 33965672704629964
      }
    ]
  }
  const [open, setOpen] = useState(Array.from({ length: list.activities.length }, () => false))
  const [drawOpen, setDrawOpen] = useState(false)
  const theme = useTheme()
  const poolInfo: any = {}
  if (!poolInfo) {
    return (
      <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BounceAnime />
      </Box>
    )
  }

  const changeOpenIdex = (index: any) => {
    const data = [...open]
    data[index] = !open[index]
    setOpen(data)
  }

  return (
    <Stack padding={60} sx={{ background: '#121212' }}>
      <Stack
        direction={'row'}
        gridTemplateColumns={'280px 1fr'}
        spacing={20}
        sx={{
          '&>div:first-child': {
            maxWidth: '280px !important'
          }
        }}
      >
        <AuctionDescription poolInfo={poolInfo} getPoolInfo={() => {}} />
        <Stack
          sx={{
            width: '100%',
            flex: 1,
            borderRadius: '20px',
            background: '#20201E',
            padding: 20
          }}
        >
          <Stack
            sx={{
              width: '100%',
              background: '#121212',
              padding: 20,
              borderRadius: '20px'
            }}
          >
            <Stack mb={20} width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography color={'#E1F25C'} fontSize={28} fontWeight={600}>
                How To Participate
              </Typography>
              <Typography color={'#fff'} fontSize={16} fontWeight={400}>
                Have All below credentials
              </Typography>
            </Stack>
            {list.activities.map((item, index) => (
              <Stack
                mb={10}
                key={item.id}
                spacing={20}
                sx={{
                  background: '#20201E',
                  borderRadius: '8px'
                }}
              >
                <Accordion
                  sx={{
                    backgroundColor: '#20201E',
                    borderRadius: '8px !important',
                    padding: 20,
                    '& .MuiAccordionSummary-root': {}
                  }}
                  onChange={() => changeOpenIdex(index)}
                  expanded={open[index]}
                  key={item.id}
                >
                  <AccordionSummary>
                    <Stack
                      width={'100%'}
                      direction={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      sx={{
                        paddingBottom: 10,
                        borderBottom: '1px solid #FFFFFF1A'
                      }}
                    >
                      <Typography color={'#fff'}>{item.name}</Typography>
                      <Button
                        sx={{
                          width: 117,
                          height: 37,
                          borderRadius: '6px',
                          border: 'none',
                          background: '#F6F6F3',
                          color: theme.palette.text.primary,
                          '&:hover': {
                            color: '#121212'
                          }
                        }}
                        onClick={() => {}}
                      >
                        Tweet
                      </Button>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack
                      sx={{
                        color: '#fff',
                        fontSize: 12,
                        '&>span:first-child': {
                          color: '#E1F25C',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <span>Detail &gt;&gt;</span>
                      <span>{item.details}</span>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            ))}
          </Stack>
          <Stack
            mt={20}
            sx={{
              width: '100%',
              background: '#121212',
              padding: 20,
              borderRadius: '20px'
            }}
          >
            <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography color={'#E1F25C'} fontSize={28} fontWeight={600}>
                All Participants
              </Typography>
              <Typography color={'#E1F25C'} fontSize={26} fontWeight={600}>
                1234
              </Typography>
            </Stack>
            <Stack mt={30} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <AvatarGroup max={11}>
                {list.participants.map(avatar => (
                  <Avatar key={avatar.id} alt="Remy Sharp" src={avatar.avatar} />
                ))}
              </AvatarGroup>
              <Button
                sx={{
                  width: 117,
                  height: 48,
                  borderRadius: '6px',
                  border: 'none',
                  background: '#F6F6F3',
                  color: theme.palette.text.primary,
                  '&:hover': {
                    color: '#121212'
                  }
                }}
                onClick={() => setDrawOpen(!drawOpen)}
              >
                View all
              </Button>
            </Stack>
            <Drawer anchor={'bottom'} open={drawOpen} onClose={() => setDrawOpen(false)}>
              <Stack
                sx={{
                  position: 'relative',
                  background: '#20201E',
                  padding: '56px 120px 30px',
                  '& p': {
                    color: '#E1F25C',
                    paddingBottom: 20,
                    fontSize: 28,
                    fontWeight: 600,
                    borderBottom: '1px solid #FFFFFF1A'
                  },
                  '& svg': {
                    cursor: 'pointer',
                    position: 'absolute',
                    right: 20,
                    top: 20
                  }
                }}
              >
                <Typography>Participants</Typography>
                <IconClose onClick={() => setDrawOpen(false)} />
              </Stack>
              <Stack
                direction={'row'}
                display={'grid'}
                justifyContent={'flex-start'}
                gridTemplateColumns={'1fr 1fr 1fr 1fr'}
                spacing={20}
                sx={{
                  background: '#20201E'
                }}
              >
                {list.participants.map(avatar => (
                  <Stack
                    width={'100%'}
                    key={avatar.id}
                    direction={'row'}
                    justifyContent={'flex-start'}
                    spacing={20}
                    py={16}
                    pl={120}
                    alignItems={'center'}
                    sx={{
                      marginLeft: '0 !important'
                    }}
                  >
                    <Avatar alt="Remy Sharp" src={avatar.avatar} />
                    <Typography fontSize={16} color={'#fff'}>
                      {avatar.name}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Drawer>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
