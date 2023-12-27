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
      name: 'CHARLES',
      value:
        'Charles is a French AI-Classicism NFT artist. Charles has had the opportunity to expose his work at the MoCa Gallery as well as the IHAM art gallery in Paris. His work was also sold in the first french physical NFT auction.',
      imgSrc: artist_1,
      rotate: 'rotate(13deg)'
    },
    {
      name: 'REDRUM',
      value:
        "RedruM is an AI artist who creates Surrealist artworks between dreams and nightmares, with a style he describes as 'Red Mythological Weirdism' with elements of Caravaggio, Tiziano and even Francis Bacon weaved in.",
      imgSrc: artist_2,
      rotate: 'rotate(-10deg)'
    },
    {
      name: 'Gene Kogan',
      value:
        'Gene Kogan is an artist and programmer with interests in generative art, collective intelligence, autonomous systems, and computer science. He was one of the three Day 1 AI artists on braindrops with his brainloops collection and is considered to be one of the OGs when it comes to AI art.',
      imgSrc: artist_3,
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
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'} gap={40}>
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
