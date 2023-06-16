import { Box } from '@mui/material'
// import BackVideo from 'components/Fundo/assets/video/backVideo.mp4'
export default function VideoSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        zIndex: 2
      }}
    >
      {/* <video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
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
      ></video> */}
    </Box>
  )
}
