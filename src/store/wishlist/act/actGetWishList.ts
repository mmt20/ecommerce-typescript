import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "@types";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "productsIds";
type TResponse = TProduct[];
const actGetWishlist = createAsyncThunk("products/actGetWishlist", async (dataType: TDataType, thunkAPI) => {
  const { rejectWithValue, signal, getState } = thunkAPI;
  const { auth } = getState() as RootState;
  try {
    const userWishlist = await axios.get<{ productId: number }[]>(`/wishlist?user_id=${auth.user?.id}`, { signal });
    if (!userWishlist.data.length) {
      return { data: [], dataType: "empty" };
    }
    if (dataType === "productsIds") {
      const concatenatedItemsId = userWishlist.data.map((product) => product.productId);
      return { data: concatenatedItemsId, dataType: "productsIds" };
    } else if (dataType === "productsFullInfo") {
      const concatenatedItemsId = userWishlist.data.map((product) => `id=${product.productId}`).join("&");
      const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}`);

      return { data: response.data, dataType: "productsFullInfo" };
    }
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actGetWishlist;
