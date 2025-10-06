import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = {
  id: number;
  title: string;
  prefix: string;
  img: string;
};

const actGetCategories = createAsyncThunk("categories/actGetCategories", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get<TResponse[]>("http://localhost:5005/categories");
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message || error.message);

    return rejectWithValue("An unexpected error occurred");
  }
});

export default actGetCategories;
