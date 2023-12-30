import makeStyles from '@mui/styles/makeStyles'

export const pcArtistWithAnimationStyles = makeStyles(() => ({
  tab: {
    opacity: 0,
    transform: 'translateX(-30%)'
  },
  tabInView: {
    transformOrigin: '0 100%',
    transitionProperty: 'transform, opacity',
    transitionDuration: '1s',
    opacity: 1,
    transform: 'translateX(0)'
  },
  tabItem: {
    opacity: 0,
    transform: 'translateX(20%)'
  },
  tabItemInView: {
    transformOrigin: '0 100%',
    transitionProperty: 'transform, opacity',
    transitionDuration: '1s',
    opacity: 1,
    transform: 'translateX(0)'
  }
}))
