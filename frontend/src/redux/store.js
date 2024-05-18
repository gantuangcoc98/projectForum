import { configureStore } from '@reduxjs/toolkit'
import userPostsReducer from './userPosts'

export const store = configureStore({
  reducer: {
    userPosts: userPostsReducer
  },
})