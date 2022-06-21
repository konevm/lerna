import React, { useState } from "react";
import { Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { removeAllFromCart, changeModalVisibility } from "../../app/storeSlice";
import { asyncSetPurchase } from "../../app/trunks";
import { IPurchaseProduct } from "../helpers/interfaces";
import "./CartCheck.scss";

const CartCheck: React.FC = () => {
  const { customer, cart, totalPrice } = useAppSelector((store) => store.data);
  const { name, lastName, address, phone, email, id } = customer;
  const [newPurchase, setNewPurchase] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const products: IPurchaseProduct[] = [];
  cart.forEach((product) => {
    products.push({
      product: product.name,
      amount: product.amount,
      price: product.price,
    });
  });
  return (
    <div className="app__check">
      {newPurchase ? (
        <>
          <h2 className="check__customer">
            Dear {name} {lastName}
          </h2>
          <span className="check__text">Please check your order and information: </span>
          <span className="check__address">Address: {address}</span>
          <span className="check__phone">Phone number: {phone}</span>
          <span className="check__email">Confirmation email: {email}</span>
          <ol className="check__list">
            {cart.map((product) => (
              <li key={product.id} className="list__item">
                {product.name} - {product.amount} * {product.price} $
              </li>
            ))}
          </ol>
          Total price: {totalPrice.toFixed(2)} $
          <Button
            variant="contained"
            onClick={() => {
              dispatch(
                asyncSetPurchase({
                  id: Number(new Date()).toString(),
                  customerId: id,
                  name: name,
                  lastName: lastName,
                  email: email,
                  address: address,
                  phone: phone,
                  totalPrice: totalPrice,
                  products: products,
                })
              );
              setNewPurchase(false);
            }}>
            Purchase
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(removeAllFromCart());
              dispatch(changeModalVisibility());
            }}>
            Refuse
          </Button>
        </>
      ) : (
        <AutorenewIcon className="wait" data-testid="wait" />
      )}
    </div>
  );
};

export default CartCheck;
