import { createSlice } from "@reduxjs/toolkit";
import { AuthResponse } from "./types";
import { fetchAuth, fetchAuthMe, fetchRefreshToken } from "./_authApi";

const initialState: AuthResponse = {
  data: {
    login: "",
    token: "",
  },
  error: null,
  isAuth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    getAuthName: (state) => state.data?.login,
    getAuthError: (state) => state.error,
    selectIsAuth: (state) => Boolean(state.data?.login),
  },
  reducers: {
    authLogout: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.isAuth = action.payload.message;
      state.data = action.payload.data;
    });
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(fetchRefreshToken.fulfilled, (state, action) => {
      state.data = action.payload;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(fetchRefreshToken.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { getAuthName, getAuthError, selectIsAuth } = authSlice.selectors;
export const { authLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
