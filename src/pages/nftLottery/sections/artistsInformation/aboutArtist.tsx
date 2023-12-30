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
      name: 'CHARLESAI',
      value:
        'A French doctor turned renowned NFT artist. Since 2021 Charlesai has been featured at MoCa Gallery, IHAM in Paris, and Art Basel Miami. His AI-infused landscapes have graced the first French physical NFT auction and Europe’s first AI art exhibit. He’s been interviewed by BFMTV, published in Beaux Arts 2022, and his work is used in top art schools globally. ',
      imgSrc: artist_img
    },
    {
      name: '0009',
      value:
        'Chris Maestas, American artist/designer with roots in LA’s graffiti and skateboarding scene. His work, influenced by 90s subcultures, blends traditional methods with AI-assisted art. Exhibited at Art Basel, NY Times Square, and La Biennale di Venezia, Chris is a trendsetter in automotive design and a prominent figure in the Web3 art world. ',
      imgSrc: artist3_img
    },
    {
      name: 'RedruM',
      value:
        'Italian digital artist mastering AI to craft vivid art. Since June 2022, his journey has blended surrealism, storytelling, and paradoxical worlds inspired by film, music, and myth. Featured in global exhibits from LA to Hong Kong, his unique ‘redrum’ perspective captivates collectors and fans alike, transcending language barriers with each creation.',
      imgSrc: artist2_img
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
