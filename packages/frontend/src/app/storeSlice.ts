import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ICustomer, IState } from "../components/helpers/interfaces";
import { Products } from "../components/helpers/products";
import { payments } from "../components/helpers/payments";
import {
  getUsers,
  getPosts,
  asyncSetPurchase,
  asyncCreateCustomer,
  asyncSignInCustomer,
  asyncUserModification,
  asyncDeleteUser,
  getAllCustomers,
  getPurchases,
} from "./trunks";

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
  payments: payments,
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
    builder.addCase(getAllCustomers.pending, (store) => {
      storeSlice.caseReducers.changeModalVisibility(store);
    });
    builder.addCase(getAllCustomers.fulfilled, (store, action) => {
      if (action.payload[0].id) {
        storeSlice.caseReducers.changeModalVisibility(store);
      }
    });
    builder.addCase(getUsers.fulfilled, (store, action) => {
      if (action.payload) store.instagramUsers = action.payload;
    });
    builder.addCase(getPosts.fulfilled, (store, action) => {
      if (action.payload) store.posts = action.payload;
    });
    builder.addCase(asyncSignInCustomer.pending, (store) => {
      store.errorMessage = "";
      storeSlice.caseReducers.changeModalVisibility(store);
    });
    builder.addCase(asyncSignInCustomer.fulfilled, (store, action) => {
      if (localStorage.getItem("tokenKey")) {
        storeSlice.caseReducers.changeModalVisibility(store);
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
    builder
      .addCase(asyncSetPurchase.fulfilled, (store) => {
        storeSlice.caseReducers.changeModalVisibility(store);
        store.totalPrice = 0;
        store.cart.length = 0;
      })
      .addCase(getPurchases.pending, (store) => {
        storeSlice.caseReducers.changeModalVisibility(store);
      })
      .addCase(getPurchases.fulfilled, (store) => {
        storeSlice.caseReducers.changeModalVisibility(store);
      })
      .addCase(asyncUserModification.pending, (store) => {
        storeSlice.caseReducers.changeModalVisibility(store);
      })
      .addCase(asyncUserModification.fulfilled, (store, action) => {
        storeSlice.caseReducers.changeModalVisibility(store);
        if (action.payload.customers) {
          const thisUser = action.payload.customers.find(
            (customer: ICustomer) => customer.id === store.customer.id
          );
          if (!thisUser.isAdmin) {
            storeSlice.caseReducers.signOutCustomer(store);
          }
        }
      })
      .addCase(asyncDeleteUser.pending, (store) => {
        storeSlice.caseReducers.changeModalVisibility(store);
      })
      .addCase(asyncDeleteUser.fulfilled, (store) => {
        storeSlice.caseReducers.changeModalVisibility(store);
      });
  },
});

export const {
  signOutCustomer,
  changeModalVisibility,
  addOneToCart,
  removeOneFromCart,
  removeAllFromCart,
  setRegisteredFalse,
} = storeSlice.actions;

export default storeSlice.reducer;
