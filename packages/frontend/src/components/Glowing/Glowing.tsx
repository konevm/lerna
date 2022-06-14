import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../constants/app-routes.constants";
import "./Glowing.scss";

const Glowing: React.FC = () => {
  return (
    <div className="mainPage__glowing">
      <div className="glowing__info">
        <h3 className="glowing__name">Your Skin Deserves The Best!</h3>
        <p className="glowing__text">
          You have only one body and it deserves the best! Kal Hans brings you the highest quality,
          nutrient rich natural ingredients to elevate your skincare routine and give you glowing
          skin. Because the best makeup is NO makeup.
        </p>
        <Link className="glowing__link" to={AppRoutes.PRODUCTS}>
          Get Glowing
        </Link>
      </div>
      <div className="glowing__image" />
    </div>
  );
};

export default Glowing;
