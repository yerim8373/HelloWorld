import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLanguages = createAsyncThunk('language/language', async () => {
  try {
    const response = await axios.get(
      'https://i7b106.p.ssafy.io/api/v1/language',
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
})
