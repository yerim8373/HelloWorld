import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async accessToken => {
    try {
      const response = await axios.get(
        'https://i7b106.p.ssafy.io/api/v1/user/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)

export const getLanguageData = createAsyncThunk(
  'user/getLanguageData',
  async accessToken => {
    try {
      const response = await axios.get(
        'https://i7b106.p.ssafy.io/api/v1/user/lan',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)
