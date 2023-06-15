import { Box, Typography } from '@mui/material'
import { WinnerRowData } from '../section/winnerSection'

const TopThreeWinner = ({ list }: { list: WinnerRowData[] }) => {
  const ItemEl = ({ data, index, style }: { data: WinnerRowData; index: number; style?: React.CSSProperties }) => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate3D(-50%, -50%, 0)',
          width: '220px',
          height: '323px',
          background: '#20201E',
          backdropFilter: 'blur(5px)',
          borderRadius: 8,
          ...style
        }}
      >
        <Typography
          sx={{
            width: '100%',
            color: '#fff',
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: 36,
            textAlign: 'center'
          }}
        >
          0{index}
        </Typography>
        {data.id}
      </Box>
    )
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: list.length === 0 ? '0' : '323px',
        overflow: 'hidden'
      }}
    >
      {list && list.length >= 1 && (
        <ItemEl
          style={{
            zIndex: 3
          }}
          index={1}
          data={list[0]}
        />
      )}
      {list && list.length >= 2 && (
        <ItemEl
          style={{
            zIndex: 2
          }}
          index={2}
          data={list[1]}
        />
      )}
      {list && list.length >= 3 && (
        <ItemEl
          style={{
            zIndex: 1
          }}
          index={3}
          data={list[2]}
        />
      )}
    </Box>
  )
}
export default TopThreeWinner
