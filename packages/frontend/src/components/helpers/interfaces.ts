export interface IAuthorizationCustomer {
  login: string;
  password: string;
}
export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface ICartItem extends IProduct {
  amount: number;
}
export interface ICustomer {
  id: string;
  login: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}
export interface INewCustomer {
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

export interface IState {
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
  customers: ICustomer[];
  isAuthorized: boolean;
}

export interface IProduct {
  id: number;
  imageURL: string;
  name: string;
  description: string;
  new: boolean;
  sale: boolean;
  price: number;
}

export interface IPurchaseProduct {
  product: string;
  amount: number;
  price: number;
}
export interface IPurchase {
  id: string;
  name: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  totalPrice: number;
  products: IPurchaseProduct[];
}
