import { Box, Typography } from '@mui/material'
import Title from '../../components/artistsInformation/Title'
import Text from '../../components/artistsInformation/Text'
import useBreakpoint from 'hooks/useBreakpoint'

const ProjectInformation = () => {
  const isSm = useBreakpoint('sm')
  return (
    <Box marginBottom={isSm ? '24px' : '0'}>
      {!isSm && <Title text="PROJECT INFORMATION" />}
      <Typography
        variant="lotteryh3"
        maxWidth={isSm ? 328 : 800}
        fontSize={isSm ? 18 : 32}
        margin={isSm ? '24px 0 16px' : '40px 0 24px'}
        lineHeight={isSm ? '130%' : '90%'}
        color={'var(--AI-dark-02, #4C483A)'}
        textTransform={'uppercase'}
        fontWeight={700}
      >
        WHAT IS AI MEETS BITCOIN?
      </Typography>
      <Box
        sx={{
          maxWidth: isSm ? 328 : 800
        }}
      >
        <Text>
          The “AI Meets Bitcoin” project marks a groundbreaking fusion of artificial intelligence and Bitcoin ecosystem,
          introducing an innovative dimension for digital art. This initiative leverages advanced AI technology to
          create unique artworks, which are then inscribed as Bitcoin Ordinals, embodying the synergy of AI creativity
          and Bitcoin’s potential.
        </Text>
        <Text style={{ margin: isSm ? '20px 0' : '40px 0' }}>
          The integration of AI and Bitcoin in this manner opens up a new realm of possibilities for art creation and
          distribution. Artists and creators are empowered to explore new frontiers in creativity, harnessing AI
          technology to expand their artistic horizons. The resulting digital artworks, each with a unique identity and
          narrative, are permanently etched onto the Bitcoin network, ensuring their longevity.
        </Text>
        <Text>
          This innovative “AI Meets Bitcoin” ordinals collection will be auctioned on Bounce, a prominent decentralized
          platform in the Bitcoin ecosystem. Bounce is known for its onchain auction services, making it an ideal venue
          for presenting these unique AI-generated Bitcoin Ordinals to a global audience of collectors and art
          enthusiasts. The auctioning aspect of this project adds an exciting layer of engagement and accessibility.
        </Text>
      </Box>
    </Box>
  )
}
export default ProjectInformation
