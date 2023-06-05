import { Box, Button } from '@mui/material'
export interface BidOrRegretBlockProps {
  onBidButtonClick: () => void
  onRegretButtonClick?: () => void
}

// const BidOrRegret = ({ onBidButtonClick, onRegretButtonClick }: BidOrRegretBlockProps) => {
const BidOrRegret = ({ onBidButtonClick }: BidOrRegretBlockProps) => {
  return (
    <Box>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center'
        }}
      >
        <Button
          style={{
            background: '#C5C5C5',
            border: '1px solid #c5cc5c5',
            color: '#fff',
            width: '218px',
            height: '60px'
          }}
          variant="outlined"
          disabled
          onClick={onBidButtonClick}
        >
          You are in the draw...
        </Button>

        {/* <Button
          style={{
            width: '218px',
            height: '60px'
          }}
          disabled
          variant="contained"
          onClick={onRegretButtonClick}
        >
          Get fund back
        </Button> */}
      </Box>
    </Box>
  )
}

export default BidOrRegret
