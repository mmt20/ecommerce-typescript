import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "src/types/product";
import axios from "axios";
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message || error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export default actGetWishlist;
