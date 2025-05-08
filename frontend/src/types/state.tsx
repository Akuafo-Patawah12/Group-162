import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  isReportPopUp: boolean;
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  isReportPopUp: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setIsReportPopUp: (state, action: PayloadAction<boolean>) => {
      state.isReportPopUp = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode ,setIsReportPopUp } = globalSlice.actions;

export default globalSlice.reducer;
