import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string;
}

type InitialState = {
  value: AuthState;
}

const initialState = {
  value: {
    token: "",
  } as AuthState
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (_state, action: PayloadAction<string>) => {
      return {
        value: {
          token: action.payload,
        }
      }
    }
  }
})

export const { loginAction } = auth.actions;
export default auth.reducer;