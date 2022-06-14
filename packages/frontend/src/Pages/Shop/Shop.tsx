import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { IProduct } from "../../components/helpers/interfaces";
import { AppRoutes } from "../../constants/app-routes.constants";
import ProductItem from "../../components/ProductItem/ProductItem";
import "./Shop.scss";

interface IShopList {
  products: IProduct[];
  isNew?: boolean;
}
interface ISortedProps {
  isNew?: boolean;
}

const ProductsList: React.FC<IShopList> = ({ products, isNew }) => {
  return (
    <div className="app__products">
      {isNew && <Link to={AppRoutes.PRODUCTS}>Show all</Link>}
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

const Shop: React.FC<ISortedProps> = ({ isNew }) => {
  const products = useAppSelector((store) => store.data.products);
  const onlyNew = products.filter((product) => product.new);
  return <ProductsList products={isNew ? onlyNew : products} isNew={isNew} />;
};

export default Shop;
