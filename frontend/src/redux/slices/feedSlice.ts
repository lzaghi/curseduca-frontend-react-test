import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPost, TCategory, TUser } from '../../types/types';

type FeedState = {
  posts: TPost[];
  categories: TCategory[];
  users: TUser[];
}

type InitialState = {
  value: FeedState;
}

const initialState = {
  value: {
    posts: [],
    categories: [],
    users: [],
  } as FeedState,
} as InitialState;

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsAction: (state, action: PayloadAction<TPost[]>) => ({
      value: {
        ...state.value,
        posts: action.payload,
      },
    }),
    setCategoriesAction: (state, action: PayloadAction<TCategory[]>) => ({
      value: {
        ...state.value,
        categories: action.payload,
      },
    }),
    setUsersAction: (state, action: PayloadAction<TUser[]>) => ({
      value: {
        ...state.value,
        users: action.payload,
      },
    }),
  },
});

export const { setPostsAction, setCategoriesAction, setUsersAction } = posts.actions;
export default posts.reducer;
