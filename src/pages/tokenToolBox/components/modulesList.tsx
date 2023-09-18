import { Box, Grid, Typography, Button } from '@mui/material'
import P1 from 'assets/imgs/toolBox/p1.png'
import P2 from 'assets/imgs/toolBox/p2.png'
import P3 from 'assets/imgs/toolBox/p3.png'
import { routes } from 'constants/routes'
import { useIsMDDown } from 'themes/useTheme'
interface ModulesConfigParams {
  logoImg: string
  title: string
  subTitle: string
  btnTitle: string
  link: string
}
const ModulesList = () => {
  const isMd = useIsMDDown()
  const modulesConfig: ModulesConfigParams[] = [
    {
      logoImg: P1,
      title: 'Token Locker',
      subTitle: 'Explain what is a token locker........',
      btnTitle: 'Create Lock',
      link: routes.tokenToolBox.tokenLocker
    },
    {
      logoImg: P1,
      title: 'V2 LP Locker',
      subTitle: 'Explain what is a v2 LP locker........',
      btnTitle: 'V2 LP Locker',
      link: routes.tokenToolBox.tokenLocker + '?tokenType=lp&version=v2'
    },
    {
      logoImg: P1,
      title: 'V3 LP Locker',
      subTitle: 'Explain what is a token locker........',
      btnTitle: 'V3 LP Locker',
      link: routes.tokenToolBox.tokenLocker + '?tokenType=lp&version=v3'
    },
    {
      logoImg: P2,
      title: 'Token Minter',
      subTitle: 'Explain what is a token minter........',
      btnTitle: 'Token Minter',
      link: routes.tokenToolBox.tokenMinter
    },
    {
      logoImg: P3,
      title: 'Disperse',
      subTitle: 'Explain what is a Disperse........',
      btnTitle: 'Disperse',
      link: routes.tokenToolBox.disperse
    }
  ]
  return (
    <Grid container columnSpacing={isMd ? '0' : '24px'} rowSpacing={'20px'} mt={isMd ? '0' : '24px'}>
      {modulesConfig.map((item, index) => {
        return (
          <Grid item key={index} xs={12} md={4} lg={3}>
            <Box
              sx={{
                width: '100%',
                borderRadius: '24px',
                background: '#fff',
                boxShadow: `2px 2px 10px 0px rgba(0, 0, 0, 0.04), -2px -2px 10px 0px rgba(0, 0, 0, 0.04)`,
                padding: '8px',
                cursor: 'pointer'
              }}
            >
              <img
                src={item.logoImg}
                style={{
                  width: '100%',
                  borderRadius: '18px',
                  marginBottom: '16px'
                }}
                alt=""
                srcSet=""
              />
              <Typography
                sx={{
                  color: '#000',
                  textAlign: 'center',
                  fontFamily: `'Public Sans'`,
                  fontSize: '20px',
                  fontWeight: 600,
                  lineHeight: '28px',
                  letterSpacing: '-0.4px'
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: '#959595',
                  textAlign: 'center',
                  fontFamily: `'Inter'`,
                  fontSize: '14px',
                  lineHeight: '21px'
                }}
              >
                {item.subTitle}
              </Typography>
              <Box
                sx={{
                  height: '78px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTop: '1px solid #E8E9E4'
                }}
                mt={'16px'}
              >
                <Button
                  variant={'contained'}
                  sx={{
                    borderRadius: '4px',
                    height: '42px',
                    lineHeight: '42px'
                  }}
                  href={item.link}
                >
                  {item.btnTitle}
                </Button>
              </Box>
            </Box>
          </Grid>
        )
      })}
    </Grid>
  )
}
export default ModulesList
