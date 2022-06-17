import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { changeModalVisibility } from "../../app/storeSlice";
import { AppRoutes } from "../../constants/app-routes.constants";
import CartItem from "../../components/CartItem/CartItem";
import ModalsWrapper from "../../components/ModalWrapper/ModalsWrapper";

import CartCheck from "../../components/CartCheck/CartCheck";
import "./Cart.scss";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart, totalPrice, isAuthorized } = useAppSelector((store) => store.data);
  const navigate = useNavigate();
  return (
    <div className="app__cart">
      <h2 className="cart__title">
        {cart.length === 0 ? "Your cart is empty." : "Your products:"}
      </h2>
      <ul className="cart__list">
        {cart.map((product) => (
          <li key={product.id}>
            <CartItem product={product} />
          </li>
        ))}
      </ul>
      Total price: $ {totalPrice.toFixed(2)}
      <Button
        variant="contained"
        disabled={!totalPrice}
        onClick={() => dispatch(changeModalVisibility())}>
        Make purchase
      </Button>
      <Button variant="outlined" onClick={() => navigate(AppRoutes.PRODUCTS)}>
        Continue shopping
      </Button>
      <ModalsWrapper>
        {isAuthorized ? (
          <CartCheck />
        ) : (
          <div className="modal__warning">
            You must be
            <span
              className="modal-warning__link"
              onClick={() => {
                navigate(AppRoutes.AUTH);
                dispatch(changeModalVisibility());
              }}>
              Authorized
            </span>
          </div>
        )}
      </ModalsWrapper>
    </div>
  );
};
export default Cart;
