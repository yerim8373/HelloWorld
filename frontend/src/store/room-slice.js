import { createSlice, current } from '@reduxjs/toolkit'
import { findRoom, makeRoom } from './room-thunkActions'

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    roomId: undefined,
    languages: undefined,
    isCreatingRoom: undefined,
    isError: undefined,
    message: undefined,
  },
  reducers: {},
  extraReducers: {
    [findRoom.fulfilled]: (state, { payload }) => {
      const { roomId, languages } = payload
      state.roomId = roomId
      state.languages = languages
    },

    [findRoom.rejected]: (state, { payload }) => {
      state.isCreatingRoom = true
    },

    [makeRoom.fulfilled]: (state, { payload }) => {
      const { roomId, languages } = payload
      state.roomId = roomId
      state.languages = languages
    },

    [makeRoom.rejected]: (state, { payload }) => {
      state.isError = true
      state.message = payload.message
    },
  },
})

export const roomActions = roomSlice.actions
export default roomSlice
