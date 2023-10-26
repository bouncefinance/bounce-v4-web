import { toast } from 'react-toastify'
import { IResponse } from './type'
import store from 'state'
import { removeLoginInfo, removeUserInfo } from 'state/users/reducer'

const request = (url: string, options?: any) => {
  // TODO: add request/response interceptors
  return fetch(url, options).then(async response => {
    if (response.status === 401) {
      toast.error('Login has expired, please login again.', {
        toastId: 'loginHasExpired'
      })
      store.dispatch(removeLoginInfo())
      store.dispatch(removeUserInfo())
      // location.href = '/login'
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1000)
    }
    const json = await response?.json()
    if (response.status !== 200) {
      return Promise.reject(json)
    }
    return json
  })
}

const initSignature = (): { token: string | undefined } => {
  const { token, address } = store.getState().users
  const { currentConnectedAccount } = store.getState().application
  return {
    token: currentConnectedAccount === address ? token || '' : ''
  }
}

const instance = (baseuri: string) => ({
  get<TData = any>(url: string, params: any, headers?: any): Promise<IResponse<TData>> {
    return request(`${baseuri}${url}?${new URLSearchParams(params).toString()}`, {
      headers: {
        ...headers,
        ...initSignature()
      }
    })
  },
  post<TData = any>(url: string, body: any, headers?: any): Promise<IResponse<TData>> {
    const _headers = headers || { 'Content-Type': 'application/json' }

    return request(`${baseuri}${url}`, {
      headers: {
        ..._headers,
        ...initSignature()
      },
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body)
    })
  }
})
const botInstance = (baseuri: string) => ({
  get<TData = any>(url: string, params: any, headers?: any): Promise<IResponse<TData>> {
    return request(`${baseuri}${url}?${new URLSearchParams(params).toString()}`, {
      headers: {
        ...headers,
        ...initSignature()
      }
    })
  },
  post<TData = any>(url: string, body: any, headers?: any): Promise<IResponse<TData>> {
    const _headers = headers || { 'Content-Type': 'application/json' }

    return request(`${baseuri}${url}`, {
      headers: {
        ..._headers
      },
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body)
    })
  }
})

export const ApiInstance = instance(process.env.REACT_APP_REQUEST_BASEURL || '')
export const BotApiInstance = botInstance(process.env.REACT_APP_REQUEST_BOT_BASEURL || '')
