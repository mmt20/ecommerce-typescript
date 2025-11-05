import { createSlice } from "@reduxjs/toolkit";
import { isString, type TLoadingStatus, type TProduct } from "@types";
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
    cleanUpProductsRecords: (state) => {
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
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { cleanUpProductsRecords } = ProductSlice.actions;
export { actGetProductsByCatPrefix };
export default ProductSlice.reducer;
