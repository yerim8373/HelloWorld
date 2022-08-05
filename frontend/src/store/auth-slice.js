import { createSlice } from '@reduxjs/toolkit'
import { login } from './auth-thunkActions'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: undefined,
    isError: false,
    message: undefined,
  },
  extraReducers: {
    [login.pending]: () => {
      return
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isAuthenticated = true
      state.token = payload.data.accessToken
    },
    [login.rejected]: (state, { payload }) => {
      state.isError = true
      state.message = payload.message
    },
  },
})

export const authActions = authSlice.actions
export default authSlice
