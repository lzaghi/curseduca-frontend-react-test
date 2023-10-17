import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string;
  email: string;
}

type InitialState = {
  value: AuthState;
}

const initialState = {
  value: {
    token: '',
    email: '',
  } as AuthState
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (_state, action: PayloadAction<AuthState>) => {
      return {
        value: {
          token: action.payload.token,
          email: action.payload.email,
        }
      }
    }
  }
})

export const { loginAction } = auth.actions;
export default auth.reducer;