import { Box, styled } from '@mui/material'
import LeftP1 from 'components/Fundo/assets/img/leftbar1.png'
import LeftP2 from 'components/Fundo/assets/img/leftbar2.png'
import LeftP3 from 'components/Fundo/assets/img/leftbar3.png'
import { useIsSMDown } from 'themes/useTheme'

const LoopColumn = styled(Box)(() => ({
  flex: 1,
  minHeight: '50vh',
  maxHeight: '60vh',
  width: ' 18px',
  textAlign: 'center',
  overflow: 'hidden',
  '.centent': {
    width: ' 18px',
    animation: `columnLoop 15s linear 0s infinite`
  },
  '@keyframes columnLoop': {
    '0%': {
      transform: 'translateY(0)'
    },
    '100%': {
      transform: 'translateY(-100%)'
    }
  }
}))
export default function LeftBar() {
  const isSm = useIsSMDown()
  const imgList = [
    {
      src: LeftP1,
      style: {
        width: '10px',
        marginBottom: '15px'
      }
    },
    {
      src: LeftP2,
      style: {
        width: '10px',
        marginBottom: '15px'
      }
    },
    {
      src: LeftP3,
      style: {
        width: '18px',
        marginBottom: '15px'
      }
    },
    {
      src: LeftP1,
      style: {
        width: '10px',
        marginBottom: '15px'
      }
    },
    {
      src: LeftP2,
      style: {
        width: '10px',
        marginBottom: '15px'
      }
    },
    {
      src: LeftP3,
      style: {
        width: '18px',
        marginBottom: '15px'
      }
    },
    {
      src: LeftP1,
      style: {
        width: '10px',
        marginBottom: '15px'
      }
    },
    {
      src: LeftP2,
      style: {
        width: '10px',
        marginBottom: '15px'
      }
    },
    {
      src: LeftP3,
      style: {
        width: '18px',
        marginBottom: '15px'
      }
    }
  ]
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: isSm ? 0 : 30,
        width: '18px',
        height: '100vh',
        zIndex: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <Box
        sx={{
          margin: '38px auto',
          width: '1px',
          flex: 1,
          background: '#FFFFFF',
          opacity: '0.4'
        }}
      ></Box>
      <LoopColumn>
        <Box className={'centent'}>
          {imgList.map((item, index) => {
            return <img src={item.src} key={index} style={item.style} alt="" />
          })}
        </Box>
      </LoopColumn>
    </Box>
  )
}
