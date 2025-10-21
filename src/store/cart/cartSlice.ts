import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "src/types/product";

interface ICartState {
  items: { [key: number]: number };
  productFullInfo: TProduct[];
}
const initialState: ICartState = {
  items: {},
  productFullInfo: [],
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
  },
});

const getCartTotalQuantity = (state: ICartState) => {
  console.log("function getCartTotalQuantity called");
  return Object.values(state.items).reduce((sum, quantity) => sum + quantity, 0);
};

export { getCartTotalQuantity };
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
