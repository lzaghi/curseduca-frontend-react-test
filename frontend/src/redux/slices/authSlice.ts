import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string;
  isAuthenticated: boolean;
}

type InitialState = {
  value: AuthState;
}

const initialState = {
  value: {
    token: "",
    isAuthenticated: false,
  } as AuthState
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (_state, action: PayloadAction<string>) => {
      console.log('action', action)
      return {
        value: {
          token: action.payload,
          isAuthenticated: true,
        }
      }
    }
  }
})

export const { loginAction } = auth.actions;
export default auth.reducer;