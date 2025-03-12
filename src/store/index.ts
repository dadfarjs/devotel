import { configureStore } from "@reduxjs/toolkit";
import formReducer, { FormState } from "./slices/formSlice";
import homeReducer, { HomeState } from "./slices/homeSlice";

export interface RootState {
  form: FormState;
  homes: HomeState;
}

export const store = configureStore({
  reducer: {
    form: formReducer,
    homes: homeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
