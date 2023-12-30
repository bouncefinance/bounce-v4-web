import * as React from 'react'
import { Box, Typography } from '@mui/material'
import artist_img from 'assets/imgs/nftLottery/artist_img.png'
import artist2_img from 'assets/imgs/nftLottery/artist2_img.png'
import artist3_img from 'assets/imgs/nftLottery/artist3_img.png'
import Title from '../../components/artistsInformation/Title'
import AboutTab from '../../components/artistsInformation/AboutTab'
import useBreakpoint from 'hooks/useBreakpoint'

const AboutArtist = () => {
  const isSm = useBreakpoint('sm')
  const msgList = [
    {
      name: 'CHARLES',
      value:
        'Charles is a French AI-Classicism NFT artist. Charles has had the opportunity to expose his work at the MoCa Gallery as well as the IHAM art gallery in Paris. His work was also sold in the first french physical NFT auction.',
      imgSrc: artist_img
    },
    {
      name: 'REDRUM',
      value:
        "RedruM is an AI artist who creates Surrealist artworks between dreams and nightmares, with a style he describes as 'Red Mythological Weirdism' with elements of Caravaggio, Tiziano and even Francis Bacon weaved in.",
      imgSrc: artist2_img
    },
    {
      name: 'Gene Kogan',
      value:
        'Gene Kogan is an artist and programmer with interests in generative art, collective intelligence, autonomous systems, and computer science. He was one of the three Day 1 AI artists on braindrops with his brainloops collection and is considered to be one of the OGs when it comes to AI art.',
      imgSrc: artist3_img
    }
  ]
  const [tabIndex, setTabNumber] = React.useState(0)
  return (
    <Box>
      {!isSm && <Title text="ABOUT ARTIST" />}
      {!isSm ? (
        <Box maxWidth={800} marginTop={40}>
          {/* tab */}
          <Box gap={24} display={'flex'}>
            {msgList.map(({ name }, idx) => (
              <Box
                key={idx}
                sx={{ cursor: 'pointer', opacity: idx === tabIndex ? '1' : '0.5' }}
                color={'var(--AI-dark-01, var(--AI-black-02, #3D3A32))'}
                onClick={() => setTabNumber(idx)}
              >
                <Typography
                  variant="lotteryh2"
                  fontSize={24}
                  fontWeight={700}
                  lineHeight={'90%'}
                  marginBottom={12}
                  textTransform={'uppercase'}
                  color={'var(--AI-dark-02, #4C483A)'}
                >
                  {name}
                </Typography>
                {idx === tabIndex && <Box height={2} bgcolor={'var(--AI-black-02, #3D3A32)'}></Box>}
              </Box>
            ))}
          </Box>
          {/* tabMsg */}
          {msgList.map(
            ({ name, value, imgSrc }, idx) =>
              idx === tabIndex && <AboutTab key={idx} name={name} value={value} imgSrc={imgSrc} />
          )}
        </Box>
      ) : (
        <Box>
          {msgList.map(({ name, value, imgSrc }, idx) => (
            <AboutTab key={idx} name={name} value={value} imgSrc={imgSrc} />
          ))}
        </Box>
      )}
    </Box>
  )
}
export default AboutArtist
