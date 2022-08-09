import { createSlice, current } from '@reduxjs/toolkit'
import { getUserData, getLanguageData, signup } from './user-thunkActions'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: undefined,
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
      state.id = payload.data.id
      state.name = payload.data.name
      state.age = payload.data.age
      state.nickname = payload.data.nickname
      state.country = payload.data.country.name
      state.subscribe = payload.data.subscribe ? true : false
    },
    [getUserData.rejected]: (state, { payload }) => {
      // state.isError = true
      // state.message = payload.message
    },
    [getLanguageData.fulfilled]: (state, { payload }) => {
      state.languages = payload.data
    },
    [signup.pending]: () => {
      return
    },
    [signup.fulfilled]: () => {
      return
    },
    [signup.rejected]: (state, { payload }) => {
      state.isError = true
      state.message = payload.message
    },
  },
})

export const userActions = userSlice.actions
export default userSlice
