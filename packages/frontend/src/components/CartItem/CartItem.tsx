import React from "react";
import { ICartItem } from "../helpers/interfaces";
import { useAppDispatch } from "../../app/hooks";
import { addOneToCart, removeOneFromCart } from "../../app/storeSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./CartItem.scss";

interface IItemProps {
  product: ICartItem;
}

const CartItem: React.FC<IItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { name, imageURL, price, amount } = product;
  return (
    <div className="cart__item">
      <div className="item__image" style={{ backgroundImage: `url(${imageURL})` }} />
      <div className="item__name">{name}</div>
      <div className="item__amount">
        <button className="item__decrement" onClick={() => dispatch(removeOneFromCart(product.id))}>
          <ArrowBackIosNewIcon />
        </button>
        {amount}
        <button className="item__increment" onClick={() => dispatch(addOneToCart(product.id))}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      <div className="item__price">Cost: $ {(price * amount).toFixed(2)}</div>
    </div>
  );
};
export default CartItem;
