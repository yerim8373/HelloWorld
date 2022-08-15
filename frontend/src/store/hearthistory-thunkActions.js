import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHeartHistory = createAsyncThunk(
  'heart/getHearthistory',
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/heart/history`,
      )
      console.log('111')
      console.log(response.data)
      console.log('111')
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)
