import { createSlice } from "@reduxjs/toolkit";
import { TLoadingStatus } from "../../types/shared.types";
import { isString, TOrderItem } from "@types";
import actPlaceOrder from "./act/actPlaceOrder";
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
  },
});

export const { restOrderStatus } = orderSlice.actions;
export { actPlaceOrder };
export default orderSlice.reducer;
