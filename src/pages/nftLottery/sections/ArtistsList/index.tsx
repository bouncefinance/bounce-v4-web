import { Box, Typography } from '@mui/material'
import artist_1 from 'assets/images/artist_1.png'
import List from '../../components/ArtistsList/List'

const DemoComponent = () => {
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
      imgSrc: artist_1,
      rotate: 'rotate(-10deg)'
    },
    {
      name: '0009',
      value:
        'Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and transparent environment for the auction process. The use of blockchain technology also allows for the automatic execution of the auction rules and the issuance of tokens to the winning bidders.',
      imgSrc: artist_1,
      rotate: 'rotate(15deg)'
    }
  ]
  return (
    <Box
      bgcolor={'var(--AI-brown-bg, #37342E)'}
      padding={'120px 72px 160px'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box width={1440}>
        <Typography
          variant="lotteryh1"
          fontSize={200}
          lineHeight={'90%'}
          fontWeight={500}
          color={'var(--AI-dark-02, #BBB4A8)'}
          paddingLeft={10}
          marginBottom={140}
        >
          ARTISTS
        </Typography>
        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'} gap={40}>
          {msgList.map(({ name, value, imgSrc, rotate }, idx) => (
            <List key={idx} idx={idx} length={msgList.length} name={name} url={imgSrc} rotate={rotate}>
              {value}
            </List>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
export default DemoComponent
