import { createSlice } from '@reduxjs/toolkit'
import { getAllPosts } from './question-thunkActions'

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: {
    [getAllPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload.data
    },
  },
})

export const postActions = postSlice.actions
export default postSlice
