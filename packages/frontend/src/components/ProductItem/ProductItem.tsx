import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addOneToCart } from "../../app/storeSlice";
import { IProduct } from "../helpers/interfaces";
import "./ProductItem.scss";

interface IProductProps {
  product: IProduct;
}

const ProductItem: React.FC<IProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const { id, imageURL, name, description, new: isNew, sale, price } = product;

  const handleClick = () => {
    dispatch(addOneToCart(id));
  };
  const showDescriptionVisible = () => setShowDescription(true);
  const showDescriptionInvisible = () => setShowDescription(false);
  return (
    <>
      <div
        className="product"
        onMouseOver={showDescriptionVisible}
        onMouseLeave={showDescriptionInvisible}>
        {isNew && <p className="product__new">NEW</p>}
        {sale && <p className={!isNew ? "product__sale" : "product__sale-new"}>SALE</p>}
        <div className="product__image" style={{ backgroundImage: `url(${imageURL})` }}></div>
        <div className="product__name">{name}</div>
        <div
          className={showDescription ? " product__description" : "product__description unvisible"}>
          {description}
        </div>
        <div className="product__price">$ {price}</div>{" "}
      </div>
      <button className="product__button" onClick={handleClick}>
        Add to cart
      </button>
    </>
  );
};

export default ProductItem;
