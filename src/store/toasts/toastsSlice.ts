import { createSlice } from "@reduxjs/toolkit";
import { TToast } from "@types";

interface IToastSlice {
  records: TToast[];
}

const initialState: IToastSlice = {
  records: [
    {
      id: "1",
      message: "This is a sample toast message.",
      type: "primary",
      title: "Sample Toast",
    },
    {
      id: "2",
      message: "This is a success toast message.",
      type: "success",
      title: "Success Toast",
    },
    {
      id: "4",
      message: "This is an info toast message.",
      type: "info",
      title: "Info Toast",
    },
    {
      id: "5",
      message: "This is a warning toast message.",
      type: "warning",
      title: "Warning Toast",
    },
    {
      id: "6",
      message: "This is a danger toast message.",
      type: "danger",
      title: "Danger Toast",
    },
  ],
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    removeToast(state, action) {
      state.records = state.records.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { removeToast } = toastsSlice.actions;
export default toastsSlice.reducer;
export type { TToast };
