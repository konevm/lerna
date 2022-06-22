import { createSlice } from "@reduxjs/toolkit";
import { signOutCustomer } from "./storeSlice";
import { IAdminState } from "../components/helpers/interfaces";
import {
  getAllCustomers,
  getPurchases,
  asyncUserModification,
  asyncDeleteUser,
  asyncSetPurchase,
} from "./trunks";

const initialState: IAdminState = {
  customers: [],
  purchases: [],
  errorMessage: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (store) => {
        store.errorMessage = "";
      })
      .addCase(getPurchases.pending, (store) => {
        store.errorMessage = "";
      })
      .addCase(getAllCustomers.fulfilled, (store, action) => {
        if (action.payload[0].id) {
          store.customers = action.payload;
          return;
        }
        store.errorMessage = action.payload;
      });
    builder.addCase(getPurchases.fulfilled, (store, action) => {
      if (!action.payload.length) store.errorMessage = "You have no purchases yet";
      store.purchases = action.payload;
    });
    builder
      .addCase(asyncUserModification.fulfilled, (store, action) => {
        store.customers = action.payload.customers;
      })
      .addCase(asyncDeleteUser.fulfilled, (store, action) => {
        store.customers = action.payload;
      })
      .addCase(signOutCustomer, (store) => {
        store.customers.length = 0;
        store.purchases.length = 0;
        store.errorMessage = "";
      })
      .addCase(asyncSetPurchase.pending, (store) => {
        store.errorMessage = "";
      })
      .addCase(asyncSetPurchase.fulfilled, (store, action) => {
        store.purchases = action.payload;
      });
  },
});

export default adminSlice.reducer;
