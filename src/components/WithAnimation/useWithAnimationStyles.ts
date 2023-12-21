import makeStyles from '@mui/styles/makeStyles'

export const useWithAnimationStyles = makeStyles(() => ({
  awaitInView: {
    transformOrigin: '0 100%',
    transitionProperty: 'transform, opacity',
    transitionDuration: '0.5s',
    opacity: 0,
    transform: 'translateY(20px) rotateZ(3deg)'
    // '.client-side &': {
    //   opacity: 0,
    //   transform: 'translateY(20px) rotateZ(3deg)'
    // }
  },
  inView: {
    '&&': {
      opacity: 1,
      transform: 'translateY(0) rotateZ(0)'
    }
  }
}))
