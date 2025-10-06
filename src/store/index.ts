import { configureStore } from "@reduxjs/toolkit";
import Categories from "./categories/categoriesSlice";

export const store = configureStore({
  reducer: { Categories },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
