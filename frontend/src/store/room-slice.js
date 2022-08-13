import { createSlice, current } from '@reduxjs/toolkit'
import { findRoom, leaveRoom, makeRoom } from './room-thunkActions'

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    roomId: undefined,
    languages: undefined,
    isCreatedRoom: undefined,
    isJoinedRoom: undefined,
    isError: undefined,
    message: undefined,
  },
  reducers: {},
  extraReducers: {
    [findRoom.fulfilled]: (state, { payload }) => {
      // console.log(payload)
      state.roomId = payload.data.roomId
      // const { roomId, user } = payload
      // state.roomId = roomId
      // state.languages = languages
    },

    [findRoom.rejected]: (state, { payload }) => {
      // console.log(payload)
      // state.isCreatingRoom = true
    },

    [leaveRoom.fulfilled]: (state, { payload }) => {
      state.roomId = undefined
      state.languages = undefined
      state.isCreatingRoom = undefined
      state.isError = undefined
      state.message = undefined
    },
    [leaveRoom.rejected]: (state, { payload }) => {
      // state.isError = true
      // state.message = payload.message
    },
  },
})

export const roomActions = roomSlice.actions
export default roomSlice
