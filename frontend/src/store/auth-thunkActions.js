import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const login = createAsyncThunk('auth/login', async userData => {
  try {
    const response = await axios.post(
      'https://i7b106.p.ssafy.io/api/v1/auth/signin',
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
    const response = await axios.post(
      'https://i7b106.p.ssafy.io/api/v1/auth/reissue',
      {
        refreshToken: token,
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const signup = createAsyncThunk('auth/signup', async userData => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user`,
      userData,
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
})

// export const logout = createAsyncThunk('auth/signout', async userData => {
//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_URL}/api/v1/auth/signout`,
//       userData,
//     )
//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// })
