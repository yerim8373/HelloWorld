import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const login = createAsyncThunk('auth/login', async userData => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/auth/signin',
      {
        email: userData.email,
        pw: userData.password,
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const validToken = createAsyncThunk('auth/validToken', async token => {
  try {
    const response = await axios.get('http://localhost:8080/v1/auth/reissue', {
      params: { refreshToken: token },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})
