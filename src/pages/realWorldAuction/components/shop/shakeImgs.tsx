import { useState, useMemo } from 'react'
const ShakeImgs = ({ style, list }: { style?: React.CSSProperties; list: string[] }) => {
  const [index, setIndex] = useState<number>(0)
  const update = (index: number) => (index + 1 > list.length - 1 ? 0 : index + 1)
  const [time, setTime] = useState<any>(null)
  const currentImg = useMemo(() => {
    return list[index]
  }, [index, list])
  const starShakeImg = () => {
    if (time !== null) {
      clearInterval(time)
      setTime(null)
    }
    const newTime = setInterval(() => {
      setIndex(update)
    }, 300)
    setTime(newTime)
  }
  const stopShakeImg = () => {
    if (time !== null) {
      clearInterval(time)
    }
    setTime(null)
    setIndex(0)
  }
  return (
    <img
      onMouseEnter={starShakeImg}
      onMouseLeave={stopShakeImg}
      src={currentImg}
      style={{
        display: 'block',
        cursor: 'pointer',
        ...style
      }}
      alt=""
      srcSet=""
    />
  )
}
export default ShakeImgs
