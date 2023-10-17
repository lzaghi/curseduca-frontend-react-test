import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PostsState = {
  posts: Post[];
  categories: Category[];
}

type InitialState = {
  value: PostsState;
}

const initialState = {
  value: {
    posts: [],
    categories: [],
  } as PostsState
} as InitialState;

export const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostsAction: (state, action: PayloadAction<Post[]>) => {
      return {
        value: {
          ...state.value,
          posts: action.payload,
        }
      }
    },
    setCategoriesAction: (state, action: PayloadAction<Category[]>) => {
      return {
        value: {
          ...state.value,
          categories: action.payload,
        }
      }
    }
  }
})

export const { setPostsAction, setCategoriesAction } = posts.actions;
export default posts.reducer;