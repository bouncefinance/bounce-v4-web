import { Box, Typography } from '@mui/material'
import BackVideo from 'components/Fundo/assets/video/backVideo.mp4'

export default function FixedLeft({ style }: { style?: React.CSSProperties }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '140px',
        top: '20%',
        left: '0',
        transform: 'translate3D(0, 0,0)',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignContent: 'center',
        ...style
      }}
    >
      <video
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          marginBottom: '15px',
          objectFit: 'cover'
        }}
        auto-pause-if-navigate="true"
        playsInline
        webkit-playsinline=""
        x5-playsinline=""
        x-webkit-airplay="allow"
        muted
        loop
        autoPlay
        src={BackVideo}
      ></video>
      <Typography
        sx={{
          fontFamily: `'Inter'`,
          width: '100%',
          textAlign: 'left',
          fontWeight: 400,
          fontSize: '12px'
        }}
      >
        THE BEST CERTIFIED MATERIALS
      </Typography>
    </Box>
  )
}
