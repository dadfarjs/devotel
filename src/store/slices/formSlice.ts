import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormStructure } from "../../types/form";

export interface FormState {
  structure: FormStructure | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FormState = {
  structure: null,
  isLoading: false,
  error: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormStructure: (state, action: PayloadAction<FormStructure>) => {
      state.structure = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setFormStructure, setLoading, setError } = formSlice.actions;

export default formSlice.reducer;
