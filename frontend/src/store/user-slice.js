import { createSlice, current } from '@reduxjs/toolkit'
import {
  getUserData,
  getLanguageData,
  signup,
  setImage,
  getImage,
} from './user-thunkActions'

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
    email: undefined,
    mobileNumber: undefined,
  },
  reducers: {
    clear(state) {
      state.id = undefined
      state.name = undefined
      state.age = undefined
      state.nickname = undefined
      state.gender = undefined
      state.country = undefined
      state.languages = []
      state.subscribe = undefined
      state.email = undefined
      state.mobileNumber = undefined
    },
  },
  extraReducers: {
    [getUserData.fulfilled]: (state, { payload }) => {
      state.id = payload.data.id
      state.name = payload.data.name
      state.age = payload.data.age
      state.nickname = payload.data.nickname
      state.gender = payload.data.gender
      state.country = payload.data.country.name
      state.languages = payload.data.languages
      state.subscribe = payload.data.subscribe ? true : false
      state.email = payload.data.email
      state.mobileNumber = payload.data.mobileNumber
    },
    [getUserData.rejected]: (state, { payload }) => {
      // state.isError = true
      // state.message = payload.message
    },
    [getLanguageData.fulfilled]: (state, { payload }) => {
      state.languages = payload.data
    },
    [signup.rejected]: (state, { payload }) => {
      state.isError = true
      state.message = payload.message
    },
    [setImage.rejected]: (state, { payload }) => {
      state.isError = true
      state.message = payload.message
    },
    [getImage.rejected]: (state, { payload }) => {
      state.isError = true
      state.message = payload.message
    },
  },
})

export const { clear } = userSlice.actions
export default userSlice
