import { useInView, IntersectionOptions } from 'react-intersection-observer'
import { styled } from '@mui/material'
const AnimationSection = styled('div')(() => ({
  opacity: 0,
  transform: 'translateY(20px)',
  '&.fadeIn': {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
  },
  '&.fadeOut': {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
  }
}))
const AnimatedComponent = ({ children, options }: { children: React.ReactNode; options?: IntersectionOptions }) => {
  const [ref, inView] = useInView({
    rootMargin: '0px',
    threshold: 0.5,
    ...options
  })
  return (
    <AnimationSection ref={ref} className={inView ? 'fadeIn' : 'fadeOut'}>
      {children}
    </AnimationSection>
  )
}

export default AnimatedComponent
