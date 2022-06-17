import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getUsers,
  getPosts,
  asyncSetPurchase,
  asyncCreateCustomer,
  asyncSignInCustomer,
} from "./trunks";
import { IUser, ICustomer, IState } from "../components/helpers/interfaces";
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

const InitialCustomer: ICustomer = {
  id: "",
  login: "",
  name: "",
  lastName: "",
  email: "",
  password: "",
  address: "",
  phone: "",
  isAdmin: false,
};

const initialState: IState = {
  showModal: false,
  menu: ["About Us", "Products", "Authorization"],
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
  isAdmin: false,
  registrationComplete: false,
  isAuthorized: false,
  errorMessage: "",
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
    removeAllFromCart: (store) => {
      store.cart.length = 0;
      store.totalPrice = 0;
    },
    signOutCustomer: (store) => {
      store.isAuthorized = false;
      store.customer = InitialCustomer;
      store.isAdmin = false;
      localStorage.removeItem("tokenKey");
    },
    setRegisteredFalse: (store) => {
      store.registrationComplete = false;
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
      store.errorMessage = "";
      store.showModal = true;
    });
    builder.addCase(asyncSignInCustomer.fulfilled, (store, action) => {
      if (localStorage.getItem("tokenKey")) {
        store.showModal = false;
        store.isAuthorized = true;
        store.customer = action.payload;
        store.isAdmin = action.payload.isAdmin;
      } else {
        store.errorMessage = action.payload;
      }
    });
    builder.addCase(asyncCreateCustomer.pending, (store) => {
      store.errorMessage = "";
    });
    builder.addCase(asyncCreateCustomer.fulfilled, (store, action) => {
      if (!action.payload.status) {
        store.errorMessage = action.payload.message;
        return;
      }
      store.errorMessage = "";
      store.registrationComplete = true;
    });
    builder.addCase(asyncSetPurchase.fulfilled, (store) => {
      store.showModal = false;
      store.totalPrice = 0;
      store.cart.length = 0;
    });
  },
});

export const {
  signOutCustomer,
  changeModalVisibility,
  getAllInstagramUsers,
  addOneToCart,
  removeOneFromCart,
  removeAllFromCart,
  setRegisteredFalse,
} = storeSlice.actions;

export default storeSlice.reducer;
