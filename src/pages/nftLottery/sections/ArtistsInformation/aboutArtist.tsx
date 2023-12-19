import * as React from 'react'
import { Box, Typography } from '@mui/material'
import artist_img from 'assets/images/artist_img.png'
import artist2_img from 'assets/images/artist2_img.png'
import artist3_img from 'assets/images/artist3_img.png'
import Title from '../../components/artistsInformation/Title'
import AboutTab from '../../components/artistsInformation/AboutTab'
import useBreakpoint from 'hooks/useBreakpoint'

const AboutArtist = () => {
  const isSm = useBreakpoint('sm')
  const msgList = [
    {
      name: 'CHARLES',
      value:
        'Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and transparent environment for the auction process. The use of blockchain technology also allows for the automatic execution of the auction rules and the issuance of tokens to the winning bidders.',
      imgSrc: artist_img
    },
    {
      name: 'REDRUM',
      value:
        'Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and transparent environment for the auction process. The use of blockchain technology also allows for the automatic execution of the auction rules and the issuance of tokens to the winning bidders.',
      imgSrc: artist2_img
    },
    {
      name: '0009',
      value:
        'Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and transparent environment for the auction process. The use of blockchain technology also allows for the automatic execution of the auction rules and the issuance of tokens to the winning bidders.',
      imgSrc: artist3_img
    }
  ]
  const [tabIndex, setTabNumber] = React.useState(0)
  return (
    <Box>
      {!isSm && <Title text="ABOUT ARTIST"></Title>}
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
              idx === tabIndex && <AboutTab key={idx} name={name} value={value} imgSrc={imgSrc}></AboutTab>
          )}
        </Box>
      ) : (
        <Box>
          {msgList.map(({ name, value, imgSrc }, idx) => (
            <AboutTab key={idx} name={name} value={value} imgSrc={imgSrc}></AboutTab>
          ))}
        </Box>
      )}
    </Box>
  )
}
export default AboutArtist
