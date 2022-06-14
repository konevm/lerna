import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { changeModalVisibility } from "../../app/storeSlice";
import { AppRoutes } from "../../constants/app-routes.constants";
import CartItem from "../../components/CartItem/CartItem";
import ModalsWrapper from "../../components/ModalWrapper/ModalsWrapper";
import "./Cart.scss";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart, totalPrice, isAuthorized } = useAppSelector((store) => store.data);
  const navigate = useNavigate();
  return (
    <div className="app__cart">
      {cart.length === 0 ? "Your cart is empty." : "Your products:"}
      {cart.length === 0 && <Link to={AppRoutes.PRODUCTS}> Continue shopping </Link>}
      <ul className="cart__list">
        {cart.map((product) => (
          <li key={product.id}>
            <CartItem product={product} />
          </li>
        ))}
      </ul>
      Total price: $ {totalPrice.toFixed(2)}
      <button onClick={() => navigate(AppRoutes.PRODUCTS)}>Continue shopping</button>
      <button onClick={() => dispatch(changeModalVisibility())}>Make purchase</button>
      <ModalsWrapper>
        {isAuthorized ? (
          <div>Check Cart</div>
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
