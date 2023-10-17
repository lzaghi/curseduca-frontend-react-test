import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PostsState = {
  posts: Post[];
  categories: Category[];
  users: User[];
}

type InitialState = {
  value: PostsState;
}

const initialState = {
  value: {
    posts: [],
    categories: [],
    users: [],
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
    },
    setUsersAction: (state, action: PayloadAction<User[]>) => {
      return {
        value: {
          ...state.value,
          users: action.payload,
        }
      }
    }
  }
})

export const { setPostsAction, setCategoriesAction, setUsersAction } = posts.actions;
export default posts.reducer;