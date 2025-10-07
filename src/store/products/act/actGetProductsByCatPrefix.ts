import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "src/types/product";
import axios from "axios";
type TResponse = TProduct[];
const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(`http://localhost:5005/products?cat_prefix=${prefix}`);
      const data = response.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export default actGetProductsByCatPrefix;
