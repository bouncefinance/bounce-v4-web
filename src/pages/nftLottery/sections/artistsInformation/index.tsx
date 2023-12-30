import * as React from 'react'
import { useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import ProjectInformation from './projectInformation'
import NetDetails from './netDetails'
import RealWorldAirdrop from './realWorldAirdrop'
import AboutArtist from './aboutArtist'
import useBreakpoint from 'hooks/useBreakpoint'
import { ReactComponent as ArrowDownSvg } from 'assets/imgs/nftLottery/arrow_down.svg'
import { WithAnimation } from 'components/WithAnimation'
import { pcArtistWithAnimationStyles } from './useWithAnimationStyles'

interface TabContent {
  title: string
  index: string
}

interface Tab extends TabContent {
  subTab?: TabContent[]
}

export const Tabs: Tab[] = [
  { title: 'PROJECT INFORMATION', index: '01' },
  { title: 'NFT DETAILS', index: '02' },
  { title: 'REAL WORLD AIRDROP', index: '03' },
  { title: 'ABOUT ARTIST', index: '04' }
]

const ArtistsInformation = () => {
  const isSm = useBreakpoint('sm')
  const [tabIndex, setTabNumber] = React.useState(0)
  const [accordionIndex, setAccordion] = React.useState<number | undefined>()
  const [accordionLastId, setAccordionLastId] = React.useState<string>('')
  const handleAccordion = useCallback(
    (idx: number) => {
      const accordionLastDom = document.getElementById(accordionLastId)
      const accordionDom = document.getElementById(`accordion${idx}`)
      const height = accordionDom?.firstElementChild?.clientHeight
      if (accordionIndex !== idx) {
        setAccordion(idx)
        setAccordionLastId(`accordion${idx}`)
        if (accordionDom) {
          accordionDom.style.overflow = 'visible'
          accordionDom.style.height = `${height}px`
        }
        if (accordionLastDom) {
          accordionLastDom.style.overflow = 'hidden'
          accordionLastDom.style.height = `0px`
        }
      } else {
        setAccordion(undefined)
        if (accordionDom) {
          accordionDom.style.overflow = 'hidden'
          accordionDom.style.height = `0px`
          setAccordionLastId('')
        }
      }
    },
    [accordionIndex, accordionLastId]
  )

  return (
    <Box
      padding={isSm ? '64px 16px' : '120px 72px'}
      bgcolor={'var(--AI-green-01, #A4A79F)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {isSm ? (
        <WithAnimation rootMargin="0%">
          <Box
            gap={16}
            sx={{
              width: '100%',
              paddingBottom: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {Tabs.map(({ title, index }, idx) => (
              <Box key={idx}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 16,
                    borderBottom: '1px solid #858780'
                  }}
                  onClick={() => handleAccordion(idx)}
                >
                  <Box
                    gap={16}
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      variant="lotteryh1"
                      fontWeight={700}
                      lineHeight={'90%'}
                      textTransform={'uppercase'}
                      color={'var(--AI-dark-02, #4C483A)'}
                    >
                      {index}
                    </Typography>
                    <Typography
                      variant="lotteryh4"
                      fontWeight={700}
                      lineHeight={'90%'}
                      textTransform={'uppercase'}
                      color={'var(--AI-dark-02, #4C483A)'}
                    >
                      {title}
                    </Typography>
                  </Box>
                  <ArrowDownSvg style={{ transform: accordionIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </Box>
                <Box id={'accordion' + idx} style={{ overflow: 'hidden', height: '0', transition: '0.5s' }}>
                  {idx === 0 && <ProjectInformation />}
                  {idx === 1 && <NetDetails />}
                  {idx === 2 && <RealWorldAirdrop />}
                  {idx === 3 && <AboutArtist />}
                </Box>
              </Box>
            ))}
          </Box>
        </WithAnimation>
      ) : (
        <Box width={1440} display={'flex'} gap={64}>
          <WithAnimation
            defaultAnimation={false}
            addClassInView={pcArtistWithAnimationStyles().tabInView}
            className={pcArtistWithAnimationStyles().tab}
          >
            <Box width={239}>
              {Tabs.map(({ title, index }, idx) => (
                <Box
                  key={idx}
                  gap={16}
                  sx={{
                    width: 239,
                    height: 116,
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderRadius: '16px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    border: '1px solid var(--AI-green-02, rgba(143, 146, 136, 0))',
                    '&:hover': {
                      transition: '0.5s',
                      borderColor: idx !== tabIndex ? 'var(--AI-green-02, rgba(143, 146, 136, 1))' : 'transparent'
                    }
                  }}
                  bgcolor={idx === tabIndex ? 'var(--AI-green-02, #8F9288)' : 'transparent'}
                  onClick={() => setTabNumber(idx)}
                >
                  <Typography
                    variant="lotteryh1"
                    fontSize={44}
                    fontWeight={700}
                    lineHeight={'90%'}
                    textTransform={'uppercase'}
                    color={'var(--AI-dark-02, #4C483A)'}
                  >
                    {index}
                  </Typography>
                  <Typography
                    variant="lotteryh3"
                    fontWeight={700}
                    lineHeight={'90%'}
                    textTransform={'uppercase'}
                    color={'var(--AI-dark-02, #4C483A)'}
                  >
                    {title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </WithAnimation>
          <WithAnimation
            defaultAnimation={false}
            addClassInView={pcArtistWithAnimationStyles().tabItemInView}
            className={pcArtistWithAnimationStyles().tabItem}
          >
            <Box flex={1}>
              {tabIndex === 0 && <ProjectInformation />}
              {tabIndex === 1 && <NetDetails />}
              {tabIndex === 2 && <RealWorldAirdrop />}
              {tabIndex === 3 && <AboutArtist />}
            </Box>
          </WithAnimation>
        </Box>
      )}
    </Box>
  )
}
export default ArtistsInformation
