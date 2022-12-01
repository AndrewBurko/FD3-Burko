import { configureStore } from "@reduxjs/toolkit";

import clientsReduсer from "./clientsSlice";

export const store = configureStore({
  reducer: clientsReduсer
});