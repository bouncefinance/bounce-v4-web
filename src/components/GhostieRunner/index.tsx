import { Box } from '@mui/material'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useActiveWeb3React } from 'hooks'
import { useEffect, useState } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'
import { useUserInfo } from 'state/users/hooks'

export default function GhostieRunner({ scoreUpload }: { scoreUpload: (score: number) => void }) {
  const { account } = useActiveWeb3React()
  const { token } = useUserInfo()
  const [hidden, setHidden] = useState(false)

  const { unityProvider, isLoaded, addEventListener, removeEventListener, unload } = useUnityContext({
    loaderUrl: 'https://gr.z-crypto.ml/GhostieRunnerWebGL_0.2.0.loader.js',
    dataUrl: 'https://gr.z-crypto.ml/GhostieRunnerWebGL_0.2.1.wasm',
    frameworkUrl: 'https://gr.z-crypto.ml/GhostieRunnerWebGL_0.2.0.framework.js',
    codeUrl: 'https://gr.z-crypto.ml/GhostieRunnerWebGL_0.2.0.wasm'
  })

  useEffect(() => {
    const reload = async () => {
      await unload()
      setHidden(true)
      setTimeout(() => setHidden(false), 100)
    }
    reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

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
      {hidden || (account && !token) ? (
        <Box height={600} />
      ) : (
        <Box padding={'0 50px'}>
          <Unity unityProvider={unityProvider} style={{ width: 1100, height: 550 }} />
        </Box>
      )}
    </Box>
  )
}
