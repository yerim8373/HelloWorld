import { createSlice, current } from '@reduxjs/toolkit'
import { getUserData } from './user-thunkActions'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: undefined,
    age: undefined,
    nickname: undefined,
    gender: undefined,
    country: undefined,
    languages: [],
    subscribe: undefined,
  },
  reducers: {},
  extraReducers: {
    [getUserData.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.name = payload.data.name
      state.age = payload.data.age
      state.nickname = payload.data.nickname
      state.country = payload.data.country.name
      state.subscribe = payload.data.subscribe ? true : false
      // state.isAuthenticated = true
      // state.token = payload.data.accessToken
      console.log(current(state))
    },
    [getUserData.rejected]: (state, { payload }) => {
      // state.isError = true
      // state.message = payload.message
    },
  },
})

export const userActions = userSlice.actions
export default userSlice
