import { useState, useEffect } from 'react'

const useResizeView = () => {
  const resizeView = () => {
    const w = window.innerWidth
    if (w <= 900) {
      return 2
    }
    if (w <= 1200) {
      return 3
    }
    return 4
  }
  const [slidesPerView, setSlidesPerView] = useState(resizeView())

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(resizeView())
    }
    window.addEventListener('resize', handleResize)
    return window.removeEventListener('reset', handleResize)
  }, [])
  return [slidesPerView]
}
export default useResizeView
