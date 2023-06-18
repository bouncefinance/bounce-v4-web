// import { IS_TEST_ENV } from '../constants'
import { useEffect } from 'react'
import { fetchUserLocation } from 'utils/fetch/location'
import { useSetCurrentRegion } from 'state/application/hooks'

export function useLocationBlockInit() {
  const setCurrentRegion = useSetCurrentRegion()
  useEffect(() => {
    // !IS_TEST_ENV &&
    fetchUserLocation()
      .then(res => {
        setCurrentRegion(res.data.country || null)
      })
      .catch(() => {
        setCurrentRegion(null)
      })
  }, [setCurrentRegion])
}
