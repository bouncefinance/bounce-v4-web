import { Box } from '@mui/material'
// import { Box, useTheme } from "@mui/material";
import { useIsSMDown } from 'themes/useTheme'

interface CenterSectionParams {
  children?: JSX.Element
  style?: React.CSSProperties
}
export default function CenterSection(props: CenterSectionParams) {
  const isSm = useIsSMDown()
  //   const theme = useTheme();
  const { children, style } = props
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        // maxWidth: isSm ? "350px" : "1200px",
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: ' 0 auto',
        padding: isSm ? '0 20px' : '0 75px',
        // [theme.breakpoints.up("lg")]: {
        //     maxWidth: "1400px !important",
        //   },
        // [theme.breakpoints.down("lg")]: {
        //   maxWidth: "1400px !important",
        // },
        // [theme.breakpoints.down("md")]: {
        //   maxWidth: "1000px !important",
        // },
        ...style
      }}
    >
      {children}
    </Box>
  )
}
