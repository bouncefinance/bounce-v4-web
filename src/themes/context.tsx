import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { createTheme, CssBaseline, styled, ThemeProvider } from '@mui/material'
import Colors from './options/color'
import { CustomTheme, RootThemes } from './RootOptions'

type Mode = 'light' | 'dark'

export interface IThemeModeContext {
  toggleThemeMode: () => void
}

const ThemeModeContext = createContext<IThemeModeContext | null>(null)
export const useMuiThemes = () => {
  const [mode, setMode] = useState<Mode>('light')

  const toggleThemeMode = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }, [mode])

  const themes = useMemo(() => {
    const colors = Colors[mode]
    const theme = CustomTheme(colors, {
      mode,
      common: { ...colors }
    })
    return createTheme({
      ...RootThemes,
      ...theme,
      gradient: {
        gradient1: '#ffffff linear-gradient(154.62deg, #77C803 9.44%, #28A03E 59.25%);'
      },
      height: {
        header: '76px',
        mobileHeader: '51px',
        footer: '60px'
      },
      width: {
        sidebar: '250px',
        maxContent: '1110px'
      }
    })
  }, [mode])

  return {
    themes,
    toggleThemeMode
  }
}

export const useThemeMode = (): IThemeModeContext => {
  const context = useContext(ThemeModeContext) as IThemeModeContext
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeContext')
  }
  return context
}

type IMuiThemeProviderProps = {
  children: React.ReactNode
}

export const MuiThemeProvider: React.FC<IMuiThemeProviderProps> = ({ children }) => {
  const { themes, toggleThemeMode } = useMuiThemes()

  return (
    <ThemeModeContext.Provider value={{ toggleThemeMode }}>
      <ThemeProvider theme={themes}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export default MuiThemeProvider

export const HideOnMobile = styled('div', {
  shouldForwardProp: () => true
})<{ breakpoint?: 'sm' | 'md' | 'lg' }>(({ theme, breakpoint }) => ({
  [theme.breakpoints.down(breakpoint ?? 'sm')]: {
    display: 'none'
  }
}))

export const ShowOnMobile = styled('div', {
  shouldForwardProp: () => true
})<{ breakpoint?: 'sm' | 'md' }>(({ theme, breakpoint }) => ({
  display: 'none',
  [theme.breakpoints.down(breakpoint ?? 'sm')]: {
    display: 'block'
  }
}))
