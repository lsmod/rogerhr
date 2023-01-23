import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const login = createAsyncThunk<
  User,
  { email: string; password: string }
>("login/signin", async ({ email, password }) => {
  await apiClient.login(email, password);
  return { email };
});

export type User = {
  email: string;
};

export interface loginState {
  hasSignin: boolean;
  user: User | null;
  loading: boolean;
  error: boolean;
}

const initialState: loginState = {
  hasSignin: false,
  user: null,
  loading: false,
  error: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.hasSignin = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const {} = loginSlice.actions;

export default loginSlice.reducer;
