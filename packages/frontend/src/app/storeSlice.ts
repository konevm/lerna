import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser, ICustomer, IAuthorizationCustomer, IState } from "../components/helpers/interfaces";
import { Products } from "../components/helpers/products";

import {
  gPay,
  amexPay,
  firstPay,
  flashPay,
  mastercardPay,
  mPay,
  ruPay,
  springPay,
  squarePay,
  visaPay,
} from "../components/helpers/payments";

axios.defaults.baseURL = "http://localhost:3001";

export const getUsers = createAsyncThunk("store/getAllUsers", async () => {
  const apiUrl = `https://reqres.in/api/users?page=1`;
  try {
    const fetchedData = await axios.get(apiUrl);
    const users: IUser[] = [...fetchedData.data.data];
    return users;
  } catch (error) {
    console.log(error);
  }
});
export const getPosts = createAsyncThunk("store/getPost", async () => {
  const apiUrl = `https://jsonplaceholder.typicode.com/posts`;
  try {
    const fetchedData = await axios.get(apiUrl);
    const posts = [...fetchedData.data];
    return posts;
  } catch (error) {
    console.log(error);
  }
});
export const asyncSignInCustomer = createAsyncThunk(
  "store/asyncSignInCustomer",
  async (customer: IAuthorizationCustomer) => {
    try {
      const response = await axios.get("/authorization", { params: customer });
      localStorage.setItem("tokenKey", response.data.token);
      axios.defaults.headers.common["authorization"] = response.data.token;
      return response.data.user;
    } catch (error) {
      console.log({ message: error });
    }
  }
);
export const asyncCreateCustomer = createAsyncThunk(
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

const InitialCustomer: ICustomer = {
  id: "",
  login: "",
  name: "",
  lastName: "",
  email: "",
  password: "",
  address: "",
  phone: "",
};

const initialState: IState = {
  showModal: false,
  menu: [
    "About Us",
    // "Contact Us",
    "Products",
    // "Blog",
    // "Search",
    // "Privacy Policy",
    // "Terms of Service",
    // "Refund Policy",
    // "Customization & Gifting",
    "Authorization",
  ],
  payments: [
    firstPay,
    amexPay,
    flashPay,
    gPay,
    mastercardPay,
    mPay,
    springPay,
    squarePay,
    ruPay,
    visaPay,
  ],
  benefits: [
    "GMO's",
    "Toxins",
    "Fillers",
    "Artificial Colours",
    "Synthetic Chemicals",
    "Artificial Fragrances",
  ],
  instagramUsers: [],
  posts: [],
  products: Products,
  cart: [],
  totalPrice: 0,
  customer: InitialCustomer,
  customers: [
    {
      id: "1",
      login: "test11",
      name: "Ivan",
      lastName: "Ivanov",
      email: "mmm@nnn.xx",
      password: "fffsfsfsfsfs1F!",
      address: "Paris",
      phone: "888888888",
    },
  ],
  isAuthorized: false,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    changeModalVisibility: (store) => {
      store.showModal = !store.showModal;
    },
    getAllInstagramUsers: (store, action: PayloadAction<IUser[]>) => {
      store.instagramUsers = action.payload;
    },
    addOneToCart: (store, action: PayloadAction<number>) => {
      const productByActionNumber = Products.find((item) => item.id === action.payload);
      const productInCart = store.cart.find((item) => item.id === action.payload);
      if (productInCart) {
        productInCart.amount += 1;
        store.totalPrice += productInCart.price;
        return;
      }
      if (productByActionNumber) {
        store.cart.push({ ...productByActionNumber, amount: 1 });
        store.totalPrice = store.totalPrice + productByActionNumber.price;
      }
    },
    removeOneFromCart: (store, action: PayloadAction<number>) => {
      const item = store.cart.find((item) => item.id === action.payload);
      if (item) {
        item.amount -= 1;
        store.totalPrice -= item.price;
        if (item.amount === 0) store.cart.splice(store.cart.indexOf(item), 1);
      }
    },
    signOutCustomer: (store) => {
      store.isAuthorized = false;
      store.customer = InitialCustomer;
      localStorage.removeItem("tokenKey");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (store, action) => {
      if (action.payload) store.instagramUsers = action.payload;
    });
    builder.addCase(getPosts.fulfilled, (store, action) => {
      if (action.payload) store.posts = action.payload;
    });
    builder.addCase(asyncSignInCustomer.pending, (store) => {
      store.showModal = true;
    });
    builder.addCase(asyncSignInCustomer.fulfilled, (store, action) => {
      console.log(action.payload);
      store.showModal = false;
      store.isAuthorized = true;
      store.customer = action.payload;
    });
    builder.addCase(asyncCreateCustomer.fulfilled, (store, action) => {
      const { id, login, name, lastName, email, password, address, phone } = action.payload;
      store.customers.push({
        id: id,
        login: login,
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        phone: phone,
      });
    });
  },
});

export const {
  signOutCustomer,
  changeModalVisibility,
  getAllInstagramUsers,
  addOneToCart,
  removeOneFromCart,
} = storeSlice.actions;

export default storeSlice.reducer;
