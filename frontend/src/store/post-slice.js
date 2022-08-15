import { createSlice } from '@reduxjs/toolkit'
import { getAllPosts } from './question-thunkActions'

const postSlice = createSlice({
  name: 'post',
  initialState: {
    id: undefined,
    title: undefined,
    content: undefined,
    author: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  },
  reducers: {},
  extraReducers: {
    [getAllPosts.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.id = payload.data.id
      state.title = payload.data.title
      state.content = payload.data.content
      state.author = payload.data.user
      state.createdAt = payload.data.createdAt
      state.updatedAt = payload.data.updatedAt
    },
  },
})

export const postActions = postSlice.actions
export default postSlice
