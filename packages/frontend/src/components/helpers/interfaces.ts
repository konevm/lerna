interface IAuthorizationCustomer {
  login: string;
  password: string;
}

interface IAdminState {
  customers: ICustomer[];
  purchases: IPurchase[];
  errorMessage: string;
}

interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IProduct {
  id: number;
  imageURL: string;
  name: string;
  description: string;
  new: boolean;
  sale: boolean;
  price: number;
}

interface ICartItem extends IProduct {
  amount: number;
}

interface ICustomer {
  id: string;
  login: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  isAdmin: boolean;
}

interface INewCustomer {
  id: string;
  login: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone: string;
}

interface IState {
  showModal: boolean;
  menu: string[];
  payments: string[];
  benefits: string[];
  instagramUsers: IUser[];
  posts: IPost[];
  products: IProduct[];
  cart: ICartItem[];
  totalPrice: number;
  customer: ICustomer;
  isAdmin: boolean;
  registrationComplete: boolean;
  isAuthorized: boolean;
  errorMessage: string;
}

interface IPurchaseProduct {
  product: string;
  amount: number;
  price: number;
}
interface IPurchase {
  id: string;
  customerId: string;
  name: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  totalPrice: number;
  products: IPurchaseProduct[];
}

export type {
  IAuthorizationCustomer,
  IAdminState,
  IUser,
  IPost,
  ICartItem,
  IProduct,
  ICustomer,
  INewCustomer,
  IState,
  IPurchaseProduct,
  IPurchase,
};
