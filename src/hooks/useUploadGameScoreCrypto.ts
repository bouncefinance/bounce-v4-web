import { useActiveWeb3React } from 'hooks'
import { useCallback } from 'react'
import { useUserInfo } from 'state/users/hooks'
import { useSignMessage } from 'hooks/useWeb3Instance'
import { sendScore } from 'api/game'
const CryptoJS = require('crypto-js')
import { getCurrentTimeStamp } from 'utils'

function encryptData(data: string, key: string) {
  const secretKey = CryptoJS.enc.Utf8.parse(key)
  return CryptoJS.AES.encrypt(data, secretKey, {
    iv: secretKey,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
}

export default function useUploadGameScoreCrypto() {
  const { account } = useActiveWeb3React()
  const { token } = useUserInfo()
  const signMessage = useSignMessage()

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
        const _key = account + signTimeStamp
        const secretKey = CryptoJS.SHA256(CryptoJS.MD5(_key).toString()).toString().slice(0, 16)
        const secretData = encryptData(
          JSON.stringify({
            message: _message,
            payableId,
            score: resultScore,
            expired,
            signature,
            address: account,
            signTimeStamp
          }),
          secretKey
        )

        const req = {
          data: secretData,
          address: account,
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
