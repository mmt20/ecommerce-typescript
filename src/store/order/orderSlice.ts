import { createSlice } from "@reduxjs/toolkit";
import { TLoadingStatus } from "../../types/shared.types";
import { TOrderItem } from "@types";

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
  reducers: {},
});

export default orderSlice.reducer;
