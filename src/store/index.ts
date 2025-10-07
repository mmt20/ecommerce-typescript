import { configureStore } from "@reduxjs/toolkit";
import Categories from "./categories/categoriesSlice";
import Product from "./products/productsSlice";

export const store = configureStore({
  reducer: { Categories, Product },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
