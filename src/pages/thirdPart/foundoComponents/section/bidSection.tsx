import { Box } from '@mui/material'
import CenterSeciont from '../centerSection'
import PoolBaseInfo from '../snippet/poolBaseInfo'
import BidAction from '../snippet/bidAction'
const BidSection = () => {
  return (
    <Box
      style={{
        width: '100%',
        padding: '120px 0',
        borderTop: `1px solid rgba(255, 255, 255, 0.4)`,
        borderBottom: `1px solid rgba(255, 255, 255, 0.4)`
      }}
    >
      <CenterSeciont
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <PoolBaseInfo />
        <BidAction />
      </CenterSeciont>
    </Box>
  )
}
export default BidSection
