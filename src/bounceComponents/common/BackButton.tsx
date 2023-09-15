import { useIsSMDown } from '../../themes/useTheme'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import BackIcon from 'assets/imgs/toolBox/arrow_left_black.svg'
import { H5 } from 'components/Text'

export default function BackButton() {
  const isSm = useIsSMDown()
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: 'fit-content',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        alignItems: 'center',
        color: '#121212',
        fontFamily: `'Public Sans'`,
        fontWeight: 500,
        fontSize: '16px',
        cursor: 'pointer',
        marginBottom: isSm ? '30px' : '40px',
        zIndex: 999
      }}
      onClick={() => {
        navigate(-1)
      }}
    >
      <img
        src={BackIcon}
        style={{
          marginRight: '12px'
        }}
        alt=""
        srcSet=""
      />
      <H5>Back</H5>
    </Box>
  )
}
