import { createSlice } from '@reduxjs/toolkit'
import { getHeartHistory } from './hearthistory-thunkActions'

const hearthistorySlice = createSlice({
  name: 'heart',
  initialState: {
    heartHistoryId: undefined,
    cnt: undefined,
    from: undefined,
    to: undefined,
    route: undefined,
    name: undefined,
    regDate: undefined,
  },
  extraReducers: {
    [getHeartHistory.pending]: () => {
      return
    },
    [getHeartHistory.fulfilled]: (state, { payload }) => {
      state.heartHistoryId = payload.data.heartHistoryId
      state.cnt = payload.data.cnt
      state.from = payload.data.from
      state.to = payload.data.to
      state.route = payload.data.route
      state.name = payload.data.name
      state.regDate = payload.data.regDate
    },
    [getHeartHistory.rejected]: (state, { payload }) => {
      state.isError = true
      state.message = payload.message
    },
  },
})

export const heartActions = hearthistorySlice.actions
export default hearthistorySlice
