import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { TToast } from "@types";

interface IToastSlice {
  records: TToast[];
}

const initialState: IToastSlice = {
  records: [],
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<TToast>) => {
      state.records.push({
        id: nanoid(),
        title: action.payload.title || action.payload.type,
        type: action.payload.type,
        message: action.payload.message,
        displayAppearance: action.payload.displayAppearance || false,
      });
    },
    removeToast: (state, action) => {
      state.records = state.records.filter((toast) => toast.id !== action.payload);
    },
    stopDisplayAppearance: (state, action) => {
      state.records.map((toast) => {
        if (toast.id === action.payload) {
          return (toast.displayAppearance = false);
        }
        return toast;
      });
    },
  },
});

export const { removeToast, addToast, stopDisplayAppearance } = toastsSlice.actions;
export default toastsSlice.reducer;
export type { TToast };
