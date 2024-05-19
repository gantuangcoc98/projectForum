import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
}

export const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPosts } = userPostsSlice.actions

export default userPostsSlice.reducer