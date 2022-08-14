import { createSlice } from '@reduxjs/toolkit'
import { getRandomQuestion } from './question-thunkActions'

const questionSlice = createSlice({
  name: 'question',
  initialState: {
    message: undefined,
  },
  reducers: {},
  extraReducers: {
    [getRandomQuestion.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.message = payload.data
    },
  },
})

export const questionActions = questionSlice.actions
export default questionSlice
