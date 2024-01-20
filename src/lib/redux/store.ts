import { configureStore } from '@reduxjs/toolkit'
import authReducer  from  './authslice'

export const store = configureStore({
  reducer: {
    authuser:authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;