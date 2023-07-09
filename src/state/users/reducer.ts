import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUserInfoParams, USER_TYPE } from 'api/user/type'
import { getUserInfo } from 'api/user'
import { ICompanyInfoParams } from 'api/company/type'
import { getCompanyInfo } from 'api/company'

export interface ICacheLoginInfo {
  token: string
  userId: string | number
  userType?: USER_TYPE | string
  address: string
}

export const fetchUserInfo: any = createAsyncThunk('users/fetchUserInfo', async (params: IUserInfoParams) => {
  const res = await getUserInfo(params)
  return res.data
})

export const fetchCompanyInfo: any = createAsyncThunk('users/fetchCompanyInfo', async (params: ICompanyInfoParams) => {
  const res = await getCompanyInfo(params)
  return res.data
})

const LOCAL_USER_TOKEN_KEY = 'LOCAL_USER_TOKEN_KEY'
export const getLocalUserToken = (): ICacheLoginInfo => {
  let _local: any = ''
  try {
    _local = JSON.parse(localStorage.getItem(LOCAL_USER_TOKEN_KEY) || '')
  } catch (error) {}
  return {
    token: _local?.token || '',
    userId: _local?.userId || '',
    address: _local?.address || ''
  }
}
const saveLocalUserToken = (data: ICacheLoginInfo | null) => {
  localStorage.setItem('LOCAL_USER_TOKEN_KEY', data ? JSON.stringify(data) : '')
}

const localUserToken = getLocalUserToken()

const initialState: ICacheLoginInfo & {
  userInfo: any
  companyInfo: any
} = {
  token: localUserToken.token,
  userId: localUserToken.userId,
  userType: '0',
  address: localUserToken.address,
  userInfo: null,
  companyInfo: null
}

export const userInfoSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    saveLoginInfo: (state, { payload }) => {
      state.token = payload.token
      state.userId = payload.userId
      // state.userType = payload.userType
      state.address = payload.address

      saveLocalUserToken({
        token: payload.token,
        userId: payload.userId,
        address: payload.address
      })
    },
    removeLoginInfo: state => {
      state.token = ''
      state.userId = 0
      // state.userType = ''
      state.address = ''
      saveLocalUserToken(null)
    },
    removeUserInfo: state => {
      state.userInfo = null
      state.companyInfo = null
    }
  },
  extraReducers: {
    [fetchUserInfo.fulfilled]: (state, { payload }) => {
      state.userInfo = { ...payload }
    },
    [fetchCompanyInfo.fulfilled]: (state, { payload }) => {
      state.companyInfo = { ...payload }
    }
  }
})

export const { saveLoginInfo, removeUserInfo, removeLoginInfo } = userInfoSlice.actions
export default userInfoSlice.reducer
