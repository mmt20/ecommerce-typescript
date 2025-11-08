import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishList";
import { authLogout } from "@store/auth/authSlice";
import { isString, type TLoadingStatus, type TProduct } from "@types";

interface IWishlist {
  itemsId: number[];
  productsFullInfo: TProduct[];
  error: null | string;
  loading: TLoadingStatus;
}
const initialState: IWishlist = {
  itemsId: [],
  error: null,
  loading: "idle",
  productsFullInfo: [],
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    CleanWishlistProductFullInfo: (state) => {
      state.productsFullInfo = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload?.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((product) => product !== action.payload?.id);
        state.productsFullInfo = state.productsFullInfo.filter((product) => product.id !== action.payload?.id);
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // get wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.loading = "succeeded";
      if (action.payload.dataType === "productsFullInfo") {
        state.productsFullInfo = action.payload.data as TProduct[];
      } else {
        state.itemsId = action.payload.data as number[];
      }
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // when user logs out
    builder.addCase(authLogout, (state) => {
      state.itemsId = [];
      state.productsFullInfo = [];
    });
  },
});

export { actLikeToggle, actGetWishlist };
export const { CleanWishlistProductFullInfo } = wishlistSlice.actions;
export default wishlistSlice.reducer;
