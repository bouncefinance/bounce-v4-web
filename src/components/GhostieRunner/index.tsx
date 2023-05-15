import { Box } from '@mui/material'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useEffect } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'

export default function GhostieRunner({ scoreUpload }: { scoreUpload: (score: number) => void }) {
  const { unityProvider, isLoaded, addEventListener, removeEventListener, unload } = useUnityContext({
    loaderUrl: 'https://gr.z-crypto.ml/GhostieRunnerWebGL_0.2.0.loader.js',
    dataUrl: 'https://gr.z-crypto.ml/GhostieRunnerWebGL_0.2.1.wasm',
    frameworkUrl: 'https://gr.z-crypto.ml/GhostieRunnerWebGL_0.2.0.framework.js',
    codeUrl: 'https://gr.z-crypto.ml/GhostieRunnerWebGL_0.2.0.wasm'
  })

  // SendHighScore
  useEffect(() => {
    addEventListener('SendScore', scoreUpload)
    return () => {
      removeEventListener('SendScore', scoreUpload)
      unload()
    }
  }, [addEventListener, scoreUpload, removeEventListener, unload])

  return (
    <Box margin={'20px auto 0'} position={'relative'}>
      {!isLoaded && <BounceAnime />}
      <Unity unityProvider={unityProvider} style={{ width: 1200, height: 748 }} />
    </Box>
  )
}
