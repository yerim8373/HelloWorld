import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getRandomTip = createAsyncThunk(
  'tip/getRandomTip',
  async accessToken => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/tip/random`,
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
