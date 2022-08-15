import { createSlice } from '@reduxjs/toolkit'

const peerUserSlice = createSlice({
  name: 'peerUser',
  initialState: {
    nickname: undefined,
    country: undefined,
    heart: undefined,
  },
  reducers: {
    getPeerUserData: (state, { payload }) => {
      state.nickname = payload.nickname
      state.country = payload.country
      state.heart = payload.heart
    },
    deletePeerUserData: state => {
      state.nickname = undefined
      state.country = undefined
      state.heart = undefined
    },
  },
})

export const peerUserActions = peerUserSlice.actions
export default peerUserSlice
