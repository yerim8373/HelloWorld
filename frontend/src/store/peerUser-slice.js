import { createSlice } from '@reduxjs/toolkit'

const peerUserSlice = createSlice({
  name: 'peerUser',
  initialState: {
    nickname: undefined,
    country: undefined,
    heart: undefined,
    email: undefined,
  },
  reducers: {
    getPeerUserData: (state, { payload }) => {
      state.nickname = payload.nickname
      state.country = payload.country
      state.heart = payload.heart
      state.email = payload.email
    },
    deletePeerUserData: state => {
      state.nickname = undefined
      state.country = undefined
      state.heart = undefined
      state.email = undefined
    },
  },
})

export const peerUserActions = peerUserSlice.actions
export default peerUserSlice
