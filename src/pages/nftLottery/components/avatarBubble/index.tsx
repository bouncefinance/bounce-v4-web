import { Box, styled } from '@mui/material'
import Image from 'components/Image'

const AvatarBox = styled(Box)(() => ({
  position: 'relative',
  top: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column-reverse',
  zIndex: 999,
  '@keyframes flutter': {
    '0%': {
      bottom: 0,
      opacity: 1
    },
    '100%': {
      bottom: '315px',
      transform: ' scale(0.545)',
      opacity: 0
    }
  }
}))

const countLeft = (i: number) => {
  if (i % 5 === 1) {
    return '50%'
  } else if (i % 4 === 1) {
    return '10%'
  } else if (i % 3 === 1) {
    return '70%'
  } else if (i % 2 === 1) {
    return '0%'
  } else {
    return '50%'
  }
}

export default function AvatarBubble({ avatarList }: { avatarList: Array<string> }) {
  return (
    <AvatarBox width={87} height={315}>
      {avatarList?.map((item, index) => (
        <Image
          key={index}
          src={item}
          style={{
            width: 60.79,
            height: 60.79,
            border: '1.8px solid var(--desgin-white-100, #FFF)',
            borderRadius: '60.79px',
            left: countLeft(index + 1),
            position: 'absolute',
            opacity: '0',
            animationName: 'flutter',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            animationDuration: `${avatarList.length * 2}s`,
            animationDelay: `${(index + 1) * 2}s`
          }}
        ></Image>
      ))}
    </AvatarBox>
  )
}
