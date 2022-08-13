import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authSlice from './auth-slice'
import userSlice from './user-slice'
import languageSlice from './language-slice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import roomSlice from './room-slice'
import ovSlice from './ov-slice'

const persistConfig = {
  key: 'root',
  blacklist: ['room', 'openvidu'],
  storage,
}

const persistingReducer = combineReducers({
  user: userSlice.reducer,
  auth: authSlice.reducer,
  language: languageSlice.reducer,
  room: roomSlice.reducer,
  openvidu: ovSlice.reducer,
})

// const normalReducer = combineReducers({})

const persistedReducer = persistReducer(persistConfig, persistingReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      // ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // ovActions: false,
      // },
    }),
})

export const persistor = persistStore(store)
export default store
