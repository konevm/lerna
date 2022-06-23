import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
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
      <form
        className="header__search"
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <input type="text" id="search" className="header__search-input" />
        <button type="submit" className="header__search-label">
          <SearchIcon className="header__search-icon" />
        </button>
      </form>
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
          <Link to={AppRoutes.ACCOUNT} className="header-menu__item">
            {isAdmin ? "Admin" : "Personal"}
          </Link>
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
