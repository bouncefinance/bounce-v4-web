import { useActiveWeb3React } from 'hooks'
import { useCallback } from 'react'
import { useUserInfo } from 'state/users/hooks'
import { useSignMessage } from 'hooks/useWeb3Instance'
import { sendScore } from 'api/game'
const CryptoJS = require('crypto-js')
import { getCurrentTimeStamp } from 'utils'

export default function useUploadGameScoreCrypto() {
  const { account } = useActiveWeb3React()
  const { token } = useUserInfo()
  const signMessage = useSignMessage()

  // function encryptData(data: string, key: string) {
  //   const encrypted = CryptoJS.AES.encrypt(data, key, {
  //     mode: CryptoJS.mode.CFB,
  //     padding: CryptoJS.pad.Pkcs7
  //   })
  //   return encrypted.toString()
  // }

  const uploadGameScore = useCallback(
    async (score: number, payableId: number) => {
      if (!account || !token) return Promise.reject('')
      const resultScore = score.toFixed(2)
      const signTimeStamp = getCurrentTimeStamp()
      const expired = signTimeStamp + 30
      const _message = 'Bounce would like you to sign the game score'
      const _signMsg = {
        message: _message,
        score: resultScore,
        expired,
        payableId,
        key: CryptoJS.MD5(account + payableId + score + expired + signTimeStamp).toString()
      }
      try {
        const signature = await signMessage(JSON.stringify(_signMsg))
        const req = {
          message: _message,
          payableId,
          address: account,
          score: resultScore,
          signature,
          expired,
          signTimeStamp
        }
        sendScore(req)
        return Promise.resolve('')
      } catch (error) {
        return Promise.reject('')
      }
    },
    [account, signMessage, token]
  )
  return uploadGameScore
}
