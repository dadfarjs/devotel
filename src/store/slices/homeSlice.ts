import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormSubmission, HomeListResponse } from "../../types/form";

export interface HomeState {
  submissions: HomeListResponse;
  visibleColumns: Array<keyof FormSubmission>;
  isLoading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  submissions: {} as HomeListResponse,
  visibleColumns: ["id", "formId", "status", "createdAt"],
  isLoading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    setSubmissions: (state, action: PayloadAction<HomeListResponse>) => {
      state.submissions = action.payload;
    },
    updateVisibleColumns: (
      state,
      action: PayloadAction<Array<keyof FormSubmission>>
    ) => {
      state.visibleColumns = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSubmissions, updateVisibleColumns, setLoading, setError } =
  homeSlice.actions;

export default homeSlice.reducer;
