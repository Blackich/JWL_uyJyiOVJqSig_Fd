import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  userId: number | null;
  selectedNicknameId: number | null;
  selectedNickname: string | null;
};

const initialState: InitialState = {
  userId: null,
  selectedNicknameId: null,
  selectedNickname: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  selectors: {
    getUserId: (state) => state.userId,
    getSocialAccId: (state) => state.selectedNicknameId,
    getSocialAccName: (state) => state.selectedNickname,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    selectSocialAccId: (state, action) => {
      state.selectedNicknameId = action.payload;
    },
    selectSocialAccName: (state, action) => {
      state.selectedNickname = action.payload;
    },
    logoutUser: () => {
      localStorage.removeItem("activeUserId");
      return initialState;
    },
  },
});

export const { getUserId, getSocialAccId, getSocialAccName } =
  userSlice.selectors;
export const { setUserId, selectSocialAccId, selectSocialAccName, logoutUser } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
