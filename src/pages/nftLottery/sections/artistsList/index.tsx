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
        'Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and transparent environment for the auction process. The use of blockchain technology also allows for the automatic execution of the auction rules and the issuance of tokens to the winning bidders.',
      imgSrc: artist_1,
      rotate: 'rotate(13deg)'
    },
    {
      name: 'REDRUM',
      value:
        'Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and transparent environment for the auction process. The use of blockchain technology also allows for the automatic execution of the auction rules and the issuance of tokens to the winning bidders.',
      imgSrc: artist_2,
      rotate: 'rotate(-10deg)'
    },
    {
      name: '0009',
      value:
        'Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and transparent environment for the auction process. The use of blockchain technology also allows for the automatic execution of the auction rules and the issuance of tokens to the winning bidders.',
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
