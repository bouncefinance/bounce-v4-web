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
