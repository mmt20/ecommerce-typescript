import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "src/types/product";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
type TResponse = TProduct[];
const actGetWishlist = createAsyncThunk("products/actGetWishlist", async (_, thunkAPI) => {
  const { rejectWithValue, fulfillWithValue } = thunkAPI;
  try {
    const userWishlist = await axios.get<{ productId: number }[]>("/wishlist?user_id=1");
    if (!userWishlist.data.length) {
      return fulfillWithValue([]);
    }
    const concatenatedItemsId = userWishlist.data.map((product) => `id=${product.productId}`).join("&");
    const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}`);
    const data = response.data;
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actGetWishlist;
