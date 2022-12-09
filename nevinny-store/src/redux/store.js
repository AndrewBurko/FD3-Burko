import { configureStore } from "@reduxjs/toolkit";

import vinesReducer from "./vinesSlice";

export const store = configureStore({
  reducer: {
    vines: vinesReducer,
  },
});