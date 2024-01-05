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
          {`The "AI Meets Bitcoin" Auction features the first-ever AI-generated Ordinals NFT collection, with 450
          exquisite artworks co-created by three top artists: Charlesai, 0009, and RedruM. This collection represents a
          pioneering fusion of artificial intelligence, art and the Bitcoin ecosystem. Each of the featured artworks
          gain a unique identity and narrative, permanently inscribed on the Bitcoin network, guaranteeing their
          endurance and legacy.`}
        </Text>
        <Text style={{ margin: isSm ? '20px 0' : '40px 0' }}>
          {`This "AI Meets Bitcoin" Ordinals NFT collection will be auctioned on Bounce via Random Selection, featuring an innovative twist in the auction mechanism called “Burning Man” — Each participant can join this auction by burning $50 worth of any of these tokens: $AUCTION, $MUBI, $BSSB, $DAII, $BDID, $AMMX. Our smart contract will then randomly select winners, with $AUCTION users enjoying higher odds to win.`}
        </Text>
        <Text>
          {`The auction will be live on Ethereum mainnet. 400 Ordinals NFTs from this “AI Meets Bitcoin” collection will be bridged from BRC to ERC using MultiBit’s NFT bridge. Each winner of the Random Selection will receive both the original BRC721 NFT and the ERC721 version.`}
        </Text>
      </Box>
    </Box>
  )
}
export default ProjectInformation
