import { createSlice } from '@reduxjs/toolkit'

const peerUserSlice = createSlice({
  name: 'peerUser',
  initialState: {
    nickname: undefined,
    country: undefined,
    heart: undefined,
    email: undefined,
    id: undefined,
    createdRoom: undefined,
  },
  reducers: {
    getPeerUserData: (state, { payload }) => {
      console.log(payload)
      state.nickname = payload.nickname
      state.country = payload.country
      state.heart = payload.heart
      state.email = payload.email
      state.id = payload.id
      state.createdRoom = payload.createdRoom
    },
    deletePeerUserData: state => {
      state.nickname = undefined
      state.country = undefined
      state.heart = undefined
      state.email = undefined
      state.id = undefined
      state.createdRoom = undefined
    },
  },
})

export const peerUserActions = peerUserSlice.actions
export default peerUserSlice
