import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminLoginFormData } from "./types";
import instanseAxios from "./axios";
import { authLogout } from "./_auth.slice";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: AdminLoginFormData, thunk) => {
    return await instanseAxios
      .post("/auth/login", params)
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 404)
          return thunk.rejectWithValue("Неправильный логин/пароль");
        if (err.response.status === 500)
          return thunk.rejectWithValue("Ошибка сервера");
      });
  },
);

export const fetchLogout = createAsyncThunk(
  "auth/fetchLogout",
  async (_, thunk) => {
    return await instanseAxios
      .get("/auth/logout")
      .then((res) => {
        thunk.dispatch(authLogout());
        return res.data;
      })
      .catch((err) => {
        if (err.response.status === 500)
          return thunk.rejectWithValue("Ошибка сервера");
      });
  },
);

export const fetchAuthMe = createAsyncThunk(
  "auth/checkAuthMe",
  async (_, thunk) => {
    return await instanseAxios
      .get("/auth/check")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err.response.status === 500)
          return thunk.rejectWithValue("Ошибка сервера");
        if (err.response.status === 401)
          return thunk.rejectWithValue("Вы не авторизованы (no access token)");
        if (err.response.status === 404) {
          return thunk.rejectWithValue("Неверный токен");
        }
      });
  },
);

export const fetchRefreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunk) => {
    return await instanseAxios
      .get("/auth/refresh")
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 500)
          return thunk.rejectWithValue("Ошибка сервера");
        if (err.response.status === 401)
          return thunk.rejectWithValue("Вы не авторизованы (no refresh token)");
        if (err.response.status === 404) {
          return thunk.rejectWithValue("Неверный токен");
        }
      });
  },
);

