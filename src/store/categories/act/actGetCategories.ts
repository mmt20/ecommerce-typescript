import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "src/types/category";
import axios from "axios";
import { axiosErrorHandler } from "@utils";

type IResponse = TCategory[];

const actGetCategories = createAsyncThunk("categories/actGetCategories", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get<IResponse>("/categories");
    const data = response.data;
    return data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actGetCategories;
