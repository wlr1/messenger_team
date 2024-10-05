import { PayloadAction } from "./../../../../node_modules/@reduxjs/toolkit/src/createAction";
import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../../utility/types";
import { registerUser } from "./asyncActions";

const initialState: AuthState = {
  error: null,
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default authSlice.reducer;
