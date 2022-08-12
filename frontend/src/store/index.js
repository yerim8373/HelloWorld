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

const persistConfig = {
  key: 'root',
  blacklist: ['room'],
  storage,
}

const persistingReducer = combineReducers({
  user: userSlice.reducer,
  auth: authSlice.reducer,
  language: languageSlice.reducer,
  room: roomSlice.reducer,
})

// const normalReducer = combineReducers({})

const persistedReducer = persistReducer(persistConfig, persistingReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store
