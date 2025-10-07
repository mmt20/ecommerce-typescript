import { createSlice } from "@reduxjs/toolkit";
import type { TLoadingStatus } from "src/types/shared";
import type { TProduct } from "src/types/product";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";

interface IProductState {
  records: TProduct[];
  loading: TLoadingStatus;
  error: string | null;
}

const initialState: IProductState = {
  records: [],
  loading: "idle",
  error: null,
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload ?? [];
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export const { productsCleanUp } = ProductSlice.actions;
export { actGetProductsByCatPrefix };
export default ProductSlice.reducer;
