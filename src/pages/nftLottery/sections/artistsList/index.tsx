import { Box, Typography } from '@mui/material'
import artist_1 from 'assets/imgs/nftLottery/artist_1.png'
import artist_2 from 'assets/imgs/nftLottery/artist_2.png'
import artist_3 from 'assets/imgs/nftLottery/artist_3.png'
import List, { ArtistsListApp } from '../../components/artistsList/List'
import useBreakpoint from 'hooks/useBreakpoint'
import { WithAnimation } from 'components/WithAnimation'
// import LotteryCountdown from '../../components/lotteryCountdown'

const DemoComponent = () => {
  const isSm = useBreakpoint('sm')
  const msgList = [
    {
      name: 'CHARLESAI',
      value:
        'A French doctor turned renowned NFT artist. Since 2021 Charlesai has been featured at MoCa Gallery, IHAM in Paris, and Art Basel Miami. His AI-infused landscapes have graced the first French physical NFT auction and Europe’s first AI art exhibit. He’s been interviewed by BFMTV, published in Beaux Arts 2022, and his work is used in top art schools globally. ',
      imgSrc: artist_1,
      rotate: 'rotate(13deg)'
    },
    {
      name: '0009',
      value:
        'Chris Maestas, American artist/designer with roots in LA’s graffiti and skateboarding scene. His work, influenced by 90s subcultures, blends traditional methods with AI-assisted art. Exhibited at Art Basel, NY Times Square, and La Biennale di Venezia, Chris is a trendsetter in automotive design and a prominent figure in the Web3 art world. ',
      imgSrc: artist_3,
      rotate: 'rotate(-10deg)'
    },
    {
      name: 'REDRUM',
      value:
        'Italian digital artist mastering AI to craft vivid art. Since June 2022, his journey has blended surrealism, storytelling, and paradoxical worlds inspired by film, music, and myth. Featured in global exhibits from LA to Hong Kong, his unique ‘redrum’ perspective captivates collectors and fans alike, transcending language barriers with each creation.',
      imgSrc: artist_2,
      rotate: 'rotate(15deg)'
    }
  ]
  return (
    <Box
      bgcolor={'var(--AI-brown-bg, #37342E)'}
      padding={isSm ? '64px 16px' : '120px 72px 160px'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box width={isSm ? '100%' : 1440}>
        <WithAnimation>
          <Typography
            variant="lotteryh1"
            fontSize={isSm ? 50 : 200}
            lineHeight={'90%'}
            fontWeight={500}
            color={'var(--AI-dark-02, #BBB4A8)'}
            paddingLeft={isSm ? 0 : 10}
            marginBottom={isSm ? 40 : 140}
          >
            ARTISTS
          </Typography>
        </WithAnimation>
        {isSm ? (
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'} gap={55}>
            {msgList.map(({ name, value, imgSrc, rotate }, idx) => (
              <WithAnimation key={idx}>
                <ArtistsListApp idx={idx} name={name} url={imgSrc} rotate={rotate}>
                  {value}
                </ArtistsListApp>
              </WithAnimation>
            ))}
          </Box>
        ) : (
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'} gap={60}>
            {msgList.map(({ name, value, imgSrc, rotate }, idx) => (
              <WithAnimation key={idx}>
                <List key={idx} idx={idx} length={msgList.length} name={name} url={imgSrc} rotate={rotate}>
                  {value}
                </List>
              </WithAnimation>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
export default DemoComponent
