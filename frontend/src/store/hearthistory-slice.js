import { createSlice } from '@reduxjs/toolkit'
import { getHeartHistory } from './hearthistory-thunkActions'

const hearthistorySlice = createSlice({
  name: 'heart',
  initialState: {
    history: [],
    isError: undefined,
    message: undefined,
  },
  extraReducers: {
    [getHeartHistory.pending]: () => {
      return
    },
    [getHeartHistory.fulfilled]: (state, { payload }) => {
      console.log(payload.data)
      state.history = payload.data
    },
    [getHeartHistory.rejected]: (state, { payload }) => {
      state.isError = true
      state.message = payload.message
    },
  },
})

export const heartActions = hearthistorySlice.actions
export default hearthistorySlice
