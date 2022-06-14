import { configureStore } from "@reduxjs/toolkit";
import storeReduser from "./storeSlice";

export const store = configureStore({
  reducer: {
    data: storeReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
