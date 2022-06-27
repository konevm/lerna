import { configureStore } from "@reduxjs/toolkit";
import storeReduser from "./storeSlice";
import adminReduser from "./adminSlice";

export const store = configureStore({
  reducer: {
    data: storeReduser,
    admin: adminReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
