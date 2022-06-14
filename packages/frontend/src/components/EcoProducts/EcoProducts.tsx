import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../constants/app-routes.constants";
import { useAppSelector } from "../../app/hooks";
import "./EcoProducts.scss";

const EcoProducts: React.FC = () => {
  const benefits = useAppSelector((store) => store.data.benefits);
  return (
    <div className="mainPage_ecoProducts">
      <div className="ecoProducts__image" />
      <ul className="ecoProducts__info">
        <h3 className="info__name">Free From</h3>
        {benefits.map((item) => (
          <li className="info__list-item" key={item}>
            {item}
          </li>
        ))}
        <Link className="info__link" to={AppRoutes.PRODUCTS}>
          Shop Green Beauty
        </Link>
      </ul>
    </div>
  );
};

export default EcoProducts;
