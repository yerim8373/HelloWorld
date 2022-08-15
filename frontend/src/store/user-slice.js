import { createSlice, current } from '@reduxjs/toolkit'
import {
  getUserData,
  getLanguageData,
  signup,
  setImage,
  getImage,
  updateUser,
  getMyHeart,
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
    avatar: undefined,
    description: undefined,
    heart: undefined,
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
      state.avatar = undefined
      state.description = undefined
      // 하트의 경우, 최대한 프론트에서 조작하려 하지 않을 것
      // 하트를 수정하고 싶다면, api를 통해 서버에서 산출하게끔 하자.
      state.heart = undefined
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
      state.subscribe =
        payload.data.authorities.filter(auth => auth.authName === 'ROLE_VIP')
          .length >= 1
      state.email = payload.data.email
      state.mobileNumber = payload.data.mobileNumber
      state.avatar = payload.data.avatarSrc
      state.description = payload.data.description
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
    [updateUser.rejected]: (state, { payload }) => {
      state.isError = true
      state.message = payload.message
    },
    [getMyHeart.fulfilled]: (state, { payload }) => {
      state.heart = payload.data.heart
    },
  },
})

export const { clear } = userSlice.actions
export default userSlice
