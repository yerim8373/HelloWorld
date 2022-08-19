import { createSlice, current } from '@reduxjs/toolkit'
import { findRoom, leaveRoom, makeRoom } from './room-thunkActions'

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    roomId: undefined,
    languages: undefined,
    isCreatedRoom: false,
    isJoinedRoom: false,
    isError: undefined,
    message: undefined,
  },
  reducers: {},
  extraReducers: {
    [findRoom.fulfilled]: (state, { payload }) => {
      state.roomId = payload.data.roomId
      if (payload.message) {
        state.isCreatedRoom = true
        console.log('난 방 생성자')
      } else {
        state.isJoinedRoom = true
        console.log('난 방 참여자')
      }
    },

    [findRoom.rejected]: (state, { payload }) => {
      // console.log(payload)
      // state.isCreatingRoom = true
    },

    [leaveRoom.fulfilled]: (state, { payload }) => {
      state.roomId = undefined
      state.languages = undefined
      state.isError = undefined
      state.message = undefined
      state.isCreatedRoom = undefined
      state.isJoinedRoom = undefined
    },
    [leaveRoom.rejected]: (state, { payload }) => {
      // state.isError = true
      // state.message = payload.message
    },
  },
})

export const roomActions = roomSlice.actions
export default roomSlice
