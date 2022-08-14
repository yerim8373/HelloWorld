import { createSlice } from '@reduxjs/toolkit'
import { getRandomTip } from './tip-thunkActions'

const tipSlice = createSlice({
  name: 'tip',
  initialState: {
    message: undefined,
  },
  reducers: {},
  extraReducers: {
    [getRandomTip.fulfilled]: (state, { payload }) => {
      state.message = payload.data
    },
  },
})

export const tipActions = tipSlice.actions
export default tipSlice
