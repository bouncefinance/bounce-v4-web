import { ApiInstance } from 'api'

export const joinWaiting = async () => {
  return ApiInstance.post('/ido/waiting/join', {})
}
export const checkWaiting = () => {
  return ApiInstance.get('/ido/waiting/check', {})
}
export const waitingCount = () => {
  return ApiInstance.get('/ido/waiting/count', {})
}
export const getBindStatus = (side: string) => {
  return ApiInstance.get('/share/code', { side: side })
}
export const bindCode = (side: string, code: string) => {
  return ApiInstance.post('/share/bind', { side: side, code: code })
}
