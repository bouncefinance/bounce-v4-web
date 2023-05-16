import { Stack } from '@mui/system'
import React, { useCallback, useEffect } from 'react'
// import { ReactComponent as LinkedInSVG } from '../../../../signup/assets/linkedIn.svg'
import { ReactComponent as TwitterSVG } from '../../../../signup/assets/twitter.svg'
// import { ReactComponent as GoogleSVG } from './BoxLayout/googleLog.svg'
import BoxLayout from './BoxLayout/BoxLayout'
// import { ACCOUNT_TYPE } from 'api/user/type'
import { bindThirdpartGetUrlOfTwitter } from 'api/user'
import { useIsWindowFocus } from 'hooks/useIsWindowVisible'
import { useRefreshUserInfoCallback } from 'state/users/hooks'
// import { useBindThirdPart } from 'bounceHooks/user/useBindThirdPart'
// import { useOauth } from 'state/users/hooks'
export type ILoginOptonProps = {
  // googleEmail: string
  twitter: string
}

const LoginOpton: React.FC<ILoginOptonProps> = ({ twitter }) => {
  // const { handleOauth } = useOauth()
  // const { run } = useBindThirdPart()
  // const handleThirdBind = async (oauthName: string, oauthType: ACCOUNT_TYPE) => {
  //   const accessToken = await handleOauth(oauthName)
  //   run({
  //     accessToken: accessToken,
  //     thirdpartType: oauthType
  //   })
  // }
  // const { linkedInLogin } = useLinkedInOauth((accessToken, oauthType) =>
  //   run({
  //     accessToken: accessToken,
  //     thirdpartType: oauthType
  //   })
  // )
  // const handleThirdLinkedinOauth = async () => {
  //   linkedInLogin()
  // }

  const isWindowFocus = useIsWindowFocus()
  const refreshUserInfoCallback = useRefreshUserInfoCallback()

  useEffect(() => {
    if (isWindowFocus) {
      console.log('ddddd')
      refreshUserInfoCallback()
    }
  }, [isWindowFocus, refreshUserInfoCallback])

  const bindTwitter = useCallback(async () => {
    const authRes = await bindThirdpartGetUrlOfTwitter()
    window.open(
      authRes.data,
      'intent',
      'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=500,height=500,left=0,top=0'
    )
  }, [])

  return (
    <Stack>
      {/* <BoxLayout
          email={googleEmail}
          title={'Google account'}
          emailSvg={<GoogleSVG />}
          onBind={() => handleThirdBind('google', ACCOUNT_TYPE.GMAIL)}
        /> */}
      <BoxLayout link={twitter} title={'Twitter'} image={<TwitterSVG />} onBind={bindTwitter} />
    </Stack>
  )
}

export default LoginOpton
