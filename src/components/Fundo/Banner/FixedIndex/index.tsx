import { Box, Typography } from '@mui/material'
import Diamond from 'components/Fundo/assets/img/diamond.svg'
import { useIsSMDown } from 'themes/useTheme'

export default function FixedIndex({ style }: { style?: React.CSSProperties }) {
  const isMs = useIsSMDown()
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '73px',
        top: '40%',
        right: '0',
        transform: 'translate3D(0, -40%,0)',
        zIndex: 997,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignContent: 'center',
        ...style
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: isMs ? '22px' : '36px',
          marginBottom: isMs ? '10px' : '38px'
        }}
      >
        # 01
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '111px',
          background: `linear-gradient(340.18deg, rgba(255, 255, 255, 0.1) -24.06%, rgba(255, 255, 255, 0.015) 113.26%)`,
          border: `1px solid rgba(255, 255, 255, 0.2)`,
          backdropFilter: `blur(25px)`,
          borderRadius: '80px',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '47px',
            borderBottom: `1px solid rgba(255, 255, 255, 0.2)`,
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignContent: 'center',
            marginBottom: '6px'
          }}
        >
          <img
            src={Diamond}
            alt=""
            style={{
              width: '20px'
            }}
          />
        </Box>
        <Typography
          sx={{
            width: '100%',
            textAlign: 'center',
            fontWeight: 500,
            fontSize: '16px',
            color: '#fff'
          }}
        >
          8.81
        </Typography>
        <Typography
          sx={{
            width: '100%',
            textAlign: 'center',
            fontWeight: 400,
            fontSize: '12px',
            color: '#fff'
          }}
        >
          Carats
        </Typography>
      </Box>
    </Box>
  )
}
