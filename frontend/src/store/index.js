import { configureStore } from '@reduxjs/toolkit'

import ovSlice from './ov-slice'

const store = configureStore({
  reducer: {
    openvidu: ovSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export default store
