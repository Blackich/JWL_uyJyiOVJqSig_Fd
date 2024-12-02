import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authReducer } from "@Admin/auth/_auth.slice";
import { userApi } from "@User/utils/utils";
import { adminApi } from "@Admin/utils/utils";
import { userReducer } from "@User/auth/_user.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, PayloadAction>;

// export type Dispatch = ThunkDispatch<RootState, unknown, PayloadAction>;
// export type AppAction<R> = ThunkAction<R, RootState, unknown, PayloadAction>;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState;
//   dispatch: AppDispatch;
//   extra: UnknownAction;
//   getState: () => RootState;
// }>();
