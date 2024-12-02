import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  selectedNicknameId: number | null;
  selectedNickname: string | null;
};

const initialState: InitialState = {
  selectedNicknameId: null,
  selectedNickname: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  selectors: {
    getSocialAccId: (state) => state.selectedNicknameId,
    getSocialAccName: (state) => state.selectedNickname,
  },
  reducers: {
    selectSocialAccId: (state, action) => {
      state.selectedNicknameId = action.payload;
    },
    selectSocialAccName: (state, action) => {
      state.selectedNickname = action.payload;
    },
  },
});

export const { getSocialAccId, getSocialAccName } = userSlice.selectors;
export const { selectSocialAccId, selectSocialAccName } = userSlice.actions;
export const userReducer = userSlice.reducer;
