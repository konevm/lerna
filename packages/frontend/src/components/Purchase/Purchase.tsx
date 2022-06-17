import React from "react";
import { IPurchase } from "../helpers/interfaces";
import "./Purchase.scss";

interface IPurchaseProps {
  purchase: IPurchase;
}

const Purchase: React.FC<IPurchaseProps> = ({ purchase }) => {
  const { id, name, lastName, email, address, phone, totalPrice, products } = purchase;
  return (
    <div className="purchase">
      <h2 className="purchase__id">id: {id}</h2>
      <span className="purchase__customer">
        Customer: {name} {lastName}
      </span>
      <p className="purchase__price">Total price: {totalPrice.toFixed(2)} $</p>
      <span className="purchase__address">Address: {address}</span>
      <span className="purchase__phone">phone: {phone}</span>
      <span className="purchase__email">email: {email}</span>
      <ol className="purchase__products">
        {products.map((product) => (
          <li key={product.product}>
            {product.product} - {product.amount} x {product.price} $
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Purchase;
