import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "../../constants/app-routes.constants";
import { useAppSelector } from "../../app/hooks";
import logoURL from "../../images/Logo.svg";
import "./Header.scss";

const Header: React.FC = () => {
  const { cart, isAuthorized, isAdmin } = useAppSelector((store) => store.data);

  const getCartTotal = useMemo(() => {
    let total = 0;
    cart.forEach((item) => (total = total + item.amount));
    return total;
  }, [cart]);

  return (
    <header className="app__header">
      <MenuIcon fontSize="large" titleAccess="choose menu" className="header__burger-menu" />
      <Link
        to={AppRoutes.MAIN}
        className="header__logo"
        style={{ backgroundImage: `url(${logoURL})` }}
      />

      {cart.length > 0 && (
        <Link to={AppRoutes.CART} className="header__cart">
          <ShoppingBasketIcon className="header__basket" fontSize="large" />
          <div className="cart__products">{getCartTotal}</div>
        </Link>
      )}
      <div className="header__menu">
        <Link to={AppRoutes.MAIN} className="header-menu__item">
          About Us
        </Link>
        <Link to={AppRoutes.PRODUCTS} className="header-menu__item">
          Products
        </Link>
        {isAuthorized ? (
          isAdmin ? (
            <Link to={AppRoutes.ADMIN} className="header-menu__item">
              Admin
            </Link>
          ) : (
            <Link to={AppRoutes.ACCOUNT} className="header-menu__item">
              Personal
            </Link>
          )
        ) : (
          <Link to={AppRoutes.AUTH} className="header-menu__item">
            Sign in
          </Link>
        )}
      </div>
      <Toaster />
    </header>
  );
};

export default Header;
