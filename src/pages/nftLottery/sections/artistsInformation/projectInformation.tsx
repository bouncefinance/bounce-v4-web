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
          The “AI Meets Bitcoin” Auction features the first-ever AI-generated NFT collection on Bitcoin, with 450
          exquisite artworks co-created by three top artists: Charlesai, 0009, and RedruM. This collection represents a
          pioneering fusion of artificial intelligence, art and the Bitcoin ecosystem. Each of the featured artworks
          gain a unique identity and narrative, permanently inscribed on the Bitcoin network, guaranteeing their
          endurance and legacy.
        </Text>
        <Text style={{ margin: isSm ? '20px 0' : '40px 0' }}>
          This “AI Meets Bitcoin” NFT collection will be auctioned on Bounce via Random Selection, featuring an
          innovative twist in the auction mechanism called “Burning Man” — Each participant can join this auction by
          burning $10 worth of any of these tokens: $AUCTION, $MUBI, $BSSB, $DAII, $BDID, $AMMX. Our smart contract will
          then randomly select winners to receive the NFTs.
        </Text>
        {/* <Text>
          This innovative “AI Meets Bitcoin” ordinals collection will be auctioned on Bounce, a prominent decentralized
          platform in the Bitcoin ecosystem. Bounce is known for its onchain auction services, making it an ideal venue
          for presenting these unique AI-generated Bitcoin Ordinals to a global audience of collectors and art
          enthusiasts. The auctioning aspect of this project adds an exciting layer of engagement and accessibility.
        </Text> */}
      </Box>
    </Box>
  )
}
export default ProjectInformation
