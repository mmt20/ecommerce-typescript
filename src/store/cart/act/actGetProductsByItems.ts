import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import { axiosErrorHandler } from "@utils";
import axios from "axios";
import type { TProduct } from "src/types/product";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems", async (_, thunkAPI) => {
  const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
  const { cart } = getState() as RootState;
  const itemsId = Object.keys(cart.items);
  if (!itemsId.length) return fulfillWithValue([]);
  try {
    const conCatenatedItemsId = itemsId.map((id) => `id=${id}`).join("&");
    const response = await axios.get<TResponse>(`/products?${conCatenatedItemsId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actGetProductsByItems;
