import { routes } from 'constants/routes'
import { useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
const darkRoutes = [routes.thirdPart.DipExchange]
const useIsDipDark = () => {
  const { pathname } = useLocation()
  const isDipDark = useMemo(
    () => darkRoutes.includes(pathname) || darkRoutes.some(route => matchPath(route, pathname)),
    [pathname]
  )
  return [isDipDark]
}

export default useIsDipDark
