import { createSlice, current } from '@reduxjs/toolkit'
import { getUserData, getLanguageData } from './user-thunkActions'

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
      // state.languages.push(payload)
      console.log(payload)
      state.languages = payload.data
    },
  },
})

export const userActions = userSlice.actions
export default userSlice
