import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICustomer, IPurchase } from "../components/helpers/interfaces";

interface IAdminState {
  customers: ICustomer[];
  purchases: IPurchase[];
}
const initialState: IAdminState = {
  customers: [],
  purchases: [],
};

export const getAllCustomers = createAsyncThunk("admin/getAllCustomers", async () => {
  try {
    const response = await axios.get("/customers");
    return response.data;
  } catch (error) {
    console.log({ message: error });
  }
});

export const getAllPurchases = createAsyncThunk("admin/getAllPurchases", async () => {
  try {
    const response = await axios.get("/purchases");
    return response.data;
  } catch (error) {
    console.log({ message: error });
  }
});

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomers.fulfilled, (admin, action) => {
      admin.customers = action.payload;
    });
    builder.addCase(getAllPurchases.fulfilled, (admin, action) => {
      admin.purchases = action.payload;
    });
  },
});

export default adminSlice.reducer;
