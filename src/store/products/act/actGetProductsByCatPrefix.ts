import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "src/types/product";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
type TResponse = TProduct[];
const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(`/products?cat_prefix=${prefix}`);
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByCatPrefix;
