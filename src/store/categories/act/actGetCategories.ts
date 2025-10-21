import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "src/types/category";
import axios from "axios";
type IResponse = TCategory[];

const actGetCategories = createAsyncThunk("categories/actGetCategories", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get<IResponse>("/categories");
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message || error.message);

    return rejectWithValue("An unexpected error occurred");
  }
});

export default actGetCategories;
