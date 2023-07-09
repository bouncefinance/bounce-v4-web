import { Box, Container } from '@mui/material'
// import Image from 'components/Image'
// import noServiceUrl from 'assets/images/no_service.png'

export default function NoService() {
  return (
    <Container maxWidth={'lg'} sx={{ marginTop: 80 }}>
      <Box display="grid" gap="40px" padding="48px 64px">
        <Box width="100%" sx={{ fontSize: 20, color: theme => theme.palette.text.secondary }}>
          <p>
            {' '}
            Please note.The dapp is only open to non-U.S. persons and entities. All registrants must meet eligibility
            requirements to participate.
          </p>
          <p>
            The dapp is not and will not be offered or sold, directly or indirectly, to any person who is a resident,
            organized, or located in any country or territory subject to OFAC comprehensive sanctions programs from time
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            to time, including Cuba, Crimea region of Ukraine, Democratic People's Republic of Korea, Iran, Syria, or
            any person found on the OFAC specially designated nationals or blocked persons list, or any other
            consolidated prohibited persons list as determined by any applicable governmental authority.
          </p>
        </Box>
      </Box>
    </Container>
  )
}
