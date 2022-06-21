import { createSlice } from "@reduxjs/toolkit";
import { ICustomer, IPurchase } from "../components/helpers/interfaces";
import { getAllCustomers, getPurchases, asyncUserModification, asyncDeleteUser } from "./trunks";
import { signOutCustomer } from "./storeSlice";

interface IAdminState {
  isModalOpened: boolean;
  customers: ICustomer[];
  purchases: IPurchase[];
  errorMessage: string;
}
const initialState: IAdminState = {
  isModalOpened: false,
  customers: [],
  purchases: [],
  errorMessage: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    changeAdminModalVisibility: (store) => {
      store.isModalOpened = !store.isModalOpened;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (store) => {
        store.errorMessage = "";
        store.isModalOpened = true;
      })
      .addCase(getPurchases.pending, (store) => {
        store.isModalOpened = true;
      });
    builder.addCase(getAllCustomers.fulfilled, (store, action) => {
      if (action.payload[0].id) {
        store.isModalOpened = false;
        store.customers = action.payload;
        return;
      }
      store.errorMessage = action.payload;
    });
    builder.addCase(getPurchases.fulfilled, (store, action) => {
      store.isModalOpened = false;
      store.purchases = action.payload;
    });
    builder
      .addCase(asyncUserModification.pending, (store) => {
        store.isModalOpened = true;
      })
      .addCase(asyncUserModification.fulfilled, (store, action) => {
        adminSlice.caseReducers.changeAdminModalVisibility(store);
        store.customers = action.payload.customers;
      })
      .addCase(asyncDeleteUser.pending, (store) => {
        adminSlice.caseReducers.changeAdminModalVisibility(store);
      })
      .addCase(asyncDeleteUser.fulfilled, (store, action) => {
        adminSlice.caseReducers.changeAdminModalVisibility(store);
        store.customers = action.payload;
      })
      .addCase(signOutCustomer, (store) => {
        store.customers.length = 0;
        store.purchases.length = 0;
      });
  },
});
export const { changeAdminModalVisibility } = adminSlice.actions;

export default adminSlice.reducer;
