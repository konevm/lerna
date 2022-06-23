import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { storageKeys } from "../constants/storage-keys.constants";
import { requestRoutes } from "../constants/request-routes.constants";
import {
  IUser,
  IAuthorizationCustomer,
  ICustomer,
  IPurchase,
} from "../components/helpers/interfaces";

const getUsers = createAsyncThunk("store/getAllUsers", async () => {
  try {
    const fetchedData = await axios.get(requestRoutes.GET_ADV_USERS_ROUTE);
    const users: IUser[] = [...fetchedData.data.data];
    return users;
  } catch (error) {
    console.log(error);
  }
});

const getPosts = createAsyncThunk("store/getPost", async () => {
  try {
    const fetchedData = await axios.get(requestRoutes.GET_ADV_POSTS_ROUTE);
    const posts = [...fetchedData.data];
    return posts;
  } catch (error) {
    console.log(error);
  }
});

const asyncSignInCustomer = createAsyncThunk(
  "store/asyncSignInCustomer",
  async (customer: IAuthorizationCustomer) => {
    try {
      const response = await axios.get(requestRoutes.AUTHORIZATION_ROUTE, { params: customer });
      if (response.data.token) {
        localStorage.setItem(storageKeys.TOKEN_KEY, response.data.token);
        axios.defaults.headers.common["authorization"] = response.data.token;
        return response.data.user;
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const asyncCreateCustomer = createAsyncThunk(
  "store/asyncCreateCustomer",
  async (customer: ICustomer) => {
    try {
      const response = await axios.post(requestRoutes.CUSTOMER_REGISTRATION_ROUTE, customer);
      return response.data;
    } catch (error) {
      console.log({ message: error });
    }
  }
);

const asyncSetPurchase = createAsyncThunk(
  "store/asyncSetPurchase",
  async (newPurchase: IPurchase) => {
    try {
      const response = await axios.post(requestRoutes.PURCHASES_ROUTE, newPurchase);
      return response.data;
    } catch (error) {
      console.log({ message: error });
    }
  }
);

const getAllCustomers = createAsyncThunk("admin/getAllCustomers", async () => {
  try {
    const response = await axios.get(requestRoutes.CUSTOMERS_ROUTE);
    return response.data;
  } catch (error) {
    console.log({ message: error });
  }
});

const getPurchases = createAsyncThunk("admin/getAllPurchases", async (id?: string) => {
  try {
    const response = await axios.get(requestRoutes.PURCHASES_ROUTE, { params: { id: id } });
    return response.data;
  } catch (error) {
    console.log({ message: error });
  }
});

const asyncUserModification = createAsyncThunk(
  "admin/asyncUserModification",
  async (user: ICustomer) => {
    try {
      const response = await axios.post(requestRoutes.CUSTOMERS_ROUTE, user);
      return response.data;
    } catch (error) {
      console.log({ message: error });
    }
  }
);
const asyncDeleteUser = createAsyncThunk("admin/asyncDeleteUser", async (id: string) => {
  try {
    const response = await axios.delete(requestRoutes.CUSTOMERS_ROUTE, { params: { id: id } });
    return response.data;
  } catch (error) {
    console.log({ message: error });
  }
});

export {
  getUsers,
  getPosts,
  asyncSetPurchase,
  asyncCreateCustomer,
  asyncSignInCustomer,
  getAllCustomers,
  getPurchases,
  asyncUserModification,
  asyncDeleteUser,
};
