import { createSlice } from '@reduxjs/toolkit'
import { getHeartHistory } from './hearthistory-thunkActions'

const hearthistorySlice = createSlice({
  name: 'heart',
  initialState: {
    history: [
      {
        heartid: undefined,
        heartdate: undefined,
        heartopponent: undefined,
        heartaction: undefined,
        heartamount: undefined,
      },
    ],
    isError: undefined,
    message: undefined,
  },
  extraReducers: {
    [getHeartHistory.pending]: () => {
      return
    },
    [getHeartHistory.fulfilled]: (state, { payload }) => {
      // console.log('111')
      // console.log(payload)
      // console.log('111')
    },
    [getHeartHistory.rejected]: (state, { payload }) => {
      state.isError = true
      state.message = payload.message
    },
  },
})

export const heartActions = hearthistorySlice.actions
export default hearthistorySlice
