import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    return Object.values(items).reduce((sum, quantity) => sum + quantity, 0);
  }
);

export { getCartTotalQuantitySelector };
