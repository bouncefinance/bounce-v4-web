import { Box, Typography } from '@mui/material'
import Image from 'components/Image'
import box_bg from 'assets/imgs/nftLottery/box_bg.png'
import Title from '../../components/artistsInformation/Title'
import Text from '../../components/artistsInformation/Text'
import useBreakpoint from 'hooks/useBreakpoint'

const RealWorldAirdrop = () => {
  const isSm = useBreakpoint('sm')
  return (
    <Box marginBottom={isSm ? '24px' : '0'}>
      {!isSm && <Title text="REAL WORLD AIRDROP"></Title>}
      <Box
        display={'flex'}
        gap={isSm ? 16 : 40}
        marginTop={isSm ? 24 : 40}
        sx={{ flexDirection: isSm ? 'column' : 'row' }}
      >
        <Box width={isSm ? '100%' : '57%'}>
          <Typography
            variant="lotteryh2"
            maxWidth={isSm ? 328 : '100%'}
            color={'var(--AI-dark-02, #4C483A)'}
            fontSize={isSm ? 18 : 32}
            textTransform={'uppercase'}
            lineHeight={isSm ? '130%' : '90%'}
            fontWeight={700}
            marginBottom={isSm ? 16 : 24}
          >
            REAL WORLD AIRDROP 实物奖励空投细则
          </Typography>
          <Text>
            The Ondo Finance Protocol (“Ondo”) is an open and decentralized investment bank. Ondo enables and
            facilitates connections between various stakeholders in the emerging DeFi ecosystem — including DAOs,
            institutional and retail.
          </Text>
          <Text style={{ marginBottom: '24px' }}>Ondo is based upon three core principles:</Text>
          <Box display={'flex'} gap={6}>
            <Text>1.</Text>
            <Text>
              Leader in Facilitating DEX Liquidity: Ondo is a pioneer in the liquidity-as-a-service space with live
              partnerships with 10+ DAOs as well as commitments from four stablecoin issuers (FEI, FRAX, UST, and RAI)
              for $100m+ in new liquidity and related incentives. By matching DAOs (capital demand) with underwriters
              (capital supply) to provide liquidity for their native token, users can easily trade these tokens in
              decentralized exchanges.
            </Text>
          </Box>
          <Box display={'flex'} gap={6}>
            <Text>2.</Text>
            <Text>
              Rapid Organic Growth: Ondo does not currently have any liquidity mining campaigns or any other incentive
              program to stimulate liquidity on the protocol, making it one of the largest protocols by TVL on Ethereum
              without incentives.
            </Text>
          </Box>
          <Box display={'flex'} gap={6}>
            <Text>3.</Text>
            <Text>
              Bridging DeFi and Traditional Finance: Ondo makes DeFi accessible and more valuable by both aggregating
              DeFi protocols and repackaging their exposures using traditional finance techniques.
            </Text>
          </Box>
        </Box>
        <Box padding={isSm ? '8px 38.4px' : '10px 24px'} sx={{ cursor: 'pointer' }}>
          <Box padding={isSm ? '12.8px 12.8px 19.2px' : '16px 16px 24px'} bgcolor={'#0F0F0F'} borderRadius={16}>
            <Image src={box_bg} width={225} height={225} />
            <Typography
              fontSize={18}
              lineHeight={'140%'}
              fontWeight={400}
              color={'var(--AI-white, #FFF)'}
              margin={'16px 0 8px'}
            >
              Mysterious BlindBox
            </Typography>
            <Typography
              fontSize={12}
              lineHeight={'140%'}
              fontWeight={400}
              color={'var(--ai-white-70, rgba(255, 255, 255, 0.70))'}
            >
              3 boxes limited
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default RealWorldAirdrop
