import React from "react";
import { IProduct } from "../../components/helpers/interfaces";
import ProductItem from "../../components/ProductItem/ProductItem";

interface IProductsList {
  products: IProduct[];
}

const ProductsList: React.FC<IProductsList> = ({ products }) => {
  return (
    <div className="app__products">
      <ul className="products__list">
        {products.map((product) => (
          <li key={product.id}>
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
