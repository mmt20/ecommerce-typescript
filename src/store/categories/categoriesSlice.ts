import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import type { TLoadingStatus, TCategory } from "@types";

interface ICategoriesState {
  records: TCategory[];
  loading: TLoadingStatus;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanUpCategoriesRecords: (state) => {
      state.records = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export { actGetCategories };
export const { cleanUpCategoriesRecords } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
