import { Box } from '@mui/material'

const MosaicImg = ({ src, style }: { src: string; style: React.CSSProperties }) => {
  const pixelateId = new Date().valueOf() + Math.random() + 'pixelate'
  return (
    <>
      <Box
        sx={{
          '&::before': {
            content: `''`,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            background: `url(${src}) no-repeat`,
            backgroundSize: 'cover',
            imageRendering: 'pixelated',
            zIndex: 1,
            transition: '1s',
            cursor: 'pointer'
          },
          '&:hover::before': {
            opacity: 0
          },
          '&::after': {
            content: `''`,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            background: `url(${src}) no-repeat`,
            backgroundSize: 'cover',
            imageRendering: 'pixelated',
            filter: `url(#${pixelateId})`,
            opacity: 0
          },
          '&:hover::after': {
            opacity: 1
          },
          ...style
        }}
      ></Box>
      <svg
        style={{
          ...style,
          zIndex: '0'
        }}
      >
        <filter id={pixelateId} x="0" y="0">
          <feFlood x="4" y="4" height="2" width="2" />
          <feComposite width="8" height="8" />
          <feTile result="a" />
          <feComposite in="SourceGraphic" in2="a" operator="in" />
          <feMorphology operator="dilate" radius="5" />
        </filter>
      </svg>
    </>
  )
}
export default MosaicImg
