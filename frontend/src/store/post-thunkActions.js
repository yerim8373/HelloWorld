import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/post`,
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const getPost = createAsyncThunk('post/getPost', async id => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/post/${id}`,
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const createPost = createAsyncThunk(
  'post/createPost',
  async postData => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/post`,
        postData,
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async postData => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/post`,
        postData,
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)

export const deletePost = createAsyncThunk('post/deletePost', async id => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/post/${id}`,
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
})
