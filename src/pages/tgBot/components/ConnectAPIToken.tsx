import HeaderTab from 'bounceComponents/auction/HeaderTab'
import { Box, Button, Stack, Typography } from '@mui/material'
import FooterPc from 'components/Footer/FooterPc'
import { ReactComponent as CheckDoubleSvg } from 'assets/imgs/tgBot/check-double.svg'
const ConfirmBtn = () => {
  return (
    <Stack
      sx={{
        cursor: 'pointer',
        width: '116px',
        height: '48px',
        background: '#B5E529',
        borderRadius: '8px'
      }}
      direction={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'4px'}
    >
      <CheckDoubleSvg />
      <Typography
        sx={{
          lineHeight: '48px',
          fontWeight: 700,
          textAlign: 'center',
          fontFamily: `'Roboto Mono'`,
          fontSize: 16
        }}
      >
        confirm
      </Typography>
    </Stack>
  )
}
const ConnectAPIToken = ({}) => {
  return (
    <>
      <HeaderTab />
      <Box
        sx={{
          width: 900,
          borderRadius: '20px',
          background: '#E8E9E4',
          margin: '73px auto 93px',
          padding: '50px 40px'
        }}
      >
        <Box
          sx={{
            padding: '20px'
          }}
          mb={50}
        >
          <Typography
            sx={{
              color: '#000',
              fontFamily: `'Inter'`,
              fontSize: 22
            }}
            mb={20}
          >
            What can this bot do?
          </Typography>
          <Typography
            sx={{
              color: '#000',
              fontFamily: `'Inter'`,
              fontSize: 18
            }}
          >
            Bounce TGBot can help you quickly send transaction tokens through telegram. It can be done in just three
            easy steps.
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '0 20px'
          }}
        >
          <Typography
            sx={{
              color: '#000',
              fontFamily: `'Inter'`,
              fontSize: 18
            }}
            mb={20}
          >
            {`1.Go to @BotFather. Press his name to do that and then press 'Send Messege' if it's needed. `}
            <br></br>
            {`2.Create a new bot with him. To do this use the 'newbot' command inside @BotFather. `}
            <br></br>
            {`3.Copy the API token that @BotFather will give you. `}
            <br></br>
            {`4.Come back to here and send the copied API token here.`}
          </Typography>
        </Box>
        <Button color="secondary" variant="contained" sx={{ width: '100%', margin: '40px 0' }}>
          Go to @BotFather
        </Button>
        <Typography
          component={'p'}
          sx={{
            color: '#121212',
            fontFamily: `'Poppins'`,
            fontSize: '14px',
            lineHeight: '19px',
            width: '100%',
            textAlign: 'center',
            padding: '15px 0',
            marginBottom: '7px'
          }}
        >{`I've got the API token`}</Typography>
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={'8px'}>
          <input
            style={{
              width: '500px',
              borderRadius: '6px',
              height: '48px',
              border: '0',
              textDecoration: 'none',
              padding: 0,
              outline: 'none',
              textAlign: 'center'
            }}
            placeholder="Copy the API token here"
            type="text"
          />
          <ConfirmBtn />
        </Stack>
      </Box>
      <FooterPc />
    </>
  )
}

export default ConnectAPIToken
