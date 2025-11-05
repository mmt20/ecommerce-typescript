import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantitySelector } from "./selectors/index";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { type TLoadingStatus, type TProduct, isString } from "@types";
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
    cartRemoveItem: (state, action) => {
      const { productId } = action.payload;
      delete state.items[productId];
      state.productsFullInfo = state.productsFullInfo.filter((product) => product.id !== productId);
    },
    ClearCartProductsFullInfo: (state) => {
      state.productsFullInfo = [];
      state.loading = "idle";
      state.error = null;
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
        if (action.payload) {
          state.productsFullInfo = action.payload;
        }
      })
      .addCase(actGetProductsByItems.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});

export { getCartTotalQuantitySelector, actGetProductsByItems };
export const { addToCart, cartItemChangeQuantity, cartRemoveItem, ClearCartProductsFullInfo } = cartSlice.actions;
export default cartSlice.reducer;
