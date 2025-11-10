import { createSlice } from "@reduxjs/toolkit";
import { TLoadingStatus } from "../../types/shared.types";
import { isString, TOrderItem } from "@types";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";
interface IOrderState {
  orderList: TOrderItem[];
  loading: TLoadingStatus;
  error: string | null;
}
const initialState: IOrderState = {
  orderList: [],
  loading: "idle",
  error: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    restOrderStatus: (state) => {
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actPlaceOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actPlaceOrder.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actPlaceOrder.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
    // Get Orders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actPlaceOrder, actGetOrders };
export const { restOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
