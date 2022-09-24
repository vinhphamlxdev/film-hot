import { createSlice } from "@reduxjs/toolkit";
export const globalSlice = createSlice({
  name: "global",
  initialState: {
    loadingScreen: true,
  },
  reducers: {
    setLoadingScreen: (state, action) => {
      state.loadingScreen = action.payload;
    },
  },
});
export const { setLoadingScreen } = globalSlice.actions;
export default globalSlice.reducer;
