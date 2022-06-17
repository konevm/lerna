import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IUser,
  IAuthorizationCustomer,
  ICustomer,
  IPurchase,
} from "../components/helpers/interfaces";

const getUsers = createAsyncThunk("store/getAllUsers", async () => {
  const apiUrl = `https://reqres.in/api/users?page=1`;
  try {
    const fetchedData = await axios.get(apiUrl);
    const users: IUser[] = [...fetchedData.data.data];
    return users;
  } catch (error) {
    console.log(error);
  }
});

const getPosts = createAsyncThunk("store/getPost", async () => {
  const apiUrl = `https://jsonplaceholder.typicode.com/posts`;
  try {
    const fetchedData = await axios.get(apiUrl);
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
      const response = await axios.get("/authorization", { params: customer });
      if (response.data.token) {
        localStorage.setItem("tokenKey", response.data.token);
        axios.defaults.headers.common["authorization"] = response.data.token;
        return response.data.user;
      }
      return response.data;
    } catch (error) {
      console.log({ message: error });
    }
  }
);
const asyncCreateCustomer = createAsyncThunk(
  "store/asyncCreateCustomer",
  async (customer: ICustomer) => {
    try {
      const response = await axios.post("/registration", customer);
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
      const response = await axios.post("/purchase", newPurchase);
      return response.data;
    } catch (error) {
      console.log({ message: error });
    }
  }
);

export { getUsers, getPosts, asyncSetPurchase, asyncCreateCustomer, asyncSignInCustomer };
