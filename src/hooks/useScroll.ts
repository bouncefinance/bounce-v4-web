import { useDebounce } from 'ahooks'
import { useEffect, useState } from 'react'

export function useScrollHeight() {
  const [value, setValue] = useState<number>()
  const debouncedValue = useDebounce(value, { wait: 10 })
  useEffect(() => {
    const onScroll = () => {
      setValue(window.scrollY)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return debouncedValue
}

export function useHeaderBgOpacity() {
  const height = useScrollHeight()
  const opacity1H = 200
  // const curH = useMemo(() => ((height || 0) > opacity1H ? opacity1H : height || 0), [height])
  const h = height ?? 0

  return h > opacity1H ? 0.65 : h > 76 ? (h / opacity1H) * 0.65 : 0

  // return useMemo(() => {
  //   return curH / opacity1H
  // }, [curH])
}
