import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authSlice from './auth-slice'

import ovSlice from './ov-slice'
import userSlice from './user-slice'

const store = configureStore({
  devTools: true,
  reducer: {
    openvidu: ovSlice.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: [...getDefaultMiddleware()],
})

export default store
