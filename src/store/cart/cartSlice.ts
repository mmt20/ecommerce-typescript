import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "src/types/product";
import { getCartTotalQuantitySelector } from "./selectors/index";
import actGetProductsByItems from "./act/actGetProductsByItems";
import type { TLoadingStatus } from "src/types/shared";
interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoadingStatus;
  error: string | null;
}
const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      if (state.items[productId]) {
        state.items[productId]++;
      } else {
        state.items[productId] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      if (state.items[productId]) {
        state.items[productId] = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetProductsByItems.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetProductsByItems.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.productsFullInfo = action.payload;
      })
      .addCase(actGetProductsByItems.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string") {
          state.error = action.payload;
        }
      });
  },
});

export { getCartTotalQuantitySelector, actGetProductsByItems };
export const { addToCart, cartItemChangeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
