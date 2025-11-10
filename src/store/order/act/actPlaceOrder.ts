import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { RootState } from "@store/index";

const actPlaceOrder = createAsyncThunk("orders/placeOrder", async (subtotal: number, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;
  const { cart, auth } = getState() as RootState;
  const orderItems = cart.productsFullInfo.map((product) => ({
    productId: product.id,
    title: product.title,
    price: product.price,
    quantity: cart.items[product.id],
  }));
  try {
    const response = await axios.post("/orders", {
      userId: auth.user?.id,
      items: orderItems,
      subtotal,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actPlaceOrder;
